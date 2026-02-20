import React, { useState } from "react";
import { Upload, Camera, Image, FileText, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UploadZone({ onFileUpload }) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("image/")) {
        onFileUpload(file);
      }
    }
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="p-12">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`clay-inset p-12 text-center transition-all duration-300 ${
          dragActive 
            ? "bg-gradient-to-br from-purple-50 to-pink-50" 
            : "bg-gray-50/50"
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 mx-auto clay-button bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mb-6">
            {dragActive ? (
              <Sparkles className="w-10 h-10 text-purple-600" />
            ) : (
              <Upload className="w-10 h-10 text-purple-600" />
            )}
          </div>

          <h3 className="text-2xl font-bold text-purple-900 mb-4">
            {dragActive ? "Drop your photo here!" : "Upload Your Pet Photo"}
          </h3>
          
          <p className="text-purple-700 mb-8">
            Drag and drop your favorite pet picture, or click to browse
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
            id="file-upload"
          />
          
          <label htmlFor="file-upload">
            <Button
              as="span"
              className="clay-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 cursor-pointer"
            >
              <Image className="w-5 h-5 mr-2" />
              Choose Photo
            </Button>
          </label>

          <div className="mt-8 flex justify-center gap-6 text-sm text-purple-600">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>JPEG, PNG supported</span>
            </div>
            <div className="flex items-center gap-2">
              <Camera className="w-4 h-4" />
              <span>Max 10MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}