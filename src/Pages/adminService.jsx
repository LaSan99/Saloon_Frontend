import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash, FaPlus, FaSearch, FaArrowLeft, FaImage } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AdminService = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'haircut',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: ''
  });

  const categories = [
    { value: 'haircut', label: 'Haircut' },
    { value: 'hair-color', label: 'Hair Color' },
    { value: 'facial', label: 'Facial' },
    { value: 'massage', label: 'Massage' },
    { value: 'nails', label: 'Nails' },
    { value: 'makeup', label: 'Makeup' },
    { value: 'spa', label: 'Spa' }
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch('https://saloon-bakcend.vercel.app/api/v1/services', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (response.ok) {
        setServices(data.services || []);
      } else {
        toast.error(data.message || 'Failed to fetch services');
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error('Failed to fetch services');
      setServices([]);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredServices = services.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Handle number inputs
    if (name === 'price' || name === 'duration') {
      processedValue = value === '' ? '' : Number(value);
    }

    setFormData(prev => ({
      ...prev,
      [name]: processedValue
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Service name is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Description is required');
      return false;
    }
    if (!formData.price || formData.price < 0) {
      toast.error('Please enter a valid price');
      return false;
    }
    if (!formData.duration || formData.duration < 1) {
      toast.error('Please enter a valid duration');
      return false;
    }
    if (!formData.category) {
      toast.error('Please select a category');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const url = editingService 
        ? `https://saloon-bakcend.vercel.app/api/v1/services/${editingService._id}`
        : 'https://saloon-bakcend.vercel.app/api/v1/services';
      
      const method = editingService ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || `Service ${editingService ? 'updated' : 'created'} successfully`);
        setShowModal(false);
        setEditingService(null);
        setFormData({
          name: '',
          description: '',
          price: '',
          duration: '',
          category: 'haircut',
          imageUrl1: '',
          imageUrl2: '',
          imageUrl3: ''
        });
        fetchServices();
      } else {
        toast.error(data.message || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Failed to save service. Please try again.');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      description: service.description,
      price: service.price,
      duration: service.duration,
      category: service.category,
      imageUrl1: service.imageUrl1 || '',
      imageUrl2: service.imageUrl2 || '',
      imageUrl3: service.imageUrl3 || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        const response = await fetch(`https://saloon-bakcend.vercel.app/api/v1/services/${serviceId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.ok) {
          fetchServices();
        }
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  // Category color mapping
  const getCategoryColor = (category) => {
    const colors = {
      'haircut': 'bg-blue-100 text-blue-800',
      'hair-color': 'bg-purple-100 text-purple-800',
      'facial': 'bg-pink-100 text-pink-800',
      'massage': 'bg-green-100 text-green-800',
      'nails': 'bg-yellow-100 text-yellow-800',
      'makeup': 'bg-red-100 text-red-800',
      'spa': 'bg-indigo-100 text-indigo-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

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
          <h1 className="text-2xl font-bold">Service Management</h1>
        </div>
        <button
          onClick={() => {
            setEditingService(null);
            setFormData({
              name: '',
              description: '',
              price: '',
              duration: '',
              category: 'haircut',
              imageUrl1: '',
              imageUrl2: '',
              imageUrl3: ''
            });
            setShowModal(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-lg pl-10"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Images</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredServices.map(service => (
              <tr key={service._id}>
                <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                <td className="px-6 py-4">{service.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">${service.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.duration} mins</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 rounded-full text-xs ${getCategoryColor(service.category)}`}>
                    {service.category.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    {[service.imageUrl1, service.imageUrl2, service.imageUrl3].map((url, index) => (
                      url && (
                        <img
                          key={index}
                          src={url}
                          alt={`${service.name} ${index + 1}`}
                          className="w-10 h-10 object-cover rounded"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                          }}
                        />
                      )
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => handleEdit(service)}
                    className="text-blue-500 hover:text-blue-700 mr-3"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(service._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add/Edit Service Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingService ? 'Edit Service' : 'Add New Service'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Service Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image URL Fields */}
              <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-700 flex items-center">
                  <FaImage className="mr-2" />
                  Service Images (URLs)
                </h3>
                
                <div>
                  <label className="block text-sm text-gray-600">Image URL 1</label>
                  <input
                    type="url"
                    name="imageUrl1"
                    value={formData.imageUrl1}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image1.jpg"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.imageUrl1 && (
                    <img
                      src={formData.imageUrl1}
                      alt="Preview 1"
                      className="mt-2 h-20 object-cover rounded"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Image URL 2</label>
                  <input
                    type="url"
                    name="imageUrl2"
                    value={formData.imageUrl2}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image2.jpg"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.imageUrl2 && (
                    <img
                      src={formData.imageUrl2}
                      alt="Preview 2"
                      className="mt-2 h-20 object-cover rounded"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Image URL 3</label>
                  <input
                    type="url"
                    name="imageUrl3"
                    value={formData.imageUrl3}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image3.jpg"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.imageUrl3 && (
                    <img
                      src={formData.imageUrl3}
                      alt="Preview 3"
                      className="mt-2 h-20 object-cover rounded"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  )}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  {editingService ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminService;
