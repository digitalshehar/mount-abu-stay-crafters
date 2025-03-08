
import React, { useState, useEffect } from "react";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Hotel, HotelVersion } from "@/components/admin/hotels/types";
import { getHotelVersions, restoreHotelVersion } from "@/services/hotelManagement/versionHistoryService";
import { format } from "date-fns";
import { ClockRewind, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hotelId: number;
  onVersionRestored: () => void;
}

const VersionHistoryPanel = ({ 
  isOpen, 
  onClose, 
  hotelId,
  onVersionRestored
}: VersionHistoryPanelProps) => {
  const [versions, setVersions] = useState<HotelVersion[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const { toast } = useToast();
  const { user, profile } = useAuth();

  useEffect(() => {
    if (isOpen && hotelId) {
      fetchVersions();
    }
  }, [isOpen, hotelId]);

  const fetchVersions = async () => {
    setLoading(true);
    try {
      const data = await getHotelVersions(hotelId);
      setVersions(data);
    } catch (error) {
      console.error("Error fetching versions:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load version history"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (versionId: number) => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "You must be logged in to restore a version"
      });
      return;
    }

    setRestoring(true);
    try {
      await restoreHotelVersion(
        versionId, 
        user.id, 
        profile?.username || user.email || 'Unknown user'
      );
      
      toast({
        title: "Version Restored",
        description: "The hotel has been restored to the selected version"
      });
      
      onVersionRestored();
      onClose();
    } catch (error) {
      console.error("Error restoring version:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to restore version"
      });
    } finally {
      setRestoring(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-md overflow-y-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ClockRewind size={18} />
            Version History
          </SheetTitle>
          <SheetDescription>
            View and restore previous versions of this hotel
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading version history...</p>
            </div>
          ) : versions.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Info size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-500">No previous versions found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version) => (
                <div key={version.id} className="border rounded-md p-4 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className="text-sm font-medium">
                      Version from {format(new Date(version.createdAt), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <div className="mt-3 space-y-2 text-sm text-gray-700">
                    <div>
                      <span className="font-medium">Name:</span> {version.versionData.name}
                    </div>
                    <div>
                      <span className="font-medium">Price:</span> ₹{version.versionData.pricePerNight}
                    </div>
                    <div>
                      <span className="font-medium">Rating:</span> {version.versionData.stars} ★
                    </div>
                    <div>
                      <span className="font-medium">Status:</span> {version.versionData.status}
                    </div>
                  </div>
                  <div className="mt-3 pt-2 border-t text-xs text-gray-500">
                    By {version.createdBy || 'Unknown user'}
                  </div>
                  <div className="mt-3">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleRestore(version.id)}
                      disabled={restoring}
                    >
                      Restore This Version
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <div className="mt-4 flex justify-end">
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default VersionHistoryPanel;
