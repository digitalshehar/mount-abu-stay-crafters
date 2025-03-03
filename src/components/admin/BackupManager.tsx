
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Calendar, Clock, Check, File } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const previousBackups = [
  {
    id: 1,
    date: "2023-07-15",
    time: "03:30 AM",
    size: "42.5 MB",
    type: "Automatic",
  },
  {
    id: 2,
    date: "2023-07-08",
    time: "03:30 AM",
    size: "41.8 MB",
    type: "Automatic",
  },
  {
    id: 3,
    date: "2023-07-01",
    time: "03:30 AM",
    size: "40.2 MB",
    type: "Automatic",
  },
  {
    id: 4,
    date: "2023-06-28",
    time: "11:45 AM",
    size: "40.0 MB",
    type: "Manual",
  },
];

const BackupManager = () => {
  const [backingUp, setBackingUp] = useState(false);
  const [backups, setBackups] = useState(previousBackups);
  const { toast } = useToast();

  const createBackup = () => {
    setBackingUp(true);
    
    // Simulate backup process
    setTimeout(() => {
      const newBackup = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        size: "43.2 MB",
        type: "Manual",
      };
      
      setBackups([newBackup, ...backups]);
      setBackingUp(false);
      
      toast({
        title: "Backup created",
        description: "Website backup completed successfully",
      });
    }, 3000);
  };

  const downloadBackup = (id: number) => {
    const backup = backups.find((b) => b.id === id);
    
    if (backup) {
      toast({
        title: "Download started",
        description: `Downloading backup from ${backup.date}`,
      });
    }
  };

  const restoreBackup = (id: number) => {
    const backup = backups.find((b) => b.id === id);
    
    if (backup) {
      toast({
        title: "Restore initiated",
        description: `Restoring from backup dated ${backup.date}`,
      });
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Website Backup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="bg-muted/50 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-medium mb-1">Create Website Backup</h4>
              <p className="text-sm text-muted-foreground">
                Backup will include all website content, settings, and database
              </p>
            </div>
            <Button onClick={createBackup} disabled={backingUp}>
              {backingUp ? (
                <>
                  <RotateCcw className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Create Backup
                </>
              )}
            </Button>
          </div>

          <div>
            <h4 className="font-medium mb-3">Previous Backups</h4>
            {backups.length > 0 ? (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {backups.map((backup) => (
                  <div
                    key={backup.id}
                    className="border rounded-md p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="bg-muted p-2 rounded-full">
                        <File className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span className="text-sm font-medium">{backup.date}</span>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          <span className="text-sm">{backup.time}</span>
                        </div>
                        <div className="flex items-center mt-1 text-sm text-muted-foreground">
                          <span>Size: {backup.size}</span>
                          <span className="mx-2">•</span>
                          <span>Type: {backup.type}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 sm:ml-auto">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => restoreBackup(backup.id)}
                      >
                        <RotateCcw className="h-3.5 w-3.5 mr-1" />
                        Restore
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => downloadBackup(backup.id)}
                      >
                        <Download className="h-3.5 w-3.5 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No backups available
              </div>
            )}
            <div className="border-t pt-3 mt-4">
              <p className="text-xs text-muted-foreground">
                Automatic backups are created weekly. Manual backups can be created anytime.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BackupManager;
