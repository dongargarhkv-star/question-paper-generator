import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {

        e.preventDefault();

        if (username === "" || password === "") {

            alert("Please enter username and password.");

            return;
        }

        try {

            setLoading(true);

            // Uncomment this when backend authentication is ready

            /*
            const response = await axios.post("/api/login", {
                username,
                password
            });

            localStorage.setItem(
                "token",
                response.data.token
            );
            */

            // Temporary Login

            localStorage.setItem("teacher", username);

            setLoading(false);

            navigate("/dashboard");

        }

        catch (error) {

            setLoading(false);

            alert("Invalid Username or Password.");

            console.log(error);

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <div className="text-center mb-4">

                    <h2>

                        AI Question Paper Generator

                    </h2>

                    <p className="text-muted">

                        Teacher Login

                    </p>

                </div>

                <form onSubmit={handleLogin}>

                    <div className="mb-3">

                        <label className="form-label">

                            Username

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaUser />

                            </span>

                            <input

                                type="text"

                                className="form-control"

                                placeholder="Enter Username"

                                value={username}

                                onChange={(e)=>setUsername(e.target.value)}

                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Password

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaLock />

                            </span>

                            <input

                                type="password"

                                className="form-control"

                                placeholder="Enter Password"

                                value={password}

                                onChange={(e)=>setPassword(e.target.value)}

                            />

                        </div>

                    </div>

                    <button

                        type="submit"

                        className="btn btn-primary w-100"

                        disabled={loading}

                    >

                        <FaSignInAlt className="me-2" />

                        {

                            loading ?

                            "Signing In..." :

                            "Login"

                        }

                    </button>

                </form>

                <hr />

                <div className="text-center">

                    <small className="text-muted">

                        Developed By

                        <br />

                        <strong>Amit Yerpude</strong>

                        <br />

                        PGT (Computer Science)

                        <br />

                        PM SHRI Kendriya Vidyalaya Dongargarh

                    </small>

                </div>

            </div>

        </div>

    );

}

export default Login;
