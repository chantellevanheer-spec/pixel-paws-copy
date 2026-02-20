import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is Pixel Paws?",
    answer: "Pixel Paws is an AI-powered service that transforms your pet photos into beautiful, unique pieces of art in various styles like 'Magical', 'Superhero', and 'Royal'."
  },
  {
    question: "How do I get started?",
    answer: "It's simple! Just go to the 'Upload' page, select a clear photo of your pet, fill in their details, choose a style, and our AI will handle the rest."
  },
  {
    question: "What kind of photos work best?",
    answer: "For the best results, use a high-quality, well-lit photo where your pet's face is clearly visible. Avoid blurry images or photos where your pet is too far away."
  },
  {
    question: "How long does a transformation take?",
    answer: "Our AI is pretty fast! A transformation usually takes between 10-30 seconds, depending on the server load. You'll be redirected to your gallery once it's complete."
  },
  {
    question: "Can I download my transformed images?",
    answer: "Absolutely! From your gallery, you can click on any image to open a detailed view where you'll find a 'Download' button."
  },
  {
    question: "What's the difference between Free and Premium plans?",
    answer: "The Free plan allows you to create a limited number of transformations with basic styles. Our Premium plans unlock unlimited creations, exclusive styles, higher resolution downloads, and priority processing."
  }
];

export default function HelpPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="header-font text-4xl md:text-6xl text-gray-800">Help Center</h1>
        <p className="body-font-light text-lg text-gray-600 mt-2">Frequently Asked Questions</p>
      </header>
      <div className="max-w-4xl mx-auto funky-card p-4 md:p-8">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-b-2 border-[var(--brand-purple)] border-opacity-20">
              <AccordionTrigger className="header-font text-xl text-left text-gray-800 hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="body-font-light text-base text-gray-600">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}