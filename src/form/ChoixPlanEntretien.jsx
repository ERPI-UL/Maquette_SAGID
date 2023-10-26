import React, { useState } from "react";
import plans from '../data/plans-entretien.json'
import { useNavigate } from "react-router-dom";
import {
    Grid,
    Typography,
    Button,
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Paper
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
        <Grid className='choixEntretienPage' container direction={"row"} justifyContent="center" alignItems="center" spacing={2} sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL + '/images/route_departementale.jpg'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'100vh'
        }}>
          <Grid item container direction="row" justifyContent="center" alignItems="center">
                <Card component="form" sx={{ minWidth: 450, maxWidth: 500, width: '70%', padding: 2 }} onSubmit={handleSubmit} elevation={4} square={false}>
                    <CardMedia
                        sx={{ minHeight: 225, backgroundSize: "contain" }}
                        image={planEntretien.plan.image_url}
                        title={planEntretien.plan.plan_name}
                    />
                    <CardContent>
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
                        <Typography variant="body2" color="text.secondary" textAlign={"justify"} sx={{height: 245, overflow: "auto"}}>
                            {planEntretien.plan.description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" variant="contained" type="submit">Sélectionner</Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    );
};

export default ChoixPlanEntretien;