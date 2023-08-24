import React from "react";
import { useProtectedPage } from "../utils/hooks/useProtectedPage";
import DashboardLayout from "../layouts/DashboardLayout";



const Chart = () => {
  useProtectedPage();

  return (
    <DashboardLayout>
      <div className="p-2">
        <h2>Chart</h2>
        <Bar options={options} data={data} />;
      </div>
    </DashboardLayout>
  );
};

export default Chart;
