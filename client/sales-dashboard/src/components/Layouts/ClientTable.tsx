import React, { useEffect, useState } from "react";
import styles from "./ClientTable.module.css";
import Modal from "../Modal/Modal"; // Import the Modal component
import ViewClient from "../Layouts/ViewClient"; // Import ViewClient component

// Define TypeScript types directly in this file
interface Client {
  _id: string;
  name: string;
  email: string;
  phone: string;
  membershipType: number;
}

const ClientTable: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null); // State to store selected client ID

  useEffect(() => {
    // Fetch client data from the server
    fetch("http://localhost:4000/api/Clients", {
      method: "GET",
      credentials: "include", // This ensures cookies are sent with the request
    })
      .then((response) => response.json())
      .then((data: Client[]) => setClients(data))
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);

  const openModal = (clientId: string) => {
    setSelectedClientId(clientId); // Set the selected client ID
    setModalOpen(true); // Open modal
  };

  const closeModal = () => {
    setModalOpen(false); // Close modal
    setSelectedClientId(null); // Reset selected client ID
  };

  return (
    <>
      <table>
        <thead className={styles.tHeadStyle}>
          <tr>
            <th>Name / ID</th>
            <th>Email / Phone</th>
            <th>Membership Type</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr className={styles.clientItem} key={client._id}>
              <td>{client.name}</td>
              <td>
                {client.email} / {client.phone}
              </td>
              <td>{client.membershipType}</td>
              <td>
                <button
                  className={styles.orangebtn}
                  onClick={() => openModal(client._id)} // Pass the client ID to openModal
                >
                  View/Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Render Modal outside the map to keep it separate */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} closeModal={closeModal}>
          <ViewClient clientId={selectedClientId} />
          {/* Pass selected client ID */}
        </Modal>
      )}
    </>
  );
};

export default ClientTable;
