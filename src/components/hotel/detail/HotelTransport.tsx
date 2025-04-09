
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { toast } from 'sonner';
import { MapPin, Car, CalendarIcon, Clock, User, Users as UsersIcon } from 'lucide-react';

interface HotelTransportProps {
  hotelName: string;
  location: string;
}

const transportOptions = [
  { type: 'Sedan', price: 1200, capacity: 3, image: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&q=80&w=2236&ixlib=rb-4.0.3' },
  { type: 'SUV', price: 1800, capacity: 6, image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' },
  { type: 'Tempo Traveller', price: 2500, capacity: 12, image: 'https://images.unsplash.com/photo-1515876305430-f06edab8282a?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3' }
];

interface TransportOption {
  type: string;
  price: number;
  capacity: number;
  image: string;
}

const HotelTransport: React.FC<HotelTransportProps> = ({ hotelName, location }) => {
  const [selectedTab, setSelectedTab] = useState('airport');
  const [selectedTransport, setSelectedTransport] = useState<TransportOption | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState('12:00');
  const [guests, setGuests] = useState(2);
  
  const handleBookTransport = () => {
    if (!selectedTransport) {
      toast.error('Please select a transport option');
      return;
    }
    
    if (!date) {
      toast.error('Please select a date');
      return;
    }
    
    toast.success(`Transport booked successfully! ${selectedTransport.type} will pick you up on ${format(date, 'PP')} at ${time}.`);
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Transportation Options</CardTitle>
          <CardDescription>Book a comfortable ride to or from {hotelName}</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedTab} onValueChange={setSelectedTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="airport">Airport Transfer</TabsTrigger>
              <TabsTrigger value="sightseeing">Sightseeing</TabsTrigger>
            </TabsList>
            
            <TabsContent value="airport" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Pickup Location</label>
                  <Select defaultValue="airport">
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="airport">Udaipur Airport</SelectItem>
                      <SelectItem value="railway">Railway Station</SelectItem>
                      <SelectItem value="bus">Bus Terminal</SelectItem>
                      <SelectItem value="custom">Custom Location</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Drop Location</label>
                  <div className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <MapPin className="h-4 w-4 opacity-50 mr-2" />
                    <span className="opacity-50">{hotelName}, {location}</span>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, 'PPP') : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Time</label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                      <Input 
                        type="time" 
                        value={time} 
                        onChange={(e) => setTime(e.target.value)} 
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-1 block">Passengers</label>
                  <div className="relative">
                    <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
                    <Input 
                      type="number" 
                      min={1} 
                      max={20} 
                      value={guests} 
                      onChange={(e) => setGuests(parseInt(e.target.value))} 
                      className="pl-10"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="sightseeing" className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                <h3 className="text-blue-800 font-medium text-sm mb-1">Popular Sightseeing Tours</h3>
                <p className="text-blue-700 text-xs">
                  Explore the beautiful Mount Abu with our curated sightseeing packages designed for hotel guests.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1584554576681-52891b800657?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                      alt="Dilwara Temples Tour" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="py-4">
                    <h3 className="font-medium">Dilwara Temples Tour</h3>
                    <p className="text-sm text-muted-foreground mb-2">4 hours • Lunch included</p>
                    <p className="text-primary font-semibold">₹1,500 per person</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Book This Tour</Button>
                  </CardFooter>
                </Card>
                
                <Card className="overflow-hidden">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1588416499018-d8c621ee3f39?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3" 
                      alt="Nakki Lake Sunset Tour" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="py-4">
                    <h3 className="font-medium">Nakki Lake Sunset Tour</h3>
                    <p className="text-sm text-muted-foreground mb-2">3 hours • Evening snacks included</p>
                    <p className="text-primary font-semibold">₹1,200 per person</p>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button className="w-full">Book This Tour</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {selectedTab === 'airport' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {transportOptions.map((option) => (
            <Card 
              key={option.type} 
              className={`cursor-pointer transition-all ${selectedTransport?.type === option.type ? 'ring-2 ring-primary' : ''}`}
              onClick={() => setSelectedTransport(option)}
            >
              <div className="h-36 overflow-hidden">
                <img 
                  src={option.image} 
                  alt={option.type} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="py-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">{option.type}</h3>
                    <p className="text-sm text-muted-foreground flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      Up to {option.capacity} passengers
                    </p>
                  </div>
                  <p className="text-primary font-semibold">₹{option.price}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      {selectedTab === 'airport' && (
        <div className="flex justify-end">
          <Button size="lg" onClick={handleBookTransport}>
            <Car className="mr-2 h-4 w-4" />
            Book Transport
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelTransport;
