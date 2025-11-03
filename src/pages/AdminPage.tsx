import React, { useState } from 'react';
import { Users, FileText, AlertTriangle, BarChart3, TrendingUp, UserCheck, MessageSquare, Briefcase } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { mockUsers, mockPosts, mockOpportunities } from '../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Textarea } from '../components/ui/textarea';

export function AdminPage() {
  const [selectedAction, setSelectedAction] = useState('');

  const stats = [
    { icon: Users, label: 'Total Users', value: '12,847', change: '+12.5%', color: 'text-blue-600' },
    { icon: FileText, label: 'Total Posts', value: '45,231', change: '+8.2%', color: 'text-green-600' },
    { icon: Briefcase, label: 'Opportunities', value: '892', change: '+15.3%', color: 'text-purple-600' },
    { icon: AlertTriangle, label: 'Reported Content', value: '23', change: '-5.1%', color: 'text-red-600' }
  ];

  const recentUsers = mockUsers.slice(0, 5);
  const flaggedPosts = mockPosts.slice(0, 3);

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Manage users, content, and platform activities</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center ${stat.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'}>
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl mb-1">{stat.value}</div>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Tabs defaultValue="users" className="mb-6">
        <TabsList>
          <TabsTrigger value="users">User Management</TabsTrigger>
          <TabsTrigger value="content">Content Moderation</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
        </TabsList>

        {/* User Management */}
        <TabsContent value="users" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span>Recent Users</span>
                <div className="flex gap-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="verified">Verified</SelectItem>
                      <SelectItem value="premium">Premium</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={user.profilePicture} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="flex items-center gap-1">
                              {user.name}
                              {user.verified && <Badge variant="secondary" className="text-xs px-1 py-0">✓</Badge>}
                            </p>
                            <p className="text-sm text-gray-500">@{user.username}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{new Date(user.joinedDate).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.isPremium ? 'default' : 'secondary'}>
                          {user.isPremium ? 'Premium' : 'Free'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button variant="outline" size="sm">Suspend</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Moderation */}
        <TabsContent value="content" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span>Flagged Content</span>
                <Badge variant="destructive">{flaggedPosts.length} pending</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {flaggedPosts.map((post) => (
                  <Card key={post.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={post.author.profilePicture} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p>{post.author.name}</p>
                            <p className="text-sm text-gray-500">@{post.author.username}</p>
                          </div>
                        </div>
                        <Badge variant="destructive">Flagged</Badge>
                      </div>
                      <p className="mb-3 text-sm">{post.content}</p>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Approve</Button>
                        <Button size="sm" variant="destructive">Remove</Button>
                        <Button size="sm" variant="outline">Contact User</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Management */}
        <TabsContent value="opportunities" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <span>Pending Opportunities</span>
                <Badge>5 awaiting approval</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Institution</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockOpportunities.slice(0, 3).map((opportunity) => (
                    <TableRow key={opportunity.id}>
                      <TableCell>{opportunity.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{opportunity.type}</Badge>
                      </TableCell>
                      <TableCell>{opportunity.institution}</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Approve</Button>
                          <Button variant="outline" size="sm">Reject</Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics */}
        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <span>User Growth</span>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center text-gray-500">
                    <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                    <p>User growth chart would appear here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <span>Engagement Metrics</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Daily Active Users</span>
                    <span>8,234</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Posts per Day</span>
                    <span>1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Comments per Day</span>
                    <span>3,891</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Average Session</span>
                    <span>24 min</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-2">
              <CardHeader>
                <span>Top Specialties</span>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Cardiology', 'Neurology', 'Pediatrics', 'Oncology'].map((specialty, index) => (
                    <div key={specialty} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl mb-1">{2847 - index * 300}</div>
                      <p className="text-sm text-gray-600">{specialty}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Announcements */}
        <TabsContent value="announcements" className="mt-6">
          <Card>
            <CardHeader>
              <span>Send Announcement</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm mb-2">Announcement Title</label>
                  <input
                    type="text"
                    placeholder="Enter announcement title"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <Textarea
                    placeholder="Enter your announcement message..."
                    rows={5}
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Target Audience</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="premium">Premium Users Only</SelectItem>
                      <SelectItem value="students">Students Only</SelectItem>
                      <SelectItem value="professionals">Professionals Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">Send Announcement</Button>
              </div>

              <div className="mt-8">
                <h3 className="mb-4">Recent Announcements</h3>
                <div className="space-y-3">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p>System maintenance scheduled</p>
                        <Badge variant="secondary">Nov 5, 2024</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        We'll be performing system maintenance on November 5th from 2-4 AM EST.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <p>New premium features available</p>
                        <Badge variant="secondary">Nov 1, 2024</Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        Check out our new premium features including advanced analytics and priority support.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
