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

// @mui material components
import { useState,useEffect } from "react";
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar" ;
import Footer from "examples/Footer";
// import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import breadcrumbs from "assets/theme/components/breadcrumbs";
// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
// import Projects from "layouts/dashboard/components/Projects";
// import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
// import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
// import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";

function Dashboard() {
  const { size } = typography;
  const filler=new Date();
  const [flg1,setflg1]=useState([false,filler]);
  const [flg2,setflg2]=useState([false,filler]);

  // const { chart_, items_ } = reportsBarChartData;
  const [nots, setNots] = useState([
    { data: { message: "Welcome to Smart Parking System", parking_name: "From SPS" }, time: "14 mins ago" }
  ]);

  const [notifications,setnotifications]=useState([]);
  const [items, setitems] = useState([]);
  const [chart, setchart] = useState({});
  const [gradientLineChartData,setgraddata]=useState({});
  const get_data=()=>{
    // console.log("fetching data");
    fetch('http://localhost/api/get_users.php') // Replace with your XAMPP API URL
    .then(response => response.json())
    .then(data => {
      setitems([
        {
          icon: { color: "primary", component: "P" },
          label: "Parking 1",
          progress: { content: 10-data[data.length-1].available_in_parking_1, percentage: (10-data[data.length-1].available_in_parking_1)*10 },
        },
        {
          icon: { color: "info", component: "touch_app" },
          label: "Parking 2",
          progress: { content: 10-data[data.length-1].available_in_parking_2,percentage: (10-data[data.length-1].available_in_parking_2)*10 },
        },
        
      ])
      // console.log(data[data.length-1].available_in_parking_1)
      let tdata=data.slice(-10);
      setchart({
        labels:tdata.map(item=>{
          return(
            item.time
          )
        }),
        datasets: { label: "Vehicles", data:tdata.map(item=>{return ( (20-item.available_in_parking_1-item.available_in_parking_2))}) },
      })
      
       const check=new Date();

       if(check.getMinutes()-flg1[1].getMinutes()>60){
        setflg1([false,check]);
       }
       if(check.getMinutes()-flg2[1].getMinutes()>60){
        setflg2([false,check]);
       }
      //  console.log((check.getMinutes()-flg1[1].getMinutes())/1000*60*60)
      if(data[data.length-1].available_in_parking_1==0 && flg1[0]===false ){
        const m=check.getMinutes();
        setNots(prevNots => [
          ...prevNots, 
          { data: { message: "Parking full", parking_name: "1" }, time: {m} }
        ]);

        setflg1([true,now]);
      }
      if(data[data.length-1].available_in_parking_2==0 && flg2[0]===false ){
        const m=check.getMinutes();
        setNots(prevNots => [
          ...prevNots, 
          { data: { message: "Parking full", parking_name: "2" }, time: {m} }
        ]);
        setflg2([true,now]);

      }

    }
  )
    .catch(error => console.error('Error fetching data:', error));
     
    fetch('http://localhost/api/get_users_by_hours.php') // Replace with your XAMPP API URL
    .then(response =>
      { 
        return(response.json())})
    .then(data => {
      // console.log(data)
      setgraddata({labels:data.map(item=>{
        return(item.hour);
      }),datasets:[
        {
          label: "Parking 1",
          color: "info",
          data: data.map(item=>{return(parseInt(item.total_available_in_parking_1/item.count))})
        },
        {
          label: "Parking 2",
          color: "dark",
          data: data.map(item=>{return(parseInt(item.total_available_in_parking_2/item.count))})
        },
      ]
    });
     
      
    }



  )
    .catch(error => console.error('Error fetching data 2:', error));

    // console.log("Data fetched");

  }
  
  useEffect(() => {
    const intervalId = setInterval(get_data, 2000);
    // Fetch data from XAMPP API
    return () => clearInterval(intervalId);
   }, []);

  return (
  <div> 
    {/* <DashboardLayout> */}
      <DashboardNavbar  notifications={nots} />
      {/* {console.log({nots})} */}
      <SoftBox >
       
        <SoftBox mb={3}>
          
            <Grid item xs={12} lg={5}>
              <WorkWithTheRockets />
            </Grid>
          
        </SoftBox>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={5}>
              <ReportsBarChart
                title="Realtime Traffic"
                description={
                  <>
                  Current in the parking
                  </>
                }
                chart={chart}
                items={items}
              />
            </Grid>
            <Grid item xs={12} lg={7}>
              <GradientLineChart
                title="Traffic Overview"
                description={
                  <SoftBox display="flex" alignItems="center">
                    <SoftBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    </SoftBox>
                    <SoftTypography variant="button" color="text" fontWeight="medium">
                      
                      <SoftTypography variant="button" color="text" fontWeight="regular">
                        in 2024
                      </SoftTypography>
                    </SoftTypography>
                  </SoftBox>
                }
                height="20.25rem"
                chart={gradientLineChartData}
              />
            </Grid>
          </Grid>
        </SoftBox>
        
      </SoftBox>
      <SoftBox mb={3}>
          
            <Grid item xs={12} lg={5}>
           
         
            </Grid>
          
        </SoftBox>
      
      <Footer /> 
      
     {/* </DashboardLayout> */}
    </div>
  );
}

export default Dashboard;
