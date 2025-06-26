import React, { useEffect } from 'react';
import { Container } from '../components/Container';
import { CheckCircle, Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CallBooked = () => {
  useEffect(() => {
    // Fire Google Analytics conversion event
    if (typeof gtag !== 'undefined') {
      gtag('event', 'conversion', {'send_to': 'AW-17230784555/c0PzCKrN0OMaEKvQo5hA'});
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32 flex items-center">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl border border-brand-purple/20">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
            </div>

            {/* Main Message */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
              🎉 Your Call is Booked!
            </h1>
            
            <p className="text-lg sm:text-xl text-brand-gray mb-8 max-w-2xl mx-auto leading-relaxed">
              Thank you for scheduling your free strategy call with BuildMaCourse. We're excited to help you turn your expertise into a profitable course!
            </p>

            {/* What's Next */}
            <div className="bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-purple mb-6">
                What happens next?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-white mb-2">Check Your Email</h3>
                    <p className="text-brand-gray text-sm">You'll receive a confirmation email with all the call details and a calendar invite.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-white mb-2">Prepare Your Ideas</h3>
                    <p className="text-brand-gray text-sm">Think about your expertise and what kind of course you'd like to create.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-brand-purple/20 text-brand-purple flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-brand-white mb-2">Join the Call</h3>
                    <p className="text-brand-gray text-sm">We'll discuss your vision and create a custom roadmap for your course.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-brand-purple/20 to-brand-purple-dark/20 rounded-2xl p-6 mb-8">
              <h3 className="text-lg font-bold text-brand-white mb-3">
                Need to reschedule or have questions?
              </h3>
              <p className="text-brand-gray mb-4">
                No problem! Just reply to the confirmation email or reach out to us directly.
              </p>
              <a 
                href="mailto:info@buildmacourse.com"
                className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors"
              >
                <Calendar className="w-4 h-4" />
                info@buildmacourse.com
              </a>
            </div>

            {/* Back to Home */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors group"
            >
              <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};