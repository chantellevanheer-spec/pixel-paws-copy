import React from "react";
import { Sparkles, Crown, Shield, Star, Palette, Zap } from "lucide-react";

const styleIcons = {
  magical: Sparkles,
  royal: Crown,
  superhero: Shield,
  fantastical: Star,
  artistic: Palette,
  funny: Zap
};

const styleColors = {
  magical: "from-purple-200 to-pink-200",
  royal: "from-amber-200 to-yellow-200",
  superhero: "from-red-200 to-orange-200",
  fantastical: "from-blue-200 to-cyan-200",
  artistic: "from-green-200 to-teal-200",
  funny: "from-pink-200 to-rose-200"
};

export default function GalleryStats({ transformations, petPhotos, stats }) {
  const totalTransformations = transformations.length;
  const uniquePets = new Set(transformations.map(t => t.pet_photo_id)).size;
  const favoriteStyle = Object.entries(stats).sort(([,a], [,b]) => b - a)[0]?.[0];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="clay-element bg-white/60 p-6 text-center">
        <div className="w-12 h-12 mx-auto clay-button bg-gradient-to-br from-purple-200 to-purple-300 flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6 text-purple-600" />
        </div>
        <h3 className="text-2xl font-bold text-purple-900">{totalTransformations}</h3>
        <p className="text-purple-700">Total Transformations</p>
      </div>

      <div className="clay-element bg-white/60 p-6 text-center">
        <div className="w-12 h-12 mx-auto clay-button bg-gradient-to-br from-pink-200 to-pink-300 flex items-center justify-center mb-4">
          <span className="text-2xl">🐾</span>
        </div>
        <h3 className="text-2xl font-bold text-purple-900">{uniquePets}</h3>
        <p className="text-purple-700">Pets Transformed</p>
      </div>

      {favoriteStyle && (
        <div className="clay-element bg-white/60 p-6 text-center">
          <div className={`w-12 h-12 mx-auto clay-button bg-gradient-to-br ${styleColors[favoriteStyle]} flex items-center justify-center mb-4`}>
            {React.createElement(styleIcons[favoriteStyle], { className: "w-6 h-6 text-purple-600" })}
          </div>
          <h3 className="text-lg font-bold text-purple-900 capitalize">{favoriteStyle}</h3>
          <p className="text-purple-700">Favorite Style</p>
        </div>
      )}
    </div>
  );
}