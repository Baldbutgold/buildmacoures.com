import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

interface SendCurriculumRequest {
  userEmail: string;
  userName: string;
  courseIdea: string;
  modules: Array<{ id: number; title: string }>;
  fullCurriculum: string;
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

    // Check environment variables
    if (!supabaseUrl || !supabaseServiceKey) {
      console.error('Missing Supabase environment variables');
      throw new Error('Service configuration error. Please contact support.');
    }

    const requestBody = await req.json();
    console.log('Request body received');
    
    const { userEmail, userName, courseIdea, modules, fullCurriculum }: SendCurriculumRequest = requestBody;

    if (!userEmail || !courseIdea || !fullCurriculum) {
      throw new Error('Missing required fields');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      throw new Error('Invalid email format');
    }

    console.log('Initializing Supabase client...');
    
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log('Inserting curriculum into database...');
    
    // Store the curriculum in the database - matching the actual schema
    const { data: curriculumData, error: insertError } = await supabase
      .from('generated_curricula')
      .insert({
        user_email: userEmail,
        course_idea: courseIdea,
        generated_modules: modules,
        full_curriculum_content: fullCurriculum,
      })
      .select('access_token')
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Database error: ${insertError.message}`);
    }

    if (!curriculumData?.access_token) {
      throw new Error('Failed to generate access token');
    }

    const accessToken = curriculumData.access_token;
    console.log('Curriculum saved successfully with access token:', accessToken);

    return new Response(
      JSON.stringify({
        success: true,
        message: 'Curriculum saved successfully',
        data: {
          accessToken,
          redirectUrl: `/curriculum/${accessToken}`
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
    console.error('Error sending curriculum:', error);
    
    let errorMessage = 'Failed to save curriculum';
    
    if (error instanceof Error) {
      if (error.message.includes('configuration')) {
        errorMessage = 'Service configuration error. Please contact support.';
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