import React, { useState, useRef } from "react";
import Header from "./Header";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { BsThreeDots } from "react-icons/bs";
import SingProd from "./SingProd";
import img1 from "../Image/Image (2).jpg";
import img3 from "../Image/Strawberry-gelatin.png";
import img4 from "../Image/cheese-soup.png";
import img5 from "../Image/crispy-fry-chicken.png";
import img2 from "../Image/addmenu.jpg";
import { Link } from "react-router-dom";
import SingleMenu from "./SingleMenu";
import { Badge } from "react-bootstrap";
import { IoMdInformationCircle } from "react-icons/io";
import { FaCartPlus } from "react-icons/fa6";


export default function Articles() {
  // Add product
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true)
    setCount(0);
  };

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => setShow1AddSuc(true);

  // create family
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true)

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
      setShowCreSuc(false);
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
      setShowEditFamSuc(false);
    }, 2000);
  };

  // edit family Eliminat
  const [showEditFamDel, setShowEditFamDel] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = () => {
    setShowEditFamDel(true)
    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  // edit subfamily
  const [showEditSubFam, setShowEditSubFam] = useState(false);
  const handleCloseEditSubFam = () => setShowEditSubFam(false);
  const handleShowEditSubFam = () => setShowEditSubFam(true);

  // edit subfamily Success
  const [showEditSubFamSuc, setShowEditSubFamSuc] = useState(false);
  const handleCloseEditSubFamSuc = () => setShowEditSubFamSuc(false);
  const handleShowEditSubFamSuc = () => setShowEditSubFamSuc(true);

  // edit subfamily Eliminat
  const [showEditSubFamDel, setShowEditSubFamDel] = useState(false);
  const handleCloseEditSubFamDel = () => setShowEditFamDel(false);
  const handleShowEditSubFamDel = () => setShowEditFamDel(true);
  // add product success
  const [show1AddMenuSuc, setShow1AddMenuSuc] = useState(false);
  const handleClose1AddMenuSuc = () => setShow1AddMenuSuc(false);
  const handleShow1AddMenuSuc = () => {
    setShow1AddMenuSuc(true)
    setTimeout(() => {
      setShow1AddMenuSuc(false);
    }, 2000);
  };

  const checkboxs = [
    { menu: "Entradas", category: "starters" },
    { menu: "Desayunos", category: "breakfast" },
    { menu: "Almuerzos", category: "lunch" },
    { menu: "Postres", category: "desserts" }
  ];

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

  const [items, setItems] = useState([
    {
      image: img3,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Entradas"
    },
    {
      image: img1,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Entradas"
    },
    {
      image: img3,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Entradas"
    },
    {
      image: img1,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Entradas"
    },
    {
      image: img4,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Desayunos"
    },
    {
      image: img3,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Desayunos"
    },
    {
      image: img1,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Desayunos"
    },
    {
      image: img4,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Desayunos"
    },
    {
      image: img3,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Almuerzos"
    },
    {
      image: img1,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Almuerzos"
    },
    {
      image: img3,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Almuerzos"
    },
    {
      image: img1,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Almuerzos"
    },
    {
      image: img5,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Postres"
    },
    {
      image: img4,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Postres"
    },
    {
      image: img5,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Postres"
    },
    {
      image: img4,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "012",
      category: "Postres"
    },
  ]);
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


  const [showRetirar, setShowRetirar] = useState(false);
  // const handleRetirar = (index) => {
  //   setItems(items.filter((_, i) => i !== index));
  // };
  const [selectedMenu, setSelectedMenu] = useState("Entradas");
  const [show500, setShow500] = useState(false);
  const handleclose500 = () => setShow500(false);
  const handleshow500 = (index) => {
    setItems(items.filter((_, i) => i !== index));
    setShow500(true)
    setTimeout(() => {
      setShow500(false)
    }, 2000);
  };

  const [count, setCount] = useState(0);

  const handleAddClick = () => {
    setCount(count + 1);
  };

  const isCategorySelected = (category) => {
    return selectedCategories.length === 0 || selectedCategories.includes(category);
  };

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCheckboxChange = (menu) => {
    if (selectedCategories.includes(menu)) {
      setSelectedCategories(selectedCategories.filter(cat => cat !== menu));
    } else {
      setSelectedCategories([...selectedCategories, menu]);
    }
  };
  // const handleCheckboxChange = (category) => {
  //   setSelectedMenu(category);
  //   if (selectedCategories.includes(category)) {
  //     setSelectedCategories(selectedCategories.filter(cat => cat !== category));
  //   } else {
  //     setSelectedCategories([...selectedCategories, category]);
  //   }
  // };
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});


  return (
    <div className="m_bg_black">
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white m_borbot jay-table-fixed-kya">
            <h5 className="mb-0 m18">Menú digital</h5>
          </div>

          <div className="row ">
            <div className="col-sm-2 col-4 m_bgblack   m-0 p-0  m_borrig ">
              <div className="j-articals-sticky">
                <div className="ms-3 pe-3 mt-2 j-table-position-sticky">
                  <div className="m_borbot ">
                    <div>
                      <div>
                        <p className="text-white  my-2 m14">Menús</p>
                      </div>
                      <div>
                        <div>
                          <button
                            className="btn mb-3 text-white m12 j-btn-primary"
                            onClick={handleShow}
                          >
                            + Crear menú
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* CRAETE product */}
                {/* .............................BRIJESH ............................... */}
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop={true}

                  keyboard={false}
                  className="m_modal"
                >
                  <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                    <Modal.Title>
                      <Link className="text-white text-decoration-none " to="/">
                        Crear menú
                      </Link>{" "}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="border-0 pb-0">
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
                        placeholder="Eje.Desayuno"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 pt-0">
                    <Button
                      variant="primary"
                      className="b_btn_pop"
                      onClick={() => {
                        handleShowCreSuc();
                        handleClose();
                      }}
                    >
                      Crear
                    </Button>
                  </Modal.Footer>
                </Modal>

                {/* .............................BRIJESH ............................... */}
                {/* product success */}
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
                      <p className="mb-0 mt-2 h6">Menú</p>
                      <p className="opacity-75">Creado exitosamente</p>
                    </div>
                  </Modal.Body>
                </Modal>
                <div className="py-3 m_borbot mx-3  m14 j-table-position-sticky-sector">
                  {checkboxs.map((item, index) => (
                    <div key={index}>
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <div className="text-nowrap">
                          <label className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="me-2 custom-checkbox"
                              checked={selectedCategories.includes(item.menu)}
                              onChange={() => handleCheckboxChange(item.menu)}
                            />
                            <p className="text-white mb-0">{item.menu}</p>
                          </label>
                        </div>
                        <div
                          className="text-white"
                          style={{ cursor: 'pointer' }}
                          onClick={handleShowEditFam} // Assuming handleShowEditFam is defined
                        >
                          <BsThreeDots className="j-tbl-dot-color" />
                        </div>
                      </div>
                    </div>
                  ))}


                  {/* Edit product */}
                  {/* ................. BRIJESh................................ */}
                  <Modal
                    show={showEditFam}
                    onHide={handleCloseEditFam}
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
                          Editar menú
                        </Link>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0 pb-0">
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
                          placeholder="Desayuno"
                        />
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 pb-4 pt-2 ">
                      <Button
                        variant="danger"
                        className="b_btn_close"
                        onClick={() => {
                          handleCloseEditFam();
                          handleShowEditFamDel();
                        }}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="primary"
                        className="b_btn_pop"

                        onClick={() => {
                          handleCloseEditFam();
                          handleShowEditFamSuc();
                        }}
                      >
                        Guardar cambios
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* ................. BRIJESh................................ */}

                  {/* edit product success  */}
                  <Modal
                    show={showEditFamSuc}
                    onHide={handleCloseEditFamSuc}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal"
                  >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={require("../Image/check-circle.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 h6">Familia</p>
                        <p className="opacity-75">
                          Ha sido modificada exitosamente
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                  {/* edit product eliminate  */}
                  <Modal
                    show={showEditFamDel}
                    onHide={handleCloseEditFamDel}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal"
                  >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                      <div className="text-center">
                        <img
                          src={require("../Image/trash-check 1.png")}
                          alt=""
                        />
                        <p className="mb-0 mt-2 h6">Familia</p>
                        <p className="opacity-75">
                          Se ha modificado sin éxito
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
            </div>
            <div className="col-sm-10 col-8 m-0 p-0">
              <div className="p-3 m_bgblack  text-white  flex-wrap">
                <div className="mb-3">
                  <h6 className="mb-0 ">Entradas</h6>
                </div>

                <div>
                  <div className="d-flex justify-content-between m_property">
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
                      {/* <button
                        className="btn j-btn-primary j_editor_menu text-white text-nowrap m12 me-2"
                      >
                        + editar
                      </button> */}
                      <button
                        className="btn j-btn-primary j_editor_menu text-white text-nowrap m12 me-2"
                        onClick={() => setShowRetirar(!showRetirar)}
                      >
                        + editar
                      </button>

                      <button
                        className="btn j-btn-primary text-white text-nowrap m12 "
                        onClick={handleShow1}
                      >
                        + Agregar
                      </button>
                    </div>
                  </div>
                  {/* add product*/}

                  <Modal
                    show={show1}
                    onHide={handleClose1}
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
                                <p className="text-white m14 my-2">
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
                                          className="me-2 custom-checkbox"
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
                                                  className="mx-2 custom-checkbox"
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
                              <div className="m_property">
                                <div>
                                  <div className="m_margin_bottom">
                                    <div class="m_group ">
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
                                      handleClose1();
                                      handleShow1AddMenuSuc();
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
                                      class="card-img-top object-fit-cover rounded"
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
                                        <Link
                                          className="text-white text-decoration-none"
                                          style={{ fontSize: "14px" }}
                                        >
                                          <span className="ms-1">Añadir </span>
                                        </Link>
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

                  <div>
                    {/* add product success */}
                    <Modal
                      show={show1AddMenuSuc}
                      onHide={handleClose1AddMenuSuc}
                      backdrop={true}

                      keyboard={false}
                      className="m_modal"
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
              </div>
              <div className="p-3">
                {Object.entries(groupedItems).map(([category, categoryItems]) => (
                  <div key={category}>
                    {/* Only render this category if it's selected or no categories are selected */}
                    {(selectedCategories.length === 0 || selectedCategories.includes(category)) && (
                      <div>
                        <div className=" text-white flex-wrap">
                          <div className="mb-3">
                            <h6 className="mb-0 mt-2">{category}</h6>
                          </div>
                        </div>
                        <div className="row pppp" style={{ borderBottom: "2px solid #374151" }}>
                          {categoryItems.map((ele, itemIndex) => (
                            <div className="col-md-4 col-xl-3 col-sm-6 col-12 g-3 mt-0" key={itemIndex}>
                              <SingleMenu
                                image={ele.image}
                                name={ele.name}
                                price={ele.price}
                                code={ele.code}
                                showRetirar={showRetirar}
                                onRetirar={() => handleshow500(items.indexOf(ele))}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <Modal
                show={show500}
                onHide={handleclose500}
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
                    <p className="mb-0 mt-3 h6 j-tbl-pop-1">Menú digital eliminado</p>
                    <p className="opacity-75 j-tbl-pop-2">
                      Menú digital eliminado correctamente
                    </p>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}
