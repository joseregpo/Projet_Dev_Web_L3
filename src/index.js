import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from "react-redux"; 
import { store } from "./store";
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Auth from './components/auth';
import Home from './components/home';
import ChampionDeck from './components/champion_deck';
import Match from './components/match';

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
      },
      {
        path: "*",
        element: <Navigate to="/auth" replace />
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
