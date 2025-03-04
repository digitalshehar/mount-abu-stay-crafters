
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Terms = () => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-6">Terms and Conditions</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <div className="prose prose-stone max-w-none">
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>
                Welcome to HotelInMountAbu. These terms and conditions outline the rules and regulations for the use of our website and services.
              </p>
              <p>
                By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use HotelInMountAbu's website if you do not accept all of the terms and conditions stated on this page.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Definitions</h2>
              <p>
                The following terminology applies to these Terms and Conditions, Privacy Statement, and Disclaimer Notice, and any or all Agreements: "Client", "You" and "Your" refers to you, the person accessing this website and accepting the Company's terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to HotelInMountAbu. "Party", "Parties", or "Us", refers to both the Client and ourselves, or either the Client or ourselves.
              </p>
              <p>
                All terms refer to the offer, acceptance, and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration or any other means, for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services/products, in accordance with and subject to, prevailing law of India.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">License</h2>
              <p>
                Unless otherwise stated, HotelInMountAbu and/or its licensors own the intellectual property rights for all material on HotelInMountAbu's website. All intellectual property rights are reserved. You may view and/or print pages from the website for your own personal use subject to restrictions set in these terms and conditions.
              </p>
              <p>You must not:</p>
              <ul>
                <li>Republish material from this website</li>
                <li>Sell, rent, or sub-license material from the website</li>
                <li>Reproduce, duplicate, or copy material from the website</li>
                <li>Redistribute content from HotelInMountAbu's website (unless content is specifically made for redistribution)</li>
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Reservation and Booking Terms</h2>
              <p>
                By making a reservation through our website, you agree to the following terms:
              </p>
              <ol>
                <li>
                  <strong>Reservation Confirmation</strong>: A reservation is only confirmed after you receive a confirmation email or notification from us. Until then, your booking request is pending.
                </li>
                <li>
                  <strong>Payment</strong>: Payment terms vary depending on the hotel and rate type. Some bookings require full payment at the time of booking, while others allow payment at the property. The specific payment terms will be clearly displayed before you complete your booking.
                </li>
                <li>
                  <strong>Accuracy of Information</strong>: You are responsible for providing accurate information during the booking process, including guest names, contact details, and special requests. Inaccurate information may result in booking cancellation without refund.
                </li>
                <li>
                  <strong>Hotel Policies</strong>: Each hotel has its own policies regarding check-in/check-out times, pet policies, smoking policies, etc. You agree to abide by these policies when making a reservation.
                </li>
              </ol>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Cancellation and Modification Policy</h2>
              <p>
                Cancellation and modification policies vary depending on the hotel and rate type you book. The specific policy applicable to your booking will be clearly displayed before you complete your reservation. Generally:
              </p>
              <ol>
                <li>
                  <strong>Free Cancellation Period</strong>: Many bookings offer free cancellation up to a certain time before check-in (typically 24-48 hours). Cancellations made within this period will receive a full refund.
                </li>
                <li>
                  <strong>Late Cancellations</strong>: Cancellations made after the free cancellation period may incur charges, ranging from one night's stay to the full booking amount.
                </li>
                <li>
                  <strong>Non-Refundable Rates</strong>: Some special rates are marked as non-refundable. These bookings cannot be cancelled or modified without losing the payment made.
                </li>
                <li>
                  <strong>No-Shows</strong>: Failure to arrive at the hotel on the check-in date without prior notification will be considered a no-show and will typically result in the loss of the entire booking amount.
                </li>
                <li>
                  <strong>Modifications</strong>: Changes to existing bookings are subject to availability and may result in price changes. Modifications are governed by the same policies as cancellations.
                </li>
              </ol>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Refund Policy</h2>
              <p>
                Refunds will be processed according to the following terms:
              </p>
              <ol>
                <li>
                  <strong>Eligible Cancellations</strong>: Refunds for eligible cancellations will be processed using the same payment method used for booking.
                </li>
                <li>
                  <strong>Processing Time</strong>: Refunds typically take 5-10 business days to appear in your account, depending on your payment method and bank processing times.
                </li>
                <li>
                  <strong>Partial Refunds</strong>: In some cases, partial refunds may be issued based on the cancellation policy and timing of the cancellation.
                </li>
                <li>
                  <strong>Currency Conversion</strong>: If the original payment was made in a different currency, the refund amount may vary due to exchange rate fluctuations.
                </li>
              </ol>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">User Account</h2>
              <p>
                If you create an account on our website, you are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password.
              </p>
              <p>
                You must immediately notify HotelInMountAbu of any unauthorized use of your account or any other breach of security. HotelInMountAbu reserves the right to refuse service, terminate accounts, remove or edit content, or cancel orders at its sole discretion.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
              <p>
                The information on this website is provided on an "as is" basis. HotelInMountAbu makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
              <p>
                In no event shall HotelInMountAbu be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on HotelInMountAbu's website, even if HotelInMountAbu or a HotelInMountAbu authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by HotelInMountAbu. HotelInMountAbu has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
              </p>
              <p>
                You acknowledge and agree that HotelInMountAbu shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in Rajasthan, India.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Changes to Terms</h2>
              <p>
                HotelInMountAbu reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting to the website. It is your responsibility to review these terms periodically. Your continued use of this website after any modifications indicates your acceptance of the modified terms and conditions.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us:
              </p>
              <address className="not-italic">
                <strong>HotelInMountAbu</strong><br />
                123 Mount Abu Road, Near Nakki Lake<br />
                Mount Abu, Rajasthan 307501<br />
                India<br />
                <br />
                Email: legal@hotelinmountabu.com<br />
                Phone: +91 9876 543 210
              </address>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Terms;
