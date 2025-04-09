
import React, { useState } from 'react';
import { Share, Facebook, Twitter, Linkedin, Mail, Link as LinkIcon, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

interface SocialSharingProps {
  hotelName: string;
  hotelLocation: string;
}

const SocialSharing: React.FC<SocialSharingProps> = ({ hotelName, hotelLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const pageUrl = window.location.href;
  const shareText = `Check out ${hotelName} in ${hotelLocation} on HotelsInMountAbu!`;
  
  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}&quote=${encodeURIComponent(shareText)}`,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(shareText)}`,
      color: 'bg-sky-500 hover:bg-sky-600',
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`,
      color: 'bg-blue-700 hover:bg-blue-800',
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodeURIComponent(`Check out ${hotelName}`)}&body=${encodeURIComponent(`I found this amazing hotel: ${hotelName} in ${hotelLocation}. Check it out here: ${pageUrl}`)}`,
      color: 'bg-orange-600 hover:bg-orange-700',
    },
  ];
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(pageUrl).then(() => {
      toast.success('Link copied to clipboard!');
    }).catch((err) => {
      console.error('Failed to copy link:', err);
      toast.error('Failed to copy link');
    });
  };

  return (
    <>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="flex items-center"
      >
        <Share className="h-4 w-4 mr-2" />
        Share
      </Button>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share this hotel</DialogTitle>
            <DialogDescription>
              Share {hotelName} with friends and family
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex items-center space-x-2 mt-4">
            <div className="grid grid-cols-4 gap-2 w-full">
              {shareLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${link.color} text-white p-3 rounded-full flex items-center justify-center transition-colors`}
                  title={`Share on ${link.name}`}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 mt-4">
            <Input 
              value={pageUrl} 
              readOnly 
              className="flex-1"
            />
            <Button 
              type="button" 
              size="sm" 
              className="px-3" 
              onClick={copyToClipboard}
            >
              <LinkIcon className="h-4 w-4 mr-2" />
              Copy
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SocialSharing;
