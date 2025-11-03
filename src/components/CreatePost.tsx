import React, { useState } from 'react';
import { Image, Video, Link, X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { currentUser } from '../data/mockData';

export function CreatePost() {
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = () => {
    console.log('Post created:', { content, category });
    setContent('');
    setCategory('');
    setShowForm(false);
  };

  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        {!showForm ? (
          <div className="flex gap-3 items-center">
            <Avatar className="w-10 h-10">
              <AvatarImage src={currentUser.profilePicture} />
              <AvatarFallback>SJ</AvatarFallback>
            </Avatar>
            <button
              onClick={() => setShowForm(true)}
              className="flex-1 text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
            >
              What's on your mind, {currentUser.name.split(' ')[0]}?
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-start gap-3 mb-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={currentUser.profilePicture} />
                <AvatarFallback>SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts, research, or insights..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px] resize-none"
                  autoFocus
                />
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-3">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                  <SelectItem value="clinical">Clinical Practice</SelectItem>
                  <SelectItem value="wellness">Wellness</SelectItem>
                  <SelectItem value="career">Career</SelectItem>
                  <SelectItem value="discussion">Discussion</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div className="flex gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                  <Video className="w-5 h-5" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full text-gray-600">
                  <Link className="w-5 h-5" />
                </button>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={!content.trim() || !category}
              >
                Post
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
