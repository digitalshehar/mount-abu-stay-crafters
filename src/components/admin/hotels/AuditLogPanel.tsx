
import React, { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { getAuditLogs } from "@/services/hotelManagement/auditService";
import { AuditLog } from "./types";
import { FileText } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface AuditLogPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entityType?: string;
  entityId?: number;
}

const getActionColor = (action: string) => {
  switch (action) {
    case 'create':
      return 'bg-green-500';
    case 'update':
      return 'bg-blue-500';
    case 'delete':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const AuditLogPanel: React.FC<AuditLogPanelProps> = ({ isOpen, onClose, entityType, entityId }) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (isOpen) {
      fetchAuditLogs();
    }
  }, [isOpen, entityType, entityId]);

  const fetchAuditLogs = async () => {
    try {
      setLoading(true);
      const fetchedLogs = await getAuditLogs(entityType, entityId);
      setLogs(fetchedLogs);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full md:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Audit Logs {entityId && `for ${entityType} #${entityId}`}
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {loading ? (
            <div className="flex justify-center my-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center my-8 text-gray-500">
              No audit logs found.
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <Badge className={`${getActionColor(log.action)} text-white`}>
                        {log.action.toUpperCase()}
                      </Badge>
                      <span className="ml-2 font-medium">
                        {log.entityType} #{log.entityId}
                      </span>
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(log.timestamp), 'MMM d, yyyy h:mm a')}
                    </div>
                  </div>
                  
                  <p className="text-gray-700 mb-2">{log.details}</p>
                  
                  <Separator className="my-2" />
                  
                  <div className="text-sm text-gray-500">
                    By: {log.userName || 'Unknown user'}
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

export default AuditLogPanel;
