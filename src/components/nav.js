import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Link, Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
export default function NavBar() {
    return (
      <Box sx={{ width: '100%' }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="accueil" label="Accueil" />
          <Link to={"./auth"}><Tab value="login" label="login" /></Link>
          <Tab value="connexion" label="connexion" />
          <Tab value="deconnexion" label="deconnexion" />
          
          <Link to={"./champions"}><Tab value="champions" label="champions" /></Link>
        </Tabs>
        <Outlet/>
      </Box>
    );
}
