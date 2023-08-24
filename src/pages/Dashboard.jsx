import React, { useContext } from "react";
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
import { AuthContext } from "../App";

const Dashboard = () => {
  useProtectedPage();
  const { username } = useContext(AuthContext);
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
        text: "Visit Counter",
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
      <div className="w-full h-full flex flex-col justify-center items-center mt-6">
        <h4 className="p-2 text-2xl font-mono font-bold">
          You're doing great, {username}
        </h4>
        <div className=" w-full h-full">
          <Bar className="m-2" options={options} data={chartData} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
