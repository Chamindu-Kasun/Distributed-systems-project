import { Fragment, useState } from "react";
import LoginImg from "../assets/login.jpg"
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/authContext';


const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { isAuthenticated, setIsAuthenticated, setUserData } = useAuthContext();
    const [isError, setIsError] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            username: userName,
            email: email,
            password: password
        };
        const user = await fetchUser(data);
        if (isAuthenticated) {
            navigate('/profile');
        }
    };

    const fetchUser = async (data) => {
        try {
            setIsLoading(true);
            const res = await fetch(`http://localhost:8080/autorized-users/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    data
                }),
            });

            const response = await res.json();

            setIsLoading(false);
            if (res.status === 200) {
                setUserData(response)
                setIsAuthenticated(true)
                setIsError(false)
            } else {
                setIsError(true)
            }

            return response;

        } catch (error) {
            console.error(error);
            setUserData({})
            setIsLoading(false);
            setIsAuthenticated(false)
            setIsError(true)
            throw new Error("Error fetching User");

        }
    };


    return (
        <Fragment>

            <form onSubmit={handleSubmit}>
                <img src={LoginImg} alt="Login img" className="login-image" />
                <div>
                    <label htmlFor="username">user name:</label>
                    <br />
                    <input
                        type="string"
                        id="username"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="email">email:</label>
                    <br />
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <br />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit">Log In</button>
                <div style={{ color: "red", display: "flex", justifyContent: "center", alignItems: "center", paddingTop: "20px", paddingBottom: "20px" }}>{isError ? "Invalid credentials" : null}</div>
                <div style={{ color: "gray", display: "flex", justifyContent: "center", alignItems: "center" }}>Already a member? : <span onClick={() => navigate('/')} style={{ color: "blue", cursor: "pointer" }}>Login</span></div>
            </form>
        </Fragment>
    )
}

export default Register;