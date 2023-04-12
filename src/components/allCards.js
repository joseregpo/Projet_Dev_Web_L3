import Champion from "./championCard";
import { Box, Grid } from "@mui/material";

export default function AllCards(props) {

  const championCards = props.champions.map((champ) => {
    return (
      <Grid item width="33%"> 
      {/* onClick={props.onClick(champ)} */}
        <Champion nomChamp={champ.name} k={champ.key} info={champ.info} fullChamp={champ} onClick={() =>props.onClick(champ)}/>
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
