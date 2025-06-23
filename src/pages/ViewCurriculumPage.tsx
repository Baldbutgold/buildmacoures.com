import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { BookOpen, ArrowLeft, Calendar, Download, Loader2, Sparkles, CheckCircle, FileText } from 'lucide-react';
import jsPDF from 'jspdf';

interface CurriculumData {
  id: string;
  user_email: string;
  course_idea: string;
  generated_modules: Array<{ id: number; title: string }>;
  full_curriculum_content: string;
  created_at: string;
}

interface ParsedSection {
  type: 'title' | 'subtitle' | 'heading' | 'paragraph' | 'list' | 'bold';
  content: string;
  level?: number;
}

// Enhanced component to parse and render curriculum content cleanly
const CurriculumRenderer = ({ content }: { content: string }) => {
  const parseContent = (text: string): ParsedSection[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const sections: ParsedSection[] = [];
    
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      
      // Course Title (usually the first ## heading)
      if (trimmed.startsWith('## Course Title')) {
        continue; // Skip this header, we'll handle the title separately
      }
      
      // Main headings (##)
      if (trimmed.startsWith('## ')) {
        sections.push({
          type: 'title',
          content: trimmed.replace('## ', '').trim()
        });
      }
      // Sub headings (###)
      else if (trimmed.startsWith('### ')) {
        sections.push({
          type: 'subtitle',
          content: trimmed.replace('### ', '').trim()
        });
      }
      // Week headings (#### or **Week**)
      else if (trimmed.startsWith('#### ') || trimmed.match(/^\*\*Week \d+/)) {
        let weekContent = trimmed.replace('#### ', '').replace(/^\*\*/, '').replace(/\*\*$/, '').trim();
        sections.push({
          type: 'heading',
          content: weekContent
        });
      }
      // Module titles (**Module Title:** ...)
      else if (trimmed.match(/^\*\*Module Title:\*\*/)) {
        const moduleTitle = trimmed.replace(/^\*\*Module Title:\*\*\s*/, '').trim();
        if (moduleTitle) {
          sections.push({
            type: 'bold',
            content: `Module: ${moduleTitle}`
          });
        }
      }
      // Other bold text (**text**)
      else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
        sections.push({
          type: 'bold',
          content: trimmed.replace(/^\*\*/, '').replace(/\*\*$/, '').trim()
        });
      }
      // List items (- or *)
      else if (trimmed.match(/^[-*]\s+/)) {
        sections.push({
          type: 'list',
          content: trimmed.replace(/^[-*]\s+/, '').trim()
        });
      }
      // Regular paragraphs
      else if (trimmed.length > 0) {
        sections.push({
          type: 'paragraph',
          content: trimmed
        });
      }
    }
    
    return sections;
  };

  const renderSection = (section: ParsedSection, index: number) => {
    const key = `section-${index}`;
    
    switch (section.type) {
      case 'title':
        return (
          <h2 key={key} className="text-2xl sm:text-3xl font-bold text-brand-white mb-6 mt-8 first:mt-0 font-bricolage border-b border-brand-purple/20 pb-3">
            {section.content}
          </h2>
        );
      
      case 'subtitle':
        return (
          <h3 key={key} className="text-xl sm:text-2xl font-bold text-brand-purple mb-4 mt-6 font-bricolage">
            {section.content}
          </h3>
        );
      
      case 'heading':
        return (
          <h4 key={key} className="text-lg sm:text-xl font-bold text-brand-white mb-3 mt-5 bg-brand-purple/10 px-4 py-2 rounded-lg border-l-4 border-brand-purple">
            {section.content}
          </h4>
        );
      
      case 'bold':
        return (
          <div key={key} className="text-base sm:text-lg font-semibold text-brand-white mb-3 mt-4 pl-4 border-l-2 border-brand-purple/50">
            {section.content}
          </div>
        );
      
      case 'list':
        return (
          <div key={key} className="flex items-start gap-3 mb-2 ml-6">
            <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 flex-shrink-0"></div>
            <p className="text-brand-gray leading-relaxed">{section.content}</p>
          </div>
        );
      
      case 'paragraph':
        return (
          <p key={key} className="text-brand-gray leading-relaxed mb-4">
            {section.content}
          </p>
        );
      
      default:
        return null;
    }
  };

  const sections = parseContent(content);
  
  return (
    <div className="space-y-2">
      {sections.map((section, index) => renderSection(section, index))}
    </div>
  );
};

