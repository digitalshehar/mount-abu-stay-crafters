
import React from "react";
import { Shield, ThumbsUp, Clock, PhoneCall } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-12 w-12 text-primary mb-4" />,
    title: "Best Price Guarantee",
    description: "Find a lower price? We'll match it and give you an additional 10% off."
  },
  {
    icon: <ThumbsUp className="h-12 w-12 text-primary mb-4" />,
    title: "Quality Selection",
    description: "We personally verify all our listings to ensure the highest standards."
  },
  {
    icon: <Clock className="h-12 w-12 text-primary mb-4" />,
    title: "Instant Booking",
    description: "Book your stay instantly, with immediate confirmation and no hidden fees."
  },
  {
    icon: <PhoneCall className="h-12 w-12 text-primary mb-4" />,
    title: "24/7 Support",
    description: "Our customer service team is available around the clock to assist you."
  }
];

const FeatureSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-stone-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 relative inline-block">
            Why Choose Us
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-primary rounded-full"></span>
          </h2>
          <p className="text-muted-foreground text-lg">
            We strive to provide the best experience for your Mount Abu adventure.
            Here's what sets us apart from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all duration-300 text-center border border-transparent hover:border-primary/10 hover:-translate-y-1"
            >
              <div className="flex justify-center mb-2 transform transition-transform duration-300 group-hover:scale-110">
                <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
              <p className="text-muted-foreground group-hover:text-stone-700 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
