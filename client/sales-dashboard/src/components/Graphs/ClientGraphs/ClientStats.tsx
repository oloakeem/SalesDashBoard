import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart
import axios from "axios";
import DateRangeButtons from "../../Home/Base"; // Import the new component

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

const ClientStats: React.FC = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Clients",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });
  const [selectedPeriod, setSelectedPeriod] = useState<number>(7);

  const fetchCount = async (days: number) => {
    try {
      const response = await axios.get(`/api/clients-stats/last${days}days`);
      // Assuming the response contains labels and counts for the chart
      setChartData({
        labels: response.data.labels, // Array of labels (e.g., dates)
        datasets: [
          {
            label: `Clients in the last ${days} Days`,
            data: response.data.counts, // Array of counts
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      });
      setSelectedPeriod(days);
    } catch (error) {
      console.error("Error fetching client data", error);
    }
  };

  useEffect(() => {
    fetchCount(selectedPeriod); // Fetch initial data
  }, [selectedPeriod]);

  return (
    <div>
      <h1>Client Statistics</h1>
      <div>
        <button onClick={() => fetchCount(7)}>Last 7 Days</button>
        <button onClick={() => fetchCount(30)}>Last 30 Days</button>
        <button onClick={() => fetchCount(365)}>Last 365 Days</button>
      </div>
      <div style={{ width: "600px", height: "400px" }}>
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ClientStats;
