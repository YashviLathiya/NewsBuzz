import React, { useState } from 'react';
import { Box, Typography, TextField, Divider, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Dashboard = () => {
  // Sample search history data
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, name: 'Exploring Quantum Computing', type: 'article' },
    { id: 2, name: 'Tech Daily', type: 'channel' },
    { id: 3, name: 'Breakthroughs in Renewable Energy', type: 'article' },
    { id: 4, name: 'Sports Weekly', type: 'channel' },
    { id: 5, name: 'Artificial Intelligence in Education', type: 'article' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter the search history based on the search query
  const filteredHistory = searchHistory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle item click
  const handleItemClick = (item) => {
    alert(`You clicked on ${item.name} (${item.type})`);
    // Add additional actions, such as navigation, here if needed
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#333' }}>
      </Typography>

      {/* Search Bar */}
      <TextField
        label="Search in History"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 3 }}
      />

      {/* Search History List */}
      <Box sx={{ p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" color="primary">Search History</Typography>
        <Divider sx={{ my: 1 }} />
        <List>
          {filteredHistory.length > 0 ? (
            filteredHistory.map((item) => (
              <ListItem 
                key={item.id} 
                button 
                onClick={() => handleItemClick(item)} // Make item clickable
              >
                <ListItemIcon>
                  <SearchIcon color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary={item.name} 
                  secondary={item.type === 'article' ? 'Article' : 'Channel'} 
                />
              </ListItem>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
              No results found.
            </Typography>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;
