import React, { useEffect, useRef, useState } from "react";
import Sidenav from "./Sidenav";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import img1 from "../Image/cheese-soup.png";
import img2 from "../Image/crispy-fry-chicken.png";
import img3 from "../Image/Strawberry-gelatin.png";
import { RiDeleteBin6Fill } from "react-icons/ri";
import OrderCart from "./OrderCart";
import { Link } from "react-router-dom";
import { FaCircleCheck } from "react-icons/fa6";
import Header from "./Header";

const Counter = () => {

  const [itemToDelete, setItemToDelete] = useState(null);
  const [showAllItems, setShowAllItems] = useState(false);
  const toggleShowAllItems = () => {
    setShowAllItems(!showAllItems);
  };

  const [showEditFamDel, setShowEditFamDel] = useState(false);
  const handleCloseEditFamDel = () => setShowEditFamDel(false);
  const handleShowEditFamDel = () => setShowEditFamDel(true);

  const [showEditFam, setShowEditFam] = useState(false);
  const handleCloseEditFam = () => setShowEditFam(false);
  const handleShowEditFam = () => setShowEditFam(true);

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
  const [countsoup, setCountsoup] = useState([]);
  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    // Load cart items from localStorage
    const storedCartItems = localStorage.getItem("cartItems");
    const storedCountsoup = localStorage.getItem("countsoup");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
    if (storedCountsoup) {
      setCountsoup(JSON.parse(storedCountsoup));
    }
  }, []); // Empty dependency array to run once on component mount

  useEffect(() => {
    // Save cart items to localStorage whenever cartItems or countsoup change
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("countsoup", JSON.stringify(countsoup));
  }, [cartItems, countsoup]);

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


  const item1 = [
    {
      id: 1,
      image: img1,
      name: "Sopa de queso",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Soda"
    },
    {
      id: 2,
      image: img1,
      name: "Sopa de queso",
      price: "2.00",
      note: '',
      code: "01234",
      subcategory: "Juice"
    },
    {
      id: 3,
      image: img1,
      name: "Sopa de queso",
      note: '',
      price: "2.00",
      code: "01234",
      subcategory: "Water"
    }
  ];

  const item2 = [
    {
      id: 4,
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Chips"
    },
    {
      id: 5,
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Chips"
    },
    {
      id: 6,
      image: img2,
      name: "Pollo frito crujiente",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Nuts"
    },
    {
      id: 7,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Nuts"
    },
    {
      id: 8,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Popcorn"
    },
    {
      id: 9,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Popcorn"
    },
    {
      id: 10,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "chip"
    },
    {
      id: 11,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Nuts"
    },
    {
      id: 12,
      image: img3,
      name: "Gelatina fresa",
      price: "2.00",
      code: "01234",
      note: '',
      subcategory: "Popcorn"
    },
  ];

  const [isEditing, setIsEditing] = useState(Array(cartItems.length).fill(false));

  const handleNoteChange = (index, note) => {
    const updatedCartItems = [...cartItems];
    updatedCartItems[index].note = note;
    setCartItems(updatedCartItems);
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Enter') {
      const updatedIsEditing = [...isEditing];
      updatedIsEditing[index] = false;
      setIsEditing(updatedIsEditing);
    }
  };

  const handleAddNoteClick = (index) => {
    const updatedIsEditing = [...isEditing];
    updatedIsEditing[index] = true;
    setIsEditing(updatedIsEditing);
    const updatedCartItems = [...cartItems];
    if (!updatedCartItems[index].note) {
      updatedCartItems[index].note = 'Nota: ';
      setCartItems(updatedCartItems);
    }
  };


  const addItemToCart = (item) => {
    setCartItems([...cartItems, item]);
    setCountsoup([...countsoup, 1]);

    if (cartItems.length === 4 && !showAllItems) {
      setShowAllItems(true);
    }
  };

  const handleDeleteConfirmation = (id) => {
    removeItemFromCart(id);
    handleCloseEditFam();
    handleShowEditFamDel();

    setTimeout(() => {
      setShowEditFamDel(false);
    }, 2000);
  };

  // const removeItemFromCart = (id) => {
  //   const itemIndex = cartItems.findIndex((item) => item.id === id);
  //   if (itemIndex !== -1) {
  //     const newCartItems = [...cartItems];
  //     const newCountsoup = [...countsoup];

  //     if (newCountsoup[itemIndex] > 1) {
  //       newCountsoup[itemIndex] -= 1;
  //     } else {
  //       newCartItems.splice(itemIndex, 1);
  //       newCountsoup.splice(itemIndex, 1);
  //     }

  //     setCartItems(newCartItems);
  //     setCountsoup(newCountsoup);

  //     if (newCartItems.length === 5 && showAllItems) {
  //       setShowAllItems(false);
  //     }
  //   }
  // };

  const removeItemFromCart = (id) => {
    const itemIndex = cartItems.findIndex((item) => item.id === id);
    if (itemIndex !== -1) {
      const newCartItems = [...cartItems];
      const newCountsoup = [...countsoup];

      newCartItems.splice(itemIndex, 1);
      newCountsoup.splice(itemIndex, 1);

      setCartItems(newCartItems);
      setCountsoup(newCountsoup);

      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(newCartItems));
      localStorage.setItem("countsoup", JSON.stringify(newCountsoup));

      if (newCartItems.length === 5 && showAllItems) {
        setShowAllItems(false);
      }
    }
  };


  const increment = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map((count, i) => (i === index ? count + 1 : count))
    );
  };

  const decrement = (index) => {
    setCountsoup((prevCounts) =>
      prevCounts.map((count, i) =>
        i === index ? (count > 1 ? count - 1 : 1) : count
      )
    );
  };

  const getTotalCost = () => {
    return cartItems.reduce((total, item, index) => total + parseInt(item.price) * countsoup[index], 0);
  };

  const totalCost = getTotalCost();
  const discount = 1.0;
  const finalTotal = totalCost - discount;

  // category drag

  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll-fast
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (scrollContainer) {
      const handleWheel = (e) => {
        if (e.deltaY !== 0) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY;
        }
      };
      scrollContainer.addEventListener("wheel", handleWheel, { passive: false });
      return () => {
        scrollContainer.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);

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
                  <Link className="text-decoration-none px-2 j-counter-path-color">
                    <FaCircleCheck className="mx-1" />
                    <span className="">Artículos</span>
                  </Link>
                </div>
                <div className="  flex-grow-1 text-center">
                  <Link
                    to={"/counter/mostrador"}
                    className="text-decoration-none px-2 sj_text_dark"
                  >
                    <FaCircleCheck className="mx-1" />
                    <span className="">Datos</span>
                  </Link>
                </div>
                <div className="line2  flex-grow-1 text-end">
                  <Link className="text-decoration-none px-2 sj_text_dark">
                    <FaCircleCheck className="mx-1" />
                    <span className="">Pago</span>
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
                placeholder="Buscar"
              />
            </div>
            <div className="j-show-items">
              <ul className="nav j-nav-scroll"
                ref={scrollRef}
                style={{
                  overflowX: "auto",
                  whiteSpace: "nowrap",
                  msOverflowStyle: "none",  // IE and Edge
                  scrollbarWidth: "none",  // Firefox
                  overflowX: "scroll",
                  whiteSpace: "nowrap",
                  scrollbarWidth: "none",
                  height: "55px",
                  flexWrap: "nowrap",
                }}
              >
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
          <div className="position-fixed">
            <h2 className="text-white j-kds-body-text-1000">Resumen</h2>
            <div className="j-counter-price-data">
              <h3 className="text-white j-kds-body-text-1000">Datos</h3>
              <div className="j-orders-inputs">
                <div className="j-orders-code">
                  <label className="j-label-name text-white mb-2 j-tbl-font-6 ">
                    Código pedido
                  </label>
                  <input className="j-input-name" type="text" placeholder="01234" />
                </div>
                <div className="j-orders-type me-2">
                  <label className="j-label-name  text-white mb-2 j-tbl-font-6 ">
                    Tipo pedido
                  </label>
                  <select className="form-select j-input-name-2">
                    <option value="0">Seleccionar</option>
                    <option value="1">Sin seleccionar</option>
                    <option value="2">Delivery</option>
                    <option value="3">Local</option>
                    <option value="3">Retirar</option>
                  </select>
                </div>
              </div>
              <div className="j-counter-order">
                <h3 className="text-white j-tbl-font-5">Pedido </h3>
                <div className="j-counter-order-data">
                  {cartItems.slice(0, showAllItems ? cartItems.length : 3).map((item, index) => (
                    <div className="j-counter-order-border-fast" key={index}>
                      <div className="j-counter-order-img">
                        <div className="d-flex align-items-center justify-content-between">
                          <img src={item.image} alt="" />
                          <h5 className="text-white j-tbl-font-5">{item.name}</h5>
                        </div>
                        <div className="d-flex align-items-center">
                          <div className="j-counter-mix">
                            <button className="j-minus-count" onClick={() => decrement(index)}>
                              <FaMinus />
                            </button>
                            <h3> {countsoup[index]}</h3>
                            <button className="j-plus-count" onClick={() => increment(index)}>
                              <FaPlus />
                            </button>
                          </div>
                          <h4 className="text-white fw-semibold">
                            ${parseInt(item.price) * countsoup[index]}
                          </h4>
                          <button className="j-delete-btn me-2" onClick={() => {
                            setItemToDelete(item.id);
                            handleShowEditFam();
                          }}>
                            <RiDeleteBin6Fill />
                          </button>
                        </div>
                      </div>
                      <div key={index} className="text-white j-order-count-why">
                        {isEditing[index] ? (
                          <div>
                            <span className="j-nota-blue">Nota: </span>
                            <input
                              className="j-note-input"
                              type="text"
                              value={item.note ? item.note.substring(6) : ''}
                              onChange={(e) => handleNoteChange(index, `Nota: ${e.target.value}`)}
                              onKeyDown={(e) => handleKeyDown(index, e)}
                            />
                          </div>
                        ) : (
                          <div>
                            {item.note ? (
                              <p className="j-nota-blue">{item.note}</p>
                            ) : (
                              <button className="j-note-final-button" onClick={() => handleAddNoteClick(index)}>
                                + Agregar nota
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  {cartItems.length > 3 && (
                    <Link onClick={toggleShowAllItems} className="sjfs-14">
                      {showAllItems ? 'Ver menos' : 'Ver más'}
                    </Link>
                  )}
                </div>
                <div className="j-counter-total">
                  <h5 className="text-white j-tbl-text-15">Costo total</h5>
                  <div className="j-total-discount d-flex justify-content-between">
                    <p className="j-counter-text-2">Artículos</p>
                    <span className="text-white">${totalCost.toFixed(2)}</span>
                  </div>
                  <div className="j-border-bottom-counter">
                    <div className="j-total-discount d-flex justify-content-between">
                      <p className="j-counter-text-2">Descuentos</p>
                      <span className="text-white">${discount.toFixed(2)}</span>
                    </div>

                  </div>
                  <div className="j-total-discount my-2 d-flex justify-content-between">
                    <p className="text-white bj-delivery-text-153 ">Total</p>
                    <span className="text-white bj-delivery-text-153 ">
                      ${finalTotal.toFixed(2)}
                    </span>
                  </div>
                  <Link to={"/counter/mostrador"} class="btn w-100 j-btn-primary text-white m-articles-text-2">Continuar</Link>
                </div>


                <Modal
                  show={showEditFam}
                  onHide={handleCloseEditFam}
                  backdrop={true}
                  keyboard={false}
                  className="m_modal jay-modal"
                >
                  <Modal.Header closeButton className="border-0">
                  </Modal.Header>
                  <Modal.Body className="border-0">
                    <div className="text-center">
                      <img
                        className="j-trash-img-late"
                        src={require("../Image/trash-outline-secondary.png")}
                        alt=""
                      />
                      <p className="mb-0 mt-2 j-kds-border-card-p">Seguro deseas eliminar este pedido</p>
                    </div>
                  </Modal.Body>
                  <Modal.Footer className="border-0 justify-content-center">
                    <Button
                      className="j-tbl-btn-font-1 "
                      variant="danger"
                      onClick={() => handleDeleteConfirmation(itemToDelete)}
                    >
                      Si, seguro
                    </Button>
                    <Button
                      className="j-tbl-btn-font-1 "
                      variant="secondary"
                      onClick={() => {
                        handleCloseEditFam();
                      }}
                    >
                      No, cancelar
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={showEditFamDel}
                  onHide={handleCloseEditFamDel}
                  backdrop={true}
                  keyboard={false}
                  className="m_modal jay-modal"
                >
                  <Modal.Header closeButton className="border-0"></Modal.Header>
                  <Modal.Body>
                    <div className="j-modal-trash text-center">
                      <img
                        src={require("../Image/trash-outline.png")}
                        alt=""
                      />
                      <p className="mb-0 mt-3 h6 j-tbl-pop-1">Pedido eliminado</p>
                      <p className="opacity-75 j-tbl-pop-2">
                        El Pedido ha sido eliminado correctamente
                      </p>
                    </div>
                  </Modal.Body>
                </Modal>

              </div>
            </div>
          </div>
        </div>
      </section >
    </div >
  );
};

export default Counter;