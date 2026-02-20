import React, { useState } from "react";
import { Upload, Camera, Image, FileText, Sparkles } from "lucide-react";

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
        className={`funky-card border-dashed p-12 text-center cursor-pointer funky-card-hover transition-all duration-200 ${
          dragActive
            ? "bg-[var(--brand-lavender)] bg-opacity-20 border-[var(--brand-orange)]"
            : "bg-[#FDFBF5] border-[var(--brand-purple)]"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-upload-input").click()}
      >
        <input
          id="file-upload-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileInput}
        />

        <div className="max-w-lg mx-auto">
          <div className="funky-button w-24 h-24 mx-auto flex items-center justify-center mb-6 bg-[var(--brand-pink)] bg-opacity-30">
            {dragActive ? (
              <Sparkles className="w-12 h-12 text-[var(--brand-orange)] animate-pulse" />
            ) : (
              <Upload className="w-12 h-12 text-[var(--brand-purple)]" />
            )}
          </div>

          <h3 className="header-font text-2xl md:text-3xl text-gray-800 mb-4">
            {dragActive ? "Drop Your Photo Here!" : "Upload Your Pet Photo"}
          </h3>

          <p className="body-font-light text-lg text-gray-600 mb-8">
            {dragActive
              ? "Release to upload your adorable pet photo"
              : "Drag & drop your photo here, or click to browse"}
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 body-font text-gray-700">
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-yellow-400">
                <Image className="w-5 h-5 text-yellow-900" />
              </div>
              <span>JPG, PNG, WEBP</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-[var(--brand-blue)]">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span>High Quality</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-[var(--brand-pink)]">
                <FileText className="w-5 h-5 text-pink-900" />
              </div>
              <span>Up to 10MB</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
