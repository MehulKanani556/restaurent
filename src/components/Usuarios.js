import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidenav from "./Sidenav";
import img1 from "../Image/Image (3).jpg";
import {
  FaAngleLeft,
  FaAngleRight,
  FaEye,
  FaEyeSlash,
  FaFilter,
  FaPlus
} from "react-icons/fa6";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { MdClose, MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { IoIosSend, IoMdLock } from "react-icons/io";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Usuarios = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [ token ] = useState(sessionStorage.getItem("token"));
  const role = sessionStorage.getItem('role');
  const navigate = useNavigate();
  const [ isLoading, setIsLoading ] = useState(true);
  const [ showPassword, setShowPassword ] = useState(false);
  const [ showcomfirmPassword, setShowcomfirmPassword ] = useState(false);
  const [ editshowPassword, seteditShowPassword ] = useState(false);
  const [ editshowcomfirmPassword, seteditShowcomfirmPassword ] = useState(
    false
  );
  const [ password, setPassword ] = useState("");
  const [ comfirmpassword, setcomfirmPassword ] = useState("");
  const [ errors, setErrors ] = useState({});
  const [ editpassword, seteditPassword ] = useState("");
  const [ editcomfirmpassword, seteditcomfirmPassword ] = useState("");
  const [ roles, setRoles ] = useState([]);
  const [ users, setUsers ] = useState([]);
  const [ searchTerm, setSearchTerm ] = useState("");

  const [ formData, setFormData ] = useState({
    name: "",
    role_id: "",
    email: "",
    password: "",
    confirm_password: ""
  });
  const [ selectedUser, setSelectedUser ] = useState(null);
  const [ show, setShow ] = useState(false);

  useEffect(
    () => {
      setIsLoading(true);
      if (role !== 'admin') {
        navigate('/dashboard');
      } else if (token) {
        fetchUser();
        fetchRole();
        setIsLoading(false)
      }
    },
    [ token ]
  );

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setcomfirmPassword(capitalizedValue);
  };



  const [ showEditFamDel, setShowEditFamDel ] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = (no) => {
    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
    const newData = data.filter((order) => order.no !== no);

    // Update the state with the new filtered data
    setData(newData);

    console.log("Delete button clicked for order:", no);
    setShowEditFamDel(true);
  };

  const [ showCreSubSuc, setShowCreSubSuc ] = useState(false);
  const handleCloseCreSubSuc = () => setShowCreSubSuc(false);
  const handleShowCreSubSuc = () => {
    setShowCreSubSuc(true);
    setTimeout(() => {
      setShowCreSubSuc(false);
    }, 2000);
  };

  // edit family
  const [ showEditProduction, setShowEditProduction ] = useState(false);
  const handleCloseEditProduction = () => setShowEditProduction(false);
  const handleShowEditProduction = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      role_id: user.role_id,
      email: user.email,
      password: user.password,
      confirm_password: user.confirm_password
    });
    setShowEditProduction(true);
  };

  // edit family Success
  const [ showEditProductionSuc, setShowEditProductionSuc ] = useState(false);
  const handleCloseEditProductionSuc = () => setShowEditProductionSuc(false);
  const handleShowEditProductionSuc = () => {
    setShowEditProductionSuc(true);
    setTimeout(() => {
      setShowEditProductionSuc(false);
    }, 2000);
  };

  // edit family Eliminat
  const [ showEditProductionDel, setShowEditProductionDel ] = useState(false);
  const handleCloseEditProductionDel = () => setShowEditProductionDel(false);
  const handleShowEditProductionDel = () => {
    setShowEditProductionDel(true);
    setTimeout(() => {
      setShowEditProductionDel(false);
    }, 2000);
  };



  const [ data, setData ] = useState([]);

  // filter

  const [ selectedFilters, setSelectedFilters ] = useState({});

  const [ currentPage, setCurrentPage ] = useState(1);
  const itemsPerPage = 20;

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked
    }));
  };
  const clearFilter = (roleId) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [roleId]: false
    }));
  };
  const filterUser = (user) => {
    const activeFilters = Object.keys(selectedFilters).filter(
      (roleId) => selectedFilters[roleId]
    );

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.includes(user.role_id.toString());
  };
  const filteredUsers = users.filter((user) => {
    const userName = user.name.toLowerCase();
    return userName.includes(searchTerm.toLowerCase()) && filterUser(user);
  });

  const filteredItems = data.filter((item) => {
    const activeFilters = Object.keys(selectedFilters).filter(
      (filter) => selectedFilters[filter]
    );

    if (activeFilters.length === 0) {
      return true;
    }

    return activeFilters.includes(item.Role);
  });
  // pagination
  useEffect(
    () => {
      setCurrentPage(1);
    },
    [ selectedFilters, searchTerm ]
  );
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // *************************************API*****************************************

  // Function to fetch users and roles on initial load or when token changes
  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Se requiere el nombre";
    }

    if (!data.role_id) {
      errors.role = "Se requiere rol";
    }

    if (!data.email.trim()) {
      errors.email = "correo electronico es requerido";
    } else if (
      !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)
    ) {
      errors.email = "el correo electrónico es invalido";
    }

    if (data.password) {
      if (data.password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
      }

      if (data.password !== data.confirm_password) {
        errors.confirm_password = "Las contraseñas no coinciden";
      }
    }

    return errors;
  };

  const fetchUser = async () => {
    await axios
      .get(`${apiUrl}/get-users`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setUsers(response.data);
        console.log("Fetched users:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  };
  const fetchRole = () => {
    axios
      .get(`${apiUrl}/roles`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        setRoles(response.data);
        console.log("Fetched roles:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching roles:", error);
      });
  };

  const getRoleName = (roleId) => {
    const role = roles.find((role) => role.id === roleId);
    return role ? role.name : "Unknown Role";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: undefined
    }));
  };

  // update user

  const updateUser = async (dataToUpdate) => {
    try {
      const response = await axios.post(
        `${apiUrl}/update-user/${selectedUser.id}`,
        dataToUpdate,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      console.log("User updated successfully:", response.data);
      await fetchUser();
      handleCloseEditProduction();
      handleShowEditProductionSuc();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // create user
  const handleSubmit = async () => {
    // Validation
    const errors = validateForm(formData);

    // If there are errors, set them and return
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    try {
      if (selectedUser) {
        const dataToUpdate = { ...formData };
        if (!dataToUpdate.password) {
          delete dataToUpdate.password;
          delete dataToUpdate.confirm_password;
        }
        await updateUser(dataToUpdate);
      } else {
        // Create new user
        const response = await axios.post(`${apiUrl}/create-user`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });
        if (response.status === 200) {
          console.log("User created successfully:");
          handleShowCreSubSuc();
          handleClose();
          fetchUser();
        }
      }
    } catch (error) {
      console.error("Error creating or updating user:", error);
      // Handle API errors here
      if (error.response && error.response.data && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: "An error occurred. Please try again." });
      }
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await axios.delete(`${apiUrl}/delete-user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 200) {
        console.log("User deleted successfully");
        setUsers(users.filter((user) => user.id !== userId));
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
    handleShowEditProductionDel();
  };

  const handleClose = () => {
    setShow(false);
    setSelectedUser(null);
    setErrors({}); // Clear errors
  };
  // const handleShow = () => setShow(true);

  const handleShow = () => {
    setFormData({
      name: "",
      role_id: "",
      email: "",
      password: "",
      confirm_password: "",
      invite:true
    });
    setSelectedUser(null);
    setShow(true);
    setErrors({}); // Clear errors
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Header />
      <div className="d-flex">
        <div>
          <Sidenav />
        </div>
        <div
          className="flex-grow-1 sidebar"
          style={{ backgroundColor: "#1F2A37" }}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <div>
              <div style={{ padding: "20px" }}>
                <div className="j-usuarios-h2">
                  <h2 className="text-white">Usuarios</h2>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    <div className="me-2 ">
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
                          value={searchTerm}
                          onChange={handleSearch}
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
                        <FaFilter /> &nbsp;{" "}
                        <span className="b_ttt">Filtro</span>
                      </Dropdown.Toggle>

                      <Dropdown.Menu className="m14 m_filter">
                        {roles.map((role) => (
                          <div
                            className="px-3 py-1 d-flex gap-2 align-items-center fw-500"
                            key={role.id}
                          >
                            <input
                              className="j-change-checkbox"
                              type="checkbox"
                              name={role.id.toString()}
                              checked={selectedFilters[role.id] || false}
                              onChange={handleCheckboxChange}
                            />
                            <span className="fw-500">{role.name}</span>
                          </div>
                        ))}
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
                      <Modal.Header
                        closeButton
                        className="m_borbot  b_border_bb mx-3 ps-0"
                      >
                        <Modal.Title>Invitar usuario</Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="border-0 pb-0">
                        <div>
                          <div className="d-flex">
                            <div class="me-4">
                              <label className="mb-2">Nombre</label>
                              <div
                                className="m_group "
                                style={{ width: "100%" }}
                              >
                                <svg
                                  class="m_icon"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                                    clipRule="evenodd"
                                  />
                                </svg>

                                <input
                                  class="bm_input"
                                  style={{ width: "100%" }}
                                  type="text"
                                  placeholder="Escribir . . ."
                                  name="name"
                                  value={formData.name}
                                  onChange={handleChange}
                                />
                              </div>
                              {errors.name && (
                                <div className="text-danger errormessage">{errors.name}</div>
                              )}
                            </div>
                            <div class="">
                              <label className="mb-2">Rol</label>
                              <div className="m_group">
                                <select
                                  className="jm_input"
                                  name="role_id"
                                  value={formData.role_id}
                                  onChange={handleChange}
                                >
                                  <option value="">Select Role</option>
                                  {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                      {role.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              {errors.role && (
                                <div className="text-danger errormessage">{errors.role}</div>
                              )}
                            </div>
                          </div>
                          <div class="mt-2">
                            <label className="mb-2">Correo</label>
                            <div className="m_group j_group">
                              <svg
                                class="m_icon"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                                <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                              </svg>
                              <input
                                class="bm_input"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Escribir . . ."
                              />
                            </div>
                            {errors.email && (
                              <div className="text-danger errormessage">{errors.email}</div>
                            )}
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
                                  name="password"
                                  value={formData.password}
                                  onChange={handleChange}
                                />

                                <button
                                  className="border-0 j-user-hide bg-transparent"
                                  onClick={() =>
                                    setShowPassword((prevState) => !prevState)}
                                >
                                  {showPassword ? (
                                    <FaEye className="i" />
                                  ) : (
                                    <FaEyeSlash className="i" />
                                  )}
                                </button>
                              </div>
                              {errors.password && (
                                <div className="text-danger errormessage">
                                  {errors.password}
                                </div>
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
                                    type={
                                      showcomfirmPassword ? "text" : "password"
                                    }
                                    className="form-control j-user-password"
                                    id="password"
                                    placeholder="Escribir . . ."
                                    name="confirm_password"
                                    value={formData.confirm_password}
                                    onChange={handleChange}
                                  />

                                  <button
                                    className="border-0 j-user-hide bg-transparent"
                                    onClick={() =>
                                      setShowcomfirmPassword(
                                        (prevState) => !prevState
                                      )}
                                  >
                                    {showcomfirmPassword ? (
                                      <FaEye className="i" />
                                    ) : (
                                      <FaEyeSlash className="i" />
                                    )}
                                  </button>
                                </div>
                                {errors.confirm_password && (
                                  <div className="text-danger errormessage">
                                    {errors.confirm_password}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Modal.Body>
                      <Modal.Footer className="border-0">
                        <Button
                          className="j-btn-primary"
                          onClick={() => {
                            handleSubmit();
                          }}
                          variant="primary"
                        >
                          <IoIosSend className="me-2" />Invitar
                        </Button>
                      </Modal.Footer>
                    </Modal>

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
                          <img
                            src={require("../Image/check-circle.png")}
                            alt=""
                          />
                          <p className="mb-0 mt-2 h6">
                            Enlace enviado exitosamente
                          </p>
                        </div>
                      </Modal.Body>
                    </Modal>
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div className="p-3 ps-0 m_bgblack d-flex align-items-center">
                    <span className="text-white m14">Filtro:</span>
                    {roles.map(
                      (role) =>
                        selectedFilters[role.id] && (
                          <div
                            key={role.id}
                            className="d-inline-block ms-2 d-flex align-items-center m12"
                          >
                            <Button
                              variant="light"
                              size="sm"
                              onClick={() => clearFilter(role.id)}
                              className="rounded-3 m12"
                              style={{ fontWeight: "500" }}
                            >
                              {role.name} &nbsp;
                              <span className="m16">
                                <MdClose />
                              </span>
                            </Button>
                          </div>
                        )
                    )}
                  </div>

                  <div
                    className="text-white  d-flex  b_arrow"
                    style={{ alignItems: "baseline", cursor: "pointer" }}
                  >
                    <div
                      className="pe-3 mt-2 b_svg "
                      style={{ color: "#9CA3AF" }}
                    >
                      <FaAngleLeft
                        className="bj-right-icon-size-2"
                        onClick={handlePrevPage}
                        style={{
                          cursor: currentPage === 1 ? "not-allowed" : "pointer"
                        }}
                      />
                    </div>
                    <span className="mt-2" style={{ color: "#9CA3AF" }}>
                      <FaAngleRight
                        className="bj-right-icon-size-2"
                        onClick={handleNextPage}
                        style={{
                          cursor:
                            currentPage === totalPages
                              ? "not-allowed"
                              : "pointer"
                        }}
                      />
                    </span>
                    <div className="text-white bj-delivery-text-3  d-flex  pt-1 ms-5">
                      <p
                        className="b_page_text me-4"
                        style={{ color: "#9CA3AF" }}
                      >
                        vista{" "}
                        <span className="text-white">
                          {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredUsers.length)}
                        </span>{" "}
                        de{" "}
                        <span className="text-white">
                          {filteredUsers.length}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="b_table1">
                <table className="b_table mb-4 p-0">
                  <thead>
                    <tr className="b_thcolor">
                      <th>Nombre</th>
                      <th>Rol</th>
                      <th>Correo</th>
                      <th>Contraseña</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="text-white b_btnn ">
                    {currentUsers.map((user) => (
                      <tr key={user.id} className="b_row">
                        <td className="b_text_w">{user.name}</td>
                        <td className="b_text_w">
                          {getRoleName(user.role_id)}
                        </td>
                        <td className="b_text_w">{user.email}</td>
                        <td>{user.password}</td>
                        <td className="b_text_w ">
                          <button
                            className="b_edit me-5"
                            onClick={() => handleShowEditProduction(user)}
                          >
                            <MdEditSquare />
                          </button>
                          <button
                            className="b_edit b_delete"
                            onClick={() => handleDelete(user.id)}
                          >
                            <RiDeleteBin5Fill />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* //////////////////// Delete Popup /////////////////// */}
              {/* Delete Confirmation Modal */}
              <Modal
                show={showEditProductionDel}
                onHide={handleCloseEditProductionDel}
                backdrop={true}
                keyboard={false}
                className="m_modal"
              >
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                  <div className="text-center">
                    <img src={require("../Image/trash-check 1.png")} alt="" />
                    <p className="opacity-75 mt-2">
                      Usuario eliminada exitosamente
                    </p>
                  </div>
                </Modal.Body>
              </Modal>
              {/* Edit User */}
              <Modal
                show={showEditProduction}
                onHide={handleCloseEditProduction}
                backdrop={true}
                keyboard={false}
                className="m_modal"
              >
                <Modal.Header
                  closeButton
                  className="m_borbot  b_border_bb mx-3 ps-0"
                >
                  <Modal.Title>Editar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body className="border-0 pb-0">
                  <div>
                    <div className="d-flex">
                      <div class="me-4">
                        <label className="mb-2">Nombre</label>
                        <div className="m_group " style={{ width: "100%" }}>
                          <svg
                            class="m_icon"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fillRule="evenodd"
                              d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                              clipRule="evenodd"
                            />
                          </svg>

                          <input
                            class="bm_input"
                            style={{ width: "100%" }}
                            type="text"
                            placeholder="Escribir . . ."
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                          />
                        </div>
                        {errors.name && (
                          <div className="text-danger errormessage">{errors.name}</div>
                        )}
                      </div>
                      <div class="">
                        <label className="mb-2">Rol</label>
                        <div className="m_group">
                          <select
                            className="jm_input"
                            name="role_id"
                            value={formData.role_id}
                            onChange={handleChange}
                          >
                            {roles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        {errors.role && (
                          <div className="text-danger errormessage">{errors.role}</div>
                        )}
                      </div>
                    </div>
                    <div class="mt-3">
                      <label className="mb-2">Correo</label>
                      <div className="m_group  j_group">
                        <svg
                          class="m_icon"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                          <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                        </svg>
                        <input
                          class="bm_input"
                          type="email"
                          placeholder="Escribir . . ."
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger errormessage">{errors.email}</div>
                      )}
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
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />

                          <button
                            className="border-0 j-user-hide bg-transparent"
                            onClick={() =>
                              seteditShowPassword((prevState) => !prevState)}
                          >
                            {editshowPassword ? (
                              <FaEye className="i" />
                            ) : (
                              <FaEyeSlash className="i" />
                            )}
                          </button>
                        </div>
                        {errors.password && (
                          <div className="text-danger errormessage">{errors.password}</div>
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
                              type={
                                editshowcomfirmPassword ? "text" : "password"
                              }
                              className="form-control j-user-password"
                              id="password"
                              placeholder="Escribir . . ."
                              name="confirm_password"
                              value={formData.confirm_password}
                              onChange={handleChange}
                            />

                            <button
                              className="border-0 j-user-hide bg-transparent"
                              onClick={() =>
                                seteditShowcomfirmPassword(
                                  (prevState) => !prevState
                                )}
                            >
                              {editshowcomfirmPassword ? (
                                <FaEye className="i" />
                              ) : (
                                <FaEyeSlash className="i" />
                              )}
                            </button>
                          </div>
                          {errors.confirm_password && (
                            <div className="text-danger errormessage">
                              {errors.confirm_password}
                            </div>
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
                    onClick={handleCloseEditProduction}
                  >
                    Eliminar
                  </Button>
                  <Button
                    variant="primary"
                    className="b_btn_pop"
                    onClick={() => {
                      handleSubmit();
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
                    <img src={require("../Image/check-circle.png")} alt="" />
                    <p className="mb-0 mt-2 h6">Sus cambios</p>
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
                <Modal.Header closeButton className="border-0" />
                <Modal.Body>
                  <div className="j-modal-trash text-center">
                    <img src={require("../Image/trash-outline.png")} alt="" />
                    <p className="mb-0 mt-3 h6 j-tbl-pop-1">eliminado</p>
                    <p className="opacity-75 j-tbl-pop-2">
                      eliminado correctamente
                    </p>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Usuarios;
