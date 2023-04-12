//Imports pour React
import * as React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux'; 
import { useEffect, useState } from 'react';
//Imports pour Material UI
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Avatar from '@mui/material/Avatar';

//Design out of principal function
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Matchmaking() {
//INITIALISATION
  //Définir qu'on veut se BAGARRER
  let matchmaking = new Object;
  const user = useSelector(state => state)
  const token = user.token
  //console.log(token)

  //unparticipate()

  function unparticipate()
  {
    const url = "http://localhost:3001/matchmaking/unparticipate";
    const requOptions = {
      method: "GET",
      headers: { "WWW-Authenticate": token },
    };
    fetch(url, requOptions).then((response) => console.log(response));
  }


  //Participation de soi-même au combat
  const url = "http://localhost:3001/matchmaking/participate";
  const requestOptions = {
      method: "GET",
      headers: { "WWW-Authenticate": token },
    };
  fetch(url, requestOptions).then((response) => response.json()
                                                        .then(  data => {
                                                                matchmaking.matchmakingId = data.matchmakingId;
                                                                matchmaking.request = data.request;
                                                            }));
  //console.log("Mon matchmaking : ")
  //console.log(matchmaking);

  //Requete toute les 10 secondes pour savoir qui veut se bagarrer
  const intervalID = setInterval(updateRequest, 10000);
  function updateRequest() {
    // Your code here
    const url = "http://localhost:3001/matchmaking/participate";
    const requestOptions = {
        method: "GET",
        headers: { "WWW-Authenticate": token },
    };
    fetch(url, requestOptions).then((response) => response.json()
                                                          .then(  data => {
                                                                  matchmaking.request = data.request;
                                                              }));
    //console.log(matchmaking);
  }

  const intervalRequest = setInterval(printRequest,10000)
  function printRequest()
  {
    //console.log(matchmaking)
    if(matchmaking.request.length > 0)
    {
      let demande  = matchmaking.request[0]
      let nom = demande.name
      let id = demande.matchmakingId
      //Afficher le pop up
      handleClickOpen(nom,id)
    }
  }

  //Récuperer la liste des utilisateurs qui veulent se BAGARRER
  const [players, setPlayers] = useState([]);
  const urlID = "http://localhost:3001/matchmaking/getAll";
  useEffect(() => {
    fetch(urlID, requestOptions).then(response => response.json()
                                                        .then(  data => {
                                                                // console.log("le GetALLL : ")
                                                                // console.log(data);
                                                                let tableauBagarreur = [];
                                                                //Limite de 15 bagarreurs
                                                                if (tableauBagarreur.length > 15)
                                                                {
                                                                  for(let i=0;i<15;i++) 
                                                                  {
                                                                    tableauBagarreur.push(data[i]);   
                                                                  }
                                                                }
                                                                else
                                                                {
                                                                  tableauBagarreur = data;
                                                                }
                                                                setPlayers(tableauBagarreur);
                                                        }));
  }, []);

  function sendRequest(matchmakingId){
    //console.log(matchmakingId)
    const urlRequest = "http://localhost:3001/matchmaking/request?matchmakingId=" + matchmakingId;
    const rO = {
      method: "GET",
      headers: { "WWW-Authenticate" : token,},
  };
    fetch(urlRequest, rO).then(response => console.log(response));
  }

  function acceptRequest(matchmakingId){
    const urlRequest = "http://localhost:3001/matchmaking/acceptRequest?matchmakingId=" + matchmakingId;
    const rO = {
      method: "GET",
      headers: { "WWW-Authenticate" : token,},
  };
    fetch(urlRequest, rO).then(response => console.log(response));
  }

  function declineRequest(matchmakingId){
    const urlRequest = "http://localhost:3001/matchmaking/declineRequest?matchmakingId=" + matchmakingId;
    const rO = {
      method: "GET",
      headers: { "WWW-Authenticate" : token,},
  };
    fetch(urlRequest, rO).then(response => console.log(response));
  }


  let listeIMG =  [ "https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/10.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/9.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/15.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/22.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/23.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/24.png"
                    ,"https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/25.png"
                  ]
  let indexIMGButton = new Map();
  for(let i=0;i<players.length;i++)
  {
    indexIMGButton.set(players[i].matchmakingId,listeIMG[(0+i)%7]);
  }
  //Création du grid bagarre
  let grid = players.map((player) =>{
        return <Grid xs={2.4}>
                <Item>
                  <Button 
                    onClick={() => {
                                    sendRequest(player.matchmakingId);
                                    //Disable si possible
                                    console.log("MONIQUE");
                                   }
                            }
                  >
                    <Avatar sx={{ width: 112, height: 112 }} src={indexIMGButton.get(player.matchmakingId)} /><br/>
                  </Button>
                  <p>{player.name}</p>
                </Item>
              </Grid>
    });
  //console.log("Grid : ")
  //console.log(grid)
  
  const [open, setOpen] = React.useState(false);
  const [nom, setNom] = React.useState('');
  const [matchId, setMatchId] = React.useState('');

  const handleClickOpen = (name,matchId) => {
    setOpen(true);
    setNom(name);
    setMatchId(matchId);
    
  };

  const handleClose = () => {
    setOpen(false);
    //declineRequest(matchId);
    let remove = matchmaking.request.slice(1);
    matchmaking.request = [];
    //console.log(matchmaking)
  };

  const handleAccept = (matchmakingId) => {
    //appeler la méthode
    setOpen(false);
    acceptRequest(matchId);
    matchmaking.request = [];
  }

  return ( 
    //Créer les composants en fonction du nombre de participants

    <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Person X
        </Button> */}
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {grid}
          </Grid>
        </Box>
        
        {/* Partie validation / Dialog */}
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{`Voulez-vous défier ${nom} ?`}</DialogTitle>
          <DialogContent>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Refuser</Button>
            <Button onClick={handleAccept}>Accepter</Button>
          </DialogActions>
        </Dialog>
    </div>
  );

}























