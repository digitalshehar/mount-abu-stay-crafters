
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Underline,
  Heading1,
  Heading2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

interface RichTextDescriptionProps {
  description: string;
  onChange: (value: string) => void;
}

const RichTextDescription = ({ description, onChange }: RichTextDescriptionProps) => {
  const [textAreaRef, setTextAreaRef] = useState<HTMLTextAreaElement | null>(null);

  const handleButtonClick = (tag: string) => {
    if (!textAreaRef) return;

    const start = textAreaRef.selectionStart;
    const end = textAreaRef.selectionEnd;
    const selectedText = description.substring(start, end);
    
    let newText = "";
    
    switch (tag) {
      case "b":
        newText = `<b>${selectedText}</b>`;
        break;
      case "i":
        newText = `<i>${selectedText}</i>`;
        break;
      case "u":
        newText = `<u>${selectedText}</u>`;
        break;
      case "h1":
        newText = `<h1>${selectedText}</h1>`;
        break;
      case "h2":
        newText = `<h2>${selectedText}</h2>`;
        break;
      case "ul":
        newText = `<ul>\n  <li>${selectedText}</li>\n</ul>`;
        break;
      case "ol":
        newText = `<ol>\n  <li>${selectedText}</li>\n</ol>`;
        break;
      case "center":
        newText = `<div style="text-align: center">${selectedText}</div>`;
        break;
      case "right":
        newText = `<div style="text-align: right">${selectedText}</div>`;
        break;
      default:
        newText = selectedText;
    }
    
    const newValue = description.substring(0, start) + newText + description.substring(end);
    onChange(newValue);
    
    // Set focus back to textarea after button click
    setTimeout(() => {
      if (textAreaRef) {
        textAreaRef.focus();
        textAreaRef.setSelectionRange(start + newText.length, start + newText.length);
      }
    }, 0);
  };

  return (
    <div className="space-y-2 md:col-span-2">
      <Label htmlFor="description">Description</Label>
      
      <div className="bg-muted/50 p-1 rounded-md border border-border flex flex-wrap gap-1 mb-2">
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("b")}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("i")}
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("u")}
        >
          <Underline className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-border mx-1"></div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("h1")}
        >
          <Heading1 className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("h2")}
        >
          <Heading2 className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-border mx-1"></div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("ul")}
        >
          <List className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("ol")}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <div className="w-px h-8 bg-border mx-1"></div>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => {/* Default is left aligned */}}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("center")}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button 
          type="button" 
          variant="ghost" 
          size="sm" 
          className="h-8 w-8 p-0"
          onClick={() => handleButtonClick("right")}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </div>
      
      <Textarea 
        ref={(ref) => setTextAreaRef(ref)}
        id="description"
        name="description"
        value={description}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter hotel description with formatting"
        rows={6}
      />
      
      {description && (
        <div className="flex justify-between text-xs text-stone-500">
          <span>{description.length} characters</span>
          <span>{250 - description.length} characters remaining</span>
        </div>
      )}
      
      {description && (
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-2">Preview</h3>
          <div 
            className="p-4 border rounded-md bg-white text-sm prose max-w-none"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      )}
    </div>
  );
};

export default RichTextDescription;
