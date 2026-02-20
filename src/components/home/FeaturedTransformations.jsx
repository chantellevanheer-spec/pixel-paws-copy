import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function FeaturedTransformations({ transformations, isLoading }) {
  if (isLoading) {
    return (
      <section>
        <div className="text-center mb-8"><h2 className="header-font text-3xl md:text-5xl text-gray-800">Recent Transformations</h2></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="funky-card overflow-hidden p-3 space-y-3">
              <Skeleton className="w-full h-64 rounded-xl" />
              <div className="p-3">
                <Skeleton className="h-6 w-32 mb-2 rounded-md" />
                <Skeleton className="h-4 w-24 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (transformations.length === 0) return null;

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="header-font text-3xl md:text-5xl text-gray-800 mb-4">
          See The Magic
        </h2>
        <p className="body-font-light text-lg md:text-xl text-gray-600">
          Check out what other pet parents have created!
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {transformations.map((transformation) => (
          <div key={transformation.id} className="funky-card funky-card-hover overflow-hidden p-2 group">
            <div className="relative">
              <img
                src={transformation.transformed_image_url}
                alt={`${transformation.style} transformation`}
                className="w-full h-80 object-cover rounded-xl"
              />
              <div className="absolute bottom-2 left-2 right-2 flex justify-between items-end">
                <Badge className="funky-button text-sm bg-white text-[var(--brand-purple)]">
                  {transformation.style}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}