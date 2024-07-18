import React, { useRef, useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { Button, Tabs, Tab, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import { RiDeleteBin6Fill, RiEditBoxFill } from "react-icons/ri";
import img1 from "../Image/Image4.jpg";
import ApexChart from "./ApexChart ";

export default function SingleArticleProduct() {
  const [activeTab, setActiveTab] = useState("home");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  function handelchangeImage(e) {
    setFormData({
      ...formData,
      image: URL.createObjectURL(e.target.files[0])
    });
  }

  const [data, setData] = useState([
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "pagado"
    },
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "pagado"
    },
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "pagado"
    },
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "pagado"
    },
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "pagado"
    },
    {
      id: "01234",
      date: "03/20/2024",
      hour: "08:00 am",
      customer: "Damian Gonzales",
      status: "Pagado"
    }
  ]);
  const [formData, setFormData] = useState({
    image: img1,
    name: "Guitig",
    code: "01234",
    family: "Bebidas",
    subFamily: "5",
    prodCenter: "Barra",
    cPrice: "$2.00",
    sPrice: "$5.00",
    description: "Agua mineral",
    sold: "60"
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevDetails) => ({
      ...prevDetails,
      [id]: value
    }));
  };

  const handleImageDelete = () => {
    setFormData((prevDetails) => ({
      ...prevDetails,
      image: null
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevDetails) => ({
        ...prevDetails,
        image: reader.result
      }));
    };
    reader.readAsDataURL(file);
  };
  const fileInputRef = useRef(null);
  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div>
      <div className="m_bg_black">
        <Header />
        <div className="d-flex">
          <Sidenav />
          <div className="flex-grow-1 sidebar">
            <div
              className="pb-3  m_bgblack text-white m_borbot m_padding  "

            >
              <Link to="/articles">
                <div className="btn bj-btn-outline-primary m14">
                  <FaArrowLeft className="" /> {" "}
                  Regreaser
                </div>
              </Link>
              <div>
                <div className="d-flex justify-content-between mt-3 align-items-center text-nowrap flex-wrap">
                  <div>
                    <p className=" m-0 m18">Guiting 01234</p>
                  </div>
                  <div className="d-flex gap-3 ">
                    <div className="d-flex align-items-center">
                      <button className="btn j-btn-primary text-white">
                        <HiClipboardList className="fs-5" />{" "}
                        <span className="ms-1 m12">Generar reporte</span>{" "}
                      </button>
                    </div>
                    {activeTab === "home" && (
                      <div>
                        <button className="btn bj-btn-outline-primary" onClick={handleShow}>
                          <RiEditBoxFill className="fs-5" />
                          <span className="ms-1 m12">Editar</span>
                        </button>
                      </div>
                    )}
                    {/* edit product */}
                    <Modal
                      show={show}
                      onHide={handleClose}
                      backdrop={true}

                      keyboard={false}
                      className="m_modal j_mftopmodal"
                    >
                      <Modal.Header closeButton className="m_borbot m-3 p-0 pb-3">
                        <Modal.Title>Edición artículo</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <form>
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                  Nombre
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="name"
                                  placeholder="-"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label htmlFor="code" className="form-label">
                                  Código
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="code"
                                  placeholder="01234"
                                  value={formData.code}
                                  onChange={handleChange}
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
                            {/* <div className="row">
                              <div className="mb-3">
                                <label
                                  htmlFor="prodCenter"
                                  className="form-label"
                                >
                                  Centro de producción
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="prodCenter"
                                  placeholder="Bars"
                                  value={formData.prodCenter}
                                  onChange={handleChange}
                                />
                              </div>
                            </div> */}
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label htmlFor="cPrice" className="form-label">
                                  Precio costo
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="cPrice"
                                  placeholder="Babidas"
                                  value={formData.cPrice}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label htmlFor="sPrice" className="form-label">
                                  Precio venta
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="sPrice"
                                  placeholder="Babidas"
                                  value={formData.sPrice}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label htmlFor="family" className="form-label">
                                  Familia
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="family"
                                  placeholder="Babidas"
                                  value={formData.family}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="subFamily"
                                  className="form-label"
                                >
                                  Subfamilia
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="subFamily"
                                  placeholder="Babidas"
                                  value={formData.subFamily}
                                  onChange={handleChange}
                                />
                              </div>
                            </div>
                          </div>


                          <div className="row">
                            <div className="mb-3">
                              <label
                                htmlFor="description"
                                className="form-label"
                              >
                                Descripción
                              </label>
                              <input
                                type="text"
                                className="form-control m_input"
                                id="description"
                                placeholder="-"
                                value={formData.description}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className=" p-3 ">
                              <h6>Product Images</h6>

                              {formData.image && (
                                <div className=" rounded position-relative">
                                  <img
                                    src={formData.image}
                                    alt=""
                                    className="object-fit-contain jm-input rounded"
                                    style={{ width: 150, padding: "1px 11px" }}
                                  />
                                  <div
                                    className="text-danger position-absolute jm-dustbin-position"
                                    onClick={handleImageDelete}
                                  >
                                    <RiDeleteBin6Fill className="jm-dustbin-size" />
                                  </div>
                                </div>
                              )}
                              {/* New input field for uploading image */}
                              {!formData.image && (
                                <div
                                  className="m_file-upload w-100 "
                                  onClick={handleDivClick}

                                >
                                  <input
                                    type="file"
                                    className="form-control m_input d-none "
                                    accept="image/*"
                                    onChange={handelchangeImage}
                                    ref={fileInputRef}
                                  />
                                  <p className="m_upload-text fw-light">
                                    Click to upload image
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </form>
                      </Modal.Body>
                      <Modal.Footer className="border-0">
                        <button
                          className="btn b_btn_close "
                          onClick={() => {
                            handleClose();
                            handleShowEditFamDel();
                          }}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn text-white j-btn-primary"
                          onClick={() => {
                            handleClose();
                            handleShowEditFamSuc();
                          }}
                        >
                          Guardar cambios
                        </button>
                      </Modal.Footer>
                    </Modal>
                    {/* edit product success */}
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
                          <p className="mb-0 mt-2 h6">Editado con éxito</p>
                        </div>
                      </Modal.Body>
                    </Modal>
                    {/* edit product eliminate */}
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
                          <p className="mb-0 mt-2 h6">editar sin éxito</p>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Tabs
                activeKey={activeTab}
                onSelect={(k) => setActiveTab(k)}
                id="fill-tab-example"
                className="mb-3 m_tabs m_bgblack px-2 border-0 p-3 "
                fill
              >
                <Tab
                  eventKey="home"
                  title="Información"
                  className="m_in  text-white m12  pt-4 m_bgblack rounded"
                >
                  <div>
                    <div>
                      <div className="row">
                        <h6>Información articulo</h6>
                        <div>
                          <img
                            src={formData.image}
                            alt=""
                            className="object-fit-contain"
                            width={250}
                          />
                        </div>
                      </div>
                      <div className="mt-2">
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
                                  value={formData.name}
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
                                  value={formData.code}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput4"
                                  className="form-label"
                                >
                                  Familia
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="exampleFormControlInput4"
                                  placeholder="Babidas"
                                  value={formData.family}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput4"
                                  className="form-label"
                                >
                                  Subfamilia
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="exampleFormControlInput4"
                                  placeholder="Babidas"
                                  value={formData.subFamily}
                                />
                              </div>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-3">
                              <label
                                htmlFor="exampleFormControlInput4"
                                className="form-label"
                              >
                                Centro de producción
                              </label>
                              <input
                                type="text"
                                className="form-control m_input"
                                id="exampleFormControlInput4"
                                placeholder="Bars"
                                value={formData.prodCenter}
                              />
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
                                  placeholder="Babidas"
                                  value={formData.cPrice}
                                />
                              </div>
                            </div>
                            <div className="col-6">
                              <div className="mb-3">
                                <label
                                  htmlFor="exampleFormControlInput4"
                                  className="form-label"
                                >
                                  Precio venta
                                </label>
                                <input
                                  type="text"
                                  className="form-control m_input"
                                  id="exampleFormControlInput4"
                                  placeholder="Babidas"
                                  value={formData.sPrice}
                                />
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
                                value={formData.description}
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="profile" title="Historial" className="m14">
                  <div className="m-3 text-white m_bgblack p-4 rounded">
                    <div className="d-flex  justify-content-between">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label"
                        >
                          Vendidos
                        </label>
                        <input
                          type="text"
                          className="form-control m_input"
                          id="exampleFormControlInput1"
                          placeholder="-"
                          value={formData.sold}
                        />
                      </div>
                      <div className="d-flex gap-3">
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput6"
                            className="form-label"
                          >
                            Desde
                          </label>
                          <select
                            className="form-select m_input text-capitalize"
                            aria-label="Default select example"
                          >
                            <option selected value="Enero">
                              Enero
                            </option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="junio">junio</option>
                            <option value="julio">julio</option>
                            <option value="agosto">agosto</option>
                            <option value="septiembre">septiembre</option>
                            <option value="octubure">octubure</option>
                            <option value="noviembre">noviembre</option>
                            <option value="diciembre">diciembre</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="exampleFormControlInput6"
                            className="form-label"
                          >
                            Hasta
                          </label>
                          <select
                            className="form-select m_input text-capitalize"
                            aria-label="Default select example"
                          >
                            <option selected value="Enero">
                              Enero
                            </option>
                            <option value="Febrero">Febrero</option>
                            <option value="Marzo">Marzo</option>
                            <option value="Abril">Abril</option>
                            <option value="Mayo">Mayo</option>
                            <option value="junio">junio</option>
                            <option value="julio">julio</option>
                            <option value="agosto">agosto</option>
                            <option value="septiembre">septiembre</option>
                            <option value="octubure">octubure</option>
                            <option value="noviembre">noviembre</option>
                            <option value="diciembre">diciembre</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="m_table1">
                        <table className="m_table w-100 mt-3 m16">
                          <thead>
                            <tr className="m_thcolor rounded-top ">
                              <th>Padido</th>
                              <th>Fecha</th>
                              <th>Hora</th>
                              <th>Cliente</th>
                              <th>Estado</th>
                            </tr>
                          </thead>
                          <tbody className="text-white  ">
                            {data.map((order) => (
                              <tr key={order.id} className="m_borbot p-3">
                                <td className="m_idbtn m12">{order.id}</td>
                                <td>{order.date}</td>
                                <td className="">{order.hour}</td>
                                <td className="text-nowrap">
                                  {order.customer}
                                </td>

                                <td className="m_btn1 m12">{order.status}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </Tab>
                <Tab eventKey="longer-tab" title="Estadísticas">
                  <div className="m-3 text-white m_bgblack p-4 rounded m14">
                    <div className="row mt-5">
                      <div className="d-flex gap-3 col-md-6 flex-grow-1">
                        <div className="d-flex gap-3">
                          <div className="mb-3 j-input-width2">
                            <label
                              htmlFor="desdeSelect"
                              className="form-label text-white j-tbl-font-11"
                            >
                              Desde
                            </label>
                            <select
                              className="form-select j-input-width2 j-tbl-information-input  b_select border-0 py-2  " style={{ borderRadius: "6px" }}
                              aria-label="Default select example"
                            >
                              <option value="0">Enero</option>
                              <option value="Febrero">Febrero</option>
                              <option value="Marzo">Marzo</option>
                              <option value="Abril">Abril</option>
                              <option value="Mayo">Mayo</option>
                              <option value="junio">junio</option>
                              <option value="julio">julio</option>
                              <option value="agosto">agosto</option>
                              <option value="septiembre">septiembre</option>
                              <option value="octubure">octubure</option>
                              <option value="noviembre">noviembre</option>
                              <option value="diciembre">diciembre</option>
                            </select>
                          </div>
                          <div className="mb-3  j-input-width2">
                            <label
                              htmlFor="hastaSelect"
                              className="form-label text-white j-tbl-font-11"
                            >
                              Hasta
                            </label>
                            <select
                              className="form-select j-input-width2 j-tbl-information-input  b_select border-0 py-2  " style={{ borderRadius: "6px" }}
                              aria-label="Default select example"
                            >
                              <option value="1">Marzo</option>
                              <option value="Febrero">Febrero</option>
                              <option value="Marzo">Marzo</option>
                              <option value="Abril">Abril</option>
                              <option value="Mayo">Mayo</option>
                              <option value="junio">junio</option>
                              <option value="julio">julio</option>
                              <option value="agosto">agosto</option>
                              <option value="septiembre">septiembre</option>
                              <option value="octubure">octubure</option>
                              <option value="noviembre">noviembre</option>
                              <option value="diciembre">diciembre</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div
                        className="col-md-6"
                      >
                        <ApexChart />
                      </div>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
