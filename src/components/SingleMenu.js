import React from 'react'
import { FaCartPlus } from 'react-icons/fa'
import { IoMdClose, IoMdInformationCircle } from 'react-icons/io'
import { Link } from 'react-router-dom'

export default function SingleMenu({ image, price, name, code, showRetirar,onRetirar }) {
  return (
    <div>
      <div class="card  text-white position-relative" style={{ backgroundColor: '#1F2A37' }}>
        <img
          src={image}
          class="card-img-top object-fit-cover rounded"
          alt="..."
          style={{ height: "200px" }}
        />
        <div class="card-body">
          <h6 class="card-title">{name}</h6>
          <h6 class="card-title">{price}</h6>
          <p class="card-text opacity-50">Codigo: {code}</p>

        </div>

        {/* <div className="position-absolute end-0"  style={{cursor:'pointer'}}>
          <Link to="/digitalmenu/singleatricleproduct" className="text-white text-decoration-none" >
            <p className="bg-danger px-1 m12  rounded m-2">
              <IoMdClose  />{" "}
              <span style={{ fontSize: "14px" }}>Retirar</span>
            </p>
          </Link>
        </div> */}
        {showRetirar && (
          <div className="position-absolute end-0" style={{ cursor: 'pointer' }}>
            <div
              className="bg-danger px-1 m12 rounded m-2 text-white"
              onClick={onRetirar}
            >
              <IoMdClose />{" "}
              <span style={{ fontSize: "14px" }}>Retirar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
