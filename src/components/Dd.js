import React, { useEffect, useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  Tooltip,
  Pie,
  PieChart,
  Cell,
  Bar,
  Area,
  AreaChart,
  Label,
  YAxis,
  CartesianGrid
} from "recharts";
import Sidenav from "./Sidenav";
import ApexCharts from "apexcharts";

import { BiSolidDashboard, BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaAngleRight, FaBox, FaDigitalOcean, FaUser } from "react-icons/fa";
import { ImPieChart, ImUsers } from "react-icons/im";
import {
  MdArticle,
  MdCountertops,
  MdOutlineKeyboardArrowDown,
  MdOutlineProductionQuantityLimits
} from "react-icons/md";
import chart1 from "../Image/Ellipse 1.png";
import chart2 from "../Image/Ellipse 2.png";
import chart3 from "../Image/Ellipse 4.png";
import chart4 from "../Image/Ellipse 3.png";
import order1 from "../Image/order1.png";
import order2 from "../Image/order2.png";
import order3 from "../Image/order3.png";
import Chart from "react-apexcharts";
import green from "../Image/green.png";
import Aa from "./Aa";
import Sa from "./Sa";
import Header from "./Header";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";
// import ApexCharts from "apexcharts";
// import ApexCharts from 'apexcharts';

const Dd = () => {
  const [selectedHastaMonth, setSelectedHastaMonth] = useState(
    new Date().getMonth() + 1
  );

  const entry2 = [
    {
      name: "Mon 15 Jan",
      Order: "10"
    },
    {
      name: "Mon 16 Jan",
      Order: "15"
    },
    {
      name: "Wed 17 Jan",
      Order: "10"
    },
    {
      name: "Thu 15 Jan",
      Order: "17"
    },
    {
      name: "Thu 18 Jan",
      Order: "20"
    },
    {
      name: "Fri 19 Jan",
      Order: "18"
    },
    {
      name: "Fri 20 Jan",
      Order: "22"
    },
    {
      name: "Fri 21 Jan",
      Order: "16"
    },
    {
      name: "Fri 21 Jan",
      Order: "15"
    },
    {
      name: "Fri 21 Jan",
      Order: "14"
    }
  ];


  const seriesData = [
    {
      name: "Delivery",
      data: [20],
      color: "#147bde"
    },
    {
      name: "Retiro",
      data: [16],
      color: "#16bdca"
    },
    {
      name: "Local",
      data: [32],
      color: "#fdba8c"
    },
    {
      name: "Plataforma",
      data: [10],
      color: "#31c48d"
    }
  ];




  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick = (entry, index) => {
    setActiveIndex(index);
    // Perform actions based on the clicked value
    console.log("Clicked value:", entry);
  };



  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const token = sessionStorage.getItem("token");
  const [data, setData] = useState([]);
  const [statisticalData, setStatisticalData] = useState('month');
  const [boxDay,setBoxDay]= useState('month');
  const [selectBoxMonth,setselectBoxMonth]= useState(new Date().getMonth() + 1)
  const [boxDetails,setBoxDetails]= useState([])
  // api

  useEffect(() => {
    fetchData();
  
    fetchBox();
  }, [token, statisticalData,selectBoxMonth,boxDay])

  const fetchBox = async () =>{
    
    try {
      let durationData = {};
  
        if (boxDay === 'day') {
          durationData = {
            duration: 'day',
            day: new Date().toISOString().split('T')[0]
          };
        } else if (boxDay === 'week') {
          durationData = {
            duration: 'week',
            week: '1'  // Assuming '1' represents the current week
          };
        } else if (boxDay === 'month') {
          durationData = {
            duration: 'month',
            month: selectBoxMonth  // Current month (1-12)
          };
        } else {
  
        }
      const response = await axios.post(`${apiUrl}/getBoxEntry`,durationData,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setBoxDetails(response.data.box_entries)
      console.log("box entry" , response.data.box_entries)
    } catch (error) {
      console.error('Error at box ',error)
    }
  }


  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/dashboard`,
        {}, // You can pass any data here if needed
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setData(response.data);

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., setting an error state or displaying a message
    }
  };


  return (
    <div>
      <Header />
      <div className="j-bg-color">
        <div className="j-sidebar-nav">
          <Sidenav />
        </div>
        <section className="j-dashboard sidebar">
        <div className="j-dashboard-delivery">
            <div className="row">
             
              <div className="col-12 j-payment-color2">
                <div className="j_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2">Ingreso de cajas</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          setselectBoxMonth(selectedValue);
                          if (selectedValue === "12") {
                            const currentMonth = new Date().getMonth() + 1;
                            setselectBoxMonth(currentMonth); // Set to current month
                            fetchData(); // Call fetchData to get current month data
                          }
                        }}
                        value={selectedHastaMonth}
                      >
                        <option value="1">Mes Enero</option>
                        <option value="2">Mes Febrero</option>
                        <option value="3">Mes Marzo</option>
                        <option value="4">Mes Abril</option>
                        <option value="5">Mes Mayo</option>
                        <option value="6">Mes Junio</option>
                        <option value="7">Mes Julio</option>
                        <option value="8">Mes Agosto</option>
                        <option value="9">Mes Septiembre</option>
                        <option value="10">Mes Octubre </option>
                        <option value="11">Mes Noviembre</option>
                        <option value="12">Mes Diciembre</option>
                      </select>
                    </div>
                  </div>

                  <div className="text-end">
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base5"
                      id="option16"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option16"
                      onClick={() => setBoxDay('day')}
                    >
                      Día
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base5"
                      id="option17"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option17"
                      onClick={() => setBoxDay('week')}
                    >
                      Semana
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base5"
                      id="option18"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option18"
                      onClick={() => setBoxDay('month')}
                    >
                      Mes
                    </label>
                  </div>
                </div>

                <div
                  className="j-chart-entry"
                  style={{ height: "300px", overflowY: "auto" }}
                >
                  
                  {boxDetails.map((ele, index) => {
                    const totalAmount = ele.logs.reduce((sum, log) => {
                      const closeAmount = parseFloat(log.close_amount);
                      const openAmount = parseFloat(log.open_amount) || 0;
                      return closeAmount ? sum + (closeAmount - openAmount) : sum;
                    }, 0);
                    // Prepare data for the chart
                    const chartData = [
                      { name: '', Order: 0 }, // Start with 0 value
                      ...ele.logs.map(log => ({
                        name: log.open_time, // Use open_time as the x-axis label
                        Order: parseFloat(log.close_amount) - parseFloat(log.open_amount) // Calculate the order value
                      }))
                    ];

                    return (
                      <div className="j-chart-entry-1 d-flex align-items-center" key={index}>
                        <ResponsiveContainer width={100} height={100}>
                          <LineChart data={chartData}>
                            <Tooltip cursor={false} />
                            <Line
                              type="monotoneX"
                              dataKey="Order"
                              stroke="#0e9f6e"
                              dot={false}
                              strokeWidth={2}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                        <div className="j-chart-entry-data ps-3">
                          <p className="sjfs-14">{ele.box_name}</p>
                          <h5 className="sjfs-2"> {parseFloat(totalAmount) % 1 === 0 ? `${parseFloat(totalAmount).toFixed(0)}$` : `${parseFloat(totalAmount)}$`}</h5> {/* Display total amount */}
                         
                        </div>
                      </div>
                    );
                  })}
                  
                </div>

                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Dd;
