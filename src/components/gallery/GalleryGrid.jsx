
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryGrid({ transformations, petPhotos, onSelect, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(6).fill(0).map((_, i) => (
          <div key={i} className="funky-card overflow-hidden">
            <Skeleton className="w-full h-64" />
            <div className="p-4">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {transformations.map((transformation) => {
        const petPhoto = petPhotos[transformation.pet_photo_id]; // Changed from getPetPhotoById
        const isVariation = transformation.style?.includes('_variation');
        
        return (
          <div
            key={transformation.id}
            className="funky-card funky-card-hover overflow-hidden p-2 group cursor-pointer"
            onClick={() => onSelect(transformation)} // Changed from onSelectTransformation
          >
            <div className="relative">
              <img
                src={transformation.transformed_image_url}
                alt={`${transformation.style} transformation`}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                <div className="flex gap-2">
                  <Badge className="funky-button text-sm bg-white text-[var(--brand-purple)]">
                    {transformation.style.replace('_variation', '')}
                  </Badge>
                  {isVariation && (
                    <Badge className="funky-button text-xs bg-green-200 text-green-800">
                      Variation
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
