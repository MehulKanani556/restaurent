import React, { useEffect, useState } from "react";
import Header from "./Header";
import inbox1 from "../Image/Inbox.png"
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";


const Caja = () => {

    const [selectedTitle, setSelectedTitle] = useState('');

    const handleTitleChange = (event) => {
        setSelectedTitle(event.target.value);
    };


    // create success box
    const [showCreSuc, setShowCreSuc] = useState(false);
    const handleCloseCreSuc = () => setShowCreSuc(false);
    const handleShowCreSuc = () => {
        setShowCreSuc(true);
        setTimeout(() => {
            setShowCreSuc(false);
        }, 2000);
    };



    const API_URL = "https://shreekrishnaastrology.com/api";
    const [email] = useState("superadmin@gmail.com");
    const [password] = useState("password");
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [show, setShow] = useState(false);
    const [boxName, setBoxName] = useState("");
    const [cashierAssigned, setCashierAssigned] = useState("");
    const [data, setData] = useState([]);
    const [roles, setRoles] = useState([]);
    const [formData, setFormData] = useState({});
    const [users, setUsers] = useState([]);
    const [cashier, setCashier] = useState([]);
    const [dataBox, setDataBox] = useState([]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const login = async () => {
            try {
                const response = await axios.post(`${API_URL}/auth/login`, { email, password });
                const tok = response.data.access_token;
                setToken(tok);
                sessionStorage.setItem("token", tok);
                console.log("Login successful");
            } catch (error) {
                console.error("Error logging in:", error.response ? error.response.data : error.message);
            }
        };

        if (!token) {
            login();
        }
    }, [API_URL, email, password, token]);

    useEffect(() => {
        if (token) {
            fetchAllBox();
            fetchBox();
            fetchRole();
            fetchUser();
        }
    }, [API_URL, token]);

    const fetchAllBox = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-boxs`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Fetched boxes:');
            setData(response.data);
        } catch (error) {
            console.error('Error fetching boxes:', error);
        }
    };

    const fetchBox = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-all-boxs-log`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('Fetched All boxes:');
            setDataBox(response.data);
        } catch (error) {
            console.error('Error fetching boxes:', error)
        }
    };

    const handleCreateBox = async () => {
        try {
            const response = await axios.post(`${API_URL}/box/create`, {
                name: boxName,
                user_id: cashierAssigned
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log("Box created:");
            fetchAllBox();
            handleShowCreSuc(); // Show success message
        } catch (error) {
            console.error("Error creating box:", error.response ? error.response.data : error.message);
        }
    };

    const fetchUser = async () => {
        await axios.get(`${API_URL}/get-users`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                setUsers(response.data);
                console.log('Fetched users:');
                const cashiers = response.data.filter(user => user.role_id === 2);

                setCashier(cashiers);
                console.log('Fetched cashiers:');

            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const fetchRole = () => {
        axios.get(`${API_URL}/roles`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                setRoles(response.data);
                console.log('Fetched roles:');
            })
            .catch((error) => {
                console.error("Error fetching roles:", error);
            });
    };

    const getUserName = (userId) => {
        const user = users.find(user => user.id === userId);
        return user ? user.name : 'Unknown User';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const cashierRoles = roles.filter(role => role.type === 'cashier'); // Adjust as per your API response structure
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
                                        <label htmlFor="cajaNumeroInput" className="form-label j-tbl-font-11">Nombre caja</label>
                                        <input
                                            type="text"
                                            className="form-control j-table_input"
                                            id="cajaNumeroInput"
                                            placeholder="Caja#"
                                            value={boxName}
                                            onChange={(e) => setBoxName(e.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="cajeroAsignadoSelect" className="form-label j-tbl-font-11">Cajero asignado</label>
                                        <select
                                            className="form-select b_select border-0 py-2"
                                            style={{ borderRadius: "6px" }}
                                            aria-label="Selecciona un título"
                                            id="cajeroAsignadoSelect"
                                            value={cashierAssigned}
                                            onChange={(e) => setCashierAssigned(e.target.value)}>

                                            <option value="">Select cashier</option>
                                            {cashier.map(user => (
                                                <option key={user.id} value={user.id}>
                                                    {user.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </Modal.Body>
                                <Modal.Footer className="border-0">
                                    <Button
                                        className="j-tbl-btn-font-1"
                                        variant="primary"
                                        onClick={() => {
                                            handleShowCreSuc();
                                            handleClose();
                                        }}
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
                                        <p className="mb-0 mt-2 h6 j-tbl-pop-1">Sector</p>
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
                                        <div key={index} className="col-3 text-white mt-1">
                                            <div className="sjbg_gay px-3 pt-5 pb-3 rounded mt-2">
                                                <div className="d-flex pb-4 justify-content-center">
                                                    <img src={inbox1} className="sj_width" alt="caja image" />
                                                </div>
                                                <p className="mb-2 pt-3 j-caja-text-2">{order.name}</p>
                                                <button className={`sj_lightsky j-caja-text-3 ${!isClosed ? 'j-bgcolor-caja' : 'sj_lightsky'}`}>
                                                    {!isClosed ? 'Cerrada' : 'Abierta'}
                                                </button>
                                                <p className="mb-2 pt-2 j-caja-text-1">Cajero: {getUserName(order.user_id)}</p>
                                                <p className="mb-2 pt-2 j-caja-text-1">opening mount</p>
                                                <input
                                                    type="text"
                                                    value={lastBoxRecord ? `$ ${Number(lastBoxRecord.open_amount).toFixed(0)}` : 'N/A'}
                                                    className="sjdark_gary j-caja-input j-caja-input-text-5"
                                                    readOnly
                                                />
                                                {/* <Link to={{
                                                    pathname: "/caja/informacira",
                                                    state: {
                                                        boxId: order.id,
                                                        creationDate: order.creation_date, // Assuming creation_date is available in order
                                                    }
                                                }}>
                                                    <button className="sjdarksky mt-2 j-caja-button j-caja-text-1">Ver detalles</button>
                                                </Link> */}
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
                </div>
            </div>
        </>
    )
}
export default Caja;