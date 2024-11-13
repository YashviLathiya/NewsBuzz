import React, { useState } from 'react';
import { Box, Typography, Divider, IconButton, Menu, MenuItem } from '@mui/material';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';

const Dashboard = () => {
  const [bookmarkedArticles, setBookmarkedArticles] = useState([
    { id: 1, title: 'Exploring Quantum Computing' },
    { id: 2, title: 'Breakthroughs in Renewable Energy' },
    { id: 3, title: 'Artificial Intelligence in Education' },
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleUnbookmark = (id) => {
    setBookmarkedArticles(bookmarkedArticles.filter(article => article.id !== id));
  };

  const handleShareClick = (event, article) => {
    setAnchorEl(event.currentTarget);
    setSelectedArticle(article);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedArticle(null);
  };

  const handleShareOption = (platform) => {
    if (selectedArticle) {
      const title = selectedArticle.title;
      const shareUrl = encodeURIComponent(`Check out this article: "${title}"`);
      
      switch (platform) {
        case 'whatsapp':
          window.open(`https://wa.me/?text=${shareUrl}`, '_blank');
          break;
        case 'mail':
          window.open(`mailto:?subject=Interesting Article&body=${shareUrl}`, '_blank');
          break;
        case 'copy':
          navigator.clipboard.writeText(`Check out this article: "${title}"`);
          alert('Link copied to clipboard!');
          break;
        default:
          break;
      }
      handleClose();
    }
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#333' }}>
      </Typography>

      {/* Bookmarked Articles List */}
      <Box sx={{ mt: 4, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
        <Typography variant="h6" color="primary">Bookmarked Articles</Typography>
        <Divider sx={{ my: 1 }} />
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {bookmarkedArticles.map((article) => (
            <li key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0', fontSize: '1rem' }}>
              {article.title}
              <Box>
                <IconButton color="primary" onClick={() => handleUnbookmark(article.id)}>
                  <BookmarkIcon />
                </IconButton>
                <IconButton color="primary" onClick={(event) => handleShareClick(event, article)}>
                  <ShareIcon />
                </IconButton>
              </Box>
            </li>
          ))}
        </ul>
      </Box>

      {/* Share Options Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleShareOption('whatsapp')}>Share via WhatsApp</MenuItem>
        <MenuItem onClick={() => handleShareOption('mail')}>Share via Email</MenuItem>
        <MenuItem onClick={() => handleShareOption('copy')}>Copy Link</MenuItem>
      </Menu>
    </Box>
  );
};

export default Dashboard;
