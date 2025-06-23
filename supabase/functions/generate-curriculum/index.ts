import { corsHeaders } from '../_shared/cors.ts';

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro-latest:generateContent';

interface GenerateCurriculumRequest {
  courseIdea: string;
}

interface GeminiResponse {
  candidates: Array<{
    content: {
      parts: Array<{
        text: string;
      }>;
    };
  }>;
}

// Helper function to implement retry with exponential backoff
async function retryFetch(url: string, options: RequestInit, maxRetries: number = 3): Promise<Response> {
  let lastError: Error;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      // If we get a 429 (rate limit) error, retry with exponential backoff
      if (response.status === 429 && attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000; // 1s, 2s, 4s delays
        console.log(`Rate limited (429). Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
      return response;
    } catch (error) {
      lastError = error as Error;
      
      // Only retry on network errors, not on other types of errors
      if (attempt < maxRetries) {
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Network error. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
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

    if (!GEMINI_API_KEY) {
      throw new Error('Gemini API key not configured');
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

    // Call Gemini API with retry mechanism
    const geminiResponse = await retryFetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      }),
    });

    if (!geminiResponse.ok) {
      const errorText = await geminiResponse.text();
      console.error('Gemini API error:', errorText);
      throw new Error(`Gemini API error: ${geminiResponse.status}`);
    }

    const geminiData: GeminiResponse = await geminiResponse.json();
    
    if (!geminiData.candidates || geminiData.candidates.length === 0) {
      throw new Error('No curriculum generated');
    }

    const fullCurriculum = geminiData.candidates[0].content.parts[0].text;

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