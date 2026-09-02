import React from 'react';

const steps = [
  {
    name: 'Upload Your Image',
    description: 'Drag and drop or select an image from your device. We support high-resolution JPG, PNG, and WEBP files.',
    number: '01',
  },
  {
    name: 'Remove the Background',
    description: 'Our AI automatically detects the main subject and cleanly cuts it out with perfect edges, even around hair.',
    number: '02',
  },
  {
    name: 'Download Your PNG',
    description: 'Save your new image with a transparent background in stunning quality, ready to use anywhere.',
    number: '03',
  },
];

export function HowItWorks() {
  return (
    <div className="py-24 sm:py-32 bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            How It Works
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Get perfect transparent backgrounds in three simple steps.
          </p>
        </div>
        
        <div className="mx-auto max-w-5xl mt-16">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {steps.map((step, stepIdx) => (
              <div key={step.name} className="relative flex flex-col items-center text-center">
                <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-xl font-bold text-indigo-600 ring-8 ring-white shadow-sm">
                  {step.number}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900">{step.name}</h3>
                <p className="text-base text-gray-600 max-w-sm">{step.description}</p>
                
                {/* Connector line for desktop */}
                {stepIdx !== steps.length - 1 ? (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gray-100 -z-10" />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
