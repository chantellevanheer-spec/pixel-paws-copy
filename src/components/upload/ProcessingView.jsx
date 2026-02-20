import React from "react";
import { Sparkles, Heart, Star, CheckCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function ProcessingView({ petPhoto, selectedStyle, isProcessing }) {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 95) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);

      setTimeout(() => {
        setProgress(100);
        clearInterval(interval);
      }, 8000);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  return (
    <div className="p-12 text-center">
      <div className="max-w-md mx-auto">
        {isProcessing ? (
          <>
            <div className="w-24 h-24 mx-auto clay-button bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center mb-6 animate-pulse">
              <Sparkles className="w-12 h-12 text-purple-600" />
            </div>
            
            <h3 className="text-3xl font-bold text-purple-900 mb-4">
              Creating Magic for {petPhoto.pet_name}
            </h3>
            
            <p className="text-lg text-purple-700 mb-8">
              Our AI artists are working on a {selectedStyle.name.toLowerCase()} transformation
            </p>

            <div className="space-y-4 mb-8">
              <Progress value={progress} className="clay-inset h-3 bg-purple-100" />
              <p className="text-sm text-purple-600">
                {progress < 30 ? "Analyzing your pet..." : 
                 progress < 60 ? "Applying magical effects..." :
                 progress < 90 ? "Adding finishing touches..." :
                 "Almost ready!"}
              </p>
            </div>

            <div className="clay-inset bg-purple-50/50 p-6 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Star className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-medium">Fun Fact</span>
              </div>
              <p className="text-sm text-purple-600">
                Our AI considers your pet's unique features, breed characteristics, 
                and the style you chose to create a one-of-a-kind masterpiece!
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="w-24 h-24 mx-auto clay-button bg-gradient-to-br from-green-200 to-green-300 flex items-center justify-center mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            
            <h3 className="text-3xl font-bold text-purple-900 mb-4">
              Magic Complete! ✨
            </h3>
            
            <p className="text-lg text-purple-700 mb-6">
              {petPhoto.pet_name}'s transformation is ready! 
              You'll be redirected to your gallery shortly.
            </p>

            <div className="clay-inset bg-green-50/50 p-6">
              <Heart className="w-8 h-8 mx-auto mb-3 text-green-600" />
              <p className="text-green-700 font-medium">
                We hope you love {petPhoto.pet_name}'s new magical look!
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}