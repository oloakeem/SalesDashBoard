import React, { useState } from "react";
import pencilImg from "../../assets/edit-svgrepo-com.svg";
import styles from "./AddMemberForm.module.css";

type TargetGoals = {
  yoga: boolean;
  cardio: boolean;
  aerobics: boolean;
  physicalFitness: boolean;
  fatLoss: boolean;
  freeHand: boolean;
  muscleBuilding: boolean;
  endurance: boolean;
};

const Layout1 = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    height: "",
    weight: "",
    membershipType: "",
    startDate: "",
    paymentMethod: 0,
    targetGoals: {
      yoga: false,
      cardio: false,
      aerobics: false,
      physicalFitness: false,
      fatLoss: false,
      freeHand: false,
      muscleBuilding: false,
      endurance: false,
    } as TargetGoals,
    surgeries: "",
    medication: "",
    accidents: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLSelectElement;

    if (target.type === "checkbox") {
      const { name, checked } = target as HTMLInputElement;
      setFormData((prevFormData) => ({
        ...prevFormData,
        targetGoals: {
          ...prevFormData.targetGoals,
          [name]: checked,
        },
      }));
    } else {
      setFormData({
        ...formData,
        [target.name]: target.value,
      });
    }
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
        <div className={styles.formSectionHeader}>
          <h3>Personal Information</h3>
          <img className={styles.formImg} src={pencilImg} alt="" />
        </div>
        <div className={styles.piContainer}>
          <div className={styles.topForm}>
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
              <label htmlFor="address">Address:</label>
              <input
                type="address"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.bottomForm}>
            <div className={styles.formGroup}>
              <label htmlFor="DoB">Date of Birth:</label>
              <input
                type="date"
                id="dob"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="height">Height in cm:</label>
              <input
                type="tel"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="weight">Weight in lbs:</label>
              <input
                type="tel"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.genderCheck}>
              <label>
                Male
                <input type="radio" name="gender" value="Male" />
              </label>
              <label>
                Female
                <input type="radio" name="gender" value="Female" />
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formSectionHeader}>
          <h3>Membership Packages</h3>
          <img className={styles.formImg} src={pencilImg} alt="" />
        </div>
        <div className={styles.memberShipContainer}>
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
        </div>

        <div className={styles.formSectionHeader}>
          <h3>Target / Goals</h3>
          <img className={styles.formImg} src={pencilImg} alt="" />
        </div>
        <div className={styles.formGroup}>
          <div className={styles.targetContainer}>
            {Object.keys(formData.targetGoals).map((goal) => (
              <div key={goal} className={styles.checkboxGroup}>
                <label>
                  {goal.charAt(0).toUpperCase() +
                    goal.slice(1).replace(/([A-Z])/g, " $1")}
                  <input
                    type="checkbox"
                    name={goal}
                    checked={formData.targetGoals[goal as keyof TargetGoals]}
                    onChange={handleChange}
                  />
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.formSectionHeader}>
          <h3>Medical Conditions</h3>
          <img className={styles.formImg} src={pencilImg} alt="" />
        </div>
        <div className={styles.medicalContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="surgeries">Any Major Surgeries:</label>
            <input
              type="text"
              id="surgeries"
              name="surgeries"
              value={formData.surgeries}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="medication">Any Medication:</label>
            <input
              type="text"
              id="medication"
              name="medication"
              value={formData.medication}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="accidents">Any Major Accidents</label>
            <input
              type="text"
              id="accidents"
              name="accidents"
              value={formData.accidents}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Layout1;
