import React, { useState } from 'react';
import Header from './Header';
import Sidenav from './Sidenav';
import { IoIosArrowBack, IoIosArrowForward, IoMdArrowRoundBack } from 'react-icons/io';
import { MdDateRange, MdEditSquare } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaPrint } from 'react-icons/fa';
import img1 from '../Image/Image.jpg'
import { FiClock } from 'react-icons/fi';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

function Home_detail_no() {

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
    const obj1 = {
        name: "Damian Gonzales",
        credCode: "01234",
        id: "01234",
        email: "ejemplo@gmail.com",
        image: img1,
        pName: "Pollo frito crujiente",
        note: "Nota: Sin salsa de tomate",
        pPrice: "5.00",
        pQty: "1",
        totalPrice: "5.00",
        sCode: "0012",
        destination: "-"
    }



    return (
        <div className='b_bg_color'>
            <Header />

            <div className='d-flex'>
                <div>
                    <Sidenav />
                </div>
                <div className='flex-grow-1  sidebar overflow-y-scroll '>
                    <div style={{ backgroundColor: "#1F2A37" }} className='pb-3'>
                        <div className=''>
                            <Link to="/home/client/detail" className='d-flex text-decoration-none '  >
                                <div className='btn btn-outline-primary text-nowrap py-2 d-flex mt-4 ms-3' style={{ borderRadius: "10px", }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
                            </Link>
                        </div>
                        <div className='ms-4 mt-4'>
                            <h5 className='text-white' style={{ fontSize: "18px" }}>Detalles nota de credito</h5>
                        </div>
                        <div className='ms-4 mt-4'>
                            <h5 className='text-white' style={{ fontSize: "18px" }}>DNI: 0123456789</h5>
                        </div>
                    </div>

                    <div style={{ backgroundColor: "#1F2A37" }} className='m-3 pb-3' >
                        <div className='mx-4 py-4 text-white b_fs '>
                            Nota de credito
                        </div>
                        <div className='d-flex justify-content-end mx-4 gap-4 text-white '>
                            <div className='fs-6'> <MdDateRange style={{ height: "20px", width: "20px" }} /> <span>17/03/2024</span></div>
                            <div className='fs-6'> <FiClock style={{ height: "20px", width: "20px" }} /> <span>08:AM</span></div>
                        </div>
                        <div className='mx-4 text-white'>
                            <h5 className='b_fs mb-4'>Datos</h5>
                            <div><button className='b_idbtn  b_orange_b mb-2' style={{ borderRadius: "10px", fontWeight: "600" }}>Devolucion pendiente</button></div>
                        </div>

                        <div>


                            <form action="">
                                <div className=' mx-4 mt-4 b_inputt b_home_field'>
                                    <div className='w-100 b_search text-white mb-3'>
                                        <label htmlFor="inputPassword2 " className="">Nombre</label>
                                        <input type="text" className="form-control bg-gray border-0 mt-2 py-3" value={obj1.name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                    </div>
                                    <div className='w-100 b_search text-white mb-3'>
                                        <label htmlFor="inputPassword2" className="">Código nota de credito</label>
                                        <input type="text" className="form-control bg-gray  border-0 mt-2 py-3" value={obj1.credCode} id="inputPassword2" placeholder="0123456789" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                    </div>
                                </div>
                                <div className='d-flex gap-5 mx-4 m b_inputt b_id_input b_home_field'>
                                    <div className='w-100 b_search  text-white mb-3'>
                                        <label htmlFor="inputPassword2" className="">DNI</label>
                                        <input type="text" className="form-control bg-gray  border-0 mt-2 py-3 " value={obj1.id} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                    </div>
                                    <div className='w-100 b_search text-white mb-3'>
                                        <label htmlFor="inputPassword2" className="">Correo electrónico</label>
                                        <input type="text" className="form-control bg-gray  border-0 mt-2 py-3 " value={obj1.email} id="inputPassword2" placeholder="ejemplo@gmail.com" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                    </div>
                                </div>
                            </form>
                            <div className='ms-4'>
                                <h6 className='text-white my-4 '>Productos</h6>

                            </div>
                            <div className='ms-4 d-flex text-white b_borderrr pb-3 '>
                                <div>
                                    <img src={obj1.image} alt="" height={50} className='rounded-3' />
                                </div>
                                <div className='d-flex justify-content-between align-items-center w-100'>
                                    <div className='ms-3'>
                                        <div className='b_fs'>{obj1.pName}</div>
                                        <div className='b_fs1' style={{ color: "#16BDCA" }}>{obj1.note}</div>
                                    </div>
                                    <div className='me-5 '>
                                        <div className=''>
                                            <span className='me-5'>${obj1.pPrice}</span>
                                            <span>{obj1.pQty}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='my-4 mx-4 py-3 p-2 ' style={{ backgroundColor: "#374151", borderRadius: "10px" }}>
                                <div className='text-white'>
                                    <div className=' ms-4 my-3 '>
                                        <div className='my-3  fw-bold' style={{ fontSize: "20px" }}>Costo total</div>
                                        <div className='d-flex justify-content-between'>
                                            <div>Productos</div>
                                            <div className='me-5'>${obj1.pPrice}</div>
                                        </div>
                                        <hr className='w-100' />
                                        <div className='d-flex justify-content-between'>
                                            <div>Total</div>
                                            <div className='me-5 fw-bold'>${obj1.pPrice}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='text-white ms-4'>
                                <h5 className='b_fs'>Pedido</h5>
                            </div>
                            <div className=' mx-4 mt-4 b_inputt b_home_field'>
                                <div className='w-100 b_search text-white mb-3'>
                                    <label htmlFor="inputPassword2" className="">Código origen</label>
                                    <input type="text" className="form-control bg-gray mt-2 border-0 py-3" value={obj1.sCode} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                </div>
                                <div className='w-100 b_search text-white mb-3'>
                                    <label htmlFor="inputPassword2" className="">Destino</label>
                                    <input type="text" className="form-control bg-gray border-0 py-3 mt-2 " value={obj1.destination} id="inputPassword2" placeholder="0123456789" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                </div>
                            </div>
                            <div className='mx-5'>

                                <div className=' mx-auto mb-4 mt-5' >
                                    <button className='btn btn-primary w-100 ' style={{ backgroundColor: "#147BDE", borderRadius: "10px" }}>Aplicar nuevo pedido</button>
                                </div>
                            </div>
                        </div>

                    </div>


                </div>
            </div>
        </div>
    )
}

export default Home_detail_no;