// import React from 'react'
// import { Phone, Videocam } from '@mui/icons-material'
// import { Stack, IconButton, Typography } from '@mui/material'

// function CallActions({ onVoiceCall, onVideoCall }) {
//   return (
//     <Stack
//       direction="row"
//       sx={{
//         width: '100%',
//         borderBottom: '1px solid rgba(0,0,0,0.1)',
//         bgcolor: 'background.paper'
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           width: '50%',
//           py: 1,
//           borderRight: '1px solid rgba(0,0,0,0.1)',
//           cursor: 'pointer',
//           '&:hover': { bgcolor: 'action.hover' }
//         }}
//         onClick={onVoiceCall}
//       >
//         <IconButton color="primary">
//           <Phone />
//         </IconButton>
//         <Typography variant="body2">Voice Call</Typography>
//       </Stack>

//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="center"
//         sx={{
//           width: '50%',
//           py: 1,
//           cursor: 'pointer',
//           '&:hover': { bgcolor: 'action.hover' }
//         }}
//         onClick={onVideoCall}
//       >
//         <IconButton color="primary">
//           <Videocam />
//         </IconButton>
//         <Typography variant="body2">Video Call</Typography>
//       </Stack>
//     </Stack>
//   )
// }

// export default CallActions





"use client"
import { Box, IconButton, Tooltip } from "@mui/material"
import { Call, Videocam } from "@mui/icons-material"

const CallActions = ({ onVoiceCall, onVideoCall }) => {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "10px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 10,
        display: "flex",
        gap: 2,
        backgroundColor: "rgba(0,0,0,0.4)",
        borderRadius: "24px",
        padding: "6px 12px",
      }}
    >
      <Tooltip title="Voice Call">
        <IconButton
          onClick={onVoiceCall}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <Call />
        </IconButton>
      </Tooltip>

      <Tooltip title="Video Call">
        <IconButton
          onClick={onVideoCall}
          sx={{
            backgroundColor: "rgba(255,255,255,0.2)",
            color: "white",
            "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          }}
        >
          <Videocam />
        </IconButton>
      </Tooltip>
    </Box>
  )
}

export default CallActions
