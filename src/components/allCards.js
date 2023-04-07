import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Champion from './championCard';
import { Box, Grid } from '@mui/material';
import { useLoaderData  } from 'react-router-dom';
export default function AllCards(){

    const user = useSelector(state => state);
    const champions = useLoaderData("root");
    console.log(champions);
    const championCards = champions.map((champ) =>{
        return (
            <Grid item width="10%">
                <Champion nomChamp={champ.nomChamp} imgUrl={champ.imgUrl} desc={champ.desc } fullChamp={champ}/>
            </Grid>
        )
    })
    return(
        <div>
            <Box sx={{ 
                flexGrow: 1,
                width: "100%"
            }}>
                <Grid 
                container 
                spacing={4} 
                display="flex"
                justifyContent="space-around"
                justifyItems="flex-start"
                >
                    {championCards}
                </Grid>
            </Box>
        </div>
    )
}