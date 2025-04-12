"use client"
import { IconButton, Paper, Stack, Typography } from "@mui/material"
import { Close as CloseIcon } from "@mui/icons-material"

const ReplyPreview = ({ replyMessage, onCancelReply }) => {
  if (!replyMessage) return null

  return (
    <Paper
      sx={{
        p: 1,
        mb: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderLeft: "4px solid",
        borderColor: "primary.main",
        backgroundColor: "rgba(25,118,210,0.05)",
      }}
    >
      <Stack direction="column" sx={{ overflow: "hidden", flex: 1 }}>
        <Typography variant="caption" color="primary" fontWeight="600">
          Replying to {replyMessage.sender.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {replyMessage.content}
        </Typography>
      </Stack>
      <IconButton size="small" onClick={onCancelReply}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Paper>
  )
}

export default ReplyPreview
