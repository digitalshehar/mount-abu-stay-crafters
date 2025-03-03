
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Plus, 
  Edit, 
  FileText, 
  Settings, 
  Users, 
  Calendar, 
  Mail,
  RefreshCw 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QuickActions = () => {
  const { toast } = useToast();
  
  const handleAction = (actionName: string) => {
    toast({
      title: "Action triggered",
      description: `You clicked on "${actionName}"`,
    });
  };

  const actions = [
    { name: "New Hotel", icon: Plus, color: "bg-green-100 text-green-600" },
    { name: "Edit Pages", icon: Edit, color: "bg-blue-100 text-blue-600" },
    { name: "New Blog Post", icon: FileText, color: "bg-purple-100 text-purple-600" },
    { name: "Update Settings", icon: Settings, color: "bg-orange-100 text-orange-600" },
    { name: "Manage Users", icon: Users, color: "bg-indigo-100 text-indigo-600" },
    { name: "View Calendar", icon: Calendar, color: "bg-pink-100 text-pink-600" },
    { name: "Send Newsletter", icon: Mail, color: "bg-yellow-100 text-yellow-600" },
    { name: "Cache Refresh", icon: RefreshCw, color: "bg-red-100 text-red-600" },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant="outline"
              className="h-auto flex flex-col items-center justify-center p-3 gap-2 hover:bg-muted"
              onClick={() => handleAction(action.name)}
            >
              <div className={`p-2 rounded-full ${action.color}`}>
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium">{action.name}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
