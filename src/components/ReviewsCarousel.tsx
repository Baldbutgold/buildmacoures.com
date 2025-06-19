import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "TrackerBot",
    profession: "SaaS Company",
    comment: "Outstanding course production — exceeded expectations in every way. The attention to detail and professionalism made the process smooth and enjoyable.",
    rating: 5
  },
  {
    name: "Cadrin",
    profession: "Entrepreneur",
    comment: "Best experience I've had working with anyone on a creative project. Very professional, explained the whole process, and gave it his all. I'll definitely be working with him again.",
    rating: 5
  },
  {
    name: "Hackutopia",
    profession: "Product Creator",
    comment: "Went above and beyond to resolve my concerns and nailed it. Made multiple iterations until I was fully happy. Exceptional service.",
    rating: 5
  },
  {
    name: "Ethan",
    profession: "Udemy Instructor",
    comment: "I needed a full web development course created, and he delivered an excellent one. Clear structure, high-quality editing, and fantastic communication.",
    rating: 5
  },
  {
    name: "Willie",
    profession: "Business Owner",
    comment: "The most awesome experience. Communication was top-tier, and the work exceeded expectations. Highly recommend and will be coming back soon.",
    rating: 5
  },
  {
    name: "Mark",
    profession: "Startup Founder",
    comment: "Very responsive and proactive. Also kept it flexible throughout the process.",
    rating: 5
  },
  {
    name: "Ahmed",
    profession: "Agency Owner",
    comment: "Amazing to work with. Patient, easy to communicate with, and delivered excellent quality.",
    rating: 5
  },
  {
    name: "Zaid",
    profession: "Entrepreneur",
    comment: "Very good at what he does and very cooperative. Listens to your feedback and implements it well. Will definitely work together again.",
    rating: 5
  },
  {
    name: "Demahamo",
    profession: "Business Owner",
    comment: "Highly recommended. Did a great job, provided multiple revisions, and shared useful information throughout the process.",
    rating: 5
  },
  {
    name: "Alex",
    profession: "Startup Founder",
    comment: "It was a pleasure to work together. Smart, hardworking, and creative. I hope our paths cross again soon.",
    rating: 5
  }
];

export const ReviewsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const velocity = useRef(0.3);
  const targetVelocity = useRef(0.3);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState(null as null | typeof reviews[0]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let animationFrame: number;
    let scrollAmount = 0;

    function animate() {
      if (!carousel) return;
      velocity.current += (targetVelocity.current - velocity.current) * 0.08;
      scrollAmount += velocity.current;
      if (scrollAmount >= carousel.scrollWidth / 2) {
        scrollAmount = 0;
      }
      carousel.scrollLeft = scrollAmount;
      animationFrame = requestAnimationFrame(animate);
    }
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const allReviews = [...reviews, ...reviews];

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex items-center gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-brand-black to-gray-900 overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            What Clients Are Saying
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-white mb-4 font-bricolage">
            Trusted by Creators Worldwide
          </h2>
          <p className="text-xl text-brand-gray max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've transformed their expertise into profitable courses
          </p>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { targetVelocity.current = 0.1; }}
          onMouseLeave={() => { targetVelocity.current = 0.3; }}
        >
          {allReviews.map((review, idx) => {
            const isLong = review.comment.length > 180;
            const displayComment = isLong ? review.comment.substring(0, 180) + '...' : review.comment;
            
            return (
              <div
                key={idx}
                className="group relative bg-brand-black/50 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-purple-lg transition-all duration-500 p-8 w-[380px] min-w-[380px] border border-brand-purple/20 hover:border-brand-purple/40 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8 text-brand-purple" />
                </div>

                {/* Star rating */}
                <StarRating rating={review.rating} />

                {/* Review content - takes up available space */}
                <div className="flex-grow mb-6">
                  <p className="text-brand-gray leading-relaxed text-base font-medium">
                    "{displayComment}"
                  </p>
                  {isLong && (
                    <button
                      className="text-brand-purple hover:text-brand-purple-dark text-sm mt-2 font-medium transition-colors duration-200 underline underline-offset-2"
                      onClick={() => { setModalReview(review); setModalOpen(true); }}
                    >
                      Read full review
                    </button>
                  )}
                </div>

                {/* Client info - always at bottom */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-brand-purple/20">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-brand-white text-lg">{review.name}</div>
                    <div className="text-brand-gray text-sm font-medium">{review.profession}</div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-purple/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-brand-gray">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-brand-white">4.9/5 Average Rating</span>
            </div>
            <div className="w-px h-6 bg-brand-gray/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-white">80+ Courses Created</span>
            </div>
            <div className="w-px h-6 bg-brand-gray/30 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-brand-white">98% Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {modalOpen && modalReview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-brand-black border border-brand-purple/30 rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-100"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-brand-purple/20 hover:bg-brand-purple/30 text-brand-gray hover:text-brand-white transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="mb-6">
              <StarRating rating={modalReview.rating} />
            </div>

            <div className="mb-8">
              <Quote className="w-8 h-8 text-brand-purple/30 mb-4" />
              <p className="text-lg text-brand-gray leading-relaxed font-medium">
                "{modalReview.comment}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-brand-purple/20">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-purple to-brand-purple-dark rounded-full flex items-center justify-center text-white font-bold text-xl">
                {modalReview.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-brand-white text-xl">{modalReview.name}</div>
                <div className="text-brand-gray font-medium">{modalReview.profession}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};