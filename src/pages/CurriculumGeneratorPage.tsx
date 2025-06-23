import React, { useState } from 'react';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { Sparkles, BookOpen, Mail, CheckCircle, ArrowRight, Loader2 } from 'lucide-react';

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

interface EmailResponse {
  success: boolean;
  data?: {
    curriculumUrl: string;
    accessToken: string;
  };
  error?: string;
}

export const CurriculumGeneratorPage = () => {
  const [courseIdea, setCourseIdea] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [modules, setModules] = useState<Module[]>([]);
  const [fullCurriculum, setFullCurriculum] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [curriculumUrl, setCurriculumUrl] = useState('');
  const [error, setError] = useState('');

  const generatePreview = async () => {
    if (!courseIdea.trim()) {
      setError('Please enter your course idea');
      return;
    }

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/generate-curriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ courseIdea }),
      });

      const data: GenerationResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate curriculum');
      }

      if (data.data) {
        setModules(data.data.modules);
        setFullCurriculum(data.data.fullCurriculum);
        setShowEmailForm(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate curriculum');
    } finally {
      setIsGenerating(false);
    }
  };

  const sendFullCurriculum = async () => {
    if (!userEmail.trim()) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSending(true);
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-full-curriculum`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userEmail,
          courseIdea,
          modules,
          fullCurriculum,
        }),
      });

      const data: EmailResponse = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to send curriculum');
      }

      if (data.data) {
        setCurriculumUrl(data.data.curriculumUrl);
        setIsComplete(true);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send curriculum');
    } finally {
      setIsSending(false);
    }
  };

  const resetForm = () => {
    setCourseIdea('');
    setUserEmail('');
    setModules([]);
    setFullCurriculum('');
    setShowEmailForm(false);
    setIsComplete(false);
    setCurriculumUrl('');
    setError('');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-brand-purple/20">
              <div className="flex justify-center mb-8">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
                🎉 Your Curriculum is Ready!
              </h1>
              
              <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-2xl mx-auto leading-relaxed">
                Check your email for the complete curriculum. We've also created a private link for you to access it anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href={curriculumUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1"
                >
                  <BookOpen className="w-5 h-5" />
                  View Your Curriculum
                </a>
                
                <button
                  onClick={resetForm}
                  className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors"
                >
                  Generate Another Curriculum
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="bg-brand-purple/10 border border-brand-purple/20 rounded-2xl p-6 mb-8">
                <h3 className="text-xl font-bold text-brand-white mb-4">What's Next?</h3>
                <p className="text-brand-gray mb-4">
                  Now that you have a complete, professional curriculum, the next critical step is to validate it. 
                  How can you be 100% sure people will pay for this before you spend months building it?
                </p>
                <p className="text-brand-purple font-semibold">
                  That's exactly what we help with at BuildMaCourse.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={() => window.location.href = '/#schedule-call'}
                className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1"
              >
                Book Your Free Strategy Call
              </Button>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Free AI Tool
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
              Instant Curriculum Generator
            </h1>
            <p className="text-lg sm:text-xl text-brand-gray max-w-3xl mx-auto leading-relaxed">
              Transform your course idea into a professional curriculum in seconds. 
              Just describe your course concept and our AI will create a complete structure for you.
            </p>
          </div>

          {/* Main Form */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20 shadow-2xl">
            {/* Step 1: Course Idea Input */}
            <div className="mb-8">
              <label htmlFor="courseIdea" className="block text-lg font-semibold text-brand-white mb-4">
                Describe your course idea in one sentence:
              </label>
              <textarea
                id="courseIdea"
                value={courseIdea}
                onChange={(e) => setCourseIdea(e.target.value)}
                placeholder="Example: I want to teach busy professionals how to cook healthy meals in under 30 minutes"
                className="w-full h-32 px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200 resize-none"
                disabled={isGenerating || showEmailForm}
              />
            </div>

            {/* Generate Button */}
            {!showEmailForm && (
              <div className="text-center mb-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={generatePreview}
                  disabled={isGenerating || !courseIdea.trim()}
                  className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Generating Your Curriculum...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate My Curriculum Preview
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Error Display */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6">
                <p className="text-red-400 text-center">{error}</p>
              </div>
            )}

            {/* Preview Results */}
            {modules.length > 0 && (
              <div className="mb-8">
                <h3 className="text-xl font-bold text-brand-white mb-6 text-center">
                  🎯 Your Course Curriculum Preview
                </h3>
                
                <div className="bg-brand-black/30 rounded-2xl p-6 mb-6">
                  <h4 className="text-lg font-semibold text-brand-purple mb-4">Course Modules:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {modules.map((module) => (
                      <div key={module.id} className="flex items-center gap-3 p-3 bg-brand-purple/10 rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-sm">
                          {module.id}
                        </div>
                        <span className="text-brand-white font-medium">{module.title}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-brand-gray mb-6">
                    This is just a preview! Get the complete curriculum with detailed lesson plans, 
                    learning objectives, and implementation guide.
                  </p>
                </div>
              </div>
            )}

            {/* Email Form */}
            {showEmailForm && (
              <div className="bg-gradient-to-r from-brand-purple/10 to-brand-purple-dark/10 rounded-2xl p-6 sm:p-8">
                <div className="text-center mb-6">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-2">
                    Get Your Complete Curriculum
                  </h3>
                  <p className="text-brand-gray">
                    Enter your email to receive the full curriculum with detailed lesson plans and implementation guide.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-end">
                  <div className="flex-1">
                    <label htmlFor="userEmail" className="block text-sm font-medium text-brand-white mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="userEmail"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full px-4 py-3 bg-brand-black/50 border border-brand-purple/20 rounded-xl text-brand-white placeholder-brand-gray focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 transition-all duration-200"
                      disabled={isSending}
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={sendFullCurriculum}
                    disabled={isSending || !userEmail.trim()}
                    className="shadow-purple-lg hover:shadow-purple transform hover:-translate-y-1 whitespace-nowrap"
                  >
                    {isSending ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Get Full Curriculum
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center mt-4">
                  <p className="text-xs text-brand-gray">
                    🔒 We respect your privacy. No spam, just your curriculum and helpful course creation tips.
                  </p>
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
    </div>
  );
};