import React, { useEffect, useState } from "react";
import Header from "./Header";
import { FaMinus, FaPlus } from "react-icons/fa";
import { FaCircleCheck } from "react-icons/fa6";
import { Accordion, Button, Modal } from "react-bootstrap";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import Recipt from "./Recipt";
import Counter from "./Counter";

const Mostrador = () => {
  const [showAllItems, setShowAllItems] = useState(false);
  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };
  const [countsoup, setCountsoup] = useState(1);
  const [cartItems, setCartItems] = useState([]);
  const [selectedRadio, setSelectedRadio] = useState("1");
  const [activeAccordionItem, setActiveAccordionItem] = useState("0");
  const [itemToDelete, setItemToDelete] = useState(null);

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

  const removeItemFromCart = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const newCartItems = [...cartItems];
      const newCountsoup = [...countsoup];

      newCartItems.splice(itemIndex, 1);
      newCountsoup.splice(itemIndex, 1);

      setCartItems(newCartItems);
      setCountsoup(newCountsoup);

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      localStorage.setItem("countsoup", JSON.stringify(newCountsoup));

      if (newCartItems.length === 5 && showAllItems) {
        setShowAllItems(false);
      }
    }
  };


  const handleAccordionClick = (value) => {
    setSelectedRadio(value);
  };

  const [showEditFamDel, setShowEditFamDel] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = () => setShowEditFamDel(true);

  const [showEditFam, setShowEditFam] = useState(false);
  const handleCloseEditFam = () => setShowEditFam(false);
  const handleShowEditFam = () => setShowEditFam(true);

  const handleDeleteConfirmation = (id) => {
    removeItemFromCart(id);
    handleCloseEditFam();
    handleShowEditFamDel();

    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  // const removeItemFromCart = (id) => {
  //   const itemIndex = cartItems.findIndex((item) => item.id === id);
  //   if (itemIndex !== -1) {
  //     const newCartItems = [...cartItems];
  //     const newCountsoup = [...countsoup];

  //     if (newCountsoup[itemIndex] > 1) {
  //       newCountsoup[itemIndex] -= 1;
  //     } else {
  //       newCartItems.splice(itemIndex, 1);
  //       newCountsoup.splice(itemIndex, 1);
  //     }

  //     setCartItems(newCartItems);
  //     setCountsoup(newCountsoup);

  //     if (newCartItems.length === 5 && showAllItems) {
  //       setShowAllItems(false);
  //     }
  //   }
  // };

  const handleAccordionSelect = (eventKey) => {
    setActiveAccordionItem(eventKey);
    setSelectedRadio("0");
  };

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };


  const increment = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const decrement = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map((count, i) =>
        i === index ? (count > 1 ? count - 1 : 1) : count
      )
    );
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item, index) => total + parseInt(item.price) * countsoup[index], 0);
  };

  const totalCost = getTotalCost();
  const discount = 1.0;
  const finalTotal = totalCost - discount;

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
              <div className="j-menu-bg-color">
                <div className="j-tracker-mar d-flex justify-content-between ">
                  <div className="line1 flex-grow-1">
                    <Link
                      to={"/counter"}
                      className="text-decoration-none px-2 sj_text_dark"
                    >
                      <FaCircleCheck className="mx-1" />
                      <span>Artículos</span>
                    </Link>
                  </div>
                  <div className="flex-grow-1 text-center">
                    <Link className="text-decoration-none px-2 j-counter-path-color">
                      <FaCircleCheck className="mx-1" />
                      <span>Datos</span>
                    </Link>
                  </div>
                  <div className="line2 flex-grow-1 text-end">
                    <Link
                      to={"/counter/payment"}
                      className="text-decoration-none px-2 sj_text_dark"
                    >
                      <FaCircleCheck className="mx-1" />
                      <span>Pago</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-2 mx-2 sj_hwidth">
              <div className="bg_gay p-4">
                <p className="mb-2">Datos cliente</p>
                <p>Tipos de comprobantes</p>
                <hr className="sj_bottom" />
                <Accordion defaultActiveKey={['0']}
                  className="sj_accordion"
                >
                  <Accordion.Item eventKey="0" className="mb-2">
                    <Accordion.Header>
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
                                name="rut1"
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

                  <Accordion.Item eventKey="2" className="mb-2">
                    <Accordion.Header>
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
                                name="rut2"
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

                  {/* <Accordion.Item eventKey="3" className="mb-2">
                    <Accordion.Header>
                      <div
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "3" ? "active" : ""
                          }`}
                        onClick={() => handleAccordionClick("3")}
                      >
                        <input
                          type="radio"
                          name="receiptType"
                          value="3"
                          checked={selectedRadio === "3"}
                          onChange={() => setSelectedRadio("3")}
                          className="me-2 j-radio-checkbox"
                        />
                        <p className="d-inline px-3">Boleta personal</p>
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
                            value={customerData.id}
                            className="sj_bg_dark sj_width_input px-4 py-2 text-white"
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
                            className="sj_bg_dark sj_width_input px-4 py-2 text-white"
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
                            className="sj_bg_dark sj_width_input px-4 py-2 text-white"
                          />
                        </form>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item> */}

                  <Accordion.Item eventKey="4" className="mb-2">
                    <Accordion.Header>
                      <div
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${activeAccordionItem === "4" ? "active" : ""
                          }`}
                        onClick={() => handleAccordionClick("4")}
                      >
                        <input
                          type="radio"
                          name="receiptType"
                          value="4"
                          checked={selectedRadio === "4"}
                          onChange={() => setSelectedRadio("4")}
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
                                name="rut3"
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

                </Accordion>
              </div>
            </div>
          </div>
          <div
            className="j-counter-price position-sticky"
            style={{ top: "77px" }}
          >
            <div className="position-fixed">
              <h2 className="text-white j-kds-body-text-1000">Resumen</h2>
              <div className="j-counter-price-data">
                <h3 className="text-white j-kds-body-text-1000">Datos</h3>
                <div className="j-orders-inputs">
                  <div className="j-orders-code">
                    <label className="j-label-name text-white mb-2 j-tbl-font-6 ">
                      Código pedido
                    </label>
                    <input
                      className="j-input-name"
                      type="text"
                      placeholder="01234"
                    />
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
                            <button className="j-delete-btn me-2" onClick={() => {
                              setItemToDelete(item.id);
                              handleShowEditFam();
                            }}>
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
                      <span className="text-white">
                        ${totalCost.toFixed(2)}
                      </span>
                    </div>
                    <div className="j-border-bottom-counter">
                      <div className="j-total-discount d-flex justify-content-between">
                        <p className="j-counter-text-2">Descuentos</p>
                        <span className="text-white">
                          ${discount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                    <div className="j-total-discount my-2 d-flex justify-content-between">
                      <p className="text-white bj-delivery-text-153">Total</p>
                      <span className="text-white bj-delivery-text-153">
                        ${finalTotal.toFixed(2)}
                      </span>
                    </div>
                    <Link

                      to={"/counter/payment"}
                      className="btn w-100 j-btn-primary text-white m-articles-text-2"
                    >
                      Continuar
                    </Link>
                  </div>
                  <Modal
                    show={showEditFam}
                    onHide={handleCloseEditFam}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal jay-modal"
                  >
                    <Modal.Header closeButton className="border-0">
                    </Modal.Header>
                    <Modal.Body className="border-0">
                      <div className="text-center">
                        <img
                          className="j-trash-img-late"
                          src={require("../Image/trash-outline-secondary.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 j-kds-border-card-p">Seguro deseas eliminar este pedido</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 justify-content-center">
                      <Button
                        className="j-tbl-btn-font-1 "
                        variant="danger"
                        onClick={() => handleDeleteConfirmation(itemToDelete)}
                      >
                        Si, seguro
                      </Button>
                      <Button
                        className="j-tbl-btn-font-1 "
                        variant="secondary"
                        onClick={() => {
                          handleCloseEditFam();
                        }}
                      >
                        No, cancelar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  <Modal
                    show={showEditFamDel}
                    onHide={handleCloseEditFamDel}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal jay-modal"
                  >
                    <Modal.Header closeButton className="border-0"></Modal.Header>
                    <Modal.Body>
                      <div className="j-modal-trash text-center">
                        <img
                          src={require("../Image/trash-outline.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-3 h6 j-tbl-pop-1">Pedido eliminado</p>
                        <p className="opacity-75 j-tbl-pop-2">
                          El Pedido ha sido eliminado correctamente
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
    </>
  );
};

export default Mostrador;
