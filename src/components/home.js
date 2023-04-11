import { useSelector } from 'react-redux'; 
import { Link } from 'react-router-dom';
import Tab from '@mui/material/Tab';
export default function Home(){

    const user = useSelector(state => state);
    console.log(user);

    return(
        <div>
            <h1>Faut faire un component navbar et le home</h1>
            <h3>Personne connectée : {user.username}</h3>
            <Link to={"/matchmaking"}>
                <Tab value="login" label="login" />
            </Link>
        </div>
    )
}