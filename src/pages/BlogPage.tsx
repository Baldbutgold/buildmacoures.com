import React from 'react';
import { Container } from '../components/Container';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Structure Your Online Course for Maximum Engagement',
    slug: 'how-to-structure-online-course-maximum-engagement',
    excerpt: 'Learn the proven framework for organizing your course content that keeps students engaged from start to finish.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2024-01-15',
    readTime: '8 min read',
    tags: ['Course Creation', 'Student Engagement', 'Course Structure'],
    featured: true
  },
  {
    id: '2',
    title: '5 Video Production Mistakes That Kill Course Sales',
    slug: '5-video-production-mistakes-kill-course-sales',
    excerpt: 'Avoid these common video production pitfalls that can make your course look unprofessional and hurt your sales.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2024-01-10',
    readTime: '6 min read',
    tags: ['Video Production', 'Course Sales', 'Professional Quality']
  },
  {
    id: '3',
    title: 'The Complete Guide to Pricing Your Online Course',
    slug: 'complete-guide-pricing-online-course',
    excerpt: 'Discover the psychology and strategy behind pricing your course to maximize revenue while providing value.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2024-01-05',
    readTime: '12 min read',
    tags: ['Pricing Strategy', 'Course Revenue', 'Value Proposition']
  },
  {
    id: '4',
    title: 'From Expert to Educator: Making the Transition',
    slug: 'from-expert-to-educator-making-transition',
    excerpt: 'How to transform your professional expertise into teachable content that resonates with your audience.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2024-01-01',
    readTime: '10 min read',
    tags: ['Teaching Skills', 'Content Creation', 'Expertise']
  },
  {
    id: '5',
    title: 'Course Launch Checklist: 20 Steps to Success',
    slug: 'course-launch-checklist-20-steps-success',
    excerpt: 'A comprehensive checklist to ensure your course launch goes smoothly and generates maximum impact.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2023-12-28',
    readTime: '15 min read',
    tags: ['Course Launch', 'Marketing', 'Checklist']
  },
  {
    id: '6',
    title: 'Building Authority Through Educational Content',
    slug: 'building-authority-educational-content',
    excerpt: 'How creating educational content positions you as an industry leader and attracts premium opportunities.',
    content: '',
    author: 'BuildMaCourse',
    publishedAt: '2023-12-20',
    readTime: '7 min read',
    tags: ['Authority Building', 'Content Marketing', 'Thought Leadership']
  }
];

export const BlogPage = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <title>Course Creation Blog | BuildMaCourse - Expert Tips & Strategies</title>
      <meta name="description" content="Learn course creation strategies, video production tips, and marketing insights from BuildMaCourse experts. Free resources for online course creators and educators." />
      <meta name="keywords" content="course creation blog, online course tips, video production, course marketing, educational content, course strategy" />
      <link rel="canonical" href="https://buildmacourse.com/blog" />
      
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                BuildMaCourse Blog
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-6 font-bricolage">
                Course Creation Insights & Tips
              </h1>
              <p className="text-lg sm:text-xl text-brand-gray max-w-3xl mx-auto">
                Learn from industry insights, proven strategies, and expert tips to create successful online courses that generate revenue and establish your authority.
              </p>
            </div>

            {/* Featured Post */}
            {featuredPost && (
              <div className="mb-12 sm:mb-16">
                <article className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-brand-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                    <div className="flex items-center gap-4 text-sm text-brand-gray">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <time dateTime={featuredPost.publishedAt}>{formatDate(featuredPost.publishedAt)}</time>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white mb-4 font-bricolage">
                    <Link to={`/blog/${featuredPost.slug}`} className="hover:text-brand-purple transition-colors">
                      {featuredPost.title}
                    </Link>
                  </h2>
                  
                  <p className="text-lg text-brand-gray mb-6 leading-relaxed">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, index) => (
                      <span key={index} className="bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors group"
                  >
                    Read Full Article
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              </div>
            )}

            {/* Regular Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {regularPosts.map((post) => (
                <article key={post.id} className="group bg-brand-black/50 backdrop-blur-sm rounded-2xl p-6 border border-brand-purple/20 hover:border-brand-purple/40 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-purple-lg">
                  <div className="flex items-center gap-4 text-sm text-brand-gray mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-white mb-3 group-hover:text-brand-purple transition-colors font-bricolage">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-brand-gray mb-4 leading-relaxed text-sm">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="bg-brand-purple/20 text-brand-purple px-2 py-1 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-semibold transition-colors group text-sm"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </article>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-16 sm:mt-20 text-center">
              <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-3xl shadow-purple-lg">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 font-bricolage">
                  Ready to Create Your Own Course?
                </h2>
                <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                  Stop reading about course creation and start building your own profitable course with expert guidance.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <Link
                    to="/generate-curriculum"
                    className="inline-flex items-center gap-3 bg-white text-brand-purple px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-gray-50 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl group"
                  >
                    Generate Free Curriculum
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button 
                    onClick={() => {
                      window.location.href = '/#schedule-call';
                    }}
                    className="inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg transition-all duration-300 transform hover:-translate-y-1 border border-white/20 hover:border-white/40 group"
                  >
                    Book Strategy Call
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};