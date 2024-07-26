import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Container
      maxWidth="xs"
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box textAlign="center">
        <Typography variant="h2" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" gutterBottom>
          Sayfa Bulunamadı
        </Typography>
        <Typography variant="body1">
          Aradığınız sayfa mevcut değil
        </Typography>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
