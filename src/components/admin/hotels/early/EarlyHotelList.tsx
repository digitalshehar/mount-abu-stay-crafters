
import React from 'react';
import {
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  Edit,
  Trash2,
  Star,
  Clock,
  MapPin,
  ToggleLeft,
  ToggleRight,
  Award,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { EarlyHotel } from '../types/earlyHotel';

interface EarlyHotelListProps {
  hotels: EarlyHotel[];
  loading: boolean;
  onEdit: (hotel: EarlyHotel) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured?: (id: number) => void;
}

const EarlyHotelList: React.FC<EarlyHotelListProps> = ({
  hotels,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured
}) => {
  return (
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
          ) : hotels.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-8">
                No early hotels found
              </TableCell>
            </TableRow>
          ) : (
            hotels.map((hotel) => (
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
                  <Badge variant={hotel.status === 'active' ? "default" : "secondary"}>
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
                      onClick={() => onToggleStatus(hotel.id)}
                      title={hotel.status === 'active' ? 'Deactivate' : 'Activate'}
                    >
                      {hotel.status === 'active' ? (
                        <ToggleRight className="h-4 w-4 text-green-500" />
                      ) : (
                        <ToggleLeft className="h-4 w-4 text-gray-500" />
                      )}
                    </Button>
                    
                    {onToggleFeatured && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onToggleFeatured(hotel.id)}
                        title={hotel.featured ? 'Remove from Featured' : 'Make Featured'}
                      >
                        <Award className={`h-4 w-4 ${hotel.featured ? 'text-amber-500 fill-amber-500' : 'text-gray-500'}`} />
                      </Button>
                    )}
                    
                    <Button
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit(hotel)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDelete(hotel.id)}
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
  );
};

export default EarlyHotelList;
