import React from 'react';

export function About() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8 min-h-screen">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <p className="text-base font-semibold leading-7 text-indigo-600">Our Mission</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">About Remova</h1>
        <p className="mt-6 text-xl leading-8">
          At Remova, we believe that creating professional imagery shouldn't require complex software or hours of manual editing.
        </p>
        <div className="mt-10 max-w-2xl">
          <p>
            We built this platform to empower creators, e-commerce managers, and everyday users to achieve perfect image cutouts in seconds. Using advanced artificial intelligence, Remova analyzes your images to understand the subject and precisely separate it from any background, even tricky edges like hair or fur.
          </p>
          <p className="mt-8">
            Whether you are designing a product catalog, crafting social media content, or just having fun with personal photos, our goal is to make the background removal process completely frictionless so you can focus on being creative.
          </p>
        </div>
      </div>
    </div>
  );
}
