import { useSelector } from 'react-redux'; 

import NavBar from "./nav"

export default function Home(){

    const user = useSelector(state => state);
    console.log(user);

    return(
        <div>
            <NavBar/>
        </div>
    )
}