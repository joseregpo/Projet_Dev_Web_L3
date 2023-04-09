import { useSelector } from "react-redux";
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

export default function Home() {

  const navigate = useNavigate();

  const user = useSelector((state) => state);
  console.log(user);

  const configureDeck = () => {
    navigate("/deck", { replace: true })
  }

  return (
    <div>
        <Button onClick={configureDeck}>
          Configurez votre deck
        </Button>
    </div>
  );
}
