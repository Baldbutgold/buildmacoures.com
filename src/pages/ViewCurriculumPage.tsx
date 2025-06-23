import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/Container';
import { Button } from '../components/Button';
import { BookOpen, ArrowLeft, Calendar, Download, Loader2, Sparkles, CheckCircle, FileText, Clock, Users, ChevronDown, ChevronRight, Trophy } from 'lucide-react';
import jsPDF from 'jspdf';

interface CurriculumData {
  id: string;
  user_email: string;
  course_idea: string;
  generated_modules: Array<{ id: number; title: string }>;
  full_curriculum_content: string;
  created_at: string;
}

interface ParsedCurriculum {
  title: string;
  description: string;
  objectives: string[];
  weeks: WeekData[];
  capstoneProject: string;
  duration: string;
  timeCommitment: string;
  level: string;
}

interface WeekData {
  weekNumber: number;
  moduleTitle: string;
  keyTopics: string[];
  activities: string[];
  resources: string[];
}

// Enhanced component to parse curriculum content into structured format
const parseCurriculumContent = (content: string): ParsedCurriculum => {
  const lines = content.split('\n').filter(line => line.trim());
  
  let title = '';
  let description = '';
  const objectives: string[] = [];
  const weeks: WeekData[] = [];
  let capstoneProject = '';
  
  let currentSection = '';
  let currentWeek: Partial<WeekData> = {};
  let collectingObjectives = false;
  let collectingCapstone = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    
    // Course Title
    if (trimmed.startsWith('## Course Title')) {
      currentSection = 'title';
      continue;
    } else if (currentSection === 'title' && !trimmed.startsWith('##')) {
      title = trimmed;
      currentSection = '';
      continue;
    }
    
    // Course Description
    if (trimmed.startsWith('## Course Description')) {
      currentSection = 'description';
      continue;
    } else if (currentSection === 'description' && !trimmed.startsWith('##')) {
      description += (description ? ' ' : '') + trimmed;
      continue;
    }
    
    // Learning Objectives
    if (trimmed.startsWith('## Learning Objectives')) {
      collectingObjectives = true;
      currentSection = 'objectives';
      continue;
    } else if (collectingObjectives && trimmed.startsWith('##')) {
      collectingObjectives = false;
    } else if (collectingObjectives && trimmed.match(/^[-*]\s+/)) {
      objectives.push(trimmed.replace(/^[-*]\s+/, '').trim());
      continue;
    }
    
    // Week sections
    if (trimmed.match(/^### Week \d+/)) {
      if (currentWeek.weekNumber) {
        weeks.push(currentWeek as WeekData);
      }
      const weekMatch = trimmed.match(/Week (\d+)/);
      currentWeek = {
        weekNumber: weekMatch ? parseInt(weekMatch[1]) : weeks.length + 1,
        moduleTitle: '',
        keyTopics: [],
        activities: [],
        resources: []
      };
      currentSection = 'week';
      continue;
    }
    
    // Module Title within week
    if (currentSection === 'week' && trimmed.match(/^\*\*Module Title:\*\*/)) {
      currentWeek.moduleTitle = trimmed.replace(/^\*\*Module Title:\*\*\s*/, '').trim();
      continue;
    }
    
    // Key Topics
    if (currentSection === 'week' && trimmed.includes('Key Topics:')) {
      currentSection = 'topics';
      continue;
    } else if (currentSection === 'topics' && trimmed.match(/^[-*]\s+/)) {
      currentWeek.keyTopics?.push(trimmed.replace(/^[-*]\s+/, '').trim());
      continue;
    }
    
    // Activities
    if (currentSection === 'week' && trimmed.includes('Activities:')) {
      currentSection = 'activities';
      continue;
    } else if (currentSection === 'activities' && trimmed.match(/^[-*]\s+/)) {
      currentWeek.activities?.push(trimmed.replace(/^[-*]\s+/, '').trim());
      continue;
    }
    
    // Capstone Project
    if (trimmed.startsWith('## Capstone Project') || trimmed.startsWith('## Final Project')) {
      collectingCapstone = true;
      currentSection = 'capstone';
      continue;
    } else if (collectingCapstone && !trimmed.startsWith('##')) {
      capstoneProject += (capstoneProject ? ' ' : '') + trimmed;
      continue;
    }
    
    // Reset section on new major heading
    if (trimmed.startsWith('##')) {
      currentSection = '';
      collectingObjectives = false;
      collectingCapstone = false;
    }
  }
  
  // Add the last week if exists
  if (currentWeek.weekNumber) {
    weeks.push(currentWeek as WeekData);
  }
  
  return {
    title: title || 'Course Curriculum',
    description: description || 'A comprehensive learning journey designed to help you achieve your goals.',
    objectives,
    weeks,
    capstoneProject,
    duration: '8 Weeks',
    timeCommitment: '3-5 hrs/week',
    level: 'Beginner'
  };
};

