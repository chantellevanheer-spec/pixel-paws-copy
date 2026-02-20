import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Crown, Zap, Palette, Shield, Star, ArrowLeft, Heart } from "lucide-react";

const styles = [
  {
    id: "magical",
    name: "Magical",
    icon: Sparkles,
    color: "from-purple-200 to-pink-200",
    textColor: "text-purple-700",
    description: "Transform into an enchanting fairy tale creature with sparkles and magic",
    premium: false,
    preview: "🧚‍♀️✨"
  },
  {
    id: "royal",
    name: "Royal",
    icon: Crown,
    color: "from-amber-200 to-yellow-200",
    textColor: "text-amber-700",
    description: "Become pet royalty with crowns, thrones, and majestic backgrounds",
    premium: true,
    preview: "👑🏰"
  },
  {
    id: "superhero",
    name: "Superhero",
    icon: Shield,
    color: "from-red-200 to-orange-200",
    textColor: "text-red-700",
    description: "Epic hero transformations with capes, masks, and city backgrounds",
    premium: true,
    preview: "🦸‍♂️💥"
  },
  {
    id: "fantastical",
    name: "Fantastical",
    icon: Star,
    color: "from-blue-200 to-cyan-200",
    textColor: "text-blue-700",
    description: "Mythical creature transformations like dragons, unicorns, and more",
    premium: true,
    preview: "🦄🐉"
  },
  {
    id: "artistic",
    name: "Artistic",
    icon: Palette,
    color: "from-green-200 to-teal-200",
    textColor: "text-green-700",
    description: "Classic painted masterpieces in Renaissance and artistic styles",
    premium: false,
    preview: "🎨🖼️"
  },
  {
    id: "funny",
    name: "Funny",
    icon: Zap,
    color: "from-pink-200 to-rose-200",
    textColor: "text-pink-700",
    description: "Hilarious and heartwarming moments with silly costumes and poses",
    premium: false,
    preview: "😄🎭"
  }
];

export default function StyleSelector({ petPhoto, onStyleSelect, onBack }) {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const handleStyleClick = (style) => {
    setSelectedStyle(style);
    setTimeout(() => onStyleSelect(style), 300);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-purple-900 mb-2">
          Choose {petPhoto.pet_name}'s Style
        </h3>
        <p className="text-lg text-purple-700">
          Pick the perfect transformation style for your {petPhoto.pet_type}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {styles.map((style) => (
          <div
            key={style.id}
            onClick={() => handleStyleClick(style)}
            className={`clay-element bg-white/60 hover:bg-white/80 p-6 cursor-pointer transition-all duration-300 group ${
              selectedStyle?.id === style.id ? "ring-2 ring-purple-400" : ""
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto clay-button bg-gradient-to-br ${style.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <style.icon className={`w-8 h-8 ${style.textColor}`} />
              </div>
              
              <div className="flex items-center justify-center gap-2 mb-2">
                <h4 className="text-xl font-bold text-purple-900">{style.name}</h4>
                {style.premium && (
                  <Badge className="clay-button bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 text-xs">
                    Premium
                  </Badge>
                )}
              </div>
              
              <div className="text-2xl mb-3">{style.preview}</div>
              
              <p className="text-sm text-purple-700 leading-relaxed">
                {style.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={onBack}
          variant="outline"
          className="clay-button bg-white/60 hover:bg-white/80 text-purple-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Details
        </Button>

        <div className="clay-inset bg-purple-50/50 px-6 py-3">
          <div className="flex items-center gap-2 text-purple-700">
            <Heart className="w-4 h-4" />
            <span className="text-sm font-medium">Click any style to start the magic!</span>
          </div>
        </div>
      </div>
    </div>
  );
}