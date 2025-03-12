
import React, { useState } from 'react';
import { Car, Bus, Train, Plane, MapPin, Calendar, Clock, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export interface TransportOptionsProps {
  hotel: any;
}

const TransportOptions: React.FC<TransportOptionsProps> = ({ hotel }) => {
  const [transportTab, setTransportTab] = useState('taxi');
  const [date, setDate] = useState<Date>();
  
  const handleBookTransport = (type: string) => {
    if (!date) {
      toast.error('Please select a date first');
      return;
    }
    
    toast.success(`${type} booked successfully!`, {
      description: `Your ${type.toLowerCase()} to ${hotel.name} on ${format(date, 'PPP')} has been booked.`,
    });
  };
  
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Transportation Options</h2>
      
      <Tabs defaultValue="taxi" onValueChange={setTransportTab} value={transportTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="taxi" className="flex items-center gap-2">
            <Car className="h-4 w-4" />
            <span>Taxi</span>
          </TabsTrigger>
          <TabsTrigger value="bus" className="flex items-center gap-2">
            <Bus className="h-4 w-4" />
            <span>Bus</span>
          </TabsTrigger>
          <TabsTrigger value="train" className="flex items-center gap-2">
            <Train className="h-4 w-4" />
            <span>Train</span>
          </TabsTrigger>
          <TabsTrigger value="airplane" className="flex items-center gap-2">
            <Plane className="h-4 w-4" />
            <span>Flights</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="mt-6">
          <TabsContent value="taxi">
            <TransportTabContent
              title="Taxi Service"
              description="Book a comfortable taxi to and from the hotel"
              options={[
                { name: "Standard Sedan", price: 1200, details: "AC, 4 seats, 2 luggage" },
                { name: "Premium SUV", price: 1800, details: "AC, 6 seats, 4 luggage" },
                { name: "Luxury Car", price: 3500, details: "AC, 4 seats, premium service" }
              ]}
              icon={<Car className="h-5 w-5" />}
              date={date}
              setDate={setDate}
              onBook={() => handleBookTransport('Taxi')}
              location={hotel.location}
            />
          </TabsContent>
          
          <TabsContent value="bus">
            <TransportTabContent
              title="Bus Service"
              description="Book a bus ticket to and from Mount Abu"
              options={[
                { name: "Regular Bus", price: 250, details: "Non-AC, Standard" },
                { name: "Deluxe Bus", price: 500, details: "AC, Comfortable Seating" },
                { name: "Sleeper Bus", price: 800, details: "AC, Sleeper Berths" }
              ]}
              icon={<Bus className="h-5 w-5" />}
              date={date}
              setDate={setDate}
              onBook={() => handleBookTransport('Bus')}
              location={hotel.location}
            />
          </TabsContent>
          
          <TabsContent value="train">
            <TransportTabContent
              title="Train Service"
              description="Book a train ticket to Mount Abu Road Station"
              options={[
                { name: "Sleeper Class", price: 350, details: "Basic accommodation" },
                { name: "AC 3 Tier", price: 850, details: "AC, Comfortable berths" },
                { name: "AC 2 Tier", price: 1200, details: "AC, More spacious" }
              ]}
              icon={<Train className="h-5 w-5" />}
              date={date}
              setDate={setDate}
              onBook={() => handleBookTransport('Train')}
              location="Mount Abu Road Station (29km from hotel)"
            />
          </TabsContent>
          
          <TabsContent value="airplane">
            <TransportTabContent
              title="Flight Service"
              description="Book a flight to Udaipur Airport (nearest to Mount Abu)"
              options={[
                { name: "Economy Class", price: 5500, details: "Standard service" },
                { name: "Premium Economy", price: 7500, details: "Extra legroom, Priority boarding" },
                { name: "Business Class", price: 12500, details: "Premium service, Lounge access" }
              ]}
              icon={<Plane className="h-5 w-5" />}
              date={date}
              setDate={setDate}
              onBook={() => handleBookTransport('Flight')}
              location="Udaipur Airport (100km from hotel)"
            />
          </TabsContent>
        </div>
      </Tabs>
      
      <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <div className="flex gap-3">
          <Info className="h-6 w-6 text-blue-500 flex-shrink-0" />
          <div>
            <h3 className="text-blue-700 font-medium">Transport Assistance</h3>
            <p className="text-sm text-blue-600 mt-1">
              Need help arranging your transportation? Contact our concierge desk and we'll assist you with all your travel needs.
            </p>
            <p className="text-sm font-medium text-blue-700 mt-2">
              Concierge: +91 2974 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface TransportOption {
  name: string;
  price: number;
  details: string;
}

interface TransportTabContentProps {
  title: string;
  description: string;
  options: TransportOption[];
  icon: React.ReactNode;
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  onBook: () => void;
  location: string;
}

const TransportTabContent: React.FC<TransportTabContentProps> = ({
  title,
  description,
  options,
  icon,
  date,
  setDate,
  onBook,
  location
}) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-primary/10 text-primary p-3 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-stone-500">{description}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <div className="flex items-start gap-2 mb-4">
            <MapPin className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <span className="text-sm font-medium">Destination</span>
              <p className="text-sm text-stone-600">{location}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <span className="text-sm font-medium">Travel Date</span>
              <div className="mt-1">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      {date ? format(date, 'PPP') : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center p-4 bg-stone-50 rounded-lg border border-stone-100">
          <div className="text-center">
            <Clock className="h-6 w-6 text-primary mx-auto mb-2" />
            <p className="text-stone-600 text-sm">Estimated travel time:</p>
            <p className="font-medium">
              {title.includes('Taxi') ? '2 hours' : 
               title.includes('Bus') ? '2.5 hours' : 
               title.includes('Train') ? '3 hours' : '1 hour flight + 2 hours drive'}
            </p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h4 className="font-medium">Available Options</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {options.map((option, index) => (
            <Card key={index}>
              <CardHeader className="pb-2">
                <CardTitle>{option.name}</CardTitle>
                <CardDescription>{option.details}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold text-primary">₹{option.price}</p>
                <p className="text-xs text-stone-500">per journey</p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={onBook} 
                  className="w-full"
                  disabled={!date}
                >
                  Book Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransportOptions;
