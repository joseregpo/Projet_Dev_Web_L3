import React from "react";
import Champion from "./championCard";
import { Grid, Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function Deck(props){
    const user = useSelector((state) => state);

    const championCards = props.deck.map((champ) => {
        return (
          <Grid item width="33%"> 
          {/* onClick={props.onClick(champ)} */}
            <Champion nomChamp={champ.name} k={champ.key} info={champ.info} fullChamp={champ} onClick={() =>props.onClick(champ)}/>
          </Grid>
        );
      });
    const valider_deck = () => {
        const requestOptions = {
            method: "GET",
            headers: { "WWW-Authenticate": user.token },
        };
        const deck = props.deck.map((champ) => {return {"key" : champ.key}})
        fetch("http://localhost:3001/match/initDeck?deck="+JSON.stringify(deck), requestOptions)
            .then((response) => console.log(response))
    }
    return (
        <>
            <h1>Mon Deck</h1>
            <Button onClick={valider_deck()}>Valider</Button>
            <Box
                sx={{
                flexGrow: 1,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                }}
            >
                <Grid container spacing={4} width="90%" justifyContent="space-around">
                {championCards}
                </Grid>
            </Box>
        </>
    );
}