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
  modules: ModuleData[];
  capstoneProject: string;
  duration: string;
  timeCommitment: string;
  level: string;
}

interface ModuleData {
  moduleNumber: number;
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
  const modules: ModuleData[] = [];
  let capstoneProject = '';
  
  let currentSection = '';
  let currentModule: Partial<ModuleData> = {};
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
    
    // Module sections
    if (trimmed.match(/^### Module \d+/)) {
      if (currentModule.moduleNumber) {
        modules.push(currentModule as ModuleData);
      }
      const moduleMatch = trimmed.match(/Module (\d+)/);
      currentModule = {
        moduleNumber: moduleMatch ? parseInt(moduleMatch[1]) : modules.length + 1,
        moduleTitle: '',
        keyTopics: [],
        activities: [],
        resources: []
      };
      currentSection = 'module';
      continue;
    }
    
    // Module Title within module
    if (currentSection === 'module' && trimmed.match(/^\*\*Module Title:\*\*/)) {
      currentModule.moduleTitle = trimmed.replace(/^\*\*Module Title:\*\*\s*/, '').trim();
      continue;
    }
    
    // Key Topics - Remove "Key Topics:" from display
    if (currentSection === 'module' && (trimmed.includes('Key Topics:') || trimmed.includes('- Key Topics:'))) {
      currentSection = 'topics';
      continue;
    } else if (currentSection === 'topics' && trimmed.match(/^[-*]\s+/)) {
      currentModule.keyTopics?.push(trimmed.replace(/^[-*]\s+/, '').trim());
      continue;
    }
    
    // Activities
    if (currentSection === 'module' && (trimmed.includes('Activities:') || trimmed.includes('Activity:'))) {
      currentSection = 'activities';
      continue;
    } else if (currentSection === 'activities' && trimmed.match(/^[-*]\s+/)) {
      currentModule.activities?.push(trimmed.replace(/^[-*]\s+/, '').trim());
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
  
  // Add the last module if exists
  if (currentModule.moduleNumber) {
    modules.push(currentModule as ModuleData);
  }
  
  return {
    title: title || 'Course Curriculum',
    description: description || 'A comprehensive learning journey designed to help you achieve your goals.',
    objectives,
    modules,
    capstoneProject,
    duration: `${modules.length} Modules`,
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
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([1])); // First module expanded by default

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

  const toggleModule = (moduleNumber: number) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded.has(moduleNumber)) {
      newExpanded.delete(moduleNumber);
    } else {
      newExpanded.add(moduleNumber);
    }
    setExpandedModules(newExpanded);
  };

