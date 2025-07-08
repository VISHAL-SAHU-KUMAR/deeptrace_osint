import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    setIsProfileOpen(false);
  };

  const notifications = [
    {
      id: 1,
      type: 'alert',
      title: 'High Priority Threat Detected',
      message: 'Suspicious activity identified in network traffic analysis',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Investigation Report Ready',
      message: 'Case #INV-2024-001 analysis completed',
      time: '15 minutes ago',
      unread: true
    },
    {
      id: 3,
      type: 'warning',
      title: 'Data Collection Limit',
      message: 'Approaching monthly API quota limit',
      time: '1 hour ago',
      unread: false
    }
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'alert':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'alert':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-text-secondary';
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-70 bg-surface border-b border-border shadow-primary">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-heading font-semibold text-text-primary">
              DeepTrace OSINT
            </h1>
            <p className="text-xs text-text-secondary font-caption">
              Intelligence Platform
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl mx-8">
          <div className="relative">
            <Icon
              name="Search"
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary"
            />
            <input
              type="text"
              placeholder="Search investigations, cases, or intelligence data... (Ctrl+K)"
              className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg text-sm font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-micro"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <kbd className="px-2 py-1 text-xs font-data bg-secondary-100 text-text-secondary rounded border">
                Ctrl+K
              </kbd>
            </div>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4">
          {/* Quick Actions */}
          <Button
            variant="ghost"
            size="sm"
            iconName="Plus"
            className="hover-lift"
            onClick={() => console.log('New investigation')}
          >
            New Case
          </Button>

          {/* Notifications */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              iconName="Bell"
              className="hover-lift relative"
              onClick={toggleNotifications}
            >
              {notifications.filter(n => n.unread).length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center font-caption">
                  {notifications.filter(n => n.unread).length}
                </span>
              )}
            </Button>

            {isNotificationsOpen && (
              <div className="absolute right-0 mt-2 w-96 bg-surface border border-border rounded-lg shadow-elevated z-80">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-heading font-medium text-text-primary">
                      Notifications
                    </h3>
                    <Button
                      variant="ghost"
                      size="xs"
                      iconName="Settings"
                      onClick={() => console.log('Notification settings')}
                    />
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-border last:border-b-0 hover:bg-background transition-micro cursor-pointer ${
                        notification.unread ? 'bg-primary-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon
                          name={getNotificationIcon(notification.type)}
                          size={16}
                          className={`mt-1 ${getNotificationColor(notification.type)}`}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-heading font-medium text-text-primary truncate">
                              {notification.title}
                            </p>
                            {notification.unread && (
                              <div className="w-2 h-2 bg-primary rounded-full ml-2 flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-text-secondary mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-text-tertiary mt-2 font-caption">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-3 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    fullWidth
                    onClick={() => console.log('View all notifications')}
                  >
                    View All Notifications
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-micro hover-lift"
            >
              <div className="w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-heading font-medium">
                SA
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-heading font-medium text-text-primary">
                  Senior Analyst
                </p>
                <p className="text-xs text-text-secondary font-caption">
                  Threat Intelligence
                </p>
              </div>
              <Icon
                name="ChevronDown"
                size={16}
                className={`text-text-secondary transition-transform ${
                  isProfileOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-surface border border-border rounded-lg shadow-elevated z-80">
                <div className="p-4 border-b border-border">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-heading font-medium">
                      SA
                    </div>
                    <div>
                      <p className="text-sm font-heading font-medium text-text-primary">
                        Senior Analyst
                      </p>
                      <p className="text-xs text-text-secondary font-caption">
                        analyst@deeptrace.com
                      </p>
                      <p className="text-xs text-success font-caption mt-1">
                        Active • Clearance Level 3
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro">
                    <Icon name="User" size={16} />
                    <span>Profile Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro">
                    <Icon name="Shield" size={16} />
                    <span>Security Settings</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro">
                    <Icon name="Settings" size={16} />
                    <span>Preferences</span>
                  </button>
                  <hr className="my-2 border-border" />
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-text-primary hover:bg-background rounded-lg transition-micro">
                    <Icon name="HelpCircle" size={16} />
                    <span>Help & Support</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-3 py-2 text-sm text-error hover:bg-error-50 rounded-lg transition-micro">
                    <Icon name="LogOut" size={16} />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;