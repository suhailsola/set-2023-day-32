import React from "react";
import "react-toastify/dist/ReactToastify.css";

import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";

const Dashboard = () => {
  useProtectedPage();

  return <DashboardLayout>Dashboard</DashboardLayout>;
};

export default Dashboard;
