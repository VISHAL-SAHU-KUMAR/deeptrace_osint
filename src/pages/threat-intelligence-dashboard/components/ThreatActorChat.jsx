import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ThreatActorChat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [activeAnalysts, setActiveAnalysts] = useState([]);
  const [selectedChannel, setSelectedChannel] = useState('general');

  useEffect(() => {
    // Mock chat messages
    const mockMessages = [
      {
        id: 1,
        channel: 'general',
        sender: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e2b8d5?w=32&h=32&fit=crop&crop=face',
        message: 'New Emotet campaign detected. IOCs shared in #threat-feeds',
        timestamp: new Date(Date.now() - 300000),
        type: 'message'
      },
      {
        id: 2,
        channel: 'general',
        sender: 'Michael Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        message: 'Confirmed. Seeing similar patterns in our honeypots',
        timestamp: new Date(Date.now() - 240000),
        type: 'message'
      },
      {
        id: 3,
        channel: 'general',
        sender: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face',
        message: 'Attribution points to TA542. High confidence based on TTPs',
        timestamp: new Date(Date.now() - 180000),
        type: 'message'
      },
      {
        id: 4,
        channel: 'general',
        sender: 'System',
        avatar: null,
        message: 'Threat alert THR-2024-001 has been escalated to critical',
        timestamp: new Date(Date.now() - 120000),
        type: 'system'
      },
      {
        id: 5,
        channel: 'general',
        sender: 'Jennifer Park',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face',
        message: 'Updated investigation INV-2024-045 with new findings',
        timestamp: new Date(Date.now() - 60000),
        type: 'message'
      }
    ];

    const mockAnalysts = [
      {
        id: 1,
        name: 'Sarah Chen',
        status: 'online',
        role: 'Senior Threat Analyst',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9e2b8d5?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        status: 'online',
        role: 'Malware Analyst',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: 3,
        name: 'Alex Thompson',
        status: 'away',
        role: 'Attribution Specialist',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: 4,
        name: 'Jennifer Park',
        status: 'online',
        role: 'Intelligence Analyst',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop&crop=face'
      },
      {
        id: 5,
        name: 'David Kim',
        status: 'offline',
        role: 'Forensics Analyst',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face'
      }
    ];

    setMessages(mockMessages);
    setActiveAnalysts(mockAnalysts);
  }, []);

  const channels = [
    { id: 'general', name: 'General', icon: 'Hash', unread: 3 },
    { id: 'threat-feeds', name: 'Threat Feeds', icon: 'Rss', unread: 12 },
    { id: 'investigations', name: 'Investigations', icon: 'Search', unread: 0 },
    { id: 'attribution', name: 'Attribution', icon: 'Users', unread: 5 },
    { id: 'alerts', name: 'Alerts', icon: 'Bell', unread: 8 }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':
        return 'bg-success';
      case 'away':
        return 'bg-warning';
      case 'offline':
        return 'bg-secondary-400';
      default:
        return 'bg-secondary-400';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: messages.length + 1,
        channel: selectedChannel,
        sender: 'You',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        message: newMessage,
        timestamp: new Date(),
        type: 'message'
      };
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const filteredMessages = messages.filter(msg => msg.channel === selectedChannel);

  return (
    <div className="bg-surface rounded-lg border border-border shadow-primary h-full flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-border flex flex-col">
        {/* Channels */}
        <div className="p-4 border-b border-border">
          <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
            Channels
          </h4>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-micro ${
                  selectedChannel === channel.id
                    ? 'bg-primary text-primary-foreground'
                    : 'text-text-primary hover:bg-background'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon name={channel.icon} size={16} />
                  <span className="font-body">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className={`px-2 py-1 rounded-full text-xs font-caption ${
                    selectedChannel === channel.id
                      ? 'bg-primary-foreground text-primary'
                      : 'bg-error text-error-foreground'
                  }`}>
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Analysts */}
        <div className="flex-1 p-4 overflow-y-auto">
          <h4 className="text-sm font-heading font-semibold text-text-primary mb-3">
            Active Analysts ({activeAnalysts.filter(a => a.status === 'online').length})
          </h4>
          <div className="space-y-2">
            {activeAnalysts.map((analyst) => (
              <div key={analyst.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-background transition-micro">
                <div className="relative">
                  <img
                    src={analyst.avatar}
                    alt={analyst.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface ${getStatusColor(analyst.status)}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-heading font-medium text-text-primary truncate">
                    {analyst.name}
                  </div>
                  <div className="text-xs text-text-secondary font-caption truncate">
                    {analyst.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name={channels.find(c => c.id === selectedChannel)?.icon || 'Hash'} size={20} className="text-primary" />
              <h3 className="text-lg font-heading font-semibold text-text-primary">
                #{channels.find(c => c.id === selectedChannel)?.name || 'general'}
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                iconName="Search"
                onClick={() => console.log('Search messages')}
              />
              <Button
                variant="ghost"
                size="sm"
                iconName="Settings"
                onClick={() => console.log('Channel settings')}
              />
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filteredMessages.map((message) => (
            <div key={message.id} className={`flex items-start space-x-3 ${
              message.type === 'system' ? 'justify-center' : ''
            }`}>
              {message.type === 'system' ? (
                <div className="bg-secondary-100 text-text-secondary px-3 py-1 rounded-lg text-sm font-caption">
                  <Icon name="Info" size={14} className="inline mr-2" />
                  {message.message}
                  <span className="ml-2 text-xs text-text-tertiary">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
              ) : (
                <>
                  <img
                    src={message.avatar}
                    alt={message.sender}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-sm font-heading font-medium text-text-primary">
                        {message.sender}
                      </span>
                      <span className="text-xs text-text-secondary font-caption">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                    <div className="text-sm text-text-primary font-body">
                      {message.message}
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-border">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <Input
                type="text"
                placeholder={`Message #${channels.find(c => c.id === selectedChannel)?.name || 'general'}`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="resize-none"
              />
            </div>
            <Button
              variant="primary"
              size="sm"
              iconName="Send"
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
            />
          </div>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="xs"
                iconName="Paperclip"
                onClick={() => console.log('Attach file')}
              >
                Attach
              </Button>
              <Button
                variant="ghost"
                size="xs"
                iconName="Code"
                onClick={() => console.log('Code snippet')}
              >
                Code
              </Button>
            </div>
            <div className="text-xs text-text-secondary font-caption">
              Press Enter to send, Shift+Enter for new line
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThreatActorChat;