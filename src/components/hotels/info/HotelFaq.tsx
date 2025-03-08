
import React from "react";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem = ({ question, answer }: FaqItemProps) => (
  <div>
    <h3 className="font-medium text-lg mb-2">{question}</h3>
    <p className="text-stone-600">{answer}</p>
  </div>
);

const HotelFaq = () => {
  return (
    <div className="mt-8 bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions About Mount Abu Hotels</h2>
      
      <div className="space-y-6">
        <FaqItem 
          question="What is the average price of hotels in Mount Abu?"
          answer="Hotel prices in Mount Abu vary by season. Budget accommodations start from ₹1,000 per night, mid-range hotels range from ₹2,500 to ₹5,000, while luxury resorts can cost ₹7,000 and above per night."
        />
        
        <FaqItem 
          question="Which hotels in Mount Abu offer the best views?"
          answer="Hotels around Nakki Lake and those located at higher elevations typically offer the best views of the surrounding landscapes. Many luxury hotels feature rooms with private balconies overlooking the Aravalli hills or the lake."
        />
        
        <FaqItem 
          question="Is it necessary to book hotels in advance?"
          answer="It's highly recommended to book in advance, especially during peak tourist seasons (October to March and during holidays). Last-minute bookings may result in higher prices or limited availability."
        />
        
        <FaqItem 
          question="Do Mount Abu hotels provide transportation to local attractions?"
          answer="Many hotels offer transportation services to popular attractions, either included in the package or for an additional fee. Some luxury hotels provide complimentary shuttle services to nearby points of interest."
        />
        
        <FaqItem 
          question="Are there any eco-friendly or sustainable hotels in Mount Abu?"
          answer="Yes, several hotels in Mount Abu have adopted eco-friendly practices, such as solar power, water conservation, and waste management. Look for properties that mention sustainability initiatives in their descriptions."
        />
      </div>
    </div>
  );
};

export default HotelFaq;
