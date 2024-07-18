import React, { useRef, useState } from "react";
import Header from "./Header";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { BsThreeDots } from "react-icons/bs";
import img1 from "../Image/Strawberry-gelatin.png";
import TableCard from "./TableCard";
import { Offcanvas } from "react-bootstrap";
import { MdRoomService } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import pic2 from "../img/Image(1).jpg"
import TableRecipt from "./TableRecipt";

const Tables = () => {
  const [Datelast, setDatelast] = useState("30 min  20 sg");
  const [selectedSectors, setSelectedSectors] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedSectors((prevSelectedSectors) =>
      prevSelectedSectors.includes(index)
        ? prevSelectedSectors.filter((i) => i !== index)
        : [...prevSelectedSectors, index]
    );
  };




  const [selectedStatus, setSelectedStatus] = useState("All");

  const handleStatusFilter = (status) => {
    setSelectedStatus(status);
  };

  const filteredTables = () => {
    if (selectedSectors.length === 0 && selectedStatus === "All") {
      return obj1;
    }

    let filteredData = obj1;

    if (selectedSectors.length > 0) {
      filteredData = selectedSectors.flatMap((sector) => {
        const startIndex = sector * 5;
        return obj1.slice(startIndex, startIndex + 5);
      });
    }

    if (selectedStatus !== "All") {
      filteredData = filteredData.filter((table) => table.status === selectedStatus);
    }

    return filteredData;
  };

  // Add product
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // create family
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // create subfamily
  const [showCreSub, setShowCreSub] = useState(false);
  const handleCloseCreSub = () => setShowCreSub(false);
  const handleShowCreSub = () => setShowCreSub(true);

  // create family success
  const [showCreSuc, setShowCreSuc] = useState(false);
  const handleCloseCreSuc = () => setShowCreSuc(false);
  const handleShowCreSuc = () => {
    setShowCreSuc(true)
    setTimeout(() => {
      setShowCreSuc(false)
    }, 2000);
  };

  const [showCreSuc2, setShowCreSuc2] = useState(false);
  const handleCloseCreSuc2 = () => setShowCreSuc2(false);
  const handleShowCreSuc2 = () => {
    setShowCreSuc2(true)
    setTimeout(() => {
      setShowCreSuc2(false)
    }, 2000);
  };

  // create subfamily success
  const [showCreSubSuc, setShowCreSubSuc] = useState(false);
  const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
  const handleShowCreSubSuc = () => setShowCreSubSuc(true);

  // edit family
  const [showEditFam, setShowEditFam] = useState(false);
  const handleCloseEditFam = () => setShowEditFam(false);
  const handleShowEditFam = () => setShowEditFam(true);

  // edit family Success
  const [showEditFamSuc, setShowEditFamSuc] = useState(false);
  const handleCloseEditFamSuc = () => setShowEditFamSuc(false);
  const handleShowEditFamSuc = () => {
    setShowEditFamSuc(true)
    setTimeout(() => {
      setShowEditFamSuc(false)
    }, 2000);
  };

  // edit family Eliminat
  const [showEditFamDel, setShowEditFamDel] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = () => {
    setShowEditFamDel(true)
    setTimeout(() => {
      setShowEditFamDel(false)
    }, 2000);
  };

  const checkboxs = [
    {
      menu: "Sector 1",
    },
    {
      menu: "Sector 2",
    },
    {
      menu: "Sector 3",
    },
    {
      menu: "Sector 4",
    },
    {
      menu: "Sector 5",
    },
  ];
  const handleChildCheckboxChange = (parentKey, childKey) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        children: {
          ...prevState[parentKey].children,
          [childKey]: !prevState[parentKey].children[childKey],
        },
      },
    }));
  };


  const [checkboxes, setCheckboxes] = useState({
    Sector1: {
      isChecked: false,
    },
    Sector2: {
      isChecked: false,
    },
    Sector3: {
      isChecked: false,
    },
    Sector4: {
      isChecked: false,
    },
  });
  const handleParentCheckboxChange = (parentKey) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        isChecked: !prevState[parentKey].isChecked,
      },
    }));
  };

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
  const [showAllItems, setShowAllItems] = useState(false);
  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };



  const [cartItems, setCartItems] = useState(orderitem);
  const [countsoup, setCountsoup] = useState(orderitem.map(item => parseInt(item.quantity)));

  const [addNotes, setaddNotes] = useState(Array(orderitem.length).fill(false));

  const handleNoteChange = (index, note) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].note = note;
    setCartItems(updatedCartItems);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      const updatedaddNotes = [...addNotes];
      updatedaddNotes[index] = false;
      setaddNotes(updatedaddNotes);
    }
  };

  const handleAddNoteClick = (index) => {
    const updatedaddNotes = [...addNotes];
    updatedaddNotes[index] = true;
    setaddNotes(updatedaddNotes);

    // Set default note when starting to edit
    const updatedCartItems = [...cartItems];
    if (!updatedCartItems[index].note) {
      updatedCartItems[index].note = 'Nota: ';
      setCartItems(updatedCartItems);
    }
  };

  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const obj1 = [
    {
      no: "1",
      status: "Disponible"
    },
    {
      no: "2",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "3",
      status: "Disponible"
    },
    {
      no: "4",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "5",
      status: "Disponible"
    },
    {
      no: "6",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "7",
      status: "Disponible"
    },
    {
      no: "8",
      status: "Disponible"
    },
    {
      no: "9",
      status: "Disponible"
    },
    {
      no: "10",
      status: "Disponible"
    },
    {
      no: "11",
      status: "Disponible"
    },
    {
      no: "12",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado",
    },
    {
      no: "13",
      status: "Disponible"
    },
    {
      no: "14",
      status: "Disponible"
    },
    {
      no: "15",
      status: "Disponible"
    },
    {
      no: "16",
      status: "Disponible"
    },
    {
      no: "17",
      status: "Disponible"
    },
    {
      no: "18",
      status: "Disponible"
    },
    {
      no: "19",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "20",
      status: "Disponible"
    },
    {
      no: "21",
      status: "Disponible"
    },
    {
      no: "22",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "23",
      status: "Disponible"
    },
    {
      no: "24",
      name: "Nombre de Garzón",
      code: "Pedido: 01234",
      status: "Ocupado"
    },
    {
      no: "25",
      status: "Disponible"
    },
  ];

  const [showAvailableModal, setShowAvailableModal] = useState(false);
  const [showOcupadoModal, setShowOcupadoModal] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleCloseAvailableModal = () => setShowAvailableModal(false);
  const handleShowAvailableModal = (tableNo) => {
    setSelectedTable(tableNo);
    setShowAvailableModal(true);
    setShowOcupadoModal(false);
  };

  const handleCloseOcupadoModal = () => setShowOcupadoModal(false);
  const handleShowOcupadoModal = (tableNo) => {
    setSelectedTable(tableNo);
    setShowOcupadoModal(true);
    setShowAvailableModal(false);
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item, index) => total + parseFloat(item.price) * countsoup[index], 0);
  };

  const totalCost = getTotalCost();
  const discount = 1.0;
  const finalTotal = totalCost - discount;


  // create recipe
  const [show250, setShow250] = useState(false);
  const handleClose250 = () => setShow250(false);
  const handleShow250 = () => setShow250(true);


  return (
    <>
      <Header />
      <div className="d-flex">
        <Sidenav />
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white m_borbot j-tbl-font-1 jay-table-fixed-kya">
            <h5 className="mb-0 j-tbl-font-1">Mesas</h5>
          </div>

          <div className="row ">
            <div className="col-3 j-card-width1 m_bgblack j-table-position j-border-right m-0 p-0  m_borrig ">
              <div className="ms-3 pe-3 j-table-position-sticky">
                <div className="m_borbot ">
                  <p className="text-white j-tbl-font-2">Sectores</p>
                  <div className="d-flex align-items-center">
                    <Button
                      data-bs-theme="dark"
                      className="j_drop b_btn_pop  j-tbl-font-3 mb-3"
                      onClick={handleShow}
                    >
                      <FaPlus className="j-icon-font-1" />
                      Crear sector
                    </Button>
                  </div>
                </div>
              </div>
              {/* CRAETE family */}
              <Modal
                show={show}
                onHide={handleClose}
                backdrop={true}
                keyboard={false}
                className="m_modal"
              >
                <Modal.Header closeButton className="b_border_bb1 px-0">
                  <Modal.Title className="j-tbl-text-10">Crear sector</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0 pb-0">
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label j-tbl-font-11"
                    >
                      Nombre
                    </label>
                    <input
                      type="text"
                      className="form-control j-table_input"
                      id="exampleFormControlInput1"
                      placeholder="Eje. Sector 1"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="exampleFormControlInput1"
                      className="form-label j-tbl-font-11"
                    >
                      Número de mesas
                    </label>
                    <input
                      type="text"
                      className="form-control j-table_input"
                      id="exampleFormControlInput1"
                      placeholder="0"
                    />
                  </div>
                </Modal.Body>
                <Modal.Footer className="border-0">
                  <Button
                    className="j-tbl-btn-font-1 b_btn_pop"
                    variant="primary"
                    onClick={() => {
                      handleShowCreSuc();
                      handleClose();
                    }}
                  >
                    Crear
                  </Button>
                </Modal.Footer>
              </Modal>

              {/* subfamily success */}
              <Modal
                show={showCreSubSuc}
                onHide={handleCloseCreSubSuc}
                backdrop={true}
                keyboard={false}
                className="m_modal"
              >
                <Modal.Header closeButton className="border-0"></Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <img src={require("../Image/check-circle.png")} alt="" />
                    <p className="mb-0 mt-2 h6">Subfamilia</p>
                    <p className="opacity-75">creada exitosamente</p>
                  </div>
                </Modal.Body>
              </Modal>

              {/* family success */}
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

              <Modal
                show={showCreSuc2}
                onHide={handleCloseCreSuc2}
                backdrop={true}
                keyboard={false}
                className="m_modal"
              >
                <Modal.Header closeButton className="border-0"></Modal.Header>
                <Modal.Body>
                  <div className="text-center">
                    <img src={require("../Image/check-circle.png")} alt="" />
                    <p className="mb-0 mt-2 h6 j-tbl-pop-1">Mesas</p>
                    <p className="opacity-75 j-tbl-pop-2">La mesas han sido agregadas exitosamente</p>
                  </div>
                </Modal.Body>
              </Modal>

              <div className="py-3 m_borbot ms-3 j-table-position-sticky-sector pe-3 me-3">
                {checkboxs.map((item, index) => (
                  <div key={index}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="text-nowrap">
                        <label className="d-flex align-items-center">
                          <input
                            type="checkbox"
                            className="me-2 custom-checkbox"
                            checked={selectedSectors.includes(index)}
                            onChange={() => handleCheckboxChange(index)}
                          />
                          <p className="mb-0 j-tbl-font-4">{item.menu}</p>
                        </label>
                      </div>
                      <div
                        className="text-white"
                        style={{ cursor: "pointer" }}
                        onClick={handleShowEditFam}
                      >
                        <BsThreeDots className="j-tbl-dot-color" />
                      </div>


                    </div>
                  </div>
                ))}

              </div>
            </div>
            <div className=" col-9 j-card-width2 j-table-position-second m-0 p-0">
              <div className="m_bgblack j-tbl-font-5 j-block text-white">
                <h6 className="mb-0">Mesas</h6>
                <div>
                  <Button className="j-blue-button b_btn_pop   j-tbl-font-3" variant="primary" onClick={handleShow1}>
                    <FaPlus className="j-icon-font-1" />
                    Agregar mesa
                  </Button>
                  <Modal
                    show={show1}
                    onHide={handleClose1}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal"
                  >
                    <Modal.Header closeButton className="m_borbot b_border_bb1">
                      <Modal.Title className="j-tbl-text-10">Agregar mesa</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label j-tbl-font-11"
                        >
                          Sector
                        </label>
                        <select className="form-select form-control j-table_input">
                          <option value="0">Seleccionar sector</option>
                          <option value="1">sector 1</option>
                          <option value="2">sector 2</option>
                          <option value="3">sector 3</option>
                          <option value="4">sector 4</option>
                          <option value="5">sector 5</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label j-tbl-font-11"
                        >
                          Número de mesas nuevas
                        </label>
                        <input
                          type="text"
                          className="form-control j-table_input"
                          id="exampleFormControlInput1"
                          placeholder="5"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button
                        className="j-tbl-font-11 b_btn_pop "
                        variant="primary"
                        onClick={() => {
                          handleShowCreSuc2();
                          handleClose1();
                        }}
                      >
                        Agregar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>

              <div className="j-show-table pb-3">
                <div className="d-flex">
                  <div onClick={() => handleStatusFilter("Disponible")} className="j-available-table d-flex align-items-center">
                    <div className="j-a-table">
                    </div>
                    <p className="j-table-color j-tbl-font-6">Disponible</p>
                  </div>
                  <div onClick={() => handleStatusFilter("Ocupado")} className="j-busy-table d-flex align-items-center">
                    <div className="j-b-table">
                    </div>
                    <p className="j-table-color  j-tbl-font-6">Ocupado</p>
                  </div>
                </div>
                <div className="">
                  <p className="j-table-all-color  j-tbl-font-6" onClick={() => handleStatusFilter("All")}>Reiniciar</p>
                </div>
              </div>

              <div className="j-table-bgcolor row p-4">
                {filteredTables().map((ele, index) => (
                  <div className="j-table-width" key={index}>
                    <TableCard
                      onShowAvailableModal={() => handleShowAvailableModal(ele.no)}
                      onShowOcupadoModal={() => handleShowOcupadoModal(ele.no)}
                      name={ele.name}
                      no={ele.no}
                      code={ele.code}
                      status={ele.status}
                      selectedTable={selectedTable}
                      setSelectedTable={setSelectedTable}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div >

        {/* {/ Edit family /} */}
        <Modal
          show={showEditFam}
          onHide={handleCloseEditFam}
          backdrop={true}
          keyboard={false}
          className="m_modal jay-modal"
        >
          <Modal.Header closeButton className="j-caja-border-bottom p-0 m-3 mb-0 pb-3">
            <Modal.Title className="j-tbl-text-12">Editar sector</Modal.Title>
          </Modal.Header>
          <Modal.Body className="border-0">
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label j-tbl-btn-font-1"
              >
                Nombre
              </label>
              <input
                type="text"
                className="form-control j-table_input"
                id="exampleFormControlInput1"
                placeholder="Sector 1"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlInput1"
                className="form-label j-tbl-btn-font-1"
              >
                Número de mesas
              </label>
              <input
                type="text"
                className="form-control j-table_input"
                id="exampleFormControlInput1"
                placeholder="10"
              />
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              className="j-tbl-btn-font-1 b_btn_close  "
              variant="danger"
              onClick={() => {
                handleCloseEditFam();
                handleShowEditFamDel();
              }}
            >
              Eliminar
            </Button>
            <Button
              className="j-tbl-btn-font-1 b_btn_pop"
              variant="primary"
              onClick={() => {
                handleCloseEditFam();
                handleShowEditFamSuc();
              }}
            >
              Guardar cambios
            </Button>
          </Modal.Footer>
        </Modal>
        {/* {/ edit family success /}  */}
        <Modal
          show={showEditFamSuc}
          onHide={handleCloseEditFamSuc}
          backdrop={true}
          keyboard={false}
          className="m_modal jay-modal"
        >
          <Modal.Header
            closeButton
            className="border-0"
          ></Modal.Header>
          <Modal.Body>
            <div className="text-center">
              <img
                src={require("../Image/check-circle.png")}
                alt=""
              />
              <p className="mb-0 mt-2 h6 j-tbl-pop-1">Cambios sector</p>
              <p className="opacity-75 j-tbl-pop-2">
                Se ha modificado exitosamente
              </p>
            </div>
          </Modal.Body>
        </Modal>

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
              <p className="mb-0 mt-3 h6 j-tbl-pop-1">Sector eliminado</p>
              <p className="opacity-75 j-tbl-pop-2">
                El sector ha sido eliminado correctamente
              </p>
            </div>
          </Modal.Body>
        </Modal>

        <Offcanvas placement="end" className="j-offcanvas" show={showAvailableModal}
          onHide={handleCloseAvailableModal}>
          <Offcanvas.Header closeButton className="j-close-btn">
            <Offcanvas.Title className="j-offcanvas-title text-white j-tbl-font-5">Mesa {selectedTable}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="j-canvas-buttons">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <Link to={"/table1"}
                  data-bs-theme="dark"
                  className="j-canvas-btn j-tbl-font-3"
                >
                  <FaPlus className="j-icon-font-1" />
                  Empezar pedido
                </Link>
              </div>
              <button
                data-bs-theme="dark"
                className="j-canvas-btn2 j-tbl-font-3  btn bj-btn-outline-primary"

              >
                <div className="d-flex align-items-center">
                  <svg className="j-canvas-btn-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                  </svg>
                  Editar
                </div>
              </button>
              <Link to={"/table/information"}>
                <button
                  data-bs-theme="dark"
                  className="j-canvas-btn2 btn bj-btn-outline-primary"

                >
                  <div className="d-flex align-items-center">
                    <svg className="j-canvas-btn-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                    </svg>
                    Información mesa
                  </div>
                </button>
              </Link>
            </div>
            <div className="j-available-table d-flex align-items-center mt-3">
              <div className="j-a-table">
              </div>
              <p className="j-table-color j-tbl-btn-font-1">Disponible</p>
            </div>

            <div className="b-product-order text-center">
              <MdRoomService className="i-product-order" />
              <h6 className="h6-product-order text-white j-tbl-pop-1">Mesa disponible</h6>
              <p className="p-product-order j-tbl-btn-font-1 ">Agregar producto para empezar<br />
                con el pedido de la mesa</p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Offcanvas placement="end" className="j-offcanvas" show={showOcupadoModal}
          onHide={handleCloseOcupadoModal}>
          <Offcanvas.Header closeButton className="j-close-btn">
            <Offcanvas.Title className="j-offcanvas-title text-white j-tbl-font-5">Mesa {selectedTable}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="j-canvas-buttons">
            <div className="d-flex">
              <div className="d-flex align-items-center">
                <Link to={"/table1"}
                  data-bs-theme="dark"
                  className="j-canvas-btn j-tbl-font-3"
                >
                  <FaPlus className="j-icon-font-1" />
                  Agregar producto
                </Link>
              </div>
              <button
                data-bs-theme="dark"
                className="j-canvas-btn2 j-tbl-font-3 btn bj-btn-outline-primary"
                onClick={handleEditClick}
              >
                <div className="d-flex align-items-center">
                  <svg className="j-canvas-btn-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd" />
                    <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd" />
                  </svg>
                  Editar
                </div>
              </button>
              <Link to={"/table/information"}>
                <Button data-bs-theme="dark"
                  className="j-canvas-btn2 j-tbl-font-3"
                  variant="outline-secondary"
                >
                  <div className="d-flex align-items-center">
                    <svg className="j-canvas-btn-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd" />
                    </svg>
                    Información mesa
                  </div>
                </Button>
              </Link>

            </div>




            {isEditing ? (
              <div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="j-busy-table d-flex align-items-center">
                    <div className="j-b-table"></div>
                    <p className="j-table-color j-tbl-font-6">Ocupado</p>
                  </div>
                  <div className="b-date-time d-flex align-items-center">
                    <svg className="j-canvas-svg-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                    </svg>
                    <p className="mb-0 ms-2 me-3 text-white j-tbl-font-6">{Datelast}</p>
                  </div>
                </div>
                <div className="j-counter-price-data">
                  <h3 className="text-white mt-3 j-tbl-text-13">Datos</h3>
                  <div className="j-orders-inputs">
                    <div className="j-orders-code">
                      <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                        Código pedido
                      </label>
                      <input className="j-input-name j-table_input" type="text" placeholder="01234" />
                    </div>
                    <div className="j-orders-code">
                      <label className="j-label-name d-block text-white mb-2 j-tbl-btn-font-1">
                        Personas
                      </label>
                      <input className="j-input-name j-table_input w-100" type="text" placeholder="5" />
                    </div>
                  </div>
                  <div className="j-counter-order">
                    <h3 className="text-white j-tbl-pop-1">Pedido </h3>
                    <div className="j-counter-order-data">
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
                      <h5 className="text-white j-tbl-text-15">Costo total</h5>
                      <div className="j-border-bottom32">
                        <div className="j-total-discount d-flex justify-content-between">
                          <p className="j-tbl-pop-2">Artículos</p>
                          <span className="text-white j-tbl-text-16">${totalCost.toFixed(2)}</span>
                        </div>
                        <div className="j-total-discount mb-2 d-flex justify-content-between">
                          <p className="j-tbl-pop-2">Descuentos</p>
                          <span className="text-white j-tbl-text-16">${discount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="j-total-discount my-2 d-flex justify-content-between">
                        <p className="text-white fw-semibold j-tbl-text-14">Total</p>
                        <span className="text-white fw-semibold j-tbl-text-14">
                          ${finalTotal.toFixed(2)}
                        </span>
                      </div>
                      <Link to={"/table/datos"} className="btn w-100 btn-primary text-white j-tbl-btn-font-1 mb-3">Cobrar pedido</Link>
                      <Link to={"/table/datos"} className="btn w-100 btn-outline-primary j-tbl-btn-font-1">Imprimir Precuenta</Link>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <div className="d-flex align-items-center justify-content-between mt-3">
                  <div className="j-busy-table d-flex align-items-center">
                    <div className="j-b-table"></div>
                    <p className="j-table-color j-tbl-font-6">Ocupado</p>
                  </div>
                  <div className="b-date-time d-flex align-items-center">
                    <svg className="j-canvas-svg-i" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                    </svg>
                    <p className="mb-0 ms-2 me-3 text-white j-tbl-font-6">30 min  20 sg</p>
                  </div>
                </div>
                <div className="j-counter-price-data">
                  <h3 className="text-white mt-3 j-tbl-text-13">Datos</h3>
                  <div className="j-orders-inputs">
                    <div className="j-orders-code">
                      <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                        Código pedido
                      </label>
                      <input className="j-input-name j-table_input" type="text" placeholder="01234" />
                    </div>
                    <div className="j-orders-code">
                      <label className="j-label-name d-block text-white mb-2 j-tbl-btn-font-1">
                        Personas
                      </label>
                      <input className="j-input-name j-table_input w-100" type="text" placeholder="5" />
                    </div>
                  </div>
                  <div className="j-counter-order">
                    <h3 className="text-white j-tbl-pop-1">Pedido </h3>
                    <div className={"j-counter-order-data"}>
                      {cartItems.map((item, index) => (
                        <div className="j-counter-order-border-fast j-counter-order-border-fast-margin" key={index}>
                          <div className="j-counter-order-img">
                            <div className="d-flex align-items-center justify-content-between">
                              <img src={item.image} alt="" />
                              <h5 className="text-white j-tbl-font-5">{item.name}</h5>
                            </div>
                            <div className="d-flex align-items-center">
                              <p className="text-white fw-semibold mb-0 me-5">
                                {item.quantity}
                              </p>
                              <h4 className="text-white fw-semibold mb-0">
                                ${item.price}
                              </h4>
                            </div>
                          </div>
                          <div key={index} className="text-white j-order-count-why">
                            {addNotes[index] ? (
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
                                  <button className="j-note-final-button" onClick={() => handleAddNoteClick(index)}>+ Agregar nota</button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      <div class="j-counter-order-data"><Link class="j-tbl-pop-2">Ver más</Link></div>
                      {cartItems.length > 3 && (
                        <Link onClick={toggleShowAllItems} className="sjfs-14">
                          {showAllItems ? 'Ver menos' : 'Ver más'}
                        </Link>
                      )}
                    </div>
                    <div className="j-counter-total-2">
                      <h5 className="text-white j-tbl-text-15 ">Costo total</h5>
                      <div className="j-border-bottom32">
                        <div className="j-total-discount d-flex justify-content-between">
                          <p className="j-tbl-pop-2">Artículos</p>
                          <span className="text-white j-tbl-text-16">${totalCost.toFixed(2)}</span>
                        </div>
                        <div className="j-total-discount mb-2 d-flex justify-content-between">
                          <p className="j-tbl-pop-2">Descuentos</p>
                          <span className="text-white j-tbl-text-16">${discount.toFixed(2)}</span>
                        </div>
                      </div>
                      <div className="j-total-discount my-2 d-flex justify-content-between">
                        <p className="text-white fw-semibold j-tbl-text-14">Total</p>
                        <span className="text-white fw-semibold j-tbl-text-14">${finalTotal.toFixed(2)}</span>
                      </div>
                      <Link to={"/table/datos"} className="btn w-100 j-btn-primary text-white j-tbl-btn-font-1 mb-3">Cobrar</Link>
                      <div onClick={handleShow250} className="btn j_table_print w-100 j-tbl-btn-font-1">Imprimir precuenta</div>
                      <Modal
                        show={show250}
                        onHide={handleClose250}
                        backdrop="static"
                        keyboard={false}
                        className="jay_TableRecipt"
                      >
                        <Modal.Header closeButton className="border-0">
                        </Modal.Header>
                        <Modal.Body className="border-0">
                          <TableRecipt />
                        </Modal.Body>
                        {/* <Modal.Footer className="border-0">
                          <Button
                            className="j-tbl-btn-font-1"
                            variant="primary"
                            onClick={handleClose250}
                          >
                            Agregar
                          </Button>
                        </Modal.Footer> */}
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Offcanvas.Body>
        </Offcanvas>



      </div >

    </>
  );
};


export default Tables;
