import React from "react";
import { useState } from "react";
import styles from "./SignUp.module.css";
import { Link } from "react-router-dom";
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";
import backImage from "../../assets/pexels-artempodrez-5716042 (2).jpg";
import headerImage from "../../assets/picsvg_download.svg";

const SignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // Create a user object instead of using userData
    const userData = {
      username: userName,
      password: password,
      email: email,
      phone: phoneNumber,
    };
    try {
      const response = await fetch("http://localhost:4000/api/Users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type as JSON
        },
        body: JSON.stringify(userData), // Convert object to JSON string
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Network response was not ok");
      }
      await response.json();
      alert("Recipe submitted successfully!");
      setUserName("");
      setPassword("");
      setEmail("");
      setPhoneNumber("");
    } catch (error) {
      console.error("Error submitting recipe:", error);
      alert("Failed to submit recipe");
    }
  };

  return (
    <>
      <div className={styles.AuthGrid}>
        <div className={styles.secionA}>
          <form className={styles.SignUpForm} onSubmit={handleSubmit}>
            <h2>Sign up here!</h2>

            <div className={styles.formGroup}>
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
            <div className={styles.formGroup}>
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                placeholder="Password"
                value={password}
                id="passwordInput"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="emailInput">Email</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                id="emailInput"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="phoneInput">Phone</label>
              <input
                type="phone"
                placeholder="Phone Number"
                value={phoneNumber}
                id="phoneInput"
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <button className={styles.SignInBtn} type="submit">
              Create account
            </button>
            <div className={styles.formGroup}>
              <p className={styles.GoToSignIn}>
                Already have an account?. <Link to="/">Log in Here</Link>
              </p>
            </div>
          </form>
        </div>
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
      </div>
    </>
  );
};

export default SignUp;
