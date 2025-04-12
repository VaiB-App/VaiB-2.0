"use client"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, Box, Avatar } from "@mui/material"
import { WarningAmber } from "@mui/icons-material"

const SpamMessageAlert = ({ open, onClose, message, sender }) => {
  const handleIgnore = () => {
    onClose({ blocked: false })
  }

  const handleBlock = () => {
    onClose({ blocked: true })
  }

  return (
    <Dialog open={open} onClose={handleIgnore} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ bgcolor: "#ff9800", color: "white", display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmber />
        Potential Spam Detected
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Avatar sx={{ mr: 2 }}>{sender?.name?.[0] || "U"}</Avatar>
          <Typography variant="subtitle1">{sender?.name || "Unknown User"}</Typography>
        </Box>

        <Typography variant="body1" sx={{ mb: 2 }}>
          We've detected a potential spam message from this user. Would you like to block them?
        </Typography>

        <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {message?.length > 100 ? `${message.substring(0, 100)}...` : message}
          </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary">
          Blocking this user will prevent them from sending you messages in the future.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleIgnore} color="primary">
          Ignore
        </Button>
        <Button onClick={handleBlock} variant="contained" color="error">
          Block User
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default SpamMessageAlert
