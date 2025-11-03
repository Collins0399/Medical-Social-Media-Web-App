import React, { useState } from 'react';
import { BookOpen, Video, FileText, Link as LinkIcon, Heart, Bookmark, Download, Eye } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockResources } from '../data/mockData';

export function ResourcesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [savedIds, setSavedIds] = useState<string[]>(
    mockResources.filter(r => r.saved).map(r => r.id)
  );

  const toggleSave = (id: string) => {
    setSavedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getTypeIcon = (type: string) => {
    const icons: Record<string, React.ReactNode> = {
      article: <BookOpen className="w-5 h-5" />,
      video: <Video className="w-5 h-5" />,
      research: <FileText className="w-5 h-5" />,
      pdf: <FileText className="w-5 h-5" />
    };
    return icons[type] || <BookOpen className="w-5 h-5" />;
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      article: 'bg-blue-100 text-blue-700',
      video: 'bg-red-100 text-red-700',
      research: 'bg-purple-100 text-purple-700',
      pdf: 'bg-green-100 text-green-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="mb-2">Resource Hub</h1>
        <p className="text-gray-600">
          Access educational articles, research papers, videos, and more
        </p>
      </div>

      <div className="mb-6 flex gap-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="article">Articles</SelectItem>
            <SelectItem value="research">Research Papers</SelectItem>
            <SelectItem value="video">Videos</SelectItem>
            <SelectItem value="pdf">PDFs</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Specialties" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="cardiology">Cardiology</SelectItem>
            <SelectItem value="neurology">Neurology</SelectItem>
            <SelectItem value="oncology">Oncology</SelectItem>
            <SelectItem value="pediatrics">Pediatrics</SelectItem>
          </SelectContent>
        </Select>

        <Button className="ml-auto">Upload Resource</Button>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Resources</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="recent">Recently Viewed</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResources.map((resource) => (
              <Card key={resource.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  {resource.thumbnail && (
                    <div className="relative h-48 overflow-hidden rounded-t-lg">
                      <img
                        src={resource.thumbnail}
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className={getTypeColor(resource.type)}>
                          {resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  )}
                  
                  <div className="p-4">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="text-gray-600">
                        {getTypeIcon(resource.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-1 line-clamp-2">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mb-2">By {resource.author}</p>
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {resource.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-3">
                      <Badge variant="outline" className="text-xs">{resource.specialty}</Badge>
                      {resource.tags.slice(0, 2).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{resource.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>234</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toggleSave(resource.id)}
                          className={`p-2 rounded-full hover:bg-gray-100 ${
                            savedIds.includes(resource.id) ? 'text-blue-600' : 'text-gray-400'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${savedIds.includes(resource.id) ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 rounded-full hover:bg-gray-100 text-gray-600">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <Button className="w-full mt-3" variant="outline">
                      View Resource
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockResources
              .filter(r => savedIds.includes(r.id))
              .map((resource) => (
                <Card key={resource.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    {resource.thumbnail && (
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <h3 className="mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <Button className="w-full" variant="outline">
                        View Resource
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-6">
          <div className="text-center py-12 text-gray-500">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No recently viewed resources</p>
            <p className="text-sm">Resources you view will appear here</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
