
import React, { useState } from "react";
import { Car, Bike, Bus, Plane } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TransportOptionsProps {
  hotelLocation: string;
}

const TransportOptions = ({ hotelLocation }: TransportOptionsProps) => {
  const [activeTab, setActiveTab] = useState("taxi");
  
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Transportation Options</h2>
      
      <Tabs defaultValue="taxi" className="w-full" onValueChange={setActiveTab} value={activeTab}>
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="taxi" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Car className="h-4 w-4 mr-2" />
            Taxi
          </TabsTrigger>
          <TabsTrigger value="rental" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Car className="h-4 w-4 mr-2" />
            Rentals
          </TabsTrigger>
          <TabsTrigger value="bike" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bike className="h-4 w-4 mr-2" />
            Bikes
          </TabsTrigger>
          <TabsTrigger value="shuttle" className="data-[state=active]:bg-primary data-[state=active]:text-white">
            <Bus className="h-4 w-4 mr-2" />
            Shuttle
          </TabsTrigger>
        </TabsList>
        
        <div className="bg-white rounded-lg border border-stone-200 p-6">
          <TabsContent value="taxi" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pickup">Pickup Location</Label>
                <Input 
                  id="pickup" 
                  placeholder="Airport, train station, etc." 
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="dropoff">Dropoff Location</Label>
                <Input 
                  id="dropoff" 
                  value={hotelLocation} 
                  className="mt-1"
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input 
                  id="date" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="time">Time</Label>
                <Input 
                  id="time" 
                  type="time"
                  className="mt-1"
                />
              </div>
            </div>
            
            <div>
              <Label className="block mb-3">Vehicle Type</Label>
              <RadioGroup defaultValue="sedan" className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2 bg-stone-50 p-3 rounded-md border border-stone-200">
                  <RadioGroupItem value="sedan" id="sedan" />
                  <Label htmlFor="sedan" className="font-normal">Sedan (4 seats)</Label>
                </div>
                <div className="flex items-center space-x-2 bg-stone-50 p-3 rounded-md border border-stone-200">
                  <RadioGroupItem value="suv" id="suv" />
                  <Label htmlFor="suv" className="font-normal">SUV (6 seats)</Label>
                </div>
                <div className="flex items-center space-x-2 bg-stone-50 p-3 rounded-md border border-stone-200">
                  <RadioGroupItem value="van" id="van" />
                  <Label htmlFor="van" className="font-normal">Van (10 seats)</Label>
                </div>
              </RadioGroup>
            </div>
            
            <Button className="w-full">Book Taxi Service</Button>
            
            <p className="text-sm text-stone-500 text-center">
              Taxi services are provided by our trusted partners and can be paid directly to the driver.
            </p>
          </TabsContent>
          
          <TabsContent value="rental" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="pickup-date">Pickup Date</Label>
                <Input 
                  id="pickup-date" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="return-date">Return Date</Label>
                <Input 
                  id="return-date" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="car-type">Car Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select car type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="compact">Compact</SelectItem>
                    <SelectItem value="midsize">Midsize</SelectItem>
                    <SelectItem value="suv">SUV</SelectItem>
                    <SelectItem value="luxury">Luxury</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="driver">Driver</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select option" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self">Self Drive</SelectItem>
                    <SelectItem value="with-driver">With Driver</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full">Browse Available Cars</Button>
          </TabsContent>
          
          <TabsContent value="bike" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="bike-pickup">Pickup Date</Label>
                <Input 
                  id="bike-pickup" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bike-return">Return Date</Label>
                <Input 
                  id="bike-return" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="bike-type">Bike Type</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select bike type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="scooter">Scooter</SelectItem>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="cruiser">Cruiser</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="adventure">Adventure</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="helmet">Helmet(s)</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1 Helmet</SelectItem>
                    <SelectItem value="2">2 Helmets</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 bg-amber-50 rounded-md border border-amber-100 text-sm text-amber-800">
              <p>
                <span className="font-medium">Safety Note:</span> Helmets are mandatory by law. Valid driving license required.
              </p>
            </div>
            
            <Button className="w-full">Browse Available Bikes</Button>
          </TabsContent>
          
          <TabsContent value="shuttle" className="mt-0 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="shuttle-from">From</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select pickup location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="airport">Udaipur Airport (100 km)</SelectItem>
                    <SelectItem value="bus-station">Mount Abu Bus Station (1.5 km)</SelectItem>
                    <SelectItem value="train-station">Abu Road Railway Station (28 km)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="shuttle-date">Date</Label>
                <Input 
                  id="shuttle-date" 
                  type="date"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="shuttle-time">Preferred Time</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select time" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="morning">Morning (8:00 AM - 12:00 PM)</SelectItem>
                    <SelectItem value="afternoon">Afternoon (12:00 PM - 4:00 PM)</SelectItem>
                    <SelectItem value="evening">Evening (4:00 PM - 8:00 PM)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="passengers">Passengers</Label>
                <Select>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-md border border-blue-100 space-y-2">
              <p className="text-sm text-blue-800 font-medium">Shuttle Schedule Information:</p>
              <ul className="text-sm text-blue-700 space-y-1 list-disc pl-5">
                <li>Airport Shuttle: 2 times daily (10:00 AM, 4:00 PM)</li>
                <li>Bus Station Shuttle: Every 2 hours from 8:00 AM to 8:00 PM</li>
                <li>Railway Station Shuttle: 3 times daily (9:00 AM, 2:00 PM, 7:00 PM)</li>
              </ul>
            </div>
            
            <Button className="w-full">Book Shuttle Service</Button>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default TransportOptions;
