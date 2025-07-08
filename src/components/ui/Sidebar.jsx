import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      id: 'investigation-dashboard',
      label: 'Investigation Dashboard',
      icon: 'BarChart3',
      path: '/investigation-dashboard',
      description: 'Overview and analytics'
    },
    {
      id: 'case-management',
      label: 'Case Management',
      icon: 'FolderOpen',
      path: '/case-management-workspace',
      description: 'Manage active cases'
    },
    {
      id: 'data-collection',
      label: 'Data Collection',
      icon: 'Database',
      path: '/multi-source-data-collection',
      description: 'Multi-source intelligence'
    },
    {
      id: 'analysis-workbench',
      label: 'Analysis Workbench',
      icon: 'Brain',
      path: '/intelligence-analysis-workbench',
      description: 'Intelligence analysis tools'
    },
    {
      id: 'evidence-management',
      label: 'Evidence Management',
      icon: 'Archive',
      path: '/evidence-management-system',
      description: 'Digital evidence storage'
    },
    {
      id: 'threat-intelligence',
      label: 'Threat Intelligence',
      icon: 'Shield',
      path: '/threat-intelligence-dashboard',
      description: 'Threat monitoring'
    },
    {
      id: 'reporting',
      label: 'Reporting Engine',
      icon: 'FileText',
      path: '/investigation-reporting-engine',
      description: 'Generate reports'
    }
  ];

  const adminItems = [
    {
      id: 'user-access',
      label: 'User Access Control',
      icon: 'Users',
      path: '/user-access-control-center',
      description: 'Manage user permissions'
    },
    {
      id: 'system-config',
      label: 'System Configuration',
      icon: 'Settings',
      path: '/system-configuration-dashboard',
      description: 'System settings'
    },
    {
      id: 'audit-trail',
      label: 'Audit Trail',
      icon: 'History',
      path: '/audit-trail-viewer',
      description: 'System audit logs'
    }
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
    setActiveSubmenu(null);
  };

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const toggleSubmenu = (menuId) => {
    if (isCollapsed) return;
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-60 bg-surface border-r border-border shadow-primary transition-all duration-normal ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div>
            <h2 className="text-sm font-heading font-semibold text-text-primary">
              Navigation
            </h2>
            <p className="text-xs text-text-secondary font-caption">
              Intelligence Platform
            </p>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          iconName={isCollapsed ? 'ChevronRight' : 'ChevronLeft'}
          onClick={toggleCollapse}
          className="hover-lift"
        />
      </div>

      {/* Navigation Content */}
      <div className="flex flex-col h-full overflow-hidden">
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Main Navigation */}
          <div className="px-3 mb-6">
            {!isCollapsed && (
              <h3 className="px-3 mb-3 text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Operations
              </h3>
            )}
            <ul className="space-y-1">
              {navigationItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-micro hover-lift group ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-primary hover:bg-background'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={`flex-shrink-0 ${
                        isActive(item.path)
                          ? 'text-primary-foreground'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1 text-left">
                        <p className="font-heading font-medium">{item.label}</p>
                        <p className="text-xs opacity-75 font-caption">
                          {item.description}
                        </p>
                      </div>
                    )}
                    {!isCollapsed && isActive(item.path) && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Admin Section */}
          <div className="px-3">
            {!isCollapsed && (
              <h3 className="px-3 mb-3 text-xs font-heading font-medium text-text-secondary uppercase tracking-wider">
                Administration
              </h3>
            )}
            <ul className="space-y-1">
              {adminItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg transition-micro hover-lift group ${
                      isActive(item.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-text-primary hover:bg-background'
                    }`}
                    title={isCollapsed ? item.label : ''}
                  >
                    <Icon
                      name={item.icon}
                      size={20}
                      className={`flex-shrink-0 ${
                        isActive(item.path)
                          ? 'text-primary-foreground'
                          : 'text-text-secondary group-hover:text-text-primary'
                      }`}
                    />
                    {!isCollapsed && (
                      <div className="ml-3 flex-1 text-left">
                        <p className="font-heading font-medium">{item.label}</p>
                        <p className="text-xs opacity-75 font-caption">
                          {item.description}
                        </p>
                      </div>
                    )}
                    {!isCollapsed && isActive(item.path) && (
                      <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="bg-background rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
                <span className="text-xs font-heading font-medium text-text-primary">
                  System Status
                </span>
              </div>
              <p className="text-xs text-text-secondary font-caption">
                All systems operational
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-text-tertiary font-caption">
                  Last sync: 2m ago
                </span>
                <Button
                  variant="ghost"
                  size="xs"
                  iconName="RefreshCw"
                  onClick={() => console.log('Refresh status')}
                />
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 bg-success rounded-full pulse-subtle" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;