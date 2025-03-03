
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleCheck, AlertTriangle, Clock } from "lucide-react";

const services = [
  {
    name: "Website Frontend",
    status: "operational",
    uptime: "99.9%",
    lastChecked: "1 min ago",
  },
  {
    name: "Booking System",
    status: "operational",
    uptime: "99.7%",
    lastChecked: "3 min ago",
  },
  {
    name: "Payment Gateway",
    status: "operational",
    uptime: "99.8%",
    lastChecked: "2 min ago",
  },
  {
    name: "Email Service",
    status: "degraded",
    uptime: "98.2%",
    lastChecked: "5 min ago",
    issue: "Delayed delivery",
  },
  {
    name: "Database",
    status: "operational",
    uptime: "99.9%",
    lastChecked: "1 min ago",
  },
];

const SiteMonitoring = () => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>System Status</CardTitle>
        <Clock className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                {service.status === "operational" ? (
                  <CircleCheck className="h-4 w-4 text-green-500 mr-2" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 mr-2" />
                )}
                <span className="font-medium text-sm">{service.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-xs text-muted-foreground">{service.uptime} uptime</span>
                <span 
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    service.status === "operational" 
                      ? "bg-green-100 text-green-700" 
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {service.status === "operational" ? "Operational" : "Degraded"}
                </span>
              </div>
            </div>
          ))}
          <div className="pt-3 border-t">
            <div className="flex items-center justify-between text-sm">
              <span>Overall System Status</span>
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                Operational
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SiteMonitoring;
