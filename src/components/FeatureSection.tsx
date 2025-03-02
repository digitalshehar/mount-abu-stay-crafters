
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
    <section className="py-20 bg-stone-50">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="title-medium mb-6">Why Choose Us</h2>
          <p className="subtitle">
            We strive to provide the best experience for your Mount Abu adventure.
            Here's what sets us apart from the rest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-8 shadow-sm hover:shadow-md transition-all text-center"
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
