import React, { useEffect, useState } from 'react'
import Header from './Header'
import Sidenav from './Sidenav'
import { Badge, Button, Modal, Spinner } from 'react-bootstrap'
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import pic1 from "../img/Image.png"
import pic2 from "../img/Image(1).jpg"
import pic3 from "../img/Image (2).png"
import { Tabs, Tab } from 'react-bootstrap';
import { IoMdCloseCircle, IoMdInformationCircle } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { RiDeleteBin5Fill } from 'react-icons/ri';

export default function Homeinformation() {

  // const API_URL = "https://shreekrishnaastrology.com/api"; // Laravel API URL
  // const API = "https://shreekrishnaastrology.com/public";
  // const [token, setToken] = useState(
  //   "2647|bkAORMNJS6ite9xHPiGmApoi78Dfz9tV8Bzbyb6a1ca62063"
  // );

  const API_URL = process.env.REACT_APP_API_URL;
  const API = process.env.REACT_APP_IMAGE_URL;
  const token = sessionStorage.getItem("token");

  const { id } = useParams();
  const navigate = useNavigate();

  // create family
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show12, setShow12] = useState(false);
  const handleClose12 = () => setShow12(false);

  const handleShow12 = async () => {

    // ----resons----
    // ===change====
    // console.log(reason);

    try {
      const response = await axios.post(
        `${API_URL}/order/updateorderreason/${id.toString()}`,
        { reason: reason },
        {
          headers: {
            Authorization: `Bearer Bearer 2852|8lkViGQ4mKuvXVzPhL2OePFX2YinQ0wwhqDnwFJs7f6a8df1`,
          },
        }
      );
      // console.log("Note added successfully:", response.data);

    } catch (error) {
      console.error(
        "Error adding note:",
        error.response ? error.response.data : error.message
      );
    }

    try {
      const response = await axios.post(
        `${API_URL}/order/updateStatus`,
        { order_id: id, status: "cancelled" },
        {
          headers: {
            Authorization: `Bearer 2777|bTI10QPJ5iJXNIX6un4UhJJn1WSZzNG3RatXNWU8d2713940`,
          },
        }
      );
      getOrderStatus();
      // console.log("Order Cancle successfully:", response.data);

    } catch (error) {
      console.error(
        "Error adding note:",
        error.response ? error.response.data : error.message
      );
    }

    // ---End-resons----

    setShow12(true)
    setTimeout(() => {
      setShow12(false)
      navigate(`/home_Pedidos/payment_edit/${id}`, { replace: true, state: "profile" });
    }, 2000);
  };

  // =============New BackEnd=========

  const [orderData, setOrderData] = useState(null);
  const [items, setItems] = useState([]);
  const [orderDetails, setOrderDetails] = useState([]);
  const [sector, setSector] = useState(null);
  const [table, setTable] = useState(null);
  const [reason, setReason] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [user, setUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const [userRole, setUserRole] = useState('');

  const [visibleInputId, setVisibleInputId] = useState(null);
  const [noteValues, setNoteValues] = useState('');

  const [obj1, setObj1] = useState([]);
  const [parentCheck, setParentCheck] = useState([]);
  const [childCheck, setChildCheck] = useState([]);

  const [searchTermMenu, setSearchTermMenu] = useState(""); // State to hold search term
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [filteredItemsMenu, setFilteredItemsMenu] = useState(obj1);
  const [isProcessing, setIsProcessing] = useState(false);

  // const [filteredMenuItems, setFilteredMenuItems] = useState([]); // State to hold filtered items
  // const [searchTerm, setSearchTerm] = useState(""); // State to hold search term
  // const [menuId, setMenuId] = useState(null);
  // const [itemId, setItemId] = useState([]);


  // Add producttion
  const [show1Prod, setShow1Prod] = useState(false);
  const handleClose1Prod = () => {
    setShow1Prod(false);
    setSelectedItemsMenu([]);
    setSelectedItemsCount(0);
  }
  const handleShow1Prod = () => setShow1Prod(true);
  const [selectedItemsMenu, setSelectedItemsMenu] = useState([]);

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true)
    setTimeout(() => {
      setShow1AddSuc(false)
    }, 2000);
  };

  useEffect(() => {

    getOrder();
    getItems();
    getSector();
    getOrderStatus();
    getRole();
    getFamily();
    getSubFamily();
  }, [ show12, show1Prod]);

  useEffect(() => {
    if (orderData && items.length > 0) {
      handleOrderDetails();
    }
    if (orderData?.user_id) {
      console.log(orderData?.user_id);
      getUser();
    }
  }, [orderData, items, show1Prod]);

  useEffect(() => {
    if (user && roles.length > 0) {
      getuserRole();
    }
  }, [user, roles]);

  const getOrder = async () => {
    try {
      const response = await axios.get(`${API_URL}/order/getSingle/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderData(response.data);
    } catch (error) {
      console.error(
        "Error fetching OrderData:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const getItems = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.get(`${API_URL}/item/getAll`);
      setItems(response.data.items);
      setObj1(response.data.items);
      // setFilteredMenuItems(response.data.items);
      setFilteredItemsMenu(response.data.items);
    } catch (error) {
      console.error(
        "Error fetching Items:",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);
  };

  const getSector = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.post(`${API_URL}/sector/getWithTable`);
      let sectors = response.data.data;

      const sectorWithTable = sectors.find(v =>
        v.tables.some(a => a.order_id == id)
      );

      if (sectorWithTable) {
        setSector(sectorWithTable);
        setTable(sectorWithTable.tables.find(a => a.order_id == id));
      }
    } catch (error) {
      console.error(
        "Error fetching sector and Table Data:",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);

  };

  const getOrderStatus = async () => {
    setIsProcessing(true);

    try {
      const response = await axios.get(`${API_URL}/order/getLog/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrderStatus(response.data);
    } catch (error) {
      console.error(
        "Error fetching OrderStatus:",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);

  };

  const getUser = async () => {
    setIsProcessing(true);

    try {
      const response = await axios.get(`${API_URL}/get-user/${orderData.user_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(
        "Error fetching user:",
        error.response ? error.response.data : error.message
      );
      setUser(null); // Set user to null if there's an error
    }
    setIsProcessing(false);

  };

  const getRole = async () => {
    setIsProcessing(true);

    try {
      const response = await axios.get(`${API_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setRoles(response.data);
    } catch (error) {
      console.error(
        "Error fetching roles:",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);

  };

  const getuserRole = () => {
    if (user && roles.length > 0) {
      const role = roles.find((v) => v.id === user[0].role_id);
      if (role) {
        setUserRole(role.name);
      }
    }
  };

  const handleOrderDetails = () => {
    const details = orderData.order_details.map((orderItem) => {
      const matchingItem = items.find((item) => item.id === orderItem.item_id);
      return {
        ...orderItem,
        image: matchingItem ? matchingItem.image : orderItem.image,
        description: matchingItem ? matchingItem.description : orderItem.description,
      };
    });
    setOrderDetails(details);
  };

  const getFamily = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.get(`${API_URL}/family/getFamily`);
      setParentCheck(response.data);
    } catch (error) {
      console.error(
        "Error fetching Family",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);
  }
  const getSubFamily = async () => {
    setIsProcessing(true);
    try {
      const response = await axios.get(`${API_URL}/subfamily/getSubFamily`);
      setChildCheck(response.data);
    } catch (error) {
      console.error(
        "Error fetching SubFamily",
        error.response ? error.response.data : error.message
      );
    }
    setIsProcessing(false);
  }

  // ----resons section -----

  const handlereasons = (event) => {
    let notes = event?.target.value
    setReason(notes)
  }

  // ----resons section  end-----

  // =========Add product Modal ==============

  const [checkedParents, setCheckedParents] = useState({});
  const [checkedChildren, setCheckedChildren] = useState({});

  useEffect(() => {

    const initialParents = {};
    const initialChildren = {};
    parentCheck.forEach(parent => initialParents[parent.id] = false);
    childCheck.forEach(child => initialChildren[child.id] = false);
    setCheckedParents(initialParents);
    setCheckedChildren(initialChildren);
  }, [parentCheck, childCheck]);

  const handleParentChangeMenu = (parentId) => {
    const newCheckedParents = { ...checkedParents, [parentId]: !checkedParents[parentId] };
    setCheckedParents(newCheckedParents);

    const newCheckedChildren = { ...checkedChildren };
    childCheck.forEach(child => {
      if (parentCheck.find(p => p.id === parentId)?.name === child.family_name) {
        newCheckedChildren[child.id] = newCheckedParents[parentId];
      }
    });
    setCheckedChildren(newCheckedChildren);

    filterItems(newCheckedParents, newCheckedChildren, searchTermMenu);
  };

  const handleChildChangeMenu = (childId, parentName) => {
    const newCheckedChildren = { ...checkedChildren, [childId]: !checkedChildren[childId] };
    setCheckedChildren(newCheckedChildren);

    const parentId = parentCheck.find(p => p.name === parentName)?.id;
    const allChildrenUnchecked = childCheck
      .filter(child => child.family_name === parentName)
      .every(child => !newCheckedChildren[child.id]);

    const newCheckedParents = { ...checkedParents, [parentId]: !allChildrenUnchecked };
    setCheckedParents(newCheckedParents);

    filterItems(newCheckedParents, newCheckedChildren, searchTermMenu);
  };

  const filterItems = (parents, children, searchTerm) => {
    const filteredItems = obj1.filter(item => {
      const matchesParent = Object.values(parents).some(checked => checked) ? parents[item.family_id] : true;
      const matchesChild = Object.values(children).some(checked => checked) ? children[item.sub_family_id] : true;
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return ((matchesParent && matchesChild) || (!Object.values(parents).some(checked => checked) && !Object.values(children).some(checked => checked))) && matchesSearch;
    });

    setFilteredItemsMenu(filteredItems);
  };

  const handleSearchMenu = (event) => {
    const term = event.target.value;
    setSearchTermMenu(term);
    filterItems(checkedParents, checkedChildren, term);
  };


  // ==== select items section ====
  const handleAddItem = (item) => {
    console.log(item, "safasf");
    if (!selectedItemsMenu.some((v) => v.item_id == item.id)) {
      console.log(selectedItemsMenu);
      const obj = {
        item_id: item.id,
        quantity: 1,
      }
      setSelectedItemsMenu((prevArray) => [...prevArray, obj]);
      console.log(selectedItemsMenu);
      setSelectedItemsCount(selectedItemsCount + 1);
      // setItemId((prevArray) => [...prevArray, item.id]);

      // Perform any other action here when adding an item
      console.log(`Added item ${item.id}`);
    } else {
      console.log(`Item ${item.id} already added`);
    }
  };

  // ==== select items section ====

  /*========= Add menu to Order =======*/
  const handleAddMenu = async () => {
    // console.log("dsassf");
    setIsProcessing(true);
    try {
      const response = await axios.post(
        `${API_URL}/order/addItem`,
        {
          "order_id": id,
          "order_details": selectedItemsMenu
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          maxBodyLength: Infinity
        }
      );
      setIsProcessing(false);

      // console.log("API Response:", response);                    

      if (!(response.success == "false")) {
        handleClose1Prod();
        handleShow1AddSuc();

        // setItemId([]);
        setSelectedItemsMenu([]);

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

  /*========= Add menu to Order =======*/


  // ===============note ========
  const toggleInput = (id) => {
    setVisibleInputId(prevId => prevId === id ? null : id);
  };

  const handleNoteChange = (id, e) => {
    setNoteValues(e.target.value);
  };

  const handleNoteKeyDown = (id) => async (e) => {
    if (e.key === 'Enter') {
      console.log(id);
      try {
        const response = await axios.post(
          `${API_URL}/order/addNote/${id}`,
          { notes: noteValues },
          {
            headers: {
              Authorization: `Bearer 2816|ojbPri4TvtQKBLMDfMp3wnCaYrpUf5tpEv1UZ3dp07d9f3e0`,
            },
          }
        );
        console.log("Note added successfully:", response.data);

        // setSavedNote(noteValues);
        setNoteValues('');
        setVisibleInputId(null);
      } catch (error) {
        console.error(
          "Error adding note:",
          error.response ? error.response.data : error.message
        );
      }

      getOrder();
      handleOrderDetails();
    }
  };

  // =============end note==========



  // const obj1 = {
  //   name: "Damian Gonzales",
  //   Paltform: "Uber",
  // }
  // const [data2, setData2] = useState([
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Cancelado"

  //   },
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Recibido"


  //   },
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Preparado"


  //   },
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Entregado"
  //   },
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Finalizado"
  //   },
  //   {
  //     Date: "20/03/2024",
  //     Hour: "08:00 am",
  //     User: 'Cocina',
  //     state: "Preparado"
  //   },



  //   // More orders...
  // ]);

  // const [product, setproduct] = useState([
  //   {
  //     id: 1,
  //     image: pic1,
  //     name: 'Pollo frito crujiente',
  //     discription: 'Las esepecialidad de la casa',
  //     price: '$10.00',
  //     quantity: 2,
  //     note: 'Agregar nota'
  //   },
  //   {
  //     id: 1,
  //     image: pic2,
  //     name: 'Guitig',
  //     discription: 'Con gas',
  //     price: '$2.00',
  //     quantity: 2,
  //     note: 'Nota: Al clima'
  //   },

  //   {
  //     id: 1,
  //     image: pic3,
  //     name: 'Gelatina',
  //     discription: 'Con gas',
  //     price: '$2.00',
  //     quantity: 2,
  //     note: 'Nota: Con cereza a los lados'
  //   }
  // ])
  // const [date, setdate] = useState("17/03/2024")
  // const [time, settime] = useState("08:00 am")
  // const [order, setorder] = useState("01234")
  // const [order1, setorder1] = useState("3")


  document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('#pills-tab button');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
        // Remove 'bg-primary', 'text-light', 'bg-light', 'text-dark' from all tabs
        tabs.forEach(button => {
          button.classList.remove('bg-primary', 'text-light');
          button.classList.add('bg-light', 'text-dark');
        });

        // Add 'bg-primary' and 'text-light' to the clicked tab
        tab.classList.remove('bg-light', 'text-dark');
        tab.classList.add('bg-primary', 'text-light');
      });
    });
  });
  const [activeTab, setActiveTab] = useState("home");
  const [showDeliveryButton, setShowDeliveryButton] = useState(true);
  const [showCancelOrderButton, setShowCancelOrderButton] = useState(false);
  const handleTabSelect = (selectedTab) => {
    setActiveTab(selectedTab);
    if (selectedTab === "profile") {
      setShowDeliveryButton(false);
      setShowCancelOrderButton(true);
    } else {
      setShowDeliveryButton(true);
      setShowCancelOrderButton(false);
    }
  };
  // console.log(orderData);


  return (
    <div>
      <div className="m_bg_black">
        <Header />
        <div className="d-flex">
          <Sidenav />
          <div className=" flex-grow-1 sidebar overflow-hidden">
            <div className="p-3 m_bgblack text-white  ">
              <Link to="/home/usa" className='d-flex text-decoration-none' >
                <div className='btn bj-btn-outline-primary text-nowrap py-2 d-flex mt-2 ms-3' style={{ borderRadius: "10px" }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
              </Link>
              <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <div className='text-white ms-3 my-4 bj-delivery-text-1' >
                  Pedido :- {id}
                </div>

                <div className='d-flex flex-wrap me-4'>
                  {showCancelOrderButton ? (
                    <div onClick={handleShow} className='btn btn-danger me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#F05252", borderRadius: '10px' }}> <IoMdCloseCircle className='me-2' />Cancel order</div>
                  ) : (
                    <Link className='text-decoration-none' to={`/home/usa/information/payment_edit/${id}`}>
                      <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div>
                    </Link>
                  )}
                  {/* <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div> */}
                  <div className='btn bj-btn-outline-primary b_mar_lef ms-2 py-2 text-nowrap d-flex align-item-center justify-content-center ' style={{ borderRadius: "10px" }} onClick={handleShow1Prod}> <FiPlus className='me-2 mt-1 ' />Agregar Producto</div>
                </div>

              </div>
              {showDeliveryButton && (
                <div className='b_borderrr pb-4'>
                  {/* <div style={{ fontWeight: "600", borderRadius: "10px" }} className={`btn a_btn_lightjamun my-3  bj-delivery-text-2 py-2 ms-3  ${orderData?.order_type.toLowerCase() === 'local' ? 'b_indigo' : orderData?.order_type.toLowerCase() === 'order now' ? 'b_ora ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'b_blue' : orderData?.order_type.toLowerCase() === 'uber' ? 'b_ora text-danger' : orderData?.order_type.toLowerCase().includes("with") ? 'b_purple' : 'b_ora text-danger'}`}>
                    {orderData?.order_type.toLowerCase() === 'local' ? 'Local' : orderData?.order_type.toLowerCase().includes("with") ? 'Retiro ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'Entrega' : orderData?.order_type.toLowerCase() === 'uber' ? 'Uber' : orderData?.order_type}</div> */}


                  <div style={{ fontWeight: "600", borderRadius: "10px" }} className={`bj-delivery-text-2  b_btn1 mb-3 ms-3  p-0 text-nowrap d-flex  align-items-center justify-content-center 
                        ${orderData?.order_type.toLowerCase() === 'local' ? 'b_indigo' : orderData?.order_type.toLowerCase() === 'order now' ? 'b_ora ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'b_blue' : orderData?.order_type.toLowerCase() === 'uber' ? 'b_ora text-danger' : orderData?.order_type.toLowerCase().includes("with") ? 'b_purple' : 'b_ora text-danger'}`}>
                    {orderData?.order_type.toLowerCase() === 'local' ? 'Local' : orderData?.order_type.toLowerCase().includes("with") ? 'Retiro ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'Entrega' : orderData?.order_type.toLowerCase() === 'uber' ? 'Uber' : orderData?.order_type}
                  </div>
                </div>

              )}
            </div>

            {/* cancel order modal */}

            <Modal
              show={show}
              onHide={handleClose}
              backdrop={true}

              keyboard={false}
              className="m_modal"
            >
              <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                <Modal.Title className="j-tbl-text-10">Anular pedido</Modal.Title>
              </Modal.Header>
              <Modal.Body className="border-0 pb-0 ">
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label j-tbl-font-11"
                  >
                    Pedido
                  </label>
                  <input
                    type="text"
                    className="form-control j-table_input"
                    id="exampleFormControlInput1"
                    // placeholder="01234"
                    placeholder={id}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="exampleFormControlInput1"
                    className="form-label j-tbl-font-11"
                  >
                    Motivo de la anulación
                  </label>
                  <input
                    type="text"
                    className="form-control j-table_input py-3"
                    id="exampleFormControlInput1"
                    placeholder="-"
                    onKeyUp={handlereasons}
                    required
                  />
                </div>
              </Modal.Body>
              <Modal.Footer className="border-0 pt-0">
                <Button
                  className="j-tbl-btn-font-1"
                  variant="danger"
                  onClick={() => {
                    handleClose();
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  className="j-tbl-btn-font-1"
                  variant="primary"
                  onClick={() => {
                    handleClose();
                    handleShow12();
                  }}
                >
                  Anular pedido
                </Button>
              </Modal.Footer>
            </Modal>

            <Tabs
              activeKey={activeTab}
              onSelect={handleTabSelect}
              id="fill-tab-example"
              className="mb-3 m_tabs m_bgblack px-2 border-0 p-3 pb-4"
              fill>
              <Tab
                eventKey="home"
                title="Orden"
                className="m_in text-white m-3 aaaaa rounded">
                <div className='row'>
                  <div className='col-xl-7 ps-0 col-12 overflow-hidden '>
                    <div className='p-4 m_bgblack text-white'>
                      <p className='bj-delivery-text-65' style={{ marginBottom: "36px" }}>Listado</p>
                      <div className='a_deli_infolist p-4'>
                        {
                          // product.map((item) => {
                          // console.log(item)
                          orderDetails?.map((v, index) => {
                            return (
                              <div>
                                <div className=' py-3 '>
                                  <div className='row'>
                                    <div className=' col-sm-8 '>
                                      <div className='d-flex '>
                                        <img src={`${API}/images/${v.image}`} alt='pic' className='ms-4' height={70} width={80} />
                                        <div className='ms-4 '>
                                          <div className='text-nowrap j-caja-text-2'>{v.name}</div>
                                          <div className='mt-3 a_mar_new '>{v.description}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-sm-2 a_text_price '>
                                      <div className='pe-3 '>{v.quantity}</div>
                                    </div>
                                    <div className='col-sm-2 a_text_price'>
                                      <div className='pe-5 fw-bold '>${v.amount}</div>
                                    </div>
                                  </div>
                                </div>

                                <div className='' style={{ marginBottom: "68px", cursor: "pointer" }}><a href='#' className='a_home_addnote ms-4 bj-delivery-text-3 '>
                                  {v.notes === null ? (
                                    <div key={v.id}>
                                      {visibleInputId !== v.id && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <span
                                            className='j-nota-blue ms-4 text-decoration-underline'
                                            onClick={() => toggleInput(v.id)}
                                          >
                                            + Nota
                                          </span>
                                        </div>
                                      )}

                                      {visibleInputId === v.id && (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                          <span className='j-nota-blue ms-4'>Nota:</span>
                                          <input
                                            type="text"
                                            className='j-note-input'
                                            value={noteValues}
                                            onChange={(e) => handleNoteChange(v.id, e)}
                                            onKeyDown={handleNoteKeyDown(v.id)}
                                          />
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div className='a_home_addnote ms-4' >
                                      {v.notes}
                                    </div>
                                  )}
                                </a></div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-5 col-12 overflow-hidden pe-0 '>
                    <div className='p-3 m_bgblack text-white '>
                      <h5 className='mt-3 ms-2 bj-delivery-text-15'>Resumen</h5>
                      <div className='deli_infolist p-2'>
                        <div className='d-flex justify-content-end align-items-center ' >
                          <div className='d-flex justify-content-end align-items-center me-3 '>
                            <div className='me-2 fs-4'><FaCalendarAlt className='bj-icon-size-change' /></div>
                            <div className='pt-1 bj-delivery-text-3'>{new Date(orderData?.created_at).toLocaleDateString('en-GB')}</div>
                          </div>
                          <div className='d-flex justify-content-end align-items-center '>
                            <div className='me-2 fs-4 '><MdOutlineAccessTimeFilled /></div>
                            <div className='pt-1 a_time bj-delivery-text-3'>{new Date(orderData?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                          </div>
                        </div>
                        <div className='bj-delivery-text-15'>
                          Datos
                        </div>
                        <div className={`bj-delivery-text-2  b_btn1 mb-3 p-0 text-nowrap d-flex  align-items-center justify-content-center 
                                            ${orderData?.status.toLowerCase() === 'received' ? 'b_indigo' : orderData?.status.toLowerCase() === 'prepared' ? 'b_ora ' : orderData?.status.toLowerCase() === 'delivered' ? 'b_blue' : orderData?.status.toLowerCase() === 'finalized' ? 'b_green' : orderData?.status.toLowerCase() === 'withdraw' ? 'b_indigo' : orderData?.status.toLowerCase() === 'local' ? 'b_purple' : 'text-danger'}`}>
                          {orderData?.status.toLowerCase() === 'received' ? 'Recibido' : orderData?.status.toLowerCase() === 'prepared' ? 'Preparado ' : orderData?.status.toLowerCase() === 'delivered' ? 'Entregado' : orderData?.status.toLowerCase() === 'finalized' ? 'Finalizado' : orderData?.status.toLowerCase() === 'withdraw' ? 'Retirar' : orderData?.status.toLowerCase() === 'local' ? 'Local' : ' '}
                        </div>
                        {/* <div style={{ fontWeight: "600", borderRadius: "10px" }} className={`bj-delivery-text-2  b_btn1 mb-3   p-0 text-nowrap d-flex  align-items-center justify-content-center 
                        ${orderData?.order_type.toLowerCase() === 'local' ? 'b_indigo' : orderData?.order_type.toLowerCase() === 'order now' ? 'b_ora ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'b_blue' : orderData?.order_type.toLowerCase() === 'uber' ? 'b_ora text-danger' : orderData?.order_type.toLowerCase().includes("with") ? 'b_purple' : 'b_ora text-danger'}`}>
                          {orderData?.order_type.toLowerCase() === 'local' ? 'Local' : orderData?.order_type.toLowerCase().includes("with") ? 'Retiro ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'Entrega' : orderData?.order_type.toLowerCase() === 'uber' ? 'Uber' : orderData?.order_type}
                        </div> */}
                        <div className='d-flex justify-content-end align-items-center mb-4 mt-3'>
                          <div className='w-50'>
                            <div className='mb-3 bj-delivery-text-3'>Codigo pedido</div>
                            <div className='w-75 a_bg_order  border-0' style={{ borderRadius: "10px" }}><span className=''>{id}</span></div>
                          </div>
                          <div className='w-50'>
                            <div className='mb-3 bj-delivery-text-3'>Cantidad</div>
                            <div className='w-75 a_bg_order  border-0 ' style={{ borderRadius: "10px" }}><span className=''>{orderDetails.length}</span></div>
                          </div>
                        </div>
                        <div className='p-4 a_deli_infolist  mt-3'>
                          <div className=' a_mar_summary bj-delivery-text-650'>Costo total</div>
                          <div className='d-flex justify-content-between align-items-center my-1 mb-2'>
                            <div className='bj-delivery-text-150'>Productos</div>
                            <div className='bj-delivery-text-151'>${orderDetails.reduce((acc, v) => v.amount * v.quantity + acc, 0)}</div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center my-1'>
                            <div className='bj-delivery-text-150'>Descuentos</div>
                            <div className='bj-delivery-text-151'>${parseInt(orderData?.discount)}</div>
                          </div>
                          <hr></hr>
                          <div>
                            <div className='d-flex justify-content-between align-items-center my-1'>
                              <div className='bj-delivery-text-153'>Total</div>
                              <div className='bj-delivery-text-153'>${orderDetails.reduce((acc, v) => v.amount * v.quantity + acc, 0) - parseInt(orderData?.discount)}</div>
                            </div>
                          </div>
                        </div>
                        <div className='mx-auto text-center mt-3'>
                          <div className='btn btn-primary w-100 my-4 bj-delivery-text-3 border-0' style={{ backgroundColor: "#147BDE", borderRadius: "8px", padding: "10px 20px" }}>Cobrar ahora</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Tab>

              <Tab eventKey="profile" title="Informaction del cliente" className='b_border ' style={{ marginTop: "2px" }}>
                <div className='b-bg-color1'>
                  <div className='text-white ms-4 pt-4' >
                    <h5 >Información del pedido</h5>
                  </div>

                  <div className='d-flex  flex-grow-1 gap-5 mx-4 m b_inputt b_id_input b_home_field  pt-3 '>
                    <div className='w-100 b_search flex-grow-1  text-white'>
                      <label htmlFor="inputPassword2" className="mb-2 bj-delivery-text-3">Cliente</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-3" value={orderData?.customer_name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                    <div className='w-100 flex-grow-1 b_search text-white'>
                      <label htmlFor="inputPassword2" className="mb-2 bj-delivery-text-3">Plataforma</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-3 " value={orderData?.order_type} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                  </div>

                  <div className='b_table1 mx-4 mt-2' >
                    <div className='text-white mt-4'>
                      <h5 style={{ fontSize: "16px" }}>Historia del Estado</h5>
                    </div>
                    <table className='b_table '>
                      <thead>
                        <tr className='b_thcolor'>
                          <th>Fecha</th>
                          <th>hora </th>
                          <th>usuarios</th>
                          <th>estado</th>

                        </tr>
                      </thead>
                      <tbody className='text-white b_btnn '>
                        {orderStatus.logs?.map((order) => (
                          <tr key={id} className='b_row'>
                            <td className='mb-4 j-caja-text-2 '>{new Date(order?.created_at).toLocaleDateString('en-GB')}</td>
                            <td className='text-nowrap j-caja-text-2 '>{new Date(order?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                            <td className='j-caja-text-2 '>{userRole}</td>
                            <td className={` mt-3 bj-delivery-text-2 mb-3 b_text_w b_btn1 d-flex align-items-center justify-content-center mt-0 
                              ${order.status.toLowerCase() === 'received' ? 'b_indigo' : order.status.toLowerCase() === 'prepared' ? 'b_ora ' : order.status.toLowerCase() === 'delivered' ? 'b_blue' : order.status.toLowerCase() === 'finalized' ? 'b_green' : order.status.toLowerCase() === 'withdraw' ? 'b_indigo' : order.status.toLowerCase() === 'local' ? 'b_purple' : 'text-danger'}`}>
                              {order.status.toLowerCase() === 'received' ? 'Recibido' : order.status.toLowerCase() === 'prepared' ? 'Preparado ' : order.status.toLowerCase() === 'delivered' ? 'Entregado' : order.status.toLowerCase() === 'finalized' ? 'Finalizado' : order.status.toLowerCase() === 'withdraw' ? 'Retirar' : order.status.toLowerCase() === 'local' ? 'Local' : order.status.toLowerCase() === 'cancelled' ? 'Cancelar' : ' '}</td>
                            {/* <td className='b_text_w'>
                              <button className='b_edit' onClick={() => handleEditClick(id)}><MdEditSquare /></button>
                              <button className='b_edit b_delete' onClick={() => handleDeleteClick(id)}><RiDeleteBin5Fill /></button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Tab>
            </Tabs>

          </div>
        </div>

        <Modal
          show={show1Prod}
          onHide={handleClose1Prod}
          backdrop={true}
          keyboard={false}
          className="m_modal m1 jm-modal_jjjj"
        >
          <Modal.Header
            closeButton
            className="m_borbot "
            style={{ backgroundColor: "#111928" }}
          >
            <Modal.Title className="m18">
              Agregar artículos
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            className="border-0 p-0 "
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
                      <p className="text-white m14 my-2 mb-3">
                        Familias y subfamilias
                      </p>
                    </div>
                  </div>

                  <div className="py-3 m_borbot mx-3  m14 ">
                    {parentCheck.map((parentItem) => (
                      <div key={parentItem.id}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                          <div className="text-nowrap">
                            <label>
                              <input
                                type="checkbox"
                                checked={checkedParents[parentItem.id]}
                                onChange={() => handleParentChangeMenu(parentItem.id)}
                                className="me-2 custom-checkbox"
                              />
                              <span className="text-white">{parentItem.name}</span>
                            </label>
                          </div>
                        </div>
                        {checkedParents[parentItem.id] && (
                          <div style={{ marginLeft: "20px" }}>
                            {childCheck
                              .filter((childItem) => childItem.family_name === parentItem.name)
                              .map((childItem) => (
                                <div key={childItem.id}>
                                  <div className="d-flex align-content-center justify-content-between my-2 m14">
                                    <div>
                                      <label className="text-white ">
                                        <input
                                          type="checkbox"
                                          checked={checkedChildren[childItem.id]}
                                          className="mx-2"
                                          onChange={() => handleChildChangeMenu(childItem.id, parentItem.name)}
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
                    <h6>Bebidas</h6>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <div>
                        <div className="">
                          <div class="m_group">
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
                            // handleClose1Prod();
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
                  {filteredItemsMenu.map((ele, index) => (
                    <div
                      className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                      keys={index}
                    >
                      <div>
                        <div class="card m_bgblack text-white position-relative">
                          <img
                            src={`${API}/images/${ele.image}`}
                            class="card-img-top object-fit-fill rounded"
                            alt="..."
                            style={{ height: "162px" }}
                          />
                          <div class="card-body">
                            <h6 class="card-title">{ele.name}</h6>
                            <h6 class="card-title">${ele.sale_price}</h6>
                            <p class="card-text opacity-50">
                              Codigo: {ele.code}
                            </p>
                            <div class="btn w-100 btn-primary text-white" onClick={() => handleAddItem(ele)}>
                              <a
                                href="# "
                                className="text-white text-decoration-none"
                                style={{ fontSize: "14px" }}
                              >
                                <span className="ms-1">Añadir </span>
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
          className="m_modal"
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

        {/* processing */}
        <Modal
          show={isProcessing}
          keyboard={false}
          backdrop={true}
          className="m_modal  m_user "
        >
          <Modal.Body className="text-center">
            <p></p>
            <Spinner animation="border" role="status" style={{ height: '85px', width: '85px', borderWidth: '6px' }} />
            <p className="mt-2">Procesando solicitud...</p>
          </Modal.Body>
        </Modal>


      </div>
    </div >





  )
}
