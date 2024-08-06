import React, { useState, useRef, useEffect } from "react";
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
import axios from "axios";
import Loader from "./Loader";

export default function ProductionCenter() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const [token] = useState(sessionStorage.getItem("token"));
  const [isLoading, setIsLoading] = useState(true);

  const [productionCenters, setProductionCenters] = useState([]);
  const [prodName, setProdName] = useState("");
  const [printerCode, setPrinterCode] = useState("");
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [selectedMenus, setSelectedMenus] = useState([]);
  const [items, setItems] = useState([]);
  const [item, setItem] = useState([]);
  const [obj1, setObj1] = useState([]);
  const [parentCheck, setParentCheck] = useState([]);
  const [childCheck, setChildCheck] = useState([]);
  const [filteredItemsMenu, setFilteredItemsMenu] = useState(obj1);
  const [itemId, setItemId] = useState([]);
  const [menuId, setMenuId] = useState(null);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [selectedItemsMenu, setSelectedItemsMenu] = useState(new Set());
  const [searchTermMenu, setSearchTermMenu] = useState(""); // State to hold search term
  const [previousFilteredItems, setPreviousFilteredItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectedParentNames, setSelectedParentNames] = useState([]); // State to hold selected parent names
  const [selectedProductionCenters, setSelectedProductionCenters] = useState([]);

  const [currentProdCenter, setCurrentProdCenter] = useState({
    id: null,
    name: "",
    printer_code: ""
  });

  const [prodNameError, setProdNameError] = useState("");
  const [printerCodeError, setPrinterCodeError] = useState("");

  // Update these handlers
  const handleProdNameChange = (e) => {
    setProdName(e.target.value);
    if (e.target.value.trim()) {
      setProdNameError("");
    }
  };

  const handlePrinterCodeChange = (e) => {
    setPrinterCode(e.target.value);
    if (e.target.value.trim()) {
      setPrinterCodeError("");
    }
  };
  // Add these handlers
  const handleEditNameChange = (e) => {
    setCurrentProdCenter({
      ...currentProdCenter,
      name: e.target.value
    });
    if (e.target.value.trim()) {
      setEditNameError("");
    }
  };

  const handleEditPrinterCodeChange = (e) => {
    setCurrentProdCenter({
      ...currentProdCenter,
      printer_code: e.target.value
    });
    if (e.target.value.trim()) {
      setEditPrinterCodeError("");
    }
  };

  const validateProductionCenter = () => {
    let isValid = true;

    if (!prodName.trim()) {
      setProdNameError("El nombre es requerido");
      isValid = false;
    } else {
      setProdNameError("");
    }

    if (!printerCode.trim()) {
      setPrinterCodeError("El código de impresora es requerido");
      isValid = false;
    } else {
      setPrinterCodeError("");
    }

    return isValid;
  };

  const [checkedParents, setCheckedParents] = useState(
    parentCheck.reduce((acc, family) => ({ ...acc, [family.id]: true }), {})
  );

  // Add product
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => {
    setShow1(true);
    setCount(0);
  };

  // add product success
  const [show1AddMenuSuc, setShow1AddMenuSuc] = useState(false);
  const handleClose1AddMenuSuc = () => setShow1AddMenuSuc(false);
  const handleShow1AddMenuSuc = () => {
    setShow1AddMenuSuc(true);
    setTimeout(() => {
      setShow1AddMenuSuc(false);
    }, 2000);
  };
  // create production center
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // create production success
  const [showCreSucProduction, setShowCreSucProduction] = useState(false);
  const handleCloseCreSucProduction = () => setShowCreSucProduction(false);
  const handleShowCreSucProduction = () => {
    setShowCreSucProduction(true);
    setTimeout(() => {
      setShowCreSucProduction(false);
    }, 2000);
  };

  // Add producttion
  const [show1Prod, setShow1Prod] = useState(false);
  const handleClose1Prod = () => {
    setShow1Prod(false);
    setCount(0);
  };
  const handleShow1Prod = () => setShow1Prod(true);

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true);
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
    setShowEditProductionSuc(true);
    setTimeout(() => {
      setShowEditProductionSuc(false);
    }, 2000);
  };

  // edit family Eliminat
  const [showEditProductionDel, setShowEditProductionDel] = useState(false);
  const handleCloseEditProductionDel = () => setShowEditProductionDel(false);
  const handleShowEditProductionDel = () => {
    setShowEditProductionDel(true);
    setTimeout(() => {
      setShowEditProductionDel(false);
    }, 2000);
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

  // filter
  const [selectedFilters, setSelectedFilters] = useState({
    Gelatinas: false,
    Pasteles: false,
    Bizcochos: false,
    "Frutas con crema": false,
    Jugos: false
  });

  const [isFilterActive, setIsFilterActive] = useState(false);

  const handleResetFilters = () => {
    setSelectedFilters({
      Gelatinas: false,
      Pasteles: false,
      Bizcochos: false,
      "Frutas con crema": false,
      Jugos: false
    });
    setIsFilterActive(false);
  };

  // const handleCheckboxChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: checked
  //   }));
  // };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [name]: checked
      };
      const anyFilterActive = Object.values(newFilters).some(value => value);
      setIsFilterActive(anyFilterActive);
      return newFilters;
    });
  };
  // const clearFilter = (name) => {
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     [name]: false
  //   }));
  // };

  const clearFilter = (roleId) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = {
        ...prevFilters,
        [roleId]: false
      };
      const anyFilterActive = Object.values(newFilters).some(value => value);
      setIsFilterActive(anyFilterActive);
      return newFilters;
    });
  };

  const [count, setCount] = useState(0);

  const handleAddClick = () => {
    setCount(count + 1);
  };

  // ****************************************API***************************************
  useEffect(
    () => {
      setIsLoading(true);
      if (token) {
        getProductionCenters();
        fetchAllItems();
        fetchFamilyData();
        fetchSubFamilyData();
        setIsLoading(false);
      }
    },
    [token]
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

  // get production centers
  const getProductionCenters = async () => {
    try {
      const response = await axios.get(`${apiUrl}/production-centers`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProductionCenters(response.data.data);
    } catch (error) {
      console.error("Error fetching production centers:", error);
    }
  };

  // get product
  const fetchAllItems = async () => {
    try {
      const response = await axios.get(`${apiUrl}/item/getAll`);
      setObj1(response.data.items);
      setFilteredItemsMenu(response.data.items);
      setItems(response.data.items);
    } catch (error) {
      console.error(
        "Error fetching items:",
        error.response ? error.response.data : error.message
      );
    }
  };

  //   create production center
  const createProductionCenter = async () => {
    if (validateProductionCenter()) {
      try {
        const response = await axios.post(
          `${apiUrl}/create/production-centers`,
          {
            name: prodName,
            printer_code: printerCode
          },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        console.log("Production center created:", response.data);
        getProductionCenters();
        handleShowCreSucProduction();
        handleCloseCreate();
        setProdName("");
        setPrinterCode("");
      } catch (error) {
        console.error("Error creating production center:", error);
      }
    }
  };

  // edit production center
  const handleEditClick = (prodCenter) => {
    setCurrentProdCenter({
      ...prodCenter,
      name: prodCenter.name || '',
      printer_code: prodCenter.printer_code || ''
    });
    handleShowEditProduction();
  };
  // update production center
  const [editNameError, setEditNameError] = useState("");
  const [editPrinterCodeError, setEditPrinterCodeError] = useState("");

  const validateEditProductionCenter = () => {
    let isValid = true;

    if (!currentProdCenter.name || typeof currentProdCenter.name !== 'string' || !currentProdCenter.name.trim()) {
      setEditNameError("El nombre es requerido");
      isValid = false;
    } else {
      setEditNameError("");
    }

    if (!currentProdCenter.printer_code || typeof currentProdCenter.printer_code !== 'string' || !currentProdCenter.printer_code.trim()) {
      setEditPrinterCodeError("El código de impresora es requerido");
      isValid = false;
    } else {
      setEditPrinterCodeError("");
    }

    return isValid;
  };

  // const updateProductionCenter = async () => {
  //   if (validateEditProductionCenter()) {
  //     try {
  //       const response = await axios.post(
  //         `${apiUrl}/update/production-centers/${currentProdCenter.id}`,
  //         {
  //           name: currentProdCenter.name,
  //           printer_code: currentProdCenter.printer_code
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`
  //           }
  //         }
  //       );
  //       console.log("Production center updated:", response.data);
  //       getProductionCenters();
  //       handleShowEditProductionSuc();
  //       handleCloseEditProduction();
  //     } catch (error) {
  //       console.error("Error updating production center:", error);
  //     }
  //   }
  // };

  // ... existing code ...
  const updateProductionCenter = async () => {
    try {
      const updatedData = {
        name: currentProdCenter.name,
        // Only include printer_code if it has changed
        ...(currentProdCenter.printer_code && { printer_code: currentProdCenter.printer_code })
      };

      const response = await axios.post(
        `${apiUrl}/update/production-centers/${currentProdCenter.id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log("Production center updated:", response.data);
      getProductionCenters();
      handleShowEditProductionSuc();
      handleCloseEditProduction();
    } catch (error) {
      console.error("Error updating production center:", error);
    }

  };
  // ... existing code ...

  // Function to handle adding an item
  const handleAddItem = (item) => {
    if (!selectedItemsMenu.has(item)) {
      setSelectedItemsMenu(new Set(selectedItemsMenu).add(item));
      setSelectedItemsCount(selectedItemsCount + 1);
      setItemId((prevArray) => [...prevArray, item]);

      // Perform any other action here when adding an item
      console.log(`Added item ${item.id}`);
    } else {
      console.log(`Item ${item.id} already added`);
    }
  };

  //  delete production center
  const deleteProductionCenter = async (id) => {
    try {
      await axios.get(`${apiUrl}/delete/production-centers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("Production center deleted");
      getProductionCenters();

      handleCloseEditProduction();
      handleShowEditProductionDel();
    } catch (error) {
      console.error("Error deleting production center:", error);
    }
  };

  // filter based on production centers
  const handleProductionCenterChange = (productionCenterId) => {
    const updatedSelectedMenus = selectedMenus.includes(productionCenterId)
      ? selectedMenus.filter((selected) => selected !== productionCenterId)
      : [...selectedMenus, productionCenterId];
    setSelectedMenus(updatedSelectedMenus);

    // Find the selected production center
    const selectedCenter = productionCenters.find(center => center.id === productionCenterId);
    if (updatedSelectedMenus.includes(productionCenterId)) {
      setSelectedProductionCenters(prev => [...prev, selectedCenter]);
    } else {
      setSelectedProductionCenters(prev => prev.filter(center => center.id !== productionCenterId));
    }

    const filteredItems =
      updatedSelectedMenus.length > 0
        ? obj1.filter((item) =>
          updatedSelectedMenus.includes(item.production_center_id)
        )
        : obj1;

    setItems(filteredItems);
  };


  const handleAddMenu = async () => {
    try {
      const response = await axios.post(
        `${apiUrl}/item/addToMenu`,
        {
          item_ids: itemId,
          menu_id: menuId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      );

      console.log("API Response:", response.data);

      if (response.data.success) {
        // Handle UI updates
        handleClose1();
        handleShow1AddMenuSuc();

        // Clear item IDs
        setItemId([]);

        window.location.reload();
      } else {
        console.error("Failed to add items to menu");
      }
    } catch (error) {
      console.error(
        "Error adding items to menu:",
        error.response ? error.response.data : error.message
      );
    }
  };


  const handleSearchMenu = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTermMenu(term);
    setFilteredItemsMenu(filterItems(term, checkedParents, childCheck));
  };

  const handleParentChangeMenu = (parentId) => {
    const newCheckedParents = {
      ...checkedParents,
      [parentId]: !checkedParents[parentId]
    };
    setCheckedParents(newCheckedParents);

    // Update selected parent names
    const parentItem = parentCheck.find((item) => item.id === parentId);
    if (parentItem) {
      if (newCheckedParents[parentId]) {
        // Add the parent name if checked
        setSelectedParentNames((prev) => [...prev, parentItem.name]);
      } else {
        // Remove the parent name if unchecked
        setSelectedParentNames((prev) =>
          prev.filter((name) => name !== parentItem.name)
        );
      }
    }

    // Update filtered items based on checked parents
    const updatedFilteredItems = filterItems(
      searchTermMenu,
      newCheckedParents,
      childCheck
    );
    setFilteredItemsMenu(updatedFilteredItems);
  };
  // New function to handle child checkbox changes
  const handleChildCheckboxChange = (childId) => {
    // Check if items are available

    const selectedChildItems = obj1.filter(
      (item) => item.sub_family_id === childId
    );

    // If the child is checked, show its items and save the current items to previousFilteredItems
    if (selectedItems.has(childId)) {
      setPreviousFilteredItems(filteredItemsMenu); // Save current items
      setFilteredItemsMenu(selectedChildItems);
    } else {
      // If unchecked, restore previous items
      setFilteredItemsMenu(previousFilteredItems);
    }
  };
  // Update the checkbox change logic to toggle the selected state
  const toggleChildSelection = (childId) => {
    if (selectedItems.has(childId)) {
      selectedItems.delete(childId);
    } else {
      selectedItems.add(childId);
    }
    handleChildCheckboxChange(childId);
  };

  const filterItems = (searchTerm, checkedParents, childCheck) => {
    return obj1.filter((item) => {
      const matchesSearch = item.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesCheckbox =
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
          ));

      return (
        matchesSearch &&
        (Object.keys(checkedParents).every((key) => !checkedParents[key]) ||
          matchesCheckbox)
      );
    });
  };






  
  return (
    <div className="m_bg_black">
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div className=" flex-grow-1 sidebar">
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <div className="p-3 m_bgblack text-white m_borbot jay-table-fixed-kya">
                <h5 className="mb-0" style={{ fontSize: "18px" }}>
                  Centro de producción
                </h5>
              </div>

              <div className="row ">
                <div
                  className="col-sm-2 col-4 m_bgblack   m-0 p-0  m_borrig "
                  style={{ height: "auto" }}
                >
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
                      <Modal.Header
                        closeButton
                        className="m_borbot b_border_bb mx-3 ps-0"
                      >
                        <Modal.Title>
                          <Link
                            className="text-white text-decoration-none "
                            to="/singleatricleproduct"
                          >
                            <span className="p-0">
                              Crear centro de producción
                            </span>
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
                            value={prodName}
                            onChange={handleProdNameChange}
                          />
                          {prodNameError && (
                            <div className="text-danger errormessage">
                              {prodNameError}
                            </div>
                          )}
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
                            value={printerCode}
                            onChange={handlePrinterCodeChange}
                          />
                          {printerCodeError && (
                            <div className="text-danger errormessage">
                              {printerCodeError}
                            </div>
                          )}
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="border-0 pt-0">
                        <Button
                          variant="primary"
                          className="b_btn_pop"
                          style={{ borderRadius: "10px" }}
                          onClick={() => {
                            createProductionCenter();
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
                          <img
                            src={require("../Image/check-circle.png")}
                            alt=""
                          />
                          <p className="mb-0 mt-2 h6">Centro de producción</p>
                          <p className="opacity-75">
                            Ha sido creado exitosamente
                          </p>
                        </div>
                      </Modal.Body>
                    </Modal>

                    <div className="py-3 m_borbot mx-3 j-table-position-sticky-sector">
                      {productionCenters.map((item, index) => (
                        <div key={item.id}>
                          <div className="d-flex justify-content-between m14 align-items-center flex-wrap mb-2">
                            <div className="text-nowrap ">
                              <label className="d-flex align-items-center">
                                <input
                                  type="checkbox"
                                  className="me-2 custom-checkbox"
                                  onChange={() =>
                                    handleProductionCenterChange(item.id)}
                                />
                                <p className="text-white mb-0">{item.name}</p>
                              </label>
                            </div>
                            <div
                              className="text-white  "
                              style={{ cursor: "pointer" }}
                              onClick={() => handleEditClick(item)}
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
                        <Modal.Header
                          closeButton
                          className="m_borbot b_border_bb mx-3 ps-0"
                        >
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
                              value={currentProdCenter.name}
                              onChange={handleEditNameChange}
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
                              value={currentProdCenter.printer_code}
                              onChange={handleEditPrinterCodeChange}
                            />

                          </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0 pt-0">
                          <Button
                            variant="danger"
                            className="b_btn_close"
                            onClick={() => {
                              deleteProductionCenter(currentProdCenter.id);
                            }}
                          >
                            Eliminar
                          </Button>
                          <Button
                            variant="primary"
                            className="b_btn_pop"
                            onClick={updateProductionCenter}
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
                    <h6 className="m14">
                      {selectedProductionCenters.length > 0
                        ? selectedProductionCenters.map(center => center.name).join(" , ")
                        : ""}
                    </h6>
                    <div className="d-flex gap-4">
                      <div>
                        <Dropdown data-bs-theme="dark" className="m_drop pb-3">
                          <Dropdown.Toggle
                            id="dropdown-button-dark-example1"
                            variant="outline-primary"
                            style={{ fontSize: "12px" }}
                            className="btn btn-outline-primary b_togllle b_border_out b_ttt"
                          >
                            <FaFilter /> &nbsp;{" "}
                            <span className="b_ttt">Filtro</span>
                          </Dropdown.Toggle>

                          <Dropdown.Menu className="m14  m_filter">
                            <p className="px-3 py-1 fw-500 mb-0 text-end" style={{ color: "#2D8EEC", cursor: "pointer" }} onClick={handleResetFilters}>Restaurar</p>

                            <div className="px-3 py-1 d-flex gap-2 align-items-center fw-500">
                              <input
                                type="checkbox"
                                className="j-change-checkbox j_check_white"
                                name="Gelatinas"
                                checked={selectedFilters.Gelatinas}
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span className="fw-500">Gelatinas</span>
                            </div>
                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                              <input
                                className="j-change-checkbox j_check_white"
                                type="checkbox"
                                name="Pasteles"
                                checked={selectedFilters.Pasteles}
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span>Pasteles</span>
                            </div>
                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                              <input
                                className="j-change-checkbox j_check_white"
                                type="checkbox"
                                name="Bizcochos"
                                checked={selectedFilters.Bizcochos}
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span>Bizcochos</span>
                            </div>
                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                              <input
                                className="j-change-checkbox j_check_white"
                                type="checkbox"
                                name="Frutas con crema"
                                checked={selectedFilters["Frutas con crema"]}
                                onChange={handleCheckboxChange}
                              />{" "}
                              <span>Frutas con crema</span>
                            </div>
                            <div className="px-3 py-1 d-flex gap-2 align-items-center">
                              <input
                                className="j-change-checkbox j_check_white"
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
                                    <p className="text-white m14 my-2">
                                      Familias y subfamilias
                                    </p>
                                  </div>
                                </div>

                                <div className="py-3 m_borbot mx-3  m14 ">
                                  {Array.isArray(parentCheck) &&
                                    parentCheck.map((parentItem) => (
                                      <div key={parentItem.id}>
                                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                          <div className="text-nowrap">
                                            <label>
                                              <input
                                                type="checkbox"
                                                checked={
                                                  !!checkedParents[
                                                  parentItem.id
                                                  ]
                                                }
                                                onChange={() =>
                                                  handleParentChangeMenu(
                                                    parentItem.id
                                                  )}
                                                className="me-2 custom-checkbox"
                                              />
                                              <span className="text-white">
                                                {parentItem.name}
                                              </span>
                                            </label>
                                          </div>
                                        </div>

                                        {checkedParents[parentItem.id] && (
                                          <div style={{ marginLeft: "20px" }}>
                                            {Array.isArray(childCheck) &&
                                              childCheck
                                                .filter(
                                                  (childItem) =>
                                                    childItem.family_name ===
                                                    parentItem.name
                                                )
                                                .map((childItem) => (
                                                  <div key={childItem.id}>
                                                    <div className="d-flex align-content-center justify-content-between my-2 m14">
                                                      <div>
                                                        <label className="text-white">
                                                          <input
                                                            type="checkbox"
                                                            className="mx-2 custom-checkbox"
                                                            onChange={() => {
                                                              toggleChildSelection(
                                                                childItem.id
                                                              );
                                                            }}
                                                          />
                                                          {childItem.name}
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
                                  <h6 >
                                    {selectedParentNames.length > 0 && (
                                      <div className="selected-parents-list ">
                                        {selectedParentNames.join(" , ")}
                                      </div>
                                    )}
                                  </h6>
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
                                            value={searchTermMenu}
                                            onChange={handleSearchMenu}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                    <div>
                                      <Button
                                        className="mgreenbtn pt-2  m14 border-0 text-nowrap"
                                        onClick={() => {
                                          handleAddMenu();
                                        }}
                                      >
                                        Añadir nuevos
                                        <Badge
                                          bg="light"
                                          className="ms-2 text-success rounded-circle m12"
                                        >
                                          {selectedItemsCount}
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
                                {filteredItemsMenu.length > 0 ? (
                                  filteredItemsMenu.map((ele, index) => (
                                    <div
                                      className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                                      key={ele.id} // Corrected from 'keys' to 'key'
                                    >
                                      <div>
                                        <div className="card m_bgblack text-white position-relative">
                                          <img
                                            src={`${API}/images/${ele.image}`}
                                            className="card-img-top object-fit-cover rounded"
                                            alt="..."
                                            style={{ height: "162px" }}
                                          />
                                          <div className="card-body">
                                            <h6 className="card-title">
                                              {ele.name}
                                            </h6>
                                            <h6 className="card-title">
                                              ${ele.sale_price}
                                            </h6>
                                            <p className="card-text opacity-50">
                                              Codigo: {ele.code}
                                            </p>
                                            <div
                                              onClick={() =>
                                                handleAddItem(ele.id)}
                                              className="btn w-100 btn-primary text-white"
                                            >
                                              <Link
                                                className="text-white text-decoration-none"
                                                style={{ fontSize: "14px" }}
                                              >
                                                <span className="ms-1">
                                                  Añadir{" "}
                                                </span>
                                              </Link>
                                            </div>
                                          </div>
                                          <div
                                            className="position-absolute"
                                            style={{ cursor: "pointer" }}
                                          >
                                            <Link
                                              to={`/articles/singleatricleproduct/${ele.id}`}
                                              className="text-white text-decoration-none"
                                            >
                                              <p
                                                className="px-1 rounded m-2"
                                                style={{
                                                  backgroundColor: "#374151"
                                                }}
                                              >
                                                <IoMdInformationCircle />{" "}
                                                <span
                                                  style={{ fontSize: "12px" }}
                                                >
                                                  Ver información
                                                </span>
                                              </p>
                                            </Link>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  ))
                                ) : (
                                  <div className="col-12 text-center text-white mt-5">
                                    <h5 className="opacity-75 m-0">
                                      No hay productos disponibles
                                    </h5>
                                  </div>
                                )}
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
                    {isFilterActive && <span className="text-white m14">Filtros:</span>}
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
                  {/* <div className="row p-2">
                    {items.map((ele, index) => (
                      <div
                        className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                        key={ele.id}
                      >
                        <div>
                          <div class="card m_bgblack text-white position-relative">
                            <img
                              src={`${API}/images/${ele.image}`}
                              class="card-img-top object-fit-cover rounded"
                              alt="..."
                              style={{ height: "162px" }}
                            />
                            <div class="card-body">
                              <h6 class="card-title">{ele.name}</h6>
                              <h6 class="card-title">$ {ele.sale_price}</h6>
                              <p class="card-text" style={{ fontSize: "14px" }}>
                                Codigo: {ele.code}
                              </p>
                              <div
                                class="btn w-100 btn-primary text-white b_ttt"
                                style={{ backgroundColor: "#147BDE" }}
                              >
                                <a
                                  href="# "
                                  className="text-white text-decoration-none "
                                  style={{ fontSize: "14px" }}
                                >
                                  <FaCartPlus />{" "}
                                  <span className="ms-1  ">
                                    Añadir al contador
                                  </span>
                                </a>
                              </div>
                            </div>
                            <div
                              className="position-absolute "
                              style={{ cursor: "pointer" }}
                            >
                              <Link
                                to={`/articles/singleatricleproduct/${ele.id}`}
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
                  </div> */}


                  <div className="row p-2">
                    {items.length > 0 ? (
                      items.map((ele, index) => (
                        <div
                          className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                          key={ele.id}
                        >
                          <div>
                            <div class="card m_bgblack text-white position-relative">
                              <img
                                src={`${API}/images/${ele.image}`}
                                class="card-img-top object-fit-cover rounded"
                                alt="..."
                                style={{ height: "162px" }}
                              />
                              <div class="card-body">
                                <h6 class="card-title">{ele.name}</h6>
                                <h6 class="card-title">$ {ele.sale_price}</h6>
                                <p class="card-text" style={{ fontSize: "14px" }}>
                                  Codigo: {ele.code}
                                </p>
                                <div
                                  class="btn w-100 btn-primary text-white b_ttt"
                                  style={{ backgroundColor: "#147BDE" }}
                                >
                                  <a
                                    href="# "
                                    className="text-white text-decoration-none "
                                    style={{ fontSize: "14px" }}
                                  >
                                    <FaCartPlus />{" "}
                                    <span className="ms-1  ">
                                      Añadir al contador
                                    </span>
                                  </a>
                                </div>
                              </div>
                              <div
                                className="position-absolute "
                                style={{ cursor: "pointer" }}
                              >
                                <Link
                                  to={`/articles/singleatricleproduct/${ele.id}`}
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
                      ))
                    ) : (
                      <div className="col-12 text-center mt-4">
                        <p className="text-white">No hay productos disponibles.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div >
  );
}
