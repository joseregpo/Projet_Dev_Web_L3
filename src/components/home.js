import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import NavBar from "./nav";
import Champion from './championCard';
import { Box, Grid } from '@mui/material';
import AllCards from './allCards';
import { Outlet, Route } from 'react-router-dom';
import Match from './match';
export default function Home(){

    const user = useSelector(state => state);
    // const [champions, setChampions] = useState([])
    // useEffect(() => {    
    //     fetch("http://localhost:3001/cards")
    //         .then(response => response.json())
    //         .then(response => {
    //             const res = []
    //             for (const c of response) {
    //                 let champ = {
    //                     id: c.id,
    //                     nomChamp : c.key,
    //                     imgUrl : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+c.key+"_0.jpg",
    //                     desc: c.title,
    //                 };
    //                 res.push(champ)
    //             }
    //             setChampions(res);
    //         }); 
    // }, []);

    return(
        <div>
            <NavBar/>
            {/* <AllCards champions={champions}/> */}
            {/* <Match champions={champions}/> */}

        </div>
    )
}