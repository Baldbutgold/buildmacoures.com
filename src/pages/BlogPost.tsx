import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { Calendar, Clock, ArrowLeft, ArrowRight, User } from 'lucide-react';

export const BlogPost = () => {
  const { slug } = useParams();

  // This would typically fetch the blog post data based on the slug
  // For now, we'll show a placeholder
  const post = {
    title: 'How to Structure Your Online Course for Maximum Engagement',
    author: 'Expert2Course',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    tags: ['Course Creation', 'Student Engagement', 'Course Structure'],
    content: `
      <p>Creating an engaging online course structure is crucial for student success and completion rates. In this comprehensive guide, we'll explore the proven frameworks that keep students engaged from start to finish.</p>
      
      <h2>The Foundation: Understanding Your Students</h2>
      <p>Before diving into course structure, it's essential to understand your target audience. What are their pain points? What outcomes do they want to achieve? This understanding forms the foundation of your course structure.</p>
      
      <h2>The 5-Part Course Structure Framework</h2>
      <p>Here's the proven framework I use for all my client courses:</p>
      
      <h3>1. Hook & Overview</h3>
      <p>Start with a compelling hook that immediately shows the value students will receive. Follow this with a clear overview of what they'll learn and achieve.</p>
      
      <h3>2. Foundation Building</h3>
      <p>Establish the fundamental concepts and knowledge students need before diving into advanced topics.</p>
      
      <h3>3. Core Content Modules</h3>
      <p>Break your main content into digestible modules, each focusing on a specific skill or concept.</p>
      
      <h3>4. Practical Application</h3>
      <p>Include hands-on exercises, case studies, and real-world applications to reinforce learning.</p>
      
      <h3>5. Next Steps & Resources</h3>
      <p>Conclude with clear next steps and additional resources for continued learning.</p>
      
      <h2>Engagement Techniques That Work</h2>
      <p>Beyond structure, here are specific techniques to maintain engagement:</p>
      
      <ul>
        <li>Use the "chunking" method - break content into 5-10 minute segments</li>
        <li>Include interactive elements every few minutes</li>
        <li>Use storytelling to make concepts memorable</li>
        <li>Provide regular progress indicators</li>
        <li>Include downloadable resources and worksheets</li>
      </ul>
      
      <h2>Measuring Success</h2>
      <p>Track these key metrics to ensure your structure is working:</p>
      
      <ul>
        <li>Course completion rates</li>
        <li>Student engagement metrics</li>
        <li>Feedback and reviews</li>
        <li>Time spent in each module</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>A well-structured course is the difference between students who complete your program and those who abandon it halfway through. By following this framework and focusing on student engagement, you'll create courses that not only educate but also generate positive reviews and referrals.</p>
      
      <p>Ready to create your own engaging course? Let's work together to structure your expertise into a profitable, professional course that your students will love.</p>
    `
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          {/* Article Header */}
          <article className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20">
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-4 text-sm text-brand-gray mb-6">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage leading-tight">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Article Content */}
            <div 
              className="prose prose-lg prose-invert max-w-none"
              style={{
                color: '#d1d5db',
                lineHeight: '1.7'
              }}
            >
              <style jsx>{`
                .prose h2 {
                  color: #ffffff;
                  font-size: 1.875rem;
                  font-weight: 700;
                  margin-top: 2rem;
                  margin-bottom: 1rem;
                  font-family: 'Bricolage Grotesque', sans-serif;
                }
                .prose h3 {
                  color: #a855f7;
                  font-size: 1.5rem;
                  font-weight: 600;
                  margin-top: 1.5rem;
                  margin-bottom: 0.75rem;
                }
                .prose p {
                  margin-bottom: 1.5rem;
                  color: #d1d5db;
                }
                .prose ul {
                  margin: 1.5rem 0;
                  padding-left: 1.5rem;
                }
                .prose li {
                  margin-bottom: 0.5rem;
                  color: #d1d5db;
                }
                .prose li::marker {
                  color: #a855f7;
                }
              `}</style>
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>
          </article>

          {/* CTA Section */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-bricolage">
                Ready to Structure Your Own Course?
              </h2>
              <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Let me help you create a professionally structured course that keeps students engaged and generates results.
              </p>
              <button 
                onClick={() => {
                  window.location.href = '/#schedule-call';
                }}
                className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
              >
                Book Your Free Strategy Call
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Related Articles */}
          <div className="mt-12 sm:mt-16">
            <h3 className="text-2xl font-bold text-brand-white mb-8 font-bricolage">
              Related Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Link
                to="/blog/5-video-production-mistakes-kill-course-sales"
                className="group bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h4 className="text-lg font-bold text-brand-white mb-2 group-hover:text-brand-purple transition-colors">
                  5 Video Production Mistakes That Kill Course Sales
                </h4>
                <p className="text-brand-gray text-sm mb-3">
                  Avoid these common video production pitfalls that can make your course look unprofessional.
                </p>
                <span className="text-brand-purple text-sm font-medium">6 min read</span>
              </Link>
              
              <Link
                to="/blog/complete-guide-pricing-online-course"
                className="group bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-1"
              >
                <h4 className="text-lg font-bold text-brand-white mb-2 group-hover:text-brand-purple transition-colors">
                  The Complete Guide to Pricing Your Online Course
                </h4>
                <p className="text-brand-gray text-sm mb-3">
                  Discover the psychology and strategy behind pricing your course to maximize revenue.
                </p>
                <span className="text-brand-purple text-sm font-medium">12 min read</span>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};