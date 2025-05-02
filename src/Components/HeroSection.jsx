import React from 'react'
import { Button } from './Button'
import { ScissorsIcon } from 'lucide-react'
export const HeroSection = () => {
  return (
    <section className="relative w-full min-h-screen bg-white">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3"
          alt="Elegant salon interior"
          className="w-full h-full object-cover opacity-20"
        />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <ScissorsIcon className="w-12 h-12 text-gray-800" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900">
            Your Style, Your Time
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Experience luxury hair care with our expert stylists. Book your
            appointment today and transform your look.
          </p>
          <div className="flex gap-4">
            <Button>Book Appointment</Button>
            <Button variant="secondary">View Services</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
