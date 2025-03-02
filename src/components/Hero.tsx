
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Users, Search } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [activeTab, setActiveTab] = useState("hotels");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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
      <div className="container-custom relative z-20 pt-32 pb-20">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6"
          >
            Discover the Serenity of Mount Abu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 mb-12"
          >
            Find the perfect accommodations, adventures, and experiences for your dream getaway
          </motion.p>
        </div>

        {/* Search Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-5xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg"
        >
          <div className="flex border-b space-x-4 mb-6">
            {[
              { id: "hotels", label: "Hotels" },
              { id: "cars", label: "Car Rentals" },
              { id: "bikes", label: "Bike Rentals" },
              { id: "activities", label: "Activities" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 px-4 font-medium transition-colors ${
                  activeTab === tab.id
                    ? "text-primary border-b-2 border-primary"
                    : "text-stone-500 hover:text-stone-700"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {activeTab === "hotels" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Check-in — Check-out"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Users className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <select
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Guests & Rooms</option>
                  <option value="1-1">1 Guest, 1 Room</option>
                  <option value="2-1">2 Guests, 1 Room</option>
                  <option value="2-2">2 Guests, 2 Rooms</option>
                  <option value="3-1">3 Guests, 1 Room</option>
                  <option value="4-1">4 Guests, 1 Room</option>
                  <option value="4-2">4 Guests, 2 Rooms</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "cars" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Pickup — Dropoff date"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Car Type</option>
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "bikes" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Pickup location"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Pickup — Dropoff date"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Bike Type</option>
                  <option value="scooter">Scooter</option>
                  <option value="standard">Standard</option>
                  <option value="cruiser">Cruiser</option>
                  <option value="sports">Sports</option>
                </select>
              </div>
            </div>
          )}

          {activeTab === "activities" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="relative">
                <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Calendar className="absolute left-4 top-3.5 h-5 w-5 text-stone-400" />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <div className="relative">
                <select
                  className="w-full pl-4 pr-4 py-3 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Activity Type</option>
                  <option value="trekking">Trekking</option>
                  <option value="sightseeing">Sightseeing</option>
                  <option value="camping">Camping</option>
                  <option value="yoga">Yoga Retreat</option>
                </select>
              </div>
            </div>
          )}

          <div className="flex justify-center">
            <Link
              to={`/${activeTab}`}
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all flex items-center"
            >
              <Search className="h-4 w-4 mr-2" />
              {activeTab === "hotels" && "Search Hotels"}
              {activeTab === "cars" && "Search Cars"}
              {activeTab === "bikes" && "Search Bikes"}
              {activeTab === "activities" && "Search Activities"}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
