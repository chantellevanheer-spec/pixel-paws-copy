
import React, { useState } from "react";
import { format } from "date-fns";
import { Download, Star, Heart, Share, Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Transformation } from "@/entities/all";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { generateImageVariations } from "@/functions/generateImageVariations";

export default function TransformationModal({ transformation, petPhoto, isOpen, onClose }) {
  const [userRating, setUserRating] = useState(transformation?.rating || 0);
  const [isRatingLoading, setIsRatingLoading] = useState(false);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);

  if (!transformation || !petPhoto) return null;

  const handleDownload = () => {
    window.open(transformation.transformed_image_url, '_blank');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${petPhoto.pet_name}'s ${transformation.style} transformation`,
          text: "Check out this amazing pet transformation from Pixel Paws!",
          url: transformation.transformed_image_url
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(transformation.transformed_image_url);
    }
  };

  const handleRating = async (rating) => {
    setIsRatingLoading(true);
    try {
      await Transformation.update(transformation.id, { ...transformation, rating });
      setUserRating(rating);
    } catch (error) {
      console.error("Error updating rating:", error);
    }
    setIsRatingLoading(false);
  };

  const handleGenerateVariations = async () => {
    setIsGeneratingVariations(true);
    try {
      const { data } = await generateImageVariations({
        image_url: transformation.transformed_image_url,
        prompt: transformation.prompt_used || `A ${transformation.style} ${petPhoto.pet_type}`,
        num_variations: 3,
        strength: 0.4 // Subtle variations
      });

      if (data.success && data.variations.length > 0) {
        // Save variations to database
        for (const variation of data.variations) {
          await Transformation.create({
            pet_photo_id: transformation.pet_photo_id,
            style: `${transformation.style}_variation`,
            transformed_image_url: variation.url,
            prompt_used: `Variation of: ${transformation.prompt_used || `A ${transformation.style} ${petPhoto.pet_type}`}`,
            is_premium: transformation.is_premium,
            parent_transformation_id: transformation.id
          });
        }

        // Close modal and let user see variations in gallery
        onClose();
        // Could add a toast notification here
      }
    } catch (error) {
      console.error("Error generating variations:", error);
    } finally {
      setIsGeneratingVariations(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl clay-element bg-white/95 border-0">
        <DialogHeader className="text-left">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-purple-900">
            {petPhoto.pet_name}'s {transformation.style} Transformation
          </DialogTitle>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {/* Image */}
          <div className="space-y-3 sm:space-y-4">
            <div className="clay-inset overflow-hidden">
              <img
                src={transformation.transformed_image_url}
                alt={`${petPhoto.pet_name} as ${transformation.style}`}
                className="w-full h-auto object-cover"
              />
            </div>
            
            <div className="flex gap-2 sm:gap-3">
              <Button
                onClick={handleDownload}
                className="clay-button bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white flex-1 text-sm sm:text-base"
              >
                <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                Download
              </Button>
              <Button
                onClick={handleShare}
                variant="outline"
                className="clay-button bg-white/60 hover:bg-white/80 text-purple-700"
              >
                <Share className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>

            {/* New Variations Button */}
            <Button
              onClick={handleGenerateVariations}
              disabled={isGeneratingVariations}
              className="w-full clay-button bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              {isGeneratingVariations ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating Variations...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Variations
                </>
              )}
            </Button>
          </div>

          {/* Details */}
          <div className="space-y-4 sm:space-y-6">
            <div className="clay-inset bg-purple-50/50 p-4 sm:p-6 space-y-3 sm:space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🐾</span>
                <div>
                  <h3 className="font-bold text-purple-900 text-base sm:text-lg">{petPhoto.pet_name}</h3>
                  <p className="text-purple-700 capitalize text-sm sm:text-base">{petPhoto.pet_type} {petPhoto.breed && `• ${petPhoto.breed}`}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge className="clay-button bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs sm:text-sm">
                  {transformation.style}
                </Badge>
                {transformation.is_premium && (
                  <Badge className="clay-button bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs sm:text-sm">
                    Premium
                  </Badge>
                )}
              </div>

              {petPhoto.description && (
                <div>
                  <h4 className="font-medium text-purple-900 mb-1 text-sm sm:text-base">About {petPhoto.pet_name}</h4>
                  <p className="text-xs sm:text-sm text-purple-700">{petPhoto.description}</p>
                </div>
              )}
            </div>

            {/* Rating Section */}
            <div className="clay-inset bg-yellow-50/50 p-4 sm:p-6">
              <h4 className="font-bold text-purple-900 mb-3 text-sm sm:text-base">Rate this transformation</h4>
              <div className="flex items-center gap-1 sm:gap-2 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => handleRating(star)}
                    disabled={isRatingLoading}
                    className="transition-colors duration-200 hover:scale-110"
                  >
                    <Star 
                      className={`w-5 h-5 sm:w-6 sm:h-6 ${
                        star <= userRating ? 'text-yellow-500 fill-current' : 'text-gray-300'
                      }`} 
                    />
                  </button>
                ))}
              </div>
              <p className="text-xs sm:text-sm text-purple-600">
                {userRating > 0 ? `You rated this ${userRating}/5 stars` : 'Click to rate this transformation'}
              </p>
            </div>

            <div className="clay-inset bg-blue-50/50 p-4 sm:p-6 space-y-2 sm:space-y-3">
              <h4 className="font-bold text-purple-900 text-sm sm:text-base">Transformation Details</h4>
              <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-600">Created:</span>
                  <span className="text-purple-900 font-medium">
                    {format(new Date(transformation.created_date), "MMM d, yyyy 'at' h:mm a")}
                  </span>
                </div>
                {transformation.processing_time && (
                  <div className="flex justify-between">
                    <span className="text-purple-600">Processing Time:</span>
                    <span className="text-purple-900 font-medium">
                      {transformation.processing_time}s
                    </span>
                  </div>
                )}
              </div>
            </div>

            {transformation.prompt_used && (
              <div className="clay-inset bg-green-50/50 p-4 sm:p-6">
                <h4 className="font-bold text-purple-900 mb-2 text-sm sm:text-base">AI Prompt Used</h4>
                <p className="text-xs sm:text-sm text-purple-700 leading-relaxed">
                  {transformation.prompt_used}
                </p>
              </div>
            )}

            <div className="text-center clay-inset bg-pink-50/50 p-3 sm:p-4">
              <Heart className="w-4 h-4 sm:w-6 sm:h-6 mx-auto mb-2 text-pink-500" />
              <p className="text-xs sm:text-sm text-purple-700">
                Share your magical transformation with friends and family!
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
