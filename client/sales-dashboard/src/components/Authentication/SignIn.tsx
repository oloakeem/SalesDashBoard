import React from "react";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";
import backImage from "../../assets/pexels-artempodrez-5716042 (2).jpg";
import headerImage from "../../assets/picsvg_download.svg";

const SignIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
      username,
      password,
    };
    console.log("Login data:", loginData);

    try {
      // Send login request to the server
      const response = await fetch("http://localhost:4000/api/Users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to log in");
      }
      console.log("Login successful!", data);
      // Navigate to the dashboard or any route, passing userId in the state
      navigate("/home", {
        state: { userId: data.userId, userName: data.userName },
      });
    } catch (error) {
      console.error("Error logging in:", error);
      alert("Failed to Login");
    }
  };

  return (
    <>
      <div className={styles.AuthGrid}>
        <div className={styles.secionB}>
          <img className={styles.headerImageSignUp} src={headerImage} alt="" />

          <img className={styles.backImageSignUp} src={backImage} alt="" />
        </div>

        <div className={styles.secionA}>
          <div className={styles.CNames}>
            <img src={CLogo} alt="CompanyLogo" />
            <h2>Company Name</h2>
          </div>

          <form className={styles.SignInForm} onSubmit={handleLogin}>
            <h3>Login in.</h3>

            <div className={styles.formGroupSignIn}>
              <label htmlFor="usernameInput">Username</label>
              <input
                type="username"
                placeholder="Username"
                value={username}
                id="userNameInput"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className={styles.formGroupSignIn}>
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                id="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className={styles.SignUpBtn} type="submit">
              Log in
            </button>
            <div className={styles.formGroupSignIn}>
              <p className={styles.GoToSignUp}>
                Don't Have an Account?. <Link to="/SignUp">Sign up here</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
