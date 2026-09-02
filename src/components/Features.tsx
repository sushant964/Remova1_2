import React from 'react';
import { Sparkles, Layers, Zap, Smartphone } from 'lucide-react';

const features = [
  {
    name: 'AI Background Removal',
    description: 'Our advanced neural network perfectly isolates your subject from any complex background in seconds.',
    icon: Sparkles,
  },
  {
    name: 'Transparent PNGs',
    description: 'Download high-quality PNG files with perfect alpha channels, ready to drop right into your designs.',
    icon: Layers,
  },
  {
    name: 'Fast Processing',
    description: 'Experience blazing fast performance. No waiting in queues, get your results almost instantly.',
    icon: Zap,
  },
  {
    name: 'Works on Any Device',
    description: 'Use Remova on your phone, tablet, or desktop. It works perfectly everywhere right in your browser.',
    icon: Smartphone,
  },
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Powerful Features</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need for perfect cutouts
          </p>
        </div>
        
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col bg-white p-8 rounded-2xl shadow-sm ring-1 ring-gray-100">
                <dt className="flex items-center gap-x-3 text-lg font-semibold leading-7 text-gray-900 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                </dt>
                <dd className="flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="font-bold text-gray-900 mb-2">{feature.name}</p>
                  <p className="flex-auto">{feature.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
