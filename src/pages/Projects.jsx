// src/pages/Projects.jsx
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import {
  Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Box, InputLabel,
  Select, MenuItem, FormControl, TextField, Button, Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Projects = () => {
  const allProjects = useSelector(state => state.projects.items);
  const projectCount = useSelector(state => state.projects.items.length);

  const [searchTerm, setSearchTerm] = useState('');
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [statusFilter, setStatusFilter] = useState('all');
  const filteredProjects = allProjects.filter(project =>
    (statusFilter === 'all' ? true : project.status === statusFilter) &&
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des Projets {projectCount}
      </Typography>
      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Rechercher un projet"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: <SearchIcon sx={{ color: 'action.active', mr: 1 }} />,
          }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Filtrer par statut</InputLabel>
          <Select
            value={statusFilter}
            label="Filtrer par statut"
            onChange={handleStatusChange}
            size="small"
          >
            <MenuItem value="all">Tous les projets</MenuItem>
            <MenuItem value="En Cours">En cours</MenuItem>
            <MenuItem value="En Attente">En attente</MenuItem>
            <MenuItem value="Terminé">Terminé</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Paper>
        <List>
          {filteredProjects.map((project) => (
            <ListItem key={project.id}>
              <ListItemText
                primary={project.name}
                secondary={`Date: ${project.date}`}
              />
              <ListItemSecondaryAction>
                <Chip
                  label={project.status}
                  color={
                    project.status === "En Cours" ? "primary" :
                      project.status === "Terminé" ? "success" :
                        project.status === "En Attente" ? "warning" :
                          "default"
                  }
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
    // <div>
    //   <Typography variant="h4">Projets</Typography>
    //   <Typography variant="body1">Liste des projets</Typography>
    // </div>
  );
};

export default Projects;