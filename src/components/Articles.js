import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Sidenav from "./Sidenav";
import { BsThreeDots } from "react-icons/bs";
import SingProd from "./SingProd";
import img1 from "../Image/order2.png";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Articles() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [ token ] = useState(sessionStorage.getItem("token"));

  // Add product
  const [ show1, setShow1 ] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  // Add product success
  const [ show1AddSuc, setShow1AddSuc ] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true);
    setTimeout(() => {
      setShow1AddSuc(false);
    }, 2000);
  };

  // create family
  const [ show, setShow ] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // create subfamily
  const [ showCreSub, setShowCreSub ] = useState(false);
  const handleCloseCreSub = () => setShowCreSub(false);
  const handleShowCreSub = () => setShowCreSub(true);

  // create family success
  const [ showCreSuc, setShowCreSuc ] = useState(false);
  const handleCloseCreSuc = () => setShowCreSuc(false);
  const handleShowCreSuc = () => {
    setShowCreSuc(true);
    setTimeout(() => {
      setShowCreSuc(false);
    }, 2000);
  };

  // create subfamily success
  const [ showCreSubSuc, setShowCreSubSuc ] = useState(false);
  const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
  const handleShowCreSubSuc = () => {
    setShowCreSubSuc(true);
    setTimeout(() => {
      setShowCreSubSuc(false);
    }, 2000);
  };

  // edit family
  const [ showEditFam, setShowEditFam ] = useState(false);
  const handleCloseEditFam = () => setShowEditFam(false);
  const handleShowEditFam = (family) => {
    setSelectedFamily(family);
    setShowEditFam(true);
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

  // edit subfamily
  const [ showEditSubFam, setShowEditSubFam ] = useState(false);
  const handleCloseEditSubFam = () => setShowEditSubFam(false);
  const handleShowEditSubFam = (subFamily) => {
    setSelectedSubFamily(subFamily);
    setShowEditSubFam(true);
  };

  // edit subfamily Success
  const [ showEditSubFamSuc, setShowEditSubFamSuc ] = useState(false);
  const handleCloseEditSubFamSuc = () => setShowEditSubFamSuc(false);
  const handleShowEditSubFamSuc = () => {
    setShowEditSubFamSuc(true);
    setTimeout(() => {
      setShowEditSubFamSuc(false);
    }, 2000);
  };

  // edit subfamily Eliminat
  const [ showEditSubFamDel, setShowEditSubFamDel ] = useState(false);
  const handleCloseEditSubFamDel = () => setShowEditFamDel(false);
  const handleShowEditSubFamDel = () => {
    setShowEditFamDel(true);
    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  // const obj1 = [
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   },
  //   {
  //     image: img1,
  //     name: "Guitig",
  //     price: "$2.00",
  //     code: "01234"
  //   }
  // ];

  // api
  const [ parentCheck, setParentCheck ] = useState([]);
  const [ childCheck, setChildCheck ] = useState([]);
  const [ productionSel, setProductionSel ] = useState([]);

  const [ subFamName, setSubFamName ] = useState("");
  const [ subSelectName, setSubSelectName ] = useState("");
  const [ selectedFamily, setSelectedFamily ] = useState(null);
  const [ selectedSubFamily, setSelectedSubFamily ] = useState(null);
  const [ obj1, setObj1 ] = useState([]);

  useEffect(
     () => {
      fetchFamilyData();
      fetchSubFamilyData();
      fetchAllItems();

      if (token) {
        fetchProductionCenters();
      }
    },
    [ apiUrl,token ]
  );

  // get family

  const fetchFamilyData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/family/getFamily`);
      setParentCheck(response.data);
    } catch (error) {
      console.error(
        "Error fetching roles:",
        error.response ? error.response.data : error.message
      );
    }
  };
  // get production id
  const fetchProductionCenters = async () => {
    try {
      const response = await axios.get(`${apiUrl}/production-centers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProductionSel(response.data.data);
      // console.log(response.data.data + "production centre");
    } catch (error) {
      console.error(
        "Error fetching production centers:",
        error.response ? error.response.data : error.message
      );
    }
  };

  // get subfamily
  const fetchSubFamilyData = async () => {
    try {
      const response = await axios.get(`${apiUrl}/subfamily/getSubFamily`);
      setChildCheck(response.data);
    } catch (error) {
      console.error(
        "Error fetching roles:",
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
  // filter family
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
  }, [apiUrl]);

  const getSubFamilies = () => {
    let family = [];
    family.push(document.getElementById("family").value);
    let data = JSON.stringify({
      families: family
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
  const [ famName, setFamName ] = useState("");
  // const [checkedParents, setCheckedParents] = useState({});
  const [ checkedParents, setCheckedParents ] = useState(
    parentCheck.reduce((acc, family) => ({ ...acc, [family.id]: true }), {})
  );
  const handleParentChange = (parentId) => {
    setCheckedParents((prevState) => ({
      ...prevState,
      [parentId]: !prevState[parentId]
    }));
  };

  // create fam
  const handleCreateFam = () => {
    axios
      .post(
        `${apiUrl}/family/create`,
        {
          name: famName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      )
      .then(function(response) {
        console.log(response.data, "create family");
        handleShowCreSuc();
        handleClose();
        fetchFamilyData();
      })
      .catch(function(error) {
        console.error(
          "Error creating family:",
          error.response ? error.response.data : error.message
        );
      });
  };
  // create sub fam
  const handleCreateSubFam = () => {
    axios
      .post(
        `${apiUrl}/subfamily/create`,
        {
          name: subFamName,
          family_id: subSelectName
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      )
      .then(function(response) {
        console.log(response.data, "create sub family");
        handleShowCreSubSuc();
        handleCloseCreSub();
        fetchSubFamilyData();
      })
      .catch(function(error) {
        console.error(
          "Error creating sub family:",
          error.response ? error.response.data : error.message
        );
      });
  };
  // edit family
  const handleUpdateFamily = (family) => {
    console.log(family, "fimily sfAS")
    axios
      .post(
        `${apiUrl}/family/update/${family.id}`,
        {
          name: family.name
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      )
      .then(function(response) {
        console.log(response.data, "update family");
        handleCloseEditFam();
        handleShowEditFamSuc();
        fetchFamilyData();

        // You may want to update the state with the updated family details if needed
      })
      .catch(function(error) {
        console.error(
          "Error updating family:",
          error.response ? error.response.data : error.message
        );
      });
  };
  // edit subfamily
  const handleUpdateSubFamily = (subFamily) => {
    axios
      .post(
        `${apiUrl}/subfamily/update/${subFamily.id}`,
        {
          name: subFamily.name,
          family_id: subFamily.family_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      )
      .then(function(response) {
        console.log(response.data, "update sub family");
        handleShowEditSubFamSuc();
        fetchSubFamilyData();
      })
      .catch(function(error) {
        console.error(
          "Error updating sub family:",
          error.response ? error.response.data : error.message
        );
      });
    console.log(subFamily);
  };

  // Method to initiate family deletion
  const handleDeleteFamily = (familyId) => {
    axios
      .delete(`${apiUrl}/family/delete/${familyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(function(response) {
        console.log(response.data, "delete family");
        handleCloseEditFam(); // Close edit family modal after deletion
        handleShowEditFamDel(); // Show success modal for family deletion
        fetchFamilyData();

        // Optionally, update state or refresh data after deletion
      })
      .catch(function(error) {
        console.error(
          "Error deleting family:",
          error.response ? error.response.data : error.message
        );
      });
  };

  // Method to initiate subfamily deletion
  const handleDeleteSubFamily = (subFamilyId) => {
    axios
      .delete(`${apiUrl}/subfamily/delete/${subFamilyId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(function(response) {
        console.log(response.data, "delete sub family");
        handleCloseEditSubFam(); // Close edit subfamily modal after deletion
        handleShowEditSubFamDel(); // Show success modal for subfamily deletion
        fetchSubFamilyData();

        // Optionally, update state or refresh data after deletion
      })
      .catch(function(error) {
        console.error(
          "Error deleting sub family:",
          error.response ? error.response.data : error.message
        );
      });
  };
  // Add Product
  const [ formData, setFormData ] = useState({
    name: "",
    code: "",
    production_center_id: "",
    cost_price: "",
    sale_price: "",
    family_id: "",
    sub_family_id: "",
    description: ""
  });
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ uploadedFile, setUploadedFile ] = useState();
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadedFile(null); // Reset uploaded file if a new file is selected
  };
  const handleCheckedInput = (id) => {
    // alert("hello" + id);
    // setObj1([])
    axios
      .post(`${apiUrl}/item/getSubFamilyWiseItem`, {
        families: [ id ]
      })
      .then(function(response) {
        console.log(response.data.items);

        // You may want to update the state with the updated family details if needed
      })
      .catch(function(error) {
        console.error(
          "Error updating family:",
          error.response ? error.response.data : error.message
        );
      });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    console.log(...data);

    try {
      const response = await axios.post(`${apiUrl}/item/create`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUploadedFile(response.data.file); // Save uploaded file information
        handleShow1AddSuc();
        handleClose1();
        fetchAllItems();
      }
    } catch (error) {
      setErrorMessage("Error adding article");
    }
  };
  // console.log(childCheck);
  // Handle family selection change

  // Handle family selection change
  const handleFamilyChange = (event) => {
    // const { name, value } = e.target;
    const familyName = event.target.value;
    setSelectedFamily(familyName);
    handleInputChange(event);
  };

  // Filter sub-family options based on selected family name
  const filteredSubFamilies = childCheck.filter(
    (childItem) => childItem.family_name === selectedFamily
  );
// **********************************************

  return (
    <div className="m_bg_black">
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white  b_borderrr jay-table-fixed-kya  ">
            <h5 className="mb-0" style={{ fontSize: "18px" }}>
              Artículos
            </h5>
          </div>

          <div className="row ">
            <div className="col-sm-2 col-4 m_bgblack m-0 p-0 b_bring ">
              <div className="j-articals-sticky">
                <div className="ms-3 pe-3 mt-2">
                  <div className="b_bring_b  ">
                    <p
                      className="text-white  my-2 "
                      style={{ fontSize: "14px" }}
                    >
                      Familias y subfamilias
                    </p>
                    <div>
                      <Dropdown data-bs-theme="dark" className="m_drop pb-3 ">
                        <Dropdown.Toggle
                          id="dropdown-button-dark-example1"
                          className="b_blue_new11 b_togllle"
                          variant="primary"
                          style={{ fontSize: "12px" }}
                        >
                          + crear
                        </Dropdown.Toggle>

                        <Dropdown.Menu
                          className="m14"
                          style={{ backgroundColor: "#374151" }}
                        >
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
                  <Modal.Header
                    closeButton
                    className="m_borbot  b_border_bb mx-3 ps-0"
                  >
                    <Modal.Title>Crear familia</Modal.Title>
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
                        onChange={(e) => setFamName(e.target.value)}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 pt-0">
                    <Button
                      variant="primary"
                      className="b_btn_pop"
                      onClick={() => {
                        // handleShowCreSuc();
                        // handleClose();
                        handleCreateFam();
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
                  <Modal.Header
                    closeButton
                    className="m_borbot b_border_bb  mx-3 ps-0"
                  >
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
                        value={subSelectName}
                        onChange={(e) => setSubSelectName(e.target.value)}
                      >
                        <option selected>Seleccionar</option>
                        {parentCheck.map((ele, index) => (
                          <option key={ele.id} value={ele.id}>
                            {ele.name}
                          </option>
                        ))}
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
                        onChange={(e) => setSubFamName(e.target.value)}
                      />
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 pt-0 ">
                    <Button
                      variant="primary"
                      className="b_btn_pop"
                      onClick={() => {
                        handleCreateSubFam();
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
                  {Array.isArray(parentCheck) &&
                    parentCheck.map((parentItem) => (
                      <div key={parentItem.id}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                          <div
                            className="text-nowrap"
                            style={{ fontSize: "14px" }}
                          >
                            <label>
                              <input
                                type="checkbox"
                                checked={!!checkedParents[parentItem.id]}
                                onChange={() =>
                                  handleParentChange(parentItem.id)}
                                className="me-2 custom-checkbox"
                              />

                              <span className="text-white">
                                {parentItem.name}
                              </span>
                            </label>
                          </div>
                          <div
                            className="text-white  "
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              handleShowEditFam(parentItem);
                            }}
                          >
                            <BsThreeDots className="j-tbl-dot-color" />
                          </div>
                          {/* Edit family */}
                        </div>

                        {checkedParents[parentItem.id] && (
                          <div style={{ marginLeft: "20px" }}>
                            {Array.isArray(childCheck) &&
                              childCheck
                                .filter(
                                  (childItem) =>
                                    childItem.family_name === parentItem.name
                                )
                                .map((childItem) => (
                                  <div key={childItem.id}>
                                    <div className="d-flex align-content-center justify-content-between my-2">
                                      <div style={{ fontSize: "14px" }}>
                                        <label className="text-white ">
                                          <input
                                            type="checkbox"
                                            className="mx-2 custom-checkbox"
                                          />
                                          {childItem.name}
                                        </label>
                                      </div>
                                      <div
                                        className="text-white"
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                          handleShowEditSubFam(childItem);
                                        }}
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
            {/* Edit family */}

            <Modal
              show={showEditFam}
              onHide={handleCloseEditFam}
              backdrop={true}
              keyboard={false}
              className="m_modal"
            >
              <Modal.Header
                closeButton
                className="m_borbot b_border_bb mx-3 ps-0"
              >
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
                    value={selectedFamily ? selectedFamily.name : ""}
                    onChange={(e) =>
                      setSelectedFamily({
                        ...selectedFamily,
                        name: e.target.value
                      })}
                  />
                  {console.log(selectedFamily , "select fam")}
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0">
                <Button
                  variant="danger"
                  className="b_btn_close"
                  onClick={() => {
                    handleCloseEditFam();
                    handleDeleteFamily(selectedFamily.id);
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  className="b_btn_pop"
                  onClick={() => {
                    handleCloseEditFam();
                    handleUpdateFamily(selectedFamily);
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
                  <img src={require("../Image/check-circle.png")} alt="" />
                  <p className="mb-0 mt-2 h6">Sus cambios</p>
                  <p className="opacity-75">Han sido guardados correctamente</p>
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
                  <img src={require("../Image/trash-check 1.png")} alt="" />
                  <p className="mb-0 mt-2 h6">Familia</p>
                  <p className="opacity-75">Ha sido eliminada correctamente</p>
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
                  {console.log("fmaily id",selectedSubFamily)}
                  <select
                    className="form-select m_input"
                    aria-label="Default select example"
                    value={selectedSubFamily ? selectedSubFamily.family_name : ""}
                    onChange={(e) =>
                      setSelectedSubFamily({
                        ...selectedSubFamily,
                        family_id: e.target.value
                      })}
                  >
                    <option selected>Seleccionar</option>
                    {parentCheck.map((family) => (
                      <option key={family.id} value={family.id}>
                        {family.name}
                      </option>
                    ))}
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
                    value={selectedSubFamily ? selectedSubFamily.name : ""}
                    onChange={(e) =>
                      setSelectedSubFamily({
                        ...selectedSubFamily,
                        name: e.target.value
                      })}
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0">
                <Button
                  variant="danger"
                  onClick={() => {
                    handleCloseEditSubFam();
                    handleDeleteSubFamily(selectedSubFamily.id);
                  }}
                >
                  Eliminar
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    handleCloseEditSubFam();
                    handleUpdateSubFamily(selectedSubFamily);
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
                  <img src={require("../Image/check-circle.png")} alt="" />
                  <p className="mb-0 mt-2 h6">Sus cambios</p>
                  <p className="opacity-75">Han sido guardados correctamente</p>
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
                  <img src={require("../Image/trash-check 1.png")} alt="" />
                  <p className="mb-0 mt-2 h6">Familia</p>
                  <p className="opacity-75">Ha sido eliminada correctamente</p>
                </div>
              </Modal.Body>
            </Modal>
            <div className="col-sm-10 col-8 m-0 p-0">
              <div className="p-3 m_bgblack  text-white d-flex justify-content-between align-items-center flex-wrap">
                <h6 className="">Bebidas</h6>
                <div>
                  {/* add product */}
                  <Button
                    className="b_blue_new11"
                    variant="primary text-nowrap"
                    style={{ fontSize: "14px" }}
                    onClick={handleShow1}
                  >
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
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
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
                                name="code"
                                placeholder="01234"
                                value={formData.code}
                                onChange={handleInputChange}
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
                              value={formData.production_center_id}
                              onChange={handleInputChange}
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
                                name="cost_price"
                                placeholder="$0.00"
                                value={formData.cost_price}
                                onChange={handleInputChange}
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
                                name="sale_price"
                                value={formData.sale_price}
                                onChange={handleInputChange}
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
                                name="family_id"
                                id="family"
                                value={formData.family_id}
                                onChange={(e) => {
                                  const selectedFamilyId = e.target.value;
                                  setFormData({
                                    ...formData,
                                    family_id: selectedFamilyId
                                  });
                                  getSubFamilies(); // Assuming this function needs to be called on change
                                }}
                              >
                                <option selected>Seleccionar</option>
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
                                htmlFor="exampleFormControlInput7"
                                className="form-label"
                              >
                                Subfamilia
                              </label>
                              <select
                                className="form-select m_input"
                                aria-label="Default select example"
                                name="sub_family_id"
                                value={formData.sub_family_id}
                                onChange={handleInputChange}
                              >
                                <option selected>Seleccionar</option>
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
                              htmlFor="exampleFormControlInput8"
                              className="form-label"
                            >
                              Descripción
                            </label>
                            <input
                              type="text"
                              className="form-control m_input"
                              id="exampleFormControlInput8"
                              name="description"
                              placeholder="-"
                              value={formData.description}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row ms-3">
                          <div
                            className="m_file-upload .m_file-upload1 "
                            onClick={() => fileInputRef.current.click()}
                          >
                            <input
                              type="file"
                              ref={fileInputRef}
                              onChange={handleFileChange}
                              style={{ display: "none" }}
                              accept=".svg,.png,.jpg,.jpeg,.gif"
                            />
                            <p>
                              <img src={require("../Image/v111.png")} alt="" />
                            </p>
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
                            {uploadedFile && (
                              <div>
                                <p>
                                  Uploaded file: {uploadedFile.originalname}
                                </p>
                                <img
                                  src={`http://localhost:3000/${uploadedFile.path}`}
                                  alt="Uploaded"
                                  style={{
                                    maxWidth: "100%",
                                    maxHeight: "200px"
                                  }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </form>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button
                        variant="primary"
                        style={{ backgroundColor: "#147BDE" }}
                        onClick={(e) => {
                          handleClose1();
                          handleFormSubmit(e);
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
                {obj1 &&
                  ((checkedParents &&
                    Object.keys(checkedParents).some(
                      (key) => checkedParents[key]
                    )) ||
                  (childCheck &&
                    Object.keys(childCheck).some(
                      (key) => childCheck[key] && Array.isArray(childCheck[key])
                    ))
                    ? obj1.filter(
                        (item) =>
                          checkedParents[item.family_id] ||
                          (childCheck &&
                            Object.keys(childCheck).some(
                              (key) =>
                                Array.isArray(childCheck[key]) &&
                                childCheck[key].some(
                                  (child) =>
                                    child.id === item.child_id &&
                                    child.family_name === item.family.name
                                )
                            ))
                      )
                    : obj1).map((ele, index) => (
                    <div
                      className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                      keys={ele.id}
                    >
                      <SingProd
                        id={ele.id}
                        image={ele.image}
                        name={ele.name}
                        price={ele.sale_price}
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