export const ViewCurriculumPage = () => {
  const { token } = useParams<{ token: string }>();
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchCurriculum = async () => {
      if (!token) {
        setError('Invalid curriculum link');
        setLoading(false);
        return;
      }

      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          import.meta.env.VITE_SUPABASE_URL,
          import.meta.env.VITE_SUPABASE_ANON_KEY
        );

        const { data, error: fetchError } = await supabase
          .from('generated_curricula')
          .select('*')
          .eq('access_token', token)
          .single();

        if (fetchError) {
          console.error('Fetch error:', fetchError);
          setError('Curriculum not found or access denied');
          return;
        }

        setCurriculum(data);
      } catch (err) {
        console.error('Error fetching curriculum:', err);
        setError('Failed to load curriculum');
      } finally {
        setLoading(false);
      }
    };

    fetchCurriculum();
  }, [token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const downloadAsPDF = async () => {
    if (!curriculum) return;
    
    setIsDownloading(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;
      const maxWidth = pageWidth - (margin * 2);
      let yPosition = margin;
      
      // Helper function to add text with word wrapping
      const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        pdf.setTextColor(color);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        
        // Check if we need a new page
        if (yPosition + (lines.length * fontSize * 0.5) > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * fontSize * 0.5 + 5;
      };
      
      // Add header
      addText('Course Curriculum', 20, true, '#7c3aed');
      addText(`Generated on: ${formatDate(curriculum.created_at)}`, 10, false, '#666666');
      yPosition += 10;
      
      // Add course idea
      addText('Course Overview:', 14, true);
      addText(curriculum.course_idea, 11);
      yPosition += 10;
      
      // Add modules overview if available
      if (curriculum.generated_modules && curriculum.generated_modules.length > 0) {
        addText('Course Modules:', 14, true);
        curriculum.generated_modules.forEach((module, index) => {
          addText(`${module.id}. ${module.title}`, 11);
        });
        yPosition += 10;
      }
      
      // Process and add curriculum content
      const lines = curriculum.full_curriculum_content.split('\n').filter(line => line.trim());
      
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        
        // Main headings
        if (trimmed.startsWith('## ')) {
          yPosition += 5;
          addText(trimmed.replace('## ', ''), 16, true, '#7c3aed');
        }
        // Sub headings
        else if (trimmed.startsWith('### ')) {
          addText(trimmed.replace('### ', ''), 14, true, '#9333ea');
        }
        // Week headings
        else if (trimmed.startsWith('#### ') || trimmed.match(/^\*\*Week \d+/)) {
          const weekContent = trimmed.replace('#### ', '').replace(/^\*\*/, '').replace(/\*\*$/, '');
          addText(weekContent, 12, true);
        }
        // Module titles
        else if (trimmed.match(/^\*\*Module Title:\*\*/)) {
          const moduleTitle = trimmed.replace(/^\*\*Module Title:\*\*\s*/, '');
          if (moduleTitle) {
            addText(`Module: ${moduleTitle}`, 11, true);
          }
        }
        // Bold text
        else if (trimmed.startsWith('**') && trimmed.endsWith('**') && trimmed.length > 4) {
          addText(trimmed.replace(/^\*\*/, '').replace(/\*\*$/, ''), 11, true);
        }
        // List items
        else if (trimmed.match(/^[-*]\s+/)) {
          addText(`• ${trimmed.replace(/^[-*]\s+/, '')}`, 10);
        }
        // Regular paragraphs
        else {
          addText(trimmed, 10);
        }
      }
      
      // Add footer
      yPosition = pageHeight - margin;
      pdf.setFontSize(8);
      pdf.setTextColor('#666666');
      pdf.text('Generated by BuildMaCourse - https://buildmacourse.com', margin, yPosition);
      
      // Save the PDF
      pdf.save('my-course-curriculum.pdf');
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      // Fallback to text download
      const content = `
Course Curriculum
Generated on: ${formatDate(curriculum.created_at)}

Course Overview: ${curriculum.course_idea}

${curriculum.full_curriculum_content}

---
Generated by BuildMaCourse
https://buildmacourse.com
      `.trim();

      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'my-course-curriculum.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-purple mx-auto mb-4" />
          <p className="text-brand-gray">Loading your curriculum...</p>
        </div>
      </div>
    );
  }

  if (error || !curriculum) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 sm:p-12 border border-red-500/20">
              <h1 className="text-2xl sm:text-3xl font-bold text-brand-white mb-4">
                Curriculum Not Found
              </h1>
              <p className="text-brand-gray mb-8">
                {error || 'The curriculum you\'re looking for doesn\'t exist or has been removed.'}
              </p>
              <Link to="/generate-curriculum">
                <Button variant="primary">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate New Curriculum
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Link
              to="/generate-curriculum"
              className="inline-flex items-center gap-2 text-brand-purple hover:text-brand-purple-dark font-medium transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Generate Another Curriculum
            </Link>
            
            <button
              onClick={downloadAsPDF}
              disabled={isDownloading}
              className="inline-flex items-center gap-2 bg-brand-purple hover:bg-brand-purple-dark text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating PDF...
                </>
              ) : (
                <>
                  <FileText className="w-4 h-4" />
                  Download PDF
                </>
              )}
            </button>
          </div>

          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 bg-green-500/20 text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <CheckCircle className="w-4 h-4" />
              🎉 Your Curriculum is Ready!
            </div>
          </div>

          {/* Course Overview Card */}
          <div className="bg-gradient-to-br from-brand-purple/10 to-brand-purple-dark/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
            <div className="text-center">
              <div className="inline-flex items-center gap-2 bg-brand-purple/20 text-brand-purple px-3 py-1 rounded-full text-sm font-medium mb-4">
                <BookOpen className="w-4 h-4" />
                Course Overview
              </div>
              <p className="text-sm text-brand-gray mb-4">
                Generated on {formatDate(curriculum.created_at)}
              </p>
              <div className="bg-brand-black/30 border border-brand-purple/20 rounded-xl p-4">
                <p className="text-brand-white font-medium text-lg">
                  {curriculum.course_idea}
                </p>
              </div>
            </div>
          </div>

          {/* Module Overview */}
          {curriculum.generated_modules && curriculum.generated_modules.length > 0 && (
            <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-6 text-center">
                📚 Course Modules Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {curriculum.generated_modules.map((module) => (
                  <div key={module.id} className="group bg-brand-black/30 hover:bg-brand-black/50 rounded-xl p-4 transition-all duration-200 border border-brand-purple/10 hover:border-brand-purple/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-purple to-brand-purple-dark text-white flex items-center justify-center font-bold text-sm group-hover:scale-110 transition-transform duration-200">
                        {module.id}
                      </div>
                      <span className="text-brand-white font-medium group-hover:text-brand-purple transition-colors duration-200">
                        {module.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Full Curriculum Content */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-12 border border-brand-purple/20 shadow-lg mb-8">
            <div className="text-center mb-8">
              <h3 className="text-xl sm:text-2xl font-bold text-brand-white mb-2">
                📋 Complete Curriculum Details
              </h3>
              <p className="text-brand-gray text-sm">
                Your personalized learning roadmap with detailed week-by-week breakdown
              </p>
            </div>
            
            <div className="prose prose-lg prose-invert max-w-none">
              <CurriculumRenderer content={curriculum.full_curriculum_content} />
            </div>
          </div>

          {/* What's Next Section */}
          <div className="bg-gradient-to-r from-brand-purple to-brand-purple-dark text-white p-6 sm:p-8 lg:p-12 rounded-2xl shadow-purple-lg">
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 font-bricolage">
                🚀 Ready to Turn This Into Reality?
              </h2>
              <p className="text-lg sm:text-xl text-purple-100 mb-6 max-w-3xl mx-auto">
                You now have a complete, professional curriculum. The next step? Let's validate it and turn it into a profitable course that actually sells.
              </p>
              <p className="text-xl font-semibold text-white mb-8">
                That's exactly what BuildMaCourse specializes in.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => window.location.href = '/#schedule-call'}
                  className="bg-white text-brand-purple hover:bg-gray-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Your Free Strategy Call
                </Button>
                <Link to="/generate-curriculum">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-brand-purple">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Generate Another Curriculum
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};