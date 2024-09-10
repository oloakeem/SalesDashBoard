// Layout1.js
import React, { useState } from "react";

import styles from "./Layout1.module.css";

const Layout1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    membershipType: "",
    startDate: "",
    paymentMethod: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to backend)
    try {
      const response = await fetch("http://localhost:4000/api/clients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error details:", errorData);
        throw new Error("Network response was not ok");
      }
      await response.json();
      alert("Client submitted successfully!");
    } catch (error) {
      console.error("Error submitting client:", error);
      alert("Failed to register client");
      console.log(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <h2>Gym Membership Form</h2>
      <form onSubmit={handleSubmit} className={styles.membershipForm}>
        <div className={styles.formGroup}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="membershipType">Membership Type:</label>
          <select
            id="membershipType"
            name="membershipType"
            value={formData.membershipType}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select Membership Type --
            </option>
            <option value="70">Basic $69.00</option>
            <option value="106">Premium $106.00</option>
            <option value="180">VIP $180.00</option>
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="paymentMethod">Payment Method:</label>
          <select
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              -- Select Payment Method --
            </option>
            <option value="Credit Card">Credit Card</option>
            <option value="Debit Card">Debit Card</option>
            <option value="Cash">Cash</option>
            <option value="Bank Transfer">Bank Transfer</option>
          </select>
        </div>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Layout1;
