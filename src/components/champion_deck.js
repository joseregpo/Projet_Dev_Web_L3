import { React, useState, useEffect } from "react";
import { Grid } from "@mui/material";
import AllCards from "./allCards";
import Deck from "./deck";

export default function ChampionDeck() {
  const [champions, setChampions] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        // const res = [];
        // for (const c of response) {
        //   let champ = {
        //     id: c.id,
        //     nomChamp: c.key,
        //     imgUrl:
        //       "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
        //       c.key +
        //       "_0.jpg",
        //     desc: c.title,
        //   };
        //   res.push(champ);
        // }
        setChampions(data);
      });
  }, []);

  const addCard = (champion) => {
    if (champions.includes(champion)) {
      let copyChamp = [...champions];
      let index = copyChamp.indexOf(champion);
      if (index > -1) {
        copyChamp.splice(index, 1);
      }
      let copyDeck = [...deck];
      copyDeck.push(champion);
      setChampions(copyChamp);
      setDeck(copyDeck);
    } else if (deck.includes(champion)) {
      let copyDeck = [...deck];
      let index = copyDeck.indexOf(champion);
      if (index > -1) {
        copyDeck.splice(index, 1);
      }
      let copyChamp = [...champions];
      copyChamp.push(champion);
      setChampions(copyChamp);
      setDeck(copyDeck);
    }
    console.log(deck)
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <AllCards champions={champions} onClick={addCard}/>
      </Grid>
      <Grid item xs={6}>
        <Deck deck={deck} />
      </Grid>
    </Grid>
  );
}
