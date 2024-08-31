/**
=========================================================
* Soft UI Dashboard React - v4.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/



const reportsBarChartData = {
  chart: {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
    datasets: { label: "Vehicles", data: [450, 200, 100, 220, 500, 100, 400, 230, 500] },
  },
  items: [
    {
      icon: { color: "primary", component: "P" },
      label: "Parking 1",
      progress: { content: "3", percentage: 100 },
    },
    {
      icon: { color: "info", component: "touch_app" },
      label: "Parking 2",
      progress: { content: "7", percentage: 90 },
    },
    
  ],
};

export default reportsBarChartData;
