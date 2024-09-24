import React from "react";
import { useState } from "react";
import axios from "axios";

import styles from "./SignIn.module.css";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

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
      const response = await axios.post(
        "http://localhost:4000/api/Users/login",
        loginData,
        {
          withCredentials: true, // Ensure credentials (cookies) are included
        }
      );

      console.log("Login successful!", response.data);
      navigate("/home", {
        state: {
          userId: response.data.userId,
          userName: response.data.userName,
        },
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
          <div className={styles.logoInfo}>
            <h2>Sales & Finance</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Voluptatem, delectus.
            </p>
            <button>Read more</button>
          </div>
        </div>

        <div className={styles.secionA}>
          <form className={styles.SignInForm} onSubmit={handleLogin}>
            <h2>Sign in here!</h2>

            <div className={styles.formGroupSignIn}>
              <label htmlFor="usernameInput">Username</label>
              <input
                className={styles.AuthenInput}
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
