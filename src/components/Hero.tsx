
import SearchContainer from "./hero/SearchContainer";

const Hero = () => {
  return (
    <section className="relative min-h-[60vh] sm:min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
          alt="Mount Abu landscape"
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content */}
      <div className="container-custom relative z-20 pt-16 sm:pt-20 md:pt-32 pb-10 md:pb-20">
        <div className="max-w-3xl mx-auto text-center mb-6 md:mb-10">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-bold text-white mb-3 sm:mb-4 md:mb-6 animate-fade-in-down"
          >
            Discover the Serenity of Mount Abu
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 animate-fade-in-down animation-delay-200"
          >
            Find the perfect accommodations, adventures, and experiences for your dream getaway
          </p>
        </div>

        {/* Search Form */}
        <SearchContainer />
      </div>
    </section>
  );
};

export default Hero;
