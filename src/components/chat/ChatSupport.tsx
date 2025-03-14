
import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, Send, X, Minimize2, Maximize2, User, Bot, Paperclip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { toast } from 'sonner';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'agent';
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

const ChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [agentName, setAgentName] = useState('');
  const [isAgentConnected, setIsAgentConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate initial greeting message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const initialMessage: Message = {
        id: `msg-${Date.now()}`,
        content: "👋 Welcome to Mount Abu Stay Crafters! How can we help you today?",
        sender: 'agent',
        timestamp: new Date(),
        status: 'read'
      };
      setMessages([initialMessage]);
      
      // Simulate agent connecting after a short delay
      setTimeout(() => {
        setIsTyping(true);
        setTimeout(() => {
          const agentConnectMessage: Message = {
            id: `msg-${Date.now()}`,
            content: "I'm Priya, your personal booking assistant. I can help you with hotel bookings, transportation, or any questions about Mount Abu.",
            sender: 'agent',
            timestamp: new Date(),
            status: 'read'
          };
          setMessages(prev => [...prev, agentConnectMessage]);
          setIsTyping(false);
          setAgentName('Priya');
          setIsAgentConnected(true);
        }, 2000);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  // Increment unread count when new agent messages arrive and chat is minimized
  useEffect(() => {
    if ((isMinimized || !isOpen) && messages.length > 0 && messages[messages.length - 1].sender === 'agent') {
      setUnreadCount(prev => prev + 1);
    }
  }, [messages, isMinimized, isOpen]);

  // Clear unread count when opening or restoring chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setUnreadCount(0);
    }
  }, [isOpen, isMinimized]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
    if (isMinimized) {
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(prev => !prev);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: newMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');

    // Simulate agent typing response
    setTimeout(() => {
      setIsTyping(true);
      
      // Simulate agent response after typing delay
      setTimeout(() => {
        const responses = [
          "Thank you for your message! I'll check the availability for you right away.",
          "Great question! Mount Abu's weather is pleasant throughout the year, but October to March is considered the best time to visit.",
          "I can help you with that booking. Could you please provide your preferred dates?",
          "The Dilwara Temples are open from 12pm to 5pm. Would you like me to arrange transportation?",
          "We have several hotel options near Nakki Lake. Would you prefer a budget stay or luxury accommodations?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        
        const agentResponse: Message = {
          id: `msg-${Date.now()}`,
          content: randomResponse,
          sender: 'agent',
          timestamp: new Date(),
          status: 'read'
        };
        
        setMessages(prev => [...prev, agentResponse]);
        setIsTyping(false);
      }, 2000);
    }, 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleFileUpload = () => {
    toast.info("File attachment is not available in the demo version");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className="rounded-full h-14 w-14 shadow-lg relative"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6" />
        ) : (
          <MessageSquare className="h-6 w-6" />
        )}
        {unreadCount > 0 && (
          <Badge
            className="absolute -top-2 -right-2 bg-red-500"
            variant="destructive"
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`bg-white dark:bg-gray-900 rounded-lg shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
            isMinimized ? 'w-72 h-16' : 'w-80 sm:w-96 h-[500px]'
          } mt-4 flex flex-col border`}
        >
          {/* Chat Header */}
          <div className="p-3 bg-primary text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/avatar-agent.png" />
                <AvatarFallback>
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">
                  {agentName ? `${agentName} (Support)` : 'Chat Support'}
                </h3>
                {!isMinimized && isAgentConnected && (
                  <span className="text-xs flex items-center">
                    <span className="h-2 w-2 bg-green-400 rounded-full inline-block mr-1"></span>
                    Online
                  </span>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:text-white hover:bg-primary/80"
              onClick={toggleMinimize}
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
          </div>

          {/* Chat Body */}
          {!isMinimized && (
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {messages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === 'user'
                          ? 'bg-primary text-white rounded-tr-none'
                          : 'bg-gray-100 dark:bg-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <span className="text-xs mt-1 opacity-70 block text-right">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 dark:bg-gray-800 rounded-tl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: '0.2s' }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                          style={{ animationDelay: '0.4s' }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Chat Input */}
          {!isMinimized && (
            <div className="p-3 border-t">
              <div className="flex items-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 flex-shrink-0"
                  onClick={handleFileUpload}
                >
                  <Paperclip className="h-5 w-5 text-gray-500" />
                </Button>
                <Textarea
                  value={newMessage}
                  onChange={e => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="min-h-[40px] resize-none"
                  rows={1}
                />
                <Button
                  className="h-9 w-9 flex-shrink-0"
                  size="icon"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-xs text-center text-gray-500 mt-2">
                Our support team is available from 8 AM to 10 PM IST
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatSupport;
