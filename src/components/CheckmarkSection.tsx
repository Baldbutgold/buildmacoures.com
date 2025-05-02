import React from 'react';
import { Container } from './Container';
import { CheckItem } from '../types';

export const CheckmarkSection = () => {
  const negatives: CheckItem[] = [
    { text: "Your first or next course launch falls flat, wasting time, energy & money.", positive: false },
    { text: "You might regret not acting now to tap into the multi-billion-dollar knowledge economy.", positive: false },
    { text: "Months—or even years—could pass as you struggle with the complexity of getting started.", positive: false },
    { text: "Your business won't grow.", positive: false },
  ];

  const positives: CheckItem[] = [
    { text: "Unlock a scalable revenue stream that generates income while you sleep.", positive: true },
    { text: "Impact more lives by sharing your expertise with a broader audience.", positive: true },
    { text: "Position yourself as an industry leader, attracting new clients and opportunities.", positive: true },
    { text: "Gain the freedom to work from anywhere, on your own terms.", positive: true },
  ];

  return (
    <div className="py-10 sm:py-16 bg-brand-black">
      <Container>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-brand-white mb-2">
            Creating an online course is overwhelming.
          </h2>
          <p className="text-sm text-brand-white text-center mb-8 font-normal">
            Without expert guidance, here's what often happens...
          </p>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
            <ul className="icon-list w-list-unstyled space-y-6">
              {negatives.slice(0, 2).map((item, idx) => (
                <li className="icon-list-item flex items-start" key={idx}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg" alt="Cross" className="w-6 h-6 mr-3 mt-1" />
                  <h3 className="h6-small-problem icon-list-heading text-base text-brand-white font-medium leading-snug">{item.text}</h3>
                </li>
              ))}
            </ul>
            <ul className="icon-list w-list-unstyled space-y-6">
              {negatives.slice(2).map((item, idx) => (
                <li className="icon-list-item flex items-start" key={idx}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Cross_red_circle.svg" alt="Cross" className="w-6 h-6 mr-3 mt-1" />
                  <h3 className="h6-small-problem icon-list-heading text-base text-brand-white font-medium leading-snug">{item.text}</h3>
                </li>
              ))}
            </ul>
          </div>
          <h2 className="heading-problem-2 text-2xl sm:text-3xl font-bold text-center text-brand-white mb-6">It doesn’t have to be this way.</h2>
          <div className="text-large-problem text-lg text-center text-brand-white/90 mb-10">
            Instead of guessing your way through course creation, <strong className="font-semibold">let Course Co. help you fast-track your success</strong>. With our proven strategies and expert support, you’ll have everything you need to plan, build, and begin to promote a course that works.<br /><br />
            <em className="italic">Imagine results like being able to...</em>
          </div>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-10">
            <ul className="icon-list w-list-unstyled space-y-6">
              {positives.slice(0, 2).map((item, idx) => (
                <li className="icon-list-item flex items-start" key={idx}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" alt="Checkmark" className="w-6 h-6 mr-3 mt-1" />
                  <h3 className="h6-small-problem icon-list-heading text-base text-brand-white font-medium leading-snug">{item.text}</h3>
                </li>
              ))}
            </ul>
            <ul className="icon-list w-list-unstyled space-y-6">
              {positives.slice(2).map((item, idx) => (
                <li className="icon-list-item flex items-start" key={idx}>
                  <img src="https://upload.wikimedia.org/wikipedia/commons/3/3b/Eo_circle_green_checkmark.svg" alt="Checkmark" className="w-6 h-6 mr-3 mt-1" />
                  <h3 className="h6-small-problem icon-list-heading text-base text-brand-white font-medium leading-snug">{item.text}</h3>
                </li>
              ))}
            </ul>
          </div>
          <div className="button-group-problem flex flex-col sm:flex-row justify-center gap-4 mt-8">
          </div>
        </div>
      </Container>
    </div>
  );
};