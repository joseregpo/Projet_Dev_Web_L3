import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function Champion(props) {
  const nomChamp = props.nomChamp;
  const imgUrl = props.imgUrl;
  const desc = props.desc;

  return (
    <Card sx={{ maxWidth: "100%", height: "100%" }}>
      <CardMedia sx={{ height: 140 }} image={imgUrl} title={nomChamp} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {nomChamp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {desc}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ajouter</Button>
        <Button size="small">Infos</Button>
      </CardActions>
    </Card>
  );
}
