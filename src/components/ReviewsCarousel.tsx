import React, { useRef, useEffect, useState } from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  { name: "TrackerBot", profession: "SaaS Company", comment: "Abdou truly delivered an outstanding video course production that exceeded my expectations! His keen attention to detail and professionalism made the process smooth, enjoyable, and quick. Working with him was a pleasure.", rating: 5 },
  { name: "Ethan", profession: "Udemy Instructor", comment: "I needed a web development Udemy course created, and Abdou delivered an excellent course for my Udemy. He addressed all my requirements and provided a comprehensive course outline before starting. The course had fantastic quality graphics and editing. He has excellent communication and always responds.", rating: 5 },
  { name: "Cadrin", profession: "Entrepreneur", comment: "The best experience l've had on fiver. Very professional, explained the whole process and even got the job done 2 weeks ahead of schedule, will definitely be working with him on more projects soon definitely gives it his all. If you're looking for professional, excellent costumer service and stellar work this is definitely your guy! Thank you sir", rating: 5 },
  { name: "Willie", profession: "Business Owner", comment: "The most awesome experience, i believe communication is key 🔑, and they went above expectations on all of the above. I would definitely recommend and will be using again in the near future 😊", rating: 5 },
  { name: "Mark", profession: "Startup Founder", comment: "Very responsive and proactive. Also keeping it flexible.", rating: 5 },
  { name: "hackutopia", profession: "Product Creator", comment: "I am very impressed with Mohammeds resolution and desire to ensure the customer is happy before finishing the completed order. He went above and beyond to resolve my concerns for improvements and create several additional iterations. Thank you", rating: 5 },
  { name: "ahmed", profession: "Agency Owner", comment: "Amazing guy to work with, very easy and patient. Delivered an excellent job.", rating: 5 },
  { name: "Zaid", profession: "Entrepreneur", comment: "This guy Mohammed is very good in his work and very cooperative....he listen your queries and implement it very nicely...Will work again with this brother. Thankyou very much brother for your time and effort.", rating: 5 },
  { name: "demahamo", profession: "Business Owner", comment: "highly recommended... good job.. revising many times.. sharing more information... thank you so much 👍👍", rating: 5 },
  { name: "alex", profession: "Startup Founder", comment: "It was pleasure to work with Mohammed. He is very smart, hard working and creative and I hope our paths will cross again soon!", rating: 5 }
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
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-brand-blue/10 text-brand-blue px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4 fill-current" />
            Client Success Stories
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-brand-black mb-4">
            Why top founders love working with us
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join hundreds of satisfied clients who've transformed their SaaS with our content solutions
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
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 w-[380px] min-w-[380px] border border-gray-100 hover:border-brand-blue/20 transform hover:-translate-y-2 flex flex-col"
              >
                {/* Quote icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <Quote className="w-8 h-8 text-brand-blue" />
                </div>

                {/* Star rating */}
                <StarRating rating={review.rating} />

                {/* Review content - takes up available space */}
                <div className="flex-grow mb-6">
                  <p className="text-gray-700 leading-relaxed text-base font-medium">
                    "{displayComment}"
                  </p>
                  {isLong && (
                    <button
                      className="text-brand-blue hover:text-brand-blue/80 text-sm mt-2 font-medium transition-colors duration-200 underline underline-offset-2"
                      onClick={() => { setModalReview(review); setModalOpen(true); }}
                    >
                      Read full review
                    </button>
                  )}
                </div>

                {/* Client info - always at bottom */}
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-gray-100">
                  <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="font-bold text-brand-black text-lg">{review.name}</div>
                    <div className="text-gray-500 text-sm font-medium">{review.profession}</div>
                  </div>
                </div>

                {/* Hover effect gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="flex flex-wrap justify-center items-center gap-8 text-gray-500">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-700">4.9/5 Average Rating</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">100+ Projects Completed</span>
            </div>
            <div className="w-px h-6 bg-gray-300 hidden sm:block" />
            <div className="flex items-center gap-2">
              <span className="font-semibold text-gray-700">98% Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal */}
      {modalOpen && modalReview && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setModalOpen(false)}
        >
          <div 
            className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full relative transform transition-all duration-300 scale-100"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
              onClick={() => setModalOpen(false)}
              aria-label="Close"
            >
              ×
            </button>

            <div className="mb-6">
              <StarRating rating={modalReview.rating} />
            </div>

            <div className="mb-8">
              <Quote className="w-8 h-8 text-brand-blue/20 mb-4" />
              <p className="text-lg text-gray-700 leading-relaxed font-medium">
                "{modalReview.comment}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-brand-blue to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                {modalReview.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <div className="font-bold text-brand-black text-xl">{modalReview.name}</div>
                <div className="text-gray-500 font-medium">{modalReview.profession}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};