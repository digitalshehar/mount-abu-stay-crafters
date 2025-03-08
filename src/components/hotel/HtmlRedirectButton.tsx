
import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface HtmlRedirectButtonProps {
  hotelSlug: string;
}

const HtmlRedirectButton = ({ hotelSlug }: HtmlRedirectButtonProps) => {
  const handleRedirect = () => {
    // Create SEO-friendly URL with .html extension
    const htmlUrl = `/hotel/${hotelSlug}.html`;
    
    // Open in a new tab
    window.open(htmlUrl, "_blank");
  };

  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="flex items-center gap-2"
      onClick={handleRedirect}
    >
      <ExternalLink className="h-4 w-4" />
      <span>HTML Version</span>
    </Button>
  );
};

export default HtmlRedirectButton;
