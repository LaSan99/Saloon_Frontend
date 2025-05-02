import React from 'react'
export const GallerySection = () => {
  const images = [
    {
      url: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?ixlib=rb-4.0.3',
      alt: 'Haircut style',
    },
    {
      url: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3',
      alt: 'Salon interior',
    },
    {
      url: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?ixlib=rb-4.0.3',
      alt: 'Hair coloring',
    },
    {
      url: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3',
      alt: 'Hair styling',
    },
  ]
  return (
    <section className="py-24 w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900">Our Gallery</h2>
          <p className="mt-4 text-gray-600">Showcase of our finest work</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
