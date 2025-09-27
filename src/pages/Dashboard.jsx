// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Typography, Paper, Box, Grid, Button, CircularProgress, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Assignment, People, TaskAlt, Timeline, Refresh } from "@mui/icons-material";
import RecentProjects from '../components/dashboard/RecentProjects'; 

const StatCard = ({ title, value, icon }) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Box display="flex" alignItems="center">
      {icon}
      <Box ml={2}>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h4">{value}</Typography>
      </Box>
    </Box>
  </Paper>
);
const Dashboard = () => {
  // Ajout des états
  const [isLoading, setIsLoading] = useState(false);
  const [stats, setStats] = useState([
    // Simulons des données pour l'instant
    { title: "Projets Actifs", value: "5", icon: <Assignment color="primary" /> },
    { title: "Membres", value: "12", icon: <People color="secondary" /> },
    { title: "Tâches", value: "25", icon: <TaskAlt color="success" /> },
    { title: "En cours", value: "8", icon: <Timeline color="warning" /> },
  ]);
  // Ajout du state pour le filtre
  const [timeFilter, setTimeFilter] = useState('all');

  // Données du graphique avec plus d'options
  const [chartData, setChartData] = useState([
    { name: "Jan", tasks: 4, completed: 2 },
    { name: "Fév", tasks: 3, completed: 3 },
    { name: "Mar", tasks: 6, completed: 4 },
    { name: "Avr", tasks: 8, completed: 6 },
    { name: "Mai", tasks: 7, completed: 5 },
  ]);

  // Fonction pour filtrer les données
  const handleFilterChange = (event) => {
    const filter = event.target.value;
    setTimeFilter(filter);

    // Simulons des données différentes selon le filtre
    let newData;
    switch (filter) {
      case 'week':
        newData = chartData.slice(-1);
        break;
      case 'month':
        newData = chartData.slice(-2);
        break;
      case 'quarter':
        newData = chartData.slice(-3);
        break;
      default:
        newData = chartData;
    }
    setChartData(newData);
  };
  // Fonction pour simuler le rafraîchissement des données
  const handleRefresh = () => {
    setIsLoading(true);

    // Simulons une requête API avec setTimeout
    setTimeout(() => {
      // Générons des nombres aléatoires pour simuler de nouvelles données
      const newStats = stats.map(stat => ({
        ...stat,
        value: Math.floor(Math.random() * 30).toString()
      }));

      setStats(newStats);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>

        <Button variant="contained"
          startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <Refresh />}
          onClick={handleRefresh}
          disabled={isLoading} >

          {isLoading ? 'Rafraîchissement...' : 'Rafraîchir'}
        </Button>
      </Box>

      <Typography variant="h4">Tableau de bord</Typography>
      <Typography variant="body1"> Bienvenue dans votre tableau de bord </Typography>

      <Grid container spacing={3}> {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <StatCard {...stat} />
        </Grid>
      ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Progression des tâches
              </Typography>
              <FormControl sx={{ minWidth: 120 }}>
                <InputLabel>Période</InputLabel>
                <Select
                  value={timeFilter}
                  label="Période"
                  onChange={handleFilterChange}
                  size="small"
                >
                  <MenuItem value="all">Tout</MenuItem>
                  <MenuItem value="week">Semaine</MenuItem>
                  <MenuItem value="month">Mois</MenuItem>
                  <MenuItem value="quarter">Trimestre</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <LineChart width={700} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#8884d8"
                name="Tâches totales"
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#82ca9d"
                name="Tâches terminées"
              />
            </LineChart>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <RecentProjects />
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
