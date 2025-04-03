
import React from "react";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "https://i.pravatar.cc/150?img=32",
      location: "Delhi",
      text: "Our stay at Mount Abu was magical. The hotel accommodations were perfect, and the activities recommended were unforgettable. Will definitely come back!",
      rating: 5
    },
    {
      id: 2,
      name: "Rahul Verma",
      avatar: "https://i.pravatar.cc/150?img=11",
      location: "Mumbai",
      text: "The bike rental service was excellent! It made exploring Mount Abu so convenient. The bikes were well-maintained and the staff was helpful.",
      rating: 4
    },
    {
      id: 3,
      name: "Anjali Patel",
      avatar: "https://i.pravatar.cc/150?img=26",
      location: "Ahmedabad",
      text: "Booked a trekking adventure through this platform and it was well organized. Our guide was knowledgeable and the views were spectacular!",
      rating: 5
    }
  ];
  
  return (
    <section className="py-10 md:py-16">
      <div className="container">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold">What Our Guests Say</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Real experiences from travelers who have explored Mount Abu with our services
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white border border-stone-200 rounded-xl p-6 transition-all hover:shadow-md"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img 
                  src={testimonial.avatar} 
                  alt={testimonial.name} 
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
              
              <div className="mb-4 flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${
                      i < testimonial.rating ? 'text-amber-500 fill-amber-500' : 'text-stone-300'
                    }`} 
                  />
                ))}
              </div>
              
              <div className="relative">
                <Quote className="absolute top-0 left-0 h-6 w-6 text-stone-200 -translate-x-2 -translate-y-2 opacity-50" />
                <p className="text-sm relative z-10 pl-3">{testimonial.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
