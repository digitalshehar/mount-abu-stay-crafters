
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple validation
    if (!email || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Thank you for subscribing to our newsletter!");
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <section className="py-10 md:py-16 bg-stone-50">
      <div className="container max-w-4xl">
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 md:p-10">
          <div className="text-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-primary">Stay Updated</h2>
            <p className="text-stone-600 mt-2 max-w-xl mx-auto">
              Subscribe to our newsletter to receive exclusive offers, travel tips, and updates about Mount Abu.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-grow"
              />
              <Button 
                type="submit" 
                disabled={isSubmitting}
                className="whitespace-nowrap"
              >
                {isSubmitting ? "Subscribing..." : "Subscribe"}
              </Button>
            </div>
            
            <p className="text-xs text-stone-500 mt-3 text-center">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
