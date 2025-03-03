
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, TrendingDown, Search } from "lucide-react";

const searchTerms = [
  { term: "Mount abu hotels", searches: 1240, change: "+5.3%" },
  { term: "Luxury hotels in mount abu", searches: 830, change: "+2.1%" },
  { term: "Mount abu resorts", searches: 620, change: "-1.8%" },
  { term: "Mount abu booking", searches: 450, change: "+0.5%" },
  { term: "Cheap hotels in mount abu", searches: 380, change: "+4.2%" },
];

const pageData = [
  { name: "Homepage", views: 5840 },
  { name: "Hotels", views: 4320 },
  { name: "Hotel Details", views: 3760 },
  { name: "Blog", views: 2150 },
  { name: "About", views: 1890 },
];

const SeoAnalytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            <Search className="h-4 w-4 mr-2" />
            Top Search Terms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {searchTerms.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.term}</p>
                  <p className="text-xs text-muted-foreground">{item.searches} searches</p>
                </div>
                <span 
                  className={`flex items-center text-xs font-medium ${
                    item.change.startsWith("+") 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}
                >
                  {item.change.startsWith("+") 
                    ? <TrendingUp className="h-3 w-3 mr-1" /> 
                    : <TrendingDown className="h-3 w-3 mr-1" />
                  }
                  {item.change}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center text-base">
            Top Performing Pages
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={pageData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  width={100}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 12 }}
                />
                <Tooltip />
                <Bar dataKey="views" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SeoAnalytics;
