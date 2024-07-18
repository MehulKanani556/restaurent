import React from 'react';
import { GoDotFill } from 'react-icons/go';

const KdsCard = ({ table, time, orderId, startTime, waiter, center, items, notes, finishedAt, hrtimestart }) => {
    return (
        <div className="j-kds-body-card-2">
            <div className='' style={{ borderRight: '2px solid transparent ' }}>
                <div className="j-kds-body-card-head p-3 mx-3 j-kds-body-card">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <h4 className='j-kds-body-text-1000 mb-0 text-white'>{table}</h4>
                        <button className='j-kds-button-500'>{time}</button>
                    </div>
                    <div className="d-flex align-items-center justify-content-between mb-2">
                        <button className='j-kds-button-5000'>{orderId}</button>
                        {hrtimestart ? (
                            <h4 className='j-kds-body-text-100 mb-0 text-white'>Hr. estado: {hrtimestart}</h4>
                        ) : (
                            <h4 className='j-kds-body-text-100 mb-0 text-white'>Desde: {startTime}</h4>
                        )}
                    </div>
                    <div className="j-kids-body-card-p">
                        <p className='text-white'>Quién realizo: {waiter}</p>
                        <p className='text-white j-p-bgcolor ps-1'>Centro: {center}</p>
                    </div>
                    <div className="j-kds-border-card">
                        <div className="j-kds-border-bottom">
                            <h6 className='j-kds-border-card-h6 text-white'>Lista</h6>
                            {items.map((item, itemIndex) => (
                                <p key={itemIndex} className='j-kds-border-card-p text-white'>{item}</p>
                            ))}
                        </div>
                        <ul className='text-white p-0 mb-0'>
                            <h6 className='j-kds-border-card-h6'>Notas</h6>
                            {notes.map((note, noteIndex) => (
                                <li key={noteIndex}><GoDotFill /> {note}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="j-kds-border-card-button mt-2">
                        {finishedAt ? (
                            <button className='j-kds-button-secolor w-100'>Terminado a las {finishedAt}</button>
                        ) : (
                            <button className='j-kds-button-bgcolor w-100'>Siguiente estado</button>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default KdsCard;

