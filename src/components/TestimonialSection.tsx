
import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Family Traveler",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    rating: 5,
    text: "Our stay at the Hilltop Resort was absolutely magical. The views of Mount Abu were breathtaking, and the staff went above and beyond to make our family vacation perfect. Will definitely book through HotelInMountAbu again!"
  },
  {
    id: 2,
    name: "Rajiv Patel",
    role: "Business Traveler",
    avatar: "https://randomuser.me/api/portraits/men/2.jpg",
    rating: 5,
    text: "As a frequent business traveler, I appreciate efficiency and reliability. This platform delivered both. The car rental service was prompt, and the hotel had excellent WiFi and workspace areas. Highly recommended for business trips to Mount Abu."
  },
  {
    id: 3,
    name: "Ananya Singh",
    role: "Solo Adventurer",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    rating: 4,
    text: "I booked a trekking adventure and bike rental through the site, and it was the highlight of my solo trip! The guides were knowledgeable, and the bike was in perfect condition. The booking process was smooth and hassle-free."
  },
  {
    id: 4,
    name: "Vikram Mehta",
    role: "Honeymoon Traveler",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    text: "My wife and I chose Mount Abu for our honeymoon, and this website made it exceptional. From the luxury hotel to the private sunset tour, everything was romantic and perfect. The customer service was outstanding when we needed to adjust our plans."
  }
];

const TestimonialSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const nextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="title-medium mb-6">What Our Guests Say</h2>
          <p className="subtitle">
            Don't just take our word for it. See what travelers like you have to say about
            their experiences with HotelInMountAbu.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div 
              className={`transition-all duration-500 ease-out ${
                isAnimating ? "opacity-0" : "opacity-100"
              }`}
            >
              <div className="bg-stone-50 rounded-2xl p-8 md:p-12 shadow-sm">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3 flex flex-col items-center text-center">
                    <img 
                      src={testimonials[currentIndex].avatar} 
                      alt={testimonials[currentIndex].name}
                      className="w-24 h-24 rounded-full mb-4 object-cover"
                    />
                    <h4 className="font-display font-semibold">{testimonials[currentIndex].name}</h4>
                    <p className="text-sm text-stone-500 mb-3">{testimonials[currentIndex].role}</p>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${
                            i < testimonials[currentIndex].rating ? "text-yellow-500" : "text-stone-300"
                          }`} 
                          fill={i < testimonials[currentIndex].rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="md:w-2/3">
                    <blockquote className="text-lg md:text-xl italic">
                      "{testimonials[currentIndex].text}"
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-10 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating) return;
                  setIsAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentIndex === index ? "bg-primary w-6" : "bg-stone-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-primary" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-10 w-12 h-12 rounded-full bg-white shadow-md flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-primary" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
