import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"; 
import { store } from "./store";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from './components/auth';
import Home from './components/home';
import Match from './components/match';
import ChampionDeck from './components/champion_deck';

// const champions = () =>{
//   const res = []
//   fetch("http://localhost:3001/cards")
//   .then(response => response.json())
//   .then(response => {
//       for (const c of response) {
//           let champ = {
//               id: c.id,
//               nomChamp : c.key,
//               imgUrl : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/"+c.key+"_0.jpg",
//               desc: c.title,
//           };
//           res.push(champ)
//       }
//     }); 
//   return res;
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    id: "root",
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/auth",
        element: <Auth />
      },
      {
        path: "/deck",
        element: <ChampionDeck/>,
      },
      {
        path: "/match",
        element: <Match />
      }
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
