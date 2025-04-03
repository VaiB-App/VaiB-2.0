// // import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material"
// // import { ReportProblem as ReportIcon } from "@mui/icons-material"
// // import { useBlockUserMutation } from "../../redux/api/api.js"
// // import { useErrors } from "../../hooks/hook"
// // import toast from "react-hot-toast"

// // const InappropriateMessageDialog = ({ open, onClose, message, sender }) => {
// //   const [blockUser, { isLoading }] = useBlockUserMutation()

// //   useErrors([{ isError: false, error: null }])

// //   const handleBlock = async () => {
// //     if (!sender || !sender._id) {
// //       toast.error("User ID is not available.");
// //       return;
// //     }
// //     console.log("Sender ID:", sender._id);  // Check if sender._id exists
// //     try {
// //       const toastId = toast.loading("Blocking user...")

// //       await blockUser(sender._id);

// //       toast.success("User blocked successfully", { id: toastId })
// //       onClose({ blocked: true })
// //     } catch (error) {
// //       console.error("Block user error:", error); // Log the detailed error
// //       toast.error("Failed to block user. Please try again.")
// //       onClose({ blocked: false })
// //     }
// //   }

// //   const handleCancel = () => {
// //     onClose({ blocked: false })
// //   }

// //   if (!sender) return null

// //   return (
// //     <Dialog
// //       open={open}
// //       onClose={handleCancel}
// //       PaperProps={{
// //         style: {
// //           backgroundColor: "rgba(255, 255, 255, 0.95)",
// //           borderRadius: "16px",
// //           backdropFilter: "blur(10px)",
// //           padding: "1rem",
// //           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
// //         },
// //       }}
// //     >
// //       <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
// //         <ReportIcon sx={{ color: "error.main" }} />
// //         <Typography variant="h6" color="error.main" fontWeight="bold">
// //           Inappropriate Content Detected
// //         </Typography>
// //       </DialogTitle>

// //       <DialogContent>
// //         <DialogContentText>
// //           We've detected potentially inappropriate content from <strong>{sender.name}</strong>. Would you like to block
// //           this user to prevent further messages?
// //         </DialogContentText>

// //         <Typography
// //           variant="body2"
// //           sx={{
// //             mt: 2,
// //             p: 2,
// //             bgcolor: "rgba(0,0,0,0.05)",
// //             borderRadius: 2,
// //             fontStyle: "italic",
// //           }}
// //         >
// //           "{message}"
// //         </Typography>
// //       </DialogContent>

// //       <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
// //         <Button onClick={handleCancel} variant="outlined" disabled={isLoading}>
// //           Ignore
// //         </Button>
// //         <Button
// //           onClick={handleBlock}
// //           variant="contained"
// //           color="error"
// //           disabled={isLoading}
// //           sx={{
// //             background: "linear-gradient(45deg, #f44336, #e91e63)",
// //           }}
// //         >
// //           Block User
// //         </Button>
// //       </DialogActions>
// //     </Dialog>
// //   )
// // }

// // export default InappropriateMessageDialog


// import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material"
// import { ReportProblem as ReportIcon } from "@mui/icons-material"
// import { useBlockUserMutation } from "../../redux/api/api.js"
// import { useErrors } from "../../hooks/hook"
// import toast from "react-hot-toast"

// const InappropriateMessageDialog = ({ open, onClose, message, sender }) => {
//   const [blockUser, { isLoading }] = useBlockUserMutation()

//   useErrors([{ isError: false, error: null }])

//   const handleBlock = async () => {
//     if (!sender || !sender._id) {
//       toast.error("User ID is not available.");
//       return;
//     }
    
//     try {
//       const toastId = toast.loading("Blocking user...")

//       // Fix: Pass an object with userId property instead of just the ID
//       await blockUser({ userId: sender._id }).unwrap();

//       toast.success("User blocked successfully", { id: toastId })
//       onClose({ blocked: true })
//     } catch (error) {
//       console.error("Block user error:", error);
//       toast.error("Failed to block user. Please try again.")
//       onClose({ blocked: false })
//     }
//   }

//   const handleCancel = () => {
//     onClose({ blocked: false })
//   }

//   if (!sender) return null

//   return (
//     <Dialog
//       open={open}
//       onClose={handleCancel}
//       PaperProps={{
//         style: {
//           backgroundColor: "rgba(255, 255, 255, 0.95)",
//           borderRadius: "16px",
//           backdropFilter: "blur(10px)",
//           padding: "1rem",
//           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
//         },
//         onClick: (e) => e.stopPropagation(),
//       }}
//     >
//       <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <ReportIcon sx={{ color: "error.main" }} />
//         <Typography variant="h6" color="error.main" fontWeight="bold">
//           Inappropriate Content Detected
//         </Typography>
//       </DialogTitle>

//       <DialogContent>
//         <DialogContentText>
//           We've detected potentially inappropriate content from <strong>{sender.name}</strong>. Would you like to block
//           this user to prevent further messages?
//         </DialogContentText>

//         <Typography
//           variant="body2"
//           sx={{
//             mt: 2,
//             p: 2,
//             bgcolor: "rgba(0,0,0,0.05)",
//             borderRadius: 2,
//             fontStyle: "italic",
//           }}
//         >
//           "{message}"
//         </Typography>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
//         <Button onClick={handleCancel} variant="outlined" disabled={isLoading}>
//           Ignore
//         </Button>
//         <Button
//           onClick={handleBlock}
//           variant="contained"
//           color="error"
//           disabled={isLoading}
//           sx={{
//             background: "linear-gradient(45deg, #f44336, #e91e63)",
//           }}
//         >
//           Block User
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default InappropriateMessageDialog




