import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import { Button, Tabs, Tab, Modal } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HiClipboardList } from "react-icons/hi";
import {
  RiCloseLargeFill,
  RiDeleteBin6Fill,
  RiEditBoxFill
} from "react-icons/ri";
import img1 from "../Image/Image4.jpg";
import ApexChart from "./ApexChart ";
import axios from "axios";

export default function SingleArticleProduct() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const [ token ] = useState(sessionStorage.getItem("token"));

  const { id } = useParams();
  const navigate = useNavigate();
  const [ activeTab, setActiveTab ] = useState("home");
  const [ show, setShow ] = useState(false);
  const [ formDetails, setFormDetails ] = useState([]);
  const [ parentCheck, setParentCheck ] = useState([]);
  const [ childCheck, setChildCheck ] = useState([]);
  const [ selectedFamily, setSelectedFamily ] = useState(null);
  const [ productionSel, setProductionSel ] = useState([]);
  const [ selectedDesdeMonth, setSelectedDesdeMonth ] = useState(1);
  const [ selectedHastaMonth, setSelectedHastaMonth ] = useState(
    new Date().getMonth() + 1
  );
  const [ datatab, setDatatab ] = useState([]);
  const [ cost, setCost ] = useState(null);
  const [ user, setUser ] = useState([]);
  const [ error, setError ] = useState("");
  const [ mapVal, setMapVal ] = useState([ [] ]);
  const [ categories, setCategories ] = useState([]);
  const fileInputRef = useRef(null);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    getSubFamilies(formDetails.family_id); // Pass the current family ID to getSubFamilies
  };
  // edit family Success
  const [ showEditFamSuc, setShowEditFamSuc ] = useState(false);
  const handleCloseEditFamSuc = () => setShowEditFamSuc(false);
  const handleShowEditFamSuc = () => {
    setShowEditFamSuc(true);
    setTimeout(() => {
      setShowEditFamSuc(false);
    }, 2000);
  };

  // edit family Eliminat
  const [ showEditFamDel, setShowEditFamDel ] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = () => {
    setShowEditFamDel(true);
    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  // function handelchangeImage(e) {
  //   setFormData({
  //     ...formData,
  //     image: URL.createObjectURL(e.target.files[0])
  //   });
  // }

  // const [data, setData] = useState([
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "pagado"
  //   },
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "pagado"
  //   },
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "pagado"
  //   },
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "pagado"
  //   },
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "pagado"
  //   },
  //   {
  //     id: "01234",
  //     date: "03/20/2024",
  //     hour: "08:00 am",
  //     customer: "Damian Gonzales",
  //     status: "Pagado"
  //   }
  // ]);

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   const reader = new FileReader();
  //   reader.onloadend = () => {
  //     setFormData((prevDetails) => ({
  //       ...prevDetails,
  //       image: reader.result
  //     }));
  //   };
  //   reader.readAsDataURL(file);
  // };

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  // api

  useEffect(
    () => {
      if (selectedDesdeMonth > selectedHastaMonth) {
        setError("Hasta month must be greater than or equal to Desde month.");
        setDatatab([]);
      }
    },
    [ selectedDesdeMonth, selectedHastaMonth ]
  );
  useEffect(
    () => {
      if (token) {
        fetchData();
        fetchInitialData();
      }
    },
    [ token, selectedDesdeMonth, selectedHastaMonth ]
  );
  useEffect(
    () => {
      if (mapVal.length > 0) {
        const newCategories = mapVal.map((val, index) => `S ${index + 1}`);
        setCategories(newCategories);
      }
    },
    [ mapVal ]
  );
  const fetchData = async () => {
    try {
      // await delay(1000);
      const response = await axios.get(
        `${apiUrl}/item/getSaleReport/${id}?from_month=${selectedDesdeMonth}&to_month=${selectedHastaMonth}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setDatatab(response.data);
      setCost(response.data[0]?.order_total || 0);
      const newMapValue = {};

      response.data.forEach((order) => {
        newMapValue[order.id] = order.order_total;
      });
      const orderTotals = response.data.map((order) => order.order_total);

      console.log(newMapValue); // This will log the map of order IDs to order totals
      setMapVal(orderTotals);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchInitialData = async () => {
    try {
      const [
        singleItemResponse,
        familyData,
        subFamilyData,
        productionData,
        userData
      ] = await Promise.all([
        axios.get(`${apiUrl}/item/getSingle/${id}`),
        axios.get(`${apiUrl}/family/getFamily`),
        axios.get(`${apiUrl}/subfamily/getSubFamily`),
        axios.get(`${apiUrl}/production-centers`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get(`${apiUrl}/get-users`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const singleItem = singleItemResponse.data.item;
      setFormDetails({
        ...singleItem,
        existingImage: singleItem.image
          ? `${API}/images/${singleItem.image}`
          : null
      });
      setParentCheck(familyData.data);
      setChildCheck(subFamilyData.data);
      setProductionSel(productionData.data.data);
      setUser(userData.data);
    } catch (error) {
      console.error("Error fetching initial data:", error);
    }
  };

  const getFamilyName = (id) => {
    const family = parentCheck.find((f) => f.id === id);
    return family ? family.name : "Unknown";
  };

  const getSubFamilyName = (id) => {
    const family = childCheck.find((f) => f.id === id);
    return family ? family.name : "Unknown";
  };

  const getProductionName = (id) => {
    const prod = productionSel.find((p) => p.id === id);
    return prod ? prod.name : "Unknown";
  };

  const handleDivClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedValue = value;

    if (name === "cost_price" || name === "sale_price") {
      updatedValue = value.replace(/[^\d.]/g, "").replace(/^0+/, "");
    }
    setFormDetails({ ...formDetails, [name]: updatedValue });
  };

  const handleFamilyChange = (event) => {
    const familyName = event.target.value;
    setSelectedFamily(familyName);
    handleChange(event);
  };

  const filteredSubFamilies = childCheck.filter(
    (childItem) => childItem.family_name === selectedFamily
  );

  const formData = new FormData();
  for (const key in formDetails) {
    if (key === "image" && typeof formDetails[key] !== "string") {
      formData.append("image", formDetails[key]);
    } else {
      formData.append(key, formDetails[key]);
    }
  }

  if (formDetails.image && typeof formDetails.image !== "string") {
    formData.append("image", formDetails.image);
  }

  const formatPrice = (price) => {
    if (price && !isNaN(price)) {
      const formattedPrice = Number(price).toFixed(2);
      return "$" + formattedPrice.replace(/\.00$/, "");
    }
    return "";
  };

  const handleUpdate = async () => {
    const formData = new FormData();
    for (const key in formDetails) {
      if (key === "image") {
        if (formDetails[key] instanceof File) {
          formData.append("image", formDetails[key]);
        } else if (!formDetails[key] && !formDetails.existingImage) {
          formData.append("image", ""); // Send empty string if image is deleted
        }
        // If existingImage is present and image is not changed, don't append anything
      } else {
        formData.append(key, formDetails[key]);
      }
    }

    try {
      const response = await axios.post(
        `${apiUrl}/item/update/${formDetails.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          },
          maxBodyLength: Infinity
        }
      );
      console.log("Product updated successfully", response.data);
      handleClose();
      handleShowEditFamSuc();
      fetchInitialData();
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      // Handle the error, maybe show it to the user
    }
  };

  const handleDelete = async (itemId) => {
    try {
      const response = await axios.delete(`${apiUrl}/item/delete/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        maxBodyLength: Infinity
      });
      console.log(response.data.message);
      handleShowEditFamDel();
      navigate("/articles");
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const handleDesdeMonthChange = (event) => {
    setSelectedDesdeMonth(event.target.value);
  };

  const handleHastaMonthChange = (event) => {
    setSelectedHastaMonth(event.target.value);
  };

  const [ families, setFamilies ] = useState([]);
  const [ subFamilies, setSubFamilies ] = useState([]);

  useEffect(() => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: apiUrl + "/family/getFamily"
    };

    axios
      .request(config)
      .then((response) => {
        setFamilies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getSubFamilies = (familyId) => {
    if (!familyId) return;

    let data = JSON.stringify({
      families: [ familyId ]
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: apiUrl + "/subfamily/getMultipleSubFamily",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        setSubFamilies(response.data.data[0].sub_family);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // tab 2
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";

    // Convert hours from 24-hour to 12-hour format
    hours = hours % 12 || 12; // Handle midnight (0) as 12 AM

    return `${hours}:${minutes} ${period}`;
  };

  const handleImageDelete = () => {
    setFormDetails({
      ...formDetails,
      image: null,
      existingImage: null
    });
  };
  const handelchangeImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormDetails({
        ...formDetails,
        image: file,
        existingImage: null
      });
    }
  };
  return (
    <div>
      <div className="m_bg_black">
        <Header />
        <div className="d-flex">
          <Sidenav />
          <div className="flex-grow-1 sidebar">
            <div className="pb-3  m_bgblack text-white m_borbot m_padding  ">
              <Link to="/articles">
                <div className="btn bj-btn-outline-primary m14">
                  <FaArrowLeft className="" /> Regreaser
                </div>
              </Link>
              <div>
                <div className="d-flex justify-content-between mt-3 align-items-center text-nowrap flex-wrap">
                  <div>
                    <p className=" m-0 m18">
                      {" "}
                      {formDetails.name} {formDetails.code}
                    </p>
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
                        <button
                          className="btn bj-btn-outline-primary"
                          onClick={handleShow}
                        >
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
                      <Modal.Header
                        closeButton
                        className="m_borbot m-3 p-0 pb-3"
                      >
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
                                  name="name" // Make sure name attribute matches the state property
                                  placeholder="-"
                                  value={formDetails.name || ""} // Bind value to formDetails state
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
                                  name="code"
                                  value={formDetails.code || ""}
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
                                name="production_center_id"
                                value={formDetails.production_center_id || ""}
                                onChange={handleChange}
                              >
                                <option selected>Seleccionar</option>
                                {productionSel.map((ele) => (
                                  <option key={ele.id} value={ele.id}>
                                    {ele.name}
                                  </option>
                                ))}
                              </select>
                            </div>
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
                                  name="cost_price"
                                  value={formatPrice(formDetails.cost_price)}
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
                                  name="sale_price"
                                  value={formatPrice(formDetails.sale_price)}
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

                                <select
                                  className="form-select m_input"
                                  aria-label="Default select example"
                                  name="family_id"
                                  id="family"
                                  value={formDetails.family_id}
                                  onChange={(e) => {
                                    const selectedFamilyId = e.target.value;
                                    setFormDetails({
                                      ...formDetails,
                                      family_id: selectedFamilyId
                                    });
                                    getSubFamilies(selectedFamilyId); // Call getSubFamilies with the selected family ID
                                  }}
                                >
                                  <option value="">Seleccionar</option>
                                  {families.map((family) => (
                                    <option key={family.id} value={family.id}>
                                      {family.name}
                                    </option>
                                  ))}
                                </select>
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

                                <select
                                  className="form-select m_input"
                                  aria-label="Default select example"
                                  name="sub_family_id"
                                  value={formDetails.sub_family_id || ""}
                                  onChange={handleChange}
                                >
                                  <option value="">Seleccionar</option>
                                  {subFamilies.map((subFamily) => (
                                    <option
                                      key={subFamily.id}
                                      value={subFamily.id}
                                    >
                                      {subFamily.name}
                                    </option>
                                  ))}
                                </select>
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
                                name="description"
                                value={formDetails.description || ""}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className=" p-3 ">
                              <h6>Product Images</h6>

                              {(formDetails.image ||
                                formDetails.existingImage) && (
                                <div className="rounded position-relative">
                                  <img
                                    src={
                                      formDetails.image instanceof File ? (
                                        URL.createObjectURL(formDetails.image)
                                      ) : (
                                        formDetails.existingImage ||
                                        `${API}/images/${formDetails.image}`
                                      )
                                    }
                                    alt="img"
                                    className="object-fit-contain jm-input rounded"
                                    style={{ width: 150, padding: "1px 11px" }}
                                    name="image"
                                  />
                                  <div
                                    className="text-danger position-absolute jm-dustbin-position"
                                    onClick={handleImageDelete}
                                  >
                                    <RiDeleteBin6Fill className="jm-dustbin-size" />
                                  </div>
                                </div>
                              )}
                              {!formDetails.image &&
                              !formDetails.existingImage && (
                                <div
                                  className="m_file-upload w-100"
                                  onClick={handleDivClick}
                                >
                                  <input
                                    type="file"
                                    className="form-control m_input d-none"
                                    accept="image/*"
                                    name="image"
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
                            handleDelete(id);
                          }}
                        >
                          Eliminar
                        </button>
                        <button
                          className="btn text-white j-btn-primary"
                          onClick={() => {
                            handleClose();
                            handleUpdate();
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
                            src={`${API}/images/${formDetails.image}`}
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
                                  value={formDetails.name}
                                  readOnly
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
                                  value={formDetails.code}
                                  readOnly
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
                                  value={getFamilyName(formDetails.family_id)}
                                  readOnly
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
                                  value={getSubFamilyName(
                                    formDetails.sub_family_id
                                  )}
                                  readOnly
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
                                value={getProductionName(
                                  formDetails.production_center_id
                                )}
                                readOnly
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
                                  value={"$" + formDetails.cost_price}
                                  readOnly
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
                                  value={"$" + formDetails.sale_price}
                                  readOnly
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
                                value={formDetails.description}
                                readOnly
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
                          value={datatab != "" ? cost : ""}
                          readOnly
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
                            onChange={(e) =>
                              setSelectedDesdeMonth(Number(e.target.value))}
                            value={selectedDesdeMonth}
                          >
                            <option selected value="1">
                              Enero
                            </option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
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
                            onChange={(e) =>
                              setSelectedHastaMonth(Number(e.target.value))}
                            value={selectedHastaMonth}
                          >
                            <option selected value="1">
                              Enero
                            </option>
                            <option value="2">Febrero</option>
                            <option value="3">Marzo</option>
                            <option value="4">Abril</option>
                            <option value="5">Mayo</option>
                            <option value="6">Junio</option>
                            <option value="7">Julio</option>
                            <option value="8">Agosto</option>
                            <option value="9">Septiembre</option>
                            <option value="10">Octubre</option>
                            <option value="11">Noviembre</option>
                            <option value="12">Diciembre</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {error && (
                      <div className="alert alert-danger d-flex justify-content-between pointer">
                        {error}{" "}
                        <div
                          className="text-black d-flex align-items-center"
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            setError("");
                            setSelectedDesdeMonth(1);
                          }}
                        >
                          <RiCloseLargeFill />{" "}
                        </div>
                      </div>
                    )}

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
                            {datatab.map((order, index) => (
                              <tr key={order.id} className="m_borbot p-3">
                                <td className="m_idbtn m12">{order.id}</td>
                                <td>{formatDate(order.created_at)}</td>
                                <td className="">
                                  {formatTime(order.created_at)}
                                </td>
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
                      <div className=" gap-3 col-md-6 flex-grow-1">
                        <div className="d-flex gap-3">
                          <div className="mb-3 j-input-width2">
                            <label
                              htmlFor="desdeSelect"
                              className="form-label text-white j-tbl-font-11"
                            >
                              Desde
                            </label>
                            <select
                              className="form-select j-input-width2 j-tbl-information-input  b_select border-0 py-2  "
                              style={{ borderRadius: "6px" }}
                              aria-label="Default select example"
                              onChange={(e) =>
                                setSelectedDesdeMonth(Number(e.target.value))}
                              value={selectedDesdeMonth}
                            >
                              <option selected value="1">
                                Enero
                              </option>
                              <option value="2">Febrero</option>
                              <option value="3">Marzo</option>
                              <option value="4">Abril</option>
                              <option value="5">Mayo</option>
                              <option value="6">Junio</option>
                              <option value="7">Julio</option>
                              <option value="8">Agosto</option>
                              <option value="9">Septiembre</option>
                              <option value="10">Octubre</option>
                              <option value="11">Noviembre</option>
                              <option value="12">Diciembre</option>
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
                              className="form-select j-input-width2 j-tbl-information-input  b_select border-0 py-2  "
                              style={{ borderRadius: "6px" }}
                              aria-label="Default select example"
                              onChange={(e) =>
                                setSelectedHastaMonth(Number(e.target.value))}
                              value={selectedHastaMonth}
                            >
                              <option selected value="1">
                                Enero
                              </option>
                              <option value="2">Febrero</option>
                              <option value="3">Marzo</option>
                              <option value="4">Abril</option>
                              <option value="5">Mayo</option>
                              <option value="6">Junio</option>
                              <option value="7">Julio</option>
                              <option value="8">Agosto</option>
                              <option value="9">Septiembre</option>
                              <option value="10">Octubre</option>
                              <option value="11">Noviembre</option>
                              <option value="12">Diciembre</option>
                            </select>
                          </div>
                        </div>
                        {error && (
                          <div className="alert alert-danger d-flex justify-content-between pointer">
                            {error}{" "}
                            <div
                              className="text-black d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                              onClick={(e) => {
                                setError("");
                                setSelectedDesdeMonth(1);
                              }}
                            >
                              <RiCloseLargeFill />{" "}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="col-md-6">
                        <ApexChart mapVal={mapVal} cat={categories} />
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
