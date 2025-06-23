import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Sparkles, CheckCircle, AlertTriangle, User, Mail, X, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Module {
  id: number;
  title: string;
}

interface GenerationResponse {
  success: boolean;
  data?: {
    modules: Module[];
    fullCurriculum: string;
  };
  error?: string;
}

interface SaveResponse {
  success: boolean;
  data?: {
    accessToken: string;
    redirectUrl: string;
  };
  error?: string;
}

export const CurriculumGeneratorPage = () => {
  const navigate = useNavigate();
  const [courseTopic, setCourseTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateClick = () => {
    // Validate form
    if (!courseTopic.trim()) {
      setError('Please enter the main topic of your course');
      return;
    }
    if (!primaryGoal.trim()) {
      setError('Please enter the primary goal of your course');
      return;
    }
    
    setError('');
    setShowEmailModal(true);
  };

  const generateAndSendCurriculum = async () => {
    if (!userName.trim() || !userEmail.trim()) {
      setError('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsGenerating(true);
    setError('');

    // Create the course idea from the form inputs
    const skillLevelText = {
      'absolute-beginner': 'absolute beginners with no experience',
      'beginner': 'beginners with some basic knowledge but lacking structure',
      'intermediate': 'intermediate learners with foundational skills who want to advance'
    };

    const courseIdea = `I want to teach ${courseTopic} to ${skillLevelText[skillLevel as keyof typeof skillLevelText]}. The primary goal is ${primaryGoal}.`;

    try {
      // Check if environment variables are available
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration error: Missing Supabase credentials. Please contact support.');
      }

      console.log('Generating curriculum...');

      // First, generate the curriculum
      const generateResponse = await fetch(`${supabaseUrl}/functions/v1/generate-curriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({ courseIdea }),
      });

      if (!generateResponse.ok) {
        const errorText = await generateResponse.text();
        console.error('Generation response error:', errorText);
        throw new Error(`Server error (${generateResponse.status}): ${errorText || 'Unknown error'}`);
      }

      const generationData: GenerationResponse = await generateResponse.json();

      if (!generationData.success) {
        throw new Error(generationData.error || 'Failed to generate curriculum');
      }

      if (!generationData.data) {
        throw new Error('No curriculum data received');
      }

      console.log('Curriculum generated, now saving...');

      // Then, save it to the database and get the access token
      const saveResponse = await fetch(`${supabaseUrl}/functions/v1/send-full-curriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({
          userEmail,
          userName,
          courseIdea,
          modules: generationData.data.modules,
          fullCurriculum: generationData.data.fullCurriculum,
        }),
      });

      if (!saveResponse.ok) {
        const errorText = await saveResponse.text();
        throw new Error(`Server error (${saveResponse.status}): ${errorText || 'Unknown error'}`);
      }

      const saveData: SaveResponse = await saveResponse.json();

      if (!saveData.success) {
        throw new Error(saveData.error || 'Failed to save curriculum');
      }

      if (saveData.data?.accessToken) {
        // Immediately redirect to the curriculum view page
        navigate(`/curriculum/${saveData.data.accessToken}`);
      } else {
        throw new Error('No access token received');
      }
    } catch (err) {
      console.error('Generation error:', err);
      let errorMessage = 'Failed to generate curriculum';
      
      if (err instanceof Error) {
        if (err.message.includes('fetch')) {
          errorMessage = 'Network error: Unable to connect to our servers. Please check your internet connection and try again.';
        } else if (err.message.includes('CORS')) {
          errorMessage = 'Connection error: Please try refreshing the page and trying again.';
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsGenerating(false);
    }
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free AI Tool
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
              Create Your Course Curriculum
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray max-w-2xl mx-auto leading-relaxed">
              Answer these three questions to generate a personalized learning plan.
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20 shadow-2xl">
            <div className="space-y-8">
              {/* Question 1: Course Topic */}
              <div>
                <label htmlFor="courseTopic" className="block text-lg font-semibold text-brand-white mb-4">
                  1. What is the main topic of the course?
                </label>
                <input
                  type="text"
                  id="courseTopic"
                  value={courseTopic}
                  onChange={(e) => setCourseTopic(e.target.value)}
                  placeholder="e.g., Python, Sewing, Digital Marketing, Video Editing"
                  className="w-full px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                />
                <small className="text-brand-gray text-sm mt-2 block">
                  e.g., Python, Sewing, Digital Marketing, Video Editing
                </small>
              </div>

              {/* Question 2: Skill Level */}
              <div>
                <label className="block text-lg font-semibold text-brand-white mb-4">
                  2. What is the starting skill level of the learner?
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 bg-brand-black/30 rounded-xl cursor-pointer hover:bg-brand-black/50 transition-colors">
                    <input
                      type="radio"
                      name="skillLevel"
                      value="absolute-beginner"
                      checked={skillLevel === 'absolute-beginner'}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="mt-1 w-4 h-4 text-brand-purple bg-brand-black border-brand-purple/30 focus:ring-brand-purple focus:ring-2"
                    />
                    <div>
                      <div className="text-brand-white font-medium">Absolute Beginner</div>
                      <div className="text-brand-gray text-sm">Has no experience in the topic</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 bg-brand-black/30 rounded-xl cursor-pointer hover:bg-brand-black/50 transition-colors">
                    <input
                      type="radio"
                      name="skillLevel"
                      value="beginner"
                      checked={skillLevel === 'beginner'}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="mt-1 w-4 h-4 text-brand-purple bg-brand-black border-brand-purple/30 focus:ring-brand-purple focus:ring-2"
                    />
                    <div>
                      <div className="text-brand-white font-medium">Beginner</div>
                      <div className="text-brand-gray text-sm">Has some basic knowledge but lacks structure</div>
                    </div>
                  </label>
                  
                  <label className="flex items-start gap-3 p-4 bg-brand-black/30 rounded-xl cursor-pointer hover:bg-brand-black/50 transition-colors">
                    <input
                      type="radio"
                      name="skillLevel"
                      value="intermediate"
                      checked={skillLevel === 'intermediate'}
                      onChange={(e) => setSkillLevel(e.target.value)}
                      className="mt-1 w-4 h-4 text-brand-purple bg-brand-black border-brand-purple/30 focus:ring-brand-purple focus:ring-2"
                    />
                    <div>
                      <div className="text-brand-white font-medium">Intermediate</div>
                      <div className="text-brand-gray text-sm">Has foundational skills, wants to advance</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Question 3: Primary Goal */}
              <div>
                <label htmlFor="primaryGoal" className="block text-lg font-semibold text-brand-white mb-4">
                  3. What is the primary goal of this course?
                </label>
                <input
                  type="text"
                  id="primaryGoal"
                  value={primaryGoal}
                  onChange={(e) => setPrimaryGoal(e.target.value)}
                  placeholder="e.g., To build a personal website, to get a junior developer job, to learn how to knit a scarf"
                  className="w-full px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                />
                <small className="text-brand-gray text-sm mt-2 block">
                  e.g., To build a personal website, to get a junior developer job, to learn how to knit a scarf
                </small>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center mt-10">
              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerateClick}
                disabled={!courseTopic.trim() || !primaryGoal.trim()}
                className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Generate My Curriculum
              </Button>
            </div>

            {/* Error Display */}
            {error && !showEmailModal && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mt-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-red-400 font-medium mb-1">Error</p>
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-12">
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 text-brand-gray text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>100% Free</span>
              </div>
              <div className="w-px h-4 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="w-px h-4 bg-brand-gray/30 hidden sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>Instant Results</span>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Email Collection Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-brand-black to-gray-900 border border-brand-purple/30 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-purple/20 hover:bg-brand-purple/30 text-brand-gray hover:text-brand-white transition-colors"
              onClick={closeModal}
              disabled={isGenerating}
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-2 font-bricolage">
                Get Your Free Curriculum
              </h3>
              <p className="text-brand-gray text-sm">
                Enter your details to receive your complete course curriculum instantly
              </p>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="userName" className="block text-sm font-medium text-brand-white mb-2">
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-gray" />
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                    disabled={isGenerating}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="userEmailModal" className="block text-sm font-medium text-brand-white mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-brand-gray" />
                  <input
                    type="email"
                    id="userEmailModal"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="john@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                    disabled={isGenerating}
                  />
                </div>
              </div>
            </div>

            {/* Error Display in Modal */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-4">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Generate Button */}
            <Button
              variant="primary"
              size="lg"
              onClick={generateAndSendCurriculum}
              disabled={isGenerating || !userName.trim() || !userEmail.trim()}
              className="w-full shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                  Generating Your Curriculum...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate & View My Curriculum
                </>
              )}
            </Button>

            {/* Privacy Note */}
            <div className="text-center mt-4">
              <p className="text-xs text-brand-gray">
                🔒 We respect your privacy. No spam, just your curriculum and helpful course creation tips.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};