  const downloadAsPDF = async () => {
    if (!curriculum) return;
    
    setIsDownloading(true);
    
    try {
      const pdf = new jsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 25;
      const maxWidth = pageWidth - (margin * 2);
      let yPosition = margin;
      
      // BuildMaCourse brand colors
      const brandPurple = [168, 85, 247]; // #a855f7
      const brandBlack = [10, 10, 10]; // #0a0a0a
      const brandGray = [107, 114, 128]; // #6b7280
      const brandWhite = [255, 255, 255]; // #ffffff
      const lightGray = [249, 250, 251]; // #f9fafb
      
      // Parse curriculum content
      const parsedCurriculum = parseCurriculumContent(curriculum.full_curriculum_content);
      
      // Helper function to add text with proper spacing and styling
      const addText = (text: string, fontSize: number, isBold: boolean = false, color: number[] = brandBlack, lineHeight: number = 1.4) => {
        pdf.setFontSize(fontSize);
        pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
        pdf.setTextColor(color[0], color[1], color[2]);
        
        const lines = pdf.splitTextToSize(text, maxWidth);
        const totalHeight = lines.length * fontSize * lineHeight * 0.352778; // Convert to mm
        
        // Check if we need a new page
        if (yPosition + totalHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        
        pdf.text(lines, margin, yPosition);
        yPosition += totalHeight + 3; // Add some spacing
        
        return totalHeight;
      };
      
      // Helper function to add a section divider
      const addDivider = () => {
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.setDrawColor(168, 85, 247);
        pdf.setLineWidth(0.5);
        pdf.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 8;
      };
      
      // HEADER SECTION - Clean and minimal
      pdf.setFillColor(brandPurple[0], brandPurple[1], brandPurple[2]);
      pdf.rect(0, 0, pageWidth, 35, 'F');
      
      // BuildMaCourse logo/title
      pdf.setTextColor(brandWhite[0], brandWhite[1], brandWhite[2]);
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('BuildMaCourse', margin, 20);
      
      // Subtitle
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.text('Course Curriculum Generator', margin, 28);
      
      yPosition = 50;
      
      // COURSE TITLE SECTION
      addText(parsedCurriculum.title, 24, true, brandPurple);
      yPosition += 5;
      
      // Course description in a subtle box
      pdf.setFillColor(lightGray[0], lightGray[1], lightGray[2]);
      const descHeight = 25;
      pdf.rect(margin - 5, yPosition - 5, maxWidth + 10, descHeight, 'F');
      
      addText(parsedCurriculum.description, 11, false, brandBlack);
      yPosition += 10;
      
      // Course stats - clean icons using text
      const statsY = yPosition;
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(brandGray[0], brandGray[1], brandGray[2]);
      
      // Duration
      pdf.text('📚', margin, statsY);
      pdf.text(parsedCurriculum.duration, margin + 10, statsY);
      
      // Time commitment
      pdf.text('⏱️', margin + 60, statsY);
      pdf.text(parsedCurriculum.timeCommitment, margin + 70, statsY);
      
      // Level
      pdf.text('👤', margin + 120, statsY);
      pdf.text(parsedCurriculum.level, margin + 130, statsY);
      
      yPosition = statsY + 15;
      
      addDivider();
      
      // LEARNING OBJECTIVES
      addText('Learning Objectives', 16, true, brandPurple);
      
      parsedCurriculum.objectives.forEach(objective => {
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(brandBlack[0], brandBlack[1], brandBlack[2]);
        
        // Check for page break
        if (yPosition > pageHeight - 20) {
          pdf.addPage();
          yPosition = margin;
        }
        
        // Checkmark
        pdf.setTextColor(34, 197, 94); // Green color
        pdf.text('✓', margin, yPosition);
        
        // Objective text
        pdf.setTextColor(brandBlack[0], brandBlack[1], brandBlack[2]);
        const lines = pdf.splitTextToSize(objective, maxWidth - 15);
        pdf.text(lines, margin + 10, yPosition);
        yPosition += lines.length * 4 + 2;
      });
      
      yPosition += 10;
      addDivider();
      
      // MODULE BREAKDOWN
      addText('Module Breakdown', 16, true, brandPurple);
      
      parsedCurriculum.modules.forEach((module, index) => {
        // Check for page break before module
        if (yPosition > pageHeight - 60) {
          pdf.addPage();
          yPosition = margin;
        }
        
        // Module header with subtle background
        pdf.setFillColor(248, 250, 252);
        pdf.rect(margin - 5, yPosition - 3, maxWidth + 10, 15, 'F');
        
        // Module title
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(brandPurple[0], brandPurple[1], brandPurple[2]);
        pdf.text(`Module ${module.moduleNumber}: ${module.moduleTitle}`, margin, yPosition + 5);
        yPosition += 20;
        
        // Module content
        if (module.keyTopics.length > 0) {
          module.keyTopics.forEach(topic => {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(brandBlack[0], brandBlack[1], brandBlack[2]);
            
            if (yPosition > pageHeight - 15) {
              pdf.addPage();
              yPosition = margin;
            }
            
            pdf.text('•', margin + 5, yPosition);
            const lines = pdf.splitTextToSize(topic, maxWidth - 15);
            pdf.text(lines, margin + 12, yPosition);
            yPosition += lines.length * 3.5 + 1;
          });
        }
        
        // Activities
        if (module.activities.length > 0) {
          yPosition += 3;
          pdf.setFontSize(10);
          pdf.setFont('helvetica', 'bold');
          pdf.setTextColor(brandPurple[0], brandPurple[1], brandPurple[2]);
          pdf.text('Activity:', margin + 5, yPosition);
          yPosition += 5;
          
          module.activities.forEach(activity => {
            pdf.setFontSize(9);
            pdf.setFont('helvetica', 'normal');
            pdf.setTextColor(brandBlack[0], brandBlack[1], brandBlack[2]);
            
            if (yPosition > pageHeight - 15) {
              pdf.addPage();
              yPosition = margin;
            }
            
            pdf.text('•', margin + 10, yPosition);
            const lines = pdf.splitTextToSize(activity, maxWidth - 20);
            pdf.text(lines, margin + 17, yPosition);
            yPosition += lines.length * 3.5 + 1;
          });
        }
        
        yPosition += 8;
      });
      
      // CAPSTONE PROJECT
      if (parsedCurriculum.capstoneProject) {
        if (yPosition > pageHeight - 40) {
          pdf.addPage();
          yPosition = margin;
        }
        
        addDivider();
        
        // Trophy icon and title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(brandPurple[0], brandPurple[1], brandPurple[2]);
        pdf.text('🏆 Final Capstone Project', margin, yPosition);
        yPosition += 10;
        
        addText(parsedCurriculum.capstoneProject, 10, false, brandBlack);
      }
      
      // FOOTER - Clean and minimal
      const totalPages = pdf.getNumberOfPages();
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i);
        
        // Footer background
        pdf.setFillColor(brandPurple[0], brandPurple[1], brandPurple[2]);
        pdf.rect(0, pageHeight - 15, pageWidth, 15, 'F');
        
        // Footer text
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.setTextColor(brandWhite[0], brandWhite[1], brandWhite[2]);
        pdf.text('Generated by BuildMaCourse', margin, pageHeight - 8);
        pdf.text('buildmacourse.com', pageWidth - margin - 30, pageHeight - 8);
        
        // Page number
        if (totalPages > 1) {
          pdf.text(`${i} / ${totalPages}`, pageWidth - margin - 10, pageHeight - 3);
        }
      }
      
      // Create clean filename from course title
      const cleanTitle = parsedCurriculum.title
        .replace(/[^a-zA-Z0-9\s]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .toLowerCase() // Convert to lowercase
        .substring(0, 50); // Limit length
      
      // Save the PDF
      pdf.save(`${cleanTitle}-curriculum.pdf`);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      
      // Fallback to text download
      const parsedCurriculum = parseCurriculumContent(curriculum.full_curriculum_content);
      const content = `
BuildMaCourse - Course Curriculum
Generated on: ${formatDate(curriculum.created_at)}

${parsedCurriculum.title}

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
      
      const cleanTitle = parsedCurriculum.title
        .replace(/[^a-zA-Z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .toLowerCase()
        .substring(0, 50);
      a.download = `${cleanTitle}-curriculum.txt`;
      
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

          {/* Course Header Card - Implementing the exact UI design requested */}
          <div className="bg-gradient-to-br from-brand-black/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-brand-purple/20 shadow-lg mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-white mb-4 font-bricolage">
              {parsedCurriculum.title}
            </h1>
            <p className="text-brand-gray text-lg mb-6 leading-relaxed">
              {parsedCurriculum.description}
            </p>
            
            {/* Course Stats - Implementing the exact icon layout requested */}
            <div className="flex flex-wrap items-center gap-8 text-brand-gray">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-brand-purple" />
                <span className="font-medium">{parsedCurriculum.duration}</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-brand-purple" />
                <span className="font-medium">{parsedCurriculum.timeCommitment}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-brand-purple" />
                <span className="font-medium">{parsedCurriculum.level}</span>
              </div>
            </div>
          </div>

          {/* Learning Objectives - Implementing the exact checkmark format */}
          {parsedCurriculum.objectives.length > 0 && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-brand-white mb-6 font-bricolage">
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

          {/* Module-by-Module Breakdown - Implementing the exact collapsible design */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-brand-white mb-6 font-bricolage">
              Module-by-Module Breakdown
            </h2>
            
            <div className="space-y-4">
              {parsedCurriculum.modules.map((module) => {
                const isExpanded = expandedModules.has(module.moduleNumber);
                
                return (
                  <div key={module.moduleNumber} className="border border-brand-purple/30 rounded-lg overflow-hidden bg-brand-black/30">
                    {/* Module Header - Implementing the exact collapsible header design */}
                    <button
                      onClick={() => toggleModule(module.moduleNumber)}
                      className="w-full flex items-center justify-between p-4 bg-brand-purple/10 hover:bg-brand-purple/20 transition-colors duration-200 border-b border-brand-purple/20"
                    >
                      <div className="flex items-center gap-3">
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-brand-purple" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-brand-purple" />
                        )}
                        <span className="text-brand-white font-semibold text-left">
                          Module {module.moduleNumber}: {module.moduleTitle}
                        </span>
                      </div>
                    </button>
                    
                    {/* Module Content - Implementing the exact content layout */}
                    {isExpanded && (
                      <div className="p-6 space-y-4">
                        {/* Key Topics - Removed "Key Topics:" label as requested */}
                        {module.keyTopics.length > 0 && (
                          <div>
                            <ul className="space-y-2">
                              {module.keyTopics.map((topic, index) => (
                                <li key={index} className="flex items-start gap-3 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{topic}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Activities */}
                        {module.activities.length > 0 && (
                          <div>
                            <h4 className="text-brand-purple font-semibold mb-3">Activity:</h4>
                            <ul className="space-y-2">
                              {module.activities.map((activity, index) => (
                                <li key={index} className="flex items-start gap-3 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{activity}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* Resources */}
                        {module.resources.length > 0 && (
                          <div>
                            <h4 className="text-brand-purple font-semibold mb-3">Resources:</h4>
                            <ul className="space-y-2">
                              {module.resources.map((resource, index) => (
                                <li key={index} className="flex items-start gap-3 text-brand-gray">
                                  <span className="w-1.5 h-1.5 bg-brand-purple rounded-full mt-2 flex-shrink-0"></span>
                                  <span>{resource}</span>
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

          {/* Capstone Project - Implementing the exact trophy design */}
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
                <button
                  onClick={downloadAsPDF}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed border border-white/20 hover:border-white/40"
                >
                  {isDownloading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating PDF...
                    </>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      Download Your PDF Now
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};