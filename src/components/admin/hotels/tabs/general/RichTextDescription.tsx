
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Heading1, 
  Heading2, 
  Link, 
  AlignLeft, 
  AlignCenter, 
  AlignRight 
} from "lucide-react";

interface RichTextDescriptionProps {
  description: string;
  onChange: (value: string) => void;
}

const RichTextDescription = ({ description, onChange }: RichTextDescriptionProps) => {
  const [preview, setPreview] = useState(false);
  
  const insertTag = (startTag: string, endTag: string) => {
    const textarea = document.getElementById('description') as HTMLTextAreaElement;
    if (!textarea) return;
    
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = description.substring(start, end);
    
    const textBefore = description.substring(0, start);
    const textAfter = description.substring(end);
    
    const newText = `${textBefore}${startTag}${selectedText}${endTag}${textAfter}`;
    onChange(newText);
    
    // Focus back on textarea and set selection after insert
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + startTag.length,
        start + startTag.length + selectedText.length
      );
    }, 10);
  };
  
  const renderPreview = () => {
    let html = description;
    
    // Replace markdown-like syntax with HTML
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    html = html.replace(/## (.*?)(?:\n|$)/g, '<h2>$1</h2>');
    html = html.replace(/# (.*?)(?:\n|$)/g, '<h1>$1</h1>');
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    
    // Handle lists
    html = html.replace(/^\* (.*?)(?:\n|$)/gm, '<li>$1</li>');
    html = html.replace(/^(\d+)\. (.*?)(?:\n|$)/gm, '<li>$2</li>');
    html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');
    
    // Handle paragraphs
    html = html.replace(/(?:\r\n|\r|\n)/g, '<br>');
    
    return { __html: html };
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex flex-wrap gap-1">
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('**', '**')}
            title="Bold"
          >
            <Bold size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('*', '*')}
            title="Italic"
          >
            <Italic size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('# ', '\n')}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('## ', '\n')}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('* ', '\n')}
            title="Bullet List"
          >
            <List size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('1. ', '\n')}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => insertTag('[', '](https://example.com)')}
            title="Link"
          >
            <Link size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => {/* Add centering logic */}}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => {/* Add centering logic */}}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </Button>
          <Button 
            type="button" 
            size="icon" 
            variant="ghost"
            onClick={() => {/* Add right align logic */}}
            title="Align Right"
          >
            <AlignRight size={16} />
          </Button>
        </div>
        <Button 
          type="button"
          variant="outline" 
          size="sm"
          onClick={() => setPreview(!preview)}
        >
          {preview ? "Edit" : "Preview"}
        </Button>
      </div>

      {preview ? (
        <div 
          className="min-h-[200px] p-3 border rounded-md bg-white overflow-y-auto"
          dangerouslySetInnerHTML={renderPreview()}
        />
      ) : (
        <Textarea
          id="description"
          value={description}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter a detailed description of the hotel..."
          className="min-h-[200px]"
        />
      )}
    </div>
  );
};

export default RichTextDescription;
