
import React, { useState } from 'react';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Plus, Search, Filter, Eye, Edit, Trash2, MoreVertical } from 'lucide-react';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: 'Top 10 Hotels in Mount Abu',
    category: 'Hotels',
    author: 'John Doe',
    date: '2024-03-05',
    status: 'published',
  },
  {
    id: 2,
    title: 'Best Time to Visit Mount Abu',
    category: 'Travel Tips',
    author: 'Jane Smith',
    date: '2024-02-28',
    status: 'draft',
  },
  {
    id: 3,
    title: 'Adventure Activities in Mount Abu',
    category: 'Adventures',
    author: 'John Doe',
    date: '2024-02-15',
    status: 'published',
  },
  {
    id: 4,
    title: 'Local Cuisine of Mount Abu',
    category: 'Food',
    author: 'Sarah Johnson',
    date: '2024-01-20',
    status: 'published',
  },
  {
    id: 5,
    title: 'Budget Stay Options in Mount Abu',
    category: 'Hotels',
    author: 'Mike Brown',
    date: '2024-01-10',
    status: 'draft',
  },
];

const BlogManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const headerActions = (
    <Button className="flex items-center gap-1">
      <Plus size={16} />
      <span>New Post</span>
    </Button>
  );
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'published':
        return <Badge className="bg-green-500">Published</Badge>;
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };
  
  return (
    <div className="space-y-6">
      <DashboardHeader 
        title="Blog Management" 
        actions={headerActions}
      />
      
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search posts..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="sm:w-auto flex gap-1 items-center">
              <Filter size={16} />
              <span>Filter</span>
            </Button>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blogPosts
                  .filter(post => 
                    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    post.author.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map(post => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">{post.title}</TableCell>
                      <TableCell>{post.category}</TableCell>
                      <TableCell>{post.author}</TableCell>
                      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                      <TableCell>{getStatusBadge(post.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Eye size={16} />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Edit size={16} />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical size={16} />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 size={14} className="mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogManagement;
