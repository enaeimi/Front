// src/pages/Projects.jsx
import React, { useState } from "react";
import { useSelector } from 'react-redux';
import {
  Typography, Paper, List, ListItem, ListItemText, ListItemSecondaryAction, Chip, Box, InputLabel,
  Select, MenuItem, FormControl
} from '@mui/material';


const Projects = () => {
  const allProjects = useSelector(state => state.projects.items);
  const projectCount = useSelector(state => state.projects.items.length);

  // const [searchTerm, setSearchTerm] = useState('');
  // const searchResults = useSelector(state =>
  //   state.projects.items.filter(project =>
  //     project.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  // );
  // const handleSearch(event) => {
  //   const search = event.target.value;
  // }

  const [statusFilter, setStatusFilter] = useState('all');
  const filteredProjects = allProjects.filter(project =>
    statusFilter === 'all' ? true : project.status === statusFilter
  );
  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des Projets {projectCount}
      </Typography>
      <InputLabel>Période</InputLabel>
      <Select
        value={statusFilter}
        label="Filtrer par statut"
        onChange={handleStatusChange}
      >
        <MenuItem value="all">Tout les projets</MenuItem>
        <MenuItem value="En Cours">En cours</MenuItem>
        <MenuItem value="En Attente">En attent</MenuItem>
        <MenuItem value="Terminé">Terminé</MenuItem>
      </Select>

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