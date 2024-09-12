import React from "react";
import { Link } from "react-router-dom";
import styles from "./Base.module.css";
import { useState } from "react";
import hamburger from "../../assets/hamburger-menu-svgrepo-com.svg";
import addUser from "../../assets/add-user-svgrepo-com.svg";
import addMultiple from "../../assets/add-user-svgrepo-com (1).svg";
import viewUsers from "../../assets/team-svgrepo-com.svg";
import viewGraphs from "../../assets/graphs-svgrepo-com.svg";
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes

const Base = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    //  setIsNavOpen(false);
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleSublist = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className={styles.baseBody}>
        <div className={styles.baseGridLayout}>
          <div className={styles.box1}>
            <h2>Company Name</h2>
            <img
              className={styles.hamBurgerMenu}
              src={hamburger}
              alt=""
              onClick={toggleNav}
            />
          </div>
          <div
            className={`${styles.box2} ${
              isNavOpen ? styles.slideIN : styles.slideOut
            }`}
          >
            <div className={styles.navHeader}>
              <img className={styles.navImages} src={CLogo} alt="" />
              <h2>Navigation Menu</h2>
            </div>
            <ul className={styles.unOrderedListGroup}>
              <li onClick={closeNav}>
                <img className={styles.navImages} src={addMultiple} alt="" />
                <Link to="Layout1">Add new client</Link>
              </li>
              <li onClick={closeNav}>
                <img className={styles.navImages} src={addUser} alt="" />
                <Link to="UploadCSV"> Add group via csv</Link>
              </li>
              <li onClick={closeNav}>
                <img className={styles.navImages} src={viewUsers} alt="" />
                View Clients
              </li>
              <li onClick={toggleSublist}>
                <img className={styles.navImages} src={viewGraphs} alt="" />
                Analysis
              </li>
              {isOpen && (
                <ul className={styles.sublist}>
                  <li>Clients</li>
                  <li>Employees</li>
                  <li>Sales</li>
                  <li>Goals</li>
                </ul>
              )}
            </ul>
          </div>
          <div className={styles.box3}>
            {/* Render different layouts based on route */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Base;
