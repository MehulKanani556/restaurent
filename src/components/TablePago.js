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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineArrowLeft } from "react-icons/hi";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import pic2 from "../img/Image(1).jpg";
import axios from "axios";

const TablePago = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const [ payment, setPayment ] = useState(
    JSON.parse(localStorage.getItem("tablePayment"))
  );
  const token = sessionStorage.getItem("token");

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  const navigate = useNavigate();
  const [ tId, setTId ] = useState(id);
  const [ tableData, setTableData ] = useState([]);
  const [ obj1, setObj1 ] = useState([]);
  const [ price, setPrice ] = useState("");
  const [ tipAmount, setTipAmount ] = useState(0);
  const [ formErrors, setFormErrors ] = useState({});

  /* get table data */
  useEffect(
    () => {
      if (id) {
        getTableData(id);
        fetchAllItems();
      }
    },
    [ id ]
  );

  const getTableData = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/table/getStats/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setTableData(response.data);
        // setTableData(response.data);
        console.log("table Data", response.data);
      } else {
        console.error("Response data is not an array:", response.data);
      }
    } catch (error) {
      console.error(
        "Error fetching sectors:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // get product
  const fetchAllItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/item/getAll`);
      setObj1(response.data.items);
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response ? error.response.data : error.message
      );
    }
  };
  const validateNumericInput = (value, allowDecimal = true) => {
    const regex = allowDecimal ? /^\d*\.?\d{0,2}$/ : /^\d*$/;
    return regex.test(value) ? value : "";
  };


  const handleprice = (event) => {
    let value = event.target.value.replace("$", "");
    value = validateNumericInput(value);
    const numericValue = parseFloat(value) || 0;

    // Assuming a maximum tip of 100% of the total cost
    const maxTip = getTotalCost();
    if (numericValue > maxTip) {
      value = maxTip.toFixed(2);
    }
    setPrice(value);
    setTipAmount(parseFloat(value));
  };
    /* get name and image */
  const getItemInfo = (itemId) => {
    const item = obj1.find((item) => item.id === itemId);
    if (item) {
      return { name: item.name, image: item.image };
    } else {
      // If the item is not found in obj1, check tableData
      const tableItem = tableData[0]?.items.find(item => item.item_id === itemId);
      if (tableItem) {
        return { name: `Item ${itemId}`, image: "" }; // You might want to store and use the actual name and image
      }
      return { name: "Unknown Item", image: "" };
    }
  };

  const orderitem = [
    {
      image: img2,
      name: "Pollo frito crujiente",
      quantity: "3",
      price: "10.00",
      code: "01234",
      note: ""
    },
    {
      image: pic2,
      name: "Guitig",
      quantity: "3",
      price: "1.00",
      code: "01234",
      note: ""
    },
    {
      image: img3,
      name: "Gelatina fresa",
      quantity: "3",
      price: "1.00",
      code: "01234",
      note: ""
    }
  ];
  const [ cartItems, setCartItems ] = useState(orderitem);
  const [ countsoup, setCountsoup ] = useState(
    orderitem.map((item) => parseInt(item.quantity))
  );

  const [ showAllItems, setShowAllItems ] = useState(false);
  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const increment = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const decrement = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map(
        (count, i) => (i === index ? (count > 1 ? count - 1 : 1) : count)
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

  const [ isEditing, setIsEditing ] = useState(
    Array(cartItems.length).fill(false)
  );


  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      const updatedIsEditing = [ ...isEditing ];
      updatedIsEditing[index] = false;
      setIsEditing(updatedIsEditing);
    }
  };

 

  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // create family success
  const [ showCreSuc, setShowCreSuc ] = useState(false);
  const handleCloseCreSuc = () => setShowCreSuc(false);
  const handleShowCreSuc = () => setShowCreSuc(true);
  const [ showLoader, setShowLoader ] = useState(false);
  const [ showSuccess, setShowSuccess ] = useState(false);
  const [ deletedItemIndex, setDeletedItemIndex ] = useState(null);

  const addItemToCart = (item) => {
    setCartItems([ ...cartItems, item ]);
  };

  const removeItemFromCart = (index) => {
    const newCartItems = [ ...cartItems ];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);
  };

  const totalCost = getTotalCost();
  const discount = 1.0;
  const propina = 5.0;
  const finalTotal = totalCost - discount;


  useEffect(
    () => {
      if (showCreSuc) {
        setShowLoader(true);
        const timer = setTimeout(() => {
          setShowLoader(false);
          setShowSuccess(true);
        }, 2000);

        return () => clearTimeout(timer);
      }
    },
    [ showCreSuc ]
  );

  const initialCustomerData = {
    amount: "",
    turn: ""
  };

  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
const [customerData, setCustomerData] = useState({});
const handleCheckboxChange = (value) => {
    if (selectedCheckboxes.includes(value)) {
      setSelectedCheckboxes((prev) => prev.filter((item) => item !== value));
      setCustomerData(initialCustomerData);
    } else {
      setSelectedCheckboxes((prev) => [ ...prev, value ]);
    }
    // Clear the payment type error when a type is selected
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      paymentType: undefined
    }));
  };
  const handleChange = (event) => {
    let { name, value } = event.target;
    value = value.replace(/[^0-9/./]/g, "");
    setCustomerData((prevState) => ({
      ...prevState,
      [name]: value
    }));
    setFormErrors((prevState) => ({
      ...prevState,
      [name]: undefined
    }));
  };

  // timer
  const [ elapsedTime, setElapsedTime ] = useState("");
  const calculateElapsedTime = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = now - created;

    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    return `${minutes} min ${seconds} seg`;
  };
  useEffect(
    () => {
      if (tableData.length > 0 && tableData[0].created_at) {
        const timer = setInterval(() => {
          setElapsedTime(calculateElapsedTime(tableData[0].created_at));
        }, 1000);

        return () => clearInterval(timer);
      }
    },
    [ tableData ]
  );


  //   add note
  const [ addNotes, setAddNotes ] = useState(
    Array(tableData.flatMap((t) => t.items).length).fill(false)
  );

  const addNoteToDatabase = async (itemId, note) => {
    try {
      const response = await axios.post(
        `${apiUrl}/order/addNote/${itemId}`,
        {
          notes: note
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        return true;
      } else {
        console.error("Failed to add note:", response.data.message);
        return false;
      }
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response ? error.response.data : error.message
      );
      return false;
    }
  };

  const handleSubmitNote = async (e, index, oId) => {
    e.preventDefault();
    const finalNote = e.target.elements[0].value.trim();
    if (finalNote) {
      const flatIndex = tableData
        .flatMap((t) => t.items)
        .findIndex((_, i) => i === index);
      const tableIndex = tableData.findIndex((t) =>
        t.items.includes(tableData.flatMap((t) => t.items)[flatIndex])
      );
      const itemIndex = tableData[tableIndex].items.findIndex(
        (item) => item === tableData.flatMap((t) => t.items)[flatIndex]
      );

      const tableId = tableData[tableIndex].id;
      const itemId = tableData[tableIndex].items[itemIndex].item_id;

      const success = await addNoteToDatabase(oId, finalNote);

      if (success) {
        handleNoteChange(index, finalNote);
      } else {
        // Handle error - maybe show an error message to the user
        console.error("Failed to add note to database");
      }
    }

    const updatedAddNotes = [ ...addNotes ];
    updatedAddNotes[index] = false;
    setAddNotes(updatedAddNotes);
  };

  const handleNoteChange = (index, note) => {
    const updatedTableData = [ ...tableData ];
    const flatIndex = tableData
      .flatMap((t) => t.items)
      .findIndex((_, i) => i === index);
    const tableIndex = tableData.findIndex((t) =>
      t.items.includes(tableData.flatMap((t) => t.items)[flatIndex])
    );
    const itemIndex = tableData[tableIndex].items.findIndex(
      (item) => item === tableData.flatMap((t) => t.items)[flatIndex]
    );
    updatedTableData[tableIndex].items[itemIndex].notes = note;
    setTableData(updatedTableData);
  };

  const handleAddNoteClick = (index) => {
    const updatedAddNotes = [ ...addNotes ];
    updatedAddNotes[index] = true;
    setAddNotes(updatedAddNotes);
  };
  const validateForm = () => {
    let errors = {};

    // Validate payment type selection
    if (selectedCheckboxes.length === 0) {
      errors.paymentType = "Por favor seleccione un tipo de pago";
    }

    const totalWithTax = tableData[0].order_total + (tableData[0].order_total *0.12)+ tipAmount - tableData[0].discount;
    // Validate payment amount
    if (!customerData.amount || parseFloat(customerData.amount) <= 0) {
      errors.amount = "Por favor, introduzca un importe de pago válido";
    } else if (parseFloat(customerData.amount) < totalWithTax.toFixed(2)) {
      errors.amount = "El monto del pago debe cubrir el costo total";
    }

    return errors;
  };

  const handleSubmit = async () => {
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      // Display errors to user
      setFormErrors(errors);
      return;
    }

    
    const paymentData = {
      ...payment,
      amount: customerData.amount,
      type: selectedCheckboxes[0],
      order_master_id:tableData[0].id,
      return: customerData.turn
    };
    console.log(paymentData)

  
    const responsePayment= await axios.post(
      `${apiUrl}/payment/insert`,
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    const response = await axios.post(`${apiUrl}/order/orderUpdateItem/${tableData[0].id}`,{
      tip:tipAmount,
      payment_type:selectedCheckboxes[0]
    },
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })


    setTipAmount('');
    setFormErrors({});
    setPrice('');
    setCustomerData({});
setSelectedCheckboxes([]);
navigate('/table')

    // localStorage.removeItem("cartItems");
    // localStorage.removeItem("currentOrder");
    // localStorage.removeItem("payment");
    // handleShow11();
  };


  return (
    <div className="s_bg_dark">
      <Header />
      <div className="j-flex">
        <div>
          <Sidenav />
        </div>
        <div className="flex-grow-1 sidebar j-position-sticky text-white">
          <div className="j-counter-header">
            <Link to={"/table"}>
              <div className="j-table-datos-btn">
                <button className="bj-btn-outline-primary btn j-tbl-btn-font-1 ">
                  <HiOutlineArrowLeft className="j-table-datos-icon" />Regresar
                </button>
              </div>
            </Link>
            <h2 className="text-white j-table-font-1 mb-0">Mesa {tId}</h2>
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
                    to={`/table/datos?id=${tId}`}
                    className="text-decoration-none px-2  sj_text_medium"
                  >
                    <FaCircleCheck className="mx-1" />
                    <span>Datos</span>
                  </Link>
                </div>
                <div className="line2  flex-grow-1 text-end">
                  <Link className="text-decoration-none px-2 sj_text_blue">
                    <FaCircleCheck className="mx-1" />
                    <span>Pago</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className=" mt-4 mx-4 sj_hwidth">
            <div className="bg_gay p-4">
              <div className="j-final-stage mb-2">
                <h5>Tipos de pago</h5>
                <div className="d-flex align-items-center">
                  <button
                    data-bs-theme="dark"
                    className="j_drop btn j-btn-primary j-tbl-font-3"
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
                    <Modal.Title className="j-tbl-text-10">
                      Agregar propina
                    </Modal.Title>
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
                        value={`$${price}`}
                        onChange={handleprice}
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
                  <Modal.Header closeButton className="border-0" />
                  <Modal.Body>
                    <div className="text-center">
                      <img src={require("../Image/check-circle.png")} alt="" />
                      <p className="mb-0 mt-2 h6 j-tbl-pop-1">
                        Propina agregada
                      </p>
                      <p className="opacity-75 j-tbl-pop-2">
                        Su propina ha sido agregada exitosamente
                      </p>
                    </div>
                  </Modal.Body>
                </Modal>
              </div>

              <p className="j-final-p">Puedes seleccionar uno o mas</p>
              <hr className="sj_bottom" />
              {formErrors.paymentType && (
                  <p className="errormessage text-danger">
                    {formErrors.paymentType}
                  </p>
                )}
              <Accordion className="sj_accordion" alwaysOpen>
                  <Accordion.Item eventKey="0" className="mb-2">
                    <Accordion.Header>
                      <div
                        onClick={() => handleCheckboxChange("cash")}
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes(
                          "cash"
                        )
                          ? "active"
                          : ""}`}
                      >
                        <input
                          type="checkbox"
                          name="receiptType"
                          value="cash"
                          checked={selectedCheckboxes.includes("cash")}
                          onChange={() => handleCheckboxChange("cash")}
                          className="me-2 j-change-checkbox"
                        />

                        <p className="d-inline px-3">Efectivo</p>
                      </div>
                    </Accordion.Header>
                    {selectedCheckboxes.includes("cash") && (
                      <Accordion.Body>
                        <div className="sj_gay_border px-3 py-4 mt-2">
                          <form className="j_payment_flex">
                            <div className="flex-grow-1 j_paymemnt_margin">
                              <label className="mb-2">Cantidad</label>
                              <br />
                              <input
                                type="text"
                                id="name"
                                name="amount"
                                value={`$${customerData.amount || ""}`}
                                onChange={handleChange}
                                className="input_bg_dark w-full px-4 py-2 text-white sj_width_mobil"
                              />
                              {formErrors.amount && (
                                <p className="errormessage text-danger">
                                  {formErrors.amount}
                                </p>
                              )}
                            </div>
                            <div className="flex-grow-1">
                              <label className="mb-2">Vuelto</label>
                              <br />
                              <input
                                type="email"
                                id="email"
                                name="turn"
                                value={`$${customerData.turn || ""}`}
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
                        onClick={() => handleCheckboxChange("debit")}
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes(
                          "debit"
                        )
                          ? "active"
                          : ""}`}
                      >
                        <input
                          type="checkbox"
                          name="receiptType"
                          value="debit"
                          checked={selectedCheckboxes.includes("debit")}
                          onChange={() => handleCheckboxChange("debit")}
                          className="me-2 j-change-checkbox"
                        />

                        <p className="d-inline px-3">Tarjeta de debito</p>
                      </div>
                    </Accordion.Header>
                    {selectedCheckboxes.includes("debit") && (
                      <Accordion.Body>
                        <div className="sj_gay_border px-3 py-4 mt-2">
                          <form>
                            <label className="mb-2 sjfs-16">Cantidad</label>
                            <br />
                            <input
                              type="text"
                              id="name"
                              name="amount"
                              value={`$${customerData.amount || ""}`}
                              onChange={handleChange}
                              className="sj_bg_dark sj_width_input px-4 py-2 text-white"
                            />
                            {formErrors.amount && (
                              <p className="errormessage text-danger">
                                {formErrors.amount}
                              </p>
                            )}
                          </form>
                        </div>
                      </Accordion.Body>
                    )}
                  </Accordion.Item>
                  <Accordion.Item eventKey="2" className="mb-2">
                    <Accordion.Header>
                      <div
                        onClick={() => handleCheckboxChange("credit")}
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes(
                          "credit"
                        )
                          ? "active"
                          : ""}`}
                      >
                        <input
                          type="checkbox"
                          name="receiptType"
                          value="credit"
                          checked={selectedCheckboxes.includes("credit")}
                          onChange={() => handleCheckboxChange("credit")}
                          className="me-2 j-change-checkbox"
                        />
                        <p className="d-inline px-3">Tarjeta de credito</p>
                      </div>
                    </Accordion.Header>
                    {selectedCheckboxes.includes("credit") && (
                      <Accordion.Body>
                        <div className="sj_gay_border px-3 py-4 mt-2">
                          <form className="j_payment_flex">
                            <div className=" flex-grow-1 j_paymemnt_margin">
                              <label className="mb-2">Cantidad</label>
                              <br />
                              <input
                                type="text"
                                id="name"
                                name="amount"
                                value={`$${customerData.amount || ""}`}
                                className="input_bg_dark w-full px-4 py-2 text-white sj_width_mobil"
                              />
                              {formErrors.amount && (
                                <p className="errormessage text-danger">
                                  {formErrors.amount}
                                </p>
                              )}
                            </div>
                          </form>
                        </div>
                      </Accordion.Body>
                    )}
                  </Accordion.Item>
                  <Accordion.Item eventKey="3" className="mb-2">
                    <Accordion.Header>
                      <div
                        onClick={() => handleCheckboxChange("transfer")}
                        className={`sj_bg_dark px-4 py-2 sj_w-75 ${selectedCheckboxes.includes(
                          "transfer"
                        )
                          ? "active"
                          : ""}`}
                      >
                        <input
                          type="checkbox"
                          name="receiptType"
                          value="4"
                          checked={selectedCheckboxes.includes("transfer")}
                          onChange={() => handleCheckboxChange("transfer")}
                          className="me-2 j-change-checkbox"
                        />
                        <p className="d-inline px-3">Transferencia</p>
                      </div>
                    </Accordion.Header>
                    {selectedCheckboxes.includes("transfer") && (
                      <Accordion.Body>
                        <div className="sj_gay_border px-3 py-4 mt-2">
                          <form>
                            <label className="mb-2 sjfs-16">Cantidad</label>
                            <br />
                            <input
                              type="text"
                              id="name"
                              name="amount"
                              value={`$${customerData.amount || ""}`}
                              onChange={handleChange}
                              className="sj_bg_dark sj_width_input px-4 py-2 text-white"
                            />
                            {formErrors.amount && (
                              <p className="errormessage text-danger">
                                {formErrors.amount}
                              </p>
                            )}
                          </form>
                        </div>
                      </Accordion.Body>
                    )}
                  </Accordion.Item>
                </Accordion>
            </div>
          </div>
        </div>
        <div
          className="j-counter-price position-sticky"
          style={{ top: "77px" }}
        >
          <div className="j_position_fixed j_b_hd_width">
            <h2 className="text-white j-tbl-text-13">Resumen</h2>
            <div className="j-counter-price-data">
              <h3 className="text-white mt-3 j-tbl-text-13">Datos</h3>
              <div className="j_td_center my-3">
                <div className="j-busy-table j_busy_table_last d-flex align-items-center">
                  <div className="j-b-table" />
                  <p className="j-table-color j-tbl-font-6">Ocupado</p>
                </div>

                <div className="b-date-time b_date_time2  d-flex align-items-center">
                  <svg
                    class="j-canvas-svg-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clip-rule="evenodd"
                    />
                  </svg>

                  <p className="mb-0 ms-2 me-3 text-white j-tbl-font-6">
                   {elapsedTime}
                  </p>
                </div>
              </div>

              <div className="j-counter-price-data">
                <div className="j-orders-inputs j_td_inputs">
                  <div className="j-orders-code">
                    <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                      Quién registra
                    </label>
                    <div>
                      <input
                        className="j-input-name j_input_name520"
                        type="text"
                        placeholder="Lucia Lopez"
                        value={tableData[0]?.customer_name}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="j-orders-code">
                    <label className="j-label-name j-tbl-btn-font-1 text-white mb-2">
                      Personas
                    </label>
                    <div>
                      <input
                        className="j-input-name630"
                        type="text"
                        placeholder="5"
                        value={tableData[0]?.person}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
                <div className="j-counter-order">
                  <h3 className="text-white j-tbl-pop-1">Pedido </h3>
                 
                  <div className="j-counter-order-data j_counter_order_width j_counter_order_width_extra">
                    {(tableData && tableData.length > 0
                          ? tableData[0].items
                          : cartItems)
                          .slice(
                            0,
                            showAllItems
                              ? tableData && tableData.length > 0
                                ? tableData[0].items.length
                                : cartItems.length
                              : 3
                          )
                          .map((item, index) => {
                            const itemInfo = getItemInfo(
                              item.item_id || item.id
                            );
                            return (
                        <div
                          className="j-counter-order-border-fast"
                          key={item.id}
                        >
                          <div className="j-counter-order-img j_counter_order_img_last">
                            <div className="j_d_flex_aic">
                            <img
                                      src={`${API}/images/${itemInfo.image}`}
                                      alt=""
                                    />
                              <h5 className="text-white j-tbl-font-5">
                                {itemInfo.name}
                              </h5>
                            </div>
                            <div className="d-flex align-items-center">
                              <div className="j-counter-mix">
                             
                                <h3> {item.quantity}</h3>
                              
                              </div>
                              <h4 className="text-white fw-semibold">
                                ${parseInt(item.amount) }
                              </h4>
                              
                            </div>
                          </div>
                          <div className="text-white j-order-count-why">
                                {item.notes ? (
                                    <span className="j-nota-blue">
                                      Nota: {item.notes}
                                    </span>
                                  ) : (
                                    <div>
                                      {addNotes[index] ? (
                                        <form
                                          onSubmit={(e) =>
                                            handleSubmitNote(e, index, item.id)}
                                        >
                                          <span className="j-nota-blue">
                                            Nota:{" "}
                                          </span>
                                          <input
                                            className="j-note-input"
                                            type="text"
                                            defaultValue={item.notes || ""}
                                            autoFocus
                                          />
                                        </form>
                                      ) : (
                                        <button
                                          type="button"
                                          className="j-note-final-button"
                                          onClick={() =>
                                            handleAddNoteClick(index)}
                                        >
                                          + Agregar nota
                                        </button>
                                      )}
                                    </div>
                                  )}
                                </div>
                        </div>
                       );
                    })}
                         {tableData[0]?.items.length > 3 && (
                              <Link
                                onClick={toggleShowAllItems}
                                className="sjfs-14"
                              >
                                {showAllItems ? "Ver menos" : "Ver más"}
                              </Link>
                            )}
                    </div>
                  <div className="j-counter-total">
                    <h5 className="text-white j-tbl-text-15">Costo total</h5>
                    <div className="j-total-discount d-flex justify-content-between">
                      <p className="j-counter-text-2">Artículos</p>
                      <span className="text-white">
                      {tableData.map((item) => (
                                <span key={item.id}>
                                  ${parseFloat(item.order_total).toFixed(2)}
                                </span>
                              ))}
                      </span>
                    </div>
                    {tipAmount > 0 && (
                          <div className="j-total-discount d-flex justify-content-between">
                            <p className="j-counter-text-2">Propina</p>
                            <span className="text-white">
                              ${tipAmount.toFixed(2)}
                            </span>
                          </div>
                        )}
                    <div className="">
                      <div className="j-total-discount d-flex justify-content-between">
                        <p className="j-counter-text-2">Descuentos</p>
                        <span className="text-white">
                        {tableData.map((item) => (
                                <span key={item.id}>
                                  ${parseFloat(item.discount).toFixed(2)}
                                </span>
                              ))}
                        </span>
                      </div>
                    </div>
                    <div className="j-border-bottom-counter">
                          <div className="j-total-discount d-flex justify-content-between">
                            <p className="j-counter-text-2">IVA 12.00%</p>
                            <span className="text-white">{tableData.map((item) => (
                                <span key={item.id}>
                                  ${parseFloat(item.order_total * 0.12).toFixed(2)}
                                </span>
                              ))}
                            </span>
                          </div>
                        </div>
                    <div className="j-total-discount my-2 d-flex justify-content-between">
                      <p className="text-white bj-delivery-text-153 ">Total</p>
                      <span className="text-white bj-delivery-text-153 ">
                      {tableData.map((item) => (
                              <span key={item.id}>
                                ${" "}
                                {parseFloat(
                                  item.order_total + (item.order_total *0.12) - item.discount + tipAmount
                                ).toFixed(2)}
                              </span>
                            ))}
                      </span>
                    </div>
                    <div
                       onClick={handleSubmit}
                      className="btn w-100 j-btn-primary text-white j-tbl-btn-font-1"
                    >
                      Cobrar
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TablePago;
