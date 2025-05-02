import React, { useState, useEffect } from 'react';
import { FaSearch, FaArrowLeft, FaCalendar, FaClock, FaUser, FaSync, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDate, setFilterDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [sortField, setSortField] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [updatingStatus, setUpdatingStatus] = useState({});

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view bookings');
        toast.error('Please login to view bookings');
        navigate('/login');
        return;
      }

      const response = await fetch('http://localhost:3000/api/v1/appointments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch bookings');
      }

      const data = await response.json();
      if (data.status === 'success') {
        setBookings(data.appointments || []);
      } else {
        throw new Error(data.message || 'Failed to fetch bookings');
      }
    } catch (error) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (bookingId, newStatus) => {
    try {
      setUpdatingStatus(prev => ({ ...prev, [bookingId]: true }));
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to update booking status');
        navigate('/login');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/v1/appointments/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update booking status');
      }

      const data = await response.json();
      if (data.status === 'success') {
        toast.success('Booking status updated successfully');
        fetchBookings();
      } else {
        throw new Error(data.message || 'Failed to update booking status');
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUpdatingStatus(prev => ({ ...prev, [bookingId]: false }));
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSort = (field) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const getSortIcon = (field) => {
    if (field !== sortField) return <FaSort className="ml-1" />;
    return sortOrder === 'asc' ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  const filteredBookings = bookings.filter(booking => {
    // Check if booking and its properties exist
    if (!booking) return false;

    const matchesSearch = searchTerm === '' || (
      (booking.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.service?.name || '').toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    const matchesStatus = filterStatus === 'all' || 
      (booking.status || '').toLowerCase() === filterStatus.toLowerCase();
    
    const matchesDate = !filterDate || booking.date === filterDate;

    return matchesSearch && matchesStatus && matchesDate;
  });

  // Update the sort function to handle undefined values
  const getSortValue = (booking, field) => {
    if (!booking) return '';
    
    // Handle nested fields like 'user.name'
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      return (booking[parent]?.[child] || '').toLowerCase();
    }
    
    // Handle direct fields
    return (booking[field] || '').toLowerCase();
  };

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    const aValue = getSortValue(a, sortField);
    const bValue = getSortValue(b, sortField);
    const multiplier = sortOrder === 'asc' ? 1 : -1;
    return aValue > bValue ? multiplier : -multiplier;
  });

  // Update pagination to use sorted bookings
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = sortedBookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedBookings.length / itemsPerPage);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-2xl font-bold">Booking Management</h1>
        </div>
        <button
          onClick={fetchBookings}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <FaSync className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by customer or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>
        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>

      {/* Bookings Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-4 text-center">Loading bookings...</div>
        ) : (
          <>
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort('user.name')}
                  >
                    Customer {getSortIcon('user.name')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort('service.name')}
                  >
                    Service {getSortIcon('service.name')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort('date')}
                  >
                    Date {getSortIcon('date')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort('startTime')}
                  >
                    Time {getSortIcon('startTime')}
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    Status {getSortIcon('status')}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentBookings.map(booking => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaUser className="text-gray-400 mr-2" />
                        <div>
                          <div className="font-medium">{booking.user?.name || 'N/A'}</div>
                          <div className="text-sm text-gray-500">{booking.user?.email || 'N/A'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{booking.service?.name || 'N/A'}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaCalendar className="text-gray-400 mr-2" />
                        {booking.date ? formatDate(booking.date) : 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <FaClock className="text-gray-400 mr-2" />
                        {booking.startTime || 'N/A'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(booking.status || 'pending')}`}>
                        {booking.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={booking.status || 'pending'}
                        onChange={(e) => handleStatusChange(booking._id, e.target.value)}
                        className="border rounded px-2 py-1 text-sm"
                        disabled={updatingStatus[booking._id]}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirm</option>
                        <option value="cancelled">Cancel</option>
                        <option value="completed">Complete</option>
                      </select>
                      {updatingStatus[booking._id] && (
                        <span className="ml-2 text-gray-500">Updating...</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!loading && sortedBookings.length === 0 && (
              <div className="p-4 text-center text-gray-500">
                No bookings found matching your filters.
              </div>
            )}
          </>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4 space-x-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-3 py-1">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
