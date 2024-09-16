import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart
import axios from "axios";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement, // Register LineElement instead of BarElement
  CategoryScale,
  LinearScale,
  PointElement, // Line charts use points at each data entry
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement, // Register LineElement
  CategoryScale,
  LinearScale,
  PointElement // Points are necessary for line charts
);

// Define types for the chart data
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string;
    borderColor: string;
    borderWidth: number;
    fill: boolean; // For filling the area under the line
  }[];
}

// Define types for the API response data
interface ApiResponseItem {
  _id: number;
  count: number;
}

const ChartComponent: React.FC = () => {
  // Initialize state with types
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios
      .get<ApiResponseItem[]>("http://localhost:4000/api/clients-stats")
      .then((response) => {
        console.log("API Response:", response.data); // Log API response

        const labels = response.data.map((item) => `Package ${item._id}`);
        const counts = response.data.map((item) => item.count);

        setChartData({
          labels,
          datasets: [
            {
              label: "Number of Clients by Membership Type",
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.2)", // Fill under the line
              borderColor: "rgba(128, 0, 128, 0.5)", // Line color
              borderWidth: 2, // Line thickness
              fill: true, // Fill area under the line
            },
          ],
        });
      })
      .catch((error) => {
        console.error("Error fetching data", error);
      });
  }, []);

  return (
    <>
      <div className="graphGroup">
        <h3 className="graphGroupH2">Client Membership Types</h3>
        <div className="bar-container">
          <Line data={chartData} /> {/* Change Bar to Line */}
        </div>
      </div>
      <div className="graphGroup">
        <h3 className="graphGroupH2">Client Membership Types</h3>
        <div className="bar-container">
          <Line data={chartData} /> {/* Change Bar to Line */}
        </div>
      </div>
      <div className="graphGroup">
        <h3 className="graphGroupH2">Client Membership Types</h3>
        <div className="bar-container">
          <Line data={chartData} /> {/* Change Bar to Line */}
        </div>
      </div>
      <div className="graphGroup">
        <h3 className="graphGroupH2">Client Membership Types</h3>
        <div className="bar-container">
          <Line data={chartData} /> {/* Change Bar to Line */}
        </div>
      </div>
      {/* Repeat the same structure if necessary */}
    </>
  );
};

export default ChartComponent;
