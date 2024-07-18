import React, { useState } from 'react'
import Header from './Header'
import Sidenav from './Sidenav'
import { Button } from 'react-bootstrap'
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import pic1 from "../img/Image.png"
import pic2 from "../img/Image(1).jpg"
import pic3 from "../img/Image (2).png"
import { Tabs, Tab } from 'react-bootstrap';
import { IoMdCloseCircle } from 'react-icons/io';
import { Link } from 'react-router-dom';

export default function Homeinformation() {


  const obj1 = {
    name: "Damian Gonzales",
    Paltform: "Uber",
  }
  const [data2, setData2] = useState([
    {
      Date: "20/03/2024",
      Hour: "08:00 am",
      User: 'Cocina',
      state: "Cancelado"

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
      note: 'Agregar nota'
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
  const [date, setdate] = useState("17/03/2024")
  const [time, settime] = useState("08:00 am")
  const [order, setorder] = useState("01234")
  const [order1, setorder1] = useState("3")


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
                  Pedido :- {order}
                </div>

                <div className='d-flex flex-wrap me-4'>
                  {showCancelOrderButton ? (
                    <div className='btn btn-danger me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#F05252", borderRadius: '10px' }}> <IoMdCloseCircle className='me-2' />Cancel order</div>
                  ) : (
                    <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center j-caja-text-3' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div>
                  )}
                  {/* <div className='btn btn-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ backgroundColor: "#147BDE", borderRadius: '10px' }}> <MdEditSquare className='me-2' />Editar Pedido</div> */}
                  <div className='btn bj-btn-outline-primary b_mar_lef ms-2 py-2 text-nowrap d-flex align-item-center justify-content-center ' style={{ borderRadius: "10px" }}> <FiPlus className='me-2 mt-1 ' />Agregar Producto</div>
                </div>

              </div>
              {showDeliveryButton && (
                <div className='b_borderrr pb-4'>
                  <div className='btn a_btn_lightgreen ms-3 a_mar_delivary py-2' style={{ borderRadius: "10px" }}><span className='bj-text-success '>Delivery</span></div>
                </div>
              )}
            </div>


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
                          product.map((item) => {
                            console.log(item)
                            return (
                              <div>
                                <div className=' py-3 '>
                                  <div className='row'>
                                    <div className=' col-sm-8 '>
                                      <div className='d-flex '>
                                        <img src={item.image} alt='pic' className='ms-4' height={70} width={80} />
                                        <div className='ms-4 '>
                                          <div className='text-nowrap j-caja-text-2'>{item.name}</div>
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

                                <div className='' style={{ marginBottom: "68px" }}  ><a href='#' className='a_home_addnote ms-4 bj-delivery-text-3 '>{item.note}</a></div>
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
                            <div className='pt-1 bj-delivery-text-3'>{date}</div>
                          </div>
                          <div className='d-flex justify-content-end align-items-center '>
                            <div className='me-2 fs-4 '><MdOutlineAccessTimeFilled /></div>
                            <div className='pt-1 a_time bj-delivery-text-3'>{time}</div>
                          </div>
                        </div>
                        <div className='bj-delivery-text-15'>
                          Datos
                        </div>
                        <div className='btn a_btn_lightjamun my-3  bj-delivery-text-2' style={{ borderRadius: "10px" }}><span style={{ fontWeight: "600" }}>Recibido</span></div>
                        <div className='d-flex justify-content-end align-items-center mb-4 mt-3'>
                          <div className='w-50'>
                            <div className='mb-3 bj-delivery-text-3'>Codigo pedido</div>
                            <div className='w-75 a_bg_order  border-0' style={{ borderRadius: "10px" }}><span className=''>{order}</span></div>
                          </div>
                          <div className='w-50'>
                            <div className='mb-3 bj-delivery-text-3'>Cantidad</div>
                            <div className='w-75 a_bg_order  border-0 ' style={{ borderRadius: "10px" }}><span className=''>{order1}</span></div>
                          </div>
                        </div>
                        <div className='p-4 a_deli_infolist  mt-3'>
                          <div className=' a_mar_summary bj-delivery-text-650'>Costo total</div>
                          <div className='d-flex justify-content-between align-items-center my-1 mb-2'>
                            <div className='bj-delivery-text-150'>Productos</div>
                            <div className='bj-delivery-text-151'>$13.00</div>
                          </div>
                          <div className='d-flex justify-content-between align-items-center my-1'>
                            <div className='bj-delivery-text-150'>Descuentos</div>
                            <div className='bj-delivery-text-151'>$1.00</div>
                          </div>
                          <hr></hr>
                          <div>
                            <div className='d-flex justify-content-between align-items-center my-1'>
                              <div className='bj-delivery-text-153'>Total</div>
                              <div className='bj-delivery-text-153'>$12.00</div>
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
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-3" value={obj1.name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                    </div>
                    <div className='w-100 flex-grow-1 b_search text-white'>
                      <label htmlFor="inputPassword2" className="mb-2 bj-delivery-text-3">Plataforma</label>
                      <input type="text" className="form-control bg-gray border-0 mt-2 py-3 " value={obj1.email} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
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
                        {data2.map((order) => (
                          <tr key={order.id} className='b_row'>
                            <td className='mb-4 j-caja-text-2 '>{order.Date}</td>
                            <td className='text-nowrap j-caja-text-2 '>{order.Hour}</td>
                            <td className='j-caja-text-2 '>{order.User}</td>
                            <td className={` mt-3 bj-delivery-text-2 mb-3 b_text_w b_btn1 d-flex align-items-center justify-content-center mt-0 ${order.state == 'Cancelado' ? 'b_redd' : order.state === 'Recibido' ? 'b_bluee' : order.state === 'Preparado' ? 'b_orr' : order.state === 'Entregado' ? 'b_neww' : order.state === 'Finalizado' ? 'b_gree' : order.state === 'Finalized' ? 'b_orr' : 'text-denger'}`}>{order.state}</td>
                            {/* <td className='b_text_w'>
                              <button className='b_edit' onClick={() => handleEditClick(order.id)}><MdEditSquare /></button>
                              <button className='b_edit b_delete' onClick={() => handleDeleteClick(order.id)}><RiDeleteBin5Fill /></button>
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
      </div>
    </div >
  )
}
