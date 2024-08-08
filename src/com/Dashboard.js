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

const Dashboard = () => {
  const [ selectedHastaMonth, setSelectedHastaMonth ] = useState(
    new Date().getMonth() + 1
  );

  // chart
  const Line1 = [
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

  const Line2 = [
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
      Order: "18"
    },
    {
      name: "Fri 19 Jan",
      Order: "18"
    },
    {
      name: "Fri 20 Jan",
      Order: "19"
    },
    {
      name: "Fri 21 Jan",
      Order: "15"
    },
    {
      name: "Fri 21 Jan",
      Order: "17"
    },
    {
      name: "Fri 21 Jan",
      Order: "19"
    }
  ];

  const Line3 = [
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
      Order: "18"
    },
    {
      name: "Fri 19 Jan",
      Order: "18"
    },
    {
      name: "Fri 20 Jan",
      Order: "19"
    },
    {
      name: "Fri 21 Jan",
      Order: "15"
    },
    {
      name: "Fri 21 Jan",
      Order: "19"
    },
    {
      name: "Fri 21 Jan",
      Order: "21"
    }
  ];

  const Line4 = [
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
      Order: "18"
    },
    {
      name: "Fri 19 Jan",
      Order: "18"
    },
    {
      name: "Fri 20 Jan",
      Order: "19"
    },
    {
      name: "Fri 21 Jan",
      Order: "15"
    },
    {
      name: "Fri 21 Jan",
      Order: "19"
    },
    {
      name: "Fri 21 Jan",
      Order: "21"
    }
  ];

  const Line5 = [
    {
      name: "sem 1",
      Order: "12",
      Total: "10"
    },
    {
      name: "sem 2",
      Order: "15",
      Total: "12"
    },
    {
      name: "sem 3",
      Order: "10",
      Total: "8"
    },
    {
      name: "sem 4",
      Order: "20",
      Total: "18"
    },
    {
      name: "sem 5",
      Order: "11",
      Total: "10"
    },
    {
      name: "sem 6",
      Order: "15",
      Total: "12"
    },
    {
      name: "sem 7",
      Order: "11",
      Total: "12"
    },
    {
      name: "sem 8",
      Order: "17",
      Total: "15"
    },
    {
      name: "sem 9",
      Order: "16",
      Total: "13"
    },
    {
      name: "sem 10",
      Order: "13",
      Total: "10"
    }
  ];

  const data1= [
    { name: "Group A", value: 220 },
    { name: "Group B", value: 120 },
    { name: "Group C", value: 120 },
    { name: "Group D", value: 136 }
  ];

  const entry1 = [
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

  const entry3 = [
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

  const COLORS = [ "#147bde", "#fdba8c", "#9061f9", "#16bdca" ];
  const Summary = [ "#6875f5", "#147bde", "#0e9f6e", "#ff8a4c" ];

  const seriesData = [
    {
      name: "Delivery",
      data: [ 20 ],
      color: "#147bde"
    },
    {
      name: "Retiro",
      data: [ 16 ],
      color: "#16bdca"
    },
    {
      name: "Local",
      data: [ 32 ],
      color: "#fdba8c"
    },
    {
      name: "Plataforma",
      data: [ 10 ],
      color: "#31c48d"
    }
  ];

  const delivery = {
    series: seriesData.map(({ name, data, color }) => ({
      name,
      data,
      color
    })),
    chart: {
      type: "bar",
      height: 10,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        dataLabels: {
          enabled: false
        },
        borderRadius: 4 // Apply rounded corners to the bars
        // borderRadiusApplication: "start", // Apply border radius to all sides
        // borderRadiusWhenStacked: "all"
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 0
    },
    xaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    grid: {
      show: false
    },
    legend: {
      show: false
    }
  };

  const order = [
    {
      name: "Pollo frito crujiente",
      dec: "Pedido 56",
      img: order1,
      price: "3.00"
    },
    {
      name: "Guitig",
      dec: "Pedido 200",
      img: order2,
      price: "1.00"
    },
    {
      name: "Gelatina fresa",
      dec: "Pedido 156",
      img: order3,
      price: "1.00"
    },
    {
      name: "Pollo frito crujiente",
      dec: "Pedido 56",
      img: order1,
      price: "3.00"
    },
    {
      name: "Guitig",
      dec: "Pedido 200",
      img: order2,
      price: "1.00"
    },
    {
      name: "Gelatina fresa",
      dec: "Pedido 156",
      img: order3,
      price: "1.00"
    },
    {
      name: "Pollo frito crujiente",
      dec: "Pedido 56",
      img: order1,
      price: "3.00"
    },
    {
      name: "Guitig",
      dec: "Pedido 200",
      img: order2,
      price: "1.00"
    },
    {
      name: "Gelatina fresa",
      dec: "Pedido 156",
      img: order3,
      price: "1.00"
    },
    {
      name: "Pollo frito crujiente",
      dec: "Pedido 56",
      img: order1,
      price: "3.00"
    }
  ];

  const tableData = [
    {
      pedido: "01234",
      caja: "caja 1",
      hora: "08:00 am",
      fecha: "13/04/2024",
      estado: "Anulado"
    },
    {
      pedido: "01234",
      caja: "caja 2",
      hora: "08:00 am",
      fecha: "13/04/2024",
      estado: "Anulado"
    },
    {
      pedido: "01234",
      caja: "caja 3",
      hora: "08:00 am",
      fecha: "13/04/2024",
      estado: "Anulado"
    }
  ];
  const [ activeIndex, setActiveIndex ] = useState(null);
  const handleClick = (entry, index) => {
    setActiveIndex(index);
    // Perform actions based on the clicked value
    console.log("Clicked value:", entry);
  };



  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const token = sessionStorage.getItem("token");
const [data,setData] = useState([]);
const [loading, setLoading] = useState(false);

  // api
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
      setLoading(false);
      console.log(data)// Assuming setData is a function to set the state with the response data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately, e.g., setting an error state or displaying a message
    }
  };
  
  // Call fetchData wherever you need to initiate the request

  useEffect(()=>{
setLoading(true);
    fetchData();
  },[token])





  return (
    <div>
      <Header />
      <div className="j-bg-color">
        <div className="j-sidebar-nav">
          <Sidenav />
        </div>
        {loading ? (
          <Loader />
        ):(

        <section className="j-dashboard sidebar">
          <div className="j-dashboard-statistical">
            <div className="j-dashboard-head">
              <h2 className="text-white sjfs-2">Datos estadísticos</h2>

              <div className="text-end">
                <input
                  type="radio"
                  className="btn-check"
                  name="options-base"
                  id="option1"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-primary j-blue-color j-custom-label sjfs-12"
                  htmlFor="option1"
                >
                  Día
                </label>
                <input
                  type="radio"
                  className="btn-check "
                  name="options-base"
                  id="option2"
                  autoComplete="off"
                />
                <label
                  className="btn btn-outline-primary j-custom-label j-blue-color sjfs-12"
                  htmlFor="option2"
                >
                  Semana
                </label>
                <input
                  type="radio"
                  className="btn-check"
                  name="options-base"
                  id="option3"
                  autoComplete="off"
                  defaultChecked
                />
                <label
                  className="btn btn-outline-primary j-blue-color j-custom-label sjfs-12"
                  htmlFor="option3"
                >
                  Mes
                </label>
              </div>
            </div>
            <div className="row">
              <div className="col-3 sjj_borderright">
                <div className="j-chart">
                  <div className="j-chart-head">
                    <p className="sjfs-16">Total pedidos</p>
                    <h3 className="text-white fw-bold sj-fs30">{data.statistical_data?.total_orders}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={Line1}>
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c64f2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#395692"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="Order"
                        strokeWidth={2}
                        stroke="#1c64f2" // Border color
                        fill="url(#colorGradient)" // Gradient fill
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-3 sjj_borderright">
                <div className="j-chart">
                  <div className="j-chart-head">
                    <p className="sjfs-16">Total ingresos</p>
                    <h3 className="text-white fw-bold sj-fs30">{data.statistical_data?.total_income}$</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={Line2}>
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c64f2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#395692"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="Order"
                        strokeWidth={2}
                        stroke="#1c64f2" // Border color
                        fill="url(#colorGradient)" // Gradient fill
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-3 sjj_borderright">
                <div className="j-chart">
                  <div className="j-chart-head">
                    <p className="sjfs-16">Venta promedio</p>
                    <h3 className="text-white fw-bold sj-fs30">20</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={Line3}>
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c64f2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#395692"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="Order"
                        strokeWidth={2}
                        stroke="#1c64f2" // Border color
                        fill="url(#colorGradient)" // Gradient fill
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="col-3 sjj_borderright">
                <div className="j-chart">
                  <div className="j-chart-head">
                    <p className="sjfs-16">Pedidos delivery</p>
                    <h3 className="text-white fw-bold sj-fs30">{data.statistical_data?.delivery_orders}</h3>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <AreaChart data={Line4}>
                      <defs>
                        <linearGradient
                          id="colorGradient"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c64f2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#395692"
                            stopOpacity={0.0}
                          />
                        </linearGradient>
                      </defs>
                      <Tooltip cursor={false} />
                      <Area
                        type="monotone"
                        dataKey="Order"
                        strokeWidth={2}
                        stroke="#1c64f2" // Border color
                        fill="url(#colorGradient)" // Gradient fill
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          <div className="j-dashboard-Payment">
            <div className="row">
              <div className="col-6 j-payment-color">
                <div className="s_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2">Métodos pago</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => setSelectedHastaMonth(e.target.value)}
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
                      name="options-base1"
                      id="option4"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option4"
                    >
                      Día
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base1"
                      id="option5"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option5"
                    >
                      Semana
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base1"
                      id="option6"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option6"
                    >
                      Mes
                    </label>
                  </div>
                </div>
                <div className="j-border2">
                  <div className="row">
                    <div className="col-6 j-col-3">
                      <div className="s_dashboard-body">
                        <div className="j-border px-2">
                          <h5 className="mb-1 text-white sjfs-2">Total: {data.payment_methods?.cash}</h5>
                          <p className="s_fontsize mb-2 sjfs-14">Efectivo</p>
                        </div>
                        <div className="j-border px-2 py-1">
                          <h5 className="mb-1 text-white sjfs-2">Total: {data.payment_methods?.debit}</h5>
                          <p className="s_fontsize mb-2 sjfs-14">
                            Tarjeta de debito
                          </p>
                        </div>
                        <div className="j-border px-2 py-1">
                          <h5 className="mb-1 text-white sjfs-2">Total: {data.payment_methods?.credit}</h5>
                          <p className="s_fontsize mb-2 sjfs-14">
                            Tarjeta de crédito
                          </p>
                        </div>
                        <div className="px-2 py-1">
                          <h5 className="mb-1 text-white sjfs-2">Total: {data.payment_methods?.transfer}</h5>
                          <p className="s_fontsize sjfs-14">Transferencias</p>
                        </div>
                      </div>
                    </div>
                    {/* <div>
                      <Chart />
                    </div> */}
                    <div className="col-6 .j-col-3">
                      <div className="j-text-center position-relative ">
                        
                        
                        <Aa data={data.payment_methods} />
                        {/* <Chart /> */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Chart/> */}
                <div>{/* <Chart /> */}</div>
                <div className="j-foot-border py-3">
                  <div className="j-payment-foot text-white row">
                    <div className="d-flex align-items-center justify-content-center col-md-6">
                      <img src={chart1} className="ss_img" />
                      <p className="ss_fontsize mb-0 sjfs-14">
                        Efectivo:{" "}
                        <span className="text-white me-4 sjfs-14">
                        {data.payment_methods?.cash}$ CLP
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center  col-md-6">
                      <img src={chart2} className="ssj_img" />
                      <p className="ss_fontsize mb-0 sjfs-14">
                        Tarjeta debito:{" "}
                        <span className="text-white sjfs-14">{data.payment_methods?.debit}$ CLP</span>
                      </p>
                    </div>
                  </div>
                  <div className="j-payment-foot text-white row">
                    <div className="d-flex align-items-center justify-content-center col-md-6 ">
                      <img src={chart3} className="ss_img" />
                      <p className="ss_fontsize mb-0 sjfs-14">
                        Tarjeta crédito:{" "}
                        <span className="text-white me-4 sjfs-14">
                        {data.payment_methods?.credit}$ CLP
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center col-md-6">
                      <img src={chart4} className="ssj_img" />
                      <p className="ss_fontsize mb-0 sjfs-14">
                        Transferencias:{" "}
                        <span className="text-white sjfs-14">{data.payment_methods?.transfer}$ CLP</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
              <div className="col-6 j-payment-color2">
                <div className="s_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <div className="s_dashboard-left-head  ">
                      <h2 className="text-white  sjfs-2">{data.total_revenue}$</h2>
                      <p>Ingresos totales</p>
                    </div>

                    <div className="s_dashboard-right-head">
                      <div className="mb-2">
                        <select
                          id="month-select"
                          class="form-select sjfs-14"
                          onChange={(e) =>
                            setSelectedHastaMonth(e.target.value)}
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
                      <div className="text-end">
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-base2"
                          id="option7"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary j-custom-label sjfs-12"
                          htmlFor="option7"
                        >
                          Día
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-base2"
                          id="option8"
                          autoComplete="off"
                        />
                        <label
                          className="btn btn-outline-primary j-custom-label sjfs-12"
                          htmlFor="option8"
                        >
                          Semana
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-base2"
                          id="option9"
                          autoComplete="off"
                          defaultChecked
                        />
                        <label
                          className="btn btn-outline-primary j-custom-label sjfs-12"
                          htmlFor="option9"
                        >
                          Mes
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="j-payment-body">
                  <ResponsiveContainer width="100%" height={450}>
                    <AreaChart data={Line5}>
                      <defs>
                        <linearGradient
                          id="colorOrder"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1c64f2"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#395692"
                            stopOpacity={0.0}
                            stroke="none"
                          />
                        </linearGradient>
                        <linearGradient
                          id="colorTotal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#16bdca"
                            stopOpacity={0.4}
                            stroke="none"
                          />
                          <stop
                            offset="95%"
                            stopColor="#1c506a"
                            stopOpacity={0.0}
                            stroke="none"
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="rgb(55, 65, 82)"
                        horizontal={true}
                        vertical={false}
                      />{" "}
                      {/* Only horizontal grid lines */}
                      <XAxis dataKey="name" axisLine={false} />
                      {/* {/ Remove YAxis line /} */}
                      <YAxis axisLine={false} /> {/* YAxis for vertical axis */}
                      <Tooltip cursor={false} />
                      <Area
                        dataKey="Order"
                        stroke="#1c64f2"
                        strokeWidth={3}
                        fill="url(#colorOrder)"
                        dot={false}
                      />
                      <Area
                        dataKey="Total"
                        stroke="#16bdca"
                        strokeWidth={3}
                        fill="url(#colorTotal)"
                        dot={false}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="j-dashboard-summary">
            <div className="row">
              <div className="col-6 j-payment-color">
                <div className="j_dashboard-head">
                  <h2 className="text-white  sjfs-2">Resumen estados</h2>
                  <p className="sjfs-16">En tiempo real</p>
                </div>
                <div className="j-text-dta  position-relative">
                  <div>
                    <Sa data={data.statusSummary} />
                    {/* <Aa /> */}
                  </div>
                  <div className="j-summary-data2 mb-3">
                    <div className="d-flex align-items-center j-margin">
                      <img src={chart4} className="jj_img me-2" />
                      <p className="ss_fontsize mb-0 sjfs-14">Recibido</p>
                    </div>
                    <div className="d-flex align-items-center j-margin">
                      <img src={chart2} className="jj_img me-2" />
                      <p className="ss_fontsize mb-0 sjfs-14">Preparado</p>
                    </div>
                    <div className="d-flex align-items-center j-margin">
                      <img src={chart1} className="jj_img me-2" />
                      <p className="ss_fontsize mb-0 sjfs-14">Entregado</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <img src={chart3} className="jj_img me-2" />
                      <p className="ss_fontsize mb-0 sjfs-14">Finalizado</p>
                    </div>
                  </div>
                </div>
                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
              <div className="col-6 j-payment-color2">
                <div className="j_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2 mb-0">Popular</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => setSelectedHastaMonth(e.target.value)}
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
                      name="options-base3"
                      id="option10"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option10"
                    >
                      Día
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base3"
                      id="option11"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option11"
                    >
                      Semana
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base3"
                      id="option12"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option12"
                    >
                      Mes
                    </label>
                  </div>
                </div>

                <div className="j-summary-body j-example">
                {data?.popular_products?.map((item, index) => (
    <div
      key={item.id}
      className="j-summary-body-data scrollbox d-flex align-items-center justify-content-between"
    >
      <div className="d-flex align-items-center">
        <div className="j-order-no">#{index + 1}</div>
        <div className="j-order-img">
          <img src={`${API}/images/${item.image}`} alt={item.name} />
        </div>
        <div className="j-order-data">
          <h4 className="sjfs-16">{item.name}</h4>
          <p className="sjfs-12">Padido {item.order_count}</p>
        </div>
      </div>
      <div className="j-order-price sjfs-16 me-2">
        {item.order_count}$
      </div>
    </div>
  ))}
</div>
                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="j-dashboard-delivery">
            <div className="row">
              <div className="col-6 j-payment-color">
                <div className="j_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2">Delivery</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => setSelectedHastaMonth(e.target.value)}
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
                      name="options-base4"
                      id="option13"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option13"
                    >
                      Día
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base4"
                      id="option14"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option14"
                    >
                      Semana
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base4"
                      id="option15"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option15"
                    >
                      Mes
                    </label>
                  </div>
                </div>

                <div className="j-delivery-body">
                  <div className="row">
                    <div className="col-6">
                      <div className="j-delivery-data">
                        <p className="sjfs-16">Delivery</p>
                        <h5 className="sjfs-2">20</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="j-delivery-data">
                        <p className="sjfs-16">Retiro</p>
                        <h5 className="sjfs-2">16</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="j-delivery-data">
                        <p className="sjfs-16">Local</p>
                        <h5 className="sjfs-2">32</h5>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="j-delivery-data">
                        <p className="sjfs-16">Plataforma</p>
                        <h5 className="sjfs-2">10</h5>
                      </div>
                    </div>
                  </div>

                  <div className="j-delivery-chart">
                    <div id="chart">
                      <Chart
                        options={delivery}
                        series={delivery.series}
                        type="bar"
                        height={75}
                      />
                    </div>
                  </div>

                  <div className="j-delivery-foot">
                    <div className="j-summary-data2 mb-3">
                      <div className="d-flex align-items-center me-4">
                        <img src={chart1} className="jj_img me-2" />
                        <p className="ss_fontsize mb-0 sjfs-12">Delivery</p>
                      </div>
                      <div className="d-flex align-items-center me-4">
                        <img src={chart3} className="jj_img me-2" />
                        <p className="ss_fontsize mb-0 sjfs-12">Retiro</p>
                      </div>
                      <div className="d-flex align-items-center me-4">
                        <img src={chart2} className="jj_img me-2" />
                        <p className="ss_fontsize mb-0 sjfs-12">Local</p>
                      </div>
                      <div className="d-flex align-items-center">
                        <img src={green} className="jj_img me-2" />
                        <p className="ss_fontsize mb-0 sjfs-12">Plataforma</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-6 j-payment-color2">
                <div className="j_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2">Ingreso de cajas</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => setSelectedHastaMonth(e.target.value)}
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
                    >
                      Mes
                    </label>
                  </div>
                </div>

                <div
                  className="j-chart-entry"
                  style={{ height: "300px", overflowY: "auto" }}
                >
                  {/* <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry1}>
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
                      <p className="sjfs-14">Caja 1</p>
                      <h5 className="sjfs-2">20$</h5>
                    </div>
                  </div> */}
                  {data?.box_entry?.map((ele,index)=>(

                  <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry2}>
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
                      <p className="sjfs-14">{ele.box}</p>
                      <h5 className="sjfs-2">{ele.collected_amount}$</h5>
                    </div>
                  </div>
                  ))}
                  {/* <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry3}>
                        <Tooltip cursor={false} />
                        <Line
                          type="monotoneX"
                          dataKey="Order"
                          stroke="#e02424"
                          dot={false}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="j-chart-entry-data ps-3">
                      <p className="sjfs-14">Caja 3</p>
                      <h5 className="sjfs-2">100$</h5>
                    </div>
                  </div>
                  <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry1}>
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
                      <p className="sjfs-14">Caja 1</p>
                      <h5 className="sjfs-2">20$</h5>
                    </div>
                  </div>
                  <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry2}>
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
                      <p className="sjfs-14">Caja 2</p>
                      <h5 className="sjfs-2">28$</h5>
                    </div>
                  </div>
                  <div className="j-chart-entry-1 d-flex align-items-center">
                    <ResponsiveContainer width={100} height={100}>
                      <LineChart data={entry3}>
                        <Tooltip cursor={false} />
                        <Line
                          type="monotoneX"
                          dataKey="Order"
                          stroke="#e02424"
                          dot={false}
                          strokeWidth={2}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                    <div className="j-chart-entry-data ps-3">
                      <p className="sjfs-14">Caja 3</p>
                      <h5 className="sjfs-2">100$</h5>
                    </div>
                  </div> */}
                </div>

                <div className="j-foot-text text-end">
                  <button className="sjfs-14">
                    Ver reporte <FaAngleRight />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="j-dashboard-cancel">
            <div className="row">
              <div className="col-12 j-cancel-color">
                <div className="j_dashboard-head">
                  <div className="d-flex justify-content-between text-white">
                    <h2 className="text-white sjfs-2">Anulación pedidos</h2>
                    <div>
                      <select
                        id="month-select"
                        class="form-select sjfs-14"
                        onChange={(e) => setSelectedHastaMonth(e.target.value)}
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
                      name="options-base6"
                      id="option19"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option19"
                    >
                      Día
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base6"
                      id="option20"
                      autoComplete="off"
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option20"
                    >
                      Semana
                    </label>
                    <input
                      type="radio"
                      className="btn-check"
                      name="options-base6"
                      id="option21"
                      autoComplete="off"
                      defaultChecked
                    />
                    <label
                      className="btn btn-outline-primary j-custom-label sjfs-12"
                      htmlFor="option21"
                    >
                      Mes
                    </label>
                  </div>
                </div>

                <div className="j-table">
                  <div class="table-container">
                    <table class="table">
                      <thead>
                        <tr>
                          <th
                            className="sjfs-17"
                            scope="col"
                            style={{ borderRadius: "10px 0 0 0" }}
                          >
                            Pedido
                          </th>
                          <th scope="col" className="sjfs-17">
                            Caja
                          </th>
                          <th scope="col" className="sjfs-17">
                            Hora
                          </th>
                          <th scope="col" className="sjfs-17">
                            Fecha
                          </th>
                          <th scope="col" className="sjfs-17">
                            Estado
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableData.map((e, index) => (
                          <tr key={index}>
                            <td scope="row">
                              <Link to={"/home_Pedidos/paymet"}>
                                <button className="j-success sjfs-16">
                                  {e.pedido}
                                </button>
                              </Link>
                            </td>
                            <td className="sjfs-17">{e.caja}</td>
                            <td className="sjfs-17">{e.hora}</td>
                            <td className="sjfs-17">{e.fecha}</td>
                            <td>
                              <button className="j-danger sjfs-16">
                                {e.estado}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
        )}
      </div>
    </div>
  );
};

export default Dashboard;
