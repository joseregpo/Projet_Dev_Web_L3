import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 

export default function NavBar() {
    const [value, setValue] = React.useState('accueil');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const [champions, setChampions] = useState([])
    useEffect(() => {    
        fetch("http://localhost:3001/cards")
            .then(response => response.json())
            .then(response => {
                const res = []
                for (const c of response) {
                    let champ = {
                        id: c.id,
                        nomChamp : c.key,
                        imgUrl : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+c.key+"_0.jpg",
                        desc: c.title,
                    };
                    res.push(champ)
                }
                setChampions(res);
            }); 
    }, []);

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
          <Link to={"./auth"}><Tab value="login" label="login" /></Link>
          <Tab value="connexion" label="connexion" />
          <Tab value="deconnexion" label="deconnexion" />
          <Link to={{pathname:"/champions", state :{champions:champions}}} ><Tab value="champions" label="champions" /></Link>
        </Tabs>
        <Outlet/>
      </Box>
    );
}
