import React from 'react';
import { Hero } from '../components/Hero';
import { Features } from '../components/Features';
import { HowItWorks } from '../components/HowItWorks';
import { SupportedUses } from '../components/SupportedUses';
import { FAQ } from '../components/FAQ';

export function Home() {
  return (
    <main>
      <Hero />
      <Features />
      <HowItWorks />
      <SupportedUses />
      <FAQ />
    </main>
  );
}
