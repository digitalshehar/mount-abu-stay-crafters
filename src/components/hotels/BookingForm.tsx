
import React, { useState } from 'react';
import { format, addDays, differenceInDays } from 'date-fns';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useBookings } from '@/hooks/useBookings';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { CalendarIcon, CreditCard } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

// Define validation schema for booking form
const bookingSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Valid phone number is required'),
  checkInDate: z.date({
    required_error: 'Check-in date is required',
  }),
  checkOutDate: z.date({
    required_error: 'Check-out date is required',
  }),
  roomType: z.string().min(1, 'Room type is required'),
  guests: z.coerce.number().min(1, 'At least 1 guest is required'),
  specialRequests: z.string().optional(),
});

type BookingFormValues = z.infer<typeof bookingSchema>;

interface BookingFormProps {
  hotelId: number;
  hotelName: string;
  roomTypes: Array<{
    type: string;
    price: number;
    capacity: number;
  }>;
  onSuccess?: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({
  hotelId,
  hotelName,
  roomTypes,
  onSuccess
}) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { addBooking } = useBookings();
  const [selectedRoom, setSelectedRoom] = useState(roomTypes[0] || { type: '', price: 0, capacity: 2 });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: user?.email || '',
      phone: '',
      checkInDate: new Date(),
      checkOutDate: addDays(new Date(), 2),
      roomType: roomTypes[0]?.type || '',
      guests: 2,
      specialRequests: '',
    },
  });

  const checkInDate = watch('checkInDate');
  const checkOutDate = watch('checkOutDate');
  const roomType = watch('roomType');

  // Update selectedRoom when roomType changes
  React.useEffect(() => {
    const selected = roomTypes.find(room => room.type === roomType);
    if (selected) {
      setSelectedRoom(selected);
      // Ensure guests is capped at the room capacity
      const currentGuests = watch('guests');
      if (currentGuests > selected.capacity) {
        setValue('guests', selected.capacity);
      }
    }
  }, [roomType, roomTypes, setValue, watch]);

  // Calculate total price based on room price and length of stay
  const calculateTotalPrice = () => {
    if (!checkInDate || !checkOutDate || !selectedRoom) return 0;
    
    const nights = Math.max(1, differenceInDays(checkOutDate, checkInDate));
    return selectedRoom.price * nights;
  };

  const totalPrice = calculateTotalPrice();

  const onSubmit = async (data: BookingFormValues) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const bookingData = {
        user_id: user.id,
        hotel_id: hotelId,
        room_type: data.roomType,
        check_in_date: format(data.checkInDate, 'yyyy-MM-dd'),
        check_out_date: format(data.checkOutDate, 'yyyy-MM-dd'),
        guest_name: `${data.firstName} ${data.lastName}`,
        guest_email: data.email,
        guest_phone: data.phone,
        number_of_guests: data.guests,
        total_price: totalPrice,
        payment_status: 'pending',
        booking_status: 'confirmed',
        special_requests: data.specialRequests
      };

      console.log('Submitting booking:', bookingData);
      
      const result = await addBooking(bookingData);
      
      if (result) {
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Error submitting booking:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Book Your Stay</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" {...register('firstName')} />
              {errors.firstName && (
                <p className="text-sm text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" {...register('lastName')} />
              {errors.lastName && (
                <p className="text-sm text-red-500">{errors.lastName.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" {...register('email')} />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" {...register('phone')} />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Check-in Date</Label>
              <Controller
                control={control}
                name="checkInDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select check-in date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.checkInDate && (
                <p className="text-sm text-red-500">{errors.checkInDate.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Check-out Date</Label>
              <Controller
                control={control}
                name="checkOutDate"
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Select check-out date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                        disabled={(date) => 
                          date < new Date() || 
                          (checkInDate && date <= checkInDate)
                        }
                      />
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.checkOutDate && (
                <p className="text-sm text-red-500">{errors.checkOutDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="roomType">Room Type</Label>
              <Controller
                control={control}
                name="roomType"
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Room Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {roomTypes.map((room) => (
                        <SelectItem key={room.type} value={room.type}>
                          {room.type} - ₹{room.price}/night
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.roomType && (
                <p className="text-sm text-red-500">{errors.roomType.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="guests">Guests</Label>
              <Controller
                control={control}
                name="guests"
                render={({ field }) => (
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    value={field.value.toString()}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Number of Guests" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...Array(selectedRoom.capacity)].map((_, i) => (
                        <SelectItem key={i + 1} value={(i + 1).toString()}>
                          {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.guests && (
                <p className="text-sm text-red-500">{errors.guests.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Input id="specialRequests" {...register('specialRequests')} />
          </div>

          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Booking Summary</h3>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Hotel:</span>
                <span>{hotelName}</span>
              </div>
              <div className="flex justify-between">
                <span>Room Type:</span>
                <span>{selectedRoom.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-in:</span>
                <span>{checkInDate ? format(checkInDate, 'MMM dd, yyyy') : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Check-out:</span>
                <span>{checkOutDate ? format(checkOutDate, 'MMM dd, yyyy') : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span>Nights:</span>
                <span>
                  {checkInDate && checkOutDate 
                    ? Math.max(1, differenceInDays(checkOutDate, checkInDate)) 
                    : '0'}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t mt-2">
                <span>Total Price:</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button 
          type="submit" 
          className="w-full" 
          onClick={handleSubmit(onSubmit)} 
          disabled={isSubmitting}
        >
          <CreditCard className="mr-2 h-4 w-4" />
          {isSubmitting ? 'Processing...' : 'Book Now'}
        </Button>
        <p className="text-xs text-center text-muted-foreground">
          By clicking "Book Now", you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardFooter>
    </Card>
  );
};

export default BookingForm;
