import React, { useState } from 'react'
import Header from "./Header";
import box from "../Image/Ellipse 20.png";
import box4 from "../Image/box5.png";
import { FaCircleCheck } from "react-icons/fa6";
import { Accordion, Button, Modal } from "react-bootstrap";
import Sidenav from "./Sidenav";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { HiOutlineArrowLeft, HiOutlineArrowSmLeft } from 'react-icons/hi';
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import pic2 from "../img/Image(1).jpg"

const TableDatos = () => {
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

    const [itemToDelete, setItemToDelete] = useState(null);
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




    const [showCreSuc, setShowCreSuc] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const handleCloseCreSuc = () => setShowCreSuc(false);
    const handleShowCreSuc = () => setShowCreSuc(true);

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

    const finalTotal = totalCost - discount;

    const [customerData, setCustomerData] = useState({
        id: "02134656",
        name: "Damian Gonzales",
        email: "ejemplo@gmail.com",
    });
    const handleChange = (event) => {
        const { name, value } = event.target;
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const [showEditFam, setShowEditFam] = useState(false);
    const handleShowEditFam = () => setShowEditFam(true);


    const [selectedRadio, setSelectedRadio] = useState("1");
    const [activeAccordionItem, setActiveAccordionItem] = useState("0");
    const handleAccordionClick = (value) => {
        setSelectedRadio(value);
    };

    const [rut1, setRut1] = useState("");
    const [rut2, setRut2] = useState("");
    const [rut3, setRut3] = useState("");


    const handleRutChange = (e, setRut) => {
        let value = e.target.value.replace(/-/g, ""); // Remove any existing hyphen
        if (value.length > 6) {
            value = value.slice(0, 6) + "-" + value.slice(6);
        }
        setRut(value);
    };

    return (
        <div>
            <Header />
            <div className="s_bg_dark">
                <div className="j-flex">
                    <div>
                        <Sidenav />
                    </div>
                    <div className="flex-grow-1 sidebar j-position-sticky text-white">
                        <div className="j-counter-header">
                            <div className="j-table-datos-btn">
                                <button className="bj-btn-outline-primary j-tbl-btn-font-1 btn">
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

                                        <Link
                                            className="text-decoration-none px-2 sj_text_blue"
                                        >
                                            <FaCircleCheck className="mx-1" />
                                            <span>Datos</span>
                                        </Link>
                                    </div>
                                    <div className="line2  flex-grow-1 text-end">

                                        <Link
                                            to={"/table/pago"}
                                            className="text-decoration-none px-2 sj_text_medium"
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
                                <p className="mb-2">Datos cliente</p>
                                <p>Tipos de comprobantes</p>
                                <hr className="sj_bottom" />
                                <Accordion className="sj_accordion" defaultActiveKey={['0']}>
                                    <Accordion.Item eventKey="0" className='mb-3'>
                                        <Accordion.Header>
                                            {" "}
                                            {/* <div className="sj_bg_dark px-4 py-2 sj_w-75">
                                                <img src={box} alt="" />
                                                <p className="d-inline px-3 ">
                                                    Boleta Electrónica Impersonal
                                                </p>
                                            </div> */}
                                            <div onClick={() => handleAccordionClick("1")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "1" ? "active" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="receiptType"
                                                    value="1"
                                                    checked={selectedRadio === "1"}
                                                    onChange={() => setSelectedRadio("1")}
                                                    className="me-2 j-radio-checkbox"
                                                />
                                                <p className="d-inline px-3">Boleta nominativa:</p>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="sj_gay_border px-3 py-4 mt-2">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-12 mb-2">
                                                            <label className="mb-2">Rut </label>
                                                            <input
                                                                type="text"
                                                                name="rut"
                                                                value={rut1}
                                                                onChange={(e) => handleRutChange(e, setRut1)}
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Nombre </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="mb-2">Apellido Paterno </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Giro </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Dirección </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">E-mail (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">Teléfono móvil (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="1" className='mb-3'>
                                        <Accordion.Header>
                                            {" "}
                                            {/* <div className="sj_bg_dark px-4 py-2 mt-3 sj_w-75">
                                                <img src={box4} alt="#" />
                                                <p className="d-inline px-3">
                                                    Boleta Electrónica Nominativa
                                                </p>
                                            </div> */}
                                            <div onClick={() => handleAccordionClick("2")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "2" ? "active" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="receiptType"
                                                    value="1"
                                                    checked={selectedRadio === "2"}
                                                    onChange={() => setSelectedRadio("2")}
                                                    className="me-2 j-radio-checkbox"
                                                />
                                                <p className="d-inline px-3">Boleta electrónica:</p>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="sj_gay_border px-3 py-4 mt-2">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-12 mb-2">
                                                            <label className="mb-2">Rut </label>
                                                            <input
                                                                type="text"
                                                                name="rut"
                                                                value={rut2}
                                                                onChange={(e) => handleRutChange(e, setRut2)}
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Nombre </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6">
                                                            <label className="mb-2">Apellido Paterno </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Giro </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Dirección </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">E-mail (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">Teléfono móvil (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    <Accordion.Item eventKey="2" className='mb-3'>
                                        <Accordion.Header>
                                            {" "}
                                            {/* <div className="sj_bg_dark px-4 py-2 mt-3 sj_w-75">
                                                <img src={box4} alt="#" />
                                                <p className="d-inline px-3">
                                                    Boleta personal
                                                </p>
                                            </div> */}
                                            <div onClick={() => handleAccordionClick("3")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "2" ? "active" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="receiptType"
                                                    value="1"
                                                    checked={selectedRadio === "3"}
                                                    onChange={() => setSelectedRadio("3")}
                                                    className="me-2 j-radio-checkbox"
                                                />
                                                <p className="d-inline px-3">Factura:</p>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="sj_gay_border px-3 py-4 mt-2">
                                                <form>
                                                    <div className="row">
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Rut </label>
                                                            <input
                                                                type="text"
                                                                name="rut"
                                                                value={rut3}
                                                                onChange={(e) => handleRutChange(e, setRut3)}
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Razón Social </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Sa, Ltda, Spa </label>
                                                            <select className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white form-select">
                                                                <option value="0">Seleccionar opción</option>
                                                                <option value="1">Sa</option>
                                                                <option value="2">Ltda</option>
                                                                <option value="3">Spa</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Apellido Paterno</label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Giro </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 mb-2">
                                                            <label className="mb-2">Dirección </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">E-mail (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>
                                                        <div className="col-6 ">
                                                            <label className="mb-2">Teléfono móvil (opcional) </label>
                                                            <input
                                                                type="text"
                                                                id="id"
                                                                name="id"
                                                                className="sj_bg_dark sj_width_input ps-2 pe-4 py-2 text-white"
                                                            />
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                    {/* <Accordion.Item eventKey="3" >
                                        <Accordion.Header>
                                            <div onClick={() => handleAccordionClick("4")}
                                                className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "2" ? "active" : ""
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name="receiptType"
                                                    value="1"
                                                    checked={selectedRadio === "4"}
                                                    onChange={() => setSelectedRadio("4")}
                                                    className="me-2 j-radio-checkbox"
                                                />
                                                <p className="d-inline px-3">Factura (Rut) (Iva 19%)</p>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            <div className="sj_gay_border px-3 py-4 mt-2">
                                                <form>
                                                    <label htmlFor="id">DNI </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="id"
                                                        name="id"
                                                        onChange={handleChange}
                                                        value={customerData.id}
                                                        className="sj_bg_dark sj_width_input  px-4 py-2 text-white "
                                                    />
                                                    <br />
                                                    <label htmlFor="name" className="pt-3">
                                                        Nombre
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="text"
                                                        id="name"
                                                        name="name"
                                                        value={customerData.name}
                                                        onChange={handleChange}
                                                        className="sj_bg_dark sj_width_input  px-4 py-2 text-white "
                                                    />
                                                    <br />
                                                    <label htmlFor="email" className="pt-3">
                                                        Correo electrónico{" "}
                                                    </label>
                                                    <br />
                                                    <input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        value={customerData.email}
                                                        onChange={handleChange}
                                                        className="sj_bg_dark sj_width_input  px-4 py-2 text-white "
                                                    />
                                                </form>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item> */}
                                </Accordion>
                            </div>
                        </div>
                    </div>
                    <div className="j-counter-price position-sticky" style={{ top: '77px' }}>

                        <div className='position-fixed'>
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
                                            <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd" />
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
                                        {/* <div className="j-counter-order-data">
                                        {cartItems.map((item, index) => (
                                            <div className="j-counter-order-img" key={index}>
                                                <div className="d-flex align-items-center justify-content-between">
                                                    <img src={item.image} alt="" />
                                                    <h5 className="text-white j-tbl-pop-1">{item.name}</h5>
                                                </div>
                                                <h3 className="j-tbl-btn-font-1"> {countsoup[index]}</h3>
                                                <div className="d-flex align-items-center">
                                                    <h4 className="text-white fw-semibold j-tbl-text-14">
                                                        ${parseInt(item.price) * countsoup[index]}
                                                    </h4>
                                                </div>
                                            </div>
                                        ))}
                                        <Link href="" className="j-tbl-pop-2">Ver más</Link>
                                    </div>
                                    <div className="j-counter-total">
                                        <h5 className="text-white j-tbl-text-15 ">Costo total</h5>
                                        <div className="j-border-bottom32">
                                            <div className="j-total-discount d-flex justify-content-between">
                                                <p className="j-tbl-pop-2 ">Productos</p>
                                                <span className="text-white j-tbl-text-16">${totalCost.toFixed(2)}</span>
                                            </div>
                                            <div className="j-total-discount mb-2 d-flex justify-content-between">
                                                <p className="j-tbl-pop-2 ">Descuentos</p>
                                                <span className="text-white j-tbl-text-16" >${discount.toFixed(2)}</span>
                                            </div>
                                        </div>
                                        <div className="j-total-discount my-2 d-flex justify-content-between">
                                            <p className="text-white fw-semibold j-tbl-text-14">Total</p>
                                            <span className="text-white fw-semibold j-tbl-text-14">
                                                ${finalTotal.toFixed(2)}
                                            </span>
                                        </div>

                                    </div> */}
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
            </div>
        </div>
    )
}

export default TableDatos
