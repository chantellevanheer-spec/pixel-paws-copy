import React from "react";
import { Sparkles, Crown, Zap, Palette, Shield, Star } from "lucide-react";

const styles = [
  { name: "Magical", icon: Sparkles, color: "bg-purple-200 text-purple-800" },
  { name: "Royal", icon: Crown, color: "bg-amber-200 text-amber-800" },
  { name: "Superhero", icon: Shield, color: "bg-blue-200 text-blue-800" },
  { name: "Fantastical", icon: Star, color: "bg-cyan-200 text-cyan-800" },
  { name: "Artistic", icon: Palette, color: "bg-green-200 text-green-800" },
  { name: "Funny", icon: Zap, color: "bg-pink-200 text-pink-800" }
];

export default function StyleShowcase() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="header-font text-3xl md:text-5xl text-gray-800 mb-4">
          Choose Your Pet's Style
        </h2>
        <p className="body-font-light text-lg md:text-xl max-w-3xl mx-auto text-gray-600 leading-relaxed">
          From enchanting fairy tales to hilarious heroics, pick the perfect theme for your furry friend's one-of-a-kind portrait.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {styles.map((style) => (
          <div key={style.name} className="funky-card p-6 text-center funky-card-hover">
            <div className={`funky-button w-20 h-20 mx-auto flex items-center justify-center mb-4 ${style.color}`}>
              <style.icon className="w-10 h-10" />
            </div>
            <h3 className="header-font text-2xl text-gray-800">
              {style.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}