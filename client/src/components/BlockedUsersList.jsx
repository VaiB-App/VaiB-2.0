// import React from 'react';
// import {
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
//   Avatar,
//   Typography,
//   Button,
//   Paper,
//   Box,
//   Divider,
//   CircularProgress
// } from '@mui/material';
// import { Block as BlockIcon, PersonRemove as PersonRemoveIcon } from '@mui/icons-material';
// import { useGetBlockedUsersQuery, useUnblockUserMutation } from '../redux/api/api';
// import toast from 'react-hot-toast';

// const BlockedUsersList = () => {
//   const { data: blockedUsers, isLoading, refetch } = useGetBlockedUsersQuery();
//   const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

//   const handleUnblock = async (userId) => {
//     try {
//       const toastId = toast.loading('Unblocking user...');
//       await unblockUser({ userId });
//       toast.success('User unblocked successfully', { id: toastId });
//       refetch();
//     } catch (error) {
//       console.error('Unblock error:', error);
//       toast.error('Failed to unblock user. Please try again.');
//     }
//   };

//   if (isLoading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Paper 
//       elevation={3} 
//       sx={{ 
//         borderRadius: '16px',
//         overflow: 'hidden',
//         backgroundColor: 'rgba(255, 255, 255, 0.9)',
//         backdropFilter: 'blur(10px)',
//       }}
//     >
//       <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
//         <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//           <BlockIcon /> Blocked Users
//         </Typography>
//       </Box>
      
//       <List sx={{ p: 0 }}>
//         {blockedUsers && blockedUsers.length > 0 ? (
//           blockedUsers.map((user) => (
//             <React.Fragment key={user._id}>
//               <ListItem
//                 secondaryAction={
//                   <Button
//                     variant="outlined"
//                     color="primary"
//                     size="small"
//                     startIcon={<PersonRemoveIcon />}
//                     onClick={() => handleUnblock(user._id)}
//                     disabled={isUnblocking}
//                   >
//                     Unblock
//                   </Button>
//                 }
//               >
//                 <ListItemAvatar>
//                   <Avatar src={user.avatar?.url} alt={user.name}>
//                     {user.name.charAt(0)}
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText
//                   primary={user.name}
//                   secondary={`@${user.username}`}
//                 />
//               </ListItem>
//               <Divider variant="inset" component="li" />
//             </React.Fragment>
//           ))
//         ) : (
//           <ListItem>
//             <ListItemText
//               primary={
//                 <Typography align="center" color="text.secondary">
//                   You haven't blocked any users yet
//                 </Typography>
//               }
//             />
//           </ListItem>
//         )}
//       </List>
//     </Paper>
//   );
// };

// export default BlockedUsersList;



import React from 'react';
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Button,
  Paper,
  Box,
  Divider,
  CircularProgress
} from '@mui/material';
import { Block as BlockIcon, PersonRemove as PersonRemoveIcon } from '@mui/icons-material';
import { useGetBlockedUsersQuery, useUnblockUserMutation } from '../redux/api/api';
import toast from 'react-hot-toast';

const BlockedUsersList = () => {
  const { data: blockedUsers, isLoading, refetch } = useGetBlockedUsersQuery();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();

  const handleUnblock = async (userId) => {
    try {
      const toastId = toast.loading('Unblocking user...');
      const response = await unblockUser({ userId }).unwrap();
      
      if (response.success) {
        toast.success('User unblocked successfully', { id: toastId });
        refetch();
      } else {
        toast.error(response.message || 'Failed to unblock user', { id: toastId });
      }
    } catch (error) {
      console.error('Unblock error:', error);
      toast.error(error.data?.message || 'Failed to unblock user. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        borderRadius: '16px',
        overflow: 'hidden',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <BlockIcon /> Blocked Users
        </Typography>
      </Box>
      
      <List sx={{ p: 0 }}>
        {blockedUsers && blockedUsers.length > 0 ? (
          blockedUsers.map((user) => (
            <React.Fragment key={user._id}>
              <ListItem
                secondaryAction={
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<PersonRemoveIcon />}
                    onClick={() => handleUnblock(user._id)}
                    disabled={isUnblocking}
                  >
                    Unblock
                  </Button>
                }
              >
                <ListItemAvatar>
                  <Avatar src={user.avatar?.url} alt={user.name}>
                    {user.name.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={user.name}
                  secondary={`@${user.username}`}
                />
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText
              primary={
                <Typography align="center" color="text.secondary">
                  You haven't blocked any users yet
                </Typography>
              }
            />
          </ListItem>
        )}
      </List>
    </Paper>
  );
};

export default BlockedUsersList;
