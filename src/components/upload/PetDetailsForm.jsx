import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Heart } from "lucide-react";

const DOG_BREEDS = [
  "Golden Retriever", "Labrador Retriever", "German Shepherd", "Bulldog", "Poodle", 
  "Beagle", "Siberian Husky", "Dachshund", "Yorkshire Terrier", "Boxer", "Other"
];

const CAT_BREEDS = [
  "Domestic Shorthair", "Persian", "Siamese", "Maine Coon", "British Shorthair",
  "Ragdoll", "Bengal", "Russian Blue", "Scottish Fold", "Sphynx", "Other"
];

export default function PetDetailsForm({ uploadedFile, onSubmit, onBack }) {
  const [formData, setFormData] = useState({
    pet_name: "",
    pet_type: "",
    breed: "",
    description: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.pet_name && formData.pet_type) {
      onSubmit(formData);
    }
  };

  const breeds = formData.pet_type === "dog" ? DOG_BREEDS : CAT_BREEDS;

  return (
    <div className="grid md:grid-cols-2 gap-8 p-8">
      {/* Photo Preview */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-purple-900">Your Photo</h3>
        <div className="clay-inset overflow-hidden">
          <img
            src={uploadedFile.url}
            alt="Uploaded pet"
            className="w-full h-80 object-cover"
          />
        </div>
        <p className="text-sm text-purple-600 text-center">
          Looking great! Now let's add some details about your furry friend.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-bold text-purple-900 mb-2">Pet Details</h3>
          <p className="text-purple-700 mb-6">
            Tell us about your pet to create the perfect transformation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="pet_name" className="text-purple-800 font-medium">
              Pet Name *
            </Label>
            <Input
              id="pet_name"
              placeholder="What's your pet's name?"
              value={formData.pet_name}
              onChange={(e) => setFormData({...formData, pet_name: e.target.value})}
              className="clay-inset border-0 bg-white/60 focus:bg-white/80"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="text-purple-800 font-medium">Pet Type *</Label>
            <Select
              value={formData.pet_type}
              onValueChange={(value) => setFormData({...formData, pet_type: value, breed: ""})}
            >
              <SelectTrigger className="clay-inset border-0 bg-white/60 focus:bg-white/80">
                <SelectValue placeholder="Is this a dog or cat?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="dog">🐕 Dog</SelectItem>
                <SelectItem value="cat">🐱 Cat</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.pet_type && (
            <div className="space-y-2">
              <Label className="text-purple-800 font-medium">Breed (Optional)</Label>
              <Select
                value={formData.breed}
                onValueChange={(value) => setFormData({...formData, breed: value})}
              >
                <SelectTrigger className="clay-inset border-0 bg-white/60 focus:bg-white/80">
                  <SelectValue placeholder="Select breed (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {breeds.map((breed) => (
                    <SelectItem key={breed} value={breed}>{breed}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="description" className="text-purple-800 font-medium">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              placeholder="Tell us anything special about your pet..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="clay-inset border-0 bg-white/60 focus:bg-white/80 h-20"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="clay-button bg-white/60 hover:bg-white/80 text-purple-700 flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!formData.pet_name || !formData.pet_type}
              className="clay-button bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white flex-1"
            >
              Next Step
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </form>

        <div className="clay-inset bg-purple-50/50 p-4 text-center">
          <Heart className="w-5 h-5 mx-auto mb-2 text-purple-600" />
          <p className="text-sm text-purple-700">
            We love hearing about your furry friends! The more details you share, 
            the better we can customize their magical transformation.
          </p>
        </div>
      </div>
    </div>
  );
}