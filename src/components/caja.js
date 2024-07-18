import React, { useEffect, useState } from "react";
import Header from "./Header";
import inbox1 from "../Image/Inbox.png"
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import { Button, Modal } from "react-bootstrap";

const Caja = () => {

    const [selectedTitle, setSelectedTitle] = useState('');

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };

    // create box
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // create success box
    const [showCreSuc, setShowCreSuc] = useState(false);
    const handleCloseCreSuc = () => setShowCreSuc(false);
    const handleShowCreSuc = () => {
        setShowCreSuc(true);
        setTimeout(() => {
            setShowCreSuc(false);
        }, 2000);
    };

    const [data, setData] = useState([
        {
            iamge: inbox1,
            name: "Caja 1",
            User: 'Abierta',
            title: "Carlos Alberto",
            price: "$100"
        },
        {
            iamge: inbox1,
            name: "Caja 2",
            User: 'Abierta',
            title: "Monte de apertura",
            price: "$100"
        },
        {
            iamge: inbox1,
            name: "Caja 3",
            User: 'Abierta',
            title: "Monte de apertura",
            price: "$100"
        },
        {
            iamge: inbox1,
            name: "Caja 4",
            User: 'Cerrada',
            title: "Monte de apertura",
            price: "$100"
        },
    ])

    return (
        <>
            <div className="s_bg_dark">
                <Header />
                <div className="d-flex">
                    <div>
                        <Sidenav />
                    </div>
                    <div className="flex-grow-1 sidebar">
                        <div className="sjbg_gay d-flex align-items-center justify-content-between text-white px-3 py-2">
                            <h5 className="mb-0">Caja</h5>
                            <button className="sjSky px-2" onClick={handleShow}>
                                + Agregar caja
                            </button>

                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop={true}

                                keyboard={false}
                                className="m_modal"
                            >
                                <Modal.Header closeButton className="m_borbot">
                                    <Modal.Title className="j-tbl-text-10">Agregar caja</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="border-0">
                                    <div className="mb-3">
                                        <label htmlFor="cajaNumeroInput" className="form-label j-tbl-font-11">Nombre caja</label>
                                        <input
                                            type="text"
                                            className="form-control j-table_input"
                                            id="cajaNumeroInput"
                                            placeholder="Caja#"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cajeroAsignadoSelect" className="form-label j-tbl-font-11">Cajero asignado</label>
                                        <select
                                            className="form-select b_select border-0 py-2"
                                            style={{ borderRadius: "6px" }}
                                            aria-label="Selecciona un título"
                                            id="cajeroAsignadoSelect"
                                        >
                                            <option value="0">cajero asignado</option>
                                            <option value="1">Carlos Alberto</option>
                                            <option value="2">Monte de apertura</option>
                                            <option value="3">Monte de apertura</option>
                                            <option value="4">Monte de apertura</option>
                                        </select>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="border-0">
                                    <Button
                                        className="j-tbl-btn-font-1"
                                        variant="primary"
                                        onClick={() => {
                                            handleShowCreSuc();
                                            handleClose();
                                        }}
                                    >
                                        Agregar
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                            <Modal
                                show={showCreSuc}
                                onHide={handleCloseCreSuc}
                                backdrop={true}

                                keyboard={false}
                                className="m_modal"
                            >
                                <Modal.Header closeButton className="border-0"></Modal.Header>
                                <Modal.Body>
                                    <div className="text-center">
                                        <img src={require("../Image/check-circle.png")} alt="" />
                                        <p className="mb-0 mt-2 h6 j-tbl-pop-1">Sector</p>
                                        <p className="opacity-75 j-tbl-pop-2">Se ha creado exitosamente</p>
                                    </div>
                                </Modal.Body>
                            </Modal>
                        </div>
                        <div className="ssssj-card-media">
                            <div className="row">
                                {data.map((order, index) => (
                                    <div key={index} className="col-3 text-white mt-1">
                                        <div className="sjbg_gay px-3 pt-5 pb-3 rounded mt-2">
                                            <div className="d-flex pb-4 justify-content-center">
                                                <img src={order.iamge} className="sj_width" alt="caja image" />
                                            </div>
                                            <p className="mb-2 pt-3 j-caja-text-2">{order.name}</p>
                                            <button className={`sj_lightsky j-caja-text-3 ${order.User === 'Cerrada' ? 'j-bgcolor-caja' : 'sj_lightsky'}`}>{order.User}</button>
                                            <p className="mb-2 pt-2 j-caja-text-1">{order.title}</p>
                                            <input type="text" value={order.price} className="sjdark_gary j-caja-input j-caja-input-text-5" readOnly />
                                            <Link to={"/caja/informacira"}><button className="sjdarksky mt-2 j-caja-button j-caja-text-1">Ver detalles</button></Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
export default Caja;