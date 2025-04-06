
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { EarlyHotel } from '../types/earlyHotel';
import { Edit, Trash2, Star, Clock, MapPin, ExternalLink, EyeIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface EarlyHotelListProps {
  hotels: EarlyHotel[];
  loading: boolean;
  onEdit: (hotel: EarlyHotel) => void;
  onDelete: (id: number) => void;
  onToggleStatus: (id: number, currentStatus: string) => void;
  onToggleFeatured: (id: number, currentFeatured: boolean) => void;
  onViewDetails: (hotel: EarlyHotel) => void;
}

const EarlyHotelList: React.FC<EarlyHotelListProps> = ({
  hotels,
  loading,
  onEdit,
  onDelete,
  onToggleStatus,
  onToggleFeatured,
  onViewDetails
}) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (hotels.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-medium text-gray-600 mb-2">No hotels found</h3>
        <p className="text-gray-500 mb-4">Add some early hotels to get started</p>
      </div>
    );
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Hourly Rate</TableHead>
            <TableHead>Duration</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hotels.map((hotel) => (
            <TableRow key={hotel.id}>
              <TableCell>
                <div className="flex items-start gap-2">
                  <img
                    src={hotel.image}
                    alt={hotel.name}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{hotel.name}</div>
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        {Array.from({ length: hotel.stars }).map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <MapPin className="w-3 h-3 mr-1 text-gray-500" />
                  {hotel.location}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">
                  ₹{hotel.hourly_rate}/hr
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center text-sm">
                  <Clock className="w-3 h-3 mr-1 text-gray-500" />
                  {hotel.min_hours} - {hotel.max_hours} hrs
                </div>
              </TableCell>
              <TableCell>
                <Switch
                  checked={hotel.status === 'active'}
                  onCheckedChange={() => onToggleStatus(hotel.id, hotel.status)}
                  aria-label="Toggle status"
                />
              </TableCell>
              <TableCell>
                <Switch
                  checked={hotel.featured}
                  onCheckedChange={() => onToggleFeatured(hotel.id, hotel.featured)}
                  aria-label="Toggle featured"
                />
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onViewDetails(hotel)}
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => navigate(`/early-hotel/${hotel.id}`)}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onEdit(hotel)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => onDelete(hotel.id)}
                    className="text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EarlyHotelList;
