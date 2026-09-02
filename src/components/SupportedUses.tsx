import React from 'react';
import { ShoppingBag, UserCircle, Store, Share2, Hexagon, Camera } from 'lucide-react';

const uses = [
  {
    name: 'Product Photos',
    description: 'Create clean, professional product shots with pure white or transparent backgrounds.',
    icon: ShoppingBag,
  },
  {
    name: 'Profile Pictures',
    description: 'Stand out on LinkedIn and social media with a polished, distraction-free headshot.',
    icon: UserCircle,
  },
  {
    name: 'E-commerce',
    description: 'Standardize your entire catalog instantly. Essential for Amazon and Shopify listings.',
    icon: Store,
  },
  {
    name: 'Social Media',
    description: 'Make eye-catching YouTube thumbnails and Instagram posts without the clutter.',
    icon: Share2,
  },
  {
    name: 'Logos & Graphics',
    description: 'Extract logos, signatures, and graphics to use as overlays on other designs.',
    icon: Hexagon,
  },
  {
    name: 'Personal Photos',
    description: 'Remove photobombers or messy rooms before sharing with friends and family.',
    icon: Camera,
  },
];

export function SupportedUses() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Endless Possibilities</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Perfect for any use case
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {uses.map((use) => (
              <div key={use.name} className="flex flex-col items-start bg-gray-50 p-8 rounded-2xl ring-1 ring-gray-100 hover:shadow-md transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
                  <use.icon className="h-6 w-6 text-indigo-600" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{use.name}</h3>
                <p className="text-sm leading-6 text-gray-600">
                  {use.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
