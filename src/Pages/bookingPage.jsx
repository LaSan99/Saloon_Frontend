import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton,
  Divider,
  Chip
} from '@mui/material';
import { ChevronLeft, ChevronRight, AccessTime, CalendarToday, Info } from '@mui/icons-material';
import axios from 'axios';

const BookingPage = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const [bookingData, setBookingData] = useState({
    date: '',
    time: ''
  });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Available time slots
  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', 
    '14:00', '15:00', '16:00', '17:00'
  ];

  // Custom theme colors
  const theme = {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#E0E0E0',
    lightGray: '#F5F5F5',
    mediumGray: '#BDBDBD',
    darkGray: '#424242'
  };

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/services/${serviceId}`);
        setService(response.data.service);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch service details');
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [serviceId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!bookingData.date || !bookingData.time) {
      setError('Please select both date and time');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }

      const response = await axios.post(
        'http://localhost:3000/api/v1/appointments',
        {
          service: serviceId,
          date: bookingData.date,
          startTime: bookingData.time
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.data.status === 'success') {
        setBookingSuccess(true);
        // Reset form
        setBookingData({ date: '', time: '' });
        // Redirect to bookings page after 2 seconds
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create booking');
    }
  };

  const getValidImages = () => {
    if (!service) return [];
    return [service.imageUrl1, service.imageUrl2, service.imageUrl3]
      .filter(url => url && url.trim() !== '');
  };

  const nextImage = () => {
    const images = getValidImages();
    if (images.length <= 1) return;
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    const images = getValidImages();
    if (images.length <= 1) return;
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.keyCode === 37) { // Left arrow
        prevImage();
      } else if (e.keyCode === 39) { // Right arrow
        nextImage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress sx={{ color: theme.primary }} />
      </Container>
    );
  }

  if (!service) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error" sx={{ 
          backgroundColor: theme.lightGray, 
          color: theme.primary,
          border: `1px solid ${theme.primary}`
        }}>Service not found</Alert>
      </Container>
    );
  }

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  // Filter out empty image URLs
  const images = getValidImages();
  const defaultImage = 'https://via.placeholder.com/400x300?text=No+Image+Available';

  return (
    <Container maxWidth="lg" sx={{ py: 6, px: 2 }}>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 },
          border: `1px solid ${theme.mediumGray}`,
          borderRadius: 2,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 500, 
            letterSpacing: 0.5,
            color: theme.primary,
            borderBottom: `2px solid ${theme.primary}`,
            paddingBottom: 1,
            marginBottom: 3,
            display: 'inline-block'
          }}
        >
          Book Appointment
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              mb: 3, 
              backgroundColor: 'rgba(0,0,0,0.05)', 
              color: theme.primary,
              border: `1px solid ${theme.primary}`,
              '& .MuiAlert-icon': {
                color: theme.primary
              }
            }}
          >
            {error}
          </Alert>
        )}

        {bookingSuccess && (
          <Alert 
            severity="success" 
            sx={{ 
              mb: 3, 
              backgroundColor: theme.lightGray, 
              color: theme.primary,
              border: `1px solid ${theme.accent}`,
              '& .MuiAlert-icon': {
                color: theme.primary
              }
            }}
          >
            Booking successful! Redirecting to your bookings...
          </Alert>
        )}

        <Grid container spacing={6}>
          {/* Service Details with Image Carousel */}
          <Grid item xs={12} md={6}>
            {/* Image Carousel */}
            <Box sx={{ 
              position: 'relative', 
              height: 400, 
              mb: 4, 
              borderRadius: 2,
              overflow: 'hidden',
              border: `1px solid ${theme.mediumGray}`,
              backgroundColor: theme.lightGray
            }}>
              {/* Add loading overlay */}
              {imageLoading && (
                <Box sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(0,0,0,0.1)',
                  zIndex: 1
                }}>
                  <CircularProgress sx={{ color: theme.primary }} />
                </Box>
              )}
              
              <img
                src={images.length > 0 ? images[currentImageIndex] : defaultImage}
                alt={`${service.name} - Image ${currentImageIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.3s ease',
                  opacity: imageLoading ? 0.5 : 1,
                }}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  setImageLoading(false);
                  e.target.src = defaultImage;
                }}
              />
              
              {/* Navigation Arrows - Only show if there are multiple images */}
              {images.length > 1 && (
                <>
                  <IconButton
                    onClick={prevImage}
                    sx={{
                      position: 'absolute',
                      left: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                      color: theme.secondary,
                      width: 40,
                      height: 40,
                      zIndex: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: theme.primary,
                        transform: 'translateY(-50%) scale(1.1)'
                      }
                    }}
                  >
                    <ChevronLeft />
                  </IconButton>
                  <IconButton
                    onClick={nextImage}
                    sx={{
                      position: 'absolute',
                      right: 16,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      bgcolor: 'rgba(0, 0, 0, 0.7)',
                      color: theme.secondary,
                      width: 40,
                      height: 40,
                      zIndex: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: theme.primary,
                        transform: 'translateY(-50%) scale(1.1)'
                      }
                    }}
                  >
                    <ChevronRight />
                  </IconButton>
                </>
              )}

              {/* Image Dots Indicator - Only show if there are multiple images */}
              {images.length > 1 && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: 1,
                    backgroundColor: 'rgba(0,0,0,0.5)',
                    padding: '8px 12px',
                    borderRadius: 10,
                    zIndex: 2
                  }}
                >
                  {images.map((_, index) => (
                    <Box
                      key={index}
                      onClick={() => {
                        setImageLoading(true);
                        setCurrentImageIndex(index);
                      }}
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        bgcolor: index === currentImageIndex ? theme.secondary : 'rgba(255, 255, 255, 0.5)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        '&:hover': {
                          transform: 'scale(1.2)',
                          bgcolor: theme.secondary
                        }
                      }}
                    />
                  ))}
                </Box>
              )}
            </Box>

            {/* Service Details */}
            <Box sx={{ mb: 4, backgroundColor: theme.lightGray, p: 3, borderRadius: 2 }}>
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  fontWeight: 600, 
                  color: theme.primary,
                  mb: 2
                }}
              >
                {service.name}
              </Typography>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccessTime sx={{ color: theme.primary, mr: 1, fontSize: 20 }} />
                <Typography variant="body1" sx={{ color: theme.darkGray }}>
                  <strong>Duration:</strong> {service.duration} minutes
                </Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Chip 
                  label={`$${service.price}`} 
                  sx={{ 
                    backgroundColor: theme.primary, 
                    color: theme.secondary,
                    fontWeight: 'bold',
                    fontSize: '1rem'
                  }} 
                />
              </Box>
              
              <Divider sx={{ my: 2, backgroundColor: theme.mediumGray }} />
              
              <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
                  <Info sx={{ color: theme.primary, mr: 1, mt: 0.5, fontSize: 20 }} />
                  <Typography variant="body1" paragraph sx={{ color: theme.darkGray, m: 0 }}>
                    <strong>Description:</strong>
                  </Typography>
                </Box>
                <Typography 
                  variant="body2" 
                  paragraph 
                  sx={{ 
                    color: theme.darkGray,
                    ml: 3.5,
                    fontStyle: 'italic'
                  }}
                >
                  {service.description}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Booking Form */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 4, 
                borderRadius: 2,
                border: `1px solid ${theme.mediumGray}`,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center'
              }}
            >
              <Typography 
                variant="h5" 
                gutterBottom 
                sx={{ 
                  mb: 4, 
                  fontWeight: 500,
                  color: theme.primary,
                  borderBottom: `1px solid ${theme.mediumGray}`,
                  paddingBottom: 1
                }}
              >
                Select Your Appointment
              </Typography>

              <form onSubmit={handleSubmit}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <CalendarToday sx={{ color: theme.primary, mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: theme.primary }}>
                    Appointment Date
                  </Typography>
                </Box>
                <TextField
                  type="date"
                  name="date"
                  value={bookingData.date}
                  onChange={handleInputChange}
                  fullWidth
                  sx={{ 
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.mediumGray,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.primary,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.primary,
                    },
                  }}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ min: today }}
                  required
                />

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ color: theme.primary, mr: 1 }} />
                  <Typography variant="body1" sx={{ fontWeight: 500, color: theme.primary }}>
                    Appointment Time
                  </Typography>
                </Box>
                <FormControl 
                  fullWidth 
                  sx={{ 
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: theme.mediumGray,
                      },
                      '&:hover fieldset': {
                        borderColor: theme.primary,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: theme.primary,
                      },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                      color: theme.primary,
                    },
                  }} 
                  required
                >
                  <InputLabel>Select Time</InputLabel>
                  <Select
                    name="time"
                    value={bookingData.time}
                    label="Select Time"
                    onChange={handleInputChange}
                  >
                    {timeSlots.map((time) => (
                      <MenuItem key={time} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="large"
                  disabled={!bookingData.date || !bookingData.time || bookingSuccess}
                  sx={{
                    mt: 2,
                    backgroundColor: theme.primary,
                    color: theme.secondary,
                    padding: '12px',
                    fontWeight: 600,
                    letterSpacing: 1,
                    '&:hover': {
                      backgroundColor: theme.darkGray,
                    },
                    '&.Mui-disabled': {
                      backgroundColor: theme.lightGray,
                      color: theme.mediumGray
                    }
                  }}
                >
                  BOOK NOW
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default BookingPage;