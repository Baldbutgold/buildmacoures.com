import { GoogleGenerativeAI } from 'npm:@google/generative-ai@0.21.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY environment variable not set.");
}

interface GenerateCurriculumRequest {
  courseIdea: string;
}

// Helper function to implement retry with exponential backoff
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      
      // If it's a rate limit error and we have retries left
      if (error.message?.includes('429') && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt); // Exponential backoff
        console.log(`Rate limited. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      // For other errors, only retry if we have attempts left
      if (attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Error occurred. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    console.log(`${req.method} request received`);
    
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    // Check if Gemini API key is available
    if (!GEMINI_API_KEY) {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }

    const requestBody = await req.json();
    console.log('Request body:', requestBody);
    
    const { courseIdea }: GenerateCurriculumRequest = requestBody;

    if (!courseIdea || courseIdea.trim().length === 0) {
      throw new Error('Course idea is required');
    }

    if (courseIdea.trim().length > 500) {
      throw new Error('Course idea is too long. Please keep it under 500 characters.');
    }

    // Craft the prompt for Gemini - following the official docs pattern
    const prompt = `You are an expert course creator. Based on the following course idea, generate a comprehensive curriculum structure.

Course Idea: "${courseIdea}"

Please provide:
1. A compelling course title
2. A brief course description (2-3 sentences)
3. 6-8 main modules with descriptive titles
4. For each module, provide 3-5 lesson titles
5. Estimated total course duration
6. Target audience description

Format your response as a structured curriculum that would be professional and engaging. Make it specific and actionable.

Please format the response in a clear, organized way that would look professional in a PDF or webpage.`;

    console.log('Initializing Gemini AI...');
    
    // Initialize according to official docs
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Get the generative model - using the correct model name from docs
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",  // Changed to the recommended model from docs
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    console.log('Generating content...');
    
    // Generate content with retry mechanism - following the official pattern
    const result = await retryWithBackoff(async () => {
      return await model.generateContent(prompt);
    });

    // Get the response text - following official docs pattern
    const response = result.response;
    const fullCurriculum = response.text();

    if (!fullCurriculum) {
      throw new Error('No curriculum generated');
    }

    console.log('Curriculum generated successfully');

    // Extract module titles for preview (simple regex approach)
    const moduleMatches = fullCurriculum.match(/(?:Module|Chapter|Section)\s+\d+[:\-\s]+([^\n\r]+)/gi) || [];
    const modules = moduleMatches.slice(0, 8).map((match, index) => ({
      id: index + 1,
      title: match.replace(/(?:Module|Chapter|Section)\s+\d+[:\-\s]+/i, '').trim()
    }));

    // If no modules found with regex, try to extract from the content differently
    if (modules.length === 0) {
      const lines = fullCurriculum.split('\n').filter(line => line.trim().length > 0);
      const potentialModules = lines.filter(line => 
        line.includes('Module') || 
        line.includes('Chapter') || 
        line.includes('Section') ||
        (line.match(/^\d+\./) && line.length < 100)
      ).slice(0, 8);
      
      potentialModules.forEach((module, index) => {
        modules.push({
          id: index + 1,
          title: module.replace(/^\d+\.\s*/, '').replace(/^(Module|Chapter|Section)\s*\d+[:\-\s]*/i, '').trim()
        });
      });
    }

    // Fallback if still no modules found
    if (modules.length === 0) {
      for (let i = 1; i <= 6; i++) {
        modules.push({
          id: i,
          title: `Module ${i}: Course Content`
        });
      }
    }

    console.log(`Extracted ${modules.length} modules`);

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          modules,
          fullCurriculum
        }
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error generating curriculum:', error);
    
    let errorMessage = 'Failed to generate curriculum';
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your Gemini API configuration.';
      } else if (error.message.includes('PERMISSION_DENIED')) {
        errorMessage = 'API access denied. Please check your Gemini API permissions.';
      } else if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('429')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message.includes('SAFETY')) {
        errorMessage = 'Content filtered by safety settings. Please try a different course idea.';
      } else if (error.message.includes('network') || error.message.includes('fetch')) {
        errorMessage = 'Network error. Please check your connection and try again.';
      } else {
        errorMessage = error.message;
      }
    }
    
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});