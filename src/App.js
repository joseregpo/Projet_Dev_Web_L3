import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <>
      <Outlet/>
    </>
  );
}

export default App;
