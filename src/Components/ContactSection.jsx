import React from 'react'
import { MapPinIcon, PhoneIcon, ClockIcon } from 'lucide-react'
import { Button } from './Button'
export const ContactSection = () => {
  return (
    <section className="py-24 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-8">Visit Our Salon</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <MapPinIcon className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Location</h3>
                  <p className="text-gray-600">
                    123 Style Street, Beauty City, BC 12345
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <PhoneIcon className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Contact</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <ClockIcon className="w-6 h-6 text-gray-600" />
                <div>
                  <h3 className="font-medium">Hours</h3>
                  <p className="text-gray-600">Mon-Sat: 9:00 AM - 8:00 PM</p>
                  <p className="text-gray-600">Sunday: Closed</p>
                </div>
              </div>
            </div>
            <Button className="mt-8">Book Now</Button>
          </div>
          <div className="bg-gray-200 rounded-lg h-[400px]">
            {/* Map placeholder - Would integrate with actual map service */}
            <div className="w-full h-full rounded-lg bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  )
}
