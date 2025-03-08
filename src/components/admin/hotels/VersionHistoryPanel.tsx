
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getHotelVersions, restoreHotelVersion } from "@/services/hotelManagement/versionHistoryService";
import { HotelVersion } from "./types";
import { History, Clock, RefreshCw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";

interface VersionHistoryPanelProps {
  isOpen: boolean;
  onClose: () => void;
  hotelId: number;
  onVersionRestored: () => void;
}

const VersionHistoryPanel: React.FC<VersionHistoryPanelProps> = ({ 
  isOpen, 
  onClose, 
  hotelId,
  onVersionRestored
}) => {
  const [versions, setVersions] = useState<HotelVersion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [restoring, setRestoring] = useState<number | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      fetchVersions();
    }
  }, [isOpen, hotelId]);

  const fetchVersions = async () => {
    try {
      setLoading(true);
      const fetchedVersions = await getHotelVersions(hotelId);
      setVersions(fetchedVersions);
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
    if (!user) return;
    
    try {
      setRestoring(versionId);
      await restoreHotelVersion(versionId, user.id, user.email || "Unknown user");
      
      toast({
        title: "Success",
        description: "Hotel version restored successfully"
      });
      
      onVersionRestored();
      onClose();
    } catch (error) {
      console.error("Error restoring version:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to restore hotel version"
      });
    } finally {
      setRestoring(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full md:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <History className="h-5 w-5 mr-2" />
            Version History
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : versions.length === 0 ? (
            <div className="text-center my-8 text-gray-500">
              No version history found.
            </div>
          ) : (
            <div className="space-y-4">
              {versions.map((version) => (
                <div key={version.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="font-medium">Version {version.id}</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(version.createdAt), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  
                  <Separator className="my-2" />
                  
                  <div className="grid grid-cols-2 gap-2 my-2">
                    <div className="text-sm">
                      <span className="font-semibold">Name:</span> {version.versionData.name}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Price:</span> ${version.versionData.pricePerNight}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Location:</span> {version.versionData.location}
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Status:</span> {version.versionData.status}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      By: {version.createdBy || 'Unknown user'}
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRestore(version.id)}
                      disabled={restoring !== null}
                      className="flex items-center"
                    >
                      {restoring === version.id ? (
                        <>
                          <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900 mr-2"></div>
                          Restoring...
                        </>
                      ) : (
                        <>
                          <RefreshCw className="h-3 w-3 mr-2" />
                          Restore
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default VersionHistoryPanel;
