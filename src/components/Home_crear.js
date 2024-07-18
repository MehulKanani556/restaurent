import React, { useState, useEffect } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import { FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import { MdEditSquare, MdOutlineAccessTimeFilled } from 'react-icons/md';
import { CgCalendarDates } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import pic1 from '../img/Image.png';
import pic2 from '../img/Image(1).jpg';
import pic3 from '../img/Image (2).png';
import { FaCircleCheck } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import img1 from '../Image/check-circle.png'
import { Nav, Tab, Container, Row, Col, Accordion } from 'react-bootstrap';


export default function Home_crear({ item }) {
    // const [counts, setCounts] = useState(item ? { [item.id]: 0 } : {});
    // const [counts, setCounts] = useState(item ? { [item.id]: 0 } : {});
    const [customerData, setCustomerData] = useState();
    const handleContinuarClick = () => {
        setNavactiveTab('nota-de-credito');
    };

    // const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

    // const handleCheckboxChange = (value) => {
    //     if (selectedCheckboxes.includes(value)) {
    //         setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
    //         setCustomerData();
    //     } else {
    //         setSelectedCheckboxes((prev) => [...prev, value]);
    //     }
    // };

    const [selectedCheckbox, setSelectedCheckbox] = useState(null);
    const [activeKey, setActiveKey] = useState(null);
    const handleCheckboxChange = (value) => {
        if (selectedCheckbox === value) {
            setSelectedCheckbox(null);
            setActiveKey(null);
            setCustomerData();
        } else {
            setSelectedCheckbox(value);
            setActiveKey(value === "2" ? "1" : null); // Open second accordion if "Pago de caja" is selected
        }
    };

    const [price, setPrice] = useState('20');
    const handleprice = (event) => {
        let value = event.target.value;
        if (value.startsWith('$')) {
            value = value.substring(1);
        }

        setPrice(value);
    };
    const [product, setProduct] = useState([
        {
            id: 1,
            image: pic1,
            name: 'Pollo frito crujiente',
            description: 'Las especialidad de la casa',
            price: '$10.00',
            quantity: 1,
            note: '+ Agregar nota'
        },
        {
            id: 2,
            image: pic2,
            name: 'Guitig',
            description: 'con gas',
            price: '$2.00',
            quantity: 2,
            note: 'Nota: Al clima'
        },
        {
            id: 3,
            image: pic3,
            name: 'Gelatina',
            description: 'con gas',
            price: '$2.00',
            quantity: 2,
            note: 'Nota :Con cerezas a los lados'
        }
    ]);
    const initialCounts = product.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
    }, {});

    const [counts, setCounts] = useState(item ? { [item.id]: 0 } : initialCounts);
    const [cartt, setCart] = useState([
        {
            image1: pic1,
            disc: 'Pollo frito crujiente',
            quantity: 1,
            price: '$10.00',
        },
    ]);

    const [date, setDate] = useState("03/17/2024");
    const [time, setTime] = useState("08:00 am");
    const [name, setName] = useState("Damian Gonzales");
    const [order1, setOrder1] = useState("01234");
    const [order2, setOrder2] = useState("0123456789");
    const [email, setEmail] = useState("ejemplo@gmail.com");

    // Event handlers
    const increment = (id) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: prevCounts[id] + 1
        }));
    };

    const decrement = (id) => {
        setCounts(prevCounts => ({
            ...prevCounts,
            [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0
        }));
    };

    const deleteProduct = (id) => {
        setProduct(prevProducts => prevProducts.filter(product => product.id !== id));
    };


    useEffect(() => {
        const tabs = document.querySelectorAll('#pills-tab button');

        tabs.forEach(tab => {
            tab.addEventListener('click', function () {
                tabs.forEach(button => {
                    button.classList.remove('bg-primary', 'text-light');
                    button.classList.add('bg-light', 'text-dark');
                });

                tab.classList.remove('bg-light', 'text-dark');
                tab.classList.add('bg-primary', 'text-light');
            });
        });

        return () => {
            tabs.forEach(tab => {
                tab.removeEventListener('click', () => { });
            });
        };
    }, []);


    const [activeTab, setActiveTab] = useState("home");
    const [showDeliveryButton, setShowDeliveryButton] = useState(true);
    const [showCancelOrderButton, setShowCancelOrderButton] = useState(false);
    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
        if (selectedTab === "profile") {
            setShowDeliveryButton(false);
            setShowCancelOrderButton(true);
        } else {
            setShowDeliveryButton(true);
            setShowCancelOrderButton(false);
        }
    };


    const [navactiveTab, setNavactiveTab] = useState('productos');

    const handleTabChange = (key) => {
        setNavactiveTab(key);
    };

    return (
        <div className="m_bg_black">
            <Header />
            <div className="d-flex">
                <Sidenav />
                <div className="flex-grow-1 sidebar overflow-hidden">
                    <div className="p-3 m_bgblack text-white">
                        <Link to="/home/client/detail" className='d-flex text-decoration-none' >
                            <div className='btn bj-btn-outline-primary text-nowrap py-2 d-flex mt-2 ms-3' style={{ borderRadius: "10px", }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
                        </Link>
                        <div className="mt-3 ms-3">
                            <h5 style={{ fontSize: "18px" }}>Crear nota de credito</h5>
                        </div>
                        <div className='d-flex flex-wrap me-4'>
                            {showCancelOrderButton ? (
                                <div className="d-flex justify-content-between align-items-center flex-wrap ms-3">
                                    <div className="text-white  my-2">
                                        DNI :- {order2}
                                    </div>
                                </div>
                            ) : (
                                <div className="d-flex justify-content-between align-items-center flex-wrap ms-3">
                                    <div className="text-white  my-2">
                                        DNI :- {order1}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <Container className='p-0' fluid style={{ backgroundColor: "#111928" }}>
                        <Row className='p-0'>
                            <Col className='p-0'>
                                <Tab.Container defaultActiveKey="productos" activeKey={navactiveTab} onSelect={handleTabChange}>
                                    <Tab.Content>
                                        <div className='row'>
                                            <div className="col-xl-7 col-12 overflow-hidden px-0">
                                                <div className="p-3 m_bgblack text-white m-3 p-3 me-2">
                                                    <p className='p-3' style={{ fontSize: "18px" }}>Listado</p>
                                                    <Nav className="custom-nav-pills">
                                                        <div className="line123 line333  flex-grow-1">
                                                            <div className="text-decoration-none j-icpn-text-color px-2 b_text_dark">
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="productos" className="nav-link-custom p-0">
                                                                        <FaCircleCheck className="mx-1" /> Productos
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <div className="text-decoration-none px-2 b_text_dark">
                                                                <Nav.Item>
                                                                    <Nav.Link eventKey="nota-de-credito" className="nav-link-custom p-0">
                                                                        <FaCircleCheck className="mx-1" /> Nota de crédito
                                                                    </Nav.Link>
                                                                </Nav.Item>
                                                            </div>
                                                        </div>
                                                    </Nav>

                                                    <Tab.Pane eventKey="productos">
                                                        {navactiveTab === 'productos' && (
                                                            <div className="a_deli_infolist p-5 mt-5 mx-2 mb-3">
                                                                {product.map((item) => (
                                                                    <div key={item.id}>
                                                                        <div className="py-3 ">
                                                                            <div className="row">
                                                                                <div className="col-sm-6">
                                                                                    <div className="d-flex align-content-center">
                                                                                        <input type="checkbox" className="me-4  custom-checkbox" style={{ marginTop: "22px" }} />
                                                                                        <img src={item.image} alt="pic" height={60} width={60} />
                                                                                        <div className="ms-4">
                                                                                            <div className="text-nowrap">{item.name}</div>
                                                                                            <div className="mt-3 a_mar_new">{item.description}</div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="col-sm-3 a_text_price">
                                                                                    <button className="b_count11 btn btn-secondary" onClick={() => decrement(item.id)}>-</button>
                                                                                    <span className="pe-3 ms-2">{counts[item.id]}</span>
                                                                                    <button className="b_count btn btn-secondary" onClick={() => increment(item.id)}>+</button>
                                                                                </div>
                                                                                <div className="col-sm-2 a_text_price">
                                                                                    <div className="pe-5 fw-bold">{item.price}</div>
                                                                                </div>
                                                                                <div className="col-sm-1">
                                                                                    <button className="b_bg_red btn" onClick={() => deleteProduct(item.id)}>
                                                                                        <RiDeleteBinLine />
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className='mb-5'><a href="#" className="a_home_addnote">{item.note}</a></div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </Tab.Pane>
                                                    <Tab.Pane eventKey="nota-de-credito">
                                                        {navactiveTab === 'nota-de-credito' && (
                                                            <Accordion className="sj_accordion mx-2 mt-5" activeKey={activeKey} onSelect={setActiveKey}>
                                                                <Accordion.Item eventKey="0" className="mb-2">
                                                                    <Accordion.Header>
                                                                        <div
                                                                            onClick={() => handleCheckboxChange("1")}
                                                                            className={`sj_bg_border px-4 py-2 sj_w-75 ${selectedCheckbox === "1" ? "active" : ""}`}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                name="receiptType"
                                                                                value="1"
                                                                                checked={selectedCheckbox === "1"}
                                                                                onChange={() => handleCheckboxChange("1")}
                                                                                className="me-2 j-change-checkbox"
                                                                            />
                                                                            <p className="d-inline px-3 caja-pajo-title">Usar para futura compra</p>
                                                                        </div>
                                                                    </Accordion.Header>
                                                                </Accordion.Item>
                                                                <Accordion.Item eventKey="1" className="mb-2">
                                                                    <Accordion.Header>
                                                                        <div
                                                                            onClick={() => handleCheckboxChange("2")}
                                                                            className={`sj_bg_border px-4 py-2 sj_w-75 ${selectedCheckbox === "2" ? "active" : ""}`}
                                                                        >
                                                                            <input
                                                                                type="checkbox"
                                                                                name="receiptType"
                                                                                value="2"
                                                                                checked={selectedCheckbox === "2"}
                                                                                onChange={() => handleCheckboxChange("2")}
                                                                                className="me-2 j-change-checkbox"
                                                                            />
                                                                            <p className="d-inline px-3 caja-pajo-title">Pago de caja</p>
                                                                        </div>
                                                                    </Accordion.Header>
                                                                    <Accordion.Body>
                                                                        <div className='mx-0 b_bborder m-3 p-3'>
                                                                            <div
                                                                                className={`sj_bg_border d-flex px-4 py-2 sj_w-75`}
                                                                            >
                                                                                <div className='me-3'>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="receiptType"
                                                                                        value="4"
                                                                                        className="me-2 j-radio-checkbox"
                                                                                    />
                                                                                    <p className="d-inline px-3 ps-0">Efectivo</p>
                                                                                </div>
                                                                                <div className='me-3'>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="receiptType"
                                                                                        value="5"
                                                                                        className="me-2 j-radio-checkbox"
                                                                                    />
                                                                                    <p className="d-inline px-3 ps-0">Tarjeta de debito</p>
                                                                                </div>
                                                                                <div className='me-3'>
                                                                                    <input
                                                                                        type="radio"
                                                                                        name="receiptType"
                                                                                        value="6"
                                                                                        className="me-2 j-radio-checkbox"
                                                                                    />
                                                                                    <p className="d-inline px-3 ps-0">Tarjeta de credito</p>
                                                                                </div>
                                                                            </div>
                                                                            <div className='mt-2'>
                                                                                <h5 className='caja-pajo-text'>Cantidad</h5>
                                                                                <div className="mb-3 b_gray">
                                                                                    <input type="text" id="disabledTextInput" className="form-control mt-2 text-white b_gray" value={`$${price}`}
                                                                                        onChange={handleprice} style={{ borderRadius: "10px" }} />
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </Accordion.Body>
                                                                </Accordion.Item>
                                                            </Accordion>
                                                        )}
                                                    </Tab.Pane>
                                                </div>
                                            </div>
                                            <div className="col-xl-5 col-12 overflow-hidden px-0">
                                                <Tab.Pane eventKey="productos" onSelect={handleTabChange}>
                                                    {navactiveTab === 'productos' && (
                                                        <div className="p-3 m_bgblack text-white m-3">
                                                            <p>Resumen</p>
                                                            <div className="deli_infolist p-2">
                                                                <div className="d-flex justify-content-end align-items-center">
                                                                    <div className='d-flex justify-content-end align-items-center me-3'>
                                                                        <div className='me-2 fs-4'><FaCalendarAlt className='bj-icon-size-change' /></div>
                                                                        <div className='pt-1 bj-delivery-text-3'>{date}</div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-end align-items-center">
                                                                        <div className="me-2 fs-4"><MdOutlineAccessTimeFilled /></div>
                                                                        <div className="a_time">{time}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="fw-bold fs-5">Datos</div>
                                                                <div className="w-100 mt-4">
                                                                    <div>Nombre</div>
                                                                    <div className="w-100 a_bg_order mt-2 border-0" style={{ borderRadius: "10px" }}><span className="">{name}</span></div>
                                                                </div>
                                                                <div className="d-flex justify-content-end align-items-center mt-4">
                                                                    <div className="w-50">
                                                                        <div>DNI</div>
                                                                        <div className="w-75 a_bg_order border-0 mt-2" style={{ borderRadius: "10px" }}><span className="">{order1}</span></div>
                                                                    </div>
                                                                    <div className="w-50">
                                                                        <div>Correo electrónico</div>
                                                                        <div className="w-75 a_bg_order border-0 mt-2" style={{ borderRadius: "10px" }}><span className="">{email}</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <h5>Productos</h5>
                                                                </div>
                                                                <div>
                                                                    {cartt.map((ele, index) => (
                                                                        <div key={index} className="mt-5 mx-1 d-flex justify-content-between">
                                                                            <div>
                                                                                <img src={ele.image1} alt="pic" height={50} width={50} className='rounded-3' />
                                                                                <span className='ms-3'>{ele.disc}</span>
                                                                            </div>
                                                                            <div className="ms-3 mt-2">
                                                                                {ele.quantity}
                                                                            </div>
                                                                            <div className="ms-3 mt-2">
                                                                                {ele.price}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className='b_borderrr mx-1 mb-4 mt-3'>
                                                                </div>
                                                                <div className="p-4 a_deli_infolist mt-3">
                                                                    <div className="a_mar_summary fs-5 fw-bold">Costo total</div>
                                                                    <div className="d-flex justify-content-between align-items-center my-1">
                                                                        <div>Productos</div>
                                                                        <div>$13.00</div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center mt-2 my-1">
                                                                        <div>Descuentos</div>
                                                                        <div>$1.00</div>
                                                                    </div>
                                                                    <hr />
                                                                    <div>
                                                                        <div className="d-flex justify-content-between align-items-center my-1 fw-bold">
                                                                            <div>Total</div>
                                                                            <div>$12.00</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='mx-5'>

                                                                    <div className="btn btn-primary w-100 my-4 border-0" style={{ borderRadius: "10px", padding: "8px 12px", backgroundColor: "#147BDE" }} onClick={handleContinuarClick}>Continuar</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Tab.Pane>

                                                <Tab.Pane eventKey="nota-de-credito" onSelect={handleTabChange}>
                                                    {navactiveTab === 'nota-de-credito' && (
                                                        <div className="p-3 m_bgblack text-white m-3 ">
                                                            <p>Resumen</p>
                                                            <div className="deli_infolist p-2">
                                                                <div className="d-flex justify-content-end align-items-center " >
                                                                    <div className='d-flex justify-content-end align-items-center me-3 '>
                                                                        <div className='me-2 fs-4'><FaCalendarAlt className='bj-icon-size-change' /></div>
                                                                        <div className='pt-1 bj-delivery-text-3'>{date}</div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-end align-items-center ">
                                                                        <div className="me-2 fs-4 "><MdOutlineAccessTimeFilled /></div>
                                                                        <div className="pt-2 a_time">{time}</div>
                                                                    </div>
                                                                </div>
                                                                <div className="fw-bold fs-5">Datos</div>
                                                                <div className="w-100 mt-4">
                                                                    <div>Nombre</div>
                                                                    <div className="w-100 a_bg_order  mt-2 border-0 " style={{ borderRadius: "10px" }}><span className="">{name}</span></div>
                                                                </div>
                                                                <div className="d-flex justify-content-end align-items-center mt-4">
                                                                    <div className="w-50">
                                                                        <div className='mb-2'>DNI</div>
                                                                        <div className="w-75 a_bg_order  border-0 " style={{ borderRadius: "10px" }}><span className="">{order2}</span></div>
                                                                    </div>
                                                                    <div className="w-50">
                                                                        <div className='mb-2'>Correo electrónico</div>
                                                                        <div className="w-75 a_bg_order  border-0 overflow-auto" style={{ borderRadius: "10px" }}><span className="">{email}</span></div>
                                                                    </div>
                                                                </div>
                                                                <div className="mt-4">
                                                                    <h5>Productos</h5>
                                                                </div>
                                                                <div>
                                                                    {cartt.map((ele, index) => (
                                                                        <div key={index} className="mt-5 mx-1 d-flex justify-content-between">
                                                                            <div>
                                                                                <img src={ele.image1} alt="pic" height={50} width={50} className='rounded-3' />
                                                                                <span className='ms-3'>{ele.disc}</span>
                                                                            </div>
                                                                            <div className="ms-3 mt-2">
                                                                                {ele.quantity}
                                                                            </div>
                                                                            <div className="ms-3 mt-2">
                                                                                {ele.price}
                                                                            </div>
                                                                        </div>
                                                                    ))}
                                                                </div>
                                                                <div className='b_borderrr mx-1 mb-4 mt-3'>
                                                                </div>
                                                                <div className="p-4 a_deli_infolist  mt-3">
                                                                    <div className=" a_mar_summary fs-5 fw-bold">Costo total</div>
                                                                    <div className="d-flex justify-content-between align-items-center my-1">
                                                                        <div>Productos</div>
                                                                        <div>$13.00</div>
                                                                    </div>
                                                                    <div className="d-flex justify-content-between align-items-center mt-2 my-1">
                                                                        <div>Descuentos</div>
                                                                        <div>$1.00</div>
                                                                    </div>
                                                                    <hr></hr>
                                                                    <div>
                                                                        <div className="d-flex justify-content-between align-items-center my-1  fw-bold">
                                                                            <div>Total</div>
                                                                            <div>$12.00</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='b_bborder my-3 p-4'>
                                                                        <h5>Tipos de pago</h5>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <div className='mt-3'>Efectivo</div>
                                                                            <div>$6.00</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='b_bborder my-3 p-4'>
                                                                        <h5>Devolución</h5>
                                                                        <div className='d-flex justify-content-between'>
                                                                            <div className='mt-3'>Cantidad</div>
                                                                            <div className='text-danger'>-$20</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className='mx-5'>
                                                                    <div className="btn btn-primary w-100 my-4    border-0" data-bs-toggle="modal" data-bs-target="#staticBackdrop" style={{ borderRadius: "10px", padding: "8px 12px", backgroundColor: "#147BDE" }}>Devolver</div>
                                                                </div>

                                                                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="true" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                                                    <div className="modal-dialog" >
                                                                        <div className="modal-content" style={{ backgroundColor: "#1F2A37" }}>
                                                                            <div className="modal-header border-0">
                                                                                <h5 className="modal-title" id="staticBackdropLabel"></h5>
                                                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                                                                            </div>
                                                                            <div className='m-auto '>
                                                                                <img src={img1} height={100} width={100} alt="" />
                                                                            </div>
                                                                            <div className="modal-body  text-center">
                                                                                <h4 className='j-tbl-pop-1 mb-0'>Nota de credito</h4>
                                                                                <p className='j-tbl-pop-2'>Devuelta exitosamente</p>
                                                                            </div>

                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Tab.Pane>
                                            </div>
                                        </div>
                                    </Tab.Content>
                                </Tab.Container>
                            </Col>
                        </Row>
                    </Container>


                </div>
            </div>
        </div >
    );
}
