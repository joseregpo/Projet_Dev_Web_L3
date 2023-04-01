import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux'; 
import { userDisconnect } from '../store'
import { useNavigate } from "react-router-dom";

export default function NavBar() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(state => state);
    const [value, setValue] = React.useState('accueil');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
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
  
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          value={value}
          onChange={handleChange}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="accueil" label="Accueil" />
          <Tab value="match" label="Match" onClick={match}/>
          <Tab value="profil" label="Profil" onClick={logout}/>
        </Tabs>
      </Box>
    );
}
