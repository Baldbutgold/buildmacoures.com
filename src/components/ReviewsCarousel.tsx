import React, { useRef, useEffect, useState } from 'react';

const reviews = [
  { name: "TrackerBot", profession: "SaaS Company", comment: "Abdou truly delivered an outstanding video course production that exceeded my expectations! His keen attention to detail and professionalism made the process smooth, enjoyable, and quick. Working with him was a pleasure." },
  { name: "Ethan", profession: "Udemy Instructor", comment: "I needed a web development Udemy course created, and Abdou delivered an excellent course for my Udemy. He addressed all my requirements and provided a comprehensive course outline before starting. The course had fantastic quality graphics and editing. He has excellent communication and always responds." },
  { name: "Cadrin", profession: "Entrepreneur", comment: "The best experience l've had on fiver. Very professional, explained the whole process and even got the job done 2 weeks ahead of schedule, will definitely be working with him on more projects soon definitely gives it his all. If you’re looking for professional, excellent costumer service and stellar work this is definitely your guy! Thank you sir" },
  { name: "Willie", profession: "Business Owner", comment: "The most awesome experience, i believe communication is key 🔑, and they went above expectations on all of the above. I would definitely recommend and will be using again in the near future 😊" },
  { name: "Mark", profession: "Startup Founder", comment: "Very responsive and proactive. Also keeping it flexible." },
  { name: "hackutopia", profession: "Product Creator", comment: "I am very impressed with Mohammeds resolution and desire to ensure the customer is happy before finishing the completed order. He went above and beyond to resolve my concerns for improvements and create several additional iterations. Thank you" },
  { name: "ahmed", profession: "Agency Owner", comment: "Amazing guy to work with, very easy and patient. Delivered an excellent job." },
  { name: "Zaid", profession: "Entrepreneur", comment: "This guy Mohammed is very good in his work and very cooperative....he listen your queries and implement it very nicely...Will work again with this brother. Thankyou very much brother for your time and effort." },
  { name: "demahamo", profession: "Business Owner", comment: "highly recommended... good job.. revising many times.. sharing more information... thank you so much 👍👍" },
  { name: "alex", profession: "Startup Founder", comment: "It was pleasure to work with Mohammed. He is very smart, hard working and creative and I hope our paths will cross again soon!" }
];

export const ReviewsCarousel = () => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const velocity = useRef(0.2);
  const targetVelocity = useRef(0.2);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReview, setModalReview] = useState(null as null | typeof reviews[0]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    let animationFrame: number;
    let scrollAmount = 0;

    function animate() {
      if (!carousel) return;
      // Smoothly approach the target velocity
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

  // Duplicate reviews for seamless loop
  const allReviews = [...reviews, ...reviews];

  return (
    <section id="stories" className="avis_wrap py-16 bg-brand-white w-full">
      <div className="u-alignment-center u-mb-12 text-center mb-12">
        <h2 className="avis_title u-text-style-h3 text-3xl sm:text-4xl font-bold text-brand-black mb-2">Why top founders love working with us</h2>
      </div>
      <div className="avis_component overflow-x-hidden w-full">
        <div
          ref={carouselRef}
          className="flex gap-8 whitespace-nowrap overflow-x-auto scrollbar-hide w-full px-2 sm:px-8"
          style={{ scrollBehavior: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseEnter={() => { targetVelocity.current = 0; }}
          onMouseLeave={() => { targetVelocity.current = 0.2; }}
        >
          {allReviews.map((review, idx) => {
            const isLong = review.comment.length > 220;
            return (
              <div
                key={idx}
                className="avis_card bg-white rounded-2xl shadow-lg p-6 w-96 min-w-[340px] h-[240px] flex flex-col justify-center mx-2 border border-brand-gray/10 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="avis_content flex-1 flex flex-col justify-between">
                  <div className="avis_copy u-text-style-large text-base sm:text-lg text-brand-black text-center mb-4 break-words whitespace-normal line-clamp-5">
                    {review.comment}
                  </div>
                  {isLong && (
                    <button
                      className="text-gray-400 hover:text-brand-blue text-xs mt-1 mx-auto transition-colors duration-150 underline underline-offset-2"
                      style={{ textDecoration: 'underline dotted', fontWeight: 400, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                      onClick={() => { setModalReview(review); setModalOpen(true); }}
                    >
                      Read more
                    </button>
                  )}
                  <div className="avis_client u-mt-4 flex flex-col items-center">
                    <div className="avis_name font-semibold text-brand-black text-sm sm:text-base">{review.name}</div>
                    <div className="avis_profession text-xs sm:text-sm text-brand-blue opacity-80">{review.profession}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {modalOpen && modalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-2xl text-gray-400 hover:text-gray-700" onClick={() => setModalOpen(false)} aria-label="Close">&times;</button>
            <div className="text-lg text-brand-black mb-4 text-center">{modalReview.comment}</div>
            <div className="flex flex-col items-center">
              <div className="font-semibold text-brand-black text-base">{modalReview.name}</div>
              <div className="text-sm text-brand-blue opacity-80">{modalReview.profession}</div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
