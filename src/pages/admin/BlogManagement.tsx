
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { 
  PlusCircle, Search, RefreshCw, Filter, Trash2, Edit, Eye, 
  MoreHorizontal, ArrowUpDown, CheckCircle2, XCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

// Mock data for demonstration
const BLOG_POSTS = [
  {
    id: 1,
    title: 'Top 10 Places to Visit in Mount Abu',
    excerpt: 'Discover the most scenic and popular tourist spots in Mount Abu...',
    author: 'John Doe',
    category: 'Travel Guide',
    date: '2023-05-15',
    status: 'published',
    image: 'https://picsum.photos/300/200',
  },
  {
    id: 2,
    title: 'Mount Abu: The Only Hill Station in Rajasthan',
    excerpt: 'Learn about the history and geography of this unique hill station...',
    author: 'Jane Smith',
    category: 'History',
    date: '2023-04-22',
    status: 'draft',
    image: 'https://picsum.photos/300/201',
  },
  {
    id: 3,
    title: 'Wildlife Spotting in Mount Abu',
    excerpt: 'A guide to the diverse flora and fauna in Mount Abu Wildlife Sanctuary...',
    author: 'Mike Johnson',
    category: 'Nature',
    date: '2023-03-10',
    status: 'published',
    image: 'https://picsum.photos/300/202',
  },
  {
    id: 4,
    title: 'Festivals of Mount Abu',
    excerpt: 'Explore the vibrant cultural festivals celebrated in Mount Abu...',
    author: 'Sarah Williams',
    category: 'Culture',
    date: '2023-06-08',
    status: 'scheduled',
    image: 'https://picsum.photos/300/203',
  },
  {
    id: 5,
    title: 'Monsoon Magic in Mount Abu',
    excerpt: 'Why monsoon is the best time to visit Mount Abu...',
    author: 'Robert Brown',
    category: 'Travel Guide',
    date: '2023-07-20',
    status: 'draft',
    image: 'https://picsum.photos/300/204',
  },
];

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

const BlogManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  
  const filteredPosts = BLOG_POSTS.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && post.status === activeTab;
  });
  
  const headerActions = (
    <>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <Filter size={14} />
        <span>Filter</span>
      </Button>
      <Button variant="outline" size="sm" className="flex items-center gap-1">
        <RefreshCw size={14} />
        <span>Refresh</span>
      </Button>
      <Button className="flex items-center gap-1">
        <PlusCircle size={16} />
        <span>New Post</span>
      </Button>
    </>
  );
  
  const handleSelectPost = (id: number) => {
    if (selectedPosts.includes(id)) {
      setSelectedPosts(selectedPosts.filter(postId => postId !== id));
    } else {
      setSelectedPosts([...selectedPosts, id]);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'scheduled':
        return <Badge className="bg-blue-500">Scheduled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <DashboardHeader
        title="Blog Management"
        lastUpdated={(new Date()).toISOString()}
        actions={headerActions}
      />
      
      <motion.div variants={item}>
        <Card>
          <CardHeader className="px-6 py-4">
            <div className="flex justify-between items-center">
              <CardTitle className="text-xl">Blog Posts</CardTitle>
              <div className="flex items-center space-x-2">
                <div className="relative w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search posts..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" disabled={selectedPosts.length === 0}>
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Publish Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <XCircle className="mr-2 h-4 w-4" />
                      Unpublish Selected
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete Selected
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
              <div className="px-6">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="draft">Drafts</TabsTrigger>
                  <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
                </TabsList>
              </div>
              
              <TabsContent value={activeTab} className="m-0">
                <ScrollArea className="h-[calc(100vh-350px)]">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12">
                          <input
                            type="checkbox"
                            className="h-4 w-4"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedPosts(filteredPosts.map(post => post.id));
                              } else {
                                setSelectedPosts([]);
                              }
                            }}
                            checked={selectedPosts.length === filteredPosts.length && filteredPosts.length > 0}
                          />
                        </TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Date
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                          </div>
                        </TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    
                    <TableBody>
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell>
                              <input
                                type="checkbox"
                                className="h-4 w-4"
                                checked={selectedPosts.includes(post.id)}
                                onChange={() => handleSelectPost(post.id)}
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-3">
                                <img
                                  src={post.image}
                                  alt={post.title}
                                  className="h-10 w-10 rounded object-cover"
                                />
                                <div>
                                  <div className="font-medium">{post.title}</div>
                                  <div className="text-sm text-muted-foreground truncate max-w-md">
                                    {post.excerpt}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{post.author}</TableCell>
                            <TableCell>{post.category}</TableCell>
                            <TableCell>{post.date}</TableCell>
                            <TableCell>{getStatusBadge(post.status)}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon">
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-destructive">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center h-32">
                            <div className="flex flex-col items-center justify-center text-muted-foreground">
                              <Search className="h-8 w-8 mb-2" />
                              <p>No blog posts found</p>
                              <p className="text-sm">Try adjusting your search or filters</p>
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default BlogManagement;
