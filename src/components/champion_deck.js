import React from "react";
import { Grid } from "@mui/material"
import AllCards from "./allCards";
import Deck from "./deck";

export default function ChampionDeck(){
    return (
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <AllCards />
          </Grid>
          <Grid item xs={6}>
            <Deck />
          </Grid>
        </Grid>
      );
}