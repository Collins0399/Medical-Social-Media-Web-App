import React, { useState } from 'react';
import { Bell, Heart, MessageCircle, UserPlus, Briefcase, AlertCircle, CheckCheck } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { mockNotifications } from '../data/mockData';

export function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const getNotificationIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      like: <Heart className="w-5 h-5 text-red-500" />,
      comment: <MessageCircle className="w-5 h-5 text-blue-500" />,
      follow: <UserPlus className="w-5 h-5 text-green-500" />,
      message: <MessageCircle className="w-5 h-5 text-purple-500" />,
      mentorship: <UserPlus className="w-5 h-5 text-orange-500" />,
      opportunity: <Briefcase className="w-5 h-5 text-blue-600" />,
      announcement: <AlertCircle className="w-5 h-5 text-gray-500" />
    };
    return icons[type] || <Bell className="w-5 h-5" />;
  };

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="p-6 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Notifications</h1>
          <p className="text-gray-600">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}`
              : 'You\'re all caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button onClick={markAllAsRead} variant="outline" className="flex items-center gap-2">
            <CheckCheck className="w-4 h-4" />
            <span>Mark all as read</span>
          </Button>
        )}
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6">
          <TabsTrigger value="all">
            All {notifications.length > 0 && `(${notifications.length})`}
          </TabsTrigger>
          <TabsTrigger value="unread">
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </TabsTrigger>
          <TabsTrigger value="mentions">Mentions</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <div className="space-y-2">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`cursor-pointer hover:shadow-md transition-shadow ${
                  !notification.read ? 'bg-blue-50' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start gap-4">
                    {notification.user ? (
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={notification.user.profilePicture} />
                        <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    ) : (
                      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        {getNotificationIcon(notification.type)}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          {notification.user && (
                            <span className="mr-1">{notification.user.name}</span>
                          )}
                          <span className="text-gray-700">{notification.content}</span>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-gray-500">{getTimeAgo(notification.timestamp)}</p>
                        <span className="text-gray-300">•</span>
                        <Badge variant="secondary" className="text-xs">
                          {notification.type}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread">
          <div className="space-y-2">
            {notifications.filter(n => !n.read).length > 0 ? (
              notifications.filter(n => !n.read).map((notification) => (
                <Card
                  key={notification.id}
                  className="cursor-pointer hover:shadow-md transition-shadow bg-blue-50"
                  onClick={() => markAsRead(notification.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      {notification.user ? (
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={notification.user.profilePicture} />
                          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            {notification.user && (
                              <span className="mr-1">{notification.user.name}</span>
                            )}
                            <span className="text-gray-700">{notification.content}</span>
                          </div>
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {getTimeAgo(notification.timestamp)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <CheckCheck className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>No unread notifications</p>
                <p className="text-sm">You're all caught up!</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="mentions">
          <div className="text-center py-12 text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No mentions yet</p>
            <p className="text-sm">When someone mentions you, it will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
