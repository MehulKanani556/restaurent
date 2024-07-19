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
import { HiOutlineArrowLeft } from "react-icons/hi";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import pic2 from "../img/Image(1).jpg"

const TablePago = () => {
    const orderitem = [
        {
            image: img2,
            name: "Pollo frito crujiente",
            quantity: "3",
            price: "10.00",
            code: "01234",
            note: '',
        },
        {
            image: pic2,
            name: 'Guitig',
            quantity: '3',
            price: '1.00',
            code: "01234",
            note: '',
        },
        {
            image: img3,
            name: "Gelatina fresa",
            quantity: "3",
            price: "1.00",
            code: "01234",
            note: '',
        },
    ]
    const [cartItems, setCartItems] = useState(orderitem);
    const [countsoup, setCountsoup] = useState(orderitem.map(item => parseInt(item.quantity)));


    const [showAllItems, setShowAllItems] = useState(false);
    const toggleShowAllItems = () => {
        setShowAllItems(!showAllItems);
    };


    const increment = (index) => {
        setCountsoup(prevCounts =>
            prevCounts.map((count, i) => (i === index ? count + 1 : count))
        );
    };

    const decrement = (index) => {
        setCountsoup(prevCounts =>
            prevCounts.map((count, i) =>
                i === index ? (count > 1 ? count - 1 : 1) : count
            )
        );
    };

    const handleDeleteItem = (index) => {
        const updatedCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(updatedCartItems);
        const updatedCountsoup = countsoup.filter((_, i) => i !== index);
        setCountsoup(updatedCountsoup);
    };

    const getTotalCost = () => {
        return cartItems.reduce(
            (total, item, index) => total + parseInt(item.price) * countsoup[index],
            0
        );
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





    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // create family success
    const [showCreSuc, setShowCreSuc] = useState(false);
    const handleCloseCreSuc = () => setShowCreSuc(false);
    const handleShowCreSuc = () => setShowCreSuc(true);
    const [showLoader, setShowLoader] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [deletedItemIndex, setDeletedItemIndex] = useState(null);

    const addItemToCart = (item) => {
        setCartItems([...cartItems, item]);
    };

    const removeItemFromCart = (index) => {
        const newCartItems = [...cartItems];
        newCartItems.splice(index, 1);
        setCartItems(newCartItems);
    };

    const totalCost = getTotalCost();
    const discount = 1.0;
    const propina = 5.0;
    const finalTotal = totalCost - discount;

    const [customerData, setCustomerData] = useState({
        id: "02134656",
        name: "$10",
        email: "$5",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerData((prevState) => ({
            ...prevState,
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



    return (
        <div className="s_bg_dark">
            <Header />
            <div className="j-flex">
                <div>
                    <Sidenav />
                </div>
                <div className="flex-grow-1 sidebar j-position-sticky text-white">
                    <div className="j-counter-header">
                        <div className="j-table-datos-btn">
                            <button className="bj-btn-outline-primary btn j-tbl-btn-font-1 ">
                                <HiOutlineArrowLeft className='j-table-datos-icon' />Regresar</button>
                        </div>
                        <h2 className="text-white j-table-font-1 mb-0">Mesa 2</h2>
                        <div className="j-menu-bg-color">
                            <div className="j-table-cart-2 d-flex justify-content-between ">
                                <div className="line1  flex-grow-1">

                                    <Link className="text-decoration-none px-2 sj_text_medium">
                                        <FaCircleCheck className="mx-1" />
                                        <span>Productos</span>
                                    </Link>
                                </div>
                                <div className="  flex-grow-1 text-center">

                                    <Link to={"/table/datos"}
                                        className="text-decoration-none px-2  sj_text_medium"
                                    >
                                        <FaCircleCheck className="mx-1" />
                                        <span>Datos</span>
                                    </Link>
                                </div>
                                <div className="line2  flex-grow-1 text-end">

                                    <Link

                                        className="text-decoration-none px-2 sj_text_blue"
                                    >
                                        <FaCircleCheck className="mx-1" />
                                        <span>Pago</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=" mt-4 mx-4 sj_hwidth">
                        <div className="bg_gay p-4">
                            <div className="j-final-stage">
                                <h5 className="mb-2">Tipos de pago</h5>
                                <div className="d-flex align-items-center">
                                    <button
                                        data-bs-theme="dark"
                                        className="j_drop btn j-btn-primary j-tbl-font-3 mb-3"
                                        onClick={handleShow}
                                    >
                                        <FaPlus className="j-icon-font-1" />
                                        Agregar propina
                                    </button>
                                </div>


                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop={true}

                                    keyboard={false}
                                    className="m_modal"
                                >
                                    <Modal.Header closeButton className="m_borbot">
                                        <Modal.Title className="j-tbl-text-10">Agregar propina</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="border-0">
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
                                                placeholder="$20"
                                            />
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
                                            Aceptar
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
                                            <p className="mb-0 mt-2 h6 j-tbl-pop-1">Propina agregada</p>
                                            <p className="opacity-75 j-tbl-pop-2">Su propina ha sido agregada exitosamente</p>
                                        </div>
                                    </Modal.Body>
                                </Modal>
                            </div>

                            <p className="j-final-p">Puedes seleccionar uno o mas</p>
                            <hr className="sj_bottom" />
                            <Accordion className="sj_accordion" defaultActiveKey={['0']} alwaysOpen>
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        {" "}
                                        <div className="sj_bg_dark px-4 py-2">
                                            <img src={check} alt="" />
                                            <p className="d-inline px-3 ">Efectivo</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sj_gay_border px-3 py-4 mt-2">
                                            <form className="d-flex">
                                                <div className="me-2 flex-grow-1">
                                                    <label className="mb-2">Cantidad</label>{" "}
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={customerData.name}
                                                        onChange={handleChange}
                                                        className="input_bg_dark  w-full  px-4 py-2 text-white sj_width_mobil"
                                                    />
                                                </div>
                                                <div className="flex-grow-1">
                                                    <label className="mb-2">
                                                        Vuelto
                                                    </label>{" "}
                                                    <br />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={customerData.email}
                                                        onChange={handleChange}
                                                        className="input_bg_dark   px-4 py-2 text-white sj_width_mobil"
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>
                                        {" "}
                                        <div className="sj_bg_dark px-4 py-2 mt-3">
                                            <img src={check} alt="#" />
                                            <p className="d-inline px-3">Tarjeta de debito</p>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        <div className="sj_gay_border px-3 py-4 mt-2">
                                            <form>
                                                <label className="mb-2">Cantidad</label>
                                                <br />
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={customerData.name}
                                                    onChange={handleChange}
                                                    className="sj_bg_dark sj_width_input  px-4 py-2 text-white "
                                                />
                                            </form>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <div className="sj_bg_dark px-4 py-2 mt-3 ">
                                <img src={check5} alt="#" />
                                <p className="d-inline px-3">Tarjeta de credito</p>
                            </div>
                            <div className="sj_bg_dark px-4 py-2 mt-3">
                                <img src={check5} alt="#" />
                                <p className="d-inline px-3">Transferencia</p>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="j-counter-price position-sticky" style={{ top: '77px' }}>

                    <div className="position-fixed">
                        <h2 className="text-white j-tbl-text-13">Resumen</h2>
                        <div className="j-counter-price-data">
                            <h3 className="text-white mt-3 j-tbl-text-13">Datos</h3>
                            <div className="d-flex align-items-center justify-content-between my-3">
                                <div className="j-busy-table d-flex align-items-center">
                                    <div className="j-b-table">
                                    </div>
                                    <p className="j-table-color j-tbl-font-6">Ocupado</p>
                                </div>

                                <div className="b-date-time d-flex align-items-center">
                                    <svg class="j-canvas-svg-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                    </svg>

                                    <p className="mb-0 ms-2 me-3 text-white j-tbl-font-6">30 min  20 sg</p>
                                </div>
                            </div>


                            <div className="j-counter-price-data">
                                <div className="j-orders-inputs">
                                    <div className="j-orders-code">
                                        <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                                            Código pedido
                                        </label>
                                        <input className="j-input-name j-table_input" type="text" placeholder="01234" />
                                    </div>
                                    <div className="j-orders-code ">
                                        <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                                            Personas
                                        </label>
                                        <input className="j-input-name j-table_input text-white" type="text" placeholder="5" />
                                    </div>
                                </div>
                                <div className="j-counter-order">
                                    <h3 className="text-white j-tbl-pop-1">Pedido </h3>
                                    <div className="j-counter-order-data">
                                        {cartItems.map((item, index) => (
                                            <div className="j-counter-order-border-fast" key={index}>
                                                <div className="j-counter-order-img">
                                                    <div className="d-flex align-items-center justify-content-between">
                                                        <img src={item.image} alt="" />
                                                        <h5 className="text-white j-tbl-font-5">{item.name}</h5>
                                                    </div>
                                                    <div className="d-flex align-items-center">
                                                        <div className="j-counter-mix">
                                                            <button className="j-minus-count" onClick={() => decrement(index)}>
                                                                <FaMinus />
                                                            </button>
                                                            <h3> {countsoup[index]}</h3>
                                                            <button className="j-plus-count" onClick={() => increment(index)}>
                                                                <FaPlus />
                                                            </button>
                                                        </div>
                                                        <h4 className="text-white fw-semibold">
                                                            ${parseInt(item.price) * countsoup[index]}
                                                        </h4>
                                                        <button className="j-delete-btn me-2" onClick={() => handleDeleteItem(index)}>
                                                            <RiDeleteBin6Fill />
                                                        </button>
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
                                            <span className="text-white">${getTotalCost().toFixed(2)}</span>
                                        </div>
                                        <div className="j-border-bottom-counter">
                                            <div className="j-total-discount d-flex justify-content-between">
                                                <p className="j-counter-text-2">Descuentos</p>
                                                <span className="text-white">${discount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="j-total-discount my-2 d-flex justify-content-between">
                                            <p className="text-white bj-delivery-text-153 ">Total</p>
                                            <span className="text-white bj-delivery-text-153 ">
                                                ${finalTotal.toFixed(2)}
                                            </span>
                                        </div>
                                        <Link to={"/table/pago"} className="btn w-100 j-btn-primary text-white j-tbl-btn-font-1">Cobrar</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default TablePago
