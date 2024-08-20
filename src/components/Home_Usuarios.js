import React, { useEffect, useState } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { BiSolidFoodMenu } from 'react-icons/bi';
import { TfiAngleLeft, TfiAngleRight } from 'react-icons/tfi';
import { Link } from 'react-router-dom';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { Modal } from 'react-bootstrap';
import axios from 'axios';

function Home_Usuarios() {

    const API_URL = "https://shreekrishnaastrology.com/api"; // Laravel API URL
    const API = "https://shreekrishnaastrology.com/public";

    const [token, setToken] = useState(
        "2647|bkAORMNJS6ite9xHPiGmApoi78Dfz9tV8Bzbyb6a1ca62063"
    );

    const [filterData, setFilterData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [orderAlldata, setOrderAlldata] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const [showEditFamDel, setShowEditFamDel] = useState(false);
    const itemsPerPage = 20;

    useEffect(() => {
        getAllorder();
    }, [showEditFamDel]);

    const getAllorder = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/getAll`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setFilterData(response.data);
            setOrderAlldata(response.data);
            console.log(response.data);

        } catch (error) {
            console.error(
                "Error fetching allOrder:",
                error.response ? error.response.data : error.message
            );
        }
    }

    const handleType = (type) => {
        console.log(type);
        if (type.toLowerCase() === "todo") {
            setFilterData(orderAlldata);
        } else {
            const filteredData = orderAlldata.filter((v) => v.order_type.toLowerCase() === type.toLowerCase());
            setFilterData(filteredData);
        }
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        console.log("asfas");
        
        setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(filterData.length / itemsPerPage)));
    };

    const handlePrevPage = () => {
        console.log("qewq");
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const getCurrentItems = () => {
       
        const filteredItems = filterData.filter(order => 
            (order.customer_name && order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (order.payment_type && order.payment_type.toLowerCase().includes(searchTerm.toLowerCase())) || 
            (order.order_type && order.order_type.toLowerCase().includes(searchTerm.toLowerCase())) 
        );
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        return filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    };

    const totalPages = Math.ceil(filterData.filter(order => 
        (order.customer_name && order.customer_name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (order.id && order.id.toString().includes(searchTerm))
    ).length / itemsPerPage);



    document.addEventListener('DOMContentLoaded', function () {
        const tabs = document.querySelectorAll('#pills-tab button');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                // Remove 'bg-primary', 'text-light', 'bg-light', 'text-dark' from all tabs
                tabs.forEach(button => {
                    button.classList.remove('bg-primary', 'text-light');
                    button.classList.add('bg-light', 'text-dark');
                });

                // Add 'bg-primary' and 'text-light' to the clicked tab
                tab.classList.remove('bg-light', 'text-dark');
                tab.classList.add('bg-primary', 'text-light');
            });
        });
    });

    const handleCloseEditFamDel = () => setShowEditFamDel(false);
    const handleShowEditFamDel = async(no) => {
        setTimeout(() => {
            setShowEditFamDel(false)
        }, 2000);

        try {
            const response = await axios.delete(`${API_URL}/order/delete/${no}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        } catch (error) {
            console.error(
                "Error deleting order:",
                error.response ? error.response.data : error.message
            );
        }

       

        const newData = data.filter((order) => order.no !== no);
        const newData1 = data1.filter((order) => order.no !== no);
        const newData2 = data2.filter((order) => order.no !== no);
        const newData3 = data3.filter((order) => order.no !== no);
        const newData4 = data4.filter((order) => order.no !== no);

        // Update the state with the new filtered data
        setData(newData);
        setData1(newData1);
        setData2(newData2);
        setData3(newData3);
        setData4(newData4);

        console.log('Delete button clicked for order:', no);
        setShowEditFamDel(true)
    };

    // const handleType = (type)=>{
    //     const filterData = orderAlldata.filter((v)=>v.type == type.tolowerCase())
    //     setFilterData(filterData)
    // }



    const handleEditClick = (id) => {
        // Implement edit functionality here
        console.log('Edit button clicked for order:', id);
    };

    const handleStatusChange = (id, newStatus) => {
        // Update order status
        const newData = data.map((order) => {
            if (order.id === id) {
                return { ...order, status: newStatus };
            }
            return order;
        });
        setData(newData);
    };







    const [data, setData] = useState([
        {
            no: 1,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Uber', // Add a status property
        },
        {
            no: 2,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Rappi', // Add a status property
        },
        {
            no: 3,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Padidos Ya', // Add a status property
        },
        {
            no: 4,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Padidos Ya', // Add a status property
        },
        {
            no: 5,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Delivery', // Add a status property
        },
        {
            no: 6,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Retirar', // Add a status property
        },
        {
            no: 7,
            id: '01234',
            order: '03/28/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            method: 'Efectivo',
            turned: '$3.00',
            guy: 'Local', // Add a status property
        },
        // More orders...



    ]);
    const [data1, setData1] = useState([


        {
            no: 8,
            id1: '01234',
            order1: '28/03/2024',
            time1: '08:56 am',
            customer1: 'Damian Gonzales',
            Delivery_address1: 'Avenida 123 y Avenida 789',
            guy1: 'Uber', // Add a status property
        },
        {
            no: 9,
            id1: '01234',
            order1: '28/03/2024',
            time1: '08:56 am',
            customer1: 'Damian Gonzales',
            pay1: '$20.00',
            Delivery_address1: 'Avenida 123 y Avenida 789',
            guy1: 'Rappi', // Add a status property
        },
        {
            no: 10,
            id1: '01234',
            order1: '28/03/2024',
            time1: '08:56 am',
            customer1: 'Damian Gonzales',
            pay1: '$20.00',
            Delivery_address1: 'Avenida 123 y Avenida 789',
            guy1: 'Padidos Ya', // Add a status property
        },
        {
            no: 11,
            id1: '01234',
            order1: '28/03/2024',
            time1: '08:56 am',
            customer1: 'Damian Gonzales',
            pay1: '$20.00',
            Delivery_address1: 'Avenida 123 y Avenida 789',
            guy1: 'Padidos Ya', // Add a status property
        },
    ])
    const [data2, setData2] = useState([
        {
            no: 12,
            id: '01234',
            order: '28/03/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Sucursal 1',
            guy: 'Retiro', // Add a status property
        },
        {
            no: 13,
            id: '01234',
            order: '28/03/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Sucursal 2',
            guy: 'Retiro', // Add a status property
        },
        {
            no: 14,
            id: '01234',
            order: '28/03/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Sucursal 3',
            guy: 'Retiro', // Add a status property
        },
        {
            no: 15,
            id: '01234',
            order: '28/03/2024 ',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Sucursal 4',
            guy: 'Retiro', // Add a status property
        },

    ]);
    const [data3, setData3] = useState([
        {
            no: 16,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Restaurante 1',
            guy: 'Local', // Add a status property
        },
        {
            no: 17,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Restaurante 1',
            guy: 'Local', // Add a status property
        },
        {
            no: 18,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Restaurante 1',
            guy: 'Local', // Add a status property
        },
        {
            no: 19,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            withdrawal_address: 'Restaurante 1',
            guy: 'Local', // Add a status property
        },
    ]);
    const [data4, setData4] = useState([
        {
            no: 20,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            shipping_add: 'Avenida 123 y Calle 789',
            guy: 'Platform', // Add a status property
        },
        {
            no: 21,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            shipping_add: 'Avenida 123 y Calle 789',
            guy: 'Platform', // Add a status property
        },
        {
            no: 22,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            shipping_add: 'Avenida 123 y Calle 789',
            guy: 'Platform', // Add a status property
        },
        {
            no: 23,
            id: '01234',
            order: '28/03/2024',
            time: '08:56 am',
            customer: 'Damian Gonzales',
            pay: '$20.00',
            shipping_add: 'Avenida 123 y Calle 789',
            guy: 'Platform', // Add a status property
        },
    ])

    // const [currentPage, setCurrentPage] = useState({
    //     filterData:1
    // });
    // const itemsPerPage = 20;

    // const handleNextPage = (dataType) => {
    //     setCurrentPage((prevState) => ({
    //         ...prevState,
    //         [dataType]: Math.min(prevState[dataType] + 1, Math.ceil(eval(dataType).length / itemsPerPage))
    //     }));
    // };

    // const handlePrevPage = (dataType) => {
    //     setCurrentPage((prevState) => ({
    //         ...prevState,
    //         [dataType]: Math.max(prevState[dataType] - 1, 1)
    //     }));
    // };

    // const getCurrentItems = (dataType) => {
    //     const indexOfLastItem = currentPage[dataType] * itemsPerPage;
    //     const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    //     return eval(dataType).slice(indexOfFirstItem, indexOfLastItem);
    // };



    return (
        <div className='b_bg_color'>
            <Header />

            <div className='d-flex '>
                <div>
                    <Sidenav />
                </div>

                <div className='flex-grow-1 overflow-hidden sidebar b_bg_table '>
                    <div className='ms-4' style={{ marginTop: "20px", marginBottom: "16px" }}>
                        <h4 className='text-white bj-delivery-text-1'>Delivery</h4>
                    </div>
                    <div className='d-flex b_main_search ms-4 justify-content-between mt-3'>
                        <div>
                            <div className="">
                                <div class="m_group">
                                    <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        class="m_icon">
                                        <g>
                                            <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                        </g>
                                    </svg>
                                    <input
                                        class="bm_input"
                                        type="search"
                                        placeholder="Buscar"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='b_marg'>
                            <div className='me-4'>
                                <Link to={"/home/usa/bhomedelivery"}>
                                    <button type="submit" class="btn text-white bj-delivery-text-3 j-btn-primary mb-3 me-3 py-2" style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}>+ Crear pedido</button>
                                </Link>
                                <button type="submit" class="btn bj-delivery-text-3  bj-btn-outline-primary mb-3 py-2  " style={{ borderRadius: "10px" }}><BiSolidFoodMenu /> Generar reporte</button>
                            </div>
                        </div>
                    </div>
                    <div className='justify-content-between  b_btn_main'>
                        <div className=''>
                            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                <ul className="nav nav-pills  b_nav ms-4 mb-3 gap-3 " id="pills-tab" role="tablist" >
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link active rounded-pill bj-delivery-text-2 " id="pills-home-tab1" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true" onClick={() => handleType("Todo")} >Todo</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link rounded-pill bj-delivery-text-2 " id="pills-profile-tab2" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false" onClick={() => handleType("Delivery")}>Delivery</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link rounded-pill bj-delivery-text-2 " id="pills-contact-tab3" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false" onClick={() => handleType("Retiro")} >Retiro</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link rounded-pill bj-delivery-text-2 " id="pills-local-tab4" data-bs-toggle="pill" data-bs-target="#pills-local" type="button" role="tab" aria-controls="pills-local" aria-selected="false" onClick={() => handleType("Local")} >Local</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button className="nav-link rounded-pill bj-delivery-text-2 " id="pills-paltform-tab5" data-bs-toggle="pill" data-bs-target="#pills-paltform" type="button" role="tab" aria-controls="pills-paltform" aria-selected="false" onClick={() => handleType("Plataforma")} >Plataforma</button>
                                    </li>
                                </ul>
                                {/* <div className='text-white fs-5 fw- d-flex b_arrow align-item-center justify-content-center'>
                                    <div className='text-white  d-flex  b_arrow' style={{ alignItems: "baseline" }}>
                                        <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                            <FaAngleLeft
                                                className='bj-right-icon-size-2'
                                                onClick={handlePrevPage}
                                                disabled={currentPage === 1}
                                            />
                                        </div>
                                        <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                            <FaAngleRight
                                                className='bj-right-icon-size-2'
                                                onClick={handleNextPage}
                                                disabled={currentPage === totalPages}
                                            />
                                        </span>
                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)}</span> de <span className='text-white'>{currentItems.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div> */}

                            </div>

                            <div className="tab-content text-white" id="pills-tabContent">
                                <div className="tab-pane fade show active text-white" id="" role="tabpanel" aria-labelledby="">
                                    <div className='text-white j-delivery-position-final d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer", position: "absolute", top: "200px", right: "0" }}>
                                        <div className='j-right-left-arrow'>
                                            <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                                <FaAngleLeft
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handlePrevPage()}
                                                    disabled={currentPage === 1}
                                                />
                                            </div>
                                            <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                                <FaAngleRight
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handleNextPage()}
                                                    disabled={currentPage === Math.ceil(filterData.length / itemsPerPage)}
                                                />
                                            </span>
                                        </div>
                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filterData.length)}</span> de <span className='text-white'>{filterData.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='b_table1'>
                                        <table className='b_table bj-table mb-4'>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Pedido</th>
                                                    <th className='text-nowrap'>Hora pedido </th>
                                                    <th></th>
                                                    <th>Cliente</th>
                                                    <th>Pago</th>
                                                    <th>Metodo</th>
                                                    <th>Vuelto</th>
                                                    <th >Tipo</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn '>
                                                {getCurrentItems().map((order) => (
                                                    console.log(order),
                                                    
                                                    <tr key={order.id} className='b_row'>
                                                        <td className='b_idbtn bj-delivery-text-2 ms-3' style={{ borderRadius: "10px" }}>{order.id}</td>
                                                        <td className='b_text_w'>{new Date(order?.created_at).toLocaleDateString()}</td>
                                                        <td className='b_text_w'>{new Date(order?.created_at).toLocaleTimeString()}</td>
                                                        <td className='b_text_w'>{order.customer_name}</td>
                                                        <td className='b_text_w'>${order.total}</td>
                                                        <td className='b_text_w'>{order.payment_type}</td>
                                                        <td className='b_text_w'>${order.total}</td>
                                                        <td className='b_btn1 bj-delivery-text-2 mb-3 ms-3 d-flex align-items-center justify-content-center'>{order.order_type}</td>
                                                        <td className='b_text_w'>
                                                            <Link to={`/home/usa/information/${order.id}`}>
                                                                <button className='b_edit me-5'><MdEditSquare /></button>
                                                            </Link>
                                                            <button className='b_edit b_delete' onClick={() => handleShowEditFamDel(order.id)}><RiDeleteBin5Fill /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                                {/* <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab2">
                                    <div className='text-white j-delivery-position-final d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer", position: "absolute", top: "200px", right: "0" }}>
                                        <div className="j-right-left-arrow">
                                            <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                                <FaAngleLeft
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handlePrevPage('data1')}
                                                    disabled={currentPage.data1 === 1}
                                                />
                                            </div>
                                            <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                                <FaAngleRight
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handleNextPage('data1')}
                                                    disabled={currentPage.data1 === Math.ceil(data1.length / itemsPerPage)}
                                                />
                                            </span>
                                        </div>
                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{(currentPage.data1 - 1) * itemsPerPage + 1}-{Math.min(currentPage.data1 * itemsPerPage, data1.length)}</span> de <span className='text-white'>{data1.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                </div> */}
                                {/* <div className='b_table1'>
                                        <table className='b_table bj-table mb-4'>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Pedido</th>
                                                    <th>Hora Pedido </th>
                                                    <th></th>
                                                    <th>Cliente</th>
                                                    <th className='text-nowrap'>Direccion entrega</th>
                                                    <th>Delivery</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn '>
                                                {getCurrentItems('data1').map((order) => (
                                                    <tr key={order.id1} className='b_row'>
                                                        <td className='b_idbtn bj-delivery-text-2 ms-3' style={{ borderRadius: "10px" }}>{order.id1}</td>
                                                        <td>{order.order1}</td>
                                                        <td className='b_text_w '>{order.time1}</td>
                                                        <td className='b_text_w'>{order.customer1}</td>
                                                        <td className='b_text_w'>{order.Delivery_address1}</td>
                                                        <td className={`b_btn1 bj-delivery-text-2 mb-3 ms-3 text-nowrap d-flex  align-items-center justify-content-center ${order.guy1 == 'Uber' ? 'b_green' : order.guy1 === 'Rappi' ? 'b_red' : order.guy1 === 'Padidos Ya' ? 'b_ora' : 'text-denger'}`}>{order.guy1}</td>
                                                        <td className='b_text_w'>
                                                            <Link to={"/home/usa/information"}>
                                                                <button className='b_edit me-5' onClick={() => handleEditClick(order.id1)}><MdEditSquare /></button>
                                                            </Link>
                                                            <button className='b_edit b_delete' onClick={() => handleShowEditFamDel(order.no)}><RiDeleteBin5Fill /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div> */}

                            {/* <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab3">

                                    <div className='text-white j-delivery-position-final  d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer", position: "absolute", top: "200px", right: "0" }}>
                                        <div className="j-right-left-arrow">
                                            <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                                <FaAngleLeft
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handlePrevPage('data2')}
                                                    disabled={currentPage.data2 === 1}
                                                />
                                            </div>
                                            <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                                <FaAngleRight
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handleNextPage('data2')}
                                                    disabled={currentPage.data2 === Math.ceil(data2.length / itemsPerPage)}
                                                />
                                            </span>
                                        </div>
                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{(currentPage.data2 - 1) * itemsPerPage + 1}-{Math.min(currentPage.data2 * itemsPerPage, data2.length)}</span> de <span className='text-white'>{data2.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='b_table1'>
                                        <table className='b_table bj-table mb-4'>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Pedido</th>
                                                    <th>Hora Pedido </th>
                                                    <th></th>
                                                    <th>Cliente</th>
                                                    <th className='text-nowrap'>Direccion retiro</th>
                                                    <th>Retiro</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn'>
                                                {getCurrentItems('data2').map((order) => (
                                                    <tr key={order.id} className='b_row'>
                                                        <td className='b_idbtn ms-3 bj-delivery-text-2' style={{ borderRadius: "10px" }}>{order.id}</td>
                                                        <td>{order.order}</td>
                                                        <td className='b_text_w'>{order.time}</td>
                                                        <td className='b_text_w'>{order.customer}</td>
                                                        <td className='b_text_w'>{order.withdrawal_address}</td>
                                                        <td className='b_btn1 bj-delivery-text-2 b_btn_w mb-3  ms-3 d-flex  align-items-center justify-content-center'>{order.guy}</td>
                                                        <td className='b_text_w'>
                                                            <Link to={"/home/usa/information"}>
                                                                <button className='b_edit me-5' onClick={() => handleEditClick(order.id)}><MdEditSquare /></button>
                                                            </Link>
                                                            <button className='b_edit b_delete' onClick={() => handleShowEditFamDel(order.no)}><RiDeleteBin5Fill /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                            {/* <div className="tab-pane fade" id="pills-local" role="tabpanel" aria-labelledby="pills-contact-tab4">
                                    <div className='text-white j-delivery-position-final   d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer", position: "absolute", top: "200px", right: "0" }}>
                                        <div className="j-right-left-arrow">
                                            <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                                <FaAngleLeft
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handlePrevPage('data3')}
                                                    disabled={currentPage.data3 === 1}
                                                />
                                            </div>
                                            <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                                <FaAngleRight
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handleNextPage('data3')}
                                                    disabled={currentPage.data3 === Math.ceil(data3.length / itemsPerPage)}
                                                />
                                            </span>
                                        </div>

                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{(currentPage.data3 - 1) * itemsPerPage + 1}-{Math.min(currentPage.data3 * itemsPerPage, data3.length)}</span> de <span className='text-white'>{data3.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='b_table1'>
                                        <table className='b_table bj-table mb-4'>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Pedido</th>
                                                    <th>Hora pedido </th>
                                                    <th></th>
                                                    <th>Cliente</th>
                                                    <th>Direccion</th>
                                                    <th>Local</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn'>
                                                {getCurrentItems('data3').map((order) => (
                                                    <tr key={order.id} className='b_row'>
                                                        <td className='b_idbtn ms-3 bj-delivery-text-2' style={{ borderRadius: "10px" }}>{order.id}</td>
                                                        <td>{order.order}</td>
                                                        <td className='b_text_w'>{order.time}</td>
                                                        <td className='b_text_w'>{order.customer}</td>
                                                        <td className='b_text_w'>{order.withdrawal_address}</td>
                                                        <td className='b_btn1 b_btn_w ms-3 mb-3 bj-delivery-text-2  d-flex align-items-center justify-content-center'>{order.guy}</td>
                                                        <td className='b_text_w'>
                                                            <Link to={"/home/usa/information"}>
                                                                <button className='b_edit me-5' onClick={() => handleEditClick(order.id)}><MdEditSquare /></button>
                                                            </Link>
                                                            <button className='b_edit b_delete' onClick={() => handleShowEditFamDel(order.no)}><RiDeleteBin5Fill /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                            {/* <div className="tab-pane fade" id="pills-paltform" role="tabpanel" aria-labelledby="pills-contact-tab5">
                                    <div className='text-white j-delivery-position-final  d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer", position: "absolute", top: "200px", right: "0" }}>
                                        <div className="j-right-left-arrow">
                                            <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                                <FaAngleLeft
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handlePrevPage('data4')}
                                                    disabled={currentPage.data4 === 1}
                                                />
                                            </div>
                                            <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                                <FaAngleRight
                                                    className='bj-right-icon-size-2'
                                                    onClick={() => handleNextPage('data4')}
                                                    disabled={currentPage.data4 === Math.ceil(data4.length / itemsPerPage)}
                                                />
                                            </span>
                                        </div>
                                        <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                            <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                                vista <span className='text-white'>{(currentPage.data4 - 1) * itemsPerPage + 1}-{Math.min(currentPage.data4 * itemsPerPage, data4.length)}</span> de <span className='text-white'>{data4.length}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className='b_table1'>
                                        <table className='b_table bj-table mb-4'>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Pedio</th>
                                                    <th>Hora pedio </th>
                                                    <th></th>
                                                    <th>Cliente</th>
                                                    <th>Direccion envio</th>
                                                    <th>Plataforma</th>
                                                    <th>Acciones</th>
                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn'>
                                                {getCurrentItems('data4').map((order) => (
                                                    <tr key={order.id} className='b_row'>
                                                        <td className='b_idbtn bj-delivery-text-2 ms-3' style={{ borderRadius: "10px" }}>{order.id}</td>
                                                        <td>{order.order}</td>
                                                        <td className='b_text_w'>{order.time}</td>
                                                        <td className='b_text_w'>{order.customer}</td>
                                                        <td className='b_text_w'>{order.shipping_add}</td>
                                                        <td className='b_btn1 b_btn_p ms-3 mb-3 d-flex align-items-center bj-delivery-text-2 justify-content-center' >{order.guy}</td>
                                                        <td className='b_text_w'>
                                                            <Link to={"/home/usa/information"}>
                                                                <button className='b_edit me-5' onClick={() => handleEditClick(order.id)}><MdEditSquare /></button>
                                                            </Link>
                                                            <button className='b_edit b_delete' onClick={() => handleShowEditFamDel(order.no)}><RiDeleteBin5Fill /></button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div> */}
                        </div>


                        {/* {/ edit family eliminate /} */}
                        <Modal
                            show={showEditFamDel}
                            onHide={handleCloseEditFamDel}
                            backdrop={true}
                            keyboard={false}
                            className="m_modal jay-modal"
                        >
                            <Modal.Header
                                closeButton
                                className="border-0"
                            ></Modal.Header>
                            <Modal.Body>
                                <div className="j-modal-trash text-center">
                                    <img
                                        src={require("../Image/trash-outline.png")}
                                        alt=""
                                    />
                                    <p className="mb-0 mt-3 h6 j-tbl-pop-1">eliminado</p>
                                    <p className="opacity-75 j-tbl-pop-2">
                                        eliminado correctamente
                                    </p>
                                </div>
                            </Modal.Body>
                        </Modal>


                    </div>
                </div>
            </div>
        </div>
        </div >
    )
}

export default Home_Usuarios;
