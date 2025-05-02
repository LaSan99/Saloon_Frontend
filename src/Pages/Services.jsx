import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Divider,
  Chip
} from "@mui/material";
import ServiceCard from "../Components/ServiceCard.jsx";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Theme colors matching the ServiceCard component
  const theme = {
    primary: '#000000',
    secondary: '#FFFFFF',
    accent: '#E0E0E0',
    lightGray: '#F5F5F5',
    mediumGray: '#BDBDBD',
    darkGray: '#424242'
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://saloon-bakcend.vercel.app/api/v1/services"
        );
        const serviceData = response.data.services || response.data;
        setServices(Array.isArray(serviceData) ? serviceData : []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch services");
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Extract all unique categories from services
  const categories = ['all', ...new Set(services.map(service => service.category || 'other'))];

  // Filter services based on selected category
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  if (loading) {
    return (
      <Container 
        sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center", 
          minHeight: "70vh" 
        }}
      >
        <CircularProgress sx={{ color: theme.primary }} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert 
          severity="error" 
          sx={{ 
            backgroundColor: theme.lightGray, 
            color: theme.primary,
            border: `1px solid ${theme.primary}`,
            '& .MuiAlert-icon': {
              color: theme.primary
            }
          }}
        >
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Header Section */}
      <Box sx={{ mb: 6, textAlign: "center" }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            fontWeight: 500,
            letterSpacing: 1,
            color: theme.primary,
            mb: 2
          }}
        >
          Our Services
        </Typography>
        <Divider 
          sx={{ 
            width: 80, 
            margin: '0 auto', 
            height: 2, 
            backgroundColor: theme.primary,
            mb: 4
          }} 
        />
        <Typography 
          variant="subtitle1" 
          sx={{ 
            maxWidth: 700, 
            mx: 'auto',
            color: theme.darkGray
          }}
        >
          Discover our range of premium services designed to provide you with the best experience
        </Typography>
      </Box>

      {/* Categories Filter */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mb: 5,
          flexWrap: 'wrap',
          gap: 1
        }}
      >
        {categories.map((category) => (
          <Chip
            key={category}
            label={category === 'all' ? 'All Services' : category}
            onClick={() => setSelectedCategory(category)}
            sx={{
              m: 0.5,
              textTransform: 'capitalize',
              fontWeight: 500,
              backgroundColor: selectedCategory === category ? theme.primary : theme.lightGray,
              color: selectedCategory === category ? theme.secondary : theme.primary,
              '&:hover': {
                backgroundColor: selectedCategory === category ? theme.darkGray : theme.accent,
              }
            }}
          />
        ))}
      </Box>

      {/* Services Grid */}
      {filteredServices.length === 0 ? (
        <Box 
          sx={{ 
            textAlign: 'center', 
            py: 8, 
            px: 2, 
            backgroundColor: theme.lightGray,
            borderRadius: 2
          }}
        >
          <Typography variant="h6" color={theme.darkGray}>
            No services found in this category
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={4}>
          {filteredServices.map((service) => (
            <Grid item key={service._id} xs={12} sm={6} md={4}>
              <ServiceCard service={service} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Services;