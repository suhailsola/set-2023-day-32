import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  elements,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import useGetAllLink from "../utils/hooks/useGetAllLink";

const Dashboard = () => {
  useProtectedPage();

  const { linkState, data } = useGetAllLink();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          precision: 0,
        },
      },
    },
    plugins: {
      legend: {
        position: "right",
      },
      title: {
        display: true,
        text: "Chart.js Horizontal Bar Chart",
      },
    },
  };

  const labels = data.map((elements) => elements.slug);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Visit counts",
        data: data.map((elements) => elements.visit_counter),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <DashboardLayout>
      <h1>Dashboard</h1>
      <Bar options={options} data={chartData} />
    </DashboardLayout>
  );
};

export default Dashboard;
