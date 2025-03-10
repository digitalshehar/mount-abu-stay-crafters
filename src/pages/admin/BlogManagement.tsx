
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { FileUp, Plus, Search } from 'lucide-react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Top 10 Places to Visit in Mount Abu",
      excerpt: "Discover the most beautiful and serene locations in Mount Abu...",
      image: "https://source.unsplash.com/random/300x200?mountain",
      author: "Rahul Sharma",
      date: "2023-05-15",
      status: "published"
    },
    {
      id: 2,
      title: "Best Hotels in Mount Abu for Every Budget",
      excerpt: "From luxury resorts to budget-friendly stays, find the perfect accommodation...",
      image: "https://source.unsplash.com/random/300x200?hotel",
      author: "Priya Patel",
      date: "2023-04-22",
      status: "draft"
    },
    {
      id: 3,
      title: "Adventure Activities in Mount Abu",
      excerpt: "Experience the thrill of trekking, camping, and more in Mount Abu...",
      image: "https://source.unsplash.com/random/300x200?adventure",
      author: "Amit Singh",
      date: "2023-03-30",
      status: "published"
    }
  ];
  
  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <motion.div 
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <DashboardHeader 
        title="Blog Management" 
        actions={
          <Button className="flex items-center gap-2">
            <Plus size={16} />
            <span>Create Post</span>
          </Button>
        }
      />
      
      <motion.div variants={item}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Blog Posts</CardTitle>
                <CardDescription>
                  Manage your blog posts, create new content, and engage your audience.
                </CardDescription>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search posts..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
                <TabsTrigger value="draft">Drafts</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="space-y-4">
                {filteredPosts.length === 0 ? (
                  <div className="text-center py-10 text-gray-500">
                    No blog posts found matching your search.
                  </div>
                ) : (
                  filteredPosts.map(post => (
                    <div key={post.id} className="border rounded-lg overflow-hidden flex flex-col md:flex-row">
                      <div className="md:w-48 h-48 md:h-auto">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-medium">{post.title}</h3>
                          <div className={`text-xs px-2 py-1 rounded ${
                            post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {post.status === 'published' ? 'Published' : 'Draft'}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                        <div className="text-xs text-gray-500 mt-auto">
                          By {post.author} • {new Date(post.date).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                          {post.status === 'draft' && (
                            <Button size="sm">Publish</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </TabsContent>
              
              <TabsContent value="published" className="space-y-4">
                {filteredPosts.filter(post => post.status === 'published').map(post => (
                  <div key={post.id} className="border rounded-lg overflow-hidden flex flex-col md:flex-row">
                    {/* Same content as above */}
                    <div className="md:w-48 h-48 md:h-auto">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                          Published
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="text-xs text-gray-500 mt-auto">
                        By {post.author} • {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="draft" className="space-y-4">
                {filteredPosts.filter(post => post.status === 'draft').map(post => (
                  <div key={post.id} className="border rounded-lg overflow-hidden flex flex-col md:flex-row">
                    {/* Same content as above */}
                    <div className="md:w-48 h-48 md:h-auto">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-medium">{post.title}</h3>
                        <div className="text-xs px-2 py-1 rounded bg-amber-100 text-amber-800">
                          Draft
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{post.excerpt}</p>
                      <div className="text-xs text-gray-500 mt-auto">
                        By {post.author} • {new Date(post.date).toLocaleDateString()}
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm" className="text-red-500">Delete</Button>
                        <Button size="sm">Publish</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
      
      <motion.div variants={item}>
        <Card>
          <CardHeader>
            <CardTitle>Quick Post</CardTitle>
            <CardDescription>Create a new blog post in just a few steps.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Post Title</Label>
              <Input id="title" placeholder="Enter post title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea id="content" placeholder="Write your blog post content here..." className="min-h-[200px]" />
            </div>
            <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-6">
              <div className="text-center">
                <FileUp className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <Button variant="outline">Upload Featured Image</Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  SVG, PNG, JPG or GIF (max. 2MB)
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Save as Draft</Button>
            <Button>Publish Post</Button>
          </CardFooter>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BlogManagement;
