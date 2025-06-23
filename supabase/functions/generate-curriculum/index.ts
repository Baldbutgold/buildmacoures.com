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
  courseTopic: string;
  skillLevel: string;
  primaryGoal: string;
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
    
    const { courseTopic, skillLevel, primaryGoal }: GenerateCurriculumRequest = requestBody;

    if (!courseTopic || courseTopic.trim().length === 0) {
      throw new Error('Course topic is required');
    }

    if (!skillLevel || !primaryGoal) {
      throw new Error('All fields are required');
    }

    if (courseTopic.trim().length > 200) {
      throw new Error('Course topic is too long. Please keep it under 200 characters.');
    }

    if (primaryGoal.trim().length > 300) {
      throw new Error('Primary goal is too long. Please keep it under 300 characters.');
    }

    // Map skill levels to descriptions
    const skillLevelDescriptions = {
      'beginner': 'beginners with little to no experience',
      'intermediate': 'intermediate learners with some foundational knowledge',
      'advanced': 'advanced learners looking to master the subject'
    };

    const skillDescription = skillLevelDescriptions[skillLevel as keyof typeof skillLevelDescriptions] || 'learners';

    // Updated prompt to match your specifications exactly
    const prompt = `# ROLE:
You are an expert curriculum and instructional designer with a strong background in creating effective, learner-centered course structures. Your job is to design an engaging and goal-driven curriculum tailored to a learner's starting level and outcome.

# CONTEXT:
Your task is to generate a modular course curriculum based on the user's input. The curriculum should consist of a **logical sequence of modules**, each building on the last, to help the learner reach their stated goal. Use **no more than 8 modules**, but fewer if the goal can be achieved in fewer steps.

# USER INPUT:

* **Course Topic:** ${courseTopic}
* **Learner's Starting Level:** ${skillLevel} (${skillDescription})
* **Primary Learner Goal:** ${primaryGoal}

# TASK INSTRUCTIONS:

1. ## Course Title & Description
   - Create a clear and engaging \`Course Title\` based on the topic and learner's goal.
   - Write a concise 2–3 sentence \`Course Description\` explaining what the course covers, who it's for, and what the learner will achieve.

2. ## Learning Objectives
   - Develop **3–5 specific, measurable learning objectives** that directly support the learner's goal.
   - Use strong action verbs (e.g., Build, Analyze, Design, Implement) to express each outcome clearly.

3. ## Modular Breakdown
   - Create a step-by-step \`Modular Breakdown\` of the course, using **up to 8 modules** depending on the complexity of the goal.
   - For each module:
     - Provide a **Module Title** that reflects the key concept or milestone.
     - List **3–4 core topics or skills** covered in that module.

4. ## Assumptions
   - **Learning Modalities:** Assume a blended approach: reading, watching, and building.
   - **Progression:** Ensure modules build logically upon one another toward the final goal.

# OUTPUT FORMAT (MARKDOWN):

Use the following structure:

## Course Title  
## Course Description  
## Learning Objectives  

## Modular Breakdown  
### Module 1  
**Module Title:** ...  
- Key Topics:  
  - ...  
  - ...  

(repeat for Module 2 through Module N — no more than 8 total)

Please ensure the curriculum is practical, achievable, and directly aligned with helping the learner reach their stated goal.`;

    console.log('Initializing Gemini AI...');
    
    // Initialize according to official docs
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

    // Get the generative model - using the recommended model from docs
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096, // Increased for more detailed curriculum
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

    // Extract module titles for preview (improved regex approach)
    const moduleMatches = fullCurriculum.match(/### Module \d+[\s\S]*?\*\*Module Title:\*\*\s*([^\n\r]+)/gi) || [];
    const modules = moduleMatches.slice(0, 8).map((match, index) => {
      const titleMatch = match.match(/\*\*Module Title:\*\*\s*([^\n\r]+)/i);
      const title = titleMatch ? titleMatch[1].trim() : `Module ${index + 1}`;
      return {
        id: index + 1,
        title: title
      };
    });

    // If no modules found with the primary regex, try alternative patterns
    if (modules.length === 0) {
      const moduleMatches2 = fullCurriculum.match(/Module \d+[:\-\s]*([^\n\r]+)/gi) || [];
      moduleMatches2.slice(0, 8).forEach((match, index) => {
        const title = match.replace(/Module \d+[:\-\s]*/i, '').trim();
        modules.push({
          id: index + 1,
          title: title || `Module ${index + 1} Content`
        });
      });
    }

    // Fallback if still no modules found
    if (modules.length === 0) {
      for (let i = 1; i <= 6; i++) {
        modules.push({
          id: i,
          title: `Module ${i}: ${courseTopic} Fundamentals`
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