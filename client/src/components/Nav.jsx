import { Link } from "react-router-dom";
import axios from 'axios';
import { MyContext } from "../App";
import { useContext, useEffect } from "react";

const Nav = () => {
    const { user, setUser, redirect, isLoggedIn, setIsLoggedIn  } = useContext(MyContext);
    

    const logoutHandler = () => {
        axios.post('http://localhost:8000/api/logout', {}, { withCredentials: true })
            .then(() => {
                setUser(null);
                setIsLoggedIn(false);
                redirect('/login');
            })
            .catch((err) => {
                console.log("Logout Failed: ", err);
            });
    };

    useEffect(() => {
        axios.get('http://localhost:8000/api/getLoggedInUser', { withCredentials: true })
            .then((res) => {
                setUser(res.data);
                setIsLoggedIn(true);
            })
            .catch((err) => {
                console.log("Something went wrong: (Logged in user) ", err);
                setIsLoggedIn(false);
            });
    }, []);


    return (
        <nav className="bg-gradient-to-r from-blue-600 via-blue-500 to-blue-500 p-1 flex justify-around items-center">
            <div className="flex justify-between items-center">
                <Link to={'/'} className="text-amber-400 hover:text-amber-500 text-lg font-bold p-5">Home</Link>
                <Link to={'/chat'} className="text-amber-400 hover:text-amber-500 text-lg font-bold p-5">Chat</Link>
            </div>
            {user?.firstName && (
                <h1 className="text-amber-300 text-lg font-extrabold pr-20">{user.firstName}'s Chat</h1>
            )}
            {isLoggedIn ? (
                <button className="text-white hover:text-red-500 hover:bg-amber-400 text-lg font-bold px-4 py-1 transition duration-300 bg-amber-500 rounded-lg" onClick={logoutHandler}>Logout</button>
            ) : (
                <Link to={'/login'} className="text-amber-400 hover:text-amber-500 text-lg font-bold p-5">Login</Link>
            )}
        </nav>
    );
};

export default Nav;
