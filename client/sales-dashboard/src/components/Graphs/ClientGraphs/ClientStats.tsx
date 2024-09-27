import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import { useOutletContext } from "react-router-dom";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler
);

const ClientStats: React.FC = () => {
  const [selectedPeriod] = useOutletContext<[number]>();
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Clients",
        data: [0],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        fill: true,
      },
    ],
  });

  const [totalCount, setTotalCount] = useState(0); // State for total count

  const fetchCount = async (days: number) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/clients-stats/last${days}days`
      );

      setChartData({
        labels: response.data.labels,
        datasets: [
          {
            label: `Clients in the last ${days} Days`,
            data: response.data.dailyCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
            fill: true,
          },
        ],
      });

      setTotalCount(response.data.totalCount); // Set the total count from the response
    } catch (error) {
      console.error("Error fetching client data", error);
    }
  };

  useEffect(() => {
    fetchCount(selectedPeriod);
  }, [selectedPeriod]);

  return (
    <div>
      <h3 className="graphGroupH2">Total Clients: {totalCount}</h3>
      <div className="bar-container">
        <Line data={chartData} />
      </div>
    </div>
  );
};

export default ClientStats;
