import React from 'react'
import {
  ScissorsIcon,
  InstagramIcon,
  FacebookIcon,
  TwitterIcon,
} from 'lucide-react'
export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <ScissorsIcon className="w-6 h-6" />
              <span className="font-bold text-xl">StyleHub</span>
            </div>
            <p className="text-gray-400">
              Your premier destination for professional hair care and styling.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-400 hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#gallery" className="text-gray-400 hover:text-white">
                  Gallery
                </a>
              </li>
              <li>
                <a href="#team" className="text-gray-400 hover:text-white">
                  Our Team
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-white">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Monday - Friday: 9AM - 8PM</li>
              <li>Saturday: 10AM - 6PM</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <TwitterIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StyleHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
