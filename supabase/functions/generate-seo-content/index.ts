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

interface SEOContentRequest {
  contentType: 'blog-post' | 'meta-description' | 'landing-page' | 'product-description' | 'faq' | 'social-media';
  topic: string;
  targetKeywords: string[];
  audience?: string;
  tone?: 'professional' | 'casual' | 'authoritative' | 'friendly' | 'educational';
  wordCount?: number;
  includeSchema?: boolean;
  competitorUrls?: string[];
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
      
      if (error.message?.includes('429') && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Rate limited. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      
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

function generateSEOPrompt(request: SEOContentRequest): string {
  const { contentType, topic, targetKeywords, audience, tone, wordCount, includeSchema } = request;
  
  const basePrompt = `# ROLE:
You are an expert SEO content strategist and copywriter specializing in course creation, online education, and digital marketing. You understand search intent, keyword optimization, and content that ranks well while providing genuine value.

# CONTEXT:
You're creating content for BuildMaCourse, a professional course creation service that helps experts turn their knowledge into profitable online courses. The brand focuses on done-for-you course creation, video production, and curriculum design.

# BRAND VOICE:
- Professional yet approachable
- Results-focused and practical
- Authoritative but not intimidating
- Helpful and educational
- Conversion-oriented

# TARGET AUDIENCE:
${audience || 'Experts, entrepreneurs, consultants, and professionals who want to create online courses but lack the time or technical skills to do it themselves'}

# SEO REQUIREMENTS:
- Primary Keywords: ${targetKeywords.join(', ')}
- Tone: ${tone || 'professional'}
- Word Count: ${wordCount || 'optimal for content type'}
- Include semantic keywords and LSI terms
- Optimize for search intent and user experience
- Include compelling CTAs that drive conversions
- Use proper heading structure (H1, H2, H3)
- Include meta descriptions and title tags where applicable
${includeSchema ? '- Include JSON-LD schema markup where relevant' : ''}

# CONTENT TYPE: ${contentType.toUpperCase()}`;

  switch (contentType) {
    case 'blog-post':
      return `${basePrompt}

# TASK:
Create a comprehensive, SEO-optimized blog post about "${topic}" that:

1. **Title & Meta Description**
   - Compelling, click-worthy title (50-60 characters)
   - Meta description (150-160 characters)
   - Include primary keyword naturally

2. **Content Structure**
   - Engaging introduction with hook
   - Clear H2 and H3 subheadings
   - Actionable, valuable content
   - Internal linking opportunities
   - Strong conclusion with CTA

3. **SEO Optimization**
   - Natural keyword integration (1-2% density)
   - Semantic keywords and related terms
   - Featured snippet optimization
   - FAQ section if relevant
   - Image alt text suggestions

4. **Conversion Elements**
   - Multiple soft CTAs throughout
   - Strong final CTA to book strategy call
   - Lead magnets or free resources
   - Social proof integration points

# OUTPUT FORMAT:
## SEO Title
## Meta Description
## Blog Post Content (with proper markdown formatting)
## Suggested Internal Links
## Image Alt Text Suggestions
## FAQ Section (if applicable)
${includeSchema ? '## JSON-LD Schema Markup' : ''}`;

    case 'meta-description':
      return `${basePrompt}

# TASK:
Create 5 different meta descriptions for "${topic}" that:
- Are 150-160 characters each
- Include primary keyword naturally
- Have compelling CTAs
- Match search intent
- Drive clicks from search results

# OUTPUT FORMAT:
## Option 1: [Character count]
## Option 2: [Character count]
## Option 3: [Character count]
## Option 4: [Character count]
## Option 5: [Character count]`;

    case 'landing-page':
      return `${basePrompt}

# TASK:
Create SEO-optimized landing page content for "${topic}" including:

1. **Hero Section**
   - Compelling headline with primary keyword
   - Subheadline that clarifies value proposition
   - Strong CTA button text

2. **Key Sections**
   - Problem/solution sections
   - Benefits and features
   - Social proof areas
   - FAQ section
   - Final CTA section

3. **SEO Elements**
   - Title tag and meta description
   - H1, H2, H3 structure
   - Keyword optimization
   - Internal linking strategy

# OUTPUT FORMAT:
## Title Tag
## Meta Description
## Hero Section
## Main Content Sections
## FAQ Section
## CTA Sections
## SEO Notes`;

    case 'faq':
      return `${basePrompt}

# TASK:
Create an SEO-optimized FAQ section about "${topic}" with:
- 8-12 questions that target long-tail keywords
- Comprehensive answers (50-150 words each)
- Natural keyword integration
- Featured snippet optimization
- Questions that address common search queries

# OUTPUT FORMAT:
## FAQ: ${topic}
### Question 1
### Answer 1
[Continue for all questions]
${includeSchema ? '## FAQ Schema Markup' : ''}`;

    case 'social-media':
      return `${basePrompt}

# TASK:
Create social media content about "${topic}" for multiple platforms:

1. **LinkedIn Post** (professional, thought leadership)
2. **Twitter Thread** (5-7 tweets, educational)
3. **Facebook Post** (engaging, community-focused)
4. **Instagram Caption** (visual, inspirational)
5. **YouTube Description** (SEO-optimized, detailed)

Each should include relevant hashtags and CTAs.

# OUTPUT FORMAT:
## LinkedIn Post
## Twitter Thread
## Facebook Post
## Instagram Caption
## YouTube Description`;

    default:
      return `${basePrompt}

# TASK:
Create SEO-optimized content about "${topic}" that includes:
- Compelling headlines
- Keyword-rich descriptions
- Strong CTAs
- Value-driven content
- Proper formatting for web

# OUTPUT FORMAT:
## Title
## Content
## SEO Notes`;
  }
}

Deno.serve(async (req: Request) => {
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

    if (!GEMINI_API_KEY) {
      throw new Error('AI service temporarily unavailable. Please try again later.');
    }

    const requestBody = await req.json();
    console.log('SEO content request:', requestBody);
    
    const {
      contentType,
      topic,
      targetKeywords,
      audience,
      tone,
      wordCount,
      includeSchema,
      competitorUrls
    }: SEOContentRequest = requestBody;

    // Validation
    if (!contentType || !topic || !targetKeywords || targetKeywords.length === 0) {
      throw new Error('Content type, topic, and target keywords are required');
    }

    if (topic.trim().length > 200) {
      throw new Error('Topic is too long. Please keep it under 200 characters.');
    }

    if (targetKeywords.length > 10) {
      throw new Error('Too many keywords. Please limit to 10 keywords maximum.');
    }

    const prompt = generateSEOPrompt(requestBody);

    console.log('Initializing Gemini AI for SEO content generation...');
    
    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    console.log('Generating SEO content...');
    
    const result = await retryWithBackoff(async () => {
      return await model.generateContent(prompt);
    });

    const response = result.response;
    const content = response.text();

    if (!content) {
      throw new Error('No content generated');
    }

    console.log('SEO content generated successfully');

    // Extract different sections based on content type
    let structuredContent: any = {
      content,
      contentType,
      topic,
      targetKeywords,
      generatedAt: new Date().toISOString()
    };

    // Parse specific sections for different content types
    if (contentType === 'blog-post') {
      const titleMatch = content.match(/## SEO Title\s*\n([^\n]+)/);
      const metaMatch = content.match(/## Meta Description\s*\n([^\n]+)/);
      
      structuredContent = {
        ...structuredContent,
        title: titleMatch ? titleMatch[1].trim() : null,
        metaDescription: metaMatch ? metaMatch[1].trim() : null,
        sections: {
          title: titleMatch ? titleMatch[1].trim() : null,
          metaDescription: metaMatch ? metaMatch[1].trim() : null,
          content: content
        }
      };
    } else if (contentType === 'meta-description') {
      const options = content.match(/## Option \d+:.*?\n([^\n]+)/g) || [];
      structuredContent.options = options.map(option => {
        const match = option.match(/## Option \d+:.*?\n([^\n]+)/);
        return match ? match[1].trim() : option;
      });
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: structuredContent
      }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );

  } catch (error) {
    console.error('Error generating SEO content:', error);
    
    let errorMessage = 'Failed to generate SEO content';
    
    if (error instanceof Error) {
      if (error.message.includes('API_KEY_INVALID') || error.message.includes('API key')) {
        errorMessage = 'Invalid API key. Please check your Gemini API configuration.';
      } else if (error.message.includes('PERMISSION_DENIED')) {
        errorMessage = 'API access denied. Please check your Gemini API permissions.';
      } else if (error.message.includes('quota') || error.message.includes('limit') || error.message.includes('429')) {
        errorMessage = 'API quota exceeded. Please try again later.';
      } else if (error.message.includes('SAFETY')) {
        errorMessage = 'Content filtered by safety settings. Please try a different topic.';
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