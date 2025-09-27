// src/pages/Settings.jsx
import { useState } from 'react';
import {  Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Box, InputLabel, Select, MenuItem, FormControl } from '@mui/material';

const Settings = () => {
  // ajouter des états local pour gérer langugage, thème
  const [language, setLanguage] = useState('fr');
  const [theme, setTheme] = useState('light');
  const [profile, setProfile] = useState({ name: '', email: '', password: '' });

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleThemeChange = (event) => {
    setTheme(event.target.value);
  };

  // Ajouter des fonctions pour gérer les changements de profil
  const handleProfileChange = (event) => {
    const { name, value } = event.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
     <Box sx={{ maxWidth: 500, mx: 'auto', mt: 4 }}>
          <Typography variant="h4">Paramètres</Typography>
      <Typography variant="h5">Gérer les paramètres de l'application</Typography>
      <Typography variant="h6">Langue</Typography>

      <Select value={language} onChange={handleLanguageChange}>
        <MenuItem value="fr">Français</MenuItem>
        <MenuItem value="en">English</MenuItem>
        <MenuItem value="es">Español</MenuItem>
      </Select>
      <Typography variant="h6">Thème</Typography>
      <Select value={theme} onChange={handleThemeChange}>
        <MenuItem value="light">Clair</MenuItem>
        <MenuItem value="dark">Sombre</MenuItem>
      </Select>
      <Typography variant="h6">Notifications</Typography>
      <Typography variant="body1">Gérer les notifications</Typography>
      <Typography variant="h6">Sécurité</Typography>
      <Typography variant="body1">Gérer les paramètres de sécurité</Typography>
      <Typography variant="h6">Système</Typography> 
      <Typography variant="body1">Configuration du système</Typography>
    </Box>
  );
};

export default Settings;