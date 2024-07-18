import React, { useState, useRef } from "react";
import Header from "./Header";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { BsThreeDots } from "react-icons/bs";
import SingProd from "./SingProd";
import img1 from "../Image/order2.png";
import { Link } from "react-router-dom";

export default function Articles() {
  // Add product
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true)
    setTimeout(() => {
      setShow1AddSuc(false);
    }, 2000);
  };

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
      setShowCreSuc(false);
    }, 2000);
  };

  // create subfamily success
  const [showCreSubSuc, setShowCreSubSuc] = useState(false);
  const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
  const handleShowCreSubSuc = () => {
    setShowCreSubSuc(true);
    setTimeout(() => {
      setShowCreSubSuc(false);
    }, 2000);
  };

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
  const handleShowEditSubFamSuc = () => {
    setShowEditSubFamSuc(true)
    setTimeout(() => {
      setShowEditSubFamSuc(false);
    }, 2000);
  };

  // edit subfamily Eliminat
  const [showEditSubFamDel, setShowEditSubFamDel] = useState(false);
  const handleCloseEditSubFamDel = () => setShowEditFamDel(false);
  const handleShowEditSubFamDel = () => {
    setShowEditFamDel(true)
    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  const [checkboxes, setCheckboxes] = useState({
    Bebidas: {
      isChecked: false,
      children: {
        Agua: false,
        Colas: false,
        Cervezas: false
      }
    },
    Snacks: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false
      }
    },
    Dulces: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false
      }
    }
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
          children: newChildrenState
        }
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
          [childKey]: !prevState[parentKey].children[childKey]
        }
      }
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

  const obj1 = [
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    },
    {
      image: img1,
      name: "Guitig",
      price: "$2.00",
      code: "01234"
    }
  ];

  return (
    <div className="m_bg_black">
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white  b_borderrr jay-table-fixed-kya  ">
            <h5 className="mb-0" style={{ fontSize: '18px' }}>Artículos</h5>
          </div>

          <div className="row ">
            <div className="col-sm-2 col-4 m_bgblack m-0 p-0 b_bring ">
              <div className="j-articals-sticky">
                <div className="ms-3 pe-3 mt-2">
                  <div className="b_bring_b  ">
                    <p className="text-white  my-2 " style={{ fontSize: '14px' }}>Familias y subfamilias</p>
                    <div>
                      <Dropdown data-bs-theme="dark" className="m_drop pb-3 ">
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          className="b_blue_new11 b_togllle"
                          variant="primary"
                          style={{ fontSize: '12px' }}
                        >
                          + crear
                        </Dropdown.Toggle>

                        <Dropdown.Menu className="m14" style={{ backgroundColor: "#374151" }}>
                          <Dropdown.Item onClick={handleShow}>
                            Familia
                          </Dropdown.Item>
                          <Dropdown.Item onClick={handleShowCreSub}>
                            Subfamilia
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>

                  </div>
                </div>
                {/* CRAETE family */}

                {/* .............BRIJESH ............................. */}

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop={true}
                  keyboard={false}
                  className="m_modal"
                >
                  <Modal.Header closeButton className="m_borbot  b_border_bb mx-3 ps-0">
                    <Modal.Title>
                      Crear familia
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="border-0 pb-0">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nombre familia
                      </label>
                      <input
                        type="text"
                        className="form-control m_input ps-3"
                        id="exampleFormControlInput1"
                        placeholder="Eje.Bebidas"
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

                {/* .............BRIJESH ............................. */}


                {/* create subfamily */}
                <Modal
                  show={showCreSub}
                  onHide={handleCloseCreSub}
                  backdrop={true}

                  keyboard={false}
                  className="m_modal"
                >
                  <Modal.Header closeButton className="m_borbot b_border_bb  mx-3 ps-0">
                    <Modal.Title>
                      <Link
                        className="text-white text-decoration-none"
                        to="/singleatricleproduct"
                      >
                        Crear Subfamilia
                      </Link>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body className="border-0 pb-0">
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput6"
                        className="form-label"
                      >
                        Seleccionar familia
                      </label>
                      <select
                        className="form-select m_input"
                        aria-label="Default select example"
                      >
                        <option selected>Seleccionar</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleFormControlInput1"
                        className="form-label"
                      >
                        Nombre subfamilia
                      </label>
                      <input
                        type="text"
                        className="form-control m_input"
                        id="exampleFormControlInput1"
                        placeholder="Eje.Agua"
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 pt-0 ">
                    <Button
                      variant="primary"
                      className="b_btn_pop"
                      onClick={() => {
                        handleShowCreSubSuc();
                        handleCloseCreSub();
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
                  <Modal.Header closeButton className="border-0" />
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
                  <Modal.Header closeButton className="border-0" />
                  <Modal.Body>
                    <div className="text-center">
                      <img src={require("../Image/check-circle.png")} alt="" />
                      <p className="mb-0 mt-2 h6">Familia</p>
                      <p className="opacity-75">creada exitosamente</p>
                    </div>
                  </Modal.Body>
                </Modal>
                <div className="py-3 b_bring_b mx-3">
                  {Object.keys(checkboxes).map((parentKey) => (
                    <div key={parentKey}>
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                        <div className="text-nowrap" style={{ fontSize: '14px' }}>
                          <label>
                            <input
                              type="checkbox"
                              checked={checkboxes[parentKey].isChecked}
                              onChange={() =>
                                handleParentCheckboxChange(parentKey)}
                              className="me-2 custom-checkbox"
                            />

                            <span className="text-white">
                              {parentKey.charAt(0).toUpperCase() +
                                parentKey.slice(1)}
                            </span>
                          </label>
                        </div>
                        <div
                          className="text-white  "
                          style={{ cursor: "pointer" }}
                          onClick={handleShowEditFam}
                        >
                          <BsThreeDots className="j-tbl-dot-color" />
                        </div>
                        {/* Edit family */}


                      </div>


                      {checkboxes[parentKey].isChecked && (
                        <div style={{ marginLeft: "20px" }}>
                          {Object.keys(
                            checkboxes[parentKey].children
                          ).map((childKey) => (
                            <div key={childKey}>
                              <div className="d-flex align-content-center justify-content-between my-2">
                                <div style={{ fontSize: '14px' }}>
                                  <label className="text-white ">
                                    <input
                                      type="checkbox"
                                      name={childKey}
                                      checked={
                                        checkboxes[parentKey].children[childKey]
                                      }
                                      className="mx-2 custom-checkbox"
                                      onChange={() =>
                                        handleChildCheckboxChange(
                                          parentKey,
                                          childKey
                                        )}
                                    />
                                    {childKey.charAt(0).toUpperCase() +
                                      childKey.slice(1)}
                                  </label>
                                </div>
                                <div
                                  className="text-white"
                                  style={{ cursor: "pointer" }}
                                  onClick={handleShowEditSubFam}
                                >
                                  <BsThreeDots className="j-tbl-dot-color" />
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
            {/* ....................BRIJESH ...................... */}
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
                    Editar familia
                  </Link>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="border-0 pb-0">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Nombre familia
                  </label>
                  <input
                    type="text"
                    className="form-control m_input ps-3"
                    id="exampleFormControlInput1"
                    placeholder="Bebidas"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0">
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

            {/* ....................BRIJESH ...................... */}

            {/* edit family success */}
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
                  <p className="mb-0 mt-2 h6">Sus cambios</p>
                  <p className="opacity-75">
                    Han sido guardados correctamente
                  </p>
                </div>
              </Modal.Body>
            </Modal>
            {/* edit family eliminate */}
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
                    Ha sido eliminada correctamente
                  </p>
                </div>
              </Modal.Body>
            </Modal>
            {/* Edit Subfamily */}
            <Modal
              show={showEditSubFam}
              onHide={handleCloseEditSubFam}
              backdrop={true}

              keyboard={false}
              className="m_modal"
            >
              <Modal.Header closeButton className="m_borbot">
                <Modal.Title>
                  <Link
                    className="text-white text-decoration-none"
                    to="/singleatricleproduct"
                  >
                    Editar subfamilia
                  </Link>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className="border-0">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput6"
                    className="form-label"
                  >
                    Seleccionar familia
                  </label>
                  <select
                    className="form-select m_input"
                    aria-label="Default select example"
                  >
                    <option selected>Seleccionar</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label"
                  >
                    Nombre subfamilia
                  </label>
                  <input
                    type="text"
                    className="form-control m_input"
                    id="exampleFormControlInput1"
                    placeholder="Bebidas"
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <Button
                  variant="danger"
                  onClick={() => {
                    handleCloseEditSubFam();
                    handleShowEditSubFamDel();
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleCloseEditSubFam();
                    handleShowEditSubFamSuc();
                  }}
                >
                  Guardar cambios
                </Button>
              </Modal.Footer>
            </Modal>
            {/* edit subfamily success */}
            <Modal
              show={showEditSubFamSuc}
              onHide={handleCloseEditSubFamSuc}
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
                  <p className="mb-0 mt-2 h6">Sus cambios</p>
                  <p className="opacity-75">
                    Han sido guardados correctamente
                  </p>
                </div>
              </Modal.Body>
            </Modal>
            {/* edit subfamily eliminate */}
            <Modal
              show={showEditSubFamDel}
              onHide={handleCloseEditSubFamDel}
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
                    Ha sido eliminada correctamente
                  </p>
                </div>
              </Modal.Body>
            </Modal>
            <div className="col-sm-10 col-8 m-0 p-0">
              <div className="p-3 m_bgblack  text-white d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="">Bebidas</h6>
                <div>
                  {/* add product */}
                  <Button className="b_blue_new11" variant="primary text-nowrap" style={{ fontSize: '14px' }} onClick={handleShow1}>
                    + Agregar producto
                  </Button>

                  <Modal
                    show={show1}
                    onHide={handleClose1}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal j_topmodal"
                  >
                    <Modal.Header closeButton className="m_borbot">
                      <Modal.Title>Agregar artículo</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0">
                      <form action="">
                        <div className="row">
                          <div className="col-6">
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
                                placeholder="-"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput2"
                                className="form-label"
                              >
                                Código
                              </label>
                              <input
                                type="text"
                                className="form-control m_input"
                                id="exampleFormControlInput2"
                                placeholder="01234"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput3"
                              className="form-label"
                            >
                              Centro de producción
                            </label>
                            <select
                              className="form-select m_input"
                              aria-label="Default select example"
                            >
                              <option selected>Seleccionar</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput4"
                                className="form-label"
                              >
                                Precio costo
                              </label>
                              <input
                                type="text"
                                className="form-control m_input"
                                id="exampleFormControlInput4"
                                placeholder="$0.00"
                              />
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput5"
                                className="form-label"
                              >
                                Precio venta
                              </label>
                              <input
                                type="text"
                                className="form-control m_input"
                                id="exampleFormControlInput5"
                                placeholder="$0.00"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput6"
                                className="form-label"
                              >
                                Familia
                              </label>
                              <select
                                className="form-select m_input"
                                aria-label="Default select example"
                              >
                                <option selected>Seleccionar</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                          <div className="col-6">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput7"
                                className="form-label"
                              >
                                Subfamilia
                              </label>
                              <select
                                className="form-select m_input"
                                aria-label="Default select example"
                              >
                                <option selected>Seleccionar</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-3">
                            <label
                              htmlFor="exampleFormControlInput8"
                              className="form-label"
                            >
                              Descripción
                            </label>
                            <input
                              type="text"
                              className="form-control m_input"
                              id="exampleFormControlInput8"
                              placeholder="-"
                            />
                          </div>
                        </div>
                        <div className="row ms-3">
                          <div
                            className="m_file-upload .m_file-upload1 "
                            onClick={handleDivClick}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              style={{ display: "none" }}
                              accept=".svg,.png,.jpg,.jpeg,.gif"
                            />
                            <p><img src={require('../Image/v111.png')} alt="" /></p>
                            <p className="m_upload-text">
                              Haga clic para cargar o arrastre y suelte
                            </p>
                            <p className="m_supported-types">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                            {selectedFile && (
                              <p>Selected file: {selectedFile.name}</p>
                            )}
                            {errorMessage && (
                              <p className="text-danger">{errorMessage}</p>
                            )}
                          </div>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button
                        variant="primary"
                        style={{ backgroundColor: "#147BDE" }}
                        onClick={() => {
                          handleShow1AddSuc();
                          handleClose1();
                        }}
                      >
                        Agregar
                      </Button>
                    </Modal.Footer>
                  </Modal>

                  {/* add product success */}
                  <Modal
                    show={show1AddSuc}
                    onHide={handleClose1AddSuc}
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
                        <p className="mb-0 mt-2 h6">Sus artículo</p>
                        <p className="opacity-75">
                          Ha sido agregado correctamente
                        </p>
                      </div>
                    </Modal.Body>
                  </Modal>
                </div>
              </div>
              <div className="row p-2">
                {obj1.map((ele, index) => (
                  <div className="col-md-4 col-xl-3 col-sm-6 col-12 g-3" keys={index}>
                    <SingProd
                      image={ele.image}
                      name={ele.name}
                      price={ele.price}
                      code={ele.code}
                    />
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
