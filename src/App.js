import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
import NavBar from "./components/nav"
import { useSelector } from 'react-redux'; 
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import login_bg from "./assets/login_bg.jpg";
import bg from "./assets/bg.jpg";


function App() {

  const user = useSelector(state => state);
  const navigate = useNavigate()

  const login = () => {
    navigate("/auth")
  }

  return (
    <>
    <Box
      style={{
      backgroundImage: user.token === "" ? `url(${login_bg})` : `url(${bg})`,
      backgroundSize: "cover",
      height: "100vh",
      color: "#f5f5f5",
    }}>
      {user.token !== "" ? <NavBar/> : 
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ backgroundColor: "#5b5b5b"}}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              League Of Stones
            </Typography>
            <Button color="inherit" onClick={login}>Connexion</Button>
          </Toolbar>
        </AppBar>
      </Box>
      }
      <Outlet />
      </Box>
    </>
  );
}

export default App;
