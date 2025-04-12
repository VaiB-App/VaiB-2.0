"use client"

import React, { useEffect } from "react"
import { Dialog, DialogContent, DialogTitle, IconButton, Box, Typography, Stack } from "@mui/material"
import { Call, CallEnd } from "@mui/icons-material"
//import callRingtone from "../assets/call-ringtone.mp3"

const IncomingCallNotification = ({ open, caller, isVideo, onAccept, onReject }) => {
  const audioRef = React.useRef(null)

  useEffect(() => {
    if (open && audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing ringtone:", error)
      })
    } else if (!open && audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
    }
  }, [open])

  return (
    <>
      
      <Dialog
        open={open}
        maxWidth="xs"
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
          Incoming {isVideo ? "Video" : "Voice"} Call
        </DialogTitle>

        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, py: 2 }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                backgroundColor: "#555",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2rem",
                color: "white",
              }}
            >
              {caller?.name?.charAt(0) || "U"}
            </Box>

            <Typography variant="h6">{caller?.name || "Someone"} is calling you</Typography>

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
        </DialogContent>
      </Dialog>
    </>
  )
}

export default IncomingCallNotification
