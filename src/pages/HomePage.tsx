import React, { useState } from 'react';
import { Filter, TrendingUp } from 'lucide-react';
import { CreatePost } from '../components/CreatePost';
import { PostCard } from '../components/PostCard';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { mockPosts, mockUsers } from '../data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export function HomePage() {
  const [filter, setFilter] = useState('all');

  const trendingTopics = [
    { name: 'Cardiology', posts: 234 },
    { name: 'MedicalEducation', posts: 189 },
    { name: 'Research', posts: 167 },
    { name: 'Neurology', posts: 145 },
    { name: 'PatientCare', posts: 132 }
  ];

  const suggestedUsers = mockUsers.slice(0, 3);

  return (
    <div className="flex gap-6 p-6">
      {/* Main Feed */}
      <div className="flex-1 max-w-2xl">
        <CreatePost />
        
        <Tabs defaultValue="all" className="mb-4">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">All Posts</TabsTrigger>
            <TabsTrigger value="following" className="flex-1">Following</TabsTrigger>
            <TabsTrigger value="trending" className="flex-1">Trending</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="mb-4 flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter by category</span>
          </button>
        </div>

        <div>
          {mockPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="text-center py-8 text-gray-500">
          <p>You've reached the end of your feed</p>
          <p className="text-sm">Follow more users to see more content</p>
        </div>
      </div>

      {/* Right Sidebar */}
      <aside className="w-80">
        {/* Trending Topics */}
        <Card className="mb-4">
          <CardHeader>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              <span>Trending Topics</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {trendingTopics.map((topic, index) => (
                <div
                  key={topic.name}
                  className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-400">#{index + 1}</span>
                      <span>#{topic.name}</span>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{topic.posts} posts</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Suggested Users */}
        <Card>
          <CardHeader>
            <span>Suggested Connections</span>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.profilePicture}
                      alt={user.name}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <div className="flex items-center gap-1">
                        <p className="text-sm">{user.name}</p>
                        {user.verified && (
                          <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{user.specialty}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                    Follow
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
