import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Chip,
  Alert,
  CircularProgress,
  Fab,
  Tooltip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Code as CodeIcon,
  Sports as SportsIcon,
} from '@mui/icons-material';
import { freelancerAPI } from '../services/api';

const FreelancerList = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [freelancerToDelete, setFreelancerToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFreelancers();
  }, []);

  const fetchFreelancers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await freelancerAPI.getAllFreelancers();
      setFreelancers(data);
    } catch (err) {
      setError('Failed to fetch freelancers. Please try again.');
      console.error('Error fetching freelancers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    try {
      setIsSearching(true);
      const results = await freelancerAPI.searchFreelancers(searchQuery);
      setSearchResults(results);
    } catch (err) {
      setError('Failed to search freelancers. Please try again.');
      console.error('Error searching freelancers:', err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleDeleteClick = (freelancer) => {
    setFreelancerToDelete(freelancer);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await freelancerAPI.deleteFreelancer(freelancerToDelete.userId);
      setFreelancers(freelancers.filter(f => f.userId !== freelancerToDelete.userId));
      setDeleteDialogOpen(false);
      setFreelancerToDelete(null);
    } catch (err) {
      setError('Failed to delete freelancer. Please try again.');
      console.error('Error deleting freelancer:', err);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setFreelancerToDelete(null);
  };

  const displayData = searchQuery.trim() ? searchResults : freelancers;

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Freelancers Directory
        </Typography>
        <Tooltip title="Add New Freelancer">
          <Fab color="primary" aria-label="add" onClick={() => navigate('/add')}>
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search freelancers by name, skills, or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch} disabled={isSearching}>
                {isSearching ? <CircularProgress size={20} /> : <SearchIcon />}
              </IconButton>
            ),
          }}
        />
      </Box>

      {/* Results Count */}
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {searchQuery.trim()
          ? `Found ${searchResults.length} result(s) for "${searchQuery}"`
          : `Total: ${freelancers.length} freelancer(s)`
        }
      </Typography>

      {/* Freelancer Cards */}
      <Grid container spacing={3}>
        {displayData.length === 0 ? (
          <Grid size={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" align="center" color="text.secondary">
                  {searchQuery.trim() ? 'No freelancers found matching your search.' : 'No freelancers registered yet.'}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ) : (
          displayData.map((freelancer) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={freelancer.userId}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
                    <Typography variant="h6" component="h2">
                      {freelancer.name || freelancer.userName}
                    </Typography>
                    <Box>
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/edit/${freelancer.userId}`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteClick(freelancer)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box mb={2}>
                    <Box display="flex" alignItems="center" mb={1}>
                      <PersonIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        @{freelancer.userName}
                      </Typography>
                    </Box>

                    {freelancer.email && (
                      <Box display="flex" alignItems="center" mb={1}>
                        <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {freelancer.email}
                        </Typography>
                      </Box>
                    )}

                    {freelancer.phoneNumber && (
                      <Box display="flex" alignItems="center" mb={1}>
                        <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          {freelancer.phoneNumber}
                        </Typography>
                      </Box>
                    )}
                  </Box>

                  {freelancer.skillSet && freelancer.skillSet.length > 0 && (
                    <Box mb={2}>
                      <Box display="flex" alignItems="center" mb={1}>
                        <CodeIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Skills:
                        </Typography>
                      </Box>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {freelancer.skillSet.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            size="small"
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}

                  {freelancer.hobbies && freelancer.hobbies.length > 0 && (
                    <Box>
                      <Box display="flex" alignItems="center" mb={1}>
                        <SportsIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2" color="text.secondary">
                          Hobbies:
                        </Typography>
                      </Box>
                      <Box display="flex" flexWrap="wrap" gap={0.5}>
                        {freelancer.hobbies.map((hobby, index) => (
                          <Chip
                            key={index}
                            label={hobby}
                            size="small"
                            color="secondary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Freelancer</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete {freelancerToDelete?.name || freelancerToDelete?.userName}?
            This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default FreelancerList;
