import React from "react";
import { Sparkles, Users, Palette, Trophy } from "lucide-react";

export default function StatsCards() {
  const stats = [
    {
      icon: Sparkles,
      value: "50,000+",
      label: "Magical Transformations",
      color: "bg-yellow-400 text-yellow-900"
    },
    {
      icon: Users,
      value: "10,000+",
      label: "Happy Pet Parents",
      color: "bg-[var(--brand-pink)] text-pink-900"
    },
    {
      icon: Palette,
      value: "6+",
      label: "Artistic Styles",
      color: "bg-[var(--brand-blue)] text-white"
    },
    {
      icon: Trophy,
      value: "4.9/5",
      label: "Average Rating",
      color: "bg-[var(--brand-orange)] text-white"
    },
  ];

  return (
    <section>
      <div className="text-center mb-8">
        <h2 className="header-font text-3xl md:text-4xl text-gray-800">
          Trusted by Pet Lovers Worldwide
        </h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="funky-card p-6 text-center funky-card-hover">
            <div className={`funky-button w-20 h-20 mx-auto flex items-center justify-center mb-4 ${stat.color}`}>
              <stat.icon className="w-10 h-10" />
            </div>
            
            <div className="header-font text-4xl font-bold text-gray-800 mb-2">
              {stat.value}
            </div>
            
            <div className="body-font text-lg font-medium text-gray-600">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}