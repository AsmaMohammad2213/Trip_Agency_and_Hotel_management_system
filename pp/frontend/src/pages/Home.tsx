import React from 'react';
import HeroSection from '../components/HeroSection';
import Destinations from '../components/Destinations';
import Hotels from '../components/Hotels';
import Features from '../components/Features';

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Destinations />
      <Hotels />
      <Features />
    </div>
  );
}