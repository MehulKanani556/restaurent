import React, { useState, useRef } from "react";
import Header from "./Header";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { BsThreeDots } from "react-icons/bs";
import SingProd from "./SingProd";
import img1 from "../Image/Image (3).jpg";
import { Link } from "react-router-dom";
import { Badge, DropdownButton } from "react-bootstrap";
import { FaCartPlus, FaFilter } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { IoMdInformationCircle } from "react-icons/io";
import img2 from "../Image/addmenu.jpg";

export default function ProductionCenter() {
  // create production center
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // create production success
  const [showCreSucProduction, setShowCreSucProduction] = useState(false);
  const handleCloseCreSucProduction = () => setShowCreSucProduction(false);
  const handleShowCreSucProduction = () => {
    setShowCreSucProduction(true)
    setTimeout(() => {
      setShowCreSucProduction(false);
    }, 2000);
  };

  // Add producttion
  const [show1Prod, setShow1Prod] = useState(false);
  const handleClose1Prod = () => {
    setShow1Prod(false)
    setCount(0);
  };
  const handleShow1Prod = () => setShow1Prod(true);

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true)
    setTimeout(() => {
      setShow1AddSuc(false);
    }, 2000);
  };



  // edit family
  const [showEditProduction, setShowEditProduction] = useState(false);
  const handleCloseEditProduction = () => setShowEditProduction(false);
  const handleShowEditProduction = () => setShowEditProduction(true);

  // edit family Success
  const [showEditProductionSuc, setShowEditProductionSuc] = useState(false);
  const handleCloseEditProductionSuc = () => setShowEditProductionSuc(false);
  const handleShowEditProductionSuc = () => {
    setShowEditProductionSuc(true)
    setTimeout(() => {
      setShowEditProductionSuc(false);
    }, 2000);
  };

  // edit family Eliminat
  const [showEditProductionDel, setShowEditProductionDel] = useState(false);
  const handleCloseEditProductionDel = () => setShowEditProductionDel(false);
  const handleShowEditProductionDel = () => {
    setShowEditProductionDel(true)
    setTimeout(() => {
      setShowEditProductionDel(false);
    }, 2000);
  };



  const checkboxs = [
    {
      menu: "Cocina 1",
    },
    {
      menu: "Cocina 2",
    },
    {
      menu: "Barra 1",
    },
    {
      menu: "Barra 2",
    },
  ];

  // file upload function
  const [selectedFile, setSelectedFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const img = new Image();
      img.onload = () => {
        if (img.width > 800 || img.height > 400) {
          setErrorMessage("Image dimensions should be at most 800x400 pixels");
          setSelectedFile(null);
        } else {
          setErrorMessage(null);
          setSelectedFile(file);
        }
      };
      img.src = URL.createObjectURL(file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const [checkboxes, setCheckboxes] = useState({
    Bebidas: {
      isChecked: false,
      children: {
        Agua: false,
        Colas: false,
        Cervezas: false,
      },
    },
    Snacks: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false,
      },
    },
    Dulces: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false,
      },
    },
  });

  const handleParentCheckboxChange = (parentKey) => {
    setCheckboxes((prevState) => {
      const newParentCheckedState = !prevState[parentKey].isChecked;
      const newChildrenState = Object.keys(
        prevState[parentKey].children
      ).reduce((acc, key) => {
        acc[key] = newParentCheckedState;
        return acc;
      }, {});

      return {
        ...prevState,
        [parentKey]: {
          isChecked: newParentCheckedState,
          children: newChildrenState,
        },
      };
    });
  };

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

  const obj1 = [
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",

    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Pasteles",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Bizcochos",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Frutas con crema",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Jugos",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Jugos",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Gelatinas",
    },
    {
      image: img1,
      name: "Gelatina fresa",
      price: "$2.00",
      code: "01234",
      type: "Gelatinas",
    },
  ];
  // filter
  const [selectedFilters, setSelectedFilters] = useState({
    Gelatinas: false,
    Pasteles: false,
    Bizcochos: false,
    "Frutas con crema": false,
    Jugos: false,
  });

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

  const filteredItems = obj1.filter((item) => {
    const activeFilters = Object.keys(selectedFilters).filter(
      (filter) => selectedFilters[filter]
    );

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.includes(item.type);
  });
  const obj2 = [
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
  ];

  const [count, setCount] = useState(0);

  const handleAddClick = () => {
    setCount(count + 1);
  };

  return (
    <div className="m_bg_black">
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white m_borbot jay-table-fixed-kya">
            <h5 className="mb-0" style={{ fontSize: "18px" }}>
              Centro de producción
            </h5>
          </div>

          <div className="row ">
            <div className="col-sm-2 col-4 m_bgblack   m-0 p-0  m_borrig ">
              <div className="j-articals-sticky">
                <div className="ms-3 pe-3 mt-2 j-table-position-sticky">
                  <div className="m_borbot  ">
                    <p
                      className="text-white  my-2 "
                      style={{ fontSize: "14px" }}
                    >
                      Centros de Producción
                    </p>
                    <div>
                      <div>
                        <Button
                          variant="primary"
                          className="mb-3 m12 b_btn_pop"
                          onClick={handleShowCreate}
                        >
                          + Crear Centro
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CRAETE production center */}

                {/*  BRIJSH ........................................................................  */}
                <Modal
                  show={showCreate}
                  onHide={handleCloseCreate}
                  backdrop={true}

                  keyboard={false}
                  className="m_modal  ps-0"
                >
                  <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                    <Modal.Title>
                      <Link
                        className="text-white text-decoration-none "
                        to="/singleatricleproduct"
                      >
                        <span className="p-0">Crear centro de producción</span>
                      </Link>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="border-0 m14 pt-4 pb-0 ">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control m_input ps-3"
                        id="exampleFormControlInput1"
                        placeholder="Eje.Cocina"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Código impresora
                      </label>
                      <input
                        type="text"
                        className="form-control m_input ps-3"
                        id="exampleFormControlInput1"
                        placeholder="045 "
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 pt-0">
                    <Button
                      variant="primary"
                      className="b_btn_pop"
                      style={{ borderRadius: "10px" }}
                      onClick={() => {
                        handleShowCreSucProduction();
                        handleCloseCreate();
                      }}
                    >
                      Crear
                    </Button>
                  </Modal.Footer>
                </Modal>
                {/*  BRIJSH ........................................................................  */}

                {/* creaete production success */}
                <Modal
                  show={showCreSucProduction}
                  onHide={handleCloseCreSucProduction}
                  backdrop={true}

                  keyboard={false}
                  className="m_modal b_newmodel b_model_center"
                >
                  <Modal.Header closeButton className="border-0" />
                  <Modal.Body>
                    <div className="text-center">
                      <img src={require("../Image/check-circle.png")} alt="" />
                      <p className="mb-0 mt-2 h6">Centro de producción</p>
                      <p className="opacity-75">Ha sido creado exitosamente</p>
                    </div>
                  </Modal.Body>
                </Modal>

                <div className="py-3 m_borbot mx-3 j-table-position-sticky-sector">
                  {checkboxs.map((item, index) => (
                    <div>
                      <div className="d-flex justify-content-between m14 align-items-center flex-wrap mb-2">
                        <div className="text-nowrap ">
                          <label className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="me-2 custom-checkbox"
                            />
                            <p className="text-white mb-0" key={index}>
                              {item.menu}
                            </p>
                          </label>
                        </div>
                        <div
                          className="text-white  "
                          style={{ cursor: "pointer" }}
                          onClick={handleShowEditProduction}
                        >
                          <BsThreeDots className="j-tbl-dot-color" />
                        </div>

                      </div>
                    </div>
                  ))}
                  {/* Edit production */}
                  <Modal
                    show={showEditProduction}
                    onHide={handleCloseEditProduction}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal"
                  >
                    <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                      <Modal.Title>
                        <Link
                          className="text-white text-decoration-none"
                          to="/singleatricleproduct"
                        >
                          Editar centro de producción
                        </Link>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0 m14 pb-0">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Nombre
                        </label>
                        <input
                          type="text"
                          className="form-control m_input"
                          id="exampleFormControlInput1"
                          placeholder="Cocina"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Código impresora
                        </label>
                        <input
                          type="text"
                          className="form-control m_input"
                          id="exampleFormControlInput1"
                          placeholder="045"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pt-0">
                      <Button
                        variant="danger"
                        className="b_btn_close"
                        onClick={() => {
                          handleCloseEditProduction();
                          handleShowEditProductionDel();
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="primary"
                        className="b_btn_pop"
                        onClick={() => {
                          handleCloseEditProduction();
                          handleShowEditProductionSuc();
                        }}
                      >
                        Guardar cambios
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  {/* edit production success  */}
                  <Modal
                    show={showEditProductionSuc}
                    onHide={handleCloseEditProductionSuc}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal b_newmodel bnew_model11 b_model_center"
                  >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={require("../Image/check-circle.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 h6">
                          Cambios centro de producción
                        </p>
                        <p className="opacity-75">
                          Sus cambios han sido modificados exitosamente
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {/* edit production eliminate  */}
                  <Modal
                    show={showEditProductionDel}
                    onHide={handleCloseEditProductionDel}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal b_newmodel bnew_model11 b_model_center"
                  >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={require("../Image/trash-check 1.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 h6">
                          Cambios centro de producción
                        </p>
                        <p className="opacity-75">
                          Tus cambios no tuvieron éxito
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-8 m-0 p-0">
              <div className="p-3 m_bgblack pb-1  text-white d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="m14">Cocina 2</h6>
                <div className="d-flex gap-4">
                  <div>
                    <Dropdown data-bs-theme="dark" className="m_drop pb-3">
                      <Dropdown.Toggle
                        id="dropdown-button-dark-example1"
                        variant="outline-primary"
                        style={{ fontSize: "12px" }}
                        className="btn btn-outline-primary b_togllle b_border_out b_ttt"
                      >
                        <FaFilter /> &nbsp; <span className="b_ttt">Filtro</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="m14  m_filter">
                        {/* <Dropdown.Header>
                          <div>
                            <p className="m14 fw-medium text-primary text-end">
                              Restaurar
                            </p>
                          </div>
                        </Dropdown.Header> */}
                        <div className="px-3 py-1 d-flex gap-2 align-items-center fw-500">
                          <input
                            type="checkbox"
                            className='j-change-checkbox'
                            name="Gelatinas"
                            checked={selectedFilters.Gelatinas}
                            onChange={handleCheckboxChange}
                          />{" "}
                          <span className="fw-500">Gelatinas</span>
                        </div>
                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                          <input
                            className='j-change-checkbox'

                            type="checkbox"
                            name="Pasteles"
                            checked={selectedFilters.Pasteles}
                            onChange={handleCheckboxChange}
                          />{" "}
                          <span>Pasteles</span>
                        </div>
                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                          <input
                            className='j-change-checkbox'
                            type="checkbox"
                            name="Bizcochos"
                            checked={selectedFilters.Bizcochos}
                            onChange={handleCheckboxChange}
                          />{" "}
                          <span>Bizcochos</span>
                        </div>
                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                          <input
                            className='j-change-checkbox'
                            type="checkbox"
                            name="Frutas con crema"
                            checked={selectedFilters["Frutas con crema"]}
                            onChange={handleCheckboxChange}
                          />{" "}
                          <span>Frutas con crema</span>
                        </div>
                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                          <input
                            className='j-change-checkbox'
                            type="checkbox"
                            name="Jugos"
                            checked={selectedFilters.Jugos}
                            onChange={handleCheckboxChange}
                          />{" "}
                          <span>Jugos</span>
                        </div>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div>
                    {/* add product */}
                    <Button
                      variant="primary text-nowrap"
                      className="b_btn_pop"
                      style={{ fontSize: "12px" }}
                      onClick={handleShow1Prod}
                    >
                      + &nbsp; Agregar
                    </Button>
                  </div>

                  <Modal
                    show={show1Prod}
                    onHide={handleClose1Prod}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal jm-modal_jjjj m1"
                  >
                    <Modal.Header
                      closeButton
                      className="m_borbot"
                      style={{ backgroundColor: "#111928" }}
                    >
                      <Modal.Title className="m18">
                        Agregar artículos
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                      className="border-0 p-0"
                      style={{ backgroundColor: "#111928" }}
                    >
                      <div className="row ">
                        <div
                          className="col-sm-2 col-4    m-0 p-0  m_borrig "
                          style={{ backgroundColor: "#111928" }}
                        >
                          <div>
                            <div className="ms-3 pe-3 mt-2">
                              <div className="m_borbot ">
                                <p className="text-white m14 my-2 mb-3">
                                  Familias y subfamilias
                                </p>
                              </div>
                            </div>

                            <div className="py-3 m_borbot mx-3  m14 ">
                              {Object.keys(checkboxes).map((parentKey) => (
                                <div key={parentKey}>
                                  <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                    <div className="text-nowrap">
                                      <label>
                                        <input
                                          type="checkbox"
                                          checked={
                                            checkboxes[parentKey].isChecked
                                          }
                                          onChange={() =>
                                            handleParentCheckboxChange(
                                              parentKey
                                            )
                                          }
                                          className="me-2 j-change-checkbox custom-checkbox"
                                        />

                                        <span className="text-white">
                                          {parentKey.charAt(0).toUpperCase() +
                                            parentKey.slice(1)}
                                        </span>
                                      </label>
                                    </div>
                                  </div>

                                  {checkboxes[parentKey].isChecked && (
                                    <div style={{ marginLeft: "20px" }}>
                                      {Object.keys(
                                        checkboxes[parentKey].children
                                      ).map((childKey) => (
                                        <div key={childKey}>
                                          <div className="d-flex align-content-center justify-content-between my-2 m14">
                                            <div>
                                              <label className="text-white ">
                                                <input
                                                  type="checkbox"
                                                  name={childKey}
                                                  checked={
                                                    checkboxes[parentKey]
                                                      .children[childKey]
                                                  }
                                                  className="mx-2 j-change-checkbox"
                                                  onChange={() =>
                                                    handleChildCheckboxChange(
                                                      parentKey,
                                                      childKey
                                                    )
                                                  }
                                                />
                                                {childKey
                                                  .charAt(0)
                                                  .toUpperCase() +
                                                  childKey.slice(1)}
                                              </label>
                                            </div>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-sm-10 col-8 m-0 p-0">
                          <div className="p-3   text-white  flex-wrap">
                            <div className="mb-3">
                              <h6>Bebidas</h6>
                            </div>
                            <div>
                              <div className="d-flex justify-content-between">
                                <div>
                                  <div className="">
                                    <div class="m_group">
                                      <svg
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                        class="m_icon"
                                      >
                                        <g>
                                          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                        </g>
                                      </svg>
                                      <input
                                        class="m_input ps-5"
                                        type="search"
                                        placeholder="Buscar"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <Button
                                    className="mgreenbtn pt-2  m14 border-0 text-nowrap"
                                    onClick={() => {
                                      handleClose1Prod();
                                      handleShow1AddSuc();
                                    }}
                                  >
                                    Añadir nuevos
                                    <Badge
                                      bg="light"
                                      className="ms-2 text-success rounded-circle m12"
                                    >
                                      {count}
                                    </Badge>
                                    <span className="visually-hidden">
                                      unread messages
                                    </span>
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row p-2">
                            {obj2.map((ele, index) => (
                              <div
                                className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                                keys={index}
                              >
                                <div>
                                  <div class="card m_bgblack text-white position-relative">
                                    <img
                                      src={ele.image}
                                      class="card-img-top object-fit-fill rounded"
                                      alt="..."
                                      style={{ height: "162px" }}
                                    />
                                    <div class="card-body">
                                      <h6 class="card-title">{ele.name}</h6>
                                      <h6 class="card-title">${ele.price}</h6>
                                      <p class="card-text opacity-50">
                                        Codigo: {ele.code}
                                      </p>
                                      <div onClick={handleAddClick} class="btn w-100 btn-primary text-white">
                                        <div
                                          className="text-white text-decoration-none"
                                          style={{ fontSize: "14px" }}
                                        >
                                          <span className="ms-1">Añadir</span>
                                        </div>
                                      </div>
                                    </div>

                                    <div
                                      className="position-absolute "
                                      style={{ cursor: "pointer" }}
                                    >
                                      <Link
                                        to="/singleatricleproduct"
                                        className="text-white text-decoration-none"
                                      >
                                        <p
                                          className=" px-1  rounded m-2"
                                          style={{ backgroundColor: "#374151" }}
                                        >
                                          <IoMdInformationCircle />{" "}
                                          <span style={{ fontSize: "12px" }}>
                                            Ver información
                                          </span>
                                        </p>
                                      </Link>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Modal.Body>

                  </Modal>

                  {/* add production success */}
                  <Modal
                    show={show1AddSuc}
                    onHide={handleClose1AddSuc}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal b_newmodel "
                  >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={require("../Image/check-circle.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 h6">Nuevos platillos</p>
                        <p className="opacity-75">
                          Han sido agregados exitosamente
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className="p-3 pt-0 m_bgblack d-flex align-items-center">
                <span className="text-white m14">Filtros:</span>
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
              <div className="row p-2">
                {filteredItems.map((ele, index) => (
                  <div
                    className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                    key={index}
                  >
                    <div>
                      <div class="card m_bgblack text-white position-relative">
                        <img
                          src={ele.image}
                          class="card-img-top object-fit-cover rounded"
                          alt="..."
                          style={{ height: "162px" }}
                        />
                        <div class="card-body">
                          <h6 class="card-title">{ele.name}</h6>
                          <h6 class="card-title">{ele.price}</h6>
                          <p class="card-text" style={{ fontSize: "14px" }}>Codigo: {ele.code}</p>
                          <div class="btn w-100 btn-primary text-white b_ttt" style={{ backgroundColor: "#147BDE" }}>
                            <a
                              href="# "
                              className="text-white text-decoration-none "
                              style={{ fontSize: "14px" }}
                            >
                              <FaCartPlus />{" "}
                              <span className="ms-1  ">Añadir al contador</span>
                            </a>
                          </div>
                        </div>

                        <div
                          className="position-absolute "
                          style={{ cursor: "pointer" }}
                        >
                          <Link
                            to="/singleatricleproduct"
                            className="text-white text-decoration-none"
                          >
                            <p
                              className=" px-1  rounded m-2"
                              style={{ backgroundColor: "#374151" }}
                            >
                              <IoMdInformationCircle />{" "}
                              <span style={{ fontSize: "12px" }}>
                                Ver información
                              </span>
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
