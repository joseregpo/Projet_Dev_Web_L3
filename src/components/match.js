import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Champion from './championCard';
import { Box, Card, CardMedia, Grid } from '@mui/material';
import lolIcon from './../img/lol_icon.jpeg'
export default function Match(props){

    const state = useSelector(state => state);
    const addRandomCard = () => {
        // Add random inex from props.champions to the state attribut myDeck
    }
    const championCards = props.champions.map((champ) =>{
        return (
            <Grid item width="10%">
                <Champion key={champ.id} nomChamp={champ.nomChamp} imgUrl={champ.imgUrl} desc={champ.desc } fullChamp={champ}/>
            </Grid>
        )
    })
    return(
        <div>
            <Box sx={{ 
                flexGrow: 1,
                width: "100%"
            }}>
            <Card sx={{ maxWidth: "10%" , height:"10%"}}>
                <CardMedia
                    sx={{ height: 140}}
                    image={lolIcon}
                    alt="tas de cartes"
                />
            </Card>
            </Box>
        </div>
    )
}