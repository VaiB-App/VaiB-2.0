// import React, { useEffect, useRef } from 'react'
// import { Dialog, IconButton, Stack } from '@mui/material'
// import { CallEnd, Mic, MicOff, Videocam, VideocamOff } from '@mui/icons-material'

// function CallModal({ open, onClose, localStream, remoteStream, isVideo }) {
//   const localVideoRef = useRef(null)
//   const remoteVideoRef = useRef(null)

//   useEffect(() => {
//     if (localVideoRef.current && localStream) {
//       localVideoRef.current.srcObject = localStream
//     }
//     if (remoteVideoRef.current && remoteStream) {
//       remoteVideoRef.current.srcObject = remoteStream
//     }
//   }, [localStream, remoteStream])

//   return (
//     <Dialog fullScreen open={open} onClose={onClose}>
//       <Stack
//         sx={{
//           height: '100%',
//           bgcolor: 'background.default',
//           position: 'relative'
//         }}
//       >
//         {isVideo && (
//           <Stack direction="row" sx={{ height: 'calc(100% - 100px)' }}>
//             <video
//               ref={remoteVideoRef}
//               autoPlay
//               playsInline
//               style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//             />
//             <video
//               ref={localVideoRef}
//               autoPlay
//               playsInline
//               muted
//               style={{
//                 position: 'absolute',
//                 width: '200px',
//                 right: 20,
//                 top: 20,
//                 borderRadius: 8
//               }}
//             />
//           </Stack>
//         )}

//         <Stack
//           direction="row"
//           spacing={2}
//           justifyContent="center"
//           alignItems="center"
//           sx={{
//             height: 100,
//             bgcolor: 'background.paper'
//           }}
//         >
//           <IconButton>
//             <Mic />
//           </IconButton>
//           {isVideo && (
//             <IconButton>
//               <Videocam />
//             </IconButton>
//           )}
//           <IconButton
//             sx={{
//               bgcolor: 'error.main',
//               color: 'white',
//               '&:hover': { bgcolor: 'error.dark' }
//             }}
//             onClick={onClose}
//           >
//             <CallEnd />
//           </IconButton>
//         </Stack>
//       </Stack>
//     </Dialog>
//   )
// }

// export default CallModal










"use client"

import React, { useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Stack } from "@mui/material"
import { Call, CallEnd, Mic, MicOff, Videocam, VideocamOff } from "@mui/icons-material"

const CallModal = ({
  open,
  onClose,
  localStream,
  remoteStream,
  isVideo,
  isIncoming = false,
  caller = null,
  onAccept = null,
  onReject = null,
}) => {
  const localVideoRef = useRef(null)
  const remoteVideoRef = useRef(null)
  const [micMuted, setMicMuted] = React.useState(false)
  const [videoOff, setVideoOff] = React.useState(false)

  useEffect(() => {
    if (localVideoRef.current && localStream) {
      localVideoRef.current.srcObject = localStream
    }
  }, [localStream])

  useEffect(() => {
    if (remoteVideoRef.current && remoteStream) {
      remoteVideoRef.current.srcObject = remoteStream
    }
  }, [remoteStream])

  const toggleMic = () => {
    if (localStream) {
      const audioTracks = localStream.getAudioTracks()
      if (audioTracks.length > 0) {
        audioTracks[0].enabled = micMuted
        setMicMuted(!micMuted)
      }
    }
  }

  const toggleVideo = () => {
    if (localStream && isVideo) {
      const videoTracks = localStream.getVideoTracks()
      if (videoTracks.length > 0) {
        videoTracks[0].enabled = videoOff
        setVideoOff(!videoOff)
      }
    }
  }

  return (
    <Dialog
      open={open}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          backgroundColor: "rgba(18, 18, 18, 0.9)",
          color: "white",
        },
      }}
    >
      <DialogTitle sx={{ textAlign: "center", color: "white" }}>
        {isIncoming ? "Incoming Call" : isVideo ? "Video Call" : "Voice Call"}
      </DialogTitle>

      <DialogContent>
        {isIncoming ? (
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <Typography variant="h6">
              {caller?.name || "Someone"} is {isVideo ? "video" : "voice"} calling you
            </Typography>

            <Stack direction="row" spacing={4} justifyContent="center">
              <IconButton
                onClick={onAccept}
                sx={{
                  backgroundColor: "green",
                  color: "white",
                  "&:hover": { backgroundColor: "darkgreen" },
                  width: 60,
                  height: 60,
                }}
              >
                <Call fontSize="large" />
              </IconButton>

              <IconButton
                onClick={onReject}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "darkred" },
                  width: 60,
                  height: 60,
                }}
              >
                <CallEnd fontSize="large" />
              </IconButton>
            </Stack>
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: isVideo ? "row" : "column",
                justifyContent: "center",
                alignItems: "center",
                gap: 2,
                height: isVideo ? "400px" : "200px",
              }}
            >
              {isVideo && (
                <>
                  <Box
                    sx={{
                      width: remoteStream ? "70%" : "100%",
                      height: "100%",
                      backgroundColor: "#333",
                      borderRadius: "8px",
                      overflow: "hidden",
                      position: "relative",
                    }}
                  >
                    <video
                      ref={remoteVideoRef}
                      autoPlay
                      playsInline
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                    {!remoteStream && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                          color: "white",
                        }}
                      >
                        Connecting...
                      </Box>
                    )}
                  </Box>

                  <Box
                    sx={{
                      width: remoteStream ? "30%" : "0",
                      height: "30%",
                      position: "absolute",
                      bottom: 80,
                      right: 20,
                      borderRadius: "8px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border: "2px solid white",
                    }}
                  >
                    <video
                      ref={localVideoRef}
                      autoPlay
                      playsInline
                      muted
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </Box>
                </>
              )}

              {!isVideo && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      width: 120,
                      height: 120,
                      borderRadius: "50%",
                      backgroundColor: "#555",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "3rem",
                      color: "white",
                      mb: 2,
                    }}
                  >
                    {caller?.name?.charAt(0) || "U"}
                  </Box>
                  <Typography variant="h6" sx={{ color: "white" }}>
                    {remoteStream ? "Connected" : "Connecting..."}
                  </Typography>
                  <audio ref={remoteVideoRef} autoPlay />
                  <audio ref={localVideoRef} autoPlay muted />
                </Box>
              )}
            </Box>

            <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 2 }}>
              <IconButton
                onClick={toggleMic}
                sx={{
                  backgroundColor: micMuted ? "red" : "rgba(255,255,255,0.2)",
                  color: "white",
                  "&:hover": { backgroundColor: micMuted ? "darkred" : "rgba(255,255,255,0.3)" },
                }}
              >
                {micMuted ? <MicOff /> : <Mic />}
              </IconButton>

              {isVideo && (
                <IconButton
                  onClick={toggleVideo}
                  sx={{
                    backgroundColor: videoOff ? "red" : "rgba(255,255,255,0.2)",
                    color: "white",
                    "&:hover": { backgroundColor: videoOff ? "darkred" : "rgba(255,255,255,0.3)" },
                  }}
                >
                  {videoOff ? <VideocamOff /> : <Videocam />}
                </IconButton>
              )}

              <IconButton
                onClick={onClose}
                sx={{
                  backgroundColor: "red",
                  color: "white",
                  "&:hover": { backgroundColor: "darkred" },
                }}
              >
                <CallEnd />
              </IconButton>
            </Stack>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default CallModal
