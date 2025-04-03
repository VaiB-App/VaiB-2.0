// import React, { useState } from 'react';
// import {
//   Container,
//   Paper,
//   Tabs,
//   Tab,
//   Box,
//   Typography,
//   Divider
// } from '@mui/material';
// import {
//   Settings as SettingsIcon,
//   Block as BlockIcon,
//   Person as PersonIcon,
//   Notifications as NotificationsIcon
// } from '@mui/icons-material';
// import BlockedUsersList from '../components/BlockedUsersList';
// import AppLayout from '../components/layout/AppLayout';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       hidden={value !== index}
//       id={`settings-tabpanel-${index}`}
//       aria-labelledby={`settings-tab-${index}`}
//       {...other}
//     >
//       {value === index && (
//         <Box sx={{ p: 3 }}>
//           {children}
//         </Box>
//       )}
//     </div>
//   );
// }

// function a11yProps(index) {
//   return {
//     id: `settings-tab-${index}`,
//     'aria-controls': `settings-tabpanel-${index}`,
//   };
// }

// const Settings = () => {
//   const [value, setValue] = useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };

//   return (
//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Paper 
//         elevation={3} 
//         sx={{ 
//           borderRadius: '16px',
//           overflow: 'hidden',
//           backgroundColor: 'rgba(255, 255, 255, 0.9)',
//           backdropFilter: 'blur(10px)',
//         }}
//       >
//         <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
//           <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//             <SettingsIcon /> Settings
//           </Typography>
//         </Box>
        
//         <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
//           <Tabs 
//             value={value} 
//             onChange={handleChange} 
//             aria-label="settings tabs"
//             variant="fullWidth"
//           >
//             <Tab icon={<PersonIcon />} label="Profile" {...a11yProps(0)} />
//             <Tab icon={<BlockIcon />} label="Blocked Users" {...a11yProps(1)} />
//             <Tab icon={<NotificationsIcon />} label="Notifications" {...a11yProps(2)} />
//           </Tabs>
//         </Box>
        
//         <TabPanel value={value} index={0}>
//           <Typography variant="h6">Profile Settings</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography>Profile settings will be implemented here.</Typography>
//         </TabPanel>
        
//         <TabPanel value={value} index={1}>
//           <BlockedUsersList />
//         </TabPanel>
        
//         <TabPanel value={value} index={2}>
//           <Typography variant="h6">Notification Settings</Typography>
//           <Divider sx={{ my: 2 }} />
//           <Typography>Notification settings will be implemented here.</Typography>
//         </TabPanel>
//       </Paper>
//     </Container>
//   );
// };

// export default AppLayout()(Settings);




import React, { useState } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Typography,
  Divider
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Block as BlockIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import BlockedUsersList from '../components/BlockedUsersList';
import AppLayout from '../components/layout/AppLayout';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
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
          <Typography variant="h5" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon /> Settings
          </Typography>
        </Box>
        
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={value} 
            onChange={handleChange} 
            aria-label="settings tabs"
            variant="fullWidth"
          >
            <Tab icon={<PersonIcon />} label="Profile" {...a11yProps(0)} />
            <Tab icon={<BlockIcon />} label="Blocked Users" {...a11yProps(1)} />
            <Tab icon={<NotificationsIcon />} label="Notifications" {...a11yProps(2)} />
          </Tabs>
        </Box>
        
        <TabPanel value={value} index={0}>
          <Typography variant="h6">Profile Settings</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Profile settings will be implemented here.</Typography>
        </TabPanel>
        
        <TabPanel value={value} index={1}>
          <BlockedUsersList />
        </TabPanel>
        
        <TabPanel value={value} index={2}>
          <Typography variant="h6">Notification Settings</Typography>
          <Divider sx={{ my: 2 }} />
          <Typography>Notification settings will be implemented here.</Typography>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default AppLayout()(Settings);