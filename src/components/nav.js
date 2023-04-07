import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch, useSelector } from 'react-redux'; 
import { userDisconnect } from '../store';
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state);
    const [pageTitle, setPageTitle] = React.useState('Accueil');
  
    const togglePageTitle = (newValue) => {
      setPageTitle(newValue);
    };

    const openProfilMenu = () => {

    }

    const match = () => {

    }

    const logout = () => {
      const url = "http://localhost:3001/logout";

      const requestOptions = {
        method: "POST",
        headers: { "WWW-Authenticate" : user.token },
      };
      fetch(url, requestOptions)
        .then((data) => {
          dispatch(userDisconnect())
          navigate("/auth")
        }); 
    }

    const login = () =>{
      navigate("/auth")
      togglePageTitle("Connexion")
    }

    const cards = () => {
      navigate("/champions")
      togglePageTitle("Champions")
    }
  
    return (
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" style={{ backgroundColor: "#5b5b5b"}}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            League of Stones
            <Button size="large" color="inherit" onClick={cards}>Cards</Button>
          </Typography>
          <Button size="large" color="inherit" onClick={login}>{user.username}</Button>
        </Toolbar>
      </AppBar>
    </Box>
    );
}
