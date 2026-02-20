
import React from "react";
import { Check, Star, Crown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";

const plans = [
  {
    name: "Free",
    price: "0",
    features: ["3 transformations", "Basic styles", "Standard resolution"],
    icon: Sparkles,
    color: "bg-purple-200",
    buttonColor: "bg-purple-400 text-white"
  },
  {
    name: "Premium",
    price: "9.99",
    features: ["Unlimited transformations", "All premium styles", "High resolution downloads", "Priority processing"],
    icon: Crown,
    color: "bg-amber-200",
    buttonColor: "bg-amber-400 text-white"
  },
  {
    name: "Pro",
    price: "19.99",
    features: ["Everything in Premium", "Bulk processing", "API access", "Commercial license"],
    icon: Star,
    color: "bg-blue-200",
    buttonColor: "bg-blue-400 text-white"
  }
];

export default function PricingSection() {
  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="header-font text-3xl md:text-5xl text-gray-800 mb-4">
          Choose Your Magic Plan
        </h2>
        <p className="body-font-light text-lg md:text-xl max-w-3xl mx-auto text-gray-600">
          From free trials to unlimited creations, find the perfect plan for your artistic adventures.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div key={plan.name} className={`funky-card funky-card-hover p-8 text-center flex flex-col ${plan.color}`}>
            <div className={`funky-button w-20 h-20 mx-auto flex items-center justify-center mb-6 bg-white`}>
              <plan.icon className="w-10 h-10 text-[var(--brand-purple)]" />
            </div>

            <h3 className="header-font text-4xl text-gray-800 mb-3">
              {plan.name}
            </h3>

            <div className="mb-6">
              <span className="header-font text-5xl text-gray-800">
                ${plan.price}
              </span>
              {plan.price !== "0" && <span className="body-font text-lg text-gray-600">/mo</span>}
            </div>

            <ul className="space-y-3 mb-8 text-left body-font text-gray-700 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="funky-button w-6 h-6 flex-shrink-0 flex items-center justify-center bg-green-300 text-green-900">
                    <Check className="w-4 h-4" />
                  </div>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>

            <Link to={createPageUrl("Pricing")}>
              <Button className={`w-full funky-button text-xl py-3 ${plan.buttonColor}`}>
                {plan.name === "Free" ? "Start Free" : `Get ${plan.name}`}
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
