
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
import { AuditLog } from "@/components/admin/hotels/types";
import { getAuditLogs } from "@/services/hotelManagement/auditService";
import { format } from "date-fns";
import { FileText, Info } from "lucide-react";

interface AuditLogPanelProps {
  isOpen: boolean;
  onClose: () => void;
  entityId?: number;
  entityType?: string;
}

const AuditLogPanel = ({ isOpen, onClose, entityId, entityType }: AuditLogPanelProps) => {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchLogs();
    }
  }, [isOpen, entityId, entityType]);

  const fetchLogs = async () => {
    setLoading(true);
    try {
      const data = await getAuditLogs(entityType, entityId);
      setLogs(data);
    } catch (error) {
      console.error("Error fetching audit logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'create':
        return 'bg-green-100 text-green-800';
      case 'update':
        return 'bg-blue-100 text-blue-800';
      case 'delete':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-md overflow-y-hidden">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <FileText size={18} />
            Audit Logs
          </SheetTitle>
          <SheetDescription>
            View the history of changes made to {entityType} {entityId ? `#${entityId}` : ''}
          </SheetDescription>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-180px)] mt-6 pr-4">
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <p>Loading audit logs...</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-center">
              <Info size={40} className="text-gray-300 mb-2" />
              <p className="text-gray-500">No audit logs found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {logs.map((log) => (
                <div key={log.id} className="border rounded-md p-3 bg-white shadow-sm">
                  <div className="flex justify-between items-start">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${getActionColor(log.action)}`}>
                      {log.action.charAt(0).toUpperCase() + log.action.slice(1)}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(new Date(log.timestamp), 'MMM d, yyyy HH:mm')}
                    </span>
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-medium">
                      {log.entityType.charAt(0).toUpperCase() + log.entityType.slice(1)} #{log.entityId}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t text-xs text-gray-500">
                    By {log.userName || 'Unknown user'}
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

export default AuditLogPanel;
