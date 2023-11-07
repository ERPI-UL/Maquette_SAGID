import React, { useState } from "react";
import plans from '../data/plans-entretien.json'
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Typography,
    Button,
    Box,
    Paper,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Services from "../services/services.js"

const ChoixPlanEntretien = ({ currentData, setCurrentData, redirect }) => {
    const [planEntretien, setPlanEntretien] = useState({index:0, plan: plans[0]});
    const navigate = useNavigate();

    const previous = () => {
        var index = planEntretien.index - 1;
        if (index < 0) { index += plans.length }
        setPlanEntretien({index, plan: plans[index]})
    }

    const next = () => {
        var index = planEntretien.index + 1;
        if (index >= plans.length) { index %= 4 }
        setPlanEntretien({index, plan: plans[index]})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setCurrentData(Services.compute_kpi({ ...currentData, planEntretien: planEntretien.plan }));
        redirect && navigate(redirect);
    }

    return (
        <Grid className='choixEntretienPage' container direction={"row"} justifyContent="center" alignItems="center" sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/route_departementale.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'100vh'
        }}>
            <Paper elevation={4} sx={{ minWidth: 860, maxWidth: 1000, width: '70%', padding: 5 }} square={false}>
                <Grid item container direction="row" alignItems="center" justifyContent="center" spacing={5}>
                    <Grid item sx={{ width: '50%'}} container direction={"column"} spacing={5}>
                        <Grid item>
                            <Typography variant="h3">
                                Plan d'entretien
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography paragraph={true} align="justify">
                                La stratégie d’entretien appliquée sur le territoire a une importance considérable sur tous les paramètres évalués. Choisir un plan d’entretien similaire à ce qui est réalisé sur votre territoire permettra d’avoir des estimations au plus proche de la réalité.

                                Cette étape est une pré-configuration de l’outil, il vous sera possible de configurer votre plan d’entretien plus en détail par la suite.
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item sx={{ width: '50%'}}>
                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container direction={"column"} spacing={2}>
                                <Grid item>
                                    <img 
                                        src={planEntretien.plan.image_url}
                                        alt={planEntretien.plan.plan_name}
                                    ></img>
                                </Grid>
                                <Grid item>
                                    <Grid container spacing={2} justifyContent={"center"} alignItems={"center"} sx={{height: 80}}>
                                        <Grid item>
                                            <Button onClick={previous} size="small" variant="contained" aria-label="precedent">
                                                <ArrowBackIosIcon />
                                            </Button>
                                        </Grid>
                                        <Grid item>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {planEntretien.plan.plan_name}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Button onClick={next} size="small" variant="contained" aria-label="precedent">
                                                <ArrowForwardIosIcon />
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <Typography variant="body2" color="text.secondary" textAlign={"justify"} sx={{height: 100, overflow: "auto"}}>
                                        {planEntretien.plan.description}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button size="small" variant="contained" type="submit">Sélectionner</Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

        </Grid>
    );
};

export default ChoixPlanEntretien;