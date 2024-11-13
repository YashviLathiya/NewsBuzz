import React from 'react';
import Sidenav from '../Components/Sidenav';
import Navbar from '../Components/Navbar';
import List from '../settings/List';
import Box from '@mui/material/Box';


function Settings() {
  return (
    <>
    <Navbar/>
    <Box height={70}/>
    <Box sx={{ display: 'flex' }}>
    <Sidenav/>
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
    <List/>
    </Box>
    </Box>
    </>
  )
}

export default Settings
