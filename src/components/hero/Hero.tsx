
import React, { useEffect, useState } from "react";
import SearchContainer from "./SearchContainer";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative min-h-[100vh] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent mix-blend-overlay z-10" />
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
          alt="Mount Abu landscape"
          className="w-full h-full object-cover object-center transform scale-[1.02] transition-transform duration-[15000ms] hover:scale-[1.05]"
        />
        
        {/* Animated Overlay Shapes */}
        <div className="absolute inset-0 z-5 opacity-30">
          <div className="absolute top-[20%] left-[15%] h-32 w-32 rounded-full bg-primary/30 animate-pulse" style={{ animationDuration: '4s' }} />
          <div className="absolute bottom-[30%] right-[20%] h-24 w-24 rounded-full bg-stone-400/20 animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute bottom-[10%] left-[30%] h-40 w-40 rounded-full bg-primary/20 animate-pulse" style={{ animationDuration: '8s' }} />
        </div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 pt-16 sm:pt-20 md:pt-32 pb-10 md:pb-20">
        <div className={`max-w-3xl mx-auto text-center mb-6 md:mb-10 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-3 sm:mb-4 md:mb-6 animate-fade-in-down"
            style={{ textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
          >
            <span className="relative inline-block after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-1 after:-bottom-1 after:left-0 after:bg-primary after:origin-bottom-right after:transition-transform after:duration-500 hover:after:scale-x-100 hover:after:origin-bottom-left">
              Discover
            </span>{" "}
            the Serenity of Mount Abu
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 animate-fade-in-down animation-delay-200"
            style={{ textShadow: "0 1px 5px rgba(0,0,0,0.2)" }}
          >
            Find the perfect accommodations, adventures, and experiences for your dream getaway
          </p>
        </div>

        {/* Search Form with Animation */}
        <div className={`transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <SearchContainer />
        </div>
        
        {/* Hero Stats with Animation */}
        <div className={`flex justify-center gap-6 md:gap-12 mt-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center">
            <div className="text-white font-bold text-2xl md:text-3xl">100+</div>
            <div className="text-white/80 text-xs md:text-sm">Hotels</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-2xl md:text-3xl">50+</div>
            <div className="text-white/80 text-xs md:text-sm">Activities</div>
          </div>
          <div className="text-center">
            <div className="text-white font-bold text-2xl md:text-3xl">1000+</div>
            <div className="text-white/80 text-xs md:text-sm">Happy Guests</div>
          </div>
        </div>
      </div>
      
      {/* Bottom Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0 z-10 w-full">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path 
            fill="white" 
            fillOpacity="1" 
            d="M0,96L60,80C120,64,240,32,360,32C480,32,600,64,720,80C840,96,960,96,1080,88C1200,80,1320,64,1380,56L1440,48L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
