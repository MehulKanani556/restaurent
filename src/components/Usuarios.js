import React, { useState } from 'react'
import Header from './Header'
import Sidenav from './Sidenav'
import img1 from "../Image/Image (3).jpg";
import { FaAngleLeft, FaAngleRight, FaEye, FaEyeSlash, FaFilter, FaPlus } from 'react-icons/fa6'
import { Button, Dropdown, Modal } from 'react-bootstrap';
import { MdClose, MdEditSquare } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoIosSend, IoMdLock } from 'react-icons/io';

const Usuarios = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showcomfirmPassword, setShowcomfirmPassword] = useState(false);
    const [editshowPassword, seteditShowPassword] = useState(false);
    const [editshowcomfirmPassword, seteditShowcomfirmPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [comfirmpassword, setcomfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [editpassword, seteditPassword] = useState("");
    const [editcomfirmpassword, seteditcomfirmPassword] = useState("");

    // if (!password) {
    //     errors.password = "Password is required";
    // } else if (password.length < 8) {
    //     errors.password = "Password must be at least 8 characters";
    // }

    // if (!comfirmpassword) {
    //     errors.comfirmpassword = "comfirmpassword is required";
    // } else if (comfirmpassword.length < 8) {
    //     errors.comfirmpassword = "comfirmpassword must be at least 8 characters";
    // }

    const [showEditFamDel, setShowEditFamDel] = useState(false);
    const handleCloseEditFamDel = () => setShowEditFamDel(false);
    const handleShowEditFamDel = (no) => {
        setTimeout(() => {
            setShowEditFamDel(false)
        }, 2000);
        const newData = data.filter((order) => order.no !== no);

        // Update the state with the new filtered data
        setData(newData);

        console.log('Delete button clicked for order:', no);
        setShowEditFamDel(true)

    };

    const [showCreSubSuc, setShowCreSubSuc] = useState(false);
    const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
    const handleShowCreSubSuc = () => {
        setShowCreSubSuc(true)
        setTimeout(() => {
            setShowCreSubSuc(false);
        }, 2000);
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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



    const validate = () => {
        const errors = {};
        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 8 characters";
        }

        return errors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = validate();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            console.log("Form submitted", { password });
        }
    };



    const [data, setData] = useState([
        {
            no: 1,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 2,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 3,
            Name: 'Damian Gonzales',
            Role: 'Garzón',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 4,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 5,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 6,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 7,
            Name: 'Damian Gonzales',
            Role: 'Cajero',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },

        {
            no: 8,
            Name: 'Damian Gonzales',
            Role: 'Cocina',
            Mail: 'ejemplo@gmail.com',
            Password: '01234',
        },
    ]);

    // filter
    const [selectedFilters, setSelectedFilters] = useState({
        Cajero: false,
        Garzón: false,
        Cocina: false,
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

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredItems = data.filter((item) => {
        const activeFilters = Object.keys(selectedFilters).filter(
            (filter) => selectedFilters[filter]
        );

        if (activeFilters.length === 0) {
            return true;
        }

        return activeFilters.includes(item.Role);
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };



    return (
        <div>
            <Header />
            <div className='d-flex'>
                <div>
                    <Sidenav />
                </div>
                <div className='flex-grow-1 sidebar' style={{ backgroundColor: "#1F2A37", }}>
                    <div style={{ padding: "20px" }}>
                        <div className="j-usuarios-h2">
                            <h2 className='text-white'>
                                Usuarios
                            </h2>
                        </div>
                        <div className="d-flex justify-content-between">
                            <div className="d-flex align-items-center">
                                <div className='me-2 '>
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
                                <Dropdown data-bs-theme="dark" className="m_drop">
                                    <Dropdown.Toggle
                                        id="dropdown-button-dark-example1"
                                        variant="outline-primary"
                                        style={{ fontSize: "12px" }}
                                        className="btn btn-outline-primary b_togllle b_border_out b_ttt"
                                    >
                                        <FaFilter /> &nbsp; <span className="b_ttt">Filtro</span>
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="m14  m_filter">
                                        <div className="px-3 py-1 d-flex gap-2 align-items-center fw-500">
                                            <input
                                                className='j-change-checkbox'
                                                type="checkbox"
                                                name="Cajero"
                                                checked={selectedFilters.Cajero}
                                                onChange={handleCheckboxChange}
                                            />{" "}
                                            <span className="fw-500">Cajero</span>
                                        </div>
                                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                            <input
                                                className='j-change-checkbox'
                                                type="checkbox"
                                                name="Garzón"
                                                checked={selectedFilters.Garzón}
                                                onChange={handleCheckboxChange}
                                            />{" "}
                                            <span>Garzón</span>
                                        </div>
                                        <div className="px-3 py-1 d-flex gap-2 align-items-center">
                                            <input
                                                className='j-change-checkbox'
                                                type="checkbox"
                                                name="Cocina"
                                                checked={selectedFilters.Cocina}
                                                onChange={handleCheckboxChange}
                                            />{" "}
                                            <span>Cocina</span>
                                        </div>
                                    </Dropdown.Menu>
                                </Dropdown>


                            </div>
                            <div>
                                <button
                                    className="btn text-white j-btn-primary text-nowrap m12 "
                                    onClick={handleShow}
                                >
                                    <FaPlus /> Invitar
                                </button>

                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop={true}

                                    keyboard={false}
                                    className="m_modal"
                                >
                                    <Modal.Header closeButton className="m_borbot  b_border_bb mx-3 ps-0">
                                        <Modal.Title>
                                            Invitar usuario
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="border-0 pb-0">
                                        <div>
                                            <div className="d-flex">
                                                <div class="me-4">
                                                    <label className='mb-2'>Nombre</label>
                                                    <div className="m_group " style={{ width: "100%" }}>
                                                        <svg class="m_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                            <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                                                        </svg>

                                                        <input
                                                            class="bm_input"
                                                            style={{ width: "100%" }}
                                                            type="text"
                                                            placeholder="Escribir . . ."
                                                        />
                                                    </div>
                                                </div>
                                                <div class="">
                                                    <label className='mb-2'>Rol</label>
                                                    <div className="m_group">
                                                        <select className='jm_input'>
                                                            <option value="0">Cajero</option>
                                                            <option value="1">Admin</option>
                                                            <option value="2">Cocina</option>
                                                            <option value="2">Mesero</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="mt-2">
                                                <label className='mb-2'>Correo</label>
                                                <div className="m_group j_group">
                                                    <svg class="m_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                                        <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                                                    </svg>
                                                    <input
                                                        class="bm_input"
                                                        type="search"
                                                        placeholder="Escribir . . ."
                                                    />
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-between mt-2">
                                                <div className="me-4">
                                                    <label
                                                        htmlFor="password"
                                                        className="form-label text-white"
                                                    >
                                                        Contraseña
                                                    </label>
                                                    <div className="icon-input">
                                                        <IoMdLock className="i" />
                                                        <input
                                                            type={showPassword ? "text" : "password"}
                                                            className="form-control j-user-password"
                                                            placeholder="Escribir . . ."
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />

                                                        <button
                                                            className="border-0 j-user-hide bg-transparent"
                                                            onClick={() =>
                                                                setShowPassword((prevState) => !prevState)
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <FaEye className="i" />
                                                            ) : (
                                                                <FaEyeSlash className="i" />
                                                            )}
                                                        </button>
                                                    </div>
                                                    {errors.password && (
                                                        <div className="text-danger">{errors.password}</div>
                                                    )}
                                                </div>
                                                <div class="">
                                                    <div className="mb-2 me-2">
                                                        <label
                                                            htmlFor="password"
                                                            className="form-label text-white"
                                                        >
                                                            confirmar Contraseña
                                                        </label>
                                                        <div className="icon-input">
                                                            <IoMdLock className="i" />
                                                            <input
                                                                type={showcomfirmPassword ? "text" : "password"}
                                                                className="form-control j-user-password"
                                                                id="password"
                                                                placeholder="Escribir . . ."
                                                                value={comfirmpassword}
                                                                onChange={(e) => setcomfirmPassword(e.target.value)}
                                                            />

                                                            <button
                                                                className="border-0 j-user-hide bg-transparent"
                                                                onClick={() =>
                                                                    setShowcomfirmPassword((prevState) => !prevState)
                                                                }
                                                            >
                                                                {showcomfirmPassword ? (
                                                                    <FaEye className="i" />
                                                                ) : (
                                                                    <FaEyeSlash className="i" />
                                                                )}
                                                            </button>
                                                        </div>
                                                        {errors.password && (
                                                            <div className="text-danger">{errors.password}</div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className='border-0'>
                                        <Button className='j-btn-primary' onClick={() => {
                                            handleShowCreSubSuc();
                                            handleClose();
                                        }} variant="primary"><IoIosSend className='me-2' />Invitar</Button>
                                    </Modal.Footer>
                                </Modal>

                                <Modal
                                    show={showCreSubSuc}
                                    onHide={handleCloseCreSubSuc}
                                    backdrop={true}

                                    keyboard={false}
                                    className="m_modal"
                                >
                                    <Modal.Header closeButton className="border-0"></Modal.Header>
                                    <Modal.Body>
                                        <div className="text-center">
                                            <img src={require("../Image/check-circle.png")} alt="" />
                                            <p className="mb-0 mt-2 h6">Enlace enviado exitosamente</p>
                                        </div>
                                    </Modal.Body>
                                </Modal>

                            </div>

                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                            <div className="p-3 ps-0 m_bgblack d-flex align-items-center">
                                <span className="text-white m14">Filtro:</span>
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

                            <div className='text-white  d-flex  b_arrow' style={{ alignItems: "baseline" }}>
                                <div className='pe-3 mt-2 b_svg ' style={{ color: "#9CA3AF" }}>
                                    <FaAngleLeft
                                        className='bj-right-icon-size-2'
                                        onClick={handlePrevPage}
                                        disabled={currentPage === 1}
                                    />
                                </div>
                                <span className='mt-2' style={{ color: "#9CA3AF" }}>
                                    <FaAngleRight
                                        className='bj-right-icon-size-2'
                                        onClick={handleNextPage}
                                        disabled={currentPage === totalPages}
                                    />
                                </span>
                                <div className='text-white bj-delivery-text-3  d-flex  pt-1 ms-5'>
                                    <p className='b_page_text me-4' style={{ color: "#9CA3AF" }}>
                                        vista <span className='text-white'>{indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredItems.length)}</span> de <span className='text-white'>{currentItems.length}</span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className='b_table1'>
                        <table className='b_table mb-4 p-0'>
                            <thead>
                                <tr className='b_thcolor'>
                                    <th>Nombre</th>
                                    <th>Rol</th>
                                    <th>Correo</th>
                                    <th>Contraseña</th>
                                    <th>Accione</th>

                                </tr>
                            </thead>
                            <tbody className='text-white b_btnn '>
                                {currentItems.map((order) => (
                                    <tr key={order.id} className='b_row'>
                                        <td className='b_text_w'>{order.Name}</td>
                                        <td className='b_text_w'>{order.Role}</td>
                                        <td className='b_text_w'>{order.Mail}</td>
                                        <td>{order.Password}</td>
                                        <td className='b_text_w '>
                                            <button className='b_edit me-5' onClick={handleShowEditProduction} ><MdEditSquare /></button>
                                            <button className='b_edit b_delete'
                                                onClick={() => handleShowEditFamDel(order.no)}><RiDeleteBin5Fill /></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Modal
                        show={showEditProduction}
                        onHide={handleCloseEditProduction}
                        backdrop={true}

                        keyboard={false}
                        className="m_modal"
                    >
                        <Modal.Header closeButton className="m_borbot  b_border_bb mx-3 ps-0">
                            <Modal.Title>
                                Editar usuario
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="border-0 pb-0">
                            <div>
                                <div className="d-flex">
                                    <div class="me-4">
                                        <label className='mb-2'>Nombre</label>
                                        <div className="m_group " style={{ width: "100%" }}>
                                            <svg class="m_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                                <path fillRule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clipRule="evenodd" />
                                            </svg>

                                            <input
                                                class="bm_input"
                                                style={{ width: "100%" }}
                                                type="search"
                                                placeholder="Escribir . . ."
                                            />
                                        </div>
                                    </div>
                                    <div class="">
                                        <label className='mb-2'>Rol</label>
                                        <div className="m_group">
                                            <select className='jm_input'>
                                                <option value="0">Cajero</option>
                                                <option value="1">Admin</option>
                                                <option value="2">Cocina</option>
                                                <option value="2">Mesero</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-3">
                                    <label className='mb-2'>Correo</label>
                                    <div className="m_group  j_group">
                                        <svg class="m_icon" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                            <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                                        </svg>
                                        <input
                                            class="bm_input"
                                            type="search"
                                            placeholder="Escribir . . ."
                                        />
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="">
                                        <label
                                            htmlFor="password"
                                            className="form-label text-white"
                                        >
                                            Contraseña
                                        </label>
                                        <div className="icon-input">
                                            <IoMdLock className="i" />
                                            <input
                                                type={editshowPassword ? "text" : "password"}
                                                className="form-control j-user-password"
                                                placeholder="Escribir . . ."
                                                value={editpassword}
                                                onChange={(e) => seteditPassword(e.target.value)}
                                            />

                                            <button
                                                className="border-0 j-user-hide bg-transparent"
                                                onClick={() =>
                                                    seteditShowPassword((prevState) => !prevState)
                                                }
                                            >
                                                {editshowPassword ? (
                                                    <FaEye className="i" />
                                                ) : (
                                                    <FaEyeSlash className="i" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <div className="text-danger">{errors.password}</div>
                                        )}
                                    </div>
                                    <div class="">
                                        <div className="mb-2 me-2">
                                            <label
                                                htmlFor="password"
                                                className="form-label text-white"
                                            >
                                                confirmar Contraseña
                                            </label>
                                            <div className="icon-input">
                                                <IoMdLock className="i" />
                                                <input
                                                    type={editshowcomfirmPassword ? "text" : "password"}
                                                    className="form-control j-user-password"
                                                    id="password"
                                                    placeholder="Escribir . . ."
                                                    value={editcomfirmpassword}
                                                    onChange={(e) => seteditcomfirmPassword(e.target.value)}
                                                />

                                                <button
                                                    className="border-0 j-user-hide bg-transparent"
                                                    onClick={() =>
                                                        seteditShowcomfirmPassword((prevState) => !prevState)
                                                    }
                                                >
                                                    {editshowcomfirmPassword ? (
                                                        <FaEye className="i" />
                                                    ) : (
                                                        <FaEyeSlash className="i" />
                                                    )}
                                                </button>
                                            </div>
                                            {errors.password && (
                                                <div className="text-danger">{errors.password}</div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Modal.Body>
                        <Modal.Footer className="border-0">
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
                        className="m_modal b_newmodel bnew_model11 "
                    >
                        <Modal.Header closeButton className="border-0" />
                        <Modal.Body>
                            <div className="text-center">
                                <img
                                    src={require("../Image/check-circle.png")}
                                    alt=""
                                />
                                <p className="mb-0 mt-2 h6">
                                    Sus cambios
                                </p>
                                <p className="opacity-75">
                                    Han sido modificados exitosamente
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
                                <p className="mb-0 mt-3 h6 j-tbl-pop-1">eliminado</p>
                                <p className="opacity-75 j-tbl-pop-2">
                                    eliminado correctamente
                                </p>
                            </div>
                        </Modal.Body>
                    </Modal>
                </div>
            </div>
        </div >
    )
}

export default Usuarios
