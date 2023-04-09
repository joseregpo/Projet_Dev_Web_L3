import { useEffect, useState } from "react";
import Champion from "./championCard";
import { Box, Grid } from "@mui/material";


export default function AllCards() {

  const [champions, setChampions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/cards")
      .then((response) => response.json())
      .then((response) => {
        const res = [];
        for (const c of response) {
          let champ = {
            id: c.id,
            nomChamp: c.key,
            imgUrl:
              "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/" +
              c.key +
              "_0.jpg",
            desc: c.title,
          };
          res.push(champ);
        }
        setChampions(res);
      });
  }, []);
  // en le prenant depuis le store


  const championCards = champions.map((champ) => {
    return (
      <Grid item width="30%">
        <Champion
          nomChamp={champ.nomChamp}
          imgUrl={champ.imgUrl}
          desc={champ.desc}
          fullChamp={champ}
        />
      </Grid>
    );
  });
  return (
    <>
        <h1>Champions</h1>
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
