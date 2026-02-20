import React from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Camera, Sparkles, Heart } from "lucide-react";

export default function HeroUploadZone() {
  const navigate = useNavigate();

  return (
    <div
      className="funky-card bg-[#FDFBF5] border-dashed border-[var(--brand-purple)] p-8 text-center cursor-pointer funky-card-hover"
      onClick={() => navigate(createPageUrl("Upload"))}
    >
        <div className="max-w-lg mx-auto">
          <div className="funky-button w-24 h-24 mx-auto flex items-center justify-center mb-6 bg-[var(--brand-pink)] bg-opacity-30">
            <Camera className="w-12 h-12 text-[var(--brand-purple)]" />
          </div>

          <h3 className="header-font text-2xl md:text-3xl text-gray-800 mb-4">
            Upload Your Pet Photo
          </h3>
          
          <p className="body-font-light text-lg text-gray-600 mb-8">
            Click here to select your favorite pet picture and start the magic!
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 body-font text-gray-700">
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-yellow-400">
                <Sparkles className="w-5 h-5 text-yellow-900" />
              </div>
              <span>High Quality AI</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-[var(--brand-blue)]">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span>Multiple Styles</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="funky-button w-10 h-10 flex items-center justify-center bg-[var(--brand-pink)]">
                <Heart className="w-5 h-5 text-pink-900" />
              </div>
              <span>Pet Safe</span>
            </div>
          </div>
        </div>
    </div>
  );
}