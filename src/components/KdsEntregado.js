import React, { useEffect, useState } from 'react'
import Sidenav from './Sidenav';
import Header from './Header';
import { HiExternalLink } from 'react-icons/hi';
import KdsCard from './KdsCard';
import { FaXmark } from 'react-icons/fa6';
import { Link } from 'react-router-dom';
import axios from 'axios';





const KdsEntregado = () => {
    const apiUrl = process.env.REACT_APP_API_URL;
    const token = sessionStorage.getItem('token');
    const [allOrder, setAllOrder] = useState([]);
    const [user, setUser] = useState([]);
    const [centerProduction, setCenterProduction] = useState([]);
    const [allItems, setAllItems] = useState([]);
    const [categories, setCategories] = useState([
        'Todo',
        'Cocina',
        'Barra',
        'Postres'
    ]);

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);
    useEffect(() => {
        fetchOrder();
        fetchUser();
        fetchCenter();
        fetchAllItems();
    }, []);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`${apiUrl}/order/getAll?delivered=yes`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const ordersObject = response.data; // The object you provided
            const ordersArray = Object.values(ordersObject); // Convert object to array

            setAllOrder(ordersArray); // Set the state with the array of orders

        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }
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
    const fetchAllItems = async () => {
        try {
            const response = await axios.get(`${apiUrl}/item/getAll`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setAllItems(response.data.items);
            console.log("Fetched items as array:", response.data.items); // Log the array
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    }
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
                            <div className={`j-kds-body-btn-4 j-kds-body-btn mx-3`}>
                                <button className='d-flex align-items-center j-kds-body-text-1'>
                                    Entregado <FaXmark className='ms-2 j-kds-body-text-1' />
                                </button>
                            </div>
                        </Link>
                        <div className="row">
                        {allOrder.map((section, sectionIndex) => {
                                const items = section.order_details.map(order => {
                                    const item = allItems.find(item => item.id === order.item_id);
                                    if (item) {
                                        const matchingCenter = centerProduction.find(center => center.id === item.production_center_id);
                                        return matchingCenter ? matchingCenter.name : null;
                                    }
                                    return null;
                                }).filter(item => item !== null);

                                return (
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
                                        productionCenter={items}
                                    />
                                </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default KdsEntregado;
