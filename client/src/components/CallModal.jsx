import React, { useEffect, useRef } from 'react'
import { Dialog, IconButton, Stack } from '@mui/material'
import { CallEnd, Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material'

function CallModal({ open, onClose, localStream, remoteStream, isVideo }) {
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [localStream, remoteStream])

  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <Stack
        sx={{
          height: '100%',
          bgcolor: 'background.default',
          position: 'relative'
        }}
      >
        {isVideo && (
          <Stack direction="row" sx={{ height: 'calc(100% - 100px)' }}>
            <video
              ref={remoteVideoRef}
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <video
              ref={localVideoRef}
              autoPlay
              playsInline
              muted
              style={{
                position: 'absolute',
                width: '200px',
                right: 20,
                top: 20,
                borderRadius: 8
              }}
            />
          </Stack>
        )}

        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{
            height: 100,
            bgcolor: 'background.paper'
          }}
        >
          <IconButton>
            <Mic />
          </IconButton>
          {isVideo && (
            <IconButton>
              <Videocam />
            </IconButton>
          )}
          <IconButton
            sx={{
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' }
            }}
            onClick={onClose}
          >
            <CallEnd />
          </IconButton>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default CallModal

