
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Star,
  Clock,
  MapPin,
  ToggleLeft,
  ToggleRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { EarlyHotel } from '../types/earlyHotel';
import EarlyHotelDialog from './EarlyHotelDialog';
import { toast } from 'sonner';

// Mock data - in a real app, this would come from Supabase or another data source
const mockEarlyHotels: EarlyHotel[] = [
  {
    id: 1,
    name: "Hilton Express (Hourly)",
    location: "Mount Abu Central",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1000",
    stars: 4,
    hourly_rate: 500,
    min_hours: 4,
    max_hours: 12,
    description: "Perfect for business travelers requiring short stays",
    amenities: ["Free Wi-Fi", "Air conditioning", "TV"],
    status: "active",
    featured: true
  },
  {
    id: 2,
    name: "Rest & Go Inn",
    location: "Mount Abu Station Road",
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&q=80&w=1000",
    stars: 3,
    hourly_rate: 350,
    min_hours: 2,
    max_hours: 8,
    description: "Budget-friendly hourly stays near the railway station",
    amenities: ["Free Wi-Fi", "Toiletries"],
    status: "active",
    featured: false
  }
];

const EarlyHotelManagement: React.FC = () => {
  const [earlyHotels, setEarlyHotels] = useState<EarlyHotel[]>(mockEarlyHotels);
  const [filteredHotels, setFilteredHotels] = useState<EarlyHotel[]>(mockEarlyHotels);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<EarlyHotel | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Filter hotels based on search term
    const filtered = earlyHotels.filter(hotel => 
      hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hotel.location.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredHotels(filtered);
  }, [searchTerm, earlyHotels]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Already handled by the useEffect
  };

  const handleAddHotel = (hotel: Omit<EarlyHotel, 'id' | 'status'>) => {
    // In a real app, this would be an API call to Supabase
    const newHotel: EarlyHotel = {
      ...hotel,
      id: earlyHotels.length + 1, // Mock ID generation
      status: 'active'
    };
    
    setEarlyHotels([...earlyHotels, newHotel]);
    setIsAddDialogOpen(false);
    toast.success("Early hotel added successfully!");
  };

  const handleEditHotel = (hotel: EarlyHotel) => {
    // In a real app, this would be an API call to Supabase
    const updatedHotels = earlyHotels.map(h => 
      h.id === hotel.id ? hotel : h
    );
    
    setEarlyHotels(updatedHotels);
    setIsEditDialogOpen(false);
    toast.success("Early hotel updated successfully!");
  };

  const handleDeleteHotel = (id: number) => {
    // In a real app, this would be an API call to Supabase
    const updatedHotels = earlyHotels.filter(hotel => hotel.id !== id);
    setEarlyHotels(updatedHotels);
    toast.success("Early hotel deleted successfully!");
  };

  const handleToggleStatus = (id: number) => {
    // In a real app, this would be an API call to Supabase
    const updatedHotels = earlyHotels.map(hotel => {
      if (hotel.id === id) {
        return {
          ...hotel,
          status: hotel.status === 'active' ? 'inactive' : 'active'
        };
      }
      return hotel;
    });
    
    setEarlyHotels(updatedHotels);
    toast.success("Hotel status updated!");
  };

  const handleToggleFeatured = (id: number) => {
    // In a real app, this would be an API call to Supabase
    const updatedHotels = earlyHotels.map(hotel => {
      if (hotel.id === id) {
        return {
          ...hotel,
          featured: !hotel.featured
        };
      }
      return hotel;
    });
    
    setEarlyHotels(updatedHotels);
    toast.success("Featured status updated!");
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-xl font-semibold">Early Hotel Management (Hourly Basis)</h1>
          <p className="text-muted-foreground text-sm">
            Manage hotels that can be booked by the hour for short stays
          </p>
        </div>
        
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Early Hotel
        </Button>
      </div>
      
      <div className="bg-white border rounded-lg p-4">
        <form onSubmit={handleSearch} className="flex gap-2 mb-4">
          <Input
            placeholder="Search early hotels..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-sm"
          />
          <Button type="submit">
            <Search className="h-4 w-4" />
          </Button>
        </form>
        
        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Hourly Rate</TableHead>
                <TableHead>Hours</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    Loading hotels...
                  </TableCell>
                </TableRow>
              ) : filteredHotels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    No early hotels found
                  </TableCell>
                </TableRow>
              ) : (
                filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded overflow-hidden bg-gray-100">
                          {hotel.image && (
                            <img 
                              src={hotel.image} 
                              alt={hotel.name} 
                              className="h-full w-full object-cover"
                            />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{hotel.name}</p>
                          <div className="flex items-center text-amber-500">
                            {Array.from({ length: hotel.stars }).map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-current" />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {hotel.location}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        ₹{hotel.hourly_rate}/hour
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                        {hotel.min_hours}-{hotel.max_hours} hours
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={hotel.status === 'active' ? "success" : "secondary"}>
                        {hotel.status === 'active' ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {hotel.featured ? (
                        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">
                          Featured
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground text-sm">No</span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleToggleStatus(hotel.id)}
                          title={hotel.status === 'active' ? 'Deactivate' : 'Activate'}
                        >
                          {hotel.status === 'active' ? (
                            <ToggleRight className="h-4 w-4 text-green-500" />
                          ) : (
                            <ToggleLeft className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                        
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => {
                            setSelectedHotel(hotel);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        
                        <Button
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteHotel(hotel.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Dialog (would be separate component in real app) */}
      <EarlyHotelDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onSubmit={handleAddHotel}
        title="Add Early Hotel"
      />
      
      {selectedHotel && (
        <EarlyHotelDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onSubmit={handleEditHotel}
          title="Edit Early Hotel"
          initialData={selectedHotel}
        />
      )}
    </div>
  );
};

export default EarlyHotelManagement;
