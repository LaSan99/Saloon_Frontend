import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../Components/Button';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Custom theme colors matching the booking page
  const theme = {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#E0E0E0',
    lightGray: '#F5F5F5',
    mediumGray: '#BDBDBD',
    darkGray: '#424242'
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Please login to view your profile');
          setLoading(false);
          return;
        }

        // Fetch user profile
        const userResponse = await axios.get('http://localhost:3000/api/v1/users/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setUser(userResponse.data.data);

        // Fetch user's bookings
        const bookingsResponse = await axios.get('http://localhost:3000/api/v1/appointments/my-appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setBookings(bookingsResponse.data.appointments);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Custom button component with black and white styling
  const CustomButton = ({ variant = 'primary', onClick, children }) => {
    const baseStyle = "px-6 py-3 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center";
    
    const variantStyles = {
      primary: `bg-black text-white hover:bg-gray-800`,
      secondary: `bg-white text-black border border-black hover:bg-gray-100`,
      outline: `bg-transparent text-black border border-gray-300 hover:bg-gray-50`
    };
    
    return (
      <button
        className={`${baseStyle} ${variantStyles[variant]}`}
        onClick={onClick}
      >
        {children}
      </button>
    );
  };

  // Get status badge styling
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'upcoming':
        return 'bg-black text-white';
      case 'completed':
        return 'bg-gray-200 text-gray-800';
      case 'cancelled':
        return 'bg-gray-300 text-black';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="border border-black bg-gray-50 text-black p-4 rounded-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Profile Header */}
      <div className="mb-10">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-6">
          {/* Profile Image */}
          <div className="relative">
            <div className="w-36 h-36 rounded-full overflow-hidden border-2 border-black p-1">
              <img
                src={user?.profileImage || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiIGZpbGw9IiM5Y2EzYWYiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGRvbWluYW50LWJhc2VsaW5lPSJtaWRkbGUiPk5vIFByb2ZpbGUgSW1hZ2U8L3RleHQ+PC9zdmc+'}
                alt={user?.name}
                className="w-full h-full rounded-full object-cover grayscale"
              />
            </div>
            <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md border border-gray-200 hover:bg-gray-100 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold tracking-tight">{user?.name}</h1>
            <p className="text-gray-600 mt-1">{user?.email}</p>
            
            <div className="mt-6 flex flex-wrap gap-4 justify-center md:justify-start">
              <CustomButton variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                </svg>
                Edit Profile
              </CustomButton>
              <CustomButton onClick={() => navigate('/service')}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Book Appointment
              </CustomButton>
            </div>
          </div>
        </div>

        {/* User Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
            <span className="block text-3xl font-bold text-black">{bookings.filter(b => b.status.toLowerCase() === 'upcoming').length}</span>
            <span className="text-gray-600 text-sm">Upcoming</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
            <span className="block text-3xl font-bold text-black">{bookings.filter(b => b.status.toLowerCase() === 'completed').length}</span>
            <span className="text-gray-600 text-sm">Completed</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
            <span className="block text-3xl font-bold text-black">{bookings.filter(b => b.status.toLowerCase() === 'cancelled').length}</span>
            <span className="text-gray-600 text-sm">Cancelled</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg text-center">
            <span className="block text-3xl font-bold text-black">{bookings.length}</span>
            <span className="text-gray-600 text-sm">Total</span>
          </div>
        </div>
      </div>

      {/* Appointments Section */}
      <div className="mt-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Your Appointments</h2>
          <div className="flex gap-2">
            <button className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
              All
            </button>
            <button className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
              Upcoming
            </button>
            <button className="text-sm border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-50">
              Past
            </button>
          </div>
        </div>
        
        {bookings.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-600 mb-4">You haven't made any bookings yet.</p>
            <CustomButton onClick={() => navigate('/service')} variant="primary">
              Book Your First Appointment
            </CustomButton>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div 
                key={booking._id} 
                className="bg-white border border-gray-200 rounded-lg p-5 hover:border-black transition-colors duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    {/* Service Image */}
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        src={booking.service?.imageUrl1 || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjQiIGhlaWdodD0iNjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzljYTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+'} 
                        alt={booking.service?.name} 
                        className="w-full h-full object-cover grayscale"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/64';
                        }}
                      />
                    </div>
                    
                    {/* Service Details */}
                    <div>
                      <h3 className="font-bold text-lg">{booking.service?.name}</h3>
                      <p className="text-gray-600">with {booking.stylist || 'Assigned Stylist'}</p>
                    </div>
                  </div>
                  
                  {/* Status Badge */}
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(booking.status)}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
                
                {/* Date and Time */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(booking.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{booking.startTime}</span>
                  </div>
                  <div className="ml-auto hidden sm:flex">
                    <CustomButton variant="outline" onClick={() => console.log(`Reschedule booking ${booking._id}`)}>
                      Reschedule
                    </CustomButton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;