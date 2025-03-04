
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from "lucide-react";

const FAQs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Define FAQ categories and questions
  const faqCategories = [
    {
      id: "booking",
      name: "Booking & Reservations",
      faqs: [
        {
          question: "How can I make a hotel reservation?",
          answer: "You can make a hotel reservation through our website by using the search form on our homepage or hotel listing page. Select your desired dates, number of guests, and click 'Search'. Once you find a hotel you like, click 'Book Now' and follow the steps to complete your reservation. Alternatively, you can contact our customer service team who will assist you with the booking process."
        },
        {
          question: "Is immediate confirmation available for hotel bookings?",
          answer: "Yes, most hotel bookings on our platform receive immediate confirmation. As soon as you complete the booking process and receive a confirmation email, your reservation is confirmed. In rare cases where immediate confirmation is not available, we will contact you within 24 hours to confirm your booking or suggest alternatives."
        },
        {
          question: "Can I book for someone else?",
          answer: "Yes, you can make a booking on behalf of someone else. During the booking process, you'll have the option to provide the guest details separately from the booking contact. Please ensure that the guest's name matches their identification document, as hotels will verify this at check-in."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), net banking, UPI, and digital wallets like PayTM and GooglePay. International customers can pay using international credit cards or PayPal."
        },
        {
          question: "Is it safe to use my credit card on your website?",
          answer: "Yes, our website uses industry-standard SSL encryption to protect your personal and payment information. We comply with all payment card industry (PCI) security standards to ensure your transaction is secure."
        }
      ]
    },
    {
      id: "cancellation",
      name: "Cancellation & Refunds",
      faqs: [
        {
          question: "What is your cancellation policy?",
          answer: "Cancellation policies vary depending on the hotel and the rate type you book. The specific cancellation policy will be clearly displayed before you complete your booking. Generally, most hotels offer free cancellation up to 24-48 hours before the check-in date. Some special rates or promotional offers may have more restrictive cancellation policies."
        },
        {
          question: "How do I cancel my reservation?",
          answer: "You can cancel your reservation by logging into your account, going to 'My Bookings', selecting the booking you wish to cancel, and clicking the 'Cancel Reservation' button. Alternatively, you can contact our customer support team with your booking reference, and they will assist you with the cancellation process."
        },
        {
          question: "How long does it take to process refunds?",
          answer: "Once a cancellation is processed, refunds typically take 5-10 business days to appear in your account, depending on your payment method and bank processing times. Credit card refunds usually take 5-7 business days, while bank transfers may take 7-10 business days."
        },
        {
          question: "Are there any cancellation fees?",
          answer: "Cancellation fees depend on the specific cancellation policy of your booking and how close to the check-in date you are cancelling. Bookings with free cancellation period will not incur any fees if cancelled within the specified timeframe. For non-refundable bookings or cancellations made after the free cancellation period, you may be charged a percentage of the total booking amount or the full amount."
        },
        {
          question: "Can I modify my reservation instead of cancelling it?",
          answer: "Yes, in many cases you can modify your reservation dates, guest information, or room type without cancelling the entire booking. Log into your account, go to 'My Bookings', select the reservation you wish to modify, and click on 'Modify Booking'. Please note that changes are subject to availability and may affect the price of your booking."
        }
      ]
    },
    {
      id: "rentals",
      name: "Car & Bike Rentals",
      faqs: [
        {
          question: "What documents do I need to rent a car or bike in Mount Abu?",
          answer: "To rent a vehicle in Mount Abu, you need a valid driving license, a government-issued photo ID (such as Aadhar Card, Passport, or Voter ID), and a security deposit. International visitors need an International Driving Permit along with their original driving license and passport."
        },
        {
          question: "Is there a minimum age requirement for renting vehicles?",
          answer: "Yes, the minimum age to rent a car is 21 years, and for bikes, it's 18 years. Some premium car categories may have a higher minimum age requirement of 25 years. The renter must have held a valid driving license for at least one year."
        },
        {
          question: "Do you offer one-way rentals?",
          answer: "Yes, we offer one-way rentals for cars between major cities near Mount Abu, such as Udaipur, Ahmedabad, and Jodhpur. One-way rentals may incur an additional drop-off fee. For bikes, one-way rentals are typically not available, and they must be returned to the original pick-up location."
        },
        {
          question: "What is included in the rental price?",
          answer: "Our standard car rental prices include third-party insurance, unlimited kilometers (for most categories), GST, and basic roadside assistance. For bikes, the rental price includes third-party insurance, helmets for rider and pillion, and GST. Fuel costs, toll charges, and parking fees are not included in the rental price."
        },
        {
          question: "How do I pick up and return the rental vehicle?",
          answer: "You can pick up your rental vehicle from our designated rental offices in Mount Abu or choose our delivery service, where we drop the vehicle at your hotel or preferred location (additional charges may apply). For returns, you can either return the vehicle to our rental office or use our pick-up service. All rentals have specific pick-up and return times that will be confirmed at the time of booking."
        }
      ]
    },
    {
      id: "adventures",
      name: "Activities & Adventures",
      faqs: [
        {
          question: "What adventure activities are available in Mount Abu?",
          answer: "Mount Abu offers various adventure activities including trekking (to Guru Shikhar and other peaks), rock climbing, rappelling, zip-lining, horseback riding, boat rides on Nakki Lake, and wildlife safaris in the Mount Abu Wildlife Sanctuary. The availability of activities may vary based on the season and weather conditions."
        },
        {
          question: "Are these adventure activities safe?",
          answer: "Yes, all adventure activities offered through our platform are conducted by experienced operators who prioritize safety. All necessary safety equipment is provided, and trained guides accompany participants. However, adventure activities inherently involve some risk, and participants are required to follow all safety instructions and guidelines provided by the operators."
        },
        {
          question: "Do I need to book activities in advance?",
          answer: "We recommend booking activities at least 1-2 days in advance, especially during peak tourist season (October to March) to ensure availability. Some popular activities like wildlife safaris may require booking several days or even weeks in advance during high season."
        },
        {
          question: "What is the cancellation policy for adventure activities?",
          answer: "Most adventure activities can be cancelled free of charge up to 24 hours before the scheduled time. Cancellations within 24 hours of the activity may incur a 50-100% charge, depending on the provider. In case of cancellations due to adverse weather conditions or other safety concerns, a full refund or rescheduling option will be provided."
        },
        {
          question: "Are there age or health restrictions for adventure activities?",
          answer: "Yes, each activity has specific age and health requirements. Most activities have a minimum age requirement of 10-12 years, and some high-intensity activities may have higher age limits. Participants with certain health conditions such as heart problems, recent surgeries, or pregnancy may not be permitted to participate in certain activities. The specific requirements for each activity are listed on the activity details page."
        }
      ]
    },
    {
      id: "travel",
      name: "Travel & Transportation",
      faqs: [
        {
          question: "What is the best way to reach Mount Abu?",
          answer: "Mount Abu can be reached by road, rail, or air. The nearest airports are in Udaipur (185 km) and Ahmedabad (220 km). The closest railway station is Abu Road, located 28 km from Mount Abu. Regular buses and taxis operate from Abu Road station to Mount Abu. Direct buses are also available from major cities like Jaipur, Udaipur, Ahmedabad, and Delhi."
        },
        {
          question: "What are the transportation options within Mount Abu?",
          answer: "Within Mount Abu, you can get around using local taxis, auto-rickshaws, or by renting a car or bike. For short distances within the town, walking is a pleasant option. Many hotels also offer shuttle services to popular attractions, sometimes complimentary or for a small fee."
        },
        {
          question: "Are there any entry fees or permits required to visit Mount Abu?",
          answer: "Yes, as Mount Abu is located in an eco-sensitive zone, there is a small entry fee charged by the municipality. The fee is typically collected at the entry point to Mount Abu. Additionally, separate entry fees apply for attractions such as the Wildlife Sanctuary and some viewpoints. Indian nationals and foreign tourists may have different fee structures."
        },
        {
          question: "What is the best time to visit Mount Abu?",
          answer: "The best time to visit Mount Abu is from October to March when the weather is pleasant with daytime temperatures ranging from 15-25°C. April to June is warmer but still more comfortable than the plains below. July to September brings the monsoon, offering lush greenery but occasional heavy rainfall which might disrupt outdoor activities."
        },
        {
          question: "Can you arrange airport/railway station transfers?",
          answer: "Yes, we can arrange private transfers from nearby airports (Udaipur and Ahmedabad) and Abu Road railway station to your hotel in Mount Abu. These can be booked through our website or by contacting our customer service team. All transfers are conducted in comfortable, air-conditioned vehicles by licensed drivers."
        }
      ]
    }
  ];
  
  // Filter FAQs based on search query
  const filteredFaqs = searchQuery.trim() === "" ? 
    faqCategories : 
    faqCategories.map(category => ({
      ...category,
      faqs: category.faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(category => category.faqs.length > 0);
  
  // Count total FAQs
  const totalFaqs = faqCategories.reduce((sum, category) => sum + category.faqs.length, 0);
  const filteredFaqCount = filteredFaqs.reduce((sum, category) => sum + category.faqs.length, 0);

  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-display font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Find answers to common questions about our services, bookings, policies, 
                and Mount Abu travel information.
              </p>
            </div>
            
            <div className="relative mb-8">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={20} />
              <Input 
                placeholder="Search for questions or keywords..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery.trim() !== "" && (
                <p className="text-sm text-muted-foreground mt-2">
                  Found {filteredFaqCount} out of {totalFaqs} FAQs matching "{searchQuery}"
                </p>
              )}
            </div>
            
            {searchQuery.trim() === "" ? (
              <Tabs defaultValue={faqCategories[0].id} className="mb-12">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-8">
                  {faqCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {faqCategories.map((category) => (
                  <TabsContent key={category.id} value={category.id}>
                    <Accordion type="single" collapsible className="w-full">
                      {category.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="mb-12">
                {filteredFaqs.length > 0 ? (
                  filteredFaqs.map((category) => (
                    <div key={category.id} className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
                      <Accordion type="single" collapsible className="w-full">
                        {category.faqs.map((faq, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-left">
                              {faq.question}
                            </AccordionTrigger>
                            <AccordionContent className="text-muted-foreground">
                              {faq.answer}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">
                      No FAQs found matching "{searchQuery}". Try a different search term.
                    </p>
                  </div>
                )}
              </div>
            )}
            
            <div className="bg-muted p-8 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4">Didn't find what you were looking for?</h2>
              <p className="text-muted-foreground mb-6">
                If you couldn't find the answer to your question, please feel free to contact our support team. 
                We're here to help!
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-background p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Email Us</h3>
                  <p className="text-muted-foreground">
                    <a href="mailto:support@hotelinmountabu.com" className="text-primary hover:underline">
                      support@hotelinmountabu.com
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    We respond to all inquiries within 24 hours.
                  </p>
                </div>
                <div className="bg-background p-4 rounded-md border">
                  <h3 className="font-medium mb-2">Call Us</h3>
                  <p className="text-muted-foreground">
                    <a href="tel:+919876543210" className="text-primary hover:underline">
                      +91 9876 543 210
                    </a>
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Available 7 days a week, 9am-6pm IST
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default FAQs;
