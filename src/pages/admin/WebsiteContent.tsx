
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Trash2, Plus, Calendar as CalendarIcon, Save, Tag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

const WebsiteContent = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  // Events section
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Winter Festival",
      date: new Date(2023, 11, 25),
      type: "festival",
      location: "Nakki Lake",
      description: "Annual winter celebration with music, dance, and local crafts exhibition."
    },
    {
      id: 2,
      title: "Mount Abu Classical Music Concert",
      date: new Date(2023, 11, 15),
      type: "cultural",
      location: "Dilwara Auditorium",
      description: "Classical music performance by renowned Indian artists."
    },
    {
      id: 3,
      title: "Aravalli Marathon",
      date: new Date(2023, 11, 10),
      type: "sports",
      location: "Starting from Sunset Point",
      description: "Annual marathon through the scenic routes of Mount Abu."
    }
  ]);
  
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: new Date(),
    type: "festival",
    location: "",
    description: ""
  });
  
  // Recommendations section
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      title: "Adventure Retreat",
      description: "Experience thrilling activities amidst nature",
      tags: ["adventure", "nature", "thrill"],
      image: "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&q=80&w=1374"
    },
    {
      id: 2,
      title: "Luxury Stay",
      description: "Indulge in premium accommodations with exceptional service",
      tags: ["luxury", "comfort", "premium"],
      image: "https://images.unsplash.com/photo-1568084680786-a84f91d1153c?auto=format&fit=crop&q=80&w=1374"
    },
    {
      id: 3,
      title: "Heritage Tour",
      description: "Explore the rich cultural heritage of Mount Abu",
      tags: ["culture", "history", "heritage"],
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1374"
    }
  ]);
  
  const [newRecommendation, setNewRecommendation] = useState({
    title: "",
    description: "",
    tags: [],
    image: ""
  });
  
  const [newTag, setNewTag] = useState("");
  
  // Event handlers
  const handleEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleEventDateChange = (date) => {
    setNewEvent(prev => ({
      ...prev,
      date
    }));
  };
  
  const handleRecommendationChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const addTag = () => {
    if (newTag.trim() && !newRecommendation.tags.includes(newTag.trim())) {
      setNewRecommendation(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag("");
    }
  };
  
  const removeTag = (tagToRemove) => {
    setNewRecommendation(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };
  
  const addEvent = () => {
    if (newEvent.title && newEvent.location && newEvent.description) {
      const newEventWithId = {
        ...newEvent,
        id: events.length > 0 ? Math.max(...events.map(e => e.id)) + 1 : 1
      };
      
      setEvents(prev => [...prev, newEventWithId]);
      setNewEvent({
        title: "",
        date: new Date(),
        type: "festival",
        location: "",
        description: ""
      });
      
      toast({
        title: "Event added",
        description: "The event has been added successfully."
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };
  
  const removeEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
    toast({
      title: "Event removed",
      description: "The event has been removed successfully."
    });
  };
  
  const addRecommendation = () => {
    if (newRecommendation.title && newRecommendation.description && newRecommendation.image) {
      const newRecWithId = {
        ...newRecommendation,
        id: recommendations.length > 0 ? Math.max(...recommendations.map(r => r.id)) + 1 : 1
      };
      
      setRecommendations(prev => [...prev, newRecWithId]);
      setNewRecommendation({
        title: "",
        description: "",
        tags: [],
        image: ""
      });
      
      toast({
        title: "Recommendation added",
        description: "The recommendation has been added successfully."
      });
    } else {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
    }
  };
  
  const removeRecommendation = (id) => {
    setRecommendations(prev => prev.filter(rec => rec.id !== id));
    toast({
      title: "Recommendation removed",
      description: "The recommendation has been removed successfully."
    });
  };
  
  const saveChanges = () => {
    // In a real implementation, this would save to Supabase
    // For now, we'll just show a success toast
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully."
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Website Content Management</h1>
        <Button onClick={saveChanges}>
          <Save className="mr-2 h-4 w-4" />
          Save All Changes
        </Button>
      </div>
      
      <Tabs defaultValue="events" className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="events">Events & Festivals</TabsTrigger>
          <TabsTrigger value="recommendations">Personalized Recommendations</TabsTrigger>
        </TabsList>
        
        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Manage Events & Festivals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <h3 className="text-lg font-medium">Current Events</h3>
                  
                  {events.length === 0 ? (
                    <div className="text-center py-8 border rounded-md bg-gray-50">
                      <p className="text-gray-500">No events have been added yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {events.map(event => (
                        <div key={event.id} className="flex items-start justify-between p-4 border rounded-md">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium">{event.title}</h4>
                              <span className="px-2 py-1 bg-gray-100 text-xs rounded-full capitalize">
                                {event.type}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500">
                              {format(new Date(event.date), 'MMMM d, yyyy')} at {event.location}
                            </p>
                            <p className="text-sm mt-2">{event.description}</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => removeEvent(event.id)}
                            className="text-red-500 hover:text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-lg font-medium pt-4">Add New Event</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="eventTitle">Event Title</Label>
                      <Input
                        id="eventTitle"
                        name="title"
                        value={newEvent.title}
                        onChange={handleEventChange}
                        placeholder="Winter Festival"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event Type</Label>
                      <select
                        id="eventType"
                        name="type"
                        value={newEvent.type}
                        onChange={handleEventChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      >
                        <option value="festival">Festival</option>
                        <option value="cultural">Cultural</option>
                        <option value="sports">Sports</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventDate">Event Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {newEvent.date ? format(newEvent.date, 'PPP') : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newEvent.date}
                            onSelect={handleEventDateChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="eventLocation">Location</Label>
                      <Input
                        id="eventLocation"
                        name="location"
                        value={newEvent.location}
                        onChange={handleEventChange}
                        placeholder="Nakki Lake"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="eventDescription">Description</Label>
                      <Textarea
                        id="eventDescription"
                        name="description"
                        value={newEvent.description}
                        onChange={handleEventChange}
                        rows={3}
                        placeholder="Annual winter celebration with music, dance, and local crafts exhibition."
                      />
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button onClick={addEvent}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Event
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="recommendations">
          <Card>
            <CardHeader>
              <CardTitle>Manage Personalized Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <h3 className="text-lg font-medium">Current Recommendations</h3>
                  
                  {recommendations.length === 0 ? (
                    <div className="text-center py-8 border rounded-md bg-gray-50">
                      <p className="text-gray-500">No recommendations have been added yet.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {recommendations.map(rec => (
                        <div key={rec.id} className="border rounded-md overflow-hidden">
                          <div className="h-40 overflow-hidden">
                            <img 
                              src={rec.image} 
                              alt={rec.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start">
                              <h4 className="font-medium">{rec.title}</h4>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => removeRecommendation(rec.id)}
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 -mt-1 -mr-1"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-500 mt-1">{rec.description}</p>
                            <div className="flex flex-wrap gap-1 mt-3">
                              {rec.tags.map((tag, idx) => (
                                <span 
                                  key={idx}
                                  className="px-2 py-0.5 bg-gray-100 text-xs rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  <h3 className="text-lg font-medium pt-4">Add New Recommendation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="recTitle">Title</Label>
                      <Input
                        id="recTitle"
                        name="title"
                        value={newRecommendation.title}
                        onChange={handleRecommendationChange}
                        placeholder="Adventure Retreat"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="recImage">Image URL</Label>
                      <Input
                        id="recImage"
                        name="image"
                        value={newRecommendation.image}
                        onChange={handleRecommendationChange}
                        placeholder="https://example.com/image.jpg"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="recDescription">Description</Label>
                      <Textarea
                        id="recDescription"
                        name="description"
                        value={newRecommendation.description}
                        onChange={handleRecommendationChange}
                        rows={3}
                        placeholder="Experience thrilling activities amidst nature"
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="recTags">Tags</Label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {newRecommendation.tags.map((tag, idx) => (
                          <div 
                            key={idx}
                            className="px-3 py-1 bg-gray-100 rounded-full flex items-center gap-1"
                          >
                            <span className="text-sm">{tag}</span>
                            <button 
                              onClick={() => removeTag(tag)}
                              className="text-gray-500 hover:text-red-500"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          id="recTags"
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add tag (e.g., luxury, nature)"
                          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        />
                        <Button type="button" onClick={addTag} variant="outline">
                          <Tag className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>
                    
                    <div className="md:col-span-2">
                      <Button onClick={addRecommendation}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Recommendation
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WebsiteContent;
