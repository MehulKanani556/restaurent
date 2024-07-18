import React, { useState } from 'react';
import Sidenav from './Sidenav';
import KdsCard from './KdsCard';
import { HiExternalLink } from 'react-icons/hi';
import Header from './Header';
import { Link } from 'react-router-dom';

const orders = [
    const hello;
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
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima']
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote']
            }
        ]
    },
    {
        type: 'Preparado',
        sections: [
            {
                title: 'Delivery',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
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
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima']
            }
        ]
    },
    {
        type: 'Finalizado',
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
                fromTime: '10:00 AM',
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
                notes: ['Sin salsa de tote', 'Al clima'],
            }
        ]
    },
    {
        type: 'Entregado',
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
                finishedAt: '11:00 am'
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo', 'Cola Fanta', 'Pastel'],
                notes: ['Sin salsa de tote', 'Al clima'],
                finishedAt: '11:00 am'
            },
            {
                title: 'Mesa 2',
                time: '15:20',
                orderNumber: '01234',
                fromTime: '10:00 AM',
                who: 'Damian Lopez',
                center: 'Cocina',
                list: ['Almuerzo'],
                notes: ['Sin salsa de tote'],
                finishedAt: '11:00 am'
            }
        ]
    }
];
jbghfbhdbfhdbfhdbhfbd

const Kds = () => {
    const [categories, setCategories] = useState([
        'Todo',
        'Cocina',
        'Barra',
        'Postres'
    ]);

    const [selectedCategory, setSelectedCategory] = useState(categories[0]);

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
                        <div className="row">
                            {orders.map((order, orderIndex) => (
                                <div key={orderIndex} className="col-3 px-0">
                                    <div className='j-kds-border-right w-100'>
                                        <Link to={`/kds/${order.type}`} className='text-decoration-none'>
                                            <div className={`j-kds-body-btn-${orderIndex + 1} j-kds-body-btn mx-3`}>
                                                <button className='d-flex align-items-center j-kds-body-text-1'>
                                                    {order.type} <HiExternalLink className='ms-2 j-kds-body-text-1' />
                                                </button>
                                            </div>
                                        </Link>
                                    </div>
                                    {order.sections.map((section, sectionIndex) => (
                                        <KdsCard
                                            key={sectionIndex}
                                            table={section.title}
                                            time={section.time}
                                            orderId={section.orderNumber}
                                            startTime={section.fromTime}
                                            waiter={section.who}
                                            center={section.center}
                                            items={section.list}
                                            notes={section.notes}
                                            finishedAt={section.finishedAt}
                                        />
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kds;
