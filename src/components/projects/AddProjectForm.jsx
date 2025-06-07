// Structure de base à compléter
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextField, Button, Paper, Stack, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { addProject } from '../../store/projectSlice';


const AddProjectForm = () => {
    const dispatch = useDispatch();

    // Ajoutez votre state ici


    // Ajoutez votre fonction de gestion du formulaire ici
    const [projectName, setProjectName] = useState('');
    const [projectState, setProjectState] = useState('');
    const [errors, setErrors] = useState({
        projectName: '',
        projectState: '',
    });


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Nom du projet:', projectName);
        console.log('Etat du projet:', projectState);
        //Réinitialiser les erreurs
        setErrors({
            projectName: '',
            projectState: '',
        });

        //Validation 
        let hasErrors = false;
        const newErrors = {
            projectName: '',
            projectState: '',
        };
        if (!projectName.trim()) {
            newErrors.projectName = 'le nom du projet est requis !'
            hasErrors = true;
        }
        if (!projectState) {
            newErrors.projectState = 'Veuillez sélectionner un état';
            hasErrors = true;
        }

        if (hasErrors) {
            setErrors(newErrors);
            return;
        }
        // Si pas d'erreurs, on peut soumettre le formulaire
        const newProject = {
            id: Date.now(), // Génère un ID unique
            name: projectName,
            status: projectState,
            date: new Date().toISOString().split('T')[0]
        };

        // Dispatch l'action pour ajouter le projet
        dispatch(addProject(newProject));


        console.log('Projet soumis:', { projectName, projectState });

        // Réinitialiser le formulaire
        setProjectName('');
        setProjectState('');
    };

    return (
        // Créez votre formulaire ici
        <Paper sx={{ p: 2 }}>
            <Typography variant="h6">Ajouter un nouveau projet</Typography>
            <form onSubmit={handleSubmit}>
                <Stack spacing={2}>
                    <TextField label="Nom du projet" value={projectName} onChange={(e) => setProjectName(e.target.value)}
                        error={!!errors.projectName} helperText={errors.projectName} />
                    <FormControl>
                        <InputLabel>État</InputLabel>
                        <Select value={projectState}
                            onChange={(e) => setProjectState(e.target.value)}
                            label="État">
                            <MenuItem value="En Cours">En Cours</MenuItem>
                            <MenuItem value="En Attente">En Attente</MenuItem>
                            <MenuItem value="Terminé">Terminé</MenuItem>
                            <MenuItem value="Validé">Validé</MenuItem>
                        </Select>
                        {errors.projectState && (
                            <Typography color="error" variant="caption">
                                {errors.projectState}
                            </Typography>
                        )}
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary">Ajouter</Button>
                </Stack>
            </form>
        </Paper>

    );
};

export default AddProjectForm;