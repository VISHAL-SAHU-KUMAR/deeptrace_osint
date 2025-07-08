import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import CaseTreeSidebar from './components/CaseTreeSidebar';
import InvestigationGrid from './components/InvestigationGrid';
import IntelligenceFeed from './components/IntelligenceFeed';
import FilterToolbar from './components/FilterToolbar';
import SystemStatusBar from './components/SystemStatusBar';

const InvestigationDashboard = () => {
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const [selectedCases, setSelectedCases] = useState([]);
  const [filters, setFilters] = useState({});

  // Mock data for cases
  const mockCases = [
    {
      id: 1,
      caseId: "INV-2024-001",
      title: "Social Media Threat Analysis",
      target: "suspicious_user_2024",
      targetType: "Social Media Account",
      status: "active",
      priority: "critical",
      threatLevel: "high",
      assignedTo: "John Doe",
      department: "Cyber Threat Intel",
      lastActivity: new Date(Date.now() - 1800000),
      lastAction: "Evidence collected",
      slaHours: 2,
      hasNewIntel: true
    },
    {
      id: 2,
      caseId: "INV-2024-002",
      title: "Domain Infrastructure Investigation",
      target: "malicious-domain.com",
      targetType: "Domain",
      status: "pending",
      priority: "high",
      threatLevel: "medium",
      assignedTo: "Jane Smith",
      department: "Digital Forensics",
      lastActivity: new Date(Date.now() - 3600000),
      lastAction: "DNS analysis completed",
      slaHours: 6,
      hasNewIntel: false
    },
    {
      id: 3,
      caseId: "INV-2024-003",
      title: "Email Phishing Campaign",
      target: "phishing@fake-bank.net",
      targetType: "Email Address",
      status: "active",
      priority: "high",
      threatLevel: "critical",
      assignedTo: "Mike Johnson",
      department: "Email Security",
      lastActivity: new Date(Date.now() - 900000),
      lastAction: "Attachment analyzed",
      slaHours: 1,
      hasNewIntel: true
    },
    {
      id: 4,
      caseId: "INV-2024-004",
      title: "IP Address Geolocation Tracking",
      target: "192.168.1.100",
      targetType: "IP Address",
      status: "closed",
      priority: "medium",
      threatLevel: "low",
      assignedTo: "Sarah Wilson",
      department: "Network Analysis",
      lastActivity: new Date(Date.now() - 86400000),
      lastAction: "Case closed - benign",
      slaHours: 24,
      hasNewIntel: false
    },
    {
      id: 5,
      caseId: "INV-2024-005",
      title: "Dark Web Marketplace Monitoring",
      target: "darkmarket_vendor_x",
      targetType: "Dark Web Entity",
      status: "active",
      priority: "critical",
      threatLevel: "critical",
      assignedTo: "Alex Chen",
      department: "Dark Web Intel",
      lastActivity: new Date(Date.now() - 600000),
      lastAction: "New listing detected",
      slaHours: 4,
      hasNewIntel: true
    },
    {
      id: 6,
      caseId: "INV-2024-006",
      title: "Phone Number OSINT Investigation",
      target: "+1-555-0123",
      targetType: "Phone Number",
      status: "pending",
      priority: "low",
      threatLevel: "low",
      assignedTo: "Emma Davis",
      department: "Communications Intel",
      lastActivity: new Date(Date.now() - 7200000),
      lastAction: "Carrier lookup initiated",
      slaHours: 12,
      hasNewIntel: false
    },
    {
      id: 7,
      caseId: "INV-2024-007",
      title: "Cryptocurrency Wallet Analysis",
      target: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      targetType: "Bitcoin Address",
      status: "active",
      priority: "high",
      threatLevel: "high",
      assignedTo: "David Kim",
      department: "Financial Crimes",
      lastActivity: new Date(Date.now() - 1200000),
      lastAction: "Transaction traced",
      slaHours: 3,
      hasNewIntel: true
    },
    {
      id: 8,
      caseId: "INV-2024-008",
      title: "Image Reverse Search Investigation",
      target: "suspicious_profile_image.jpg",
      targetType: "Image File",
      status: "active",
      priority: "medium",
      threatLevel: "medium",
      assignedTo: "Lisa Rodriguez",
      department: "Visual Intelligence",
      lastActivity: new Date(Date.now() - 2700000),
      lastAction: "Metadata extracted",
      slaHours: 8,
      hasNewIntel: false
    }
  ];

  // Mock data for intelligence feeds
  const mockFeeds = [
    {
      id: 1,
      type: "threat-intel",
      title: "New APT Group Activity Detected",
      content: `Advanced persistent threat group APT-2024-X has been observed using new infrastructure. Multiple domains registered with similar patterns indicate coordinated campaign targeting financial institutions.`,
      source: "ThreatConnect",
      timestamp: new Date(Date.now() - 300000),
      confidence: 85,
      unread: true
    },
    {
      id: 2,
      type: "osint",
      title: "Social Media Account Linked to Investigation",
      content: "Twitter account @suspicious_user_2024 has posted content matching keywords from active investigation INV-2024-001. Account shows signs of automation and coordinated behavior.",
      source: "Social Media Monitor",
      timestamp: new Date(Date.now() - 600000),
      confidence: 72,
      unread: true
    },
    {
      id: 3,
      type: "dark-web",
      title: "Stolen Credentials Marketplace Update",
      content: "New batch of compromised credentials detected on DarkMarket. Database contains 50,000+ email/password combinations from recent data breach.",
      source: "Dark Web Scanner",
      timestamp: new Date(Date.now() - 900000),
      confidence: 95,
      unread: false
    },
    {
      id: 4,
      type: "network",
      title: "Suspicious Domain Registration Pattern",
      content: "Multiple domains registered with similar naming convention: bank-security-[number].com. All registered within 24-hour window using privacy protection services.",
      source: "Domain Monitor",
      timestamp: new Date(Date.now() - 1200000),
      confidence: 68,
      unread: false
    },
    {
      id: 5,
      type: "social",
      title: "Coordinated Inauthentic Behavior Detected",
      content: "Network of 150+ social media accounts showing coordinated posting patterns. Accounts created within similar timeframe and sharing identical content with minor variations.",
      source: "Social Network Analysis",
      timestamp: new Date(Date.now() - 1800000),
      confidence: 91,
      unread: false
    }
  ];

  // Mock data for alerts
  const mockAlerts = [
    {
      id: 1,
      severity: "critical",
      title: "High-Priority Case SLA Breach",
      message: "Case INV-2024-001 has exceeded SLA threshold. Immediate attention required.",
      caseId: "INV-2024-001",
      timestamp: new Date(Date.now() - 180000),
      unread: true
    },
    {
      id: 2,
      severity: "high",
      title: "New Threat Intelligence Match",
      message: "Target from case INV-2024-003 matches known threat actor IOCs in latest intelligence feed.",
      caseId: "INV-2024-003",
      timestamp: new Date(Date.now() - 420000),
      unread: true
    },
    {
      id: 3,
      severity: "medium",
      title: "Data Collection Completed",
      message: "Automated OSINT collection for case INV-2024-007 has completed successfully. 247 new data points collected.",
      caseId: "INV-2024-007",
      timestamp: new Date(Date.now() - 900000),
      unread: false
    },
    {
      id: 4,
      severity: "low",
      title: "Weekly Report Generated",
      message: "Weekly intelligence summary report has been generated and is ready for review.",
      caseId: "SYSTEM",
      timestamp: new Date(Date.now() - 3600000),
      unread: false
    }
  ];

  // Mock data for integration status
  const mockIntegrationStatus = [
    {
      id: 1,
      name: "VirusTotal",
      description: "Malware analysis and threat intelligence",
      status: "online",
      lastSync: "2 minutes ago"
    },
    {
      id: 2,
      name: "Shodan",
      description: "Internet-connected device search",
      status: "online",
      lastSync: "5 minutes ago"
    },
    {
      id: 3,
      name: "ThreatConnect",
      description: "Threat intelligence platform",
      status: "warning",
      lastSync: "15 minutes ago",
      message: "API rate limit approaching"
    },
    {
      id: 4,
      name: "Social Media APIs",
      description: "Twitter, Facebook, LinkedIn monitoring",
      status: "online",
      lastSync: "1 minute ago"
    },
    {
      id: 5,
      name: "WHOIS Database",
      description: "Domain registration information",
      status: "online",
      lastSync: "3 minutes ago"
    },
    {
      id: 6,
      name: "Dark Web Monitor",
      description: "Tor network and marketplace scanning",
      status: "maintenance",
      lastSync: "2 hours ago",
      message: "Scheduled maintenance in progress"
    }
  ];

  // Mock system metrics
  const mockSystemMetrics = {
    cpu: 45,
    memory: 67,
    uptime: 2592000, // 30 days in seconds
    storageUsed: 2.4 * 1024 * 1024 * 1024 * 1024, // 2.4 TB
    networkIO: 125 * 1024 * 1024, // 125 MB/s
    activeCases: 23,
    dataSources: 12
  };

  const handleCaseSelect = (selectedCase) => {
    setSelectedCaseId(selectedCase.id);
    console.log('Selected case:', selectedCase);
  };

  const handleCaseToggle = (caseId, isSelected) => {
    setSelectedCases(prev => 
      isSelected 
        ? [...prev, caseId]
        : prev.filter(id => id !== caseId)
    );
  };

  const handleBulkAction = (action) => {
    console.log(`Bulk action: ${action} on cases:`, selectedCases);
    // Handle bulk operations
    setSelectedCases([]);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Filters changed:', newFilters);
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        // Focus search input
        const searchInput = document.querySelector('input[type="search"]');
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        // Create new case
        console.log('Create new case shortcut');
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar />
      
      <div className="ml-64 pt-16">
        <div className="h-screen flex flex-col">
          {/* Filter Toolbar */}
          <FilterToolbar
            onFilterChange={handleFilterChange}
            onSavedFilterSelect={(filter) => console.log('Load saved filter:', filter)}
            savedFilters={[]}
          />

          {/* Main Content Area */}
          <div className="flex-1 flex overflow-hidden">
            {/* Left Panel - Case Tree (25%) */}
            <div className="w-1/4 min-w-0">
              <CaseTreeSidebar
                cases={mockCases}
                onCaseSelect={handleCaseSelect}
                selectedCaseId={selectedCaseId}
              />
            </div>

            {/* Center Panel - Investigation Grid (50%) */}
            <div className="flex-1 min-w-0">
              <InvestigationGrid
                cases={mockCases}
                onCaseSelect={handleCaseSelect}
                selectedCases={selectedCases}
                onCaseToggle={handleCaseToggle}
                onBulkAction={handleBulkAction}
              />
            </div>

            {/* Right Panel - Intelligence Feed (25%) */}
            <div className="w-1/4 min-w-0">
              <IntelligenceFeed
                feeds={mockFeeds}
                alerts={mockAlerts}
              />
            </div>
          </div>

          {/* System Status Bar */}
          <SystemStatusBar
            integrationStatus={mockIntegrationStatus}
            systemMetrics={mockSystemMetrics}
          />
        </div>
      </div>
    </div>
  );
};

export default InvestigationDashboard;