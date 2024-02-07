import React, { useState } from "react";
import "../styles/Login.scss"
import { setLogin } from "../redux/state";
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch()

  const navigate = useNavigate()
  const backend_url = process.env.REACT_APP_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch (`${backend_url}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      /* Get data after fetching */
      const loggedIn = await response.json()


      // If response is wrong or response status is not in the range 200-299
      if (!response.ok) {
        setErrorMessage(loggedIn.message);
        return;
      }
  


      // console.log(loggedIn.message)

      if (loggedIn) {
        dispatch (
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token
          })
        )
        navigate("/")
      }

    } catch (err) {
      // console.log("Login failed", err.message)
    }
  }

  return (
    <>
    <Navbar searchBar={false}/>
    <div className="login">
      <div className="login_content">
        <form className="login_content_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errorMessage && (
                <div>
                    <p style={{ color: "red", fontWeight: "bold", fontSize: "large" }}>{errorMessage}</p>
                </div>
            )}
          <button type="submit">LOG IN</button>
        </form>
        <a href="/register">Don't have an account? Sign In Here</a>
      </div>
    </div>
    <Footer/>
            </>
  );
};

export default LoginPage;
