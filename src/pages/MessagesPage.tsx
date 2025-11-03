import React, { useState } from 'react';
import { Send, Search, MoreVertical, Paperclip, Smile } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockConversations, currentUser } from '../data/mockData';

export function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState('');

  const messages = [
    {
      id: '1',
      sender: selectedConversation.participant,
      content: 'Hey! Did you see that new research paper on cardiovascular biomarkers?',
      timestamp: '2024-11-02T08:00:00Z',
      read: true
    },
    {
      id: '2',
      sender: currentUser,
      content: 'Yes! It was fascinating. The methodology was really solid.',
      timestamp: '2024-11-02T08:05:00Z',
      read: true
    },
    {
      id: '3',
      sender: selectedConversation.participant,
      content: 'I thought so too. Are you planning to present anything at the upcoming conference?',
      timestamp: '2024-11-02T08:10:00Z',
      read: true
    },
    {
      id: '4',
      sender: currentUser,
      content: 'Actually yes! I\'m working on a poster about early detection methods.',
      timestamp: '2024-11-02T08:15:00Z',
      read: true
    },
    {
      id: '5',
      sender: selectedConversation.participant,
      content: 'Thanks for sharing that research paper!',
      timestamp: '2024-11-02T09:15:00Z',
      read: false
    }
  ];

  const handleSendMessage = () => {
    if (messageText.trim()) {
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-200">
          <h2 className="mb-3">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search messages..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-180px)]">
          {mockConversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={conversation.participant.profilePicture} />
                    <AvatarFallback>{conversation.participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {conversation.unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">
                      {conversation.unreadCount}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className={conversation.unreadCount > 0 ? '' : 'text-gray-900'}>
                      {conversation.participant.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(conversation.lastMessage.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p
                    className={`text-sm truncate ${
                      conversation.unreadCount > 0 ? 'text-gray-900' : 'text-gray-500'
                    }`}
                  >
                    {conversation.lastMessage.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* Chat Header */}
        <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={selectedConversation.participant.profilePicture} />
              <AvatarFallback>{selectedConversation.participant.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <span>{selectedConversation.participant.name}</span>
                {selectedConversation.participant.verified && (
                  <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>
                )}
              </div>
              <p className="text-sm text-gray-500">{selectedConversation.participant.specialty}</p>
            </div>
          </div>

          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.sender.id === currentUser.id;
            return (
              <div
                key={message.id}
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-md ${isCurrentUser ? 'flex-row-reverse' : ''}`}>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.sender.profilePicture} />
                    <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div
                      className={`px-4 py-2 rounded-2xl ${
                        isCurrentUser
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-900'
                      }`}
                    >
                      <p>{message.content}</p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1 px-2">
                      {new Date(message.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      {isCurrentUser && message.read && ' · Read'}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Message Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Paperclip className="w-5 h-5" />
            </button>
            
            <div className="flex-1 relative">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={1}
              />
            </div>

            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
              <Smile className="w-5 h-5" />
            </button>

            <button
              onClick={handleSendMessage}
              disabled={!messageText.trim()}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift + Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
}
