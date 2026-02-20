import React from "react";
import { format } from "date-fns";
import { Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function GalleryList({ transformations, getPetPhotoById, onSelectTransformation, isLoading }) {
  if (isLoading) {
    return (
      <div className="clay-element bg-white/60 divide-y divide-purple-100">
        {Array(5).fill(0).map((_, i) => (
          <div key={i} className="p-4 flex items-center gap-4">
            <Skeleton className="w-20 h-20 rounded-lg" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="clay-element bg-white/60 divide-y divide-purple-100">
      {transformations.map((transformation) => {
        const petPhoto = getPetPhotoById(transformation.pet_photo_id);
        
        return (
          <div
            key={transformation.id}
            className="p-4 flex items-center gap-4 hover:bg-white/40 cursor-pointer transition-colors duration-200"
            onClick={() => onSelectTransformation(transformation)}
          >
            <div className="w-20 h-20 clay-inset overflow-hidden">
              <img
                src={transformation.transformed_image_url}
                alt={`${transformation.style} transformation`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-purple-900">
                  {petPhoto?.pet_name || "Unknown Pet"}
                </h3>
                <Badge className="clay-button bg-gradient-to-r from-purple-100 to-pink-100 text-purple-800 text-xs">
                  {transformation.style}
                </Badge>
                {transformation.is_premium && (
                  <Badge className="clay-button bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs">
                    Premium
                  </Badge>
                )}
              </div>
              <p className="text-sm text-purple-600">
                Created {format(new Date(transformation.created_date), "MMM d, yyyy 'at' h:mm a")}
              </p>
              {petPhoto?.breed && (
                <p className="text-xs text-purple-500 mt-1">
                  {petPhoto.breed} • {petPhoto.pet_type}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              {transformation.rating && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm text-purple-700">{transformation.rating}</span>
                </div>
              )}
              <Button 
                size="icon" 
                variant="ghost"
                className="clay-button bg-white/60 hover:bg-white/80 text-purple-700"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(transformation.transformed_image_url, '_blank');
                }}
              >
                <Download className="w-4 h-4" />
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
}