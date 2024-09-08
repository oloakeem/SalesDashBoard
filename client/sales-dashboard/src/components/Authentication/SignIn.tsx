import React from "react";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import CLogo from "../../assets/data-svgrepo-com.svg";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <>
      <div className={styles.AuthGrid}>
        <div className={styles.secionB}>Section B</div>

        <div className={styles.secionA}>
          <div className={styles.CNames}>
            <img src={CLogo} alt="CompanyLogo" />
            <h2>Company Name</h2>
          </div>
          <h3>Login in here</h3>

          <form className={styles.SignInForm} onSubmit={handleSubmit}>
            <div className={styles.formGroupSignIn}>
              <label htmlFor="userNameInput">Username</label>
              <input
                type="username"
                placeholder="Username"
                value={userName}
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
                Don't Have an Account?. <Link>Create One</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;
