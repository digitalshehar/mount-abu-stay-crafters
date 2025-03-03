
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RefreshCw, Check, Palette } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const colorOptions = [
  { name: "Default", primary: "#3F3423", accent: "#F4F3F0" },
  { name: "Blue", primary: "#0F52BA", accent: "#E6F0FF" },
  { name: "Green", primary: "#2E7D32", accent: "#E8F5E9" },
  { name: "Purple", primary: "#6200EA", accent: "#EDE7F6" },
  { name: "Teal", primary: "#00796B", accent: "#E0F2F1" },
  { name: "Orange", primary: "#E65100", accent: "#FFF3E0" },
];

const ThemeCustomizer = () => {
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [primaryColor, setPrimaryColor] = useState(colorOptions[0].primary);
  const [accentColor, setAccentColor] = useState(colorOptions[0].accent);
  const { toast } = useToast();

  const handleColorSelect = (color: typeof colorOptions[0]) => {
    setSelectedColor(color);
    setPrimaryColor(color.primary);
    setAccentColor(color.accent);
  };

  const applyTheme = () => {
    // In a real application, this would update the theme colors in your design system
    toast({
      title: "Theme updated",
      description: `Primary: ${primaryColor}, Accent: ${accentColor}`,
    });
  };

  const resetTheme = () => {
    setSelectedColor(colorOptions[0]);
    setPrimaryColor(colorOptions[0].primary);
    setAccentColor(colorOptions[0].accent);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Palette className="h-4 w-4 mr-2" />
          Theme Customizer
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="primary-color">Primary Color</Label>
            <div className="flex gap-2 mt-1">
              <div 
                className="h-10 w-10 rounded-md border cursor-pointer"
                style={{ backgroundColor: primaryColor }}
              />
              <Input
                id="primary-color"
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accent-color">Accent Color</Label>
            <div className="flex gap-2 mt-1">
              <div 
                className="h-10 w-10 rounded-md border cursor-pointer"
                style={{ backgroundColor: accentColor }}
              />
              <Input
                id="accent-color"
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="flex-1"
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block">Preset Color Schemes</Label>
            <div className="grid grid-cols-3 gap-2">
              {colorOptions.map((color, index) => (
                <button
                  key={index}
                  className={`border rounded-md p-2 h-16 flex flex-col items-center justify-center relative transition-all ${
                    selectedColor.name === color.name
                      ? "ring-2 ring-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => handleColorSelect(color)}
                >
                  <div className="flex gap-1">
                    <div
                      className="h-6 w-6 rounded-full"
                      style={{ backgroundColor: color.primary }}
                    />
                    <div
                      className="h-6 w-6 rounded-full border"
                      style={{ backgroundColor: color.accent }}
                    />
                  </div>
                  <span className="text-xs mt-1">{color.name}</span>
                  {selectedColor.name === color.name && (
                    <div className="absolute top-1 right-1 h-4 w-4 bg-primary rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={applyTheme} className="flex-1">
              Apply Theme
            </Button>
            <Button variant="outline" onClick={resetTheme}>
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ThemeCustomizer;
