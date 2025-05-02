import React from 'react'
import { Button } from './Button'
import { CheckIcon } from 'lucide-react'
export const PricingSection = () => {
  const services = [
    {
      name: "Women's Haircut",
      price: '45',
      duration: '60 min',
    },
    {
      name: "Men's Haircut",
      price: '35',
      duration: '45 min',
    },
    {
      name: 'Color & Highlights',
      price: '120',
      duration: '120 min',
    },
    {
      name: 'Hair Treatment',
      price: '75',
      duration: '90 min',
    },
  ]
  return (
    <section className="py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Pricing</h2>
          <p className="mt-4 text-gray-600">
            Transparent pricing for our services
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-4">{service.name}</h3>
              <p className="text-3xl font-bold mb-4">${service.price}</p>
              <div className="flex items-center text-gray-600 mb-4">
                <CheckIcon className="w-5 h-5 mr-2" />
                <span>{service.duration}</span>
              </div>
              <Button variant="secondary" className="w-full">
                Book Now
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
