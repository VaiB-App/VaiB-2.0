import React from "react";
import {
  Alert,
  Snackbar,
  Typography,
} from "@mui/material";
import { Block as BlockIcon } from "@mui/icons-material";

const BlockedMessageAlert = ({ open, message, onClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert 
        severity="error" 
        variant="filled"
        icon={<BlockIcon />}
        onClose={onClose}
        sx={{
          width: '100%',
          backgroundColor: 'rgba(211, 47, 47, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '8px',
        }}
      >
        <Typography variant="body1">
          {message}
        </Typography>
      </Alert>
    </Snackbar>
  );
};

export default BlockedMessageAlert;