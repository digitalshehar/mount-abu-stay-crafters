
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CarouselSection = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  
  const slides = [
    {
      id: 1,
      title: "Experience Mount Abu",
      description: "Discover the beauty of Rajasthan's only hill station",
      image: "https://images.unsplash.com/photo-1591018103899-ffa3e2096546?auto=format&fit=crop&q=80&w=1200",
      cta: "Explore Now"
    },
    {
      id: 2,
      title: "Special Summer Offers",
      description: "Get up to 30% off on hotel bookings for the summer season",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
      cta: "View Offers"
    },
    {
      id: 3,
      title: "Adventure Awaits",
      description: "Book exciting activities and adventures in Mount Abu",
      image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1200",
      cta: "Book Adventures"
    }
  ];
  
  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };
  
  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="container">
        <div className="relative overflow-hidden rounded-2xl shadow-xl h-[300px] md:h-[400px] lg:h-[500px]">
          {slides.map((slide, index) => (
            <div 
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 z-10" />
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 z-20 flex flex-col justify-center p-8 md:p-12 lg:p-16">
                <div className="max-w-md">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                    {slide.title}
                  </h2>
                  <p className="text-white/90 text-sm md:text-base mb-6">
                    {slide.description}
                  </p>
                  <Button>
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          <div className="absolute bottom-4 right-4 z-30 flex space-x-2">
            <Button 
              size="icon" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
              onClick={prevSlide}
            >
              <ArrowLeft className="h-5 w-5 text-white" />
            </Button>
            <Button 
              size="icon" 
              variant="outline" 
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 border-white/30"
              onClick={nextSlide}
            >
              <ArrowRight className="h-5 w-5 text-white" />
            </Button>
          </div>
          
          <div className="absolute bottom-4 left-4 z-30 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? 'bg-white' : 'bg-white/30'
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarouselSection;
