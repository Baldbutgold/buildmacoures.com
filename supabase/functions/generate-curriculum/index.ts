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

    // Craft the comprehensive prompt for Gemini using the new format
    const prompt = `# ROLE:
You are an expert curriculum and instructional designer with deep knowledge of pedagogy, learning theory, and user-centered design. Your specialty is building logical, engaging, and goal-driven course plans tailored to a learner's background, time commitment, and specific objectives.

# CONTEXT:
Your task is to create a detailed, week-by-week course curriculum based on user-provided inputs. You should intelligently infer logical learning progressions, propose relevant topics, and design practical activities that lead the learner to their goal.

# USER INPUT:

* **Course Topic:** ${courseTopic}
* **Learner's Starting Level:** ${skillLevel} (${skillDescription})
* **Primary Learner Goal:** ${primaryGoal}
* **Total Course Duration (in weeks):** 8
* **Weekly Time Commitment (hours/week):** 3-5

# TASK INSTRUCTIONS:

1. ## Course Title & Description
   - Generate a compelling Course Title that reflects both the topic and the end goal.
   - Write a concise 2-3 sentence Course Description that includes the learner's starting point and what they'll achieve.

2. ## Learning Objectives
   - Analyze the learner's goal and derive 3–5 specific, measurable learning objectives.
   - Use action verbs (e.g., "Implement", "Build", "Evaluate", "Design") to ensure clarity and assessment readiness.

3. ## Week-by-Week Curriculum
   - Split the course into 8 weeks.
   - For each week:
     - Provide a Module Title that represents a clear learning milestone.
     - List 3–4 Key Topics for that module.
     - Recommend 1–2 hands-on or reflective Weekly Activities or Assignments aligned with the objectives.

4. ## Capstone Project
   - Propose a Final Project that synthesizes the key skills learned and demonstrates achievement of the primary goal.
   - Include a short paragraph explaining the expectations and deliverables.

5. ## Assumptions & Constraints
   - **Resources:** Use only free, reputable online resources (e.g., MDN, freeCodeCamp, Khan Academy, official docs, credible YouTube channels).
   - **Learning Style:** Assume a blended approach: reading, watching, and doing.
   - **Scaffolding:** Ensure that later modules build on earlier ones; reinforce knowledge through repetition and application.

# OUTPUT FORMAT (MARKDOWN):

Structure your response using the following Markdown sections:

## Course Title  
## Course Description  
## Learning Objectives  
## Week-by-Week Breakdown  
### Week 1  
**Module Title:** ...  
- Key Topics:  
  - ...  
- Activities:  
  - ...  
(repeat for each week)

## Capstone Project  
(Description and expectations)

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
    const moduleMatches = fullCurriculum.match(/### Week \d+[\s\S]*?\*\*Module Title:\*\*\s*([^\n\r]+)/gi) || [];
    const modules = moduleMatches.slice(0, 8).map((match, index) => {
      const titleMatch = match.match(/\*\*Module Title:\*\*\s*([^\n\r]+)/i);
      const title = titleMatch ? titleMatch[1].trim() : `Week ${index + 1} Module`;
      return {
        id: index + 1,
        title: title
      };
    });

    // If no modules found with the primary regex, try alternative patterns
    if (modules.length === 0) {
      const weekMatches = fullCurriculum.match(/Week \d+[:\-\s]*([^\n\r]+)/gi) || [];
      weekMatches.slice(0, 8).forEach((match, index) => {
        const title = match.replace(/Week \d+[:\-\s]*/i, '').trim();
        modules.push({
          id: index + 1,
          title: title || `Week ${index + 1} Content`
        });
      });
    }

    // Fallback if still no modules found
    if (modules.length === 0) {
      for (let i = 1; i <= 8; i++) {
        modules.push({
          id: i,
          title: `Week ${i}: ${courseTopic} Fundamentals`
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