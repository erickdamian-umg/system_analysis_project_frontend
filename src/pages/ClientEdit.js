import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Button
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import ClientForm from '../components/ClientForm';
import { clientService } from '../services/clientService';
import { useAuth } from '../context/AuthContext';

const ClientEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { logout } = useAuth();
  const [client, setClient] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClient = async () => {
      try {
        const data = await clientService.getClient(id);
        setClient(data);
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
          navigate('/login');
        } else {
          setError('Failed to load client');
        }
      } finally {
        setLoading(false);
      }
    };

    loadClient();
  }, [id, navigate, logout]);

  const handleSubmit = async (values) => {
    try {
      await clientService.updateClient(id, values);
      navigate('/clients');
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to update client');
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading...</Typography>
        </Box>
      </Container>
    );
  }

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
          Edit Client
        </Typography>
        <ClientForm
          initialValues={client}
          onSubmit={handleSubmit}
          error={error}
        />
      </Box>
    </Container>
  );
};

export default ClientEdit; 