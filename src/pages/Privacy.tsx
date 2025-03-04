
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Separator } from "@/components/ui/separator";

const Privacy = () => {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-display font-bold mb-6">Privacy Policy</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
            
            <div className="prose prose-stone max-w-none">
              <h2 className="text-2xl font-semibold">Introduction</h2>
              <p>
                HotelInMountAbu ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
              </p>
              <p>
                Please read this Privacy Policy carefully. By accessing or using our website or services, you acknowledge that you have read, understood, and agree to be bound by all the terms of this Privacy Policy.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Information We Collect</h2>
              <p>
                We collect information in several ways from different sources. This includes:
              </p>
              
              <h3 className="text-xl font-semibold">Personal Information You Provide</h3>
              <p>
                When you register for an account, make a booking, or use our services, we may collect the following personal information:
              </p>
              <ul>
                <li>Name, email address, phone number, and postal address</li>
                <li>Payment information (credit card details, billing address)</li>
                <li>Travel-related information (check-in/check-out dates, accommodation preferences)</li>
                <li>Identity documents for booking verification (passport number, government ID)</li>
                <li>Communication records when you contact our customer service</li>
                <li>User account information (username, password)</li>
                <li>Any other information you choose to provide</li>
              </ul>
              
              <h3 className="text-xl font-semibold">Information Collected Automatically</h3>
              <p>
                When you visit our website, we may automatically collect certain information about your device and usage patterns, including:
              </p>
              <ul>
                <li>IP address and device identifiers</li>
                <li>Browser type and operating system</li>
                <li>Pages you view and time spent on our website</li>
                <li>Referral information (how you reached our website)</li>
                <li>Cookies and similar tracking technologies (see our Cookie Policy section)</li>
                <li>Location information (if you enable location services)</li>
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">How We Use Your Information</h2>
              <p>
                We use the information we collect for the following purposes:
              </p>
              <ul>
                <li>
                  <strong>Provide Services</strong>: Process bookings, manage your account, and fulfill your requests.
                </li>
                <li>
                  <strong>Customer Support</strong>: Respond to your inquiries, resolve issues, and provide assistance.
                </li>
                <li>
                  <strong>Personalization</strong>: Tailor your experience and provide customized content and recommendations.
                </li>
                <li>
                  <strong>Communication</strong>: Send booking confirmations, updates, administrative messages, and promotional communications.
                </li>
                <li>
                  <strong>Improvement</strong>: Analyze usage patterns to improve our website, services, and user experience.
                </li>
                <li>
                  <strong>Security</strong>: Protect our website, systems, and users from fraudulent activity or unauthorized access.
                </li>
                <li>
                  <strong>Legal Compliance</strong>: Comply with legal obligations, resolve disputes, and enforce our agreements.
                </li>
              </ul>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Disclosure of Your Information</h2>
              <p>
                We may share your information with the following parties for the purposes described in this Privacy Policy:
              </p>
              <ul>
                <li>
                  <strong>Service Providers</strong>: Hotels, transportation providers, and other service providers necessary to fulfill your bookings.
                </li>
                <li>
                  <strong>Business Partners</strong>: Trusted third parties who assist us in operating our website, conducting business, or servicing you.
                </li>
                <li>
                  <strong>Payment Processors</strong>: Third-party payment processors who handle your payment transactions.
                </li>
                <li>
                  <strong>Affiliated Companies</strong>: Companies within our corporate family for purposes consistent with this Privacy Policy.
                </li>
                <li>
                  <strong>Legal Requirements</strong>: Comply with legal obligations, court orders, or governmental requests.
                </li>
                <li>
                  <strong>Business Transfers</strong>: In connection with a merger, acquisition, or sale of all or part of our business.
                </li>
              </ul>
              <p>
                We do not sell your personal information to third parties for their marketing purposes without your explicit consent.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, accidental loss, or destruction. While we strive to use commercially acceptable means to protect your personal information, we cannot guarantee its absolute security.
              </p>
              <p>
                Our website uses industry-standard encryption (SSL/TLS) to secure the transmission of sensitive information such as payment details. However, the transmission of information via the internet is not completely secure, and we cannot guarantee the security of information transmitted to our website.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Cookie Policy</h2>
              <p>
                Cookies are small text files placed on your device when you visit a website. We use cookies and similar technologies for the following purposes:
              </p>
              <ul>
                <li>
                  <strong>Essential Cookies</strong>: Required for the website to function properly (e.g., session management, security).
                </li>
                <li>
                  <strong>Preference Cookies</strong>: Remember your preferences and settings for a better user experience.
                </li>
                <li>
                  <strong>Analytics Cookies</strong>: Collect information about how you use our website to help us improve functionality.
                </li>
                <li>
                  <strong>Marketing Cookies</strong>: Track your browsing habits to deliver targeted advertising.
                </li>
              </ul>
              <p>
                You can control cookie settings through your browser. However, disabling certain cookies may limit your ability to use some features of our website.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Your Rights</h2>
              <p>
                Depending on your jurisdiction, you may have the following rights regarding your personal information:
              </p>
              <ul>
                <li>
                  <strong>Access</strong>: Request information about the personal data we hold about you.
                </li>
                <li>
                  <strong>Correction</strong>: Request correction of inaccurate or incomplete information.
                </li>
                <li>
                  <strong>Deletion</strong>: Request deletion of your personal information in certain circumstances.
                </li>
                <li>
                  <strong>Restriction</strong>: Request restriction of processing of your personal information.
                </li>
                <li>
                  <strong>Data Portability</strong>: Request transfer of your personal information to another service provider.
                </li>
                <li>
                  <strong>Objection</strong>: Object to processing of your personal information for certain purposes.
                </li>
                <li>
                  <strong>Withdrawal of Consent</strong>: Withdraw consent previously given for the processing of your information.
                </li>
              </ul>
              <p>
                To exercise your rights, please contact us using the details provided in the "Contact Us" section below. We will respond to your request within the timeframe required by applicable law.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. The criteria used to determine our retention periods include:
              </p>
              <ul>
                <li>The period needed to provide you with our services</li>
                <li>Legal obligations that require us to keep data for a certain period</li>
                <li>Statute of limitations under applicable law</li>
                <li>Ongoing or potential disputes or legal proceedings</li>
              </ul>
              <p>
                When we no longer need your personal information, we will securely delete or anonymize it.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">International Data Transfers</h2>
              <p>
                We are based in India, and your information may be stored and processed in India or any other country where we or our service providers operate. By using our website or services, you consent to the transfer of your information to countries that may have different data protection rules than your country.
              </p>
              <p>
                We take appropriate safeguards to ensure that your personal information remains protected in accordance with this Privacy Policy when transferred internationally.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Children's Privacy</h2>
              <p>
                Our website and services are not intended for children under the age of 18. We do not knowingly collect personal information from children under 18. If you are a parent or guardian and believe that your child has provided us with personal information, please contact us, and we will delete such information from our systems.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated "Last updated" date at the top of this Privacy Policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.
              </p>
              <p>
                Your continued use of our website or services after any changes to this Privacy Policy constitutes your acceptance of the updated policy.
              </p>
              
              <Separator className="my-6" />
              
              <h2 className="text-2xl font-semibold">Contact Us</h2>
              <p>
                If you have any questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <address className="not-italic">
                <strong>HotelInMountAbu</strong><br />
                123 Mount Abu Road, Near Nakki Lake<br />
                Mount Abu, Rajasthan 307501<br />
                India<br />
                <br />
                Email: privacy@hotelinmountabu.com<br />
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

export default Privacy;
