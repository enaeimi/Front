// src/components/layout/Sidebar.jsx
import React from "react";
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Dashboard, Assignment, People, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Projets", icon: <Assignment />, path: "/projects" },
    { text: "Équipe", icon: <People />, path: "/team" },
    { text: "Paramètres", icon: <Settings />, path: "/settings" },
  ];

  return (
    <Drawer variant="permanent">
      <List>
        {menuItems.map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
