import MenuAppBar from './MenuAppBar';
import AuthService from "../services/AuthService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        
        if (!AuthService.getCurrentUser()) {
            navigate("/login");
            window.location.reload();  
        }

      }, [navigate]);

    return(
        <div className='Home'>
            <MenuAppBar/>
            This is Homepage
        </div>
    )
}

export default Home;