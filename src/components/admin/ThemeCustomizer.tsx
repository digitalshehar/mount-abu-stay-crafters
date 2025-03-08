
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Monitor } from "lucide-react";

interface ThemeCustomizerProps {
  initialTheme?: string;
  onThemeChange?: (theme: string) => void;
}

const ThemeCustomizer: React.FC<ThemeCustomizerProps> = ({ 
  initialTheme = "light",
  onThemeChange = () => {} 
}) => {
  const handleThemeChange = (theme: string) => {
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(theme);
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      document.documentElement.classList.add(systemTheme);
    }
    
    onThemeChange(theme);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Theme Customizer</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="theme">
          <TabsList className="mb-4">
            <TabsTrigger value="theme">Theme</TabsTrigger>
            <TabsTrigger value="colors">Colors</TabsTrigger>
          </TabsList>
          
          <TabsContent value="theme">
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={initialTheme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("light")}
                className="w-full justify-start"
              >
                <Sun className="mr-1 h-4 w-4" /> Light
              </Button>
              <Button
                variant={initialTheme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("dark")}
                className="w-full justify-start"
              >
                <Moon className="mr-1 h-4 w-4" /> Dark
              </Button>
              <Button
                variant={initialTheme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => handleThemeChange("system")}
                className="w-full justify-start"
              >
                <Monitor className="mr-1 h-4 w-4" /> System
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="colors">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Primary Color</label>
                <div className="grid grid-cols-5 gap-2">
                  {["blue", "green", "red", "purple", "orange"].map((color) => (
                    <div
                      key={color}
                      className={`h-8 rounded-md cursor-pointer border border-gray-200 bg-${color}-500`}
                      onClick={() => {}}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-1 block">Radius Size</label>
                <div className="grid grid-cols-3 gap-2">
                  {["small", "medium", "large"].map((size) => (
                    <Button
                      key={size}
                      variant="outline"
                      size="sm"
                      onClick={() => {}}
                      className="w-full"
                    >
                      {size.charAt(0).toUpperCase() + size.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizer;
