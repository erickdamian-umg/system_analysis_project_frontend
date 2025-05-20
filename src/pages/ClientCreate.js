import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ClientForm from '../components/ClientForm';
import { clientService } from '../services/clientService';

const ClientCreate = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handleSubmit = async (values) => {
    try {
      await clientService.createClient(values);
      navigate('/clients');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to create client');
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/clients')}
          sx={{ mb: 2 }}
        >
          Back to Clients
        </Button>
        <Typography variant="h4" component="h1" sx={{ mb: 4 }}>
          Create New Client
        </Typography>
        <ClientForm onSubmit={handleSubmit} error={error} />
      </Box>
    </Container>
  );
};

export default ClientCreate; 