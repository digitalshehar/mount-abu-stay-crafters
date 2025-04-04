
import { useState, useEffect } from 'react';
import { EarlyHotel, EarlyHotelFormData } from '../../types/earlyHotel';
import { toast } from 'sonner';

// Mock data with correctly typed status
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

export const useEarlyHotelManagement = () => {
  // Use localStorage to persist early hotels data between page refreshes
  const getInitialHotels = (): EarlyHotel[] => {
    const savedHotels = localStorage.getItem('earlyHotels');
    return savedHotels ? JSON.parse(savedHotels) : mockEarlyHotels;
  };

  const [earlyHotels, setEarlyHotels] = useState<EarlyHotel[]>(getInitialHotels);
  const [filteredHotels, setFilteredHotels] = useState<EarlyHotel[]>(earlyHotels);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<EarlyHotel | null>(null);
  const [loading, setLoading] = useState(false);

  // Save to localStorage whenever earlyHotels changes
  useEffect(() => {
    localStorage.setItem('earlyHotels', JSON.stringify(earlyHotels));
  }, [earlyHotels]);

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

  const handleAddHotel = (hotel: EarlyHotelFormData) => {
    // Ensure status is set with the correct type
    const newHotel: EarlyHotel = {
      ...hotel,
      id: earlyHotels.length > 0 ? Math.max(...earlyHotels.map(h => h.id)) + 1 : 1, // Generate unique ID
      status: hotel.status || 'active'
    };
    
    const updatedHotels = [...earlyHotels, newHotel];
    setEarlyHotels(updatedHotels);
    setIsAddDialogOpen(false);
    toast.success("Early hotel added successfully!");
  };

  const handleEditHotel = (hotel: EarlyHotel) => {
    const updatedHotels = earlyHotels.map(h => 
      h.id === hotel.id ? hotel : h
    );
    
    setEarlyHotels(updatedHotels);
    setIsEditDialogOpen(false);
    toast.success("Early hotel updated successfully!");
  };

  const handleDeleteHotel = (id: number) => {
    const updatedHotels = earlyHotels.filter(hotel => hotel.id !== id);
    setEarlyHotels(updatedHotels);
    toast.success("Early hotel deleted successfully!");
  };

  const handleToggleStatus = (id: number) => {
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

  return {
    earlyHotels,
    filteredHotels,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedHotel,
    setSelectedHotel,
    loading,
    handleSearch,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleToggleStatus,
    handleToggleFeatured
  };
};
