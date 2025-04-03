import React from 'react'
import { Phone, Videocam } from '@mui/icons-material'
import { Stack, IconButton, Typography } from '@mui/material'

function CallActions({ onVoiceCall, onVideoCall }) {
  return (
    <Stack
      direction="row"
      sx={{
        width: '100%',
        borderBottom: '1px solid rgba(0,0,0,0.1)',
        bgcolor: 'background.paper'
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '50%',
          py: 1,
          borderRight: '1px solid rgba(0,0,0,0.1)',
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={onVoiceCall}
      >
        <IconButton color="primary">
          <Phone />
        </IconButton>
        <Typography variant="body2">Voice Call</Typography>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        sx={{
          width: '50%',
          py: 1,
          cursor: 'pointer',
          '&:hover': { bgcolor: 'action.hover' }
        }}
        onClick={onVideoCall}
      >
        <IconButton color="primary">
          <Videocam />
        </IconButton>
        <Typography variant="body2">Video Call</Typography>
      </Stack>
    </Stack>
  )
}

export default CallActions

