
import React, { useState, useEffect } from 'react';
import EarlyHotelHeader from './EarlyHotelHeader';
import EarlyHotelSearch from './EarlyHotelSearch';
import EarlyHotelList from './EarlyHotelList';
import EarlyHotelDialog from './EarlyHotelDialog';
import EarlyHotelBookingsList from './EarlyHotelBookingsList';
import EarlyHotelDetailsTab from './EarlyHotelDetailsTab';
import { useEarlyHotelManagement } from './hooks/useEarlyHotelManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Hotel, CalendarRange, DollarSign, UsersRound } from "lucide-react";

interface BookingStats {
  total_bookings: number;
  confirmed_bookings: number;
  cancelled_bookings: number;
  completed_bookings: number;
  total_revenue: number;
}

const EarlyHotelManagement: React.FC = () => {
  const {
    filteredHotels,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    isDetailsDialogOpen,
    setIsDetailsDialogOpen,
    selectedHotel,
    setSelectedHotel,
    loading,
    handleSearch,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleToggleStatus,
    handleToggleFeatured,
    fetchHotels
  } = useEarlyHotelManagement();

  const [activeTab, setActiveTab] = useState<string>("hotels");
  const [bookingStats, setBookingStats] = useState<BookingStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Fetch booking stats for dashboard
  useEffect(() => {
    const fetchBookingStats = async () => {
      setStatsLoading(true);
      try {
        // Get aggregated stats from the booking_stats view
        const { data, error } = await supabase
          .from('early_hotel_booking_stats')
          .select(`
            total_bookings,
            confirmed_bookings,
            cancelled_bookings,
            completed_bookings,
            total_revenue
          `)
          .order('total_bookings', { ascending: false });

        if (error) throw error;

        // Sum up all stats from hotels
        const aggregatedStats = data.reduce((acc, hotel) => {
          return {
            total_bookings: acc.total_bookings + (hotel.total_bookings || 0),
            confirmed_bookings: acc.confirmed_bookings + (hotel.confirmed_bookings || 0),
            cancelled_bookings: acc.cancelled_bookings + (hotel.cancelled_bookings || 0),
            completed_bookings: acc.completed_bookings + (hotel.completed_bookings || 0),
            total_revenue: acc.total_revenue + (hotel.total_revenue || 0),
          };
        }, {
          total_bookings: 0,
          confirmed_bookings: 0,
          cancelled_bookings: 0,
          completed_bookings: 0,
          total_revenue: 0,
        });

        setBookingStats(aggregatedStats);
      } catch (error) {
        console.error("Error fetching booking stats:", error);
        setBookingStats({
          total_bookings: 0,
          confirmed_bookings: 0,
          cancelled_bookings: 0,
          completed_bookings: 0,
          total_revenue: 0,
        });
      } finally {
        setStatsLoading(false);
      }
    };

    if (activeTab === "bookings") {
      fetchBookingStats();
    }
  }, [activeTab]);

  const handleViewDetails = (hotel: any) => {
    setSelectedHotel(hotel);
    setIsDetailsDialogOpen(true);
  };

  return (
    <div className="space-y-4">
      <EarlyHotelHeader 
        onAddClick={() => setIsAddDialogOpen(true)} 
      />
      
      <Tabs defaultValue="hotels" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="hotels">Manage Hotels</TabsTrigger>
          <TabsTrigger value="bookings">View Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels">
          <div className="space-y-4">
            <EarlyHotelSearch 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onSearch={handleSearch}
              onAddClick={() => setIsAddDialogOpen(true)}
            />
            
            <EarlyHotelList 
              hotels={filteredHotels}
              loading={loading}
              onEdit={(hotel) => {
                setSelectedHotel(hotel);
                setIsEditDialogOpen(true);
              }}
              onViewDetails={handleViewDetails}
              onDelete={handleDeleteHotel}
              onToggleStatus={handleToggleStatus}
              onToggleFeatured={handleToggleFeatured}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          {statsLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="mb-6">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Bookings
                    </CardTitle>
                    <CalendarRange className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{bookingStats?.total_bookings || 0}</div>
                    <p className="text-xs text-muted-foreground">
                      All-time booking count
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Total Revenue
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      ₹{bookingStats?.total_revenue?.toLocaleString() || 0}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      All-time earnings
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Active Hotels
                    </CardTitle>
                    <Hotel className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {filteredHotels.filter(h => h.status === 'active').length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Currently active early hotels
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Completion Rate
                    </CardTitle>
                    <UsersRound className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {bookingStats?.total_bookings 
                        ? Math.round((bookingStats.completed_bookings / bookingStats.total_bookings) * 100) 
                        : 0}%
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Bookings successfully completed
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <EarlyHotelBookingsList />
        </TabsContent>
      </Tabs>

      {/* Add Dialog */}
      <EarlyHotelDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onSubmit={handleAddHotel}
        title="Add Early Hotel"
      />
      
      {/* Edit Dialog */}
      {selectedHotel && (
        <EarlyHotelDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onSubmit={handleEditHotel}
          title="Edit Early Hotel"
          initialData={selectedHotel}
        />
      )}

      {/* Details Dialog */}
      {selectedHotel && (
        <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Hotel Details: {selectedHotel.name}</DialogTitle>
            </DialogHeader>
            <div className="mt-4">
              <EarlyHotelDetailsTab hotelId={selectedHotel.id} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default EarlyHotelManagement;
