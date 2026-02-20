import React from "react";
import PricingSection from "../components/home/PricingSection";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function PricingPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="header-font text-4xl md:text-6xl text-gray-800 mb-4">Our Magical Plans</h1>
        <p className="body-font-light text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
          Choose the perfect plan to start your pet's artistic journey.
        </p>
      </header>
      
      <PricingSection />

      <div className="funky-card bg-[var(--brand-lavender)] p-8 md:p-12 text-center">
        <h2 className="header-font text-3xl md:text-5xl text-gray-800 mb-4">
          Ready to Get Started?
        </h2>
        <p className="body-font-light text-lg md:text-xl max-w-2xl mx-auto text-gray-700 mb-8">
          Upload a photo now and see the magic for yourself!
        </p>
        <Link to={createPageUrl("Upload")}>
          <Button className="funky-button bg-[var(--brand-orange)] text-white text-xl px-12 py-4">
            Upload Now <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </Link>
      </div>
    </div>
  );
}