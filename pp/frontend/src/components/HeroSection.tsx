import React from 'react';
import SearchForm from './SearchForm';

export default function HeroSection() {
  return (
    <div className="relative h-[600px] bg-cover bg-center" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      
      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          Discover Your Next Adventure
        </h1>
        <p className="text-xl text-gray-200 mb-8 max-w-2xl">
          Explore amazing destinations, find the perfect hotel, and create unforgettable memories with TravelEase.
        </p>
        
        {/* Search Form */}
        <div className="w-full max-w-4xl">
          <SearchForm />
        </div>
        
        {/* Popular Destinations */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <span className="text-white text-sm">Popular:</span>
          <a href="/destinations/paris" className="text-gray-200 hover:text-white text-sm">Paris</a>
          <a href="/destinations/new-york" className="text-gray-200 hover:text-white text-sm">New York</a>
          <a href="/destinations/tokyo" className="text-gray-200 hover:text-white text-sm">Tokyo</a>
          <a href="/destinations/london" className="text-gray-200 hover:text-white text-sm">London</a>
          <a href="/destinations/dubai" className="text-gray-200 hover:text-white text-sm">Dubai</a>
        </div>
      </div>
    </div>
  );
}