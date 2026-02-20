
import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Transformation } from "@/entities/all";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

import HeroUploadZone from "../components/home/HeroUploadZone";
import FeaturedTransformations from "../components/home/FeaturedTransformations";
import StyleShowcase from "../components/home/StyleShowcase";
import PricingSection from "../components/home/PricingSection";
import StatsCards from "../components/home/StatsCards";

export default function HomePage() {
  const [recentTransformations, setRecentTransformations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadRecentTransformations = useCallback(async () => {
    setIsLoading(true); // Set loading to true at the start of the fetch
    try {
      const transformations = await Transformation.list("-created_date", 6);
      setRecentTransformations(transformations);
    } catch (error) {
      console.error("Error loading transformations:", error);
    }
    setIsLoading(false);
  }, []); // Empty dependency array as this function doesn't depend on any props or state from its scope that would change.

  useEffect(() => {
    loadRecentTransformations();
  }, [loadRecentTransformations]); // Add loadRecentTransformations to the dependency array

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section>
        <div className="funky-card text-center p-8 md:p-12">
           <div className="inline-flex items-center gap-3 mb-8 funky-button bg-yellow-400 text-yellow-900 px-6 py-3">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span className="text-lg">AI-Powered Pet Art</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          
          <h1 className="header-font text-4xl md:text-6xl lg:text-7xl text-gray-800 mb-6">
            Transform Your
            <span className="block text-[var(--brand-purple)]">
              Furry Friends
            </span>
          </h1>
          
          <p className="body-font-light text-lg md:text-xl max-w-4xl mx-auto text-gray-600 leading-relaxed mb-12">
            Watch your beloved cats and dogs come to life as magical creatures, 
            superheroes, or fantastical beings through our premium AI-powered transformation service.
          </p>

          <HeroUploadZone />
        </div>
      </section>

      {/* Stats Cards */}
      <StatsCards />

      {/* Style Showcase */}
      <StyleShowcase />

      {/* Featured Transformations */}
      <FeaturedTransformations 
        transformations={recentTransformations} 
        isLoading={isLoading} 
      />

      {/* Pricing */}
      <PricingSection />

      {/* CTA Section */}
      <section>
        <div className="funky-card bg-[var(--brand-lavender)] p-8 md:p-12 text-center">
          <h2 className="header-font text-3xl md:text-5xl text-gray-800 mb-4">
            Ready to Create Magic?
          </h2>
          <p className="body-font-light text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
            Join thousands of happy pet parents who've transformed their furry friends.
          </p>
          <Link to={createPageUrl("Upload")}>
            <Button className="funky-button bg-[var(--brand-orange)] text-white text-xl px-12 py-4">
              <Upload className="w-6 h-6 mr-3" />
              Start Transforming
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
