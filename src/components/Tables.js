import React, { useEffect, useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import pic2 from "../img/Image(1).jpg";
import TableRecipt from "./TableRecipt";
import axios from "axios";

const Tables = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const token = sessionStorage.getItem("token");
  const [ isLoading, setIsLoading ] = useState(false);

  const [ secTab, setSecTab ] = useState([]);
  const [ checkboxes, setCheckboxes ] = useState([]);
  const [ selectedFamily, setSelectedFamily ] = useState({});
  const [ sectors, setsectors ] = useState([]);
  const [ newTable, setNewTable ] = useState({
    sectorName: "",
    noOfTables: ""
  });
  const [ addsector, setAddsector ] = useState({
    name: "",
    noOfTables: ""
  });
  const [ tableData, setTableData ] = useState([]);
  const [ obj1, setObj1 ] = useState([]);
  const [createErrors, setCreateErrors] = useState({ name: '', noOfTables: '' });
  const [editErrors, setEditErrors] = useState({ name: '', noOfTables: '' });
  const [addTableErrors, setAddTableErrors] = useState({ sectorName: '', noOfTables: '' });
  useEffect(
    () => {
      let isMounted = true;

      const fetchData = async () => {
        try {
          if (isMounted) {
            await Promise.all([
              getSector(),
              getSectorTable(),
              fetchAllItems()
            ]);
          }
        } catch (error) {
          if (isMounted) {
            console.error("Error fetching data:", error);
          }
        }
      };

      fetchData();

      // Cleanup function
      return () => {
        isMounted = false;
      };
    },
    [ apiUrl ]
  );

  /* get sector */

  const getSector = async () => {
    try {
      const response = await axios.get(`${apiUrl}/sector/getAll`);
      if (response.data.success) {
        setCheckboxes(response.data.sectors);
        setsectors(response.data.sectors);
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

  /* get table data */

  const getTableData = async (id) => {
    try {
      const response = await axios.get(`${apiUrl}/table/getStats/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setTableData(response.data);
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

  const getSectorTable = async () => {
    try {
      const response = await axios.post(`${apiUrl}/sector/getWithTable`);
      if (response.data) {
        setSecTab(response.data.data);
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

  // Get sectors
 // Modify handleChange function
const handleChange = (e) => {
  const { name, value } = e.target;
  setAddsector({
    ...addsector,
    [name]: value
  });
  // Clear error when user types
  setCreateErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
};
const handleNewTableChange = (e) => {
  const { name, value } = e.target;
  setNewTable((prev) => ({
    ...prev,
    [name]: value
  }));
  // Clear error when user types
  setAddTableErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
};

  //add table to sector

  const handleAddTableSubmit = async (e) => {
    e.preventDefault();
  
    // Reset errors
    setAddTableErrors({ sectorName: '', noOfTables: '' });
  
    let hasErrors = false;
  
    if (!newTable.sectorName) {
      setAddTableErrors(prev => ({ ...prev, sectorName: 'Por favor seleccione un sector' }));
      hasErrors = true;
    }
  
    if (isNaN(newTable.noOfTables) || newTable.noOfTables <= 0) {
      setAddTableErrors(prev => ({ ...prev, noOfTables: 'Por favor ingrese un número válido de tablas (debe ser mayor a 0)' }));
      hasErrors = true;
    }
  
    if (hasErrors) return;
  
    try {
      const response = await axios.post(
        `${apiUrl}/sector/addTables`,
        {
          sector_id: newTable.sectorName,
          noOfTables: newTable.noOfTables
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );
  
      if (response.status === 200) {
        handleShowCreSuc2();
        getSector();
        getSectorTable();
        handleClose1();
        setNewTable({ sectorName: "", noOfTables: "" }); // Reset form
      } else {
        console.error("Error updating sector:", response.data);
      }
    } catch (error) {
      console.error("Error updating sector:", error);
    }
  };
  // edit sector
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setEditErrors({ name: '', noOfTables: '' });
    
    let hasErrors = false;
    
    if (!selectedFamily.name.trim()) {
      setEditErrors(prev => ({ ...prev, name: 'Introduzca un nombre de sector' }));
      hasErrors = true;
    }
    
    if (isNaN(selectedFamily.noOfTables) || selectedFamily.noOfTables <= 0) {
      setEditErrors(prev => ({ ...prev, noOfTables: 'Por favor ingrese un número válido de tablas (debe ser mayor a 0)' }));
      hasErrors = true;
    }
  
    if (hasErrors) return;
  
    try {
      const response = await axios.post(`${apiUrl}/sector/update/${selectedFamily.id}`, selectedFamily, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      if (response.status === 200) {
        handleCloseEditFam();
        handleShowEditFamSuc();
        getSector();
        getSectorTable();
      }
    } catch (error) {
      console.error("Error updating sector:", error);
      alert("Failed to update sector. Please try again.");
    }
  };
  const handleEditSector = async () => {
    try {
      const response = await axios.put(`${apiUrl}/sector/update/${selectedFamily.id}`, {
        name: selectedFamily.name,
        noOfTables: selectedFamily.noOfTables
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
  
      if (response.status === 200) {
        handleCloseEditFam();
        handleShowEditFamSuc();
        getSector();
        getSectorTable();
      } else {
        throw new Error("Failed to update sector");
      }
    } catch (error) {
      console.error("Error updating sector:", error);
      alert("Failed to update sector. Please try again.");
    }
  };

  //create sector
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset errors
    setCreateErrors({ name: '', noOfTables: '' });
    
    let hasErrors = false;
    
    if (!addsector.name.trim()) {
      setCreateErrors(prev => ({ ...prev, name: 'Introduzca un nombre de sector' }));
      hasErrors = true;
    }
    
    if (isNaN(addsector.noOfTables) || addsector.noOfTables <= 0) {
      setCreateErrors(prev => ({ ...prev, noOfTables: 'Por favor ingrese un número válido de tablas (debe ser mayor a 0)' }));
      hasErrors = true;
    }
  
    if (hasErrors) return;
  
    try {
      const response = await axios.post(`${apiUrl}/sector/create`, addsector, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        maxBodyLength: Infinity
      });
      if (response.status === 200) {
        handleShowCreSuc();
        getSector();
        getSectorTable();
        handleClose();
        setAddsector({ name: "", noOfTables: "" }); // Reset form
      }
    } catch (error) {
      console.error("Error creating sector:", error);
      alert("Failed to create sector. Please try again.");
    }
  };

  //delete sector

  const handleDeleteFamily = (sectorId) => {
    axios
      .delete(`${apiUrl}/sector/delete/${sectorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        handleCloseEditFam();
                handleShowEditFamDel();
        setCheckboxes((prevCheckboxes) =>
          prevCheckboxes.filter((sector) => sector.id !== sectorId)
        );
        getSector();
        getSectorTable();
      })
      .catch((error) => {
        console.error(
          "Error deleting family:",
          error.response ? error.response.data : error.message
        );
      });
  };

  //edit sector
  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setSelectedFamily((prevFamily) => ({
      ...prevFamily,
      [name]: value
    }));
  };

  const hundleEditDeletePop = (sector) => {
    setSelectedFamily(sector);
    handleShowEditFam();
  };
  const [ selectedSectors, setSelectedSectors ] = useState([]);

  const handleCheckboxChange = (index) => {
    setSelectedSectors(
      (prevSelectedSectors) =>
        prevSelectedSectors.includes(index)
          ? prevSelectedSectors.filter((i) => i !== index)
          : [ ...prevSelectedSectors, index ]
    );
  };

  const [ filterStatus, setFilterStatus ] = useState("");

  const filteredTables = () => {
    let tables = secTab.flatMap((ele) => ele.tables);
    if (selectedSectors.length !== 0) {
      tables = secTab.flatMap(
        (ele, index) => (selectedSectors.includes(index) ? ele.tables : [])
      );
    }
    if (filterStatus) {
      tables = tables.filter((table) => table.status === filterStatus);
    }
    return tables;
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
  };

  // Add product
  const [ show1, setShow1 ] = useState(false);
  const handleClose1 = () => {setShow1(false); setAddTableErrors({sectorName:'',noOfTables:''}) };
  const handleShow1 = () => setShow1(true);

  // create family
  const [ show, setShow ] = useState(false);
  const handleClose = () => {setShow(false); setCreateErrors({ name: '', noOfTables: '' })};
  const handleShow = () => setShow(true);

  // create family success
  const [ showCreSuc, setShowCreSuc ] = useState(false);
  const handleCloseCreSuc = () => setShowCreSuc(false);
  const handleShowCreSuc = () => {
    setShowCreSuc(true);
    setTimeout(() => {
      setShowCreSuc(false);
    }, 2000);
  };
  // create recipe
  const [ show250, setShow250 ] = useState(false);
  const handleClose250 = () => setShow250(false);
  const handleShow250 = () => setShow250(true);

  const [ showCreSuc2, setShowCreSuc2 ] = useState(false);
  const handleCloseCreSuc2 = () => setShowCreSuc2(false);
  const handleShowCreSuc2 = () => {
    setShowCreSuc2(true);
    setTimeout(() => {
      setShowCreSuc2(false);
    }, 2000);
  };

  // create subfamily success
  const [ showCreSubSuc, setShowCreSubSuc ] = useState(false);
  const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
  const handleShowCreSubSuc = () => setShowCreSubSuc(true);

  // edit family
  const [ showEditFam, setShowEditFam ] = useState(false);
  const handleCloseEditFam = () => setShowEditFam(false);
  const handleShowEditFam = () => setShowEditFam(true);

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

  const [ countsoup, setCountsoup ] = useState([]);
  const [ cartItems, setCartItems ] = useState([]);

  const removeItemFromCart = (index) => {
    const newCartItems = [ ...cartItems ];
    newCartItems.splice(index, 1);
    setCartItems(newCartItems);

    const newCountsoup = [ ...countsoup ];
    newCountsoup.splice(index, 1);
    setCountsoup(newCountsoup);
  };

  const getTotalCost = () => {
    return cartItems.reduce(
      (total, item, index) => total + parseInt(item.price) * countsoup[index],
      0
    );
  };

  const [ isEditing, setIsEditing ] = useState(false);

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const [ selectedTable, setSelectedTable ] = useState(null);
  const [ showAvailableModal, setShowAvailableModal ] = useState(false);
  const [ showOcupadoModal, setShowOcupadoModal ] = useState(false);

  const handleCloseAvailableModal = () => setShowAvailableModal(false);
  const handleShowAvailableModal = (id) => {
    setSelectedTable(id);
    setShowAvailableModal(true);
    setShowOcupadoModal(false);
  };

  const handleCloseOcupadoModal = () => setShowOcupadoModal(false);
  const handleShowOcupadoModal = (id) => {
    setSelectedTable(id);
    setShowOcupadoModal(true);
    setShowAvailableModal(false);
  };

  /* get name and image */
  const getItemInfo = (itemId) => {
    const item = obj1.find((item) => item.id === itemId);
    return item
      ? { name: item.name, image: item.image }
      : { name: "Unknown Item", image: "" };
  };
  const [ addNotes, setAddNotes ] = useState(
    Array(tableData.flatMap((t) => t.items).length).fill(false)
  );

  const handleKeyDown = (index, e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission
      const updatedAddNotes = [ ...addNotes ];
      updatedAddNotes[index] = false;
      setAddNotes(updatedAddNotes);

      // Here, you might want to perform any final processing of the note
      // For example, trimming whitespace:
      const finalNote = e.target.value.trim();
      handleNoteChange(index, finalNote);
    }
  };
  /* add note */
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
  const [ showAll, setShowAll ] = useState(false);

  const handleShowMoreClick = (e) => {
    e.preventDefault();
    setShowAll(!showAll);
  };
  /* navigate to other page */
  const navigate = useNavigate();
  const handleInfoMesaClick = () => {
    navigate("/table/information", { state: { tableData } });
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
  //pass data to Datos
  const handleCobrarClcik = () => {
    navigate("/table/datos", { state: { tableData } });
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <Sidenav />
        <div className=" flex-grow-1 sidebar">
          <div className="p-3 m_bgblack text-white m_borbot j-tbl-font-1 jay-table-fixed-kya">
            <h5 className="mb-0 j-tbl-font-1">Mesas</h5>
          </div>
          <div className="row ">
            <div className="col-3 j-card-width1 m_bgblack j-table-position j-border-right m-0 p-0  m_borrig ">
              <div className="j-articals-sticky pt-1">
                <div className="ms-3 pe-3">
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
                {/* CREATE family */}
                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop={true}
                  keyboard={false}
                  className="m_modal"
                >
                  <Modal.Header closeButton className="b_border_bb1 px-0">
                    <Modal.Title className="j-tbl-text-10">
                      Crear sector
                    </Modal.Title>
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
                        value={addsector.name}
                        name="name"
                        onChange={handleChange}
                      />
                      {createErrors.name && <div className="text-danger errormessage">{createErrors.name}</div>}
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
                        name="noOfTables"
                        className="form-control j-table_input"
                        id="exampleFormControlInput1"
                        placeholder="0"
                        value={addsector.noOfTables}
                        onChange={handleChange}
                      />
                       {createErrors.noOfTables && <div className="text-danger errormessage">{createErrors.noOfTables}</div>}
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0">
                    <Button
                      className="j-tbl-btn-font-1 b_btn_pop"
                      variant="primary"
                      onClick={handleSubmit}
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
                      <p className="mb-0 mt-2 h6 j-tbl-pop-1">Sector</p>
                      <p className="opacity-75 j-tbl-pop-2">
                        Se ha creado exitosamente
                      </p>
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
                  <Modal.Header closeButton className="border-0" />
                  <Modal.Body>
                    <div className="text-center">
                      <img src={require("../Image/check-circle.png")} alt="" />
                      <p className="mb-0 mt-2 h6 j-tbl-pop-1">Mesas</p>
                      <p className="opacity-75 j-tbl-pop-2">
                        La mesas han sido agregadas exitosamente
                      </p>
                    </div>
                  </Modal.Body>
                </Modal>

                <div className="py-3 m_borbot ms-3 pe-3 me-3 ">
                  {Array.isArray(checkboxes) ? (
                    checkboxes.map((item, index) => (
                      <div key={item.id}>
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-nowrap">
                            <label className="d-flex align-items-center">
                              <input
                                type="checkbox"
                                className="me-2 custom-checkbox"
                                checked={selectedSectors.includes(index)}
                                onChange={() => handleCheckboxChange(index)}
                              />
                              <p className="mb-0 j-tbl-font-4">{item.name}</p>
                            </label>
                          </div>
                          <div
                            className="text-white"
                            style={{ cursor: "pointer" }}
                            onClick={() => hundleEditDeletePop(item)}
                          >
                            <BsThreeDots className="j-tbl-dot-color" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No checkboxes available</p>
                  )}
                </div>
              </div>
            </div>
            <div
              style={{ flexGrow: "1" }}
              className=" col-9 j-card-width2 j-table-position-second m-0 p-0"
            >
              <div className="m_bgblack j-tbl-font-5 j-block text-white">
                <h6 className="mb-0">Mesas</h6>
                <div>
                  <Button
                    className="j-blue-button b_btn_pop   j-tbl-font-3"
                    variant="primary"
                    onClick={handleShow1}
                  >
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
                      <Modal.Title className="j-tbl-text-10">
                        Agregar mesa
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="border-0">
                      <div className="mb-3">
                        <label
                          htmlFor="exampleFormControlInput1"
                          className="form-label j-tbl-font-11"
                        >
                          Sector
                        </label>
                        <select
                          className="form-select form-control j-table_input"
                          name="sectorName"
                          value={newTable.sectorName}
                          onChange={handleNewTableChange}
                        >
                          <option value="">Select Sector</option>
                          {sectors.map((sector) => (
                            <option key={sector.name} value={sector.id}>
                              {sector.name}
                            </option>
                          ))}
                        </select>
                        {addTableErrors.sectorName && <div className="text-danger errormessage">{addTableErrors.sectorName}</div>}
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
                          name="noOfTables"
                          value={newTable.noOfTables}
                          onChange={handleNewTableChange}
                        />
                        {addTableErrors.noOfTables && <div className="text-danger errormessage">{addTableErrors.noOfTables}</div>}
                      </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0">
                      <Button
                        className="j-tbl-font-11 b_btn_pop "
                        variant="primary"
                        onClick={handleAddTableSubmit}
                      >
                        Agregar
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </div>
              </div>

              <div className="j-show-table pb-3">
                <div className="j_tables_center ">
                  <div
                    onClick={() => handleFilterChange("available")}
                    className="j-available-table d-flex align-items-center"
                  >
                    <div className="j-a-table" />
                    <p className="j-table-color j-tbl-font-6">Disponible</p>
                  </div>
                  <div
                    onClick={() => handleFilterChange("busy")}
                    className="j-busy-table d-flex align-items-center"
                  >
                    <div className="j-b-table" />
                    <p className="j-table-color  j-tbl-font-6">Ocupado</p>
                  </div>
                </div>
                <div className="">
                  <p
                    className="j-table-all-color  j-tbl-font-6"
                    onClick={() => handleFilterChange("")}
                  >
                    Reiniciar
                  </p>
                </div>
              </div>

              <div className="j-table-bgcolor row p-4">
                {filteredTables().map((ele, index) => (
                  <div className="j-table-width" key={ele.id}>
                    <TableCard
                      onShowAvailableModal={() =>
                        handleShowAvailableModal(ele.id)}
                      onShowOcupadoModal={() => handleShowOcupadoModal(ele.id)}
                      name={ele.name}
                      no={ele.id}
                      code={ele.code}
                      status={ele.status}
                      selectedTable={selectedTable}
                      tId={ele.id}
                      oId={ele.order_id}
                      handleData={() => {
                        getTableData(ele.id);
                      }}
                      setSelectedTable={setSelectedTable}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* {/ Edit family /} */}
        <Modal
          show={showEditFam}
          onHide={handleCloseEditFam}
          backdrop={true}
          keyboard={false}
          className="m_modal jay-modal"
        >
          <Modal.Header
            closeButton
            className="j-caja-border-bottom p-0 m-3 mb-0 pb-3"
          >
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
                value={selectedFamily.name}
                name="name"
                onChange={handleEditChange}
              />
               {editErrors.name && <div className="text-danger errormessage">{editErrors.name}</div>}
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
                name="noOfTables"
                value={selectedFamily.noOfTables}
                onChange={handleEditChange}
              />
              {editErrors.noOfTables && <div className="text-danger errormessage">{editErrors.noOfTables}</div>}
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0">
            <Button
              className="j-tbl-btn-font-1 b_btn_close  "
              variant="danger"
              onClick={() => {
                handleDeleteFamily(selectedFamily.id);
              }}
            >
              Eliminar
            </Button>
            <Button
              className="j-tbl-btn-font-1 b_btn_pop"
              variant="primary"
              onClick={handleEditSubmit}
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
          <Modal.Header closeButton className="border-0" />
          <Modal.Body>
            <div className="text-center">
              <img src={require("../Image/check-circle.png")} alt="" />
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
          <Modal.Header closeButton className="border-0" />
          <Modal.Body>
            <div className="j-modal-trash text-center">
              <img src={require("../Image/trash-outline.png")} alt="" />
              <p className="mb-0 mt-3 h6 j-tbl-pop-1">Sector eliminado</p>
              <p className="opacity-75 j-tbl-pop-2">
                El sector ha sido eliminado correctamente
              </p>
            </div>
          </Modal.Body>
        </Modal>

        <Offcanvas
          placement="end"
          className="j-offcanvas"
          show={showAvailableModal}
          onHide={handleCloseAvailableModal}
        >
          <Offcanvas.Header closeButton className="j-close-btn">
            <Offcanvas.Title className="j-offcanvas-title text-white j-tbl-font-5">
              Mesa {selectedTable}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="j-canvas-buttons">
            <div className="j_offcanavs_button">
              <div className="d-flex align-items-center">
                <Link
                  to={`/table1?id=${selectedTable}`}
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
                  <svg
                    className="j-canvas-btn-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Editar
                </div>
              </button>

              <button
                data-bs-theme="dark"
                className="j-canvas-btn2 btn bj-btn-outline-primary"
                onClick={handleInfoMesaClick}
              >
                <div className="d-flex align-items-center">
                  <svg
                    className="j-canvas-btn-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Información mesa
                </div>
              </button>
            </div>
            <div className="j-available-table d-flex align-items-center mt-3">
              <div className="j-a-table" />
              <p className="j-table-color j-tbl-btn-font-1">Disponible</p>
            </div>

            <div className="b-product-order text-center">
              <MdRoomService className="i-product-order" />
              <h6 className="h6-product-order text-white j-tbl-pop-1">
                Mesa disponible
              </h6>
              <p className="p-product-order j-tbl-btn-font-1 ">
                Agregar producto para empezar<br />
                con el pedido de la mesa
              </p>
            </div>
          </Offcanvas.Body>
        </Offcanvas>

        <Offcanvas
          placement="end"
          className="j-offcanvas"
          show={showOcupadoModal}
          onHide={handleCloseOcupadoModal}
        >
          <Offcanvas.Header closeButton className="j-close-btn">
            <Offcanvas.Title className="j-offcanvas-title text-white j-tbl-font-5">
              Mesa {selectedTable}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body className="j-canvas-buttons">
            <div className="j_offcanavs_button">
              <div className="d-flex align-items-center">
                <Link
                  to={"/table1"}
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
                  <svg
                    className="j-canvas-btn-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clip-rule="evenodd"
                    />
                    <path
                      fill-rule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Editar
                </div>
              </button>

              <Button
                className="j-canvas-btn2 j-tbl-font-3 j_secondary_delete"
                onClick={handleInfoMesaClick}
              >
                <div className="d-flex align-items-center">
                  <svg
                    className="j-canvas-btn-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Información mesa
                </div>
              </Button>
            </div>

            <div>
              <div className="j_canvas_table_date mt-3">
                <div className="j-busy-table j-busy-table2 d-flex align-items-center">
                  <div className="j-b-table" />
                  <p className="j-table-color j-tbl-font-6">Ocupado</p>
                </div>
                <div className="b-date-time d-flex align-items-center">
                  <svg
                    className="j-canvas-svg-i"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="mb-0 ms-2 me-3 text-white j-tbl-font-6">
                    {elapsedTime}
                  </p>
                </div>
              </div>
              <div className="j-counter-price-data">
                <h3 className="text-white mt-3 j-tbl-text-13">Datos</h3>
                <div className="j-orders-inputs">
                  <div className="j-orders-code">
                    <label className="j-label-name text-white mb-2 j-tbl-btn-font-1">
                      Código pedido
                    </label>
                    <input
                      className="j-input-name j-table_input"
                      type="text"
                      placeholder="01234"
                      value={tableData[0]?.id}
                      readOnly
                    />
                  </div>
                  <div className="j-orders-code">
                    <label className="j-label-name d-block text-white mb-2 j-tbl-btn-font-1">
                      Personas
                    </label>
                    <input
                      className="j-input-name j-table_input w-100"
                      type="text"
                      placeholder="5"
                      value={tableData[0]?.person}
                      readOnly
                    />
                  </div>
                </div>
                <div className="j-counter-order">
                  <h3 className="text-white j-tbl-pop-1">Pedido </h3>
                  <div className={"j-counter-order-data"}>
                    {tableData.map((tableItem) =>
                      tableItem.items
                        .slice(0, showAll ? tableItem.items.length : 3)
                        .map((item, index) => {
                          const itemInfo = getItemInfo(item.item_id);
                          return (
                            <div
                              className="j-counter-order-border-fast j-counter-order-border-fast-margin"
                              key={`${tableItem.id}-${index}`}
                            >
                              <div className="j-counter-order-img">
                                <div className="j_inquary_data">
                                  <img
                                    src={`${API}/images/${itemInfo.image}`}
                                    alt={itemInfo.name}
                                  />
                                  <h5 className="text-white mb-0 j-tbl-font-5">
                                    {itemInfo.name}
                                  </h5>
                                </div>
                                <div className="j_Table_price_quantity">
                                  <p className="text-white fw-semibold mb-0">
                                    {item.quantity}
                                  </p>
                                  <h4 className="text-white fw-semibold mb-0">
                                    ${Math.floor(item.amount)}
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
                        })
                    )}
                    <a
                      href="#"
                      onClick={handleShowMoreClick}
                      className="j-tbl-pop-2"
                    >
                      {showAll ? "Ver menos" : "Ver más"}
                    </a>
                  </div>
                  <div className="j-counter-total-2">
                    <h5 className="text-white j-tbl-text-15 ">Costo total</h5>
                    <div className="j-border-bottom32">
                      <div className="j-total-discount d-flex justify-content-between">
                        <p className="j-tbl-pop-2">Artículos</p>
                        <span className="text-white j-tbl-text-16">
                          {tableData.map((item) => (
                            <span key={item.id}>$ {item.order_total}</span>
                          ))}
                        </span>
                      </div>
                      <div className="j-total-discount mb-2 d-flex justify-content-between">
                        <p className="j-tbl-pop-2">Descuentos</p>
                        <span className="text-white j-tbl-text-16">
                          {tableData.map((item) => (
                            <span key={item.id}>$ {item.discount}</span>
                          ))}
                        </span>
                      </div>
                    </div>
                    <div className="j-total-discount my-2 d-flex justify-content-between">
                      <p className="text-white fw-semibold j-tbl-text-14">
                        Total
                      </p>
                      <span className="text-white fw-semibold j-tbl-text-14">
                        {tableData.map((item) => (
                          <span key={item.id}>
                            $ {item.order_total - item.discount}
                          </span>
                        ))}
                      </span>
                    </div>
                    <div
                      className="btn w-100 j-btn-primary text-white j-tbl-btn-font-1 mb-3"
                      onClick={handleCobrarClcik}
                    >
                      Cobrar
                    </div>
                    <div
                      onClick={handleShow250}
                      className="btn j_table_print w-100 j-tbl-btn-font-1"
                    >
                      Imprimir precuenta
                    </div>
                    <Modal
                      show={show250}
                      onHide={handleClose250}
                      backdrop="static"
                      keyboard={false}
                      className="jay_TableRecipt"
                    >
                      <Modal.Header closeButton className="border-0" />
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
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </div>
  );
};

export default Tables;
