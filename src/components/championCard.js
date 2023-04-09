import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Champion(props) {
  const nomChamp = props.nomChamp;
  const imgUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${props.k}_0.jpg`
  const attack = props.info.attack
  const defense = props.info.defense
  const difficulty = props.info.difficulty
  const magic = props.info.magic

  const info = "Attaque : " + attack + "\nDefense : " + defense + "\nDifficulty : " + difficulty + "\nMagic : " + magic

  return (
    <Card sx={{ maxWidth: "100%", height: "100%" }}>
      <CardMedia sx={{ height: 140 }} image={imgUrl} title={nomChamp} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nomChamp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {info}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ajouter</Button>
        <Button size="small">Infos</Button>
      </CardActions>
    </Card>
  );
}
