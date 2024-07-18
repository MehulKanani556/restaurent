import React, { useState } from "react";
import { FaCircleCheck, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Sidenav from "./Sidenav";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import img1 from "../Image/cheese-soup.png";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import OrderCart from "./OrderCart";
import { MdOutlineAccessTimeFilled, MdRoomService } from "react-icons/md";
import Header from "./Header";

const BHomeDelivery = () => {
  const [categories, setCategories] = useState([
    "Todo",
    "Bebidas",
    "Snacks",
    "Postres",
    "Almuerzos",
    "Desayunos",
    "Cenas",
    "Gelatinas",
    "Pasteles",
    "Frutas con crema",
  ]);

  const [subcategories, setSubCategories] = useState({
    "Bebidas": ["Soda", "Juice", "Water"],
    "Snacks": ["Chips", "Nuts", "Popcorn"],
    "Postres": ["Soda", "Juice", "Water"],
    "Almuerzos": ["Chips", "Nuts", "Popcorn"],
    "Desayunos": ["Soda", "Juice", "Water"],
    "Cenas": ["Chips", "Nuts", "Popcorn"],
    "Gelatinas": ["Soda", "Juice", "Water"],
    "Pasteles": ["Chips", "Nuts", "Popcorn"],
    "Frutas con crema": ["Soda", "Juice", "Water"],

  });

  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  const renderItems = () => {
    let itemsToRender;
    if (selectedCategory === "Todo") {
      itemsToRender = [...item1, ...item2];
    } else if (selectedCategory === "Bebidas") {
      itemsToRender = item1;
    } else if (selectedCategory === "Snacks") {
      itemsToRender = item2;
    } else if (selectedCategory === "Postres") {
      itemsToRender = item1;
    } else if (selectedCategory === "Almuerzos") {
      itemsToRender = item2;
    } else if (selectedCategory === "Desayunos") {
      itemsToRender = item2;
    } else if (selectedCategory === "Cenas") {
      itemsToRender = item1;
    } else if (selectedCategory === "Gelatinas") {
      itemsToRender = item2;
    } else if (selectedCategory === "Pasteles") {
      itemsToRender = item1;
    } else if (selectedCategory.startsWith("Frutas con crema")) {
      itemsToRender = item2;
    } else {
      itemsToRender = [];
    }

    if (selectedSubCategory) {
      itemsToRender = itemsToRender.filter(item => item.subcategory === selectedSubCategory);
    }

    return itemsToRender.map((e, index) => (
      <div className="col-4 g-3 mb-3" key={index}>
        <OrderCart
          image={e.image}
          name={e.name}
          price={e.price}
          code={e.code}
          addItemToCart={addItemToCart}
        />
      </div>
    ));
  };
  const [cartItems, setCartItems] = useState([]);



  const item1 = [
    {
      image: img1,
      name: "Sopa de queso",
      price: "2.00",
      code: "01234",
      note: 'Nota: Al clima',
      subcategory: "Soda"
    },
    {
      image: img1,
      name: "Sopa de queso",
      price: "2.00",
      code: "01234",
      note: 'Nota: Al clima',
      subcategory: "Juice"
    },
    {
      image: img1,
      name: "Sopa de queso",
      price: "2.00",
      code: "01234",
      note: 'Nota: Al clima',
      subcategory: "Water"
    }
  ];

  const item2 = [
    {
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '+ Agregar nota',
      subcategory: "Chips"
    },
    {
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '+ Agregar nota',
      subcategory: "Chips"
    },
    {
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '+ Agregar nota',
      subcategory: "Nuts"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "Nuts"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "Popcorn"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "Popcorn"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "chip"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "Nuts"
    },
    {
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: 'Con fresas',
      subcategory: "Popcorn"
    },
  ];

  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
  };
  return (
    <div>
      <Header />
      <section className="j-counter">
        <div className="j-sidebar-nav j-bg-color">
          <Sidenav />
        </div>
        <div className="j-counter-menu sidebar">
          <div className="j-counter-header">
            <h2 className="text-white mb-3 sjfs-18">Mostrador</h2>
            <div className="j-menu-bg-color ">
              <div className="j-tracker-mar d-flex justify-content-between ">
                <div className="line1  flex-grow-1">
                  <Link className="text-decoration-none px-2 ">
                    <FaCircleCheck className="mx-1" />
                    <span>Productos</span>
                  </Link>
                </div>
                <div className="  flex-grow-1 text-center">
                  <Link
                    className="text-decoration-none px-2 sj_text_dark"
                  >
                    <FaCircleCheck className="mx-1" />
                    <span>Datos</span>
                  </Link>
                </div>
                <div className="line2  flex-grow-1 text-end">
                  <Link className="text-decoration-none px-2 sj_text_dark">
                    <FaCircleCheck className="mx-1" />
                    <span>Pago</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="j-counter-head">
            <div className="j-search-input">
              <FaSearch className="i" />
              <input
                type="search"
                className="form-control"
                id="email"
                placeholder="Buscar"
              />
            </div>
            <div className="j-show-items">
              <ul className="nav j-nav-scroll">
                {categories.map((category, index) => (
                  <li
                    className={`nav-item ${selectedCategory === category ? "active" : ""}`}
                    key={index}
                    onClick={() => {
                      setSelectedCategory(category);
                      setSelectedSubCategory(null);
                    }}
                  >
                    <a className="nav-link sjfs-12" aria-current="page">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {subcategories[selectedCategory] && (
              <div className="j-show-items">
                <ul className="nav j-nav-scroll">
                  {subcategories[selectedCategory].map((subcategory, index) => (
                    <li
                      className={`nav-item ${selectedSubCategory === subcategory ? "active" : ""}`}
                      key={index}
                      onClick={() => setSelectedSubCategory(subcategory)}
                    >
                      <a className="nav-link sjfs-12" aria-current="page">
                        {subcategory}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          <div className="j-counter-body">
            <div className="j-card-item-1 j-border-bottom">
              <h2 className="text-white sjfs-18">{selectedCategory}</h2>
              <div className="j-counter-card">
                <div className="row">{renderItems()}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="j-counter-price position-sticky" style={{ top: '77px' }}>
          <div className="b-summary-center mb-4 align-items-center text-white d-flex justify-content-between">
            <h2 class="text-white j-kds-body-text-1000 mb-0">Resumen</h2>
            <FaXmark className="b-icon" />
          </div>

          <div className="b-date-time d-flex align-items-center justify-content-end text-white">
            <FaCalendarAlt />
            <p className="mb-0 ms-2 me-3">17/03/2024</p>
            <MdOutlineAccessTimeFilled />
            <p className="mb-0 ms-2">08:00 am</p>
          </div>
          <div className="b-delivery-button">
            <button className="bj-delivery-text-2">Delivery</button>
          </div>

          <div className="j-counter-price-data mt-4">
            <h3 className="text-white j-kds-body-text-1000">Datos</h3>
            <form>
              <div className="mb-3 b-input-registers">
                <label
                  htmlFor="exampleFormControlInput1"
                  className="form-label text-white"
                >Quién lo registra
                </label>
                <input
                  type="email"
                  className="form-control b-form-control"
                  id="exampleFormControlInput1"
                  placeholder="Lucia Lopez"
                />
              </div>
            </form>
            <div className="b-product-order text-center">
              <MdRoomService className="i-product-order" />
              <h6 className="h6-product-order text-white">Empezar pedido</h6>
              <p className="p-product-order">Agregar producto para empezar <br />
                con el pedido</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BHomeDelivery;
