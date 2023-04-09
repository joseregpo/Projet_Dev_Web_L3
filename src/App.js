import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import NavBar from "./components/nav";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import login_bg from "./assets/login_bg.jpg";
import bg from "./assets/bg.jpg";
import Auth from "./components/auth";
import Home from "./components/home";

export default function App() {
  const user = useSelector((state) => state);

  return (
    <>
      <Box
        style={{
          backgroundImage:
            user.token === "" ? `url(${login_bg})` : `url(${bg})`,
          backgroundSize: "cover",
          height: "100vh",
          color: "#f5f5f5",
        }}
      >
        <NavBar />
        {user.token !== "" ? <Home /> : <Auth />}
      </Box>
    </>
  );
}
