
import React, { useState } from 'react';
import { Car, Calendar, Clock, MapPin, Users, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface TransportOption {
  id: string;
  type: string;
  name: string;
  price: number;
  capacity: number;
  image: string;
}

const HotelTransport: React.FC = () => {
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('2');

  // Sample transport options
  const transportOptions: TransportOption[] = [
    {
      id: 'sedan',
      type: 'Sedan',
      name: 'Toyota Camry',
      price: 1500,
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
    },
    {
      id: 'suv',
      type: 'SUV',
      name: 'Toyota Fortuner',
      price: 2500,
      capacity: 6,
      image: 'https://images.unsplash.com/photo-1581354480823-5f8f9639623d?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
    },
    {
      id: 'luxury',
      type: 'Luxury',
      name: 'Mercedes E-Class',
      price: 3500,
      capacity: 4,
      image: 'https://images.unsplash.com/photo-1583267746897-2cf415887172?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3'
    }
  ];

  const handleBookTransport = () => {
    if (!selectedVehicle || !pickupDate || !pickupTime) {
      alert('Please select a vehicle and provide pickup details');
      return;
    }
    
    // Implement booking logic
    alert(`Transport booked: ${selectedVehicle} for ${pickupDate} at ${pickupTime}`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Car className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Airport & Station Transfers</h3>
            <p className="text-sm text-gray-500">Book a vehicle for pickup/drop to airport or railway station</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-4">Select Vehicle Type:</h4>
              <RadioGroup value={selectedVehicle || ''} onValueChange={setSelectedVehicle}>
                <div className="space-y-4">
                  {transportOptions.map((option) => (
                    <div 
                      key={option.id}
                      className={`flex border rounded-lg p-4 cursor-pointer transition-all hover:border-primary ${
                        selectedVehicle === option.id ? 'border-primary bg-primary/5' : 'border-gray-200'
                      }`}
                      onClick={() => setSelectedVehicle(option.id)}
                    >
                      <RadioGroupItem 
                        value={option.id} 
                        id={option.id} 
                        className="mt-1"
                      />
                      <div className="ml-3 flex-1 grid grid-cols-1 sm:grid-cols-5 gap-4">
                        <div className="sm:col-span-1">
                          <div className="aspect-square w-full rounded-md overflow-hidden">
                            <img 
                              src={option.image} 
                              alt={option.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <Label 
                            htmlFor={option.id} 
                            className="text-base font-medium cursor-pointer"
                          >
                            {option.name}
                          </Label>
                          <p className="text-sm text-gray-500">{option.type}</p>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <Users className="h-4 w-4 mr-1" />
                            <span>Up to {option.capacity} passengers</span>
                          </div>
                        </div>
                        <div className="sm:col-span-1 text-right">
                          <div className="text-lg font-bold text-primary">₹{option.price}</div>
                          <div className="text-xs text-gray-500">one way</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Booking Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="pickup-date" 
                        type="date" 
                        className="pl-10" 
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="pickup-time">Pickup Time</Label>
                  <div className="flex">
                    <div className="relative flex-1">
                      <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                      <Input 
                        id="pickup-time" 
                        type="time" 
                        className="pl-10" 
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pickup-type">Trip Type</Label>
                  <Select defaultValue="oneway">
                    <SelectTrigger>
                      <SelectValue placeholder="Select trip type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="oneway">One Way</SelectItem>
                      <SelectItem value="roundtrip">Round Trip</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="passengers">Number of Passengers</Label>
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator className="my-2" />
                
                <div className="pt-2">
                  <Button 
                    onClick={handleBookTransport} 
                    className="w-full"
                    disabled={!selectedVehicle || !pickupDate || !pickupTime}
                  >
                    <CreditCard className="h-4 w-4 mr-2" />
                    Book Transport
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelTransport;
