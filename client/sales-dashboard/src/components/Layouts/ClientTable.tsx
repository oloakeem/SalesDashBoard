// ClientTable.tsx
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    // Fetch client data from the server
    fetch("http://localhost:4000/api/Clients")
      .then((response) => response.json())
      .then((data: Client[]) => setClients(data))
      .catch((error) => console.error("Error fetching client data:", error));
  }, []);

  const handleButtonClick = (clientId: string) => {
    // Handle button click for the specific client
    alert(`Button clicked for client ID: ${clientId}`);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name / ID</th>
          <th>Email / Phone</th>
          <th>Membership Type</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {clients.map((client) => (
          <tr key={client._id}>
            <td>{client.name}</td>
            <td>
              {client.email} / {client.phone}
            </td>
            <td>{client.membershipType}</td>
            <td>
              <button onClick={() => handleButtonClick(client._id)}>
                Action
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
