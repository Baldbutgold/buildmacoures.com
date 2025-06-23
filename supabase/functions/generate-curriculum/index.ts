import { GoogleGenerativeAI } from 'npm:@google/generative-ai@0.21.0';
import { corsHeaders } from '../_shared/cors.ts';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');

if (!GEMINI_API_KEY) {
  throw new Error("GEMINI_API_KEY environment variable not set.");
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

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
    if (req.method !== 'POST') {
      throw new Error('Method not allowed');
    }

    const { courseIdea }: GenerateCurriculumRequest = await req.json();

    if (!courseIdea || courseIdea.trim().length === 0) {
      throw new Error('Course idea is required');
    }

    // Craft the prompt for Gemini
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

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro-latest",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    // Generate content with retry mechanism
    const result = await retryWithBackoff(async () => {
      return await model.generateContent(prompt);
    });

    const response = await result.response;
    const fullCurriculum = response.text();

    if (!fullCurriculum) {
      throw new Error('No curriculum generated');
    }

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
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message || 'Failed to generate curriculum'
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