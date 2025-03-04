
import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const CancellationPolicy = () => {
  useEffect(() => {
    document.title = "Cancellation Policy - HotelInMountAbu";
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main>
        <section className="bg-primary/10 py-20">
          <div className="container-custom">
            <h1 className="title-large mb-6 text-center">Cancellation Policy</h1>
            <p className="subtitle text-center max-w-3xl mx-auto">
              Please review our cancellation policies for accommodations and services
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container-custom">
            <div className="prose prose-stone max-w-3xl mx-auto">
              <h2>Hotel Bookings Cancellation Policy</h2>
              
              <p>At HotelInMountAbu, we understand that plans can change. Our cancellation policy for hotel bookings is designed to be fair and transparent:</p>
              
              <ul>
                <li><strong>Free Cancellation:</strong> Most hotel bookings can be cancelled for free up to 48 hours before the check-in date.</li>
                <li><strong>Late Cancellation:</strong> Cancellations made within 48 hours of the check-in date may incur a charge of the first night's stay.</li>
                <li><strong>No-Show:</strong> If you don't show up for your booking without prior cancellation, you may be charged the full amount of the booking or as per the hotel's specific policy.</li>
                <li><strong>Peak Season:</strong> During peak seasons (October to March), special cancellation policies may apply. These will be clearly communicated at the time of booking.</li>
              </ul>
              
              <h2>Car and Bike Rentals Cancellation Policy</h2>
              
              <p>For transportation rentals, our cancellation policy is as follows:</p>
              
              <ul>
                <li><strong>Free Cancellation:</strong> Cancellations made 24 hours or more before the scheduled pickup time are free of charge.</li>
                <li><strong>Late Cancellation:</strong> Cancellations made less than 24 hours before the scheduled pickup time may incur a charge of 25% of the total rental amount.</li>
                <li><strong>No-Show:</strong> If you don't show up for your rental without prior cancellation, you may be charged 50% of the total rental amount.</li>
              </ul>
              
              <h2>Adventure Activities Cancellation Policy</h2>
              
              <p>For adventure activities and tours, our cancellation policy is:</p>
              
              <ul>
                <li><strong>Free Cancellation:</strong> Cancellations made 72 hours or more before the scheduled activity are free of charge.</li>
                <li><strong>Late Cancellation:</strong> Cancellations made between 24-72 hours before the scheduled activity may incur a charge of 50% of the total activity cost.</li>
                <li><strong>Very Late Cancellation:</strong> Cancellations made less than 24 hours before the scheduled activity may incur a charge of up to 100% of the total activity cost.</li>
                <li><strong>Weather Conditions:</strong> If an activity is cancelled due to unsafe weather conditions, you will be offered a full refund or the option to reschedule.</li>
              </ul>
              
              <h2>Refund Process</h2>
              
              <p>When a refund is due, it will be processed using the same payment method used for the booking. Refunds typically take 5-10 business days to appear in your account, depending on your payment provider.</p>
              
              <h2>Modifications to Bookings</h2>
              
              <p>If you need to modify your booking rather than cancel it:</p>
              
              <ul>
                <li>Changes to bookings are subject to availability and may result in price adjustments.</li>
                <li>Modifications requested less than 48 hours before check-in/pickup/activity may be treated as a cancellation and rebooking, subject to the cancellation policies above.</li>
              </ul>
              
              <h2>Special Circumstances</h2>
              
              <p>We understand that emergencies happen. In case of:
              </p>
              
              <ul>
                <li><strong>Medical Emergencies:</strong> With valid documentation, we may offer more flexible cancellation terms at our discretion.</li>
                <li><strong>Natural Disasters:</strong> In case of natural disasters or other force majeure events, special policies may apply.</li>
              </ul>
              
              <p className="font-medium">For any questions regarding our cancellation policy, please contact our customer service team.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CancellationPolicy;
