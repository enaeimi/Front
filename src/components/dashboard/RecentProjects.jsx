// src/components/dashboard/RecentProjects.jsx
import React from "react";
import { Paper, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Chip } from "@mui/material";

const RecentProjects = () => {
    const projects = [
        {
            id: 1,
            name: "Site Web E-commerce",
            status: "En cours",
            date: "2024-02-15",
        },
        {
            id: 2,
            name: "Application Mobile",
            status: "En attente",
            date: "2024-02-14",
        },
        {
            id: 3,
            name: "Dashboard Analytics",
            status: "Terminé",
            date: "2024-02-13",
        },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case "En cours":
                return "primary";
            case "En attente":
                return "warning";
            case "Terminé":
                return "success";
            default:
                return "default";
        }
    };

    return (
        <Paper sx={{ p: 2, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Projets Récents
            </Typography>
            <List>
                {projects.map((project) => (
                    <ListItem key={project.id}>
                        <ListItemText
                            primary={project.name}
                            secondary={`Dernière mise à jour: ${project.date}`}
                        />
                        <ListItemSecondaryAction>
                            <Chip
                                label={project.status}
                                color={getStatusColor(project.status)}
                                size="small"
                            />
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentProjects;
