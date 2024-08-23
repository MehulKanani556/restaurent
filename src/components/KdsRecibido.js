import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav';
import Header from './Header';
import { HiExternalLink } from 'react-icons/hi';
import KdsCard from './KdsCard';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import axios from 'axios';


const orders = [
    {
        type: 'Recibido',
        sections: [
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote']
            }
        ]
    },
    {
        sections: [
            {
                title: 'Delivery',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima']
            }
        ]
    },
    {

        sections: [
            {
                title: 'Delivery',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote']
            },
            {
                title: 'Delivery',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima'],
            }
        ]
    },
    {
        sections: [
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima'],
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima'],
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                hrtimestart: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote'],
            }
        ]
    }
];


const KdsRecibido = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const [allOrder, setAllOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [centerProduction, setCenterProduction] = useState([]);
    const [categories, setCategories] = useState([
        'Todo',
        'Cocina',
        'Barra',
        'Postres'
    ]);



    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order/getAll?received=yes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const ordersObject = response.data; // The object you provided
            const ordersArray = Object.values(ordersObject); // Convert object to array

            setAllOrder(ordersArray); // Set the state with the array of orders
            console.log("recibido:", ordersArray); // Log the array
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }
    useEffect(() => {
        fetchOrder();
    }, [])
    const fetchUser = async () => {
        try {
            const response = await axios.get(`${apiUrl}/get-users`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    const fetchCenter = async () => {
        try {
            const response = await axios.get(`${apiUrl}/production-centers`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setCenterProduction(response.data.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
    useEffect(() => {
        fetchUser();
        fetchCenter();
    }, []);
    return (
        <>
            <Header />
            <div className="d-flex">
                <Sidenav />
                <div className="flex-grow-1 sidebar">
                    <div className="j-kds-head">
                        <h5 className='text-white j-counter-text-1'>KDS</h5>
                        <div className="j-show-items">
                            <ul className="nav">
                                {categories.map((category, index) => (
                                    <li
                                        className={`nav-item j-nav-item-size ${selectedCategory === category ? "active" : ""}`}
                                        key={index}
                                        onClick={() => setSelectedCategory(category)}
                                    >
                                        <a className="nav-link" aria-current="page">
                                            {category}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="j-kds-body">
                        <Link to={"/kds"} className='text-decoration-none'>
                            <div className={`j-kds-body-btn-1 j-kds-body-btn mx-3`}>
                                <button className='d-flex align-items-center j-kds-body-text-1'>
                                    Recibido <FaXmark className='ms-2 j-kds-body-text-1' />
                                </button>
                            </div>
                        </Link>
                        <div className="row">
                            {allOrder.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="col-3 px-0">

                                 
                                        <KdsCard
                                             key={sectionIndex}
                                             table={section.table_id}
                                             time={section.created_at}
                                             orderId={section.id}
                                             startTime={section.created_at}
                                             waiter={section.user_id}
                                             center={section.discount}
                                             items={section.order_details}
                                             notes={section.reason}
                                             finishedAt={section.finished_at}
                                             user={user}
                                             centerProduction={centerProduction}
                                             fetchOrder={fetchOrder}
                                             status={section.status}
                                        />
                                   
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default KdsRecibido;
