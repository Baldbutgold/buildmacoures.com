import React from 'react';
import { Container } from '../components/Container';
import { Link } from 'react-router-dom';
import { ArrowLeft, Shield } from 'lucide-react';

export const PrivacyPolicy = () => {
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
                <Shield className="w-4 h-4" />
                Legal Information
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-white mb-4 font-bricolage">
                Privacy Policy
              </h1>
              <p className="text-brand-gray text-lg">
                Last updated: January 15, 2024
              </p>
            </div>

            <div className="prose prose-lg prose-invert max-w-none">
              <h2>Information We Collect</h2>
              <p>
                When you visit BuildMaCourse or use our services, we may collect certain information about you, including:
              </p>
              <ul>
                <li><strong>Personal Information:</strong> Name, email address, phone number, and other contact details you provide when booking a consultation or contacting us.</li>
                <li><strong>Usage Information:</strong> Information about how you use our website, including pages visited, time spent, and interactions with our content.</li>
                <li><strong>Technical Information:</strong> IP address, browser type, device information, and other technical data collected automatically.</li>
              </ul>

              <h2>How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Provide and improve our course creation services</li>
                <li>Communicate with you about our services and respond to your inquiries</li>
                <li>Schedule and conduct strategy calls and consultations</li>
                <li>Send you relevant updates and marketing communications (with your consent)</li>
                <li>Analyze website usage to improve user experience</li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>

              <h2>Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul>
                <li><strong>Service Providers:</strong> We may share information with trusted third-party service providers who assist us in operating our website and conducting our business.</li>
                <li><strong>Legal Requirements:</strong> We may disclose information when required by law or to protect our rights, property, or safety.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.</li>
              </ul>

              <h2>Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet or electronic storage is 100% secure.
              </p>

              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access the personal information we hold about you</li>
                <li>Request correction of inaccurate or incomplete information</li>
                <li>Request deletion of your personal information</li>
                <li>Opt-out of marketing communications</li>
                <li>Object to certain processing of your information</li>
              </ul>

              <h2>Cookies and Tracking</h2>
              <p>
                Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyze website traffic, and understand user preferences. You can control cookie settings through your browser preferences.
              </p>

              <h2>Third-Party Services</h2>
              <p>
                Our website may contain links to third-party websites or integrate with third-party services (such as Calendly for scheduling). We are not responsible for the privacy practices of these third parties.
              </p>

              <h2>Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
              </p>

              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2>Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
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