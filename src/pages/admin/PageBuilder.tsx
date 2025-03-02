
import React, { useState } from "react";
import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  Eye, 
  Globe,
  Filter,
  Check,
  X as XIcon
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
import { Separator } from "@/components/ui/separator";

// Define page template options
const pageTemplates = [
  { id: 1, name: "Blank Page", description: "Start with a blank page", icon: "📄" },
  { id: 2, name: "Landing Page", description: "A full landing page with hero section", icon: "🏠" },
  { id: 3, name: "Contact Page", description: "Contact form with map", icon: "✉️" },
  { id: 4, name: "About Us", description: "About us page with team section", icon: "👥" },
  { id: 5, name: "Services Page", description: "Showcase your services", icon: "🛠️" },
];

const AdminPageBuilder = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  
  // Sample pages data - would typically come from API
  const [pages, setPages] = useState([
    {
      id: 1,
      title: "Home",
      slug: "/",
      template: "Landing Page",
      status: "published",
      lastUpdated: "2023-09-15"
    },
    {
      id: 2,
      title: "About Mount Abu",
      slug: "/about",
      template: "About Us",
      status: "published",
      lastUpdated: "2023-08-22"
    },
    {
      id: 3,
      title: "Contact Us",
      slug: "/contact",
      template: "Contact Page",
      status: "published",
      lastUpdated: "2023-09-02"
    },
    {
      id: 4,
      title: "Terms and Conditions",
      slug: "/terms",
      template: "Blank Page",
      status: "draft",
      lastUpdated: "2023-09-10"
    },
  ]);

  // Form state for new page
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    template: "",
    content: "",
    metaTitle: "",
    metaDescription: ""
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from title
    if (name === "title") {
      const slug = value.toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      
      setNewPage({
        ...newPage,
        [name]: value,
        slug: slug
      });
    } else {
      setNewPage({
        ...newPage,
        [name]: value
      });
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setNewPage({
      ...newPage,
      template: template.name
    });
  };

  // Handle adding a new page
  const handleAddPage = () => {
    // Validation would happen here in a real application
    const newId = pages.length > 0 ? Math.max(...pages.map(page => page.id)) + 1 : 1;
    
    const pageToAdd = {
      ...newPage,
      id: newId,
      status: "draft",
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    setPages([...pages, pageToAdd]);
    
    setNewPage({
      title: "",
      slug: "",
      template: "",
      content: "",
      metaTitle: "",
      metaDescription: ""
    });
    
    setSelectedTemplate(null);
    
    toast({
      title: "Page created",
      description: `${newPage.title} has been created successfully and saved as a draft.`,
    });
  };

  // Handle deleting a page
  const handleDeletePage = (id) => {
    setPages(pages.filter(page => page.id !== id));
    
    toast({
      title: "Page deleted",
      description: "The page has been deleted successfully.",
      variant: "destructive"
    });
  };

  // Handle publishing/unpublishing a page
  const handleTogglePageStatus = (id) => {
    setPages(pages.map(page => {
      if (page.id === id) {
        const newStatus = page.status === "published" ? "draft" : "published";
        return {
          ...page, 
          status: newStatus,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return page;
    }));
    
    const page = pages.find(p => p.id === id);
    const action = page.status === "published" ? "unpublished" : "published";
    
    toast({
      title: `Page ${action}`,
      description: `${page.title} has been ${action} successfully.`,
    });
  };

  // Filter pages based on search query
  const filteredPages = pages.filter(page => 
    page.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    page.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Page Builder</h1>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus size={16} />
              Create New Page
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>Create New Page</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 gap-6 py-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Page Title*</Label>
                  <Input 
                    id="title"
                    name="title"
                    value={newPage.title}
                    onChange={handleInputChange}
                    placeholder="Enter page title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slug">URL Slug*</Label>
                  <div className="flex items-center">
                    <span className="text-sm text-stone-500 mr-1">/</span>
                    <Input 
                      id="slug"
                      name="slug"
                      value={newPage.slug}
                      onChange={handleInputChange}
                      placeholder="page-url-slug"
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <Label>Select Template*</Label>
                <div className="grid grid-cols-2 gap-3">
                  {pageTemplates.map((template) => (
                    <div 
                      key={template.id}
                      onClick={() => handleTemplateSelect(template)}
                      className={`border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedTemplate?.id === template.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-2xl">{template.icon}</div>
                          <div>
                            <h3 className="font-medium">{template.name}</h3>
                            <p className="text-sm text-stone-500">{template.description}</p>
                          </div>
                        </div>
                        {selectedTemplate?.id === template.id && (
                          <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                            <Check size={12} className="text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <Separator />
              
              <div className="space-y-4">
                <h3 className="font-medium">SEO Settings</h3>
                <div className="space-y-2">
                  <Label htmlFor="metaTitle">Meta Title</Label>
                  <Input 
                    id="metaTitle"
                    name="metaTitle"
                    value={newPage.metaTitle}
                    onChange={handleInputChange}
                    placeholder="Enter meta title"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="metaDescription">Meta Description</Label>
                  <Textarea 
                    id="metaDescription"
                    name="metaDescription"
                    value={newPage.metaDescription}
                    onChange={handleInputChange}
                    placeholder="Enter meta description"
                    rows={3}
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button 
                    onClick={handleAddPage}
                    disabled={!newPage.title || !newPage.template}
                  >
                    Create Page
                  </Button>
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
              placeholder="Search pages by title or URL..."
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
                <th className="px-6 py-3 font-medium">URL</th>
                <th className="px-6 py-3 font-medium">Template</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Last Updated</th>
                <th className="px-6 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPages.map((page) => (
                <tr key={page.id} className="border-b border-stone-100 hover:bg-stone-50">
                  <td className="px-6 py-4 font-medium">{page.title}</td>
                  <td className="px-6 py-4 text-stone-600">
                    <div className="flex items-center">
                      <Globe size={14} className="mr-1 text-stone-400" />
                      {page.slug}
                    </div>
                  </td>
                  <td className="px-6 py-4">{page.template}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {page.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-stone-600">{page.lastUpdated}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        title={page.status === 'published' ? 'Unpublish' : 'Publish'}
                        onClick={() => handleTogglePageStatus(page.id)}
                      >
                        {page.status === 'published' ? 
                          <XIcon size={16} className="text-amber-500" /> : 
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
                        onClick={() => handleDeletePage(page.id)}
                      >
                        <Trash size={16} className="text-red-500" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredPages.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-stone-500">
                    No pages found. Try a different search or create a new page.
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

export default AdminPageBuilder;
