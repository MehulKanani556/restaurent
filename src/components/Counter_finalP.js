import React, { useEffect, useState } from "react";
import Header from "./Header";
import box from "../Image/Ellipse 20.png";
import box4 from "../Image/box5.png";
import { FaCircleCheck, FaMinus, FaPlus } from "react-icons/fa6";
import { Accordion, Button, Modal } from "react-bootstrap";
import check from "../Image/Checkbox.png";
import check5 from "../Image/Checkbox6.png";
import Sidenav from "./Sidenav";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Recipt from "./Recipt";

const Counter_finalP = () => {

    const [itemToDelete, setItemToDelete] = useState(null);

    const [show11, setShow11] = useState(false);
    const handleClose11 = () => setShow11(false);
    const handleShow11 = () => setShow11(true);

    const [price, setPrice] = useState('');
    const handleprice = (event) => {
        let value = event.target.value;
        if (value.startsWith('$')) {
            value = value.substring(1);
        }
        setPrice(value);
    };

    const [showAllItems, setShowAllItems] = useState(false);
    const toggleShowAllItems = () => {
        setShowAllItems(!showAllItems);
    };

    const [countsoup, setCountsoup] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showCreSuc, setShowCreSuc] = useState(false);
    const [selectedRadio, setSelectedRadio] = useState("1");
    const [activeAccordionItem, setActiveAccordionItem] = useState("0");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showCreSubSuc, setShowCreSubSuc] = useState(false);
    const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
    const handleShowCreSubSuc = () => {
        setShowCreSubSuc(true);
        setTimeout(() => {
            handleCloseCreSubSuc();
        }, 2000);
    };

    const [isEditing, setIsEditing] = useState(Array(cartItems.length).fill(false));
    const handleNoteChange = (index, note) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems[index].note = note;
        setCartItems(updatedCartItems);
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Enter') {
            const updatedIsEditing = [...isEditing];
            updatedIsEditing[index] = false;
            setIsEditing(updatedIsEditing);
        }
    };

    const handleAddNoteClick = (index) => {
        const updatedIsEditing = [...isEditing];
        updatedIsEditing[index] = true;
        setIsEditing(updatedIsEditing);
        const updatedCartItems = [...cartItems];
        if (!updatedCartItems[index].note) {
            updatedCartItems[index].note = 'Nota: ';
            setCartItems(updatedCartItems);
        }
    };

    useEffect(() => {
        // Load cart items from localStorage
        const storedCartItems = localStorage.getItem("cartItems");
        const storedCountsoup = localStorage.getItem("countsoup");
        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }
        if (storedCountsoup) {
            setCountsoup(JSON.parse(storedCountsoup));
        }
    }, []); // Empty dependency array to run once on component mount

    useEffect(() => {
        // Save cart items to localStorage whenever cartItems or countsoup change
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("countsoup", JSON.stringify(countsoup));
    }, [cartItems, countsoup]);

    const handleAccordionClick = (value) => {
        setSelectedRadio(value);
    };

    const getTotalCost = () => {
        return cartItems.reduce((total, item, index) => total + parseInt(item.price) * countsoup[index], 0);
    };

    const totalCost = getTotalCost();
    const discount = 1.0;
    const finalTotal = totalCost - discount;


    const initialCustomerData = {
        id: "02134656",
        name: "$10",
        email: "$5",
    };

    const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
    const [customerData, setCustomerData] = useState(initialCustomerData);

    const handleCheckboxChange = (value) => {
        if (selectedCheckboxes.includes(value)) {
            setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
            setCustomerData(initialCustomerData);
        } else {
            setSelectedCheckboxes((prev) => [...prev, value]);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (showCreSuc) {
            setShowLoader(true);
            const timer = setTimeout(() => {
                setShowLoader(false);
                setShowSuccess(true);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [showCreSuc]);

    useEffect(() => {
        let successTimer;
        if (showSuccess) {
            successTimer = setTimeout(() => {
                setShowSuccess(false);
            }, 2000);
        }

        return () => clearTimeout(successTimer);
    }, [showSuccess]);

    const handleCloseSuccess = () => {
        setShowSuccess(false);

    };

    const handleCloseCreSuc = () => {
        setShowCreSuc(false);
    };


    const handleAccordionSelect = (eventKey) => {
        setActiveAccordionItem(eventKey);
        setSelectedRadio("0");
    };


    return (
        <>
            <Header />
            <div className="s_bg_dark">
                <div className="j-flex">
                    <div>
                        <Sidenav />
                    </div>
                    <div className="flex-grow-1 sidebar j-position-sticky text-white">
                        <div className="j-counter-header">
                            <h2 className="text-white mb-3 sjfs-18">Mostrador</h2>
                            <div className="j-menu-bg-color ">
                                <div className="j-tracker-mar d-flex justify-content-between ">
                                    <div className="line1  flex-grow-1">
                                        <Link className="text-decoration-none px-2 sj_text_dark">
                                            <FaCircleCheck className="mx-1" />
                                            <span>Artículos</span>
                                        </Link>
                                    </div>
                                    <div className="  flex-grow-1 text-center">

                                        <Link
                                            to={"/counter/mostrador"}
                                            className="text-decoration-none px-2 sj_text_dark"
                                        >
                                            <FaCircleCheck className="mx-1" />
                                            <span>Datos</span>
                                        </Link>
                                    </div>
                                    <div className="line2  flex-grow-1 text-end">

                                        <Link
                                            className="text-decoration-none px-2 j-counter-path-color"
                                        >
                                            <FaCircleCheck className="mx-1" />
                                            <span>Pago</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" mt-2 mx-2 sj_hwidth">
                            <div className="bg_gay p-4">
                                <div className="j-final-stage">
                                    <h5 className="mb-2 sjfs-18">Tipos de pago</h5>
                                    <button className="sj_bg_sky" onClick={handleShow}><FaPlus className="j-icon-font-1" />
                                        Agregar propina</button>
                                </div>

                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop={true}
                                    keyboard={false}
                                    className="m_modal jay-modal"
                                >
                                    <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                                        <Modal.Title className="j-tbl-text-10">Agregar propina</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="border-0 pb-0 ">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleFormControlInput1"
                                                className="form-label j-tbl-font-11"
                                            >
                                                Cantidad
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control j-table_input"
                                                id="exampleFormControlInput1"
                                                value={`$${price}`}
                                                onChange={handleprice}
                                            />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="border-0 pt-0">
                                        <Button
                                            className="j-tbl-btn-font-1 b_btn_pop"
                                            variant="primary"
                                            onClick={() => {
                                                handleShowCreSubSuc();
                                                handleClose();
                                            }}
                                        >
                                            Aceptar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>


                                <Modal
                                    show={showCreSubSuc}
                                    onHide={handleCloseCreSubSuc}
                                    backdrop={true}
                                    keyboard={false}
                                    className="m_modal jay-modal"
                                >
                                    <Modal.Header closeButton className="border-0"></Modal.Header>
                                    <Modal.Body>
                                        <div className="text-center">
                                            <img src={require("../Image/check-circle.png")} alt="" />
                                            <p className="mb-0 mt-2 h6">Propina agregada</p>
                                            <p className="opacity-75">Su propina ha sido agregada exitosamente</p>
                                        </div>
                                    </Modal.Body>
                                </Modal>

                                <p className="j-final-p sjfs-14 pb-3">Puedes seleccionar uno o mas</p>

                                <Accordion className="sj_accordion" alwaysOpen >
                                    <Accordion.Item eventKey="0" className="mb-2">
                                        <Accordion.Header>
                                            <div
                                                onClick={() => handleCheckboxChange("1")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes("1") ? "active" : ""}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="receiptType"
                                                    value="1"
                                                    checked={selectedCheckboxes.includes("1")}
                                                    onChange={() => handleCheckboxChange("1")}
                                                    className="me-2 j-change-checkbox"
                                                />
                                                <p className="d-inline px-3">Efectivo</p>
                                            </div>
                                        </Accordion.Header>
                                        {selectedCheckboxes.includes("1") && (
                                            <Accordion.Body>
                                                <div className="sj_gay_border px-3 py-4 mt-2">
                                                    <form className="d-flex">
                                                        <div className="me-2 flex-grow-1">
                                                            <label className="mb-2">Cantidad</label>
                                                            <br />
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={customerData.name}
                                                                onChange={handleChange}
                                                                className="input_bg_dark w-full px-4 py-2 text-white sj_width_mobil"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <label className="mb-2">Vuelto</label>
                                                            <br />
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={customerData.email}
                                                                onChange={handleChange}
                                                                className="input_bg_dark px-4 py-2 text-white sj_width_mobil"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </Accordion.Body>
                                        )}
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className="mb-2">
                                        <Accordion.Header>
                                            <div
                                                onClick={() => handleCheckboxChange("2")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes("2") ? "active" : ""}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="receiptType"
                                                    value="2"
                                                    checked={selectedCheckboxes.includes("2")}
                                                    onChange={() => handleCheckboxChange("2")}
                                                    className="me-2 j-change-checkbox"
                                                />
                                                <p className="d-inline px-3">Tarjeta de debito</p>
                                            </div>
                                        </Accordion.Header>
                                        {selectedCheckboxes.includes("2") && (
                                            <Accordion.Body>
                                                <div className="sj_gay_border px-3 py-4 mt-2">
                                                    <form>
                                                        <label className="mb-2 sjfs-16">Cantidad</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={customerData.name}
                                                            onChange={handleChange}
                                                            className="sj_bg_dark sj_width_input px-4 py-2 text-white"
                                                        />
                                                    </form>
                                                </div>
                                            </Accordion.Body>
                                        )}
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className="mb-2">
                                        <Accordion.Header>
                                            <div
                                                onClick={() => handleCheckboxChange("3")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes("3") ? "active" : ""}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="receiptType"
                                                    value="3"
                                                    checked={selectedCheckboxes.includes("3")}
                                                    onChange={() => handleCheckboxChange("3")}
                                                    className="me-2 j-change-checkbox"
                                                />
                                                <p className="d-inline px-3">Tarjeta de credito</p>
                                            </div>
                                        </Accordion.Header>
                                        {selectedCheckboxes.includes("3") && (
                                            <Accordion.Body>
                                                <div className="sj_gay_border px-3 py-4 mt-2">
                                                    <form className="d-flex">
                                                        <div className="me-2 flex-grow-1">
                                                            <label className="mb-2">Cantidad</label>
                                                            <br />
                                                            <input
                                                                type="text"
                                                                id="name"
                                                                name="name"
                                                                value={customerData.name}
                                                                onChange={handleChange}
                                                                className="input_bg_dark w-full px-4 py-2 text-white sj_width_mobil"
                                                            />
                                                        </div>
                                                        <div className="flex-grow-1">
                                                            <label className="mb-2">Vuelto</label>
                                                            <br />
                                                            <input
                                                                type="email"
                                                                id="email"
                                                                name="email"
                                                                value={customerData.email}
                                                                onChange={handleChange}
                                                                className="input_bg_dark px-4 py-2 text-white sj_width_mobil"
                                                            />
                                                        </div>
                                                    </form>
                                                </div>
                                            </Accordion.Body>
                                        )}
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="3" className="mb-2">
                                        <Accordion.Header>
                                            <div
                                                onClick={() => handleCheckboxChange("4")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes("4") ? "active" : ""}`}
                                            >
                                                <input
                                                    type="checkbox"
                                                    name="receiptType"
                                                    value="4"
                                                    checked={selectedCheckboxes.includes("4")}
                                                    onChange={() => handleCheckboxChange("4")}
                                                    className="me-2 j-change-checkbox"
                                                />
                                                <p className="d-inline px-3">Transferencia</p>
                                            </div>
                                        </Accordion.Header>
                                        {selectedCheckboxes.includes("4") && (
                                            <Accordion.Body>
                                                <div className="sj_gay_border px-3 py-4 mt-2">
                                                    <form>
                                                        <label className="mb-2 sjfs-16">Cantidad</label>
                                                        <br />
                                                        <input
                                                            type="text"
                                                            id="name"
                                                            name="name"
                                                            value={customerData.name}
                                                            onChange={handleChange}
                                                            className="sj_bg_dark sj_width_input px-4 py-2 text-white"
                                                        />
                                                    </form>
                                                </div>
                                            </Accordion.Body>
                                        )}
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>

                    </div>
                    <div className="j-counter-price bg_gay position-sticky" style={{ top: '77px' }}>
                        <div className="position-fixed">
                            <h2 className="text-white j-kds-body-text-1000">Resumen</h2>
                            <div className="j-counter-price-data">
                                <h3 className="text-white j-kds-body-text-1000">Datos</h3>
                                <div className="j-orders-inputs">
                                    <div className="j-orders-code">
                                        <label className="j-label-name text-white mb-2 j-tbl-font-6 ">
                                            Código pedido
                                        </label>
                                        <input className="j-input-name" type="text" placeholder="01234" />
                                    </div>
                                    <div className="j-orders-type me-2">
                                        <label className="j-label-name  text-white mb-2 j-tbl-font-6 ">
                                            Tipo pedido
                                        </label>
                                        <select className="form-select j-input-name-2">
                                            <option value="0">Seleccionar</option>
                                            <option value="1">Sin seleccionar</option>
                                            <option value="2">Delivery</option>
                                            <option value="3">Local</option>
                                            <option value="3">Retirar</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="j-counter-order">
                                    <h3 className="text-white j-tbl-font-5">Pedido </h3>
                                    <div className={`j-counter-order-data ${cartItems.length === 0 ? 'empty' : 'filled'}`}>
                                        {cartItems.slice(0, showAllItems ? cartItems.length : 3).map((item, index) => (
                                            <div className="j-counter-order-border-fast" key={index}>
                                                <div className="j-counter-order-img">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <img src={item.image} alt="" />
                                                        <h5 className="text-white j-tbl-font-5">{item.name}</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="j-counter-mix">
                                                            <h3> {countsoup[index]}</h3>
                                                        </div>
                                                        <h4 className="text-white fw-semibold">
                                                            ${parseInt(item.price) * countsoup[index]}
                                                        </h4>
                                                    </div>
                                                </div>
                                                <div key={index} className="text-white j-order-count-why">
                                                    {isEditing[index] ? (
                                                        <div>
                                                            <span className="j-nota-blue">Nota: </span>
                                                            <input
                                                                className="j-note-input"
                                                                type="text"
                                                                value={item.note ? item.note.substring(6) : ''}
                                                                onChange={(e) => handleNoteChange(index, `Nota: ${e.target.value}`)}
                                                                onKeyDown={(e) => handleKeyDown(index, e)}
                                                            />
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {item.note ? (
                                                                <p className="j-nota-blue">{item.note}</p>
                                                            ) : (
                                                                <button className="j-note-final-button" onClick={() => handleAddNoteClick(index)}>
                                                                    + Agregar nota
                                                                </button>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                        {cartItems.length > 3 && (
                                            <Link onClick={toggleShowAllItems} className="sjfs-14">
                                                {showAllItems ? 'Ver menos' : 'Ver más'}
                                            </Link>
                                        )}
                                    </div>
                                    <div className="j-counter-total">
                                        <h5 className="text-white j-tbl-text-15">Costo total</h5>
                                        <div className="j-total-discount d-flex justify-content-between">
                                            <p className="j-counter-text-2">Artículos</p>
                                            <span className="text-white">${totalCost.toFixed(2)}</span>
                                        </div>
                                        <div className="j-border-bottom-counter">
                                            <div className="j-total-discount d-flex justify-content-between">
                                                <p className="j-counter-text-2">Descuentos</p>
                                                <span className="text-white">${discount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="j-total-discount my-2 d-flex justify-content-between">
                                            <p className="text-white bj-delivery-text-153">Total</p>
                                            <span className="text-white bj-delivery-text-153">
                                                ${finalTotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <div class="btn w-100 j-btn-primary text-white">
                                            <div
                                                className="text-white text-decoration-none btn-primary m-articles-text-2"

                                                onClick={handleShow11}
                                            >
                                                Continuar
                                            </div>
                                        </div>
                                        <Modal
                                            show={show11}
                                            onHide={handleClose11}
                                            backdrop="static"
                                            keyboard={false}
                                            className="m_modal j_topmodal"
                                        >
                                            <Modal.Header closeButton className="j-caja-border-bottom p-0 m-3 mb-0 pb-3">
                                                <Modal.Title
                                                    className="modal-title j-caja-pop-up-text-1"
                                                    id="staticBackdropLabel"
                                                >
                                                    Comprobante de venta
                                                </Modal.Title>
                                            </Modal.Header>
                                            <Modal.Body>
                                                <Recipt />
                                            </Modal.Body>
                                            <Modal.Footer className="sjmodenone">
                                                <Button
                                                    className="btn sjbtnskylight border-0 text-white j-caja-text-1"
                                                    onClick={() => {
                                                        handleClose11();
                                                    }}
                                                >
                                                    <svg className="me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor" viewBox="0 0 24 24">
                                                        <path fillRule="evenodd" d="M8 3a2 2 0 0 0-2 2v3h12V5a2 2 0 0 0-2-2H8Zm-3 7a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h1v-4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v4h1a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H5Zm4 11a1 1 0 0 1-1-1v-4h8v4a1 1 0 0 1-1 1H9Z" clipRule="evenodd" />
                                                    </svg>
                                                    Imprimir
                                                </Button>
                                            </Modal.Footer>
                                        </Modal>
                                        <Modal
                                            show={showLoader}
                                            backdrop={true}
                                            keyboard={false}
                                            className="m_modal jay-modal"
                                        >
                                            <Modal.Header closeButton={false} className="border-0" />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <div className="j-loader" aria-label="loading"></div>
                                                    <p className="opacity-75 mt-3">Procesando pago</p>
                                                </div>
                                            </Modal.Body>
                                        </Modal>

                                        <Modal
                                            show={showSuccess}
                                            onHide={handleCloseSuccess}
                                            backdrop={true}
                                            keyboard={false}
                                            className="m_modal jay-modal"
                                        >
                                            <Modal.Header closeButton className="border-0" />
                                            <Modal.Body>
                                                <div className="text-center">
                                                    <img
                                                        src={require("../Image/check-circle.png")}
                                                        alt=""
                                                    />
                                                    <p className="opacity-75 mt-3">
                                                        Venta realizada exitosamente
                                                    </p>
                                                </div>
                                            </Modal.Body>
                                        </Modal>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >

        </>
    )
}

export default Counter_finalP
