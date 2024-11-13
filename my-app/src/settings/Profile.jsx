//Profile.jsx
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Avatar, IconButton } from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Lists from './List';

export default function EditProfile() {
  const [username, setUsername] = useState('Your Username');
  const [email, setEmail] = useState('youremail@example.com');
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your update logic here (e.g., API calls)
    alert('Profile updated successfully!');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        mx: 'auto',
        mt: 4,
        p: 3,
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        Edit Profile
      </Typography>

      {/* Profile Photo */}
      <Avatar
        src={profilePhoto}
        alt="Profile Photo"
        sx={{ width: 80, height: 80, mb: 2 }}
      />
      <IconButton color="primary" component="label">
        <PhotoCamera />
        <input hidden accept="image/*" type="file" onChange={handlePhotoUpload} />
      </IconButton>

      {/* Username Field */}
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      {/* Email Address Field */}
      <TextField
        label="Email Address"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
        Save Changes
      </Button>
    </Box>
  );
}
