import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Base.module.css";
import hamburger from "../../assets/hamburger-menu-svgrepo-com.svg";
import addUser from "../../assets/add-user-svgrepo-com.svg";
import addMultiple from "../../assets/add-user-svgrepo-com (1).svg";
import viewUsers from "../../assets/team-svgrepo-com.svg";
import viewGraphs from "../../assets/graphs-svgrepo-com.svg";
import CLogo from "../../assets/bar-chart-svgrepo-com.svg";
import Modal from "../Modal/Modal"; // Import the Modal component
import FileUpload from "../Layouts/UploadCSV"; // Import FileUpload component
import { useLocation } from "react-router-dom";
interface LocationState {
  userId: string;
  userName: string;
}

const Base: React.FC = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<number>(7);
  const [isModalOpen, setModalOpen] = useState(false);
  const location = useLocation(); // TypeScript will not know what properties exist on 'state' by default

  const { userName } = (location.state as LocationState) || {}; // Retrieve userId from route state

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

  const openModal = () => {
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
  };

  return (
    <div className={styles.baseBody}>
      <div className={styles.baseGridLayout}>
        <div className={styles.box1}>
          <div className={styles.userInfo}>
            <img className={styles.navImages} src={CLogo} alt="" />
            <div className={styles.textContent}>
              <h4>Welcome User {userName}</h4>
              <p>March 27th, 2024</p>
            </div>
          </div>
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
              <Link to="layout1">Add Client</Link>
            </li>

            <li onClick={openModal}>
              <img className={styles.navImages} src={addUser} alt="Add User" />
              Add Group
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

          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <FileUpload />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Base;
