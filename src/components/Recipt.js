import React from 'react';

const Recipt = () => {
    const receiptData = {
        storeName: "CAFE CHOCO CHIP",
        storeInfo: {
            phone: "0998809875001",
            branch: "Guayaquil",
            phone2: "9999999"
        },
        invoice: {
            number: "FAC #:152-045-000000001",
            environment: "Produccion",
            emission: "Normal",
            authorization: `166202202109988098750012152045000000001000000815`,
            type: "REIMPRESION"
        },
        cashier: "admin",
        date: "16/6/2022",
        time: "13:15:33",
        customer: {
            name: "JOSE PEREZ",
            email: "prueba@gmail.com",
            phone: "0999555666",
            address: "EDIFICIO SUR",
            id: "0910345461"
        },
        items: [
            { description: "Coca Cola Zero 5", quantity: 2, unitPrice: 1.33, total: 2.66 },
            { description: "Jugo de Naranja 1", quantity: 1, unitPrice: 1.33, total: 1.33 }
        ],
        totals: {
            subtotalIva: 3.99,
            subtotal0: 0.00,
            discount: 0.00,
            iva: 0.48,
            total: 4.47,
            received: 4.47,
            change: 0.00
        },
        footer: "Consulte sus documentos electronicos ingresando a bandejaonline.contifico.com si es la primera vez que accede, por favor registrese con su identificacion y correo electronico."
    };

    return (

        <div className='j-counter-recipt'>
            <div style={{ fontFamily: 'monospace', width: '380px', margin: '0 auto', backgroundColor: "white", color: "black", fontWeight: "bold" }}>
                <h2 style={{ fontSize: "16px", textAlign: 'center', marginTop: "10px" }}>{receiptData.storeName}</h2>
                <p style={{ fontSize: "12px", textAlign: 'center' }}>
                    {receiptData.storeInfo.phone}<br />
                    Sucursal: {receiptData.storeInfo.branch}<br />
                    Telefono: {receiptData.storeInfo.phone2}
                </p>

                <p style={{ fontSize: "12px", textAlign: 'center', }}>
                    {receiptData.invoice.number}<br />
                    Ambiente: {receiptData.invoice.environment}<br />
                    Emision: {receiptData.invoice.emission}<br />
                    No. de autorizacion/Clave de acceso<br />
                    <p className='mb-0' style={{ textWrap: 'wrap' }}> {receiptData.invoice.authorization}<br /></p>
                    {receiptData.invoice.type}
                </p>
                <p className='mx-1 mb-0' style={{ fontSize: "12px", textAlign: 'left' }}>
                    Cajero: {receiptData.cashier}<br />
                    <div className='d-flex justify-content-between'>
                        <div>Fecha: {receiptData.date}</div>
                        <div>Hora: {receiptData.time}<br /></div>
                    </div>
                    Cliente: {receiptData.customer.name}<br />
                    Email: {receiptData.customer.email}<br />
                    Telefono: {receiptData.customer.phone}<br />
                    Direccion: {receiptData.customer.address}<br />
                    Cedula/RUC: {receiptData.customer.id}
                </p>
                <div style={{ borderBottom: "1px dashed #000", marginTop: '1px' }} ></div>
                <div className='mb-2' style={{ borderBottom: "1px dashed #000", marginTop: '1px' }} ></div>

                <table className='mx-1' style={{ fontSize: "12px", width: '100%' }}>
                    <thead style={{ borderBottom: "1px dashed #000" }}>
                        <tr>
                            <th>DESCRIP</th>
                            <th>CANT</th>
                            <th>P_UNIT</th>
                            <th>P_TOTAL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {receiptData.items.map((item, index) => (
                            <tr key={index}>
                                <td className='p-0'>{item.description}</td>
                                <td className='p-0'>{item.quantity}</td>
                                <td className='p-0'>{item.unitPrice.toFixed(2)}</td>
                                <td className='p-0'>{item.total.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <hr className='my-1' />
                {/* <div style={{borderBottom:"1px dashed #000"}} ></div> */}
                <p style={{ fontSize: "12px", textAlign: 'center' }}>
                    <div className="d-flex justify-content-between mx-1">
                        <div>
                            Subtotal IVA:
                        </div>
                        <div>
                            {receiptData.totals.subtotalIva.toFixed(2)}<br />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mx-1">
                        <div>
                            Subtotal 0%:
                        </div>
                        <div>
                            {receiptData.totals.subtotal0.toFixed(2)}<br />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mx-1">
                        <div>
                            Dcto:
                        </div>
                        <div>
                            {receiptData.totals.discount.toFixed(2)}<br />
                        </div>
                    </div>
                    <div className="d-flex justify-content-between mx-1">
                        <div>
                            IVA 12.00%:
                        </div>
                        <div>
                            {receiptData.totals.iva.toFixed(2)}<br />
                        </div>
                    </div>
                    <div style={{ borderBottom: "1px dashed #000", marginTop: '1px' }} ></div>
                    <div className="d-flex justify-content-between mx-1 py-1">
                        <div>
                            <strong>Total:</strong>
                        </div>
                        <div>
                            <strong>{receiptData.totals.total.toFixed(2)}</strong><br />
                        </div>
                    </div>
                    <div className='mb-2' style={{ borderBottom: "1px dashed #000", marginTop: '1px' }} ></div>
                </p>
                <p className='mb-0 mx-1' style={{ fontSize: "12px", textAlign: 'left' }}>
                    Forma de pago:<br /> Efectivo: {receiptData.totals.received.toFixed(2)}<br />
                    <div className='mt-2 d-flex'>
                        <div className='me-3'>
                            Recibido: {receiptData.totals.received.toFixed(2)}
                        </div>
                        <div>
                            Cambio: {receiptData.totals.change.toFixed(2)}
                        </div>
                    </div>
                </p>
                <div style={{ borderBottom: "1px dashed #000", marginTop: '5px' }} ></div>
                <p style={{ fontSize: "12px", textAlign: 'center', fontWeight: "600" }}>{receiptData.footer}</p>
            </div >
        </div >

    );
};

export default Recipt;

