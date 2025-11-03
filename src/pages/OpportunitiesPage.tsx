import React, { useState } from 'react';
import { Briefcase, MapPin, Calendar, ExternalLink, Bookmark, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { mockOpportunities } from '../data/mockData';
import { Opportunity } from '../types';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';

export function OpportunitiesPage() {
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(
    mockOpportunities.filter(o => o.bookmarked).map(o => o.id)
  );

  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      internship: 'bg-blue-100 text-blue-700',
      job: 'bg-green-100 text-green-700',
      scholarship: 'bg-purple-100 text-purple-700',
      event: 'bg-orange-100 text-orange-700'
    };
    return colors[type] || 'bg-gray-100 text-gray-700';
  };

  const OpportunityCard = ({ opportunity }: { opportunity: Opportunity }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge className={getTypeColor(opportunity.type)}>
                {opportunity.type.charAt(0).toUpperCase() + opportunity.type.slice(1)}
              </Badge>
              {bookmarkedIds.includes(opportunity.id) && (
                <Badge variant="outline">Saved</Badge>
              )}
            </div>
            <h3 className="mb-2">{opportunity.title}</h3>
            <p className="text-gray-600 mb-3">{opportunity.description}</p>
          </div>
          <button
            onClick={() => toggleBookmark(opportunity.id)}
            className={`p-2 rounded-full hover:bg-gray-100 ${
              bookmarkedIds.includes(opportunity.id) ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            <Bookmark className={`w-5 h-5 ${bookmarkedIds.includes(opportunity.id) ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            <span>{opportunity.institution}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Deadline: {new Date(opportunity.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm mb-2">Requirements:</p>
          <ul className="text-sm text-gray-600 space-y-1">
            {opportunity.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1">
                Apply Now
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply to {opportunity.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div>
                  <label className="block text-sm mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Cover Letter</label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px]"
                    placeholder="Why are you interested in this opportunity?"
                  />
                </div>
                <div>
                  <label className="block text-sm mb-2">Resume/CV</label>
                  <input
                    type="file"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <Button className="w-full">Submit Application</Button>
              </div>
            </DialogContent>
          </Dialog>
          
          {opportunity.link && (
            <Button variant="outline" className="flex items-center gap-2">
              <ExternalLink className="w-4 h-4" />
              <span>View Details</span>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="mb-2">Opportunities</h1>
          <p className="text-gray-600">Discover internships, jobs, scholarships, and events</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          <span>Post Opportunity</span>
        </Button>
      </div>

      <div className="mb-6 flex gap-4">
        <Select value={selectedType} onValueChange={setSelectedType}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="internship">Internships</SelectItem>
            <SelectItem value="job">Jobs</SelectItem>
            <SelectItem value="scholarship">Scholarships</SelectItem>
            <SelectItem value="event">Events</SelectItem>
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
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Opportunities</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockOpportunities.map((opportunity) => (
              <OpportunityCard key={opportunity.id} opportunity={opportunity} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {mockOpportunities
              .filter(o => bookmarkedIds.includes(o.id))
              .map((opportunity) => (
                <OpportunityCard key={opportunity.id} opportunity={opportunity} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="applied" className="mt-6">
          <div className="text-center py-12 text-gray-500">
            <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>No applications yet</p>
            <p className="text-sm">Start applying to opportunities that interest you</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
