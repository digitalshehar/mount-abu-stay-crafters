
import React, { useState } from 'react';
import { Car, Bike, Plane, Bus, Calendar, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const transportOptions = [
  { id: 'car', name: 'Car', icon: <Car className="h-5 w-5" />, color: 'text-blue-500' },
  { id: 'bike', name: 'Bike', icon: <Bike className="h-5 w-5" />, color: 'text-green-500' },
  { id: 'flight', name: 'Flight', icon: <Plane className="h-5 w-5" />, color: 'text-purple-500' },
  { id: 'bus', name: 'Bus', icon: <Bus className="h-5 w-5" />, color: 'text-orange-500' }
];

const rentalOptions = [
  { name: "Standard Sedan", price: 2500, category: "car", capacity: 4, image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { name: "Premium SUV", price: 4500, category: "car", capacity: 6, image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { name: "Royal Enfield", price: 1200, category: "bike", capacity: 2, image: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" },
  { name: "Honda Activa", price: 600, category: "bike", capacity: 2, image: "https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" }
];

const HotelTransport: React.FC = () => {
  const [activeTab, setActiveTab] = useState("rental");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("car");

  const handleSubmitBooking = () => {
    if (!selectedDate || !selectedTime || !selectedLocation) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    toast.success("Your transportation request has been submitted", {
      description: `We'll confirm your ${selectedType} reservation shortly.`
    });
  };
  
  const filterByCategory = (category: string) => {
    return rentalOptions.filter(option => option.category === category);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h2 className="text-2xl font-display font-semibold mb-6">Transportation Options</h2>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="rental">Vehicle Rental</TabsTrigger>
            <TabsTrigger value="transfer">Airport Transfer</TabsTrigger>
          </TabsList>
          
          <TabsContent value="rental">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                {transportOptions.slice(0, 2).map(option => (
                  <Button
                    key={option.id}
                    variant={selectedType === option.id ? "default" : "outline"}
                    className="flex items-center gap-2 px-4 py-6"
                    onClick={() => setSelectedType(option.id)}
                  >
                    <span className={option.color}>{option.icon}</span>
                    <span>{option.name} Rental</span>
                  </Button>
                ))}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="pickup-date">Pickup Date</Label>
                  <Input 
                    id="pickup-date" 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pickup-time">Pickup Time</Label>
                  <Input 
                    id="pickup-time" 
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="pickup-location">Pickup Location</Label>
                <Select 
                  value={selectedLocation} 
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger id="pickup-location">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hotel">At the Hotel</SelectItem>
                    <SelectItem value="airport">Airport</SelectItem>
                    <SelectItem value="bus-station">Bus Station</SelectItem>
                    <SelectItem value="custom">Custom Location</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Available {selectedType === 'car' ? 'Cars' : 'Bikes'}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filterByCategory(selectedType).map((option, index) => (
                    <Card key={index}>
                      <div className="aspect-[16/9] overflow-hidden">
                        <img 
                          src={option.image} 
                          alt={option.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{option.name}</h4>
                            <p className="text-sm text-stone-500 flex items-center mt-1">
                              <MapPin className="h-3 w-3 mr-1" /> 
                              Mount Abu Location
                            </p>
                          </div>
                          <Badge variant="outline" className="ml-2">
                            {option.capacity} Seats
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <span className="font-bold">₹{option.price}/day</span>
                          <Button 
                            size="sm" 
                            onClick={() => {
                              toast.success(`${option.name} selected`, {
                                description: "Please complete the booking form"
                              });
                            }}
                          >
                            Select
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Button className="w-full" onClick={handleSubmitBooking}>Book Rental</Button>
            </div>
          </TabsContent>
          
          <TabsContent value="transfer">
            <div className="space-y-6">
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-amber-800">Pre-Booking Required</h3>
                    <p className="text-sm text-amber-700">
                      Airport transfers must be booked at least 24 hours in advance to ensure availability.
                    </p>
                  </div>
                </div>
              </div>
            
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <Label htmlFor="arrival-date">Arrival Date</Label>
                  <Input 
                    id="arrival-date" 
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="arrival-time">Arrival Time</Label>
                  <Input 
                    id="arrival-time" 
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label>Transfer Type</Label>
                <RadioGroup defaultValue="one-way" className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="one-way" id="one-way" />
                    <Label htmlFor="one-way" className="cursor-pointer">One-way (Airport to Hotel)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="round-trip" id="round-trip" />
                    <Label htmlFor="round-trip" className="cursor-pointer">Round-trip</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div className="space-y-1.5">
                <Label htmlFor="pickup-point">Airport/Station</Label>
                <Select 
                  value={selectedLocation} 
                  onValueChange={setSelectedLocation}
                >
                  <SelectTrigger id="pickup-point">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="udaipur">Udaipur Airport (UDR)</SelectItem>
                    <SelectItem value="ahmedabad">Ahmedabad Airport (AMD)</SelectItem>
                    <SelectItem value="mount-abu">Mount Abu Bus Station</SelectItem>
                    <SelectItem value="abu-road">Abu Road Railway Station</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Transfer Options</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Standard Sedan</h4>
                        <div className="flex items-center text-sm text-stone-500 mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>Up to 3 passengers</span>
                        </div>
                      </div>
                      <Badge variant="secondary">Economy</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-semibold">₹2,000</div>
                      <Button size="sm" variant="outline">Select</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">Premium SUV</h4>
                        <div className="flex items-center text-sm text-stone-500 mt-1">
                          <Users className="h-3 w-3 mr-1" />
                          <span>Up to 6 passengers</span>
                        </div>
                      </div>
                      <Badge variant="secondary">Premium</Badge>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="font-semibold">₹3,500</div>
                      <Button size="sm" variant="outline">Select</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button className="w-full" onClick={handleSubmitBooking}>Book Transfer</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Transportation FAQ</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h3 className="font-medium">What is the cancellation policy?</h3>
            <p className="text-sm text-stone-600">Free cancellation up to 24 hours before scheduled pickup. After that, a 50% cancellation fee applies.</p>
          </div>
          <div>
            <h3 className="font-medium">Are child seats available?</h3>
            <p className="text-sm text-stone-600">Yes, child seats can be requested during booking for an additional charge of ₹500 per seat.</p>
          </div>
          <div>
            <h3 className="font-medium">How far is Udaipur Airport from Mount Abu?</h3>
            <p className="text-sm text-stone-600">Udaipur Airport is approximately 185 km (3.5 hours drive) from Mount Abu.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HotelTransport;
