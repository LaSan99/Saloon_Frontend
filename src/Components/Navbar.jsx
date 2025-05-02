import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { ScissorsIcon } from 'lucide-react';

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  // Navigation items with optional authentication requirements
  const navItems = [
    { name: 'Home', path: '/', auth: false },
    { name: 'Services', path: '/service', auth: false },
    { name: 'My Profile', path: '/profile', auth: true },
    { name: 'Contact', path: '/contact', auth: false },
  ];

  // Handle logout logic
  const handleLogout = (e) => {
    e.preventDefault();
    console.log('Logout clicked');
    
    try {
      // Remove all auth-related data
      localStorage.clear();
      console.log('LocalStorage cleared');
      
      // Force a page reload and redirect
      // window.location.href = '/login';
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Toggle mobile menu
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ScissorsIcon className="w-6 h-6" />
            <span className="font-bold text-xl">StyleHub</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {navItems.map((item) =>
                (!item.auth || (item.auth && token)) && (
                  <li key={item.name}>
                    <Link
                      to={item.path}
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Auth Buttons for Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!token ? (
              <>
                <Link to="/login">
                  <Button variant="secondary">Login</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <div className="space-y-1.5">
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 ${isMenuOpen ? 'opacity-0' : ''}`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-gray-600 transition-transform ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              ></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <nav className="flex flex-col space-y-4">
              {navItems.map((item) =>
                (!item.auth || (item.auth && token)) && (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-600 hover:text-gray-900 px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )
              )}

              {/* Authentication Buttons for Mobile */}
              {!token ? (
                <>
                  <Link 
                    to="/login" 
                    className="px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button variant="secondary" className="w-full">
                      Login
                    </Button>
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-4 py-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </>
              ) : (
                <button
                  onClick={(e) => {
                    handleLogout(e);
                    setIsMenuOpen(false);
                  }}
                  className="mx-4 px-4 py-2 text-sm font-medium text-gray-900 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none w-full"
                >
                  Logout
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};