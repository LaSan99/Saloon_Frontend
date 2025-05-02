import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FaEnvelope, FaPhone, FaCalendar, FaTrash, FaCheck, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AdminContact = () => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContact, setSelectedContact] = useState(null);
  const [filter, setFilter] = useState('all'); // all, unread, read, responded

  // Fetch all contacts
  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/contact');
      setContacts(response.data.data);
      setLoading(false);
    } catch (error) {
      toast.error('Failed to fetch contact messages');
      console.error('Error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Update contact status
  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3000/api/v1/contact/${id}/status`, {
        status: newStatus
      });
      toast.success('Status updated successfully');
      fetchContacts(); // Refresh the list
    } catch (error) {
      toast.error('Failed to update status');
      console.error('Error:', error);
    }
  };

  // Delete contact
  const deleteContact = async (id) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;

    try {
      await axios.delete(`http://localhost:3000/api/v1/contact/${id}`);
      toast.success('Message deleted successfully');
      setSelectedContact(null);
      fetchContacts(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete message');
      console.error('Error:', error);
    }
  };

  // Filter contacts based on status
  const filteredContacts = contacts.filter(contact => {
    if (filter === 'all') return true;
    return contact.status === filter;
  });

  // Format date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/admin-dashboard')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <FaArrowLeft className="mr-2" />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Contact Messages</h1>
            <div className="flex space-x-4">
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="all">All Messages</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading messages...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Messages List */}
            <div className="lg:col-span-1 bg-white rounded-lg shadow overflow-hidden">
              <div className="divide-y divide-gray-200">
                {filteredContacts.length === 0 ? (
                  <div className="p-4 text-center text-gray-500">
                    No messages found
                  </div>
                ) : (
                  filteredContacts.map((contact) => (
                    <div
                      key={contact._id}
                      onClick={() => setSelectedContact(contact)}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedContact?._id === contact._id ? 'bg-gray-50' : ''
                      } ${contact.status === 'unread' ? 'font-semibold' : ''}`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {contact.firstName} {contact.lastName}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">{contact.message}</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          contact.status === 'unread' ? 'bg-red-100 text-red-800' :
                          contact.status === 'read' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {contact.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">
                        {formatDate(contact.createdAt)}
                      </p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Message Details */}
            <div className="lg:col-span-2">
              {selectedContact ? (
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex justify-between items-start mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Message Details
                    </h2>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateStatus(selectedContact._id, 'responded')}
                        className="p-2 text-green-600 hover:bg-green-50 rounded-full transition-colors"
                        title="Mark as Responded"
                      >
                        <FaCheck className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteContact(selectedContact._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Message"
                      >
                        <FaTrash className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Name</h3>
                        <p className="mt-1 text-sm text-gray-900">
                          {selectedContact.firstName} {selectedContact.lastName}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Status</h3>
                        <p className="mt-1 text-sm text-gray-900 capitalize">
                          {selectedContact.status}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-gray-400" />
                      <a
                        href={`mailto:${selectedContact.email}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedContact.email}
                      </a>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FaPhone className="text-gray-400" />
                      <a
                        href={`tel:${selectedContact.phone}`}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        {selectedContact.phone}
                      </a>
                    </div>

                    <div className="flex items-center space-x-2">
                      <FaCalendar className="text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {formatDate(selectedContact.createdAt)}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Message</h3>
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selectedContact.message}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
                  Select a message to view details
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContact;
