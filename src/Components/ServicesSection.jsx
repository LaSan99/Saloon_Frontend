import React from 'react'
import { motion } from 'framer-motion'
import { ScissorsIcon, SparklesIcon } from 'lucide-react'

const cardVariants = {
  initial: {
    y: 50,
    opacity: 0,
    scale: 0.9
  },
  animate: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const titleVariants = {
  initial: {
    y: -20,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
}

export const ServicesSection = () => {
  const services = [
    {
      icon: <ScissorsIcon className="w-6 h-6" />,
      title: 'Haircut & Styling',
      description:
        'Expert cuts and styling for all hair types and preferences.',
    },
    {
      icon: <SparklesIcon className="w-6 h-6" />,
      title: 'Color & Highlights',
      description:
        'Professional coloring services to enhance your natural beauty.',
    },
    {
      icon: <div className="w-6 h-6" />,
      title: 'Treatment & Care',
      description: 'Rejuvenating treatments for healthy, beautiful hair.',
    },
  ]

  return (
    <section className="py-24 bg-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={titleVariants}
        >
          <motion.h2 
            className="text-3xl font-bold text-gray-900"
            variants={titleVariants}
          >
            Our Services
          </motion.h2>
          <motion.p 
            className="mt-4 text-gray-600"
            variants={titleVariants}
          >
            Discover our range of professional services
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-lg shadow-sm text-center hover:shadow-md transition-shadow duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-6"
                whileHover={{ 
                  rotate: 360,
                  transition: { duration: 0.5 }
                }}
              >
                {service.icon}
              </motion.div>
              <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
