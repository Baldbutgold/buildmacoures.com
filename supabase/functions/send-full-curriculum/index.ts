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

    if (!userEmail || !userName || !courseIdea || !fullCurriculum) {
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
    
    // Store the curriculum in the database
    const { data: curriculumData, error: insertError } = await supabase
      .from('generated_curricula')
      .insert({
        user_email: userEmail,
        user_name: userName,
        course_idea: courseIdea,
        generated_modules: modules,
        full_curriculum_content: fullCurriculum,
      })
      .select('access_token')
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error('Failed to save curriculum. Please try again.');
    }

    if (!curriculumData?.access_token) {
      throw new Error('Failed to generate access token');
    }

    const accessToken = curriculumData.access_token;
    const origin = req.headers.get('origin') || 'https://buildmacourse.com';
    const curriculumUrl = `${origin}/curriculum/${accessToken}`;

    console.log('Curriculum saved successfully');

    // For now, we'll return the curriculum URL
    // In a production environment, you would integrate with an email service like:
    // - Resend
    // - SendGrid
    // - Mailgun
    // - AWS SES
    
    // Example email content that would be sent:
    const emailContent = {
      to: userEmail,
      subject: `🎉 ${userName}, Your Custom Course Curriculum is Ready!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #a855f7;">Hi ${userName}! Your Course Curriculum is Ready!</h1>
          
          <p>Thank you for using our Instant Curriculum Generator. Based on your course idea:</p>
          
          <blockquote style="background: #f3f4f6; padding: 15px; border-left: 4px solid #a855f7; margin: 20px 0;">
            "${courseIdea}"
          </blockquote>
          
          <p>We've created a comprehensive curriculum just for you!</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${curriculumUrl}" style="background: #a855f7; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              View Your Complete Curriculum
            </a>
          </div>
          
          <p><strong>What's Next?</strong></p>
          
          <p>Now that you have a complete, professional curriculum, the next critical step is to validate it. How can you be 100% sure people will pay for this before you spend months building it?</p>
          
          <p>That's exactly what we help with at BuildMaCourse. We don't just create curricula - we help you validate, build, and launch profitable courses that actually sell.</p>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${origin}/#schedule-call" style="background: #059669; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold;">
              Book a Free Strategy Call
            </a>
          </div>
          
          <p>Best regards,<br>The BuildMaCourse Team</p>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <p style="font-size: 12px; color: #6b7280;">
            This curriculum was generated specifically for you. Keep this link private as it contains your personalized content.
          </p>
        </div>
      `
    };

    // TODO: Integrate with your preferred email service
    // For now, we'll just return the curriculum URL and email content
    
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Curriculum saved successfully',
        data: {
          curriculumUrl,
          accessToken,
          emailContent // This would be sent via email service in production
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
    
    let errorMessage = 'Failed to send curriculum';
    
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