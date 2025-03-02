
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Calendar, 
  FileText,
  Eye,
  Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AdminBlog = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Sample blog data - would typically come from API
  const [blogs, setBlogs] = useState([
    {
      id: 1,
      title: "Top 10 Places to Visit in Mount Abu",
      excerpt: "Discover the most beautiful and serene spots in Mount Abu that every tourist must visit.",
      author: "Rahul Sharma",
      category: "Travel Guide",
      date: "2023-09-15",
      image: "https://images.unsplash.com/photo-1587909209111-5097ee578ec3?auto=format&fit=crop&q=80&w=1664&ixlib=rb-4.0.3",
      status: "published"
    },
    {
      id: 2,
      title: "Best Time to Visit Mount Abu",
      excerpt: "A comprehensive guide on the best seasons to experience the beauty of Mount Abu.",
      author: "Priya Singh",
      category: "Travel Tips",
      date: "2023-08-22",
      image: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
      status: "published"
    },
    {
      id: 3,
      title: "Local Cuisine of Mount Abu",
      excerpt: "Explore the traditional and delicious foods that Mount Abu has to offer.",
      author: "Amit Kumar",
      category: "Food",
      date: "2023-09-02",
      image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?auto=format&fit=crop&q=80&w=1724&ixlib=rb-4.0.3",
      status: "draft"
    },
  ]);

  // Form state for new blog
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "Travel Guide",
    image: "",
    content: ""
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  // Handle adding a new blog
  const handleAddBlog = () => {
    // Validation would happen here in a real application
    const newId = blogs.length > 0 ? Math.max(...blogs.map(blog => blog.id)) + 1 : 1;
    
    const blogToAdd = {
      ...newBlog,
      id: newId,
      date: new Date().toISOString().split('T')[0],
      status: "draft"
    };
    
    setBlogs([...blogs, blogToAdd]);
    
    setNewBlog({
      title: "",
      excerpt: "",
      author: "",
      category: "Travel Guide",
      image: "",
      content: ""
    });
    
    toast({
      title: "Blog article added",
      description: `"${newBlog.title}" has been saved as draft.`,
    });
  };

  // Handle deleting a blog
  const handleDeleteBlog = (id: number) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
    
    toast({
      title: "Blog article deleted",
      description: "The article has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blog</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Create Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Article</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2 col-span-2">
                <Label htmlFor="title">Title*</Label>
                <Input 
                  id="title"
                  name="title"
                  value={newBlog.title}
                  onChange={handleInputChange}
                  placeholder="Enter article title"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="excerpt">Excerpt*</Label>
                <Textarea 
                  id="excerpt"
                  name="excerpt"
                  value={newBlog.excerpt}
                  onChange={handleInputChange}
                  placeholder="Enter short description"
                  rows={2}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author*</Label>
                <Input 
                  id="author"
                  name="author"
                  value={newBlog.author}
                  onChange={handleInputChange}
                  placeholder="Enter author name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Category*</Label>
                <select
                  id="category"
                  name="category"
                  value={newBlog.category}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stone-200 px-3 py-2"
                >
                  <option value="Travel Guide">Travel Guide</option>
                  <option value="Travel Tips">Travel Tips</option>
                  <option value="Food">Food</option>
                  <option value="Adventure">Adventure</option>
                  <option value="Culture">Culture</option>
                </select>
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="image">Featured Image URL*</Label>
                <Input 
                  id="image"
                  name="image"
                  value={newBlog.image}
                  onChange={handleInputChange}
                  placeholder="Enter image URL"
                />
              </div>
              
              <div className="space-y-2 col-span-2">
                <Label htmlFor="content">Content*</Label>
                <Textarea 
                  id="content"
                  name="content"
                  value={newBlog.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here..."
                  rows={8}
                />
              </div>
              
              <div className="col-span-2 flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddBlog}>Save as Draft</Button>
                </DialogClose>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 border-b flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400" size={18} />
            <Input
              placeholder="Search articles by title, author, or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <Filter size={16} />
            Filters
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-stone-500 border-b">
                <th className="px-6 py-3 font-medium">Title</th>
                <th className="px-6 py-3 font-medium">Category</th>
                <th className="px-6 py-3 font-medium">Author</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={blog.image} 
                        alt={blog.title} 
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="max-w-md">
                        <p className="font-medium">{blog.title}</p>
                        <p className="text-xs text-stone-500 line-clamp-1">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{blog.author}</td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {blog.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" title="View">
                        <Eye size={16} className="text-blue-500" />
                      </Button>
                      <Button variant="ghost" size="icon" title="Edit">
                        <Edit size={16} className="text-amber-500" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title="Delete"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBlogs.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                    No articles found. Try a different search or create a new article.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;
