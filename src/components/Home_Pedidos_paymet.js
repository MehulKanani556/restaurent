import React, { useRef, useState } from 'react'
import Header from './Header'
import Sidenav from './Sidenav'
import { Badge, Button, Modal } from 'react-bootstrap'
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
import img2 from "../Image/addmenu.jpg";
import { Link } from 'react-router-dom';

export default function Home_Pedidos_paymet() {
  // const [counts, setCounts] = useState(item ? { [item.id]: 0 } : {});
  // const [counts, setCounts] = useState(item ? { [item.id]: 0 } : {});

  // create family
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show12, setShow12] = useState(false);
  const handleClose12 = () => setShow12(false);
  const handleShow12 = () => {
    setShow12(true)
    setTimeout(() => {
      setShow12(false)
    }, 2000);
  };


  const obj1 = {
    sector: "4",
    mesa: "2",
    name: "Damian Gonzales",
    Paltform: "5",
  }

  const [data2, setData2] = useState([
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Anulado"

    },
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Recibido"


    },
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Preparado"


    },
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Entregado"
    },
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Finalizado"
    },
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Preparado"
    },



    // More orders...
  ]);

  const [product, setproduct] = useState([
    {
      id: 1,
      image: pic1,
      name: 'Pollo frito crujiente',
      discription: 'Las esepecialidad de la casa',
      price: '$10.00',
      quantity: 2,
      note: '+ Agregar nota'
    },
    {
      id: 1,
      image: pic2,
      name: 'Guitig',
      discription: 'Con gas',
      price: '$2.00',
      quantity: 2,
      note: 'Nota: Al clima'
    },

    {
      id: 1,
      image: pic3,
      name: 'Gelatina',
      discription: 'Con gas',
      price: '$2.00',
      quantity: 2,
      note: 'Nota: Con cereza a los lados'
    }
  ])


  // const [editingNote, setEditingNote] = useState(null);
  // const [noteValue, setNoteValue] = useState('');


  // const handleEditNoteClick = (index, note) => {
  //   setEditingNote(index);
  //   setNoteValue(note === '+ Agregar nota' ? '' : note.startsWith('Nota: ') ? note.substring(6) : note);
  // };

  // const handleNoteChange = (e) => {
  //   setNoteValue(e.target.value);
  // };

  // const handleNoteKeyDown = (index, e) => {
  //   if (e.key === 'Enter') {
  //     const updatedProduct = [...product];
  //     updatedProduct[index].note = `Nota: ${noteValue}`;
  //     setproduct(updatedProduct);
  //     setEditingNote(null);
  //   }
  // };


  const [editingNote, setEditingNote] = useState(null);
  const [noteValue, setNoteValue] = useState('');

  const handleEditNoteClick = (index, note) => {
    setEditingNote(index);
    setNoteValue(note === '+ Agregar nota' ? '' : note.startsWith('Nota: ') ? note.substring(6) : note);
  };

  const handleNoteChange = (e) => {
    setNoteValue(e.target.value);
  };

  const handleNoteKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      const updatedProduct = [...product];
      updatedProduct[index].note = `Nota: ${noteValue}`;
      setproduct(updatedProduct);
      setEditingNote(null);
    }
  };



  const [date, setdate] = useState("17/03/2024")
  const [time, settime] = useState("08:00 am")
  const [order, setorder] = useState("01234")
  const [order1, setorder1] = useState("3")


  document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('#pills-tab button');

    tabs.forEach(tab => {
      tab.addEventListener('click', function () {
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
  const obj2 = [
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
    {
      image: img2,
      name: "Jugo",
      price: "2.00",
      code: "0124",
    },
  ];
  const checkboxs = [
    {
      menu: "Cocina 1",
    },
    {
      menu: "Cocina 2",
    },
    {
      menu: "Barra 1",
    },
    {
      menu: "Barra 2",
    },
  ];

  // Add producttion
  const [show1Prod, setShow1Prod] = useState(false);
  const handleClose1Prod = () => setShow1Prod(false);
  const handleShow1Prod = () => setShow1Prod(true);

  // create production center
  const [showCreate, setShowCreate] = useState(false);
  const handleCloseCreate = () => setShowCreate(false);
  const handleShowCreate = () => setShowCreate(true);

  // create production success
  const [showCreSucProduction, setShowCreSucProduction] = useState(false);
  const handleCloseCreSucProduction = () => setShowCreSucProduction(false);
  const handleShowCreSucProduction = () => setShowCreSucProduction(true);

  //  // Add producttion
  //  const [show1Prod, setShow1Prod] = useState(false);
  //  const handleClose1Prod = () => setShow1Prod(false);
  //  const handleShow1Prod = () => setShow1Prod(true);

  // Add product success
  const [show1AddSuc, setShow1AddSuc] = useState(false);
  const handleClose1AddSuc = () => setShow1AddSuc(false);
  const handleShow1AddSuc = () => {
    setShow1AddSuc(true)
    setTimeout(() => {
      setShow1AddSuc(false)
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

  const handleDivClick = () => {
    fileInputRef.current.click();
  };
  const [checkboxes, setCheckboxes] = useState({
    Bebidas: {
      isChecked: false,
      children: {
        Agua: false,
        Colas: false,
        Cervezas: false,
      },
    },
    Snacks: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false,
      },
    },
    Dulces: {
      isChecked: false,
      children: {
        Op1: false,
        Op2: false,
      },
    },
  });

  const handleParentCheckboxChange = (parentKey) => {
    setCheckboxes((prevState) => {
      const newParentCheckedState = !prevState[parentKey].isChecked;
      const newChildrenState = Object.keys(
        prevState[parentKey].children
      ).reduce((acc, key) => {
        acc[key] = newParentCheckedState;
        return acc;
      }, {});

      return {
        ...prevState,
        [parentKey]: {
          isChecked: newParentCheckedState,
          children: newChildrenState,
        },
      };
    });
  };

  const handleChildCheckboxChange = (parentKey, childKey) => {
    setCheckboxes((prevState) => ({
      ...prevState,
      [parentKey]: {
        ...prevState[parentKey],
        children: {
          ...prevState[parentKey].children,
          [childKey]: !prevState[parentKey].children[childKey],
        },
      },
    }));
  };





  return (
    <div>
      <div className="m_bg_black">
        <Header />
        <div className="d-flex">
          <Sidenav />
          <div className=" flex-grow-1 sidebar overflow-hidden">
            <div className="p-3 m_bgblack text-white  ">
              <Link to="/home_Pedidos" className='d-flex text-decoration-none' >
                <div className='btn btn-outline-primary text-nowrap py-2 d-flex mt-2 ms-3' style={{ borderRadius: "10px" }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
              </Link>
              <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <div className='text-white ms-3 my-4' style={{ fontSize: "18px" }}>
                  Pedido : {order}
                </div>


                <div className='d-flex flex-wrap me-4'>
                  {showCancelOrderButton ? (
                    <div onClick={handleShow} className='btn btn-danger me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#F05252", borderRadius: '10px' }}> <IoMdCloseCircle className='me-2' />Anular pedido</div>
                  ) : (
                    <Link className='text-decoration-none' to={"/home_Pedidos/payment_edit"}>
                      <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div>
                    </Link>
                  )}
                  {/* <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div> */}
                  <div className='btn btn-outline-primary b_mar_lef ms-2 py-2 text-nowrap d-flex align-item-center justify-content-center' style={{ borderRadius: "10px" }} onClick={handleShow1Prod}> <FiPlus className='me-2 mt-1' />Agregar Producto</div>
                </div>

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
                        placeholder="01234"
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

              </div>
              {/* {showDeliveryButton && (
                <div className='b_borderrr pb-4'>
                  <div className='btn a_btn_lightgreen ms-3 a_mar_delivary py-2' style={{ borderRadius: "10px" }}><span className='text-success fw-bold'>Delivery</span></div>
                </div>
              )} */}
            </div>


            <Tabs
              activeKey={activeTab}
              onSelect={handleTabSelect}
              id="fill-tab-example"
              className="mb-3 m_tabs m_bgblack px-2 border-0 p-3  "
              fill>
              <Tab
                eventKey="home"
                title="Orden"
                className="m_in text-white aaaaa  rounded"
              >
                <div className='row'>
                  <div className='col-xl-7 ps-0 col-12 overflow-hidden '>
                    <div className='p-4 m_bgblack text-white '>
                      <p className='' style={{ fontSize: "18px", marginBottom: "36px" }}>Listado</p>
                      <div className='a_deli_infolist p-4'>
                        {
                          product.map((item, index) => {
                            console.log(item)
                            return (
                              <div>
                                <div className=' py-3 '>
                                  <div className='row'>
                                    <div className=' col-sm-8 '>
                                      <div className='d-flex '>
                                        <img src={item.image} alt='pic' className='ms-4' height={70} width={80} />
                                        <div className='ms-4 '>
                                          <div className='text-nowrap'>{item.name}</div>
                                          <div className='mt-3 a_mar_new '>{item.discription}</div>
                                        </div>
                                      </div>
                                    </div>
                                    <div className='col-sm-2 a_text_price '>
                                      <div className='pe-3 '>{item.quantity}</div>
                                    </div>
                                    <div className='col-sm-2 a_text_price'>
                                      <div className='pe-5 fw-bold '>{item.price}</div>
                                    </div>
                                  </div>
                                </div>
                                {/* <div style={{ marginBottom: "68px", cursor: "pointer" }}>
                                  {editingNote === index ? (
                                    <input
                                      type="text"
                                      className='ms-4 j-note-input'
                                      value={noteValue}
                                      onChange={(e) => handleNoteChange(index, `Nota: ${e.target.value}`)}
                                      onKeyDown={(e) => handleNoteKeyDown(index, e)}
                                    />
                                  ) : (
                                    <div className='a_home_addnote ms-4' onClick={() => handleEditNoteClick(index, item.note)}>
                                      {item.note}
                                    </div>
                                  )}
                                </div> */}
                                <div style={{ marginBottom: "68px", cursor: "pointer" }}>
                                  {editingNote === index ? (
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                      <span className='j-nota-blue ms-4'>Nota:</span>
                                      <input
                                        type="text"
                                        className='j-note-input'
                                        value={noteValue}
                                        onChange={handleNoteChange}
                                        onKeyDown={(e) => handleNoteKeyDown(index, e)}
                                      />
                                    </div>
                                  ) : (
                                    <div className='a_home_addnote ms-4' onClick={() => handleEditNoteClick(index, item.note)}>
                                      {item.note}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>
                  <div className='col-xl-5 pe-0 col-12 overflow-hidden '>
                    <div className='p-3 m_bgblack text-white'>
                      <h5 className='mt-3 ms-2'>Resumen</h5>
                      <div className='deli_infolist p-2'>
                        <div className='d-flex justify-content-end align-items-center ' >
                          <div className='d-flex justify-content-end align-items-center me-3 '>
                            <div className='me-2 fs-4'><FaCalendarAlt className='bj-icon-size-change' /></div>
                            <div className='pt-1 bj-delivery-text-3'>{date}</div>
                          </div>
                          <div className='d-flex justify-content-end align-items-center '>
                            <div className='me-2 fs-4 '><MdOutlineAccessTimeFilled /></div>
                            <div className='pt-2 a_time'>{time}</div>
                          </div>
                        </div>
                        <div className='fw-bold fs-5'>
                          Datos
                        </div>
                        <div className='btn a_btn_lightjamun my-3 bj-delivery-text-2 ' style={{ borderRadius: "10px" }}><span style={{ fontWeight: "600" }}>Recibido</span></div><br />
                        <div className='btn sj_btn_lightgreen my-3 bj-delivery-text-2 ' style={{ borderRadius: "10px" }}><span style={{ fontWeight: "600" }}>Uber</span></div>
                        <div className='d-flex justify-content-end align-items-center mb-4 mt-3'>
                          <div className='w-50'>
                            <div className='mb-3'>Codigo pedido</div>
                            <div className='w-75 a_bg_order py-2 border-0' style={{ borderRadius: "10px" }}><span className='ps-1'>{order}</span></div>
                          </div>
                          <div className='w-50'>
                            <div className='mb-3'>Cantidad</div>
                            <div className='w-75 a_bg_order py-2 border-0 ' style={{ borderRadius: "10px" }}><span className='ps-1'>{order1}</span></div>
                          </div>
                        </div>
                        <div className='p-4 a_deli_infolist  mt-3'>
                          <div className=' a_mar_summary fs-5 fw-bold'>Costo total</div>
                          <div className='d-flex justify-content-between align-items-center my-1 mb-2'>
                            <div>Productos</div>
                            <div>$13.00</div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center my-1'>
                            <div>Descuentos</div>
                            <div>$1.00</div>
                          </div>
                          <hr></hr>
                          <div>
                            <div className='d-flex justify-content-between align-items-center my-1 fs-5 fw-bold'>
                              <div>Total</div>
                              <div>$12.00</div>
                            </div>
                          </div>
                        </div>
                        <div className='mx-auto text-center mt-3'>
                          <div className='btn text-white j-btn-primary w-100  border-0' style={{ padding: "8px 12px", borderRadius: "8px" }}>Pagar ahora</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </Tab>

              <Tab eventKey="profile" title="Informaction del cliente" className='b_border ' style={{ marginTop: "2px" }}>
                <div className='b-bg-color1'>
                  <div className='text-white ms-4 pt-4' >
                    <h5>Información pedido</h5>
                  </div>

                  <div className='d-flex  flex-grow-1 gap-5 mx-4 m b_inputt b_id_input b_home_field  pt-3 '>
                    <div className='w-100 b_search flex-grow-1  text-white mb-3'>
                      <label htmlFor="inputPassword2" className="mb-2" style={{ fontSize: "14px" }}>Sector</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-2" value={obj1.sector} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                    <div className='w-100 flex-grow-1 b_search text-white mb-3'>
                      <label htmlFor="inputPassword2" className="mb-2">Mesa</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-2 " value={obj1.mesa} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                  </div>
                  <div className='d-flex  flex-grow-1 gap-5 mx-4 m b_inputt b_id_input b_home_field  pt-3 '>
                    <div className='w-100 b_search flex-grow-1  text-white mb-3'>
                      <label htmlFor="inputPassword2" className="mb-2" style={{ fontSize: "14px" }}>Cliente</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-2" value={obj1.name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                    <div className='w-100 flex-grow-1 b_search text-white mb-3'>
                      <label htmlFor="inputPassword2" className="mb-2">Personas</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-2 " value={obj1.Paltform} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                  </div>

                  <div className='b_table1 mx-4 mt-2' >
                    <div className='text-white mt-4'>
                      <h5 style={{ fontSize: "16px" }}>Historial estados</h5>
                    </div>
                    <table className='b_table '>
                      <thead>
                        <tr className='b_thcolor'>
                          <th>Fecha</th>
                          <th>Hora </th>
                          <th>Usuario</th>
                          <th>Estado</th>

                        </tr>
                      </thead>
                      <tbody className='text-white b_btnn '>
                        {data2.map((order) => (
                          <tr key={order.id} className='b_row'>
                            <td className=' mb-4'>{order.Date}</td>
                            <td className='text-nowrap'>{order.Hour}</td>
                            <td>{order.User}</td>
                            <td style={{ fontWeight: "500", padding: "8px 12px" }} className={`bj-delivery-text-2 mt-3  mb-3 b_text_w b_btn1 d-flex align-items-center justify-content-center mt-0 ${order.state == 'Anulado' ? 'b_redd' : order.state === 'Recibido' ? 'b_bluee' : order.state === 'Preparado' ? 'b_orr' : order.state === 'Entregado' ? 'b_neww' : order.state === 'Finalized' ? 'b_gree' : order.state === 'Preparado' ? 'b_orr' : 'text-denger'}`}>{order.state}</td>
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
                    {Object.keys(checkboxes).map((parentKey) => (
                      <div key={parentKey}>
                        <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                          <div className="text-nowrap">
                            <label>
                              <input
                                type="checkbox"
                                checked={
                                  checkboxes[parentKey].isChecked
                                }
                                onChange={() =>
                                  handleParentCheckboxChange(
                                    parentKey
                                  )
                                }
                                className="me-2 custom-checkbox"
                              />

                              <span className="text-white">
                                {parentKey.charAt(0).toUpperCase() +
                                  parentKey.slice(1)}
                              </span>
                            </label>
                          </div>
                        </div>

                        {checkboxes[parentKey].isChecked && (
                          <div style={{ marginLeft: "20px" }}>
                            {Object.keys(
                              checkboxes[parentKey].children
                            ).map((childKey) => (
                              <div key={childKey}>
                                <div className="d-flex align-content-center justify-content-between my-2 m14">
                                  <div>
                                    <label className="text-white ">
                                      <input
                                        type="checkbox"
                                        name={childKey}
                                        checked={
                                          checkboxes[parentKey]
                                            .children[childKey]
                                        }
                                        className="mx-2"
                                        onChange={() =>
                                          handleChildCheckboxChange(
                                            parentKey,
                                            childKey
                                          )
                                        }
                                      />
                                      {childKey
                                        .charAt(0)
                                        .toUpperCase() +
                                        childKey.slice(1)}
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
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <Button
                          className="mgreenbtn pt-2  m14 border-0 text-nowrap"
                          onClick={() => {
                            handleClose1Prod();
                            handleShow1AddSuc();
                          }}
                        >
                          Añadir nuevos
                          <Badge
                            bg="light"
                            className="ms-2 text-success rounded-circle m12"
                          >
                            9
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
                  {obj2.map((ele, index) => (
                    <div
                      className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                      keys={index}
                    >
                      <div>
                        <div class="card m_bgblack text-white position-relative">
                          <img
                            src={ele.image}
                            class="card-img-top object-fit-fill rounded"
                            alt="..."
                            style={{ height: "162px" }}
                          />
                          <div class="card-body">
                            <h6 class="card-title">{ele.name}</h6>
                            <h6 class="card-title">${ele.price}</h6>
                            <p class="card-text opacity-50">
                              Codigo: {ele.code}
                            </p>
                            <div class="btn w-100 btn-primary text-white">
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
                              to="/singleatricleproduct"
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


        <Modal
          show={show12}
          onHide={handleClose12}
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
              <p className="mb-0 mt-2 h6">Pedido anulado</p>
              <p className="opacity-75">
                Su pedido ha sido anulado exitosamente
              </p>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div >
  );
}
