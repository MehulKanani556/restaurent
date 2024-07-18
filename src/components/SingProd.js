import React from "react";
import { FaCartPlus } from "react-icons/fa6";
import img1 from "../Image/Image.jpg";
import { IoMdInformationCircle } from "react-icons/io";
import { Link } from "react-router-dom";
export default function SingProd({ image, price, name, code }) {
  return (
    <div>
      <div class="card m_bgblack text-white position-relative">
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
          <div class="btn w-100 btn-primary text-white">
            <Link to="/counter" className="text-white text-decoration-none" style={{ fontSize: '14px' }}>
              <FaCartPlus /> <span className="ms-1">Añadir a mostrador</span>
            </Link>
          </div>
        </div>

        <div className="position-absolute " style={{ cursor: 'pointer' }}>
          <Link to="/articles/singleatricleproduct" className="text-white text-decoration-none" >
            <p className=" px-1  rounded m-2" style={{ backgroundColor: '#374151' }}>
              <IoMdInformationCircle />{" "}
              <span style={{ fontSize: "12px" }}>Ver información</span>
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
