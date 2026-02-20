
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { PetPhoto, Transformation } from "@/entities/all";
import { UploadFile } from "@/integrations/Core";
import { replicateGenerateImage } from "@/functions/replicateGenerateImage";
import { Alert, AlertDescription } from "@/components/ui/alert";

import UploadZone from "../components/upload/UploadZone";
import PetDetailsForm from "../components/upload/PetDetailsForm";
import StyleSelector from "../components/upload/StyleSelector";
import ProcessingView from "../components/upload/ProcessingView";

export default function UploadPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState("upload"); // upload, details, style, processing
  const [uploadedFile, setUploadedFile] = useState(null);
  const [petPhoto, setPetPhoto] = useState(null);
  const [selectedStyle, setSelectedStyle] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      setError(null);
      const { file_url } = await UploadFile({ file });
      setUploadedFile({ file, url: file_url });
      setStep("details");
    } catch (err) {
      setError("Failed to upload file. Please try again.");
    }
  };

  const handlePetDetails = async (petData) => {
    try {
      const photo = await PetPhoto.create({ ...petData, original_photo_url: uploadedFile.url });
      setPetPhoto(photo);
      setStep("style");
    } catch (err) {
      setError("Failed to save pet details. Please try again.");
    }
  };

  const startTransformation = async (style) => {
    setIsProcessing(true);
    setStep("processing");
    setSelectedStyle(style);

    try {
      const { data } = await replicateGenerateImage({
        pet_name: petPhoto.pet_name,
        pet_type: petPhoto.pet_type,
        breed: petPhoto.breed,
        style_name: style.name,
        style_description: style.description
      });
      
      if (!data.success) {
        throw new Error(data.details || 'Image generation failed.');
      }

      await Transformation.create({
        pet_photo_id: petPhoto.id,
        style: style.id,
        transformed_image_url: data.url,
        prompt_used: data.prompt_used,
      });

      await PetPhoto.update(petPhoto.id, { status: "completed" });
      setTimeout(() => navigate(createPageUrl("Gallery")), 2000);
    } catch (err) {
      setError("Failed to create transformation. Please try again. " + err.message);
      setStep("style");
    } finally {
      setIsProcessing(false);
    }
  };

  const steps = ["upload", "details", "style", "processing"];
  const currentStepIndex = steps.indexOf(step);

  return (
    <div className="funky-card p-6 md:p-10 space-y-8">
      <header className="text-center">
        <h1 className="header-font text-3xl md:text-5xl">Create Your Magic</h1>
        <p className="body-font-light text-lg text-gray-600 mt-2">Follow these simple steps to transform your pet!</p>
      </header>
      
      {error && (
        <Alert className="funky-card bg-red-100 border-red-500 text-red-800">
          <AlertDescription className="body-font">{error}</AlertDescription>
        </Alert>
      )}

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-[var(--brand-purple)] funky-card p-1">
        <div 
          className="bg-[var(--brand-pink)] h-full rounded-full transition-all duration-500" 
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}>
        </div>
      </div>

      {step === "upload" && <UploadZone onFileUpload={handleFileUpload} />}
      {step === "details" && uploadedFile && <PetDetailsForm uploadedFile={uploadedFile} onSubmit={handlePetDetails} onBack={() => setStep("upload")} />}
      {step === "style" && petPhoto && <StyleSelector petPhoto={petPhoto} onStyleSelect={startTransformation} onBack={() => setStep("details")} />}
      {step === "processing" && <ProcessingView petPhoto={petPhoto} selectedStyle={selectedStyle} isProcessing={isProcessing} />}
    </div>
  );
}
