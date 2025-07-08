import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreview = ({ isOpen, onClose, reportData }) => {
  const [previewMode, setPreviewMode] = useState('formatted');
  const [zoom, setZoom] = useState(100);

  const mockReportData = {
    title: 'Criminal Investigation Report - Case #INV-2024-001',
    classification: 'Confidential',
    author: 'Senior Analyst',
    date: '2024-01-19',
    caseNumber: 'INV-2024-001',
    sections: [
      {
        id: 'executive-summary',
        title: 'Executive Summary',
        content: `This investigation examined suspicious financial activities related to cryptocurrency transactions involving multiple international exchanges. The analysis revealed a complex network of shell companies and digital wallets used to obscure the origin and destination of funds totaling approximately $2.3 million USD.

Key findings indicate coordinated efforts to launder proceeds through a series of rapid exchanges between Bitcoin, Ethereum, and privacy coins. The investigation identified 15 primary wallet addresses and 8 associated entities across 4 jurisdictions.`
      },
      {
        id: 'methodology',
        title: 'Investigation Methodology',
        content: `The investigation employed multiple OSINT techniques including:
• Blockchain analysis using specialized forensic tools
• Social media intelligence gathering
• Domain and IP address investigation
• Financial transaction pattern analysis
• Cross-reference verification with known threat intelligence

All evidence collection followed established chain of custody procedures and maintained legal admissibility standards.`
      },
      {
        id: 'findings',
        title: 'Key Findings',
        content: `1. Primary Suspect Identification
   - Individual: John Smith (DOB: 1985-03-15)
   - Known aliases: J. Smithson, Johnny S.
   - Associated addresses: 123 Main St, Anytown, ST 12345

2. Financial Network Analysis
   - Total transaction volume: $2,347,892 USD
   - Active period: 2023-08-15 to 2024-01-10
   - Primary exchanges: Binance, Coinbase, KuCoin

3. Digital Evidence
   - 47 blockchain transactions analyzed
   - 23 social media profiles investigated
   - 12 domain registrations linked to suspect`
      }
    ],
    evidence: [
      {
        id: 'ev-001',
        title: 'Blockchain Transaction Analysis',
        type: 'Financial',
        description: 'Comprehensive analysis of cryptocurrency movements'
      },
      {
        id: 'ev-002',
        title: 'Social Media Profile Investigation',
        type: 'Digital',
        description: 'Facebook and Twitter profile analysis'
      },
      {
        id: 'ev-003',
        title: 'Domain Registration Records',
        type: 'Network',
        description: 'WHOIS data for suspicious domains'
      }
    ],
    metadata: {
      wordCount: 1247,
      pageCount: 8,
      evidenceCount: 23,
      classification: 'Confidential',
      approvalStatus: 'Pending Review'
    }
  };

  const data = reportData || mockReportData;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 10, 50));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleExport = (format) => {
    console.log(`Exporting report as ${format}`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-90">
      <div className="bg-surface rounded-lg shadow-modal w-full max-w-7xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h2 className="text-lg font-heading font-semibold text-text-primary">
                Report Preview
              </h2>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-text-secondary">Mode:</span>
                <select
                  value={previewMode}
                  onChange={(e) => setPreviewMode(e.target.value)}
                  className="px-3 py-1 bg-background border border-border rounded text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="formatted">Formatted</option>
                  <option value="print">Print Layout</option>
                  <option value="web">Web View</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Zoom Controls */}
              <div className="flex items-center space-x-1 bg-background rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Minus"
                  onClick={handleZoomOut}
                  disabled={zoom <= 50}
                />
                <span className="text-sm text-text-secondary px-2">
                  {zoom}%
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="Plus"
                  onClick={handleZoomIn}
                  disabled={zoom >= 200}
                />
              </div>

              {/* Actions */}
              <Button
                variant="ghost"
                size="sm"
                iconName="Printer"
                onClick={handlePrint}
              >
                Print
              </Button>

              <div className="relative group">
                <Button
                  variant="primary"
                  size="sm"
                  iconName="Download"
                >
                  Export
                </Button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-surface border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-micro z-50">
                  <div className="p-2">
                    <button
                      onClick={() => handleExport('pdf')}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                    >
                      <Icon name="FileText" size={16} />
                      <span>Export as PDF</span>
                    </button>
                    <button
                      onClick={() => handleExport('docx')}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro"
                    >
                      <Icon name="FileText" size={16} />
                      <span>Export as Word</span>
                    </button>
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="sm"
                iconName="X"
                onClick={onClose}
              />
            </div>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full overflow-y-auto bg-background p-8">
            <div 
              className="max-w-4xl mx-auto bg-white shadow-elevated rounded-lg overflow-hidden"
              style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
            >
              {/* Report Header */}
              <div className="bg-primary text-primary-foreground p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-heading font-bold mb-2">
                      {data.title}
                    </h1>
                    <div className="flex items-center space-x-4 text-sm opacity-90">
                      <span>Case: {data.caseNumber}</span>
                      <span>Date: {data.date}</span>
                      <span>Author: {data.author}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-primary-700 px-3 py-1 rounded-full text-sm font-medium">
                      {data.classification}
                    </div>
                  </div>
                </div>
              </div>

              {/* Report Content */}
              <div className="p-8">
                {data.sections.map((section, index) => (
                  <div key={section.id} className={index > 0 ? 'mt-8' : ''}>
                    <h2 className="text-xl font-heading font-semibold text-text-primary mb-4 border-b border-border pb-2">
                      {section.title}
                    </h2>
                    <div className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {section.content}
                    </div>
                  </div>
                ))}

                {/* Evidence Section */}
                <div className="mt-8">
                  <h2 className="text-xl font-heading font-semibold text-text-primary mb-4 border-b border-border pb-2">
                    Evidence Appendix
                  </h2>
                  <div className="space-y-4">
                    {data.evidence.map((item, index) => (
                      <div key={item.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-heading font-medium text-text-primary">
                              {index + 1}. {item.title}
                            </h3>
                            <p className="text-sm text-text-secondary mt-1">
                              Type: {item.type}
                            </p>
                            <p className="text-sm text-text-secondary mt-2">
                              {item.description}
                            </p>
                          </div>
                          <div className="text-xs text-text-tertiary">
                            Evidence ID: {item.id}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Report Footer */}
                <div className="mt-12 pt-8 border-t border-border">
                  <div className="flex items-center justify-between text-sm text-text-secondary">
                    <div>
                      <p>Generated by DeepTrace OSINT Investigation Platform</p>
                      <p>Report ID: RPT-{data.caseNumber}-{data.date}</p>
                    </div>
                    <div className="text-right">
                      <p>Classification: {data.classification}</p>
                      <p>Status: {data.metadata.approvalStatus}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-text-secondary">
            <div className="flex items-center space-x-6">
              <span>Pages: {data.metadata.pageCount}</span>
              <span>Words: {data.metadata.wordCount}</span>
              <span>Evidence Items: {data.metadata.evidenceCount}</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Classification: {data.metadata.classification}</span>
              <span className="text-warning">Status: {data.metadata.approvalStatus}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;