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
    CardActions
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

        <Card component="form" sx={{ width: 550 }} onSubmit={handleSubmit}>
            <CardMedia
                sx={{ minHeight: 300 }}
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
                <Typography variant="body2" color="text.secondary" textAlign={"justify"} sx={{height: 120, overflow: "auto"}}>
                    {planEntretien.plan.description}
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" variant="contained" type="submit">Sélectionner</Button>
            </CardActions>
        </Card>

        // <Paper elevation={4} sx={{ minWidth: 500, padding: 5 }} square={false}>
        //     <Box component="form" sx={{ width: '100%' }} onSubmit={handleSubmit}>
        //         <Grid container direction={"column"} spacing={2}>

        //             <Grid item>
        //                 <Typography variant="h6">
        //                     Je choisis mon plan d'entretien
        //                 </Typography>
        //             </Grid>

        //             <Grid item>
        //                 <FormControl fullWidth >
        //                     <InputLabel id="plan-select-label">Plan d'entretien</InputLabel>
        //                     <Select
        //                         labelId="plan-select-label"
        //                         id="plan-select"
        //                         value={planEntretien}
        //                         label="Plan d'entretien"
        //                         onChange={planChange}
        //                     >
        //                         {plans.map((plan, index) => {
        //                             return <MenuItem key={index} value={plan}>{plan.plan_name}</MenuItem>
        //                         })}
        //                     </Select>
        //                 </FormControl>
        //             </Grid>

        //             <Grid item>
        //                 <FormControl >
        //                     <Button color="primary" type="submit" variant="contained">Valider</Button>
        //                 </FormControl>
        //             </Grid>
        //         </Grid>
        //     </Box>
        // </Paper>
    );
};

export default ChoixPlanEntretien;