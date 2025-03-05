
import React, { useState, useEffect } from "react";
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
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  image: string;
  content: string;
  status: 'published' | 'draft';
}

const AdminBlog = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  // Form state for new blog
  const [newBlog, setNewBlog] = useState({
    title: "",
    excerpt: "",
    author: "",
    category: "Travel Guide",
    image: "",
    content: ""
  });

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*');
      
      if (error) throw error;
      
      if (data) {
        const formattedBlogs = data.map(blog => ({
          id: blog.id,
          title: blog.title,
          excerpt: blog.excerpt,
          author: blog.author,
          category: blog.category,
          date: blog.date,
          image: blog.image,
          content: blog.content,
          status: blog.status as 'published' | 'draft'
        }));
        setBlogs(formattedBlogs);
      }
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      toast({
        title: "Error fetching blog posts",
        description: "There was a problem loading the blog data.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewBlog({
      ...newBlog,
      [name]: value
    });
  };

  // Handle adding a new blog
  const handleAddBlog = async () => {
    // Validation
    if (!newBlog.title || !newBlog.excerpt || !newBlog.author || !newBlog.category || !newBlog.image || !newBlog.content) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive"
      });
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .insert({
          title: newBlog.title,
          excerpt: newBlog.excerpt,
          author: newBlog.author,
          category: newBlog.category,
          image: newBlog.image,
          content: newBlog.content,
          status: 'draft'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      if (data) {
        const newBlogData: BlogPost = {
          id: data.id,
          title: data.title,
          excerpt: data.excerpt,
          author: data.author,
          category: data.category,
          date: data.date,
          image: data.image,
          content: data.content,
          status: 'draft'
        };
        
        setBlogs([...blogs, newBlogData]);
        
        // Reset form
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
        
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error adding blog post:", error);
      toast({
        title: "Error adding blog article",
        description: "There was a problem adding the article. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle deleting a blog
  const handleDeleteBlog = async (id: number) => {
    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      setBlogs(blogs.filter(blog => blog.id !== id));
      
      toast({
        title: "Blog article deleted",
        description: "The article has been deleted successfully.",
        variant: "destructive"
      });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      toast({
        title: "Error deleting article",
        description: "There was a problem deleting the article. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle publishing/unpublishing a blog post
  const handleToggleStatus = async (id: number) => {
    try {
      const blog = blogs.find(b => b.id === id);
      if (!blog) return;
      
      const newStatus = blog.status === 'published' ? 'draft' : 'published';
      
      const { error } = await supabase
        .from('blog_posts')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      
      setBlogs(blogs.map(b => 
        b.id === id ? { ...b, status: newStatus as 'published' | 'draft' } : b
      ));
      
      toast({
        title: "Status updated",
        description: `Article has been ${newStatus === 'published' ? 'published' : 'unpublished'}.`,
      });
    } catch (error) {
      console.error("Error updating blog status:", error);
      toast({
        title: "Error updating status",
        description: "There was a problem updating the article status. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Filter blogs based on search query
  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    blog.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Manage Blog</h1>
        </div>
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-6 bg-stone-200 rounded w-48 mb-4"></div>
            <div className="h-4 bg-stone-200 rounded w-64"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Blog</h1>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddBlog}>Save as Draft</Button>
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
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={blog.status === 'published' ? 'Unpublish' : 'Publish'}
                        onClick={() => handleToggleStatus(blog.id)}
                      >
                        {blog.status === 'published' ? 
                          <X size={16} className="text-amber-500" /> : 
                          <Check size={16} className="text-green-500" />
                        }
                      </Button>
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
              {filteredBlogs.length === 0 && !isLoading && (
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