export const ViewCurriculumPage = () => {
  const { token } = useParams<{ token: string }>();
  const [curriculum, setCurriculum] = useState<CurriculumData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState<Set<number>>(new Set([1])); // First week expanded by default

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

  const toggleWeek = (weekNumber: number) => {
    const newExpanded = new Set(expandedWeeks);
    if (newExpanded.has(weekNumber)) {
      newExpanded.delete(weekNumber);
    } else {
      newExpanded.add(weekNumber);
    }
    setExpandedWeeks(newExpanded);
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
      
      // Brand colors (converted to RGB for jsPDF)
      const brandPurple = [168, 85, 247]; // #a855f7
      const brandBlack = [10, 10, 10]; // #0a0a0a
      const brandGray = [209, 213, 219]; // #d1d5db
      
      // Helper function to add text with word wrapping and brand styling
      const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = brandBlack) => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        pdf.setTextColor(color[0], color[1], color[2]);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        
        // Check if we need a new page
        if (yPosition + (lines.length * fontSize * 0.5) > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(lines, margin, yPosition);
        yPosition += lines.length * fontSize * 0.5 + 5;
      };
      
      // Add purple header background
      pdf.setFillColor(168, 85, 247);
      pdf.rect(0, 0, pageWidth, 40, 'F');
      
      // Add header content
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(24);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Course Curriculum', margin, 25);
      
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`Generated by BuildMaCourse • ${formatDate(curriculum.created_at)}`, margin, 35);
      
      yPosition = 55;
      
      // Parse curriculum content
      const parsedCurriculum = parseCurriculumContent(curriculum.full_curriculum_content);
      
      // Course overview section with background
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin - 5, yPosition - 5, maxWidth + 10, 60, 'F');
      
      addText(parsedCurriculum.title, 18, true, brandPurple);
      addText(parsedCurriculum.description, 11, false, brandBlack);
      
      // Course details with icons (using text symbols)
      yPosition += 5;
      addText(`📅 ${parsedCurriculum.duration}    ⏰ ${parsedCurriculum.timeCommitment}    👤 ${parsedCurriculum.level}`, 10, false, brandGray);
      
      yPosition += 15;
      
      // Learning Objectives
      addText('Learning Objectives', 16, true, brandPurple);
      parsedCurriculum.objectives.forEach(objective => {
        addText(`✓ ${objective}`, 10, false, brandBlack);
      });
      
      yPosition += 10;
      
      // Week-by-Week Breakdown
      addText('Week-by-Week Breakdown', 16, true, brandPurple);
      
      parsedCurriculum.weeks.forEach((week, index) => {
        // Week header with background
        if (yPosition > pageHeight - 80) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.setFillColor(168, 85, 247, 0.1);
        pdf.rect(margin - 5, yPosition - 2, maxWidth + 10, 20, 'F');
        
        addText(`Week ${week.weekNumber}: ${week.moduleTitle}`, 14, true, brandPurple);
        
        // Key Topics
        if (week.keyTopics.length > 0) {
          addText('Key Topics:', 11, true, brandBlack);
          week.keyTopics.forEach(topic => {
            addText(`• ${topic}`, 10, false, brandBlack);
          });
        }
        
        // Activities
        if (week.activities.length > 0) {
          addText('Activities:', 11, true, brandBlack);
          week.activities.forEach(activity => {
            addText(`• ${activity}`, 10, false, brandBlack);
          });
        }
        
        yPosition += 5;
      });
      
      // Capstone Project
      if (parsedCurriculum.capstoneProject) {
        yPosition += 10;
        addText('🏆 Final Capstone Project', 16, true, brandPurple);
        addText(parsedCurriculum.capstoneProject, 11, false, brandBlack);
      }
      
      // Footer
      const footerY = pageHeight - 15;
      pdf.setFillColor(168, 85, 247);
      pdf.rect(0, footerY - 5, pageWidth, 20, 'F');
      pdf.setTextColor(255, 255, 255);
      pdf.setFontSize(8);
      pdf.text('Generated by BuildMaCourse - https://buildmacourse.com', margin, footerY);
      
      // Save the PDF
      pdf.save(`${parsedCurriculum.title.replace(/[^a-zA-Z0-9]/g, '-')}-curriculum.pdf`);
      
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

  const parsedCurriculum = parseCurriculumContent(curriculum.full_curriculum_content);

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-black via-gray-900 to-brand-black pt-20 sm:pt-24 lg:pt-32">
      <Container>
        <div className="max-w-4xl mx-auto">
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

          {/* Course Header Card */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-brand-white mb-4 font-bricolage">
              {parsedCurriculum.title}
            </h1>
            <p className="text-brand-gray text-lg mb-6 leading-relaxed">
              {parsedCurriculum.description}
            </p>
            
            {/* Course Stats */}
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-brand-gray">
                <Clock className="w-4 h-4 text-brand-purple" />
                <span>{parsedCurriculum.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-gray">
                <BookOpen className="w-4 h-4 text-brand-purple" />
                <span>{parsedCurriculum.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2 text-brand-gray">
                <Users className="w-4 h-4 text-brand-purple" />
                <span>{parsedCurriculum.level}</span>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          {parsedCurriculum.objectives.length > 0 && (
            <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-brand-white mb-6 font-bricolage">
                Learning Objectives
              </h2>
              <div className="space-y-3">
                {parsedCurriculum.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-brand-gray">{objective}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Week-by-Week Breakdown */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-white mb-6 font-bricolage">
              Week-by-Week Breakdown
            </h2>
            
            <div className="space-y-4">
              {parsedCurriculum.weeks.map((week) => {
                const isExpanded = expandedWeeks.has(week.weekNumber);
                
                return (
                  <div key={week.weekNumber} className="border border-brand-purple/20 rounded-xl overflow-hidden">
                    {/* Week Header */}
                    <button
                      onClick={() => toggleWeek(week.weekNumber)}
                      className="w-full flex items-center justify-between p-4 bg-brand-purple/10 hover:bg-brand-purple/20 transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-brand-purple" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-brand-purple" />
                        )}
                        <span className="text-brand-white font-semibold">
                          Week {week.weekNumber}: {week.moduleTitle}
                        </span>
                      </div>
                    </button>
                    
                    {/* Week Content */}
                    {isExpanded && (
                      <div className="p-4 bg-brand-black/30 space-y-4">
                        {/* Key Topics */}
                        {week.keyTopics.length > 0 && (
                          <div>
                            <h4 className="text-brand-purple font-semibold mb-2">Key Topics:</h4>
                            <ul className="space-y-1">
                              {week.keyTopics.map((topic, index) => (
                                <li key={index} className="flex items-start gap-2 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  {topic}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Activities */}
                        {week.activities.length > 0 && (
                          <div>
                            <h4 className="text-brand-purple font-semibold mb-2">Activities:</h4>
                            <ul className="space-y-1">
                              {week.activities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-2 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  {activity}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Resources */}
                        {week.resources.length > 0 && (
                          <div>
                            <h4 className="text-brand-purple font-semibold mb-2">Resources:</h4>
                            <ul className="space-y-1">
                              {week.resources.map((resource, index) => (
                                <li key={index} className="flex items-start gap-2 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Capstone Project */}
          {parsedCurriculum.capstoneProject && (
            <div className="bg-gradient-to-br from-brand-purple/10 to-brand-purple-dark/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-brand-purple/20 shadow-lg mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Trophy className="w-6 h-6 text-brand-purple" />
                <h2 className="text-xl sm:text-2xl font-bold text-brand-white font-bricolage">
                  🏆 Final Capstone Project
                </h2>
              </div>
              <p className="text-brand-gray leading-relaxed">
                {parsedCurriculum.capstoneProject}
              </p>
            </div>
          )}

          {/* CTA Section */}
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