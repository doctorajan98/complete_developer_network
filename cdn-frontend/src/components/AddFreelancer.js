import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Grid,
  Alert,
  CircularProgress,
  Chip,
  Autocomplete,
  IconButton,
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { freelancerAPI } from '../services/api';

const AddFreelancer = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    userName: '',
    name: '',
    email: '',
    phoneNumber: '',
    skillSet: [],
    hobbies: [],
  });

  const [newSkill, setNewSkill] = useState('');
  const [newHobby, setNewHobby] = useState('');

  const commonSkills = [
    'JavaScript', 'TypeScript', 'React', 'Vue.js', 'Angular', 'Node.js',
    'Python', 'Java', 'C#', 'PHP', 'Ruby', 'Go', 'Rust',
    'HTML', 'CSS', 'SASS', 'LESS', 'Bootstrap', 'Tailwind CSS',
    'MongoDB', 'PostgreSQL', 'MySQL', 'Redis', 'Firebase',
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'Git', 'CI/CD',
    'Machine Learning', 'Data Science', 'DevOps', 'UI/UX Design',
    'Mobile Development', 'iOS', 'Android', 'Flutter', 'React Native'
  ];

  const commonHobbies = [
    'Reading', 'Writing', 'Photography', 'Music', 'Gaming', 'Sports',
    'Cooking', 'Traveling', 'Hiking', 'Swimming', 'Cycling', 'Running',
    'Painting', 'Drawing', 'Crafting', 'Gardening', 'Fishing', 'Camping',
    'Dancing', 'Singing', 'Playing Instruments', 'Chess', 'Board Games',
    'Movies', 'TV Shows', 'Podcasts', 'Blogging', 'Volunteering'
  ];

  const handleInputChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !formData.skillSet.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skillSet: [...formData.skillSet, newSkill.trim()],
      });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skillSet: formData.skillSet.filter(skill => skill !== skillToRemove),
    });
  };

  const handleAddHobby = () => {
    if (newHobby.trim() && !formData.hobbies.includes(newHobby.trim())) {
      setFormData({
        ...formData,
        hobbies: [...formData.hobbies, newHobby.trim()],
      });
      setNewHobby('');
    }
  };

  const handleRemoveHobby = (hobbyToRemove) => {
    setFormData({
      ...formData,
      hobbies: formData.hobbies.filter(hobby => hobby !== hobbyToRemove),
    });
  };

  const validateForm = () => {
    if (!formData.userName.trim()) {
      setError('Username is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await freelancerAPI.createFreelancer(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'Failed to create freelancer. Please try again.');
      console.error('Error creating freelancer:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={3}>
        <IconButton onClick={() => navigate('/')} sx={{ mr: 2 }}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" component="h1">
          Add New Freelancer
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Freelancer created successfully! Redirecting to the list...
        </Alert>
      )}

      <Card>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Basic Information */}
              <Grid size={12}>
                <Typography variant="h6" gutterBottom>
                  Basic Information
                </Typography>
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Username *"
                  value={formData.userName}
                  onChange={handleInputChange('userName')}
                  required
                  helperText="Unique username for the freelancer"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Full Name"
                  value={formData.name}
                  onChange={handleInputChange('name')}
                  helperText="Display name (optional)"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Email *"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange('email')}
                  required
                  helperText="Contact email address"
                />
              </Grid>

              <Grid size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleInputChange('phoneNumber')}
                  helperText="Contact phone number (optional)"
                />
              </Grid>

              {/* Skills Section */}
              <Grid size={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Skills
                </Typography>
              </Grid>

              <Grid size={12}>
                <Box display="flex" gap={1} mb={2}>
                  <Autocomplete
                    freeSolo
                    options={commonSkills}
                    value={newSkill}
                    onChange={(event, newValue) => setNewSkill(newValue || '')}
                    onInputChange={(event, newInputValue) => setNewSkill(newInputValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add Skill"
                        placeholder="Type or select a skill"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddSkill}
                    disabled={!newSkill.trim()}
                  >
                    Add
                  </Button>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.skillSet.map((skill, index) => (
                    <Chip
                      key={index}
                      label={skill}
                      onDelete={() => handleRemoveSkill(skill)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Hobbies Section */}
              <Grid size={12}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Hobbies
                </Typography>
              </Grid>

              <Grid size={12}>
                <Box display="flex" gap={1} mb={2}>
                  <Autocomplete
                    freeSolo
                    options={commonHobbies}
                    value={newHobby}
                    onChange={(event, newValue) => setNewHobby(newValue || '')}
                    onInputChange={(event, newInputValue) => setNewHobby(newInputValue)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Add Hobby"
                        placeholder="Type or select a hobby"
                        size="small"
                        sx={{ flexGrow: 1 }}
                      />
                    )}
                  />
                  <Button
                    variant="outlined"
                    startIcon={<AddIcon />}
                    onClick={handleAddHobby}
                    disabled={!newHobby.trim()}
                  >
                    Add
                  </Button>
                </Box>

                <Box display="flex" flexWrap="wrap" gap={1}>
                  {formData.hobbies.map((hobby, index) => (
                    <Chip
                      key={index}
                      label={hobby}
                      onDelete={() => handleRemoveHobby(hobby)}
                      color="secondary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Grid>

              {/* Submit Buttons */}
              <Grid size={12}>
                <Box display="flex" gap={2} justifyContent="flex-end" sx={{ mt: 3 }}>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    startIcon={loading ? <CircularProgress size={20} /> : null}
                  >
                    {loading ? 'Creating...' : 'Create Freelancer'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AddFreelancer;
