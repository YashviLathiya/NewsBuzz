import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography, TextField, Avatar, Button, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { styled } from '@mui/material/styles';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Following from './Following';
import Bookmarked from './Bookmarked';
import SearchHistory from './SearchHistory';

const StyledTabs = styled((props) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }} />
))({
  '& .MuiTabs-indicator': {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  '& .MuiTabs-indicatorSpan': {
    maxWidth: 40,
    width: '100%',
    backgroundColor: '#635ee7',
  },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(({ theme }) => ({
  textTransform: 'none',
  fontWeight: theme.typography.fontWeightRegular,
  fontSize: theme.typography.pxToRem(15),
  marginRight: theme.spacing(1),
  color: "#141414",
  fontWeight: "400",
  '&.Mui-selected': { color: "#0c828f" },
  '&.Mui-focusVisible': { backgroundColor: "#30c1d1" },
}));

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (<Box sx={{ p: 3 }}><Typography>{children}</Typography></Box>)}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Lists() {
  const [mainTab, setMainTab] = React.useState(0);
  const [nestedTab, setNestedTab] = React.useState(0);
  const [username, setUsername] = React.useState('Your Username');
  const [email, setEmail] = React.useState('youremail@example.com');
  const [profilePhoto, setProfilePhoto] = React.useState(null);
  const [bio, setBio] = React.useState('');

  const [feedPreferences, setFeedPreferences] = React.useState({
    Technology: false,
    Sports: false,
    Politics: false,
    Business: false,
    Entertainment: false,
  });

  const [oldPassword, setOldPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

  const handleMainTabChange = (event, newValue) => {
    setMainTab(newValue);
    if (newValue === 0) setNestedTab(0);
  };

  const handleNestedTabChange = (event, newValue) => {
    setNestedTab(newValue);
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleProfileSubmit = (event) => {
    event.preventDefault();
    alert('Profile updated successfully!');
  };

  const handleFeedPreferenceChange = (event) => {
    setFeedPreferences({
      ...feedPreferences,
      [event.target.name]: event.target.checked,
    });
  };

  const handleFeedSubmit = () => {
    alert('Feed preferences and bio updated successfully!');
  };

  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      alert('New password and confirmation do not match.');
    } else {
      alert('Password changed successfully!');
      // Add API logic here if needed
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <StyledTabs value={mainTab} onChange={handleMainTabChange} aria-label="primary tabs">
          <StyledTab label="Manage Profile" {...a11yProps(0)} />
          <StyledTab label="Bookmarked Articles" {...a11yProps(1)} />
          <StyledTab label="View Reading History" {...a11yProps(2)} />
          <StyledTab label="Following" {...a11yProps(3)} />
        </StyledTabs>
      </Box>

      <CustomTabPanel value={mainTab} index={0}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <StyledTabs value={nestedTab} onChange={handleNestedTabChange} aria-label="nested tabs">
            <StyledTab label="Edit Profile" {...a11yProps(0)} />
            <StyledTab label="Edit Feed" {...a11yProps(1)} />
            <StyledTab label="Change Password" {...a11yProps(2)} />
          </StyledTabs>
        </Box>

        <CustomTabPanel value={nestedTab} index={0}>
          <Box component="form" onSubmit={handleProfileSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Edit Profile</Typography>
            <Avatar src={profilePhoto} alt="Profile Photo" sx={{ width: 80, height: 80, mb: 2 }} />
            <IconButton color="primary" component="label">
              <PhotoCamera />
              <input hidden accept="image/*" type="file" onChange={handlePhotoUpload} />
            </IconButton>
            <TextField label="Username" variant="outlined" fullWidth margin="normal" value={username} onChange={(e) => setUsername(e.target.value)} />
            <TextField label="Email Address" variant="outlined" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Save Changes</Button>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={nestedTab} index={1}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Edit Feed Preferences</Typography>
            <TextField
              label="Bio"
              variant="outlined"
              fullWidth
              multiline
              rows={3}
              margin="normal"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter a short bio about your reading interests"
            />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%' }}>
              {Object.keys(feedPreferences).map((category) => (
                <FormControlLabel
                  key={category}
                  control={
                    <Checkbox
                      checked={feedPreferences[category]}
                      onChange={handleFeedPreferenceChange}
                      name={category}
                      color="primary"
                    />
                  }
                  label={category}
                />
              ))}
            </Box>
            <Button variant="contained" color="primary" onClick={handleFeedSubmit} sx={{ mt: 2 }}>Save Changes</Button>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={nestedTab} index={2}>
          <Box component="form" onSubmit={handleChangePasswordSubmit} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: 400, mx: 'auto', mt: 4, p: 3, border: '1px solid #e0e0e0', borderRadius: '8px' }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Change Password</Typography>
            <TextField
              label="Current Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              label="New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <TextField
              label="Confirm New Password"
              variant="outlined"
              fullWidth
              margin="normal"
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Change Password</Button>
          </Box>
        </CustomTabPanel>
      </CustomTabPanel>

      <CustomTabPanel value={mainTab} index={1}>
        <Bookmarked/>
      </CustomTabPanel>

      <CustomTabPanel value={mainTab} index={2}>
        <SearchHistory/>
      </CustomTabPanel>

      <CustomTabPanel value={mainTab} index={3}>
        <Following/>
      </CustomTabPanel>
    </Box>
  );
}
