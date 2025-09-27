// src/pages/Projects.jsx
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip,
  Box,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddProjectForm from "../components/projects/AddProjectForm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { tr } from "date-fns/locale";

const Projects = () => {
  const allProjects = useSelector((state) => state.projects.items);
  const projectCount = useSelector((state) => state.projects.items.length);
  const [showForm, setShowForm] = useState(false);
  const [editProject, setEditProject] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const [statusFilter, setStatusFilter] = useState("all");
  const filteredProjects = allProjects.filter(
    (project) =>
      (statusFilter === "all" ? true : project.status === statusFilter) &&
      project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
  };
  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };
  const handleEdit = (project) => {
    setEditProject(project);
    handleToggleForm(true);
    
  };
  const handleDelete = (projectId) => {
    // Implémentez la logique de suppression ici
    console.log("Supprimer le projet avec ID:", projectId);
  };
  const handleCloseForm = () => {
    setShowForm(false);
    setEditProject(null);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Liste des Projets {projectCount}
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleToggleForm}
        sx={{ mb: 2 }}
      >
        {showForm ? "Fermer le formulaire" : "Ajouter un projet"}
      </Button>

      {showForm && (
        <AddProjectForm editProject={editProject} onClose={handleCloseForm} />
      )}

      <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
        <TextField
          label="Rechercher un projet"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          size="small"
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <SearchIcon sx={{ color: "action.active", mr: 1 }} />
            ),
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
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  startIcon={<EditIcon />}
                  sx={{ mr: 1 }}
                  onClick={() => handleEdit(project)}
                >
                  Modifier
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  size="small"
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDelete(project.id)}
                >
                  Supprimer
                </Button>
                <Chip
                  label={project.status}
                  color={
                    project.status === "En Cours"
                      ? "primary"
                      : project.status === "Terminé"
                      ? "success"
                      : project.status === "En Attente"
                      ? "warning"
                      : "default"
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
