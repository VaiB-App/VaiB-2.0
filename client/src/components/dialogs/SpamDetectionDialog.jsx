"use client";

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { ReportProblem } from "@mui/icons-material";

const SpamDetectionDialog = ({ open, onClose, message, sender }) => {
  const handleIgnore = () => {
    onClose(false);
  };

  const handleBlock = () => {
    onClose(true);
  };

  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ReportProblem color="warning" /> Potential Spam Detected
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          We detected a potential spam message from <strong>{sender.name}</strong>. This message appears to be
          commercial content or unsolicited advertising.
        </DialogContentText>
        <DialogContentText sx={{ mt: 2, p: 2, bgcolor: "rgba(0,0,0,0.05)", borderRadius: 1 }}>
          {message.length > 100 ? `${message.substring(0, 100)}...` : message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleIgnore} color="primary">
          Ignore
        </Button>
        <Button onClick={handleBlock} color="error" variant="contained">
          Block User
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SpamDetectionDialog;
