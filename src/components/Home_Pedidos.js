import React, { useState } from 'react';
import Sidenav from './Sidenav';
import Header from './Header';
import { Button, Dropdown } from 'react-bootstrap';
import { FaAngleLeft, FaAngleRight, FaFilter } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';

const Home_Pedidos = () => {
    const [data, setData] = useState([
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Recibido',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Recibido',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Preparado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Entregado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Finalizado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Preparado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Recibido',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Finalizado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Entregado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
        {
            id: '01234',
            sector: '4 ',
            mesa: '1',
            usuario: 'Caja 1',
            estado: 'Entregado',
            fecha: '17/03/2024',
            hora: '08:00 am',
            tipo: 'Delivery',
            ver: "Ver detalles"
        },
    ]);

    const [selectedFilters, setSelectedFilters] = useState({
        Todo: false,
        Recibido: false,
        Preparado: false,
        Entregado: false,
        Finalizado: false,
    });

    // new file
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 20;
    // ======================
    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: checked,
        }));
    };

    const clearFilter = (name) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [name]: false,
        }));
    };

    const filteredItems = data.filter((item) => {
        if (selectedFilters.Todo) {
            return true;
        } else {
            const activeFilters = Object.keys(selectedFilters).filter(
                (filter) => selectedFilters[filter]
            );

            if (activeFilters.length === 0) {
                return true;
            }
            return (
                selectedFilters[item.estado]
            );
        }
    });
    // =======new
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };
    // =======new


    return (
        <div>
            <div className='b_bg_color'>
                <Header />
                <div className='d-flex'>
                    <div>
                        <Sidenav />
                    </div>
                    <div className='flex-grow-1 overflow-hidden sidebar b_bg_table '>
                        <div style={{ padding: "20px" }}>
                            <div className="j-usuarios-h2">
                                <h2 className='text-white'>Pedidos</h2>
                            </div>
                            <div className="d-flex justify-content-between">
                                <div className="d-flex align-items-center">
                                    <div className='me-2 '>
                                        <div className="m_group">
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="m_icon">
                                                <g>
                                                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                                </g>
                                            </svg>
                                            <input className="m_input ps-5" type="search" placeholder="Buscar" />
                                        </div>
                                    </div>
                                    <Dropdown data-bs-theme="dark" className="m_drop">
                                        <Dropdown.Toggle
                                            id="dropdown-button-dark-example1"
                                            variant="outline-primary"
                                            style={{ fontSize: "12px" }}
                                            className="btn btn-outline-primary b_togllle b_border_out b_ttt"
                                        >
                                            <FaFilter /> &nbsp; <span className="b_ttt text-white">Filtro</span>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="m14  m_filter">
                                            <div className="px-3 py-1 d-flex gap-2 align-items-center fw-500">
                                                <input
                                                    className='j-change-checkbox'
                                                    type="checkbox"
                                                    name="Todo"
                                                    checked={selectedFilters.Todo}
                                                    onChange={handleCheckboxChange}
                                                />{" "}
                                                <span className="fw-500">Todo</span>
                                            </div>
                                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                                <input
                                                    className='j-change-checkbox'
                                                    type="checkbox"
                                                    name="Recibido"
                                                    checked={selectedFilters.Recibido}
                                                    onChange={handleCheckboxChange}
                                                />{" "}
                                                <span>Recibido</span>
                                            </div>
                                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                                <input
                                                    className='j-change-checkbox'
                                                    type="checkbox"
                                                    name="Preparado"
                                                    checked={selectedFilters.Preparado}
                                                    onChange={handleCheckboxChange}
                                                />{" "}
                                                <span>Preparado</span>
                                            </div>
                                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                                <input
                                                    className='j-change-checkbox'
                                                    type="checkbox"
                                                    name="Entregado"
                                                    checked={selectedFilters.Entregado}
                                                    onChange={handleCheckboxChange}
                                                />{" "}
                                                <span>Entregado</span>
                                            </div>
                                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                                <input
                                                    className='j-change-checkbox'
                                                    type="checkbox"
                                                    name="Finalizado"
                                                    checked={selectedFilters.Finalizado}
                                                    onChange={handleCheckboxChange}
                                                />{" "}
                                                <span>Finalizado</span>
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between align-items-center">
                                <div className="p-3 ps-0 m_bgblack d-flex align-items-center">
                                    <span className="text-white m14">Filtro:</span>
                                    {Object.keys(selectedFilters).map(
                                        (filter) =>
                                            selectedFilters[filter] && (
                                                <div
                                                    key={filter}
                                                    className="d-inline-block ms-2 d-flex align-items-center  m12"
                                                >
                                                    <Button
                                                        variant="light"
                                                        size="sm"
                                                        onClick={() => clearFilter(filter)}
                                                        className="rounded-3 m12 "
                                                        style={{ fontWeight: "500" }}
                                                    >
                                                        {filter} &nbsp;{" "}
                                                        <span className="m16">
                                                            <MdClose />
                                                        </span>
                                                    </Button>
                                                </div>
                                            )
                                    )}
                                </div>

                                {/* ======new */}
                                <div className='text-white  d-flex  b_arrow' style={{ alignItems: "baseline", cursor: "pointer" }}>
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
                                            vista <span className='text-white'>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)}</span> de <span className='text-white'>{data.length}</span>
                                        </p>
                                    </div>
                                </div>
                                {/* ======new */}

                            </div>
                        </div>

                        <div className='b_table1'>
                            <table className='b_table mb-4 p-0'>
                                <thead>
                                    <tr className='b_thcolor'>
                                        <th>Pedido</th>
                                        <th className='text-nowrap'>Sector </th>
                                        <th>Mesa</th>
                                        <th>Usuario</th>
                                        <th>Estado</th>
                                        <th>Fecha</th>
                                        <th>Hora</th>
                                        <th>Tipo</th>
                                        <th>Ver</th>
                                        <th>Imprimir</th>
                                    </tr>
                                </thead>
                                <tbody className='text-white b_btnn '>
                                    {/* new========== */}
                                    {currentItems.map((order) => (
                                        <tr key={order.id} className='b_row'>
                                            <Link to={"/home_Pedidos/paymet"}>
                                                <td className='b_idbtn bj-delivery-text-2 ms-3' style={{ borderRadius: "10px" }}>{order.id}</td>
                                            </Link>
                                            <td>{order.sector}</td>
                                            <td className='b_text_w  bj-delivery-text-2'>{order.mesa}</td>
                                            <td className='b_text_w  bj-delivery-text-2'>{order.usuario}</td>
                                            <td className={`bj-delivery-text-2  b_btn1 mb-3 ms-3  p-0 text-nowrap d-flex  align-items-center justify-content-center ${order.estado === 'Recibido' ? 'b_indigo' : order.estado === 'Preparado' ? 'b_ora ' : order.estado === 'Entregado' ? 'b_blue' : order.estado === 'Finalizado' ? 'b_green' : order.estado === 'Retirar' ? 'b_indigo' : order.estado === 'Local' ? 'b_purple' : 'text-danger'}`}>{order.estado}</td>
                                            <td className=' bj-delivery-text-2'>{order.fecha}</td>
                                            <td className=' bj-delivery-text-2'>{order.hora}</td>
                                            <td className=' bj-delivery-text-2'> {order.tipo}</td>
                                            <Link to={"/home_Pedidos/paymet"}>
                                                <td className='b_text_w '>
                                                    <button className='b_edit bj-delivery-text-2'>{order.ver}</button>
                                                </td>
                                            </Link>
                                            <td>
                                                <button className={`b_edit  ${order.estado === 'Entregado' ? 'b_Enew' : 'b_Eold'}`} >
                                                    <svg className="text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1v-4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1H9Z" clipRule="evenodd" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home_Pedidos;
