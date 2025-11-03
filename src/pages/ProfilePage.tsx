import React, { useState } from 'react';
import { MapPin, Calendar, Mail, School, Award, Settings, Crown, UserPlus, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { PostCard } from '../components/PostCard';
import { currentUser, mockPosts } from '../data/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';

export function ProfilePage() {
  const [isFollowing, setIsFollowing] = useState(false);
  const userPosts = mockPosts.filter(p => p.author.id === currentUser.id);

  return (
    <div className="p-6">
      {/* Profile Header */}
      <Card className="mb-6">
        <CardContent className="p-0">
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 rounded-t-lg"></div>
          
          {/* Profile Info */}
          <div className="px-6 pb-6">
            <div className="flex items-start justify-between -mt-16 mb-4">
              <Avatar className="w-32 h-32 border-4 border-white">
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback className="text-3xl">SJ</AvatarFallback>
              </Avatar>
              
              <div className="flex gap-2 mt-20">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Edit Profile</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Full Name</Label>
                          <Input defaultValue={currentUser.name} />
                        </div>
                        <div>
                          <Label>Username</Label>
                          <Input defaultValue={currentUser.username} />
                        </div>
                      </div>
                      <div>
                        <Label>Email</Label>
                        <Input type="email" defaultValue={currentUser.email} />
                      </div>
                      <div>
                        <Label>Bio</Label>
                        <Textarea defaultValue={currentUser.bio} rows={3} />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>School</Label>
                          <Input defaultValue={currentUser.school} />
                        </div>
                        <div>
                          <Label>Level/Year</Label>
                          <Input defaultValue={currentUser.level} />
                        </div>
                      </div>
                      <div>
                        <Label>Specialty</Label>
                        <Input defaultValue={currentUser.specialty} />
                      </div>
                      <Button className="w-full">Save Changes</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  <span>Message</span>
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <h1>{currentUser.name}</h1>
                {currentUser.verified && (
                  <Badge variant="secondary">✓ Verified</Badge>
                )}
                {currentUser.isPremium && (
                  <Badge className="bg-yellow-500">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-gray-600 mb-3">@{currentUser.username}</p>
              <p className="mb-4">{currentUser.bio}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4" />
                  <span>{currentUser.school}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>{currentUser.level} • {currentUser.specialty}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {new Date(currentUser.joinedDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{currentUser.email}</span>
                </div>
              </div>

              <div className="flex gap-6">
                <button className="hover:underline">
                  <span className="mr-1">{currentUser.followers}</span>
                  <span className="text-gray-600">Followers</span>
                </button>
                <button className="hover:underline">
                  <span className="mr-1">{currentUser.following}</span>
                  <span className="text-gray-600">Following</span>
                </button>
                <button className="hover:underline">
                  <span className="mr-1">{userPosts.length}</span>
                  <span className="text-gray-600">Posts</span>
                </button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="posts">
        <TabsList className="mb-6">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <div className="max-w-2xl">
            {userPosts.length > 0 ? (
              userPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center text-gray-500">
                  <p>No posts yet</p>
                  <p className="text-sm">Share your first post to get started</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="about">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <span>Education</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Institution</p>
                    <p>{currentUser.school}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Level</p>
                    <p>{currentUser.level}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Specialty</p>
                    <p>{currentUser.specialty}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <span>Contact Information</span>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p>{currentUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Member Since</p>
                    <p>{new Date(currentUser.joinedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <span>Interests & Specializations</span>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge>Cardiology</Badge>
                  <Badge>Research</Badge>
                  <Badge>Medical Education</Badge>
                  <Badge>Global Health</Badge>
                  <Badge>Clinical Practice</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activity">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">{userPosts.length}</div>
                <p className="text-gray-600">Posts Created</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">127</div>
                <p className="text-gray-600">Comments</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">892</div>
                <p className="text-gray-600">Likes Given</p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <span>Recent Activity</span>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div>
                    <p>Posted about cardiology research</p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
                  <div>
                    <p>Commented on a discussion about patient care</p>
                    <p className="text-sm text-gray-500">5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                  <div>
                    <p>Saved a resource about ECG interpretation</p>
                    <p className="text-sm text-gray-500">1 day ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
