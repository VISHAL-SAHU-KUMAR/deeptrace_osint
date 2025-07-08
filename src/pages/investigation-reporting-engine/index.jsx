import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import TemplateLibrary from './components/TemplateLibrary';
import ReportBuilder from './components/ReportBuilder';
import EvidenceSelector from './components/EvidenceSelector';
import ReportPreview from './components/ReportPreview';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const InvestigationReportingEngine = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isEvidenceSelectorOpen, setIsEvidenceSelectorOpen] = useState(false);
  const [isReportPreviewOpen, setIsReportPreviewOpen] = useState(false);
  const [recentReports, setRecentReports] = useState([]);
  const [reportStats, setReportStats] = useState({
    totalReports: 0,
    pendingApproval: 0,
    completedToday: 0
  });

  useEffect(() => {
    // Mock data for recent reports
    setRecentReports([
      {
        id: 'rpt-001',
        title: 'Cybersecurity Incident Analysis',
        template: 'Incident Response Report',
        status: 'Draft',
        lastModified: '2024-01-19 15:30:00',
        author: 'Sarah Chen'
      },
      {
        id: 'rpt-002',
        title: 'Financial Fraud Investigation',
        template: 'Criminal Investigation Report',
        status: 'Under Review',
        lastModified: '2024-01-19 14:15:00',
        author: 'Mike Rodriguez'
      },
      {
        id: 'rpt-003',
        title: 'Social Media Intelligence Brief',
        template: 'OSINT Collection Summary',
        status: 'Approved',
        lastModified: '2024-01-19 12:45:00',
        author: 'Alex Johnson'
      }
    ]);

    // Mock stats
    setReportStats({
      totalReports: 247,
      pendingApproval: 12,
      completedToday: 8
    });
  }, []);

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
  };

  const handleEvidenceSelect = () => {
    setIsEvidenceSelectorOpen(true);
  };

  const handleEvidenceAdd = (evidenceItems) => {
    console.log('Adding evidence items:', evidenceItems);
    // Handle evidence addition logic
  };

  const handleReportPreview = () => {
    setIsReportPreviewOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Draft':
        return 'text-text-secondary bg-secondary-100';
      case 'Under Review':
        return 'text-warning bg-warning-100';
      case 'Approved':
        return 'text-success bg-success-100';
      case 'Rejected':
        return 'text-error bg-error-100';
      default:
        return 'text-text-secondary bg-secondary-100';
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey) {
        switch (event.key) {
          case 'e':
            event.preventDefault();
            handleEvidenceSelect();
            break;
          case 'r':
            event.preventDefault();
            console.log('Insert reference shortcut');
            break;
          case 'p':
            event.preventDefault();
            handleReportPreview();
            break;
          default:
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <main className="ml-64 mt-16 p-6">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-heading font-bold text-text-primary">
                Investigation Reporting Engine
              </h1>
              <p className="text-text-secondary mt-1">
                Generate comprehensive intelligence reports with automated evidence integration
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                iconName="Eye"
                onClick={handleReportPreview}
                disabled={!selectedTemplate}
              >
                Preview (Ctrl+P)
              </Button>
              
              <Button
                variant="primary"
                size="sm"
                iconName="FileText"
                onClick={() => console.log('Generate automated report')}
              >
                Auto-Generate Report
              </Button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Total Reports</p>
                  <p className="text-2xl font-heading font-bold text-text-primary">
                    {reportStats.totalReports}
                  </p>
                </div>
                <Icon name="FileText" size={24} className="text-primary" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Pending Approval</p>
                  <p className="text-2xl font-heading font-bold text-warning">
                    {reportStats.pendingApproval}
                  </p>
                </div>
                <Icon name="Clock" size={24} className="text-warning" />
              </div>
            </div>
            
            <div className="bg-surface border border-border rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-text-secondary">Completed Today</p>
                  <p className="text-2xl font-heading font-bold text-success">
                    {reportStats.completedToday}
                  </p>
                </div>
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-280px)]">
          {/* Template Library - 30% */}
          <div className="col-span-4">
            <TemplateLibrary
              onTemplateSelect={handleTemplateSelect}
              selectedTemplate={selectedTemplate}
            />
          </div>

          {/* Report Builder - 70% */}
          <div className="col-span-8">
            <ReportBuilder
              selectedTemplate={selectedTemplate}
              onEvidenceSelect={handleEvidenceSelect}
            />
          </div>
        </div>

        {/* Recent Reports Section */}
        <div className="mt-8">
          <div className="bg-surface border border-border rounded-lg">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-heading font-semibold text-text-primary">
                  Recent Reports
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="MoreHorizontal"
                  onClick={() => console.log('View all reports')}
                >
                  View All
                </Button>
              </div>
            </div>
            
            <div className="divide-y divide-border">
              {recentReports.map((report) => (
                <div key={report.id} className="p-4 hover:bg-background transition-micro">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h3 className="font-heading font-medium text-text-primary">
                          {report.title}
                        </h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-text-secondary">
                        <span>Template: {report.template}</span>
                        <span>Author: {report.author}</span>
                        <span>Modified: {new Date(report.lastModified).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Eye"
                        onClick={() => console.log('View report', report.id)}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Edit"
                        onClick={() => console.log('Edit report', report.id)}
                      />
                      <Button
                        variant="ghost"
                        size="xs"
                        iconName="Download"
                        onClick={() => console.log('Download report', report.id)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <EvidenceSelector
        isOpen={isEvidenceSelectorOpen}
        onClose={() => setIsEvidenceSelectorOpen(false)}
        onEvidenceAdd={handleEvidenceAdd}
      />
      
      <ReportPreview
        isOpen={isReportPreviewOpen}
        onClose={() => setIsReportPreviewOpen(false)}
        reportData={null}
      />
    </div>
  );
};

export default InvestigationReportingEngine;