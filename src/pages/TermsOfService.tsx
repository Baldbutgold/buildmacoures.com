import React from 'react';
import { Container } from '../components/Container';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText } from 'lucide-react';

export const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-4xl mx-auto">
          {/* Back to Home */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-medium transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20 mb-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-4 py-2 rounded-full text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Legal Agreement
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
                Terms of Service
              </h1>
              <p className="text-brand-gray text-lg">
                Last updated: January 15, 2024
              </p>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <h2>Agreement to Terms</h2>
              <p>
                By accessing and using BuildMaCourse services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>

              <h2>Description of Service</h2>
              <p>
                BuildMaCourse, operated by MonetizeUrContent LLC, provides professional online course creation services including strategy, curriculum design, content development, video production, and platform setup.
              </p>

              <h2>Service Terms</h2>
              <h3>Strategy Calls</h3>
              <ul>
                <li>Initial strategy calls are provided free of charge</li>
                <li>Calls are scheduled through our Calendly booking system</li>
                <li>No-show policy: If you miss a scheduled call without 24-hour notice, you may be required to reschedule</li>
              </ul>

              <h3>Course Creation Services</h3>
              <ul>
                <li>Services are provided based on agreed-upon project scope and timeline</li>
                <li>Payment terms will be outlined in individual service agreements</li>
                <li>Revisions are included as specified in your service package</li>
                <li>Final deliverables remain your intellectual property</li>
              </ul>

              <h2>User Responsibilities</h2>
              <p>You agree to:</p>
              <ul>
                <li>Provide accurate and complete information when requested</li>
                <li>Respond to communications in a timely manner</li>
                <li>Provide necessary content and materials for course development</li>
                <li>Review and approve deliverables within agreed timeframes</li>
                <li>Make payments according to agreed terms</li>
              </ul>

              <h2>Intellectual Property</h2>
              <p>
                You retain all rights to your original content and intellectual property. BuildMaCourse retains rights to our methodologies, templates, and proprietary processes. Any content created collaboratively will be owned by you, with BuildMaCourse retaining the right to use anonymized case studies for marketing purposes.
              </p>

              <h2>Payment Terms</h2>
              <ul>
                <li>Payment schedules will be outlined in individual service agreements</li>
                <li>Late payments may incur additional fees</li>
                <li>Refund policies are specified in individual service agreements</li>
                <li>All prices are in USD unless otherwise specified</li>
              </ul>

              <h2>Limitation of Liability</h2>
              <p>
                BuildMaCourse and MonetizeUrContent LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your use of our services.
              </p>

              <h2>Disclaimers</h2>
              <p>
                While we strive to provide high-quality services, we make no guarantees about specific outcomes, revenue generation, or course success. Results depend on many factors including market conditions, your marketing efforts, and course topic viability.
              </p>

              <h2>Termination</h2>
              <p>
                Either party may terminate services with written notice. Upon termination, you will receive all completed work and pay for services rendered up to the termination date.
              </p>

              <h2>Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
              </p>

              <h2>Governing Law</h2>
              <p>
                These terms shall be interpreted and governed by the laws of the United States. Any disputes will be resolved through binding arbitration.
              </p>

              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of any material changes via email or website notice.
              </p>

              <h2>Contact Information</h2>
              <p>
                For questions about these Terms of Service, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> info@buildmacourse.com<br />
                <strong>Company:</strong> MonetizeUrContent LLC
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};