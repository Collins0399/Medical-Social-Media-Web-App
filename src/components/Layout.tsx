import React from 'react';
import { Bell, Home, Briefcase, BookOpen, MessageCircle, User, Crown, Settings, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { currentUser, mockNotifications } from '../data/mockData';

interface LayoutProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Layout({ children, currentPage, onNavigate }: React.PropsWithChildren<LayoutProps>) {
  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  const navItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'opportunities', icon: Briefcase, label: 'Opportunities' },
    { id: 'resources', icon: BookOpen, label: 'Resources' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'notifications', icon: Bell, label: 'Notifications', badge: unreadNotifications },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'subscription', icon: Crown, label: 'Premium' },
  ];

  if (currentUser.id === '1') {
    navItems.push({ id: 'admin', icon: Shield, label: 'Admin' });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white">M+</span>
            </div>
            <span>MedConnect</span>
          </div>
          
          <div className="flex-1 max-w-2xl mx-8">
            <input
              type="search"
              placeholder="Search users, posts, opportunities..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Settings className="w-5 h-5" />
            </button>
            <Avatar className="w-8 h-8 cursor-pointer" onClick={() => onNavigate('profile')}>
              <AvatarImage src={currentUser.profilePicture} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-64px)] sticky top-16 p-4">
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative ${
                    isActive
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                  {item.badge && item.badge > 0 && (
                    <Badge className="ml-auto">{item.badge}</Badge>
                  )}
                  {item.id === 'subscription' && currentUser.isPremium && (
                    <Crown className="w-4 h-4 ml-auto text-yellow-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* User Profile Card */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3 mb-3">
              <Avatar className="w-12 h-12">
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1">
                  <p className="truncate">{currentUser.name}</p>
                  {currentUser.verified && (
                    <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>
                  )}
                </div>
                <p className="text-gray-500 text-sm truncate">@{currentUser.username}</p>
              </div>
            </div>
            <div className="flex justify-around text-center text-sm">
              <div>
                <div>{currentUser.followers}</div>
                <div className="text-gray-500 text-xs">Followers</div>
              </div>
              <div>
                <div>{currentUser.following}</div>
                <div className="text-gray-500 text-xs">Following</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
