import React, { useEffect, useState } from "react";
import Header from "./Header";
import inbox1 from "../Image/Inbox.png";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import Loader from "./Loader";

const Caja = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const [isLoading, setIsLoading] = useState(true);

    const [selectedTitle, setSelectedTitle] = useState('');
    const [boxName, setBoxName] = useState("");
    const [cashierAssigned, setCashierAssigned] = useState("");
    const [data, setData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState([]);
    const [cashier, setCashier] = useState([]);
    const [dataBox, setDataBox] = useState([]);
    const [validationErrors, setValidationErrors] = useState({});

    // Clear specific error when input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Clear error for the input being modified
        setValidationErrors(prevErrors => ({
            ...prevErrors,
            [name]: undefined,
        }));

        if (name === 'boxName') {
            setBoxName(value);
        } else if (name === 'cashierAssigned') {
            setCashierAssigned(value);
        }
    };

    // Create box
    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        setValidationErrors({});
    };
    const handleShow = () => setShow(true);

    // Create success box
    const [showCreSuc, setShowCreSuc] = useState(false);
    const handleCloseCreSuc = () => setShowCreSuc(false);
    const handleShowCreSuc = () => {
        setShowCreSuc(true);
        setTimeout(() => {
            setShowCreSuc(false);
        }, 2000);
    };

    // API Calls
    useEffect(() => {
        setIsLoading(true);
        if (token) {
            fetchAllBox();
            fetchBox();
            fetchRole();
            fetchUser();
            setIsLoading(false);
        }
    }, [apiUrl, token]);

    // Fetch all boxes
    const fetchAllBox = async () => {
        try {
            const response = await axios.get(`${apiUrl}/get-boxs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setData(response.data);
        } catch (error) {
            console.error('Error fetching boxes:', error);
        }
    };

    // Fetch all box logs
    const fetchBox = async () => {
        try {
            const response = await axios.get(`${apiUrl}/get-all-boxs-log`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setDataBox(response.data);
        } catch (error) {
            console.error('Error fetching boxes:', error);
        }
    };

    // Create a box
    const handleCreateBox = async () => {
        const errors = {};
        if (!boxName) errors.boxName = "El nombre de la casilla es obligatorio";
        if (!cashierAssigned) errors.cashierAssigned = "Se requiere cajero asignado";
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        try {
            await axios.post(`${apiUrl}/box/create`, {
                name: boxName,
                user_id: cashierAssigned
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            fetchAllBox();
            handleShowCreSuc(); // Show success message
            handleClose();
        } catch (error) {
            const errorMessage = error.response ? error.response.data.message : "Error al crear la caja. Por favor, inténtelo de nuevo.";
            setValidationErrors({ apiError: errorMessage });
        }
    };

    // Fetch all users
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/get-users`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUsers(response.data);
            const cashiers = response.data.filter(user => user.role_id === 2);
            setCashier(cashiers);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    // Fetch roles
    const fetchRole = () => {
        axios.get(`${apiUrl}/roles`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                setRoles(response.data);
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    };

    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const getLastBoxRecord = (boxId) => {
        const matchingBoxes = dataBox.filter(box => box.box_id === boxId);
        return matchingBoxes[matchingBoxes.length - 1]; // Get the last item
    };

    return (
        <>
            <div className="s_bg_dark">
                <Header />
                <div className="d-flex">
                    <div>
                        <Sidenav />
                    </div>
                    <div className="flex-grow-1 sidebar">
                        {isLoading ? (
                            <Loader />
                        ):(
                            <div>
                            <div className="sjbg_gay d-flex align-items-center justify-content-between text-white px-3 py-2">
                                                        <h5 className="mb-0">Caja</h5>
                                                        <button className="sjSky px-2" onClick={handleShow}>
                                                            + Agregar caja
                                                        </button>
                            
                                                        <Modal
                                                            show={show}
                                                            onHide={handleClose}
                                                            backdrop={true}
                                                            keyboard={false}
                                                            className="m_modal"
                                                        >
                                                            <Modal.Header closeButton className="m_borbot">
                                                                <Modal.Title className="j-tbl-text-10">Agregar caja</Modal.Title>
                                                            </Modal.Header>
                                                            <Modal.Body className="border-0">
                                                                <div className="mb-3">
                                                                    <label htmlFor="boxNameInput" className="form-label j-tbl-font-11">Nombre caja</label>
                                                                    <input
                                                                        type="text"
                                                                        className="form-control j-table_input"
                                                                        id="boxNameInput"
                                                                        name="boxName"
                                                                        placeholder="Caja#"
                                                                        value={boxName}
                                                                        onChange={handleInputChange}
                                                                    />
                                                                    {validationErrors.boxName && (
                                                                        <div className="text-danger errormessage">{validationErrors.boxName}</div>
                                                                    )}
                                                                </div>
                                                                <div className="mb-3">
                                                                    <label htmlFor="cashierAssignedSelect" className="form-label j-tbl-font-11">Cajero asignado</label>
                                                                    <select
                                                                        className="form-select b_select border-0 py-2"
                                                                        style={{ borderRadius: "6px" }}
                                                                        aria-label="Selecciona un cajero"
                                                                        id="cashierAssignedSelect"
                                                                        name="cashierAssigned"
                                                                        value={cashierAssigned}
                                                                        onChange={handleInputChange}
                                                                    >
                                                                        <option value="">Selecciona un cajero</option>
                                                                        {cashier.map(user => (
                                                                            <option key={user.id} value={user.id}>
                                                                                {user.name}
                                                                            </option>
                                                                        ))}
                                                                    </select>
                                                                    {validationErrors.cashierAssigned && (
                                                                        <div className="text-danger errormessage">{validationErrors.cashierAssigned}</div>
                                                                    )}
                                                                </div>
                                                                {validationErrors.apiError && (
                                                                    <div className="text-danger errormessage">{validationErrors.apiError}</div>
                                                                )}
                                                            </Modal.Body>
                                                            <Modal.Footer className="border-0">
                                                                <Button
                                                                    className="j-tbl-btn-font-1"
                                                                    variant="primary"
                                                                    onClick={handleCreateBox}
                                                                >
                                                                    Agregar
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
                                                            <Modal.Header closeButton className="border-0"></Modal.Header>
                                                            <Modal.Body>
                                                                <div className="text-center">
                                                                    <img src={require("../Image/check-circle.png")} alt="" />
                                                                    <p className="mb-0 mt-2 h6 j-tbl-pop-1">Caja</p>
                                                                    <p className="opacity-75 j-tbl-pop-2">Se ha creado exitosamente</p>
                                                                </div>
                                                            </Modal.Body>
                                                        </Modal>
                                                    </div>
                                                    <div className="ssssj-card-media">
                                                        <div className="row">
                                                            {data.map((order, index) => {
                                                                const lastBoxRecord = getLastBoxRecord(order.id);
                                                                const isClosed = lastBoxRecord && lastBoxRecord.close_amount === null;
                                                                return (
                                                                    <div key={order.id} className="col-3 text-white mt-1">
                                                                        <div className="sjbg_gay px-3 pt-5 pb-3 rounded mt-2 j_caja_margin">
                                                                            <div className="d-flex pb-4 justify-content-center">
                                                                                <img src={inbox1} className="sj_width" alt="caja image" />
                                                                            </div>
                                                                            <p className="mb-2 pt-3 j-caja-text-2">{order.name}</p>
                                                                            <button className={`sj_lightsky j-caja-text-3 ${!isClosed ? 'j-bgcolor-caja' : 'sj_lightsky'}`}>
                                                                                {!isClosed ? 'Cerrada' : 'Abierta'}
                                                                            </button>
                                                                            <p className="mb-2 pt-2 j-caja-text-1">Cajero : {getUserName(order.user_id)}</p>
                                                                            <p className="mb-2 pt-2 j-caja-text-1">Opening amount</p>
                                                                            <input type="text" value={lastBoxRecord ? `$ ${Number(lastBoxRecord.open_amount).toFixed(0)}` : 'N/A'} className="sjdark_gary j-caja-input j-caja-input-text-5" readOnly />
                                                                            <Link to={`/caja/informacira?${data[index].id}`}>
                                                                                <button className="sjdarksky mt-2 j-caja-button j-caja-text-1">Ver detalles</button>
                                                                            </Link>
                                                                        </div>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
                                                    </div>
                                                        </div>
                        )}
                        
                    </div>
                </div>
            </div>
        </>
    );
}

export default Caja;
