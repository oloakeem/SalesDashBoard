import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Base.module.css";
import hamburger from "../../assets/hamburger-menu-svgrepo-com.svg";
import addUser from "../../assets/add-user-svgrepo-com.svg";
import addMultiple from "../../assets/add-user-svgrepo-com (1).svg";
import viewUsers from "../../assets/team-svgrepo-com.svg";
import viewGraphs from "../../assets/graphs-svgrepo-com.svg";
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";

const Base: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(7);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const closeNav = () => {
    setIsNavOpen(false);
  };

  const toggleSublist = () => {
    setIsOpen(!isOpen);
  };

  const handlePeriodChange = (days: number) => {
    setSelectedPeriod(days);
  };

  return (
    <div className={styles.baseBody}>
      <div className={styles.baseGridLayout}>
        <div className={styles.box1}>
          <h2>Company Name</h2>
          <div>
            <button
              className={styles.dateBtn}
              onClick={() => handlePeriodChange(7)}
            >
              7 days
            </button>
            <button
              className={styles.dateBtn}
              onClick={() => handlePeriodChange(30)}
            >
              30 days
            </button>
            <button
              className={styles.dateBtn}
              onClick={() => handlePeriodChange(365)}
            >
              12 months
            </button>
          </div>
          <img
            className={styles.hamBurgerMenu}
            src={hamburger}
            alt="Menu"
            onClick={toggleNav}
          />
        </div>
        <div
          className={`${styles.box2} ${
            isNavOpen ? styles.slideIN : styles.slideOut
          }`}
        >
          <div className={styles.navHeader}>
            <img className={styles.navImages} src={CLogo} alt="Logo" />
            <h2>Navigation Menu</h2>
          </div>
          <ul className={styles.unOrderedListGroup}>
            <li onClick={closeNav}>
              <img
                className={styles.navImages}
                src={addMultiple}
                alt="Add Multiple"
              />
              <Link to="layout1">Add new client</Link>
            </li>
            <li onClick={closeNav}>
              <img className={styles.navImages} src={addUser} alt="Add User" />
              <Link to="UploadCSV">Add group via CSV</Link>
            </li>
            <li onClick={closeNav}>
              <img
                className={styles.navImages}
                src={viewUsers}
                alt="View Users"
              />
              <Link to="view-clients">View Clients </Link>
            </li>
            <li onClick={toggleSublist}>
              <img
                className={styles.navImages}
                src={viewGraphs}
                alt="View Graphs"
              />
              Analysis
            </li>
            {isOpen && (
              <ul className={styles.sublist}>
                <li>
                  <Link to="clients-stats">Sales</Link>
                </li>
                <li>
                  <Link to="clients-stats">Clients</Link>
                </li>
                <li>
                  <Link to="clients-stats">Employees</Link>
                </li>
                <li>
                  <Link to="clients-stats">Goals</Link>
                </li>
              </ul>
            )}
            <div className={styles.lineBreak}></div>
          </ul>
        </div>
        <div className={styles.box3}>
          <Outlet context={[selectedPeriod]} />
        </div>
      </div>
    </div>
  );
};

export default Base;
