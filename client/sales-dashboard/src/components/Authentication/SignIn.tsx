import React from "react";
import { useState } from "react";
import styles from "./SignIn.module.css";
import { Link } from "react-router-dom";
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";
import backImage from "../../assets/pexels-artempodrez-5716042 (2).jpg";
import headerImage from "../../assets/picsvg_download.svg";

const SignIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
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

          <form className={styles.SignInForm} onSubmit={handleSubmit}>
            <h3>Login in.</h3>

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
