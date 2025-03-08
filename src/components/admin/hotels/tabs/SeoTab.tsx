
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Globe, Search, Tag } from "lucide-react";

interface SeoTabProps {
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBack: () => void;
  onSave: () => void;
}

const SeoTab = ({
  seoTitle,
  seoDescription,
  seoKeywords,
  handleInputChange,
  onBack,
  onSave
}: SeoTabProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            <Label htmlFor="seoTitle">SEO Title</Label>
          </div>
          <Input
            id="seoTitle"
            name="seoTitle"
            value={seoTitle}
            onChange={handleInputChange}
            placeholder="Enter SEO title"
            className="max-w-3xl"
          />
          <p className="text-xs text-muted-foreground">
            This will appear as the title in search engine results and browser tabs.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-primary" />
            <Label htmlFor="seoDescription">Meta Description</Label>
          </div>
          <Textarea
            id="seoDescription"
            name="seoDescription"
            value={seoDescription}
            onChange={handleInputChange}
            placeholder="Enter meta description"
            rows={3}
            className="max-w-3xl"
          />
          <div className="flex justify-between text-xs text-muted-foreground max-w-3xl">
            <span>Concise summary for search engines</span>
            <span>{seoDescription.length}/160 characters</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="h-4 w-4 text-primary" />
            <Label htmlFor="seoKeywords">Keywords</Label>
          </div>
          <Input
            id="seoKeywords"
            name="seoKeywords"
            value={seoKeywords}
            onChange={handleInputChange}
            placeholder="Enter keywords separated by commas"
            className="max-w-3xl"
          />
          <p className="text-xs text-muted-foreground">
            Keywords help search engines understand your content (e.g., luxury hotel, beachfront, family-friendly)
          </p>
        </div>
      </div>

      <Card className="p-4 max-w-3xl border border-border bg-muted/50">
        <h3 className="text-sm font-medium mb-2">Search Engine Preview</h3>
        <div className="space-y-2">
          <div className="text-primary-foreground bg-primary px-2 py-1 text-xs inline-block rounded">
            Hotel Listing
          </div>
          <div className="text-blue-600 font-medium text-lg break-words">
            {seoTitle || "Hotel Title Will Appear Here"}
          </div>
          <div className="text-green-700 text-sm">
            www.hotelinmountabu.com/hotel/{seoTitle ? seoTitle.toLowerCase().replace(/\s+/g, "-") : "hotel-name"}
          </div>
          <div className="text-gray-600 text-sm">
            {seoDescription || "Your meta description will appear here. This text helps users and search engines understand what your page is about."}
          </div>
        </div>
      </Card>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onSave}>
          Save SEO Settings
        </Button>
      </div>
    </div>
  );
};

export default SeoTab;
