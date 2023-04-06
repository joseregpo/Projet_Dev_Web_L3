import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Outlet } from "react-router-dom";
import Home from './components/home';
function App() {
  return (
    <>
      <div className="App">
        <Home/>
      </div>
    </>
  );
}

export default App;
