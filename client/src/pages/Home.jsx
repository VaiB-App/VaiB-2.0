
import React from 'react';
import AppLayout from '../components/layout/AppLayout';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box
      sx={{
        height: "100%",
        width: "100%",
        backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/og_logo%20(1)-2qrsAG55OmC0ljOdpLZakecPYLDW5f.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(5px)',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Typography 
          variant='h4' 
          textAlign="center"
          sx={{
            color: 'white',
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #22c55e, #3b82f6)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            padding: '2rem',
            borderRadius: '16px',
             backgroundColor: 'rgba(255, 255, 255, 0.1)',
            //  backdropFilter: 'blur(5px)',
          }}
        >
          Select a Friend to Chat
        </Typography>
      </Box>
    </Box>
  );
};

export default AppLayout()(Home);