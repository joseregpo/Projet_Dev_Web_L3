import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function NavBar() {
    const [value, setValue] = React.useState('accueil');
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
          <Tab value="login" label="Login" />
          <Tab value="Connexion" label="Connexion" />
          <Tab value="Deconnexion" label="Deconnexion" />
        </Tabs>
      </Box>
    );
}
