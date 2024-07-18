import React, { useState } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import { FaPrint } from 'react-icons/fa';
import { Tab, Tabs } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import Home_detail_no2 from './Home_detail_no2';
import Home_detail_no from './Home_detail_no';

function Home_detail() {

    const [activeTab, setActiveTab] = useState("home");

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

    const [data, setData] = useState([
        {
            id: '01234',
            state1: 'Entregado',
            credit_note: 'Crear nota de credito',
            action1: 'Anular venta',
        },
        {
            id: '01234',
            state1: 'Entregado',
            credit_note: 'Crear nota de credito',
            action1: 'Anular venta',
        },
        {
            id: '01234',
            state1: 'Entregado',
            credit_note: 'Crear nota de credito',
            action1: 'Anular venta',
        },
        {
            id: '01234',
            state1: 'Entregado',
            credit_note: 'Crear nota de credito',
            action1: 'Anular venta',
        },

    ]);
    const [data1, setData1] = useState([
        {
            id: '01234',
            state1: 'Devolucion pendiente',
            credit_note: 'Ver detalles',
            action1: 'Anular credito',
        },
        {
            id: '01234',
            state1: 'Devolucion completada',
            credit_note: 'Ver detalles',
            action1: 'Anular credito',
        },
        {
            id: '01234',
            state1: 'Devolucion completada',
            credit_note: 'Ver detalles',
            action1: 'Anular credito',
        },
        {
            id: '01234',
            state1: 'Devolucion completada',
            credit_note: 'Ver detalles',
            action1: 'Anular credito',
        },

    ]);

    const handleEditClick = (id) => {
        // Implement edit functionality here
        console.log('Edit button clicked for order:', id);
    };

    const handleDeleteClick = (id) => {
        // Implement delete functionality here
        const newData = data.filter((order) => order.id !== id);
        setData(newData);
        console.log('Delete button clicked for order:', id);
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


    return (
        <div className='b_bg_color'>
            <Header />

            <div className='d-flex '>
                <div>
                    <Sidenav />
                </div>
                <div className='flex-grow-1 sidebar overflow-y-scroll ' style={{ backgroundColor: "#1F2A37" }}>
                    <Link to={"/home/client"} className='d-flex text-decoration-none bj-delivery-text-3 ' style={{ backgroundColor: "#1F2A37" }} >
                        <div className='btn bj-btn-outline-primary text-nowrap py-2 d-flex mt-4 ms-4' style={{ borderRadius: "10px", }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
                    </Link>
                    <div className=' mt-4 b_borderrr pb-3 ' >
                        <h4 className='text-white ms-4 bj-delivery-text-1'>Damian Gonzales</h4>
                    </div>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={(k) => setActiveTab(k)}
                        id="fill-tab-example"
                        className="mb-3 m_tabs m_bgblack px-2 border-0 p-4"
                        fill>
                        <Tab
                            eventKey="home"
                            title="Historial"
                            className=" text-white m_bgblack rounded"
                        >
                            <div className='b_table1'>
                                <table className='b_table '>
                                    <thead>
                                        <tr className='b_thcolor'>
                                            <th>Pedido</th>
                                            <th>Estado </th>
                                            <th>Nota de credito</th>
                                            <th>Accion</th>
                                            <th>Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-white b_btnn '>
                                        {data.map((order) => (
                                            <tr key={order.id} className='b_row'>
                                                <td ><div className='b_idbtn bj-delivery-text-2' style={{ borderRadius: "10px" }}>{order.id}</div></td>
                                                <td ><div className='b_idbtn bj-delivery-text-2 b_idbtn_s m-0' style={{ borderRadius: "10px" }}>{order.state1}</div></td>
                                                <Link to={"/home/client/crear"}>
                                                    <td> <div className='b_text_w bj-delivery-text-2 b_idbtn b_idbtn_c m-0' style={{ borderRadius: "10px" }}>{order.credit_note}</div> </td>
                                                </Link>
                                                <td ><div className='b_text_w bj-delivery-text-2 b_idbtn b_idbtn_a  ' style={{ borderRadius: "10px" }}> {order.action1}</div></td>
                                                <td>
                                                    <button className='b_edit sj-button-xise' style={{ backgroundColor: "#0694A2" }}>
                                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1v-4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1H9Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </Tab>
                        <Tab eventKey="profile" title="Información" style={{ backgroundColor: "#1F2A37" }} className='py-2 mt-2'>
                            <div className='text-white ms-4 pt-2'>
                                <h4 className='j-kds-body-text-1000'>informacion cliente</h4>
                            </div>
                            <div>
                                <form action="">
                                    <div className='d-flex gap-5 mx-4 mb-4 mt-4 b_inputt flex-grow-1' >
                                        <div className=' b_search text-white a_input_size'>
                                            <label htmlFor="inputPassword2" className="">Nombre</label>
                                            <input type="text" className="form-control bg-gray border-0 bj-slimilar-class-why mt-2" id="inputPassword2" placeholder="4" style={{ backgroundColor: '#374151', borderRadius: "10px" }} />
                                        </div>
                                        <div className=' b_search text-white a_input_size'>
                                            <label htmlFor="inputPassword2" className="">DNI</label>
                                            <input type="text" className="form-control bg-gray border-0 mt-2 bj-slimilar-class-why " id="inputPassword2" placeholder="0123456789" style={{ backgroundColor: '#374151', borderRadius: "10px" }} />
                                        </div>

                                    </div>
                                </form>
                            </div>
                            <div>
                                <div className='d-flex gap-5 mx-4 b_inputt mb-5 '>
                                    <div className=' b_search text-white a_input_size' >
                                        <label htmlFor="inputPassword2" className="">Correo</label>
                                        <input type="text" className="form-control bg-gray border-0 bj-slimilar-class-why mt-2" id="inputPassword2" placeholder="ejemplo@gmail.com" style={{ backgroundColor: '#374151', borderRadius: "10px" }} />
                                    </div>
                                    <div className=' b_search text-white a_input_size'>
                                        <label htmlFor="inputPassword2" className=" ">Pedidos</label>
                                        <input type="text" className="form-control bg-gray border-0 bj-slimilar-class-why mt-2" id="inputPassword2" placeholder="4" style={{ backgroundColor: '#374151', borderRadius: "10px" }} />
                                    </div>
                                </div>
                            </div>
                        </Tab>
                        {/* <Tab eventKey="longer-tab" title="Nota de credito">

                            <div className='b_table1'>
                                <table className='b_table '>
                                    <thead>
                                        <tr className='b_thcolor'>
                                            <th>Order</th>
                                            <th>State </th>
                                            <th>Credit Note</th>
                                            <th>Action</th>
                                            <th>Print</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-white b_btnn '>
                                        {data.map((order) => (
                                            <tr key={order.id} className='b_row'>
                                                <td className='b_idbtn'>{order.id}</td>
                                                <td ><div className='b_idbtn b_text_w b_idbtn_s m-0'>{order.state1}</div></td>
                                                <td> <div className='b_text_w b_idbtn b_idbtn_c m-0'>{order.credit_note}</div> </td>
                                                <td className='b_text_w b_idbtn b_idbtn_a mb-3 '>
                                                    {order.action1}
                                                </td>
                                                <td>
                                                    <button className='b_edit ' style={{ backgroundColor: "#0694A2" }}><FaPrint /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </Tab> */}
                        <Tab
                            eventKey="longer-tab"
                            title="Nota de credito"
                            className=" text-white m_bgblack rounded"
                        >
                            <div className='b_table1'>
                                <table className='b_table '>
                                    <thead>
                                        <tr className='b_thcolor'>
                                            <th>Pedido</th>
                                            <th>Estado </th>
                                            <th>Nota de credito</th>
                                            <th>Accion</th>
                                            <th>Imprimir</th>
                                        </tr>
                                    </thead>
                                    <tbody className='text-white b_btnn '>
                                        {data1.map((order) => (
                                            <tr key={order.id} className='b_row'>
                                                <td ><div className='b_idbtn bj-delivery-text-2' style={{ borderRadius: "10px" }}>{order.id}</div></td>
                                                <td ><div className={`b_idbtn bj-delivery-text-2 b_idbtn_s m-0 ${order.state1 === 'Devolucion pendiente' ? 'b_ora' : order.state1 === 'Devolucion completada' ? 'b_greena' : 'text-danger'}`} style={{ borderRadius: "10px" }}>{order.state1}</div></td>
                                                <Link to={order.state1 === "Devolucion pendiente" ? "/home/client/detail_no" : "/home/client/detail_no2"}>
                                                    <td>
                                                        <div className='b_text_w bj-delivery-text-2 b_idbtn b_idbtn_c m-0' style={{ borderRadius: "10px" }}>
                                                            {order.credit_note}
                                                        </div>
                                                    </td>
                                                </Link>
                                                <td>
                                                    <div className='b_text_w bj-delivery-text-2 b_idbtn b_idbtn_a  ' style={{ borderRadius: "10px" }}> {order.action1}</div>
                                                </td>
                                                <td>
                                                    <button className='b_edit sj-button-xise' style={{ backgroundColor: "#0694A2" }}>
                                                        <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fill-rule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1v-4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1H9Z" clip-rule="evenodd" />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </Tab>
                    </Tabs>
                </div>
            </div>



        </div>
    )
}

export default Home_detail;;
