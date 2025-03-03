
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, X, FileText, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const FileUploader = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpload = () => {
    if (selectedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);
    
    // Simulate upload process
    setTimeout(() => {
      setUploading(false);
      toast({
        title: "Upload complete",
        description: `Successfully uploaded ${selectedFiles.length} files`,
      });
      setSelectedFiles([]);
    }, 2000);
  };

  return (
    <div className="border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium">Upload Files</h3>
      </div>
      
      <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center bg-muted/50 mb-4">
        <Upload className="h-8 w-8 text-muted-foreground mb-2" />
        <p className="text-sm text-center text-muted-foreground mb-2">
          Drag and drop files here or click to browse
        </p>
        <Input
          type="file"
          className="hidden"
          id="file-upload"
          onChange={handleFileChange}
          multiple
        />
        <Button
          variant="outline"
          onClick={() => document.getElementById("file-upload")?.click()}
          className="mt-2"
        >
          Select Files
        </Button>
      </div>

      {selectedFiles.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium mb-2">Selected Files ({selectedFiles.length})</p>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-background p-2 rounded-md border text-sm"
              >
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="truncate max-w-[150px]">{file.name}</span>
                  <span className="ml-2 text-xs text-muted-foreground">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Button
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || uploading}
        className="w-full"
      >
        {uploading ? (
          <>Uploading...</>
        ) : (
          <>
            <Upload className="mr-2 h-4 w-4" />
            Upload Files
          </>
        )}
      </Button>
    </div>
  );
};

export default FileUploader;
