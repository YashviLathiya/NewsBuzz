import React, { useState } from 'react';
import { Box, Typography, Card, CardContent, Divider, IconButton, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const Dashboard = () => {
  const [followingChannels, setFollowingChannels] = useState([
    { id: 1, name: 'Tech Daily' },
    { id: 2, name: 'Sports Weekly' },
    { id: 3, name: 'Political Insights' },
  ]);

  const [likedArticles, setLikedArticles] = useState([
    { id: 1, title: 'The Rise of AI in Healthcare', liked: true },
    { id: 2, title: 'Top 10 Moments in Sports 2024', liked: true },
  ]);

  const [showFollowingList, setShowFollowingList] = useState(false);
  const [showLikedArticlesList, setShowLikedArticlesList] = useState(false);

  const toggleFollowingList = () => {
    setShowFollowingList(!showFollowingList);
    setShowLikedArticlesList(false); // Close liked articles list if open
  };

  const toggleLikedArticlesList = () => {
    setShowLikedArticlesList(!showLikedArticlesList);
    setShowFollowingList(false); // Close following list if open
  };

  const handleUnfollow = (id) => {
    setFollowingChannels(followingChannels.filter(channel => channel.id !== id));
  };

  const toggleLike = (id) => {
    setLikedArticles(likedArticles.map(article =>
      article.id === id ? { ...article, liked: !article.liked } : article
    ).filter(article => article.liked)); // Only keep liked articles in the state
  };

  return (
    <Box sx={{ p: 3, textAlign: 'center', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Typography variant="h4" sx={{ mb: 3, color: '#333' }}>
        Dashboard
      </Typography>

      <Box sx={{ display: 'flex', gap: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Card
          sx={{
            width: 220,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #3a7bd5, #3a6073)',
            color: '#fff',
            '&:hover': { opacity: 0.85 },
            textAlign: 'center',
          }}
          onClick={toggleFollowingList}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {followingChannels.length}
            </Typography>
            <Typography>Following Channels/Authors</Typography>
          </CardContent>
        </Card>

        <Card
          sx={{
            width: 220,
            cursor: 'pointer',
            background: 'linear-gradient(135deg, #43cea2, #185a9d)',
            color: '#fff',
            '&:hover': { opacity: 0.85 },
            textAlign: 'center',
          }}
          onClick={toggleLikedArticlesList}
        >
          <CardContent>
            <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
              {likedArticles.filter(article => article.liked).length}
            </Typography>
            <Typography>Liked Articles</Typography>
          </CardContent>
        </Card>
      </Box>

      {/* Following Channels/Authors List */}
      {showFollowingList && (
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" color="primary">Followed Channels/Authors</Typography>
          <Divider sx={{ my: 1 }} />
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {followingChannels.map((channel) => (
              <li key={channel.id} style={{ display: 'flex', justifyContent: 'space-between', margin: '8px 0', fontSize: '1rem' }}>
                {channel.name}
                <Button variant="contained" color="primary" size="small" onClick={() => handleUnfollow(channel.id)}>
                  Unfollow
                </Button>
              </li>
            ))}
          </ul>
        </Box>
      )}

      {/* Liked Articles List */}
      {showLikedArticlesList && (
        <Box sx={{ mt: 4, p: 2, backgroundColor: '#fff', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" color="primary">Liked Articles</Typography>
          <Divider sx={{ my: 1 }} />
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {likedArticles.map((article) => (
              <li key={article.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '8px 0', fontSize: '1rem' }}>
                {article.title}
                <IconButton color="primary" onClick={() => toggleLike(article.id)}>
                  {article.liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                </IconButton>
              </li>
            ))}
          </ul>
        </Box>
      )}
    </Box>
  );
};

export default Dashboard;
