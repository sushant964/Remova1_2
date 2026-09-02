import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

const faqs = [
  {
    question: "Is the background remover free?",
    answer: "Yes, you can use our basic background remover for free during this preview period. Simply upload your image and download the result.",
  },
  {
    question: "What image formats are supported?",
    answer: "We currently support JPG, JPEG, PNG, and WEBP formats. Ensure your file size is under 10MB for the best experience.",
  },
  {
    question: "Can I use it on my phone?",
    answer: "Absolutely! Remova is fully optimized for mobile devices. You can take a photo directly from your camera or choose one from your gallery.",
  },
  {
    question: "Will my image have a transparent background?",
    answer: "Yes, once the background is removed, you can download the result as a high-quality PNG file with a fully transparent background.",
  },
  {
    question: "How long does background removal take?",
    answer: "Our AI processes most images in just a few seconds. High-resolution images or complex backgrounds might take slightly longer.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl ring-1 ring-gray-100 overflow-hidden shadow-sm"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span className="text-base font-bold text-gray-900">{faq.question}</span>
                {openIndex === index ? (
                  <ChevronUp className="h-5 w-5 text-gray-500 shrink-0 ml-4" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500 shrink-0 ml-4" />
                )}
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="px-6 pb-6 text-gray-600">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