// import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material"
// import { ReportProblem as ReportIcon } from "@mui/icons-material"
// import { useBlockUserMutation } from "../../redux/api/api.js"
// import { useErrors } from "../../hooks/hook"
// import toast from "react-hot-toast"

// const InappropriateMessageDialog = ({ open, onClose, message, sender }) => {
//   const [blockUser, { isLoading }] = useBlockUserMutation()

//   useErrors([{ isError: false, error: null }])

//   const handleBlock = async () => {
//     if (!sender || !sender._id) {
//       toast.error("User ID is not available.");
//       return;
//     }
    
//     try {
//       const toastId = toast.loading("Blocking user...")

//       // Make sure we're passing the userId correctly
//       const response = await blockUser({ userId: sender._id }).unwrap();
      
//       if (response.success) {
//         toast.success("User blocked successfully", { id: toastId });
//         onClose({ blocked: true });
//       } else {
//         toast.error(response.message || "Failed to block user", { id: toastId });
//         onClose({ blocked: false });
//       }
//     } catch (error) {
//       console.error("Block user error:", error);
//       toast.error("Failed to block user. Please try again.");
//       onClose({ blocked: false });
//     }
//   }

//   const handleCancel = () => {
//     onClose({ blocked: false });
//   }

//   if (!sender) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={handleCancel}
//       PaperProps={{
//         style: {
//           backgroundColor: "rgba(255, 255, 255, 0.95)",
//           borderRadius: "16px",
//           backdropFilter: "blur(10px)",
//           padding: "1rem",
//           boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
//         },
//       }}
//     >
//       <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//         <ReportIcon sx={{ color: "error.main" }} />
//         <Typography variant="h6" color="error.main" fontWeight="bold">
//           Inappropriate Content Detected
//         </Typography>
//       </DialogTitle>

//       <DialogContent>
//         <DialogContentText>
//           We've detected potentially inappropriate content from <strong>{sender.name}</strong>. Would you like to block
//           this user to prevent further messages?
//         </DialogContentText>

//         <Typography
//           variant="body2"
//           sx={{
//             mt: 2,
//             p: 2,
//             bgcolor: "rgba(0,0,0,0.05)",
//             borderRadius: 2,
//             fontStyle: "italic",
//           }}
//         >
//           "{message}"
//         </Typography>
//       </DialogContent>

//       <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
//         <Button onClick={handleCancel} variant="outlined" disabled={isLoading}>
//           Ignore
//         </Button>
//         <Button
//           onClick={handleBlock}
//           variant="contained"
//           color="error"
//           disabled={isLoading}
//           sx={{
//             background: "linear-gradient(45deg, #f44336, #e91e63)",
//           }}
//         >
//           Block User
//         </Button>
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default InappropriateMessageDialog











import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Typography } from "@mui/material"
import { ReportProblem as ReportIcon } from "@mui/icons-material"
import { useBlockUserMutation } from "../../redux/api/api.js"
import { useErrors } from "../../hooks/hook"
import toast from "react-hot-toast"

const InappropriateMessageDialog = ({ open, onClose, message, sender }) => {
  const [blockUser, { isLoading }] = useBlockUserMutation()

  useErrors([{ isError: false, error: null }])

  const handleBlock = async () => {
    if (!sender || !sender._id) {
      toast.error("User ID is not available.");
      return;
    }
    
    try {
      const toastId = toast.loading("Blocking user...")

      // Fix: Pass an object with userId property instead of just the ID
      const response = await blockUser({ userId: sender._id }).unwrap();
      
      toast.success("User blocked successfully", { id: toastId })
      onClose({ blocked: true })
    } catch (error) {
      console.error("Block user error:", error);
      toast.error(error.data?.message || "Failed to block user. Please try again.")
      onClose({ blocked: false })
    }
  }

  const handleCancel = () => {
    onClose({ blocked: false })
  }

  if (!sender) return null

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      PaperProps={{
        style: {
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "16px",
          backdropFilter: "blur(10px)",
          padding: "1rem",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ReportIcon sx={{ color: "error.main" }} />
        <Typography variant="h6" color="error.main" fontWeight="bold">
          Inappropriate Content Detected
        </Typography>
      </DialogTitle>

      <DialogContent>
        <DialogContentText>
          We've detected potentially inappropriate content from <strong>{sender.name}</strong>. Would you like to block
          this user to prevent further messages?
        </DialogContentText>

        <Typography
          variant="body2"
          sx={{
            mt: 2,
            p: 2,
            bgcolor: "rgba(0,0,0,0.05)",
            borderRadius: 2,
            fontStyle: "italic",
          }}
        >
          "{message}"
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
        <Button onClick={handleCancel} variant="outlined" disabled={isLoading}>
          Ignore
        </Button>
        <Button
          onClick={handleBlock}
          variant="contained"
          color="error"
          disabled={isLoading}
          sx={{
            background: "linear-gradient(45deg, #f44336, #e91e63)",
          }}
        >
          Block User
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default InappropriateMessageDialog






