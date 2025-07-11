import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Sparkles, CheckCircle, AlertTriangle, User, Mail, X, Loader2, Zap, Coffee, Rocket } from 'lucide-react';
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

const funLoadingMessages = [
  "🤖 Our AI minions are crafting your curriculum...",
  "⚡ Brewing some educational magic...",
  "🎯 Teaching our robots about your topic...",
  "🧠 Consulting the wisdom of the internet...",
  "🔥 Cooking up something amazing...",
  "🚀 Launching curriculum creation rockets...",
  "☕ Our AI is having its coffee break... just kidding, still working!",
  "🎨 Painting your learning journey...",
  "🔮 Predicting your educational future...",
  "⭐ Sprinkling some learning stardust..."
];

export const CurriculumGeneratorPage = () => {
  const navigate = useNavigate();
  const [courseTopic, setCourseTopic] = useState('');
  const [skillLevel, setSkillLevel] = useState('beginner');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [error, setError] = useState('');

  const handleGenerateClick = () => {
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

    // Start with a random fun message
    let messageIndex = Math.floor(Math.random() * funLoadingMessages.length);
    setLoadingMessage(funLoadingMessages[messageIndex]);

    // Change message every 3 seconds
    const messageInterval = setInterval(() => {
      messageIndex = (messageIndex + 1) % funLoadingMessages.length;
      setLoadingMessage(funLoadingMessages[messageIndex]);
    }, 3000);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error('Configuration error: Missing Supabase credentials. Please contact support.');
      }

      // Generate the curriculum using the new format
      const generateResponse = await fetch(`${supabaseUrl}/functions/v1/generate-curriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'apikey': supabaseAnonKey,
        },
        body: JSON.stringify({ 
          courseTopic,
          skillLevel,
          primaryGoal
        }),
      });

      if (!generateResponse.ok) {
        const errorText = await generateResponse.text();
        throw new Error(`Server error (${generateResponse.status}): ${errorText || 'Unknown error'}`);
      }

      const generationData: GenerationResponse = await generateResponse.json();

      if (!generationData.success) {
        throw new Error(generationData.error || 'Failed to generate curriculum');
      }

      if (!generationData.data) {
        throw new Error('No curriculum data received');
      }

      // Save it to the database
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
          courseIdea: `${courseTopic} course for ${skillLevel} level learners with goal: ${primaryGoal}`,
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
      clearInterval(messageInterval);
      setIsGenerating(false);
      setLoadingMessage('');
    }
  };

  const closeModal = () => {
    setShowEmailModal(false);
    setError('');
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Free AI Course Curriculum Generator | BuildMaCourse</title>
      <meta name="description" content="Generate a professional course curriculum in minutes with our free AI-powered tool. Perfect for course creators, educators, and experts looking to structure their knowledge." />
      <meta name="keywords" content="course curriculum generator, AI curriculum tool, course planning, educational content, course structure, free curriculum maker" />
      <link rel="canonical" href="https://buildmacourse.com/generate-curriculum" />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
        <Container>
          <div className="max-w-2xl mx-auto">
            {/* Header */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4" />
                Free AI Tool
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-brand-white mb-3 font-bricolage">
                Create Your Course Curriculum
              </h1>
              <p className="text-brand-gray">
                Answer these three questions to generate a personalized learning plan.
              </p>
            </div>

            {/* Main Form */}
            <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-2xl">
              <div className="space-y-6">
                {/* Question 1 */}
                <div>
                  <label htmlFor="courseTopic" className="block text-lg font-semibold text-brand-white mb-3">
                    1. What is the main topic of the course?
                  </label>
                  <input
                    type="text"
                    id="courseTopic"
                    value={courseTopic}
                    onChange={(e) => setCourseTopic(e.target.value)}
                    placeholder="Python, Sewing, Digital Marketing, Video Editing"
                    className="w-full px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray/30 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                  />
                </div>

                {/* Question 2 */}
                <div>
                  <label className="block text-lg font-semibold text-brand-white mb-3">
                    2. What is the starting skill level of the learner?
                  </label>
                  <div className="space-y-3">
                    {[
                      { value: 'beginner', label: 'Beginner' },
                      { value: 'intermediate', label: 'Intermediate' },
                      { value: 'advanced', label: 'Advanced' }
                    ].map((option) => (
                      <label 
                        key={option.value} 
                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                          skillLevel === option.value 
                            ? 'bg-brand-purple/20 border border-brand-purple/40' 
                            : 'bg-brand-black/30 border border-transparent hover:bg-brand-black/50'
                        }`}
                      >
                        <div className="flex-shrink-0">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            skillLevel === option.value 
                              ? 'border-brand-purple bg-brand-purple' 
                              : 'border-brand-purple/50'
                          }`}>
                            {skillLevel === option.value && (
                              <div className="w-2 h-2 rounded-full bg-white"></div>
                            )}
                          </div>
                          <input
                            type="radio"
                            name="skillLevel"
                            value={option.value}
                            checked={skillLevel === option.value}
                            onChange={(e) => setSkillLevel(e.target.value)}
                            className="sr-only"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="text-brand-white font-medium">{option.label}</div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Question 3 */}
                <div>
                  <label htmlFor="primaryGoal" className="block text-lg font-semibold text-brand-white mb-3">
                    3. What is the primary goal of this course?
                  </label>
                  <input
                    type="text"
                    id="primaryGoal"
                    value={primaryGoal}
                    onChange={(e) => setPrimaryGoal(e.target.value)}
                    placeholder="To build a personal website, to get a junior developer job, to learn how to knit a scarf"
                    className="w-full px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray/30 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Generate Button */}
              <div className="flex justify-center mt-8">
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
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Trust Indicators */}
            <div className="text-center mt-6">
              <div className="flex justify-center items-center gap-6 text-brand-gray/80 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>100% Free</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span>No Credit Card</span>
                </div>
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
            <div className="bg-gradient-to-br from-brand-black to-gray-900 border border-brand-purple/30 rounded-2xl shadow-2xl p-6 max-w-md w-full relative">
              {/* Close Button */}
              {!isGenerating && (
                <button 
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-brand-purple/20 hover:bg-brand-purple/30 text-brand-gray hover:text-brand-white transition-colors"
                  onClick={closeModal}
                >
                  <X className="w-4 h-4" />
                </button>
              )}

              {/* Modal Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center mx-auto mb-4">
                  {isGenerating ? (
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  ) : (
                    <Sparkles className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-brand-white mb-2 font-bricolage">
                  {isGenerating ? 'Creating Your Curriculum' : 'Get Your Free Curriculum'}
                </h3>
                {isGenerating ? (
                  <div className="space-y-2">
                    <p className="text-brand-purple text-sm font-medium">
                      {loadingMessage}
                    </p>
                    <p className="text-brand-gray text-xs">
                      This usually takes 10-30 seconds...
                    </p>
                  </div>
                ) : (
                  <p className="text-brand-gray text-sm">
                    Enter your details to receive your complete course curriculum
                  </p>
                )}
              </div>

              {/* Form Fields */}
              {!isGenerating && (
                <>
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
                          className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
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
                          className="w-full pl-10 pr-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray/40 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error Display */}
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
                    disabled={!userName.trim() || !userEmail.trim()}
                    className="w-full shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1"
                  >
                    <Rocket className="w-5 h-5 mr-2" />
                    Generate & View Curriculum
                  </Button>

                  {/* Privacy Note */}
                  <p className="text-xs text-brand-gray text-center mt-4">
                    🔒 We respect your privacy. No spam, just your curriculum.
                  </p>
                </>
              )}

              {/* Loading State */}
              {isGenerating && (
                <div className="text-center py-8">
                  <div className="flex justify-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-brand-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                  <p className="text-brand-gray text-sm">
                    Please don't close this window...
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};