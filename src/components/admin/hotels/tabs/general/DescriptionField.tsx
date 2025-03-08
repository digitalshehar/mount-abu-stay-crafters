
import React from "react";
import { Label } from "@/components/ui/label";
import RichTextDescription from "./RichTextDescription";

interface DescriptionFieldProps {
  description: string;
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const DescriptionField = ({ description, handleInputChange }: DescriptionFieldProps) => {
  const handleRichTextChange = (value: string) => {
    const syntheticEvent = {
      target: {
        name: "description",
        value
      }
    } as React.ChangeEvent<HTMLTextAreaElement>;
    
    handleInputChange(syntheticEvent);
  };

  return (
    <RichTextDescription 
      description={description}
      onChange={handleRichTextChange}
    />
  );
};

export default DescriptionField;
