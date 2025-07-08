import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import InvestigationDashboard from "pages/investigation-dashboard";
import MultiSourceDataCollection from "pages/multi-source-data-collection";
import EvidenceManagementSystem from "pages/evidence-management-system";
import CaseManagementWorkspace from "pages/case-management-workspace";
import IntelligenceAnalysisWorkbench from "pages/intelligence-analysis-workbench";
import ThreatIntelligenceDashboard from "pages/threat-intelligence-dashboard";
import InvestigationReportingEngine from "pages/investigation-reporting-engine";
import UserAccessControlCenter from "pages/user-access-control-center";
import AuditTrailViewer from "pages/audit-trail-viewer";
import SystemConfigurationDashboard from "pages/system-configuration-dashboard";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<InvestigationDashboard />} />
        <Route path="/investigation-dashboard" element={<InvestigationDashboard />} />
        <Route path="/multi-source-data-collection" element={<MultiSourceDataCollection />} />
        <Route path="/evidence-management-system" element={<EvidenceManagementSystem />} />
        <Route path="/case-management-workspace" element={<CaseManagementWorkspace />} />
        <Route path="/intelligence-analysis-workbench" element={<IntelligenceAnalysisWorkbench />} />
        <Route path="/threat-intelligence-dashboard" element={<ThreatIntelligenceDashboard />} />
        <Route path="/investigation-reporting-engine" element={<InvestigationReportingEngine />} />
        <Route path="/user-access-control-center" element={<UserAccessControlCenter />} />
        <Route path="/audit-trail-viewer" element={<AuditTrailViewer />} />
        <Route path="/system-configuration-dashboard" element={<SystemConfigurationDashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;