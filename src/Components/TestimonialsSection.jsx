import React from 'react'
import { StarIcon } from 'lucide-react'
export const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      text: "The best salon experience I've ever had. Professional, friendly, and amazing results!",
      rating: 5,
    },
    {
      name: 'Michael Chen',
      text: 'Incredible attention to detail and wonderful atmosphere. Highly recommended!',
      rating: 5,
    },
  ]
  return (
    <section className="py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16">
          What Our Clients Say
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-lg">
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
              <p className="font-medium">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
