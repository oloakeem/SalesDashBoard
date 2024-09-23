import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom"; // To get the client ID from the URL

interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
  height: string;
  weight: string;
  membershipType: number;
  startDate: string;
  paymentMethod: string;
  targetGoals: {
    yoga: boolean;
    cardio: boolean;
    aerobics: boolean;
    physicalFitness: boolean;
    fatLoss: boolean;
    freeHand: boolean;
    muscleBuilding: boolean;
    endurance: boolean;
  };
  surgeries?: string;
  medication?: string;
  accidents?: string;
}
interface ViewClientProps {
  clientId: string | null; // Accept clientId as a prop
}

const ViewClient: React.FC<ViewClientProps> = ({ clientId }) => {
  const [client, setClient] = useState<Client | null>(null); // State for client data
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  useEffect(() => {
    // Fetch client by ID when component mounts
    const fetchClient = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/Clients/${clientId}`
        );
        setClient(response.data); // Set the client data
      } catch (error) {
        console.error("Error fetching client:", error);
      } finally {
        setLoading(false); // Stop loading after fetching
      }
    };

    fetchClient();
  }, [clientId]); // Dependency array ensures this runs when the ID changes

  if (loading) {
    return <p>Loading client data...</p>; // Display a loading state
  }

  if (!client) {
    return <p>No client found!</p>; // If no client data is returned
  }

  return (
    <div>
      <h2>Client Details</h2>
      <p>
        <strong>Name:</strong> {client.name}
      </p>
      <p>
        <strong>Email:</strong> {client.email}
      </p>
      <p>
        <strong>Phone:</strong> {client.phone}
      </p>
      <p>
        <strong>Address:</strong> {client.address}
      </p>
      <p>
        <strong>Height:</strong> {client.height}
      </p>
      <p>
        <strong>Weight:</strong> {client.weight}
      </p>
      <p>
        <strong>Membership Type:</strong> {client.membershipType}
      </p>
      <p>
        <strong>Start Date:</strong> {client.startDate}
      </p>
      <p>
        <strong>Payment Method:</strong> {client.paymentMethod}
      </p>

      <h3>Target Goals</h3>
      <ul>
        <li>
          <strong>Yoga:</strong> {client.targetGoals.yoga ? "Yes" : "No"}
        </li>
        <li>
          <strong>Cardio:</strong> {client.targetGoals.cardio ? "Yes" : "No"}
        </li>
        <li>
          <strong>Aerobics:</strong>{" "}
          {client.targetGoals.aerobics ? "Yes" : "No"}
        </li>
        <li>
          <strong>Physical Fitness:</strong>{" "}
          {client.targetGoals.physicalFitness ? "Yes" : "No"}
        </li>
        <li>
          <strong>Fat Loss:</strong> {client.targetGoals.fatLoss ? "Yes" : "No"}
        </li>
        <li>
          <strong>Free Hand:</strong>{" "}
          {client.targetGoals.freeHand ? "Yes" : "No"}
        </li>
        <li>
          <strong>Muscle Building:</strong>{" "}
          {client.targetGoals.muscleBuilding ? "Yes" : "No"}
        </li>
        <li>
          <strong>Endurance:</strong>{" "}
          {client.targetGoals.endurance ? "Yes" : "No"}
        </li>
      </ul>

      {client.surgeries && (
        <p>
          <strong>Surgeries:</strong> {client.surgeries}
        </p>
      )}
      {client.medication && (
        <p>
          <strong>Medication:</strong> {client.medication}
        </p>
      )}
      {client.accidents && (
        <p>
          <strong>Accidents:</strong> {client.accidents}
        </p>
      )}
    </div>
  );
};

export default ViewClient;
