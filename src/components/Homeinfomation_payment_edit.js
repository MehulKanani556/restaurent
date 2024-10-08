import React, { useEffect, useRef, useState } from 'react'
import Header from './Header'
import Sidenav from './Sidenav'
import { Badge, Button, Modal } from 'react-bootstrap'
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import { MdOutlineAccessTimeFilled } from "react-icons/md";
import pic1 from "../img/Image.png"
import pic2 from "../img/Image(1).jpg"
import pic3 from "../img/Image (2).png"
import { Tabs, Tab } from 'react-bootstrap';
import { IoMdCloseCircle, IoMdInformationCircle } from 'react-icons/io';
import img2 from "../Image/addmenu.jpg";
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa6';
import { BsCalculatorFill } from 'react-icons/bs';
import { RiDeleteBinLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Homeinfomation_payment_edit = ({ item }) => {
    // create family

    const API_URL = "https://shreekrishnaastrology.com/api"; // Laravel API URL
    const API = "https://shreekrishnaastrology.com/public";

    const [token, setToken] = useState(
        "2647|bkAORMNJS6ite9xHPiGmApoi78Dfz9tV8Bzbyb6a1ca62063"
    );

    const { id } = useParams();
    const { state, replace } = useLocation();
    const navigate = useNavigate();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [show20, setShow20] = useState(false);
    const handleClose20 = () => setShow20(false);
    const handleShow20 = () => {
        setShow20(true)
        setTimeout(() => {
            setShow20(false)
            navigate(`/home/usa/information/${id}`, { replace: true });
        }, 2000);
    };
    console.log(state);



    // =============new==========
    const [obj1, setObj1] = useState([]);
    const [orderData, setOrderData] = useState(null);
    const [items, setItems] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [sector, setSector] = useState(null);
    const [table, setTable] = useState(null);
    const [orderStatus, setOrderStatus] = useState('');
    const [user, setUser] = useState(null);
    const [roles, setRoles] = useState([]);
    const [userRole, setUserRole] = useState('');

    const [visibleInputId, setVisibleInputId] = useState(null);
    const [noteValues, setNoteValues] = useState('');

    const [parentCheck, setParentCheck] = useState([]);
    const [childCheck, setChildCheck] = useState([]);
    // const [childCheck, setChildCheck ] = useState([]);
    const [searchTermMenu, setSearchTermMenu] = useState(""); // State to hold search term
    const [selectedItemsCount, setSelectedItemsCount] = useState(0);
    const [filteredItemsMenu, setFilteredItemsMenu] = useState(obj1);
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [deleteProductId, setDeleteProductId] = useState(null);

    const [showEditFamfinal, setShowEditFamfinal] = useState(false);
    const handleCloseEditFamfinal = () => setShowEditFamfinal(false);
    const handleShowEditFamfinal = () => {
        setShowEditFamfinal(true);
        setTimeout(() => {
            setShowEditFamfinal(false);
        }, 2000);
    };

    // Add producttion
    const [show1Prod, setShow1Prod] = useState(false);
    const handleClose1Prod = () => setShow1Prod(false);
    const handleShow1Prod = () => {
        setShow1Prod(true);
        setSelectedItemsMenu([]);
        setSelectedItemsCount(0);
    }
    const [selectedItemsMenu, setSelectedItemsMenu] = useState([]);

    // Add product success
    const [show1AddSuc, setShow1AddSuc] = useState(false);
    const handleClose1AddSuc = () => setShow1AddSuc(false);

    const handleShow1AddSuc = () => {
        setShow1AddSuc(true)
        setTimeout(() => {
            setShow1AddSuc(false)
        }, 2000);
    };

    useEffect(() => {
        getOrder();
        getItems();
        getSector();
        getOrderStatus();
        getRole();
        getFamily();
        getSubFamily();
        setActiveTab(state ? state : "home")
    }, [noteValues, show1Prod, deleteProductId]);

    useEffect(() => {
        if (orderData && items.length > 0) {
            handleOrderDetails();
        }
        if (orderData?.user_id) {
            console.log(orderData?.user_id);
            getUser();
        }
    }, [orderData, items, show1Prod, deleteProductId]);

    useEffect(() => {
        if (user && roles.length > 0) {
            getuserRole();
        }
    }, [user, roles]);

    const getOrder = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/getSingle/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrderData(response.data);
        } catch (error) {
            console.error(
                "Error fetching OrderData:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const getItems = async () => {
        try {
            const response = await axios.get(`${API_URL}/item/getAll`);
            setItems(response.data.items);
            setObj1(response.data.items);
            setFilteredItemsMenu(response.data.items);
        } catch (error) {
            console.error(
                "Error fetching Items:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const getSector = async () => {
        try {
            const response = await axios.post(`${API_URL}/sector/getWithTable`);
            let sectors = response.data.data;

            const sectorWithTable = sectors.find(v =>
                v.tables.some(a => a.order_id == id)
            );

            if (sectorWithTable) {
                setSector(sectorWithTable);
                setTable(sectorWithTable.tables.find(a => a.order_id == id));
            }
        } catch (error) {
            console.error(
                "Error fetching sector and Table Data:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const getOrderStatus = async () => {
        try {
            const response = await axios.get(`${API_URL}/order/getLog/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setOrderStatus(response.data);
        } catch (error) {
            console.error(
                "Error fetching OrderStatus:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const getUser = async () => {
        try {
            const response = await axios.get(`${API_URL}/get-user/${orderData.user_id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setUser(response.data);
        } catch (error) {
            console.error(
                "Error fetching user:",
                error.response ? error.response.data : error.message
            );
            setUser(null); // Set user to null if there's an error
        }
    };

    const getRole = async () => {
        try {
            const response = await axios.get(`${API_URL}/roles`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response.data);
            setRoles(response.data);
        } catch (error) {
            console.error(
                "Error fetching roles:",
                error.response ? error.response.data : error.message
            );
        }
    };

    const getuserRole = () => {
        if (user && roles.length > 0) {
            const role = roles.find((v) => v.id === user[0].role_id);
            if (role) {
                setUserRole(role.name);
            }
        }
    };

    const getFamily = async () => {
        try {
            const response = await axios.get(`${API_URL}/family/getFamily`);
            setParentCheck(response.data);
        } catch (error) {
            console.error(
                "Error fetching Family",
                error.response ? error.response.data : error.message
            );
        }
    }
    const getSubFamily = async () => {
        try {
            const response = await axios.get(`${API_URL}/subfamily/getSubFamily`);
            setChildCheck(response.data);
        } catch (error) {
            console.error(
                "Error fetching SubFamily",
                error.response ? error.response.data : error.message
            );
        }
    }

    const handleOrderDetails = () => {
        const details = orderData.order_details.map((orderItem) => {
            const matchingItem = items.find((item) => item.id === orderItem.item_id);
            return {
                ...orderItem,
                image: matchingItem ? matchingItem.image : orderItem.image,
                description: matchingItem ? matchingItem.description : orderItem.description,
            };
        });
        setOrderDetails(details);
    };

    // const [checkedParents, setCheckedParents] = useState(
    //     parentCheck.reduce((acc, family) => ({ ...acc, [family.id]: true }), {})
    // );

    // ------product filter section ---------

    const [checkedParents, setCheckedParents] = useState({});
    const [checkedChildren, setCheckedChildren] = useState({});
    // const [searchTermMenu, setSearchTermMenu] = useState("");

    useEffect(() => {

        const initialParents = {};
        const initialChildren = {};
        parentCheck.forEach(parent => initialParents[parent.id] = false);
        childCheck.forEach(child => initialChildren[child.id] = false);
        setCheckedParents(initialParents);
        setCheckedChildren(initialChildren);
    }, [parentCheck, childCheck]);

    const handleParentChangeMenu = (parentId) => {
        const newCheckedParents = { ...checkedParents, [parentId]: !checkedParents[parentId] };
        setCheckedParents(newCheckedParents);

        const newCheckedChildren = { ...checkedChildren };
        childCheck.forEach(child => {
            if (parentCheck.find(p => p.id === parentId)?.name === child.family_name) {
                newCheckedChildren[child.id] = newCheckedParents[parentId];
            }
        });
        setCheckedChildren(newCheckedChildren);

        filterItems(newCheckedParents, newCheckedChildren, searchTermMenu);
    };

    const handleChildChangeMenu = (childId, parentName) => {
        const newCheckedChildren = { ...checkedChildren, [childId]: !checkedChildren[childId] };
        setCheckedChildren(newCheckedChildren);

        const parentId = parentCheck.find(p => p.name === parentName)?.id;
        const allChildrenUnchecked = childCheck
            .filter(child => child.family_name === parentName)
            .every(child => !newCheckedChildren[child.id]);

        const newCheckedParents = { ...checkedParents, [parentId]: !allChildrenUnchecked };
        setCheckedParents(newCheckedParents);

        filterItems(newCheckedParents, newCheckedChildren, searchTermMenu);
    };

    const filterItems = (parents, children, searchTerm) => {
        const filteredItems = obj1.filter(item => {
            const matchesParent = Object.values(parents).some(checked => checked) ? parents[item.family_id] : true;
            const matchesChild = Object.values(children).some(checked => checked) ? children[item.sub_family_id] : true;
            const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

            return ((matchesParent && matchesChild) || (!Object.values(parents).some(checked => checked) && !Object.values(children).some(checked => checked))) && matchesSearch;
        });

        setFilteredItemsMenu(filteredItems);
    };

    const handleSearchMenu = (event) => {
        const term = event.target.value;
        setSearchTermMenu(term);
        filterItems(checkedParents, checkedChildren, term);
    };


    // // ==== select items section ====
    const handleAddItem = (item) => {
        console.log(item, "safasf");
        if (!selectedItemsMenu.some((v) => v.item_id == item.id)) {
            console.log(selectedItemsMenu);
            const obj = {
                item_id: item.id,
                quantity: 1,
            }
            setSelectedItemsMenu((prevArray) => [...prevArray, obj]);
            console.log(selectedItemsMenu);
            setSelectedItemsCount(selectedItemsCount + 1);
            // setItemId((prevArray) => [...prevArray, item.id]);

            // Perform any other action here when adding an item
            console.log(`Added item ${item.id}`);
        } else {
            console.log(`Item ${item.id} already added`);
        }
    };

    // // ==== select items section ====

    // /*========= Add menu to Order =======*/
    const handleAddMenu = async () => {
        console.log("dsassf");
        try {
            const response = await axios.post(
                `${API_URL}/order/addItem`,
                {
                    "order_id": id,
                    "order_details": selectedItemsMenu
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    },
                    maxBodyLength: Infinity
                }
            );

            console.log("API Response:", response);

            if (!(response.success == "false")) {
                handleClose1Prod();
                handleShow1AddSuc();

                // setItemId([]);
                setSelectedItemsMenu([]);

            } else {
                console.error("Failed to add items to menu");
            }
        } catch (error) {
            console.error(
                "Error adding items to menu:",
                error.response ? error.response.data : error.message
            );
        }
    };

    /*========= Add menu to Order =======*/

    // ===note ===========
    const toggleInput = (id) => {
        setVisibleInputId(prevId => prevId === id ? null : id);
    };

    const handleNoteChange = (id, e) => {
        setNoteValues(e.target.value);
    };

    const handleNoteKeyDown = (id) => async (e) => {
        if (e.key === 'Enter') {
            console.log(id);
            try {
                const response = await axios.post(
                    `${API_URL}/order/addNote/${id}`,
                    { notes: noteValues },
                    {
                        headers: {
                            Authorization: `Bearer 2816|ojbPri4TvtQKBLMDfMp3wnCaYrpUf5tpEv1UZ3dp07d9f3e0`,
                        },
                    }
                );
                console.log("Note added successfully:", response.data);

                // setSavedNote(noteValues);
                setNoteValues('');
                setVisibleInputId(null);
            } catch (error) {
                console.error(
                    "Error adding note:",
                    error.response ? error.response.data : error.message
                );
            }
        }
    };


    //    -------- Edite order Qyt ----
    const initialCounts = orderDetails.reduce((acc, item) => {
        acc[item.id] = item.quantity;
        return acc;
    }, {});

    const [counts, setCounts] = useState(item ? { [item.id]: 0 } : initialCounts)

    useEffect(() => {

        console.log(orderDetails);
        if (orderDetails) {
            const initialCounts = {};
            orderDetails.forEach(item => {
                initialCounts[item.id] = item.quantity;
            });
            setCounts(initialCounts);
        }
    }, [orderDetails]);

    const increment = async (proid, item_id, quantity) => {

        try {
            const response = await axios.post(
                `${API_URL}/order/updateItem/${proid}`,
                {
                    "order_id": id,
                    "order_details": [
                        {
                            "item_id": item_id,
                            "quantity": quantity + 1
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer 2816|ojbPri4TvtQKBLMDfMp3wnCaYrpUf5tpEv1UZ3dp07d9f3e0`,
                    },
                }
            );
            console.log("Note added successfully:", response.data);
        } catch (error) {
            console.error(
                "Error adding note:",
                error.response ? error.response.data : error.message
            );
        }

        const index = orderDetails.findIndex((item) => item.id === proid);
        if (index !== -1) {
            orderDetails[index].quantity++;
        }

        setCounts(prevCounts => ({
            ...prevCounts,
            [proid]: prevCounts[proid] + 1
        }));
    };

    const decrement = async (proid, item_id, quantity) => {

        if (quantity <= 1) {
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/order/updateItem/${proid}`,
                {
                    "order_id": id,
                    "order_details": [
                        {
                            "item_id": item_id,
                            "quantity": quantity - 1
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: `Bearer 2816|ojbPri4TvtQKBLMDfMp3wnCaYrpUf5tpEv1UZ3dp07d9f3e0`,
                    },
                }
            );
            console.log("Note added successfully:", response.data);
        } catch (error) {
            console.error(
                "Error adding note:",
                error.response ? error.response.data : error.message
            );
        }

        const index = orderDetails.findIndex((item) => item.id === proid);
        console.log(index);

        if (index !== -1) {
            if (orderDetails[index].quantity > 1) {
                orderDetails[index].quantity--;
            }
        }
        setCounts(prevCounts => ({
            ...prevCounts,
            [proid]: prevCounts[proid] > 1 ? prevCounts[proid] - 1 : 1
        }));
    };

    const deleteProductModal = (id) => {
        setShowDeleteConfirmation(true);
        setDeleteProductId(id);
    }

    const deleteProduct = async () => {

        try {
            const response = await axios.delete(`${API_URL}/order/deleteSingle/${deleteProductId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!(response.success == "false")) {
                setDeleteProductId(null);
                setShowDeleteConfirmation(false);
                handleShowEditFamfinal();
            }

        } catch (error) {
            console.error(
                "Error Delete OrderData:",
                error.response ? error.response.data : error.message
            );
        }


        setOrderDetails(prevProducts => prevProducts.filter(product => product.id !== id));
    };

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
    const [activeTab, setActiveTab] = useState("home");
    const [showDeliveryButton, setShowDeliveryButton] = useState(true);
    const [showCancelOrderButton, setShowCancelOrderButton] = useState(false);
    const handleTabSelect = (selectedTab) => {
        setActiveTab(selectedTab);
        if (selectedTab === "profile") {
            setShowDeliveryButton(false);
            setShowCancelOrderButton(true);
        } else {
            setShowDeliveryButton(true);
            setShowCancelOrderButton(false);
        }
    };


    // const obj2 = [
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    //     {
    //         image: img2,
    //         name: "Jugo",
    //         price: "2.00",
    //         code: "0124",
    //     },
    // ];
    // const checkboxs = [
    //     {
    //         menu: "Cocina 1",
    //     },
    //     {
    //         menu: "Cocina 2",
    //     },
    //     {
    //         menu: "Barra 1",
    //     },
    //     {
    //         menu: "Barra 2",
    //     },
    // ];




    // const handleParentChangeMenu = (parentId) => {
    //     const newCheckedParents = {
    //         ...checkedParents,
    //         [parentId]: !checkedParents[parentId]
    //     };
    //     setCheckedParents(newCheckedParents);
    //     setFilteredItemsMenu(
    //         filterItems(searchTermMenu, newCheckedParents, childCheck)
    //     );
    // };

    // const handleChildCheckboxChange = (parentKey, childKey) => {
    //     // setCheckboxes((prevState) => ({
    //     //     ...prevState,
    //     //     [parentKey]: {
    //     //         ...prevState[parentKey],
    //     //         children: {
    //     //             ...prevState[parentKey].children,
    //     //             [childKey]: !prevState[parentKey].children[childKey],
    //     //         },
    //     //     },
    //     // }));
    // };

    // const filterItems = (searchTerm, checkedParents, childCheck) => {
    //     return obj1.filter((item) => {
    //         const matchesSearch = item.name
    //             .toLowerCase()
    //             .includes(searchTerm.toLowerCase());
    //         const matchesCheckbox =
    //             checkedParents[item.family_id] ||
    //             (childCheck &&
    //                 Object.keys(childCheck).some(
    //                     (key) =>
    //                         Array.isArray(childCheck[key]) &&
    //                         childCheck[key].some(
    //                             (child) =>
    //                                 child.id === item.child_id &&
    //                                 child.family_name === item.family.name
    //                         )
    //                 ));

    //         return (
    //             matchesSearch &&
    //             (Object.keys(checkedParents).every((key) => !checkedParents[key]) ||
    //                 matchesCheckbox)
    //         );
    //     });
    // };

    // const handleSearchMenu = (event) => {
    //     const term = event.target.value.toLowerCase();
    //     setSearchTermMenu(term);
    //     setFilteredItemsMenu(filterItems(term, checkedParents, childCheck));
    // };

    // // ------End  product filter section ---------



    // const handleSaveChanges = async () => {
    //     handleShow20();
    // };



    //    -------- Edite order Qyt ----
    // =============end note==========



    // const obj1 = {
    //     sector: "4",
    //     mesa: "2",
    //     name: "Damian Gonzales",
    //     Paltform: "5",
    // }

    // const [data2, setData2] = useState([
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Anulado"

    //     },
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Recibido"


    //     },
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Preparado"


    //     },
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Entregado"
    //     },
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Finalizado"
    //     },
    //     {
    //         Date: "20/03/2024",
    //         Hour: "08:00 am",
    //         User: 'Cocina',
    //         state: "Preparado"
    //     },



    //     // More orders...
    // ]);

    // const [product, setProduct] = useState([
    //     {
    //         id: 1,
    //         image: pic1,
    //         name: 'Pollo frito crujiente',
    //         description: 'Las especialidad de la casa',
    //         price: '$10.00',
    //         quantity: 1,
    //         note: '+ Agregar nota'
    //     },
    //     {
    //         id: 2,
    //         image: pic2,
    //         name: 'Guitig',
    //         description: 'con gas',
    //         price: '$2.00',
    //         quantity: 2,
    //         note: 'Nota: Al clima'
    //     },
    //     {
    //         id: 3,
    //         image: pic3,
    //         name: 'Gelatina',
    //         description: 'con gas',
    //         price: '$2.00',
    //         quantity: 2,
    //         note: 'Nota :Con cerezas a los lados'
    //     }
    // ]);


    // const [editingNote, setEditingNote] = useState(null);
    // const [noteValue, setNoteValue] = useState('');

    // const handleEditNoteClick = (index, note) => {
    //     setEditingNote(index);
    //     setNoteValue(note.startsWith('Nota: ') ? note.substring(6) : note);
    // };

    // const handleNoteChange = (e) => {
    //     setNoteValue(e.target.value);
    // };

    // const handleNoteKeyDown = (index, e) => {
    //     if (e.key === 'Enter') {
    //         const updatedProduct = [...product];
    //         updatedProduct[index].note = `Nota: ${noteValue}`;
    //         setProduct(updatedProduct);
    //         setEditingNote(null);
    //     }
    // };


    // const initialCounts = product.reduce((acc, item) => {
    //     acc[item.id] = item.quantity;
    //     return acc;
    // }, {});

    // const [counts, setCounts] = useState(item ? { [item.id]: 0 } : initialCounts)
    // const increment = (id) => {
    //     setCounts(prevCounts => ({
    //         ...prevCounts,
    //         [id]: prevCounts[id] + 1
    //     }));
    // };

    // const decrement = (id) => {
    //     setCounts(prevCounts => ({
    //         ...prevCounts,
    //         [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0
    //     }));
    // };

    // const deleteProduct = (id) => {
    //     setProduct(prevProducts => prevProducts.filter(product => product.id !== id));
    // };


    // const [date, setdate] = useState("17/03/2024")
    // const [time, settime] = useState("08:00 am")
    // const [order, setorder] = useState("01234")
    // const [order1, setorder1] = useState("3")




    // Add producttion
    // const [show1Prod, setShow1Prod] = useState(false);
    // const handleClose1Prod = () => setShow1Prod(false);
    // const handleShow1Prod = () => setShow1Prod(true);

    // create production center
    // const [showCreate, setShowCreate] = useState(false);
    // const handleCloseCreate = () => setShowCreate(false);
    // const handleShowCreate = () => setShowCreate(true);

    // create production success
    // const [showCreSucProduction, setShowCreSucProduction] = useState(false);
    // const handleCloseCreSucProduction = () => setShowCreSucProduction(false);
    // const handleShowCreSucProduction = () => setShowCreSucProduction(true);

    //  // Add producttion
    //  const [show1Prod, setShow1Prod] = useState(false);
    //  const handleClose1Prod = () => setShow1Prod(false);
    //  const handleShow1Prod = () => setShow1Prod(true);

    // Add product success
    // const [show1AddSuc, setShow1AddSuc] = useState(false);
    // const handleClose1AddSuc = () => setShow1AddSuc(false);
    // const handleShow1AddSuc = () => {
    //     setShow1AddSuc(true)
    //     setTimeout(() => {
    //         setShow1AddSuc(false)
    //     }, 2000);
    // };

    // file upload function
    // const [selectedFile, setSelectedFile] = useState(null);
    // const [errorMessage, setErrorMessage] = useState(null);
    // const fileInputRef = useRef(null);

    // const handleFileChange = (event) => {
    //     const file = event.target.files[0];

    //     if (file) {
    //         const img = new Image();
    //         img.onload = () => {
    //             if (img.width > 800 || img.height > 400) {
    //                 setErrorMessage("Image dimensions should be at most 800x400 pixels");
    //                 setSelectedFile(null);
    //             } else {
    //                 setErrorMessage(null);
    //                 setSelectedFile(file);
    //             }
    //         };
    //         img.src = URL.createObjectURL(file);
    //     }
    // };

    // const handleDivClick = () => {
    //     fileInputRef.current.click();
    // };
    // const [checkboxes, setCheckboxes] = useState({
    //     Bebidas: {
    //         isChecked: false,
    //         children: {
    //             Agua: false,
    //             Colas: false,
    //             Cervezas: false,
    //         },
    //     },
    //     Snacks: {
    //         isChecked: false,
    //         children: {
    //             Op1: false,
    //             Op2: false,
    //         },
    //     },
    //     Dulces: {
    //         isChecked: false,
    //         children: {
    //             Op1: false,
    //             Op2: false,
    //         },
    //     },
    // });

    // const handleParentCheckboxChange = (parentKey) => {
    //     setCheckboxes((prevState) => {
    //         const newParentCheckedState = !prevState[parentKey].isChecked;
    //         const newChildrenState = Object.keys(
    //             prevState[parentKey].children
    //         ).reduce((acc, key) => {
    //             acc[key] = newParentCheckedState;
    //             return acc;
    //         }, {});

    //         return {
    //             ...prevState,
    //             [parentKey]: {
    //                 isChecked: newParentCheckedState,
    //                 children: newChildrenState,
    //             },
    //         };
    //     });
    // };


    return (
        <div>
            <div className="m_bg_black">
                <Header />
                <div className="d-flex">
                    <Sidenav />
                    <div className=" flex-grow-1 sidebar overflow-hidden">
                        <div className="p-3 m_bgblack text-white  ">
                            <Link to="/home/usa" className='d-flex text-decoration-none' >
                                <div className='btn btn-outline-primary text-nowrap py-2 d-flex mt-2 ms-3' style={{ borderRadius: "10px" }}> <FaArrowLeft className='me-2 mt-1' />Regresar</div>
                            </Link>
                            <div className='d-flex justify-content-between align-items-center flex-wrap'>
                                <div className='text-white ms-3 my-4' style={{ fontSize: "18px" }}>
                                    Pedido : {id}
                                </div>


                                <div className='d-flex flex-wrap me-4'>
                                    {showCancelOrderButton ? (
                                        <div className='btn bj-btn-outline-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ borderRadius: '10px' }}> <BsCalculatorFill className='me-2' />Generar nota de crédito</div>
                                    ) : (
                                        <div onClick={handleShow1Prod} className='btn bj-btn-outline-primary me-2  text-nowrap  me-2 py-2 d-flex align-items-center justify-content-center' style={{ borderRadius: '10px' }}> <FaPlus className='me-2' />Agregar artículo</div>
                                    )}

                                </div>

                                <Modal
                                    show={show}
                                    onHide={handleClose}
                                    backdrop={true}

                                    keyboard={false}
                                    className="m_modal"
                                >
                                    <Modal.Header closeButton className="m_borbot b_border_bb mx-3 ps-0">
                                        <Modal.Title className="j-tbl-text-10">Anular pedido</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="border-0 pb-0 ">
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleFormControlInput1"
                                                className="form-label j-tbl-font-11"
                                            >
                                                Pedido
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control j-table_input"
                                                id="exampleFormControlInput1"
                                                placeholder="01234"
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="exampleFormControlInput1"
                                                className="form-label j-tbl-font-11"
                                            >
                                                Motivo de la anulación
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control j-table_input py-3"
                                                id="exampleFormControlInput1"
                                                placeholder="-"
                                            />
                                        </div>
                                    </Modal.Body>
                                    <Modal.Footer className="border-0 pt-0">
                                        <Button
                                            className="j-tbl-btn-font-1"
                                            variant="danger"
                                            onClick={() => {
                                                handleClose();
                                            }}
                                        >
                                            Cancelar
                                        </Button>
                                        <Button
                                            className="j-tbl-btn-font-1"
                                            variant="primary"
                                            onClick={() => {
                                                handleClose();
                                            }}
                                        >
                                            Agregar
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                            </div>
                        </div>


                        <Tabs
                            activeKey={activeTab}
                            onSelect={handleTabSelect}
                            id="fill-tab-example"
                            className="mb-3 m_tabs m_bgblack px-2 border-0 p-3  "
                            fill>
                            <Tab
                                eventKey="home"
                                title="Orden"
                                className="m_in text-white aaaaa  rounded"
                            >
                                <div className='row'>
                                    <div className='col-xl-7 ps-0 col-12 overflow-hidden '>
                                        <div className='p-4 m_bgblack text-white '>
                                            <p className='' style={{ fontSize: "18px", marginBottom: "36px" }}>Listado</p>
                                            <div className='a_deli_infolist p-4'>
                                                {
                                                    orderDetails.map((item, index) => {
                                                        console.log(item)
                                                        return (
                                                            <div key={item.id}>
                                                                <div className="py-3 ">
                                                                    <div className="row j-payment-edit-center">
                                                                        <div className="col-sm-8">
                                                                            <div className="d-flex align-content-center">
                                                                                <img src={`${API}/images/${item.image}`} alt="pic" height={70} width={80} />
                                                                                <div className="ms-4">
                                                                                    <div className="text-nowrap">{item.name}</div>
                                                                                    <div className="mt-3 a_mar_new">{item.description}</div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                        <div className="col-sm-2 a_text_price">
                                                                            <button className="b_count11 btn btn-secondary" onClick={() => decrement(item.id, item.item_id, item.quantity)}>-</button>
                                                                            <span className="pe-3 ms-2">{counts[item.id]}</span>
                                                                            <button className="b_count btn btn-secondary" onClick={() => increment(item.id, item.item_id, item.quantity)}>+</button>
                                                                        </div>
                                                                        <div className="col-sm-1 a_text_price">
                                                                            <div className="pe-5 fw-bold">{item.amount}</div>
                                                                        </div>
                                                                        <div className="col-sm-1">
                                                                            <button className="b_bg_red btn" onClick={() => deleteProductModal(item.id)}>
                                                                                <RiDeleteBinLine />
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div style={{ marginBottom: "68px", cursor: "pointer" }}>
                                                                    {/* {item.notes === index ? (
                                                                        <input
                                                                            type="text"
                                                                            className='ms-4 j-note-input'
                                                                            value={noteValue}
                                                                            onChange={handleNoteChange}
                                                                            onKeyDown={(e) => handleNoteKeyDown(index, e)}
                                                                        />
                                                                    ) : (
                                                                        <div className='a_home_addnote ms-4' onClick={() => handleEditNoteClick(index, item.note)}>
                                                                            {item.note}
                                                                        </div>
                                                                    )} */}
                                                                    {item.notes === null ? (
                                                                        <div key={item.id}>
                                                                            {visibleInputId !== item.id && (
                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <span
                                                                                        className='j-nota-blue ms-4 text-decoration-underline'
                                                                                        onClick={() => toggleInput(item.id)}
                                                                                    >
                                                                                        + Nota
                                                                                    </span>
                                                                                </div>
                                                                            )}

                                                                            {visibleInputId === item.id && (
                                                                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                                                                    <span className='j-nota-blue ms-4'>Nota:</span>
                                                                                    <input
                                                                                        type="text"
                                                                                        className='ms-4 j-note-input'
                                                                                        value={noteValues}
                                                                                        onChange={(e) => handleNoteChange(item.id, e)}
                                                                                        onKeyDown={handleNoteKeyDown(item.id)}
                                                                                    />
                                                                                </div>
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <div className='a_home_addnote ms-4' >
                                                                            {item.notes}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-5 pe-0 col-12 overflow-hidden '>
                                        <div className='p-3 m_bgblack text-white'>
                                            <h5 className='mt-3 ms-2'>Resumen</h5>
                                            <div className='deli_infolist p-2'>
                                                <div className='d-flex justify-content-end align-items-center ' >
                                                    <div className='d-flex justify-content-end align-items-center me-3 '>
                                                        <div className='me-2 fs-4'><FaCalendarAlt className='bj-icon-size-change' /></div>
                                                        <div className='pt-1 bj-delivery-text-3'>{new Date(orderData?.created_at).toLocaleDateString('en-GB')}</div>
                                                    </div>
                                                    <div className='d-flex justify-content-end align-items-center '>
                                                        <div className='me-2 fs-4 '><MdOutlineAccessTimeFilled /></div>
                                                        <div className='pt-2 a_time'>{new Date(orderData?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                                    </div>
                                                </div>
                                                <div className='fw-bold fs-5'>
                                                    Datos
                                                </div>

                                                <div className={`bj-delivery-text-2  b_btn1 mb-2 mt-3 p-0 text-nowrap d-flex  align-items-center justify-content-center 
                                                    ${orderData?.status.toLowerCase() === 'received' ? 'b_indigo' : orderData?.status.toLowerCase() === 'prepared' ? 'b_ora ' : orderData?.status.toLowerCase() === 'delivered' ? 'b_blue' : orderData?.status.toLowerCase() === 'finalized' ? 'b_green' : orderData?.status.toLowerCase() === 'withdraw' ? 'b_indigo' : orderData?.status.toLowerCase() === 'local' ? 'b_purple' : 'text-danger'}`}>
                                                    {orderData?.status.toLowerCase() === 'received' ? 'Recibido' : orderData?.status.toLowerCase() === 'prepared' ? 'Preparado ' : orderData?.status.toLowerCase() === 'delivered' ? 'Entregado' : orderData?.status.toLowerCase() === 'finalized' ? 'Finalizado' : orderData?.status.toLowerCase() === 'withdraw' ? 'Retirar' : orderData?.status.toLowerCase() === 'local' ? 'Local' : ' '}
                                                </div>

                                                <div style={{ fontWeight: "600", borderRadius: "10px" }} className={`bj-delivery-text-2  b_btn1 mb-3  p-0 text-nowrap d-flex  align-items-center justify-content-center 
                                                     ${orderData?.order_type.toLowerCase() === 'local' ? 'b_indigo' : orderData?.order_type.toLowerCase() === 'order now' ? 'b_ora ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'b_blue' : orderData?.order_type.toLowerCase() === 'uber' ? 'b_ora text-danger' : orderData?.order_type.toLowerCase().includes("with") ? 'b_purple' : 'b_ora text-danger'}`}>
                                                    {orderData?.order_type.toLowerCase() === 'local' ? 'Local' : orderData?.order_type.toLowerCase().includes("with") ? 'Retiro ' : orderData?.order_type.toLowerCase() === 'delivery' ? 'Entrega' : orderData?.order_type.toLowerCase() === 'uber' ? 'Uber' : orderData?.order_type}
                                                </div>


                                                {/* <div className='btn a_btn_lightjamun my-3 bj-delivery-text-2 ' style={{ borderRadius: "10px" }}><span style={{ fontWeight: "600" }}>{orderData?.order_type}</span></div><br />
                                                <div className='btn sj_btn_lightgreen my-3 bj-delivery-text-2 ' style={{ borderRadius: "10px" }}><span style={{ fontWeight: "600" }}>Uber</span></div> */}
                                                <div className='d-flex justify-content-end align-items-center mb-4 mt-3'>
                                                    <div className='w-50'>
                                                        <div className='mb-3'>Codigo pedido</div>
                                                        <div className='w-75 a_bg_order py-2 border-0' style={{ borderRadius: "10px" }}><span className='ps-1'>{id}</span></div>
                                                    </div>
                                                    <div className='w-50'>
                                                        <div className='mb-3'>Cantidad</div>
                                                        <div className='w-75 a_bg_order py-2 border-0 ' style={{ borderRadius: "10px" }}><span className='ps-1'>{orderDetails.length}</span></div>
                                                    </div>
                                                </div>
                                                <div className='p-4 a_deli_infolist  mt-3'>
                                                    <div className=' a_mar_summary fs-5 fw-bold'>Costo total</div>
                                                    <div className='d-flex justify-content-between align-items-center my-1 mb-2'>
                                                        <div>Productos</div>
                                                        <div>${orderDetails.reduce((acc, v) => v.amount * v.quantity + acc, 0)}</div>
                                                    </div>
                                                    <div className='d-flex justify-content-between align-items-center my-1'>
                                                        <div>Descuentos</div>
                                                        <div>${parseInt(orderData?.discount)}</div>
                                                    </div>
                                                    <hr></hr>
                                                    <div>
                                                        <div className='d-flex justify-content-between align-items-center my-1 fs-5 fw-bold'>
                                                            <div>Total</div>
                                                            <div>${orderDetails.reduce((acc, v) => v.amount * v.quantity + acc, 0) - parseInt(orderData?.discount)}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='mx-auto text-center mt-3'>
                                                    <div onClick={handleShow20} className='btn text-white j-btn-primary w-100  border-0' style={{ padding: "8px 12px", borderRadius: "8px" }}>Guardar cambios</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </Tab>

                            <Tab eventKey="profile" title="Detalles" className='b_border ' style={{ marginTop: "2px" }}>
                                <div className='b-bg-color1'>
                                    <div className='text-white ms-4 pt-4' >
                                        <h5 className='bj-delivery-text-15'>Nota anulación</h5>
                                        <textarea type="text" className="form-control bg-gray border-0 mt-4 py-2" id="inputPassword2" placeholder={orderData?.reason != null ? orderData?.reason : "Estaba sin sal"} style={{ backgroundColor: '#242d38', borderRadius: "10px" }} disabled></textarea>
                                    </div>

                                    <div className='text-white ms-4 pt-4' >
                                        <h5 className='bj-delivery-text-15'>Información pedido</h5>
                                    </div>
                                    <div className='d-flex  flex-grow-1 gap-5 mx-4 m b_inputt b_id_input b_home_field  pt-3 '>
                                        <div className='w-100 b_search flex-grow-1  text-white mb-3'>
                                            <label htmlFor="inputPassword2" className="mb-2" style={{ fontSize: "14px" }}>Sector</label>
                                            <input type="text" className="form-control bg-gray border-0 mt-2 py-2" value={sector?.name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                        </div>
                                        <div className='w-100 flex-grow-1 b_search text-white mb-3'>
                                            <label htmlFor="inputPassword2" className="mb-2">Mesa</label>
                                            <input type="text" className="form-control bg-gray border-0 mt-2 py-2 " value={table?.name} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                        </div>
                                    </div>
                                    <div className='d-flex  flex-grow-1 gap-5 mx-4 m b_inputt b_id_input b_home_field  pt-3 '>
                                        <div className='w-100 b_search flex-grow-1  text-white mb-3'>
                                            <label htmlFor="inputPassword2" className="mb-2" style={{ fontSize: "14px" }}>Cliente</label>
                                            <input type="text" className="form-control bg-gray border-0 mt-2 py-2" value={orderData?.customer_name} id="inputPassword2" placeholder="4" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                        </div>
                                        <div className='w-100 flex-grow-1 b_search text-white mb-3'>
                                            <label htmlFor="inputPassword2" className="mb-2">Personas</label>
                                            <input type="text" className="form-control bg-gray border-0 mt-2 py-2 " value={orderData?.person} id="inputPassword2" placeholder="Uber" style={{ backgroundColor: '#242d38', borderRadius: "10px" }} />
                                        </div>
                                    </div>

                                    <div className='b_table1 mx-4 mt-2' >
                                        <div className='text-white mt-4'>
                                            <h5 style={{ fontSize: "16px" }}>Historial estados</h5>
                                        </div>
                                        <table className='b_table '>
                                            <thead>
                                                <tr className='b_thcolor'>
                                                    <th>Fecha</th>
                                                    <th>Hora </th>
                                                    <th>Usuario</th>
                                                    <th>Estado</th>

                                                </tr>
                                            </thead>
                                            <tbody className='text-white b_btnn '>
                                                {orderStatus.logs?.map((order) => (
                                                    <tr key={id} className='b_row'>
                                                        <td className=' mb-4'>{new Date(order?.created_at).toLocaleDateString('en-GB')}</td>
                                                        <td className='text-nowrap'>{new Date(order?.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                                                        <td>{userRole}</td>
                                                        {/* <td style={{ fontWeight: "500", padding: "8px 12px" }} className={`bj-delivery-text-2 mt-3  mb-3 b_text_w b_btn1 d-flex align-items-center justify-content-center mt-0 ${order.state == 'Anulado' ? 'b_redd' : order.state === 'Recibido' ? 'b_bluee' : order.state === 'Preparado' ? 'b_orr' : order.state === 'Entregado' ? 'b_neww' : order.state === 'Finalized' ? 'b_gree' : order.state === 'Preparado' ? 'b_orr' : 'text-denger'}`}>{order.state}</td> */}
                                                        <td style={{ fontWeight: "500", padding: "8px 12px" }} className={`bj-delivery-text-2 mt-3  mb-3 b_text_w b_btn1 d-flex align-items-center justify-content-center mt-0 
                                                             ${order.status.toLowerCase() === 'received' ? 'b_indigo' : order.status.toLowerCase() === 'prepared' ? 'b_ora ' : order.status.toLowerCase() === 'delivered' ? 'b_blue' : order.status.toLowerCase() === 'finalized' ? 'b_green' : order.status.toLowerCase() === 'withdraw' ? 'b_indigo' : order.status.toLowerCase() === 'local' ? 'b_purple' : 'text-danger'}`}>
                                                            {order.status.toLowerCase() === 'received' ? 'Recibido' : order.status.toLowerCase() === 'prepared' ? 'Preparado ' : order.status.toLowerCase() === 'Entregado' ? 'b_blue' : order.status.toLowerCase() === 'finalized' ? 'Finalizado' : order.status.toLowerCase() === 'withdraw' ? 'Retirar' : order.status.toLowerCase() === 'local' ? 'Local' : order.status.toLowerCase() === 'cancelled' ? 'Cancelar' : ''}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </Tab>
                        </Tabs>

                    </div>
                </div>
                <Modal
                    show={show1Prod}
                    onHide={handleClose1Prod}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal m1 jm-modal_jjjj"
                >
                    <Modal.Header
                        closeButton
                        className="m_borbot "
                        style={{ backgroundColor: "#111928" }}
                    >
                        <Modal.Title className="m18">
                            Agregar artículos
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body
                        className="border-0 p-0 "
                        style={{ backgroundColor: "#111928" }}
                    >
                        <div className="row ">
                            <div
                                className="col-sm-2 col-4    m-0 p-0  m_borrig "
                                style={{ backgroundColor: "#111928" }}
                            >
                                <div>
                                    <div className="ms-3 pe-3 mt-2">
                                        <div className="m_borbot ">
                                            <p className="text-white m14 my-2 mb-3">
                                                Familias y subfamilias
                                            </p>
                                        </div>
                                    </div>

                                    <div className="py-3 m_borbot mx-3  m14 ">
                                        {parentCheck.map((parentItem) => (
                                            <div key={parentItem.id}>
                                                <div className="d-flex justify-content-between align-items-center flex-wrap mb-2">
                                                    <div className="text-nowrap">
                                                        <label>
                                                            <input
                                                                type="checkbox"
                                                                checked={checkedParents[parentItem.id]}
                                                                onChange={() => handleParentChangeMenu(parentItem.id)}
                                                                className="me-2 custom-checkbox"
                                                            />
                                                            <span className="text-white">{parentItem.name}</span>
                                                        </label>
                                                    </div>
                                                </div>
                                                {checkedParents[parentItem.id] && (
                                                    <div style={{ marginLeft: "20px" }}>
                                                        {childCheck
                                                            .filter((childItem) => childItem.family_name === parentItem.name)
                                                            .map((childItem) => (
                                                                <div key={childItem.id}>
                                                                    <div className="d-flex align-content-center justify-content-between my-2 m14">
                                                                        <div>
                                                                            <label className="text-white ">
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={checkedChildren[childItem.id]}
                                                                                    className="mx-2"
                                                                                    onChange={() => handleChildChangeMenu(childItem.id, parentItem.name)}
                                                                                />
                                                                                {childItem.name}
                                                                            </label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-10 col-8 m-0 p-0">
                                <div className="p-3   text-white  flex-wrap">
                                    <div className="mb-3">
                                        <h6>Bebidas</h6>
                                    </div>
                                    <div>
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <div className="">
                                                    <div class="m_group">
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            aria-hidden="true"
                                                            class="m_icon"
                                                        >
                                                            <g>
                                                                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                                                            </g>
                                                        </svg>
                                                        <input
                                                            class="m_input ps-5"
                                                            type="search"
                                                            placeholder="Buscar"
                                                            value={searchTermMenu}
                                                            onChange={handleSearchMenu}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <Button
                                                    className="mgreenbtn pt-2  m14 border-0 text-nowrap"
                                                    onClick={() => {
                                                        // handleClose1Prod();
                                                        // handleShow1AddSuc();
                                                        handleAddMenu();
                                                    }}
                                                >
                                                    Añadir nuevos
                                                    <Badge
                                                        bg="light"
                                                        className="ms-2 text-success rounded-circle m12"
                                                    >
                                                        {selectedItemsCount}
                                                    </Badge>
                                                    <span className="visually-hidden">
                                                        unread messages
                                                    </span>
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row p-2">
                                    {filteredItemsMenu.map((ele, index) => (
                                        <div
                                            className="col-md-4 col-xl-3 col-sm-6 col-12 g-3"
                                            keys={index}
                                        >
                                            <div>
                                                <div class="card m_bgblack text-white position-relative">
                                                    <img
                                                        src={`${API}/images/${ele.image}`}
                                                        class="card-img-top object-fit-fill rounded"
                                                        alt="..."
                                                        style={{ height: "162px" }}
                                                    />
                                                    <div class="card-body">
                                                        <h6 class="card-title">{ele.name}</h6>
                                                        <h6 class="card-title">${ele.sale_price}</h6>
                                                        <p class="card-text opacity-50">
                                                            Codigo: {ele.code}
                                                        </p>
                                                        <div class="btn w-100 btn-primary text-white" onClick={() => handleAddItem(ele)}>
                                                            <a
                                                                href="# "
                                                                className="text-white text-decoration-none"
                                                                style={{ fontSize: "14px" }}
                                                            >
                                                                <span className="ms-1">Añadir </span>
                                                            </a>
                                                        </div>
                                                    </div>

                                                    <div
                                                        className="position-absolute "
                                                        style={{ cursor: "pointer" }}
                                                    >
                                                        <Link
                                                            to={`/articles/singleatricleproduct/${ele.id}`}
                                                            className="text-white text-decoration-none"
                                                        >
                                                            <p
                                                                className=" px-1  rounded m-2"
                                                                style={{ backgroundColor: "#374151" }}
                                                            >
                                                                <IoMdInformationCircle />{" "}
                                                                <span style={{ fontSize: "12px" }}>
                                                                    Ver información
                                                                </span>
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </Modal.Body>

                </Modal>

                {/* add production success */}
                <Modal
                    show={show20}
                    onHide={handleClose20}
                    backdrop={true}

                    keyboard={false}
                    className="m_modal"
                >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                        <div className="text-center">
                            <img
                                src={require("../Image/check-circle.png")}
                                alt=""
                            />
                            <p className="mb-0 mt-2 h6">Nuevos platillos</p>
                            <p className="opacity-75">
                                Han sido agregados exitosamente
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>



                <Modal
                    show={show20}
                    onHide={handleClose20}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal jay-modal"
                >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                        <div className="text-center">
                            <img
                                src={require("../Image/check-circle.png")}
                                alt=""
                            />
                            <p className="mb-0 mt-2 h6">Cambios de pedido</p>
                            <p className="opacity-75">
                                Guardados exitosamente
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>

                {/* ========= Delete confirmation Modal =========== */}
                <Modal
                    show={showDeleteConfirmation}
                    onHide={() => setShowDeleteConfirmation(false)}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal jay-modal"
                >
                    <Modal.Header closeButton className="border-0" />

                    <Modal.Body>
                        <div className="text-center">
                            <img
                                src={require("../Image/trash-outline-secondary.png")}
                                alt=" "
                            />
                            <p className="mb-0 mt-3 h6">
                                {" "}
                                ¿Estás seguro de que quieres eliminar este menú?
                            </p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer className="border-0 ">
                        <Button
                            className="j-tbl-btn-font-1 b_btn_close"
                            variant="danger"
                            onClick={deleteProduct}
                        >
                            Si, seguro
                        </Button>
                        <Button
                            className="j-tbl-btn-font-1 "
                            variant="secondary"
                            onClick={() => setShowDeleteConfirmation(false)}
                        >
                            No, cancelar
                        </Button>
                    </Modal.Footer>
                </Modal>


                <Modal
                    show={showEditFamfinal}
                    onHide={handleCloseEditFamfinal}
                    backdrop={true}
                    keyboard={false}
                    className="m_modal"
                >
                    <Modal.Header closeButton className="border-0" />
                    <Modal.Body>
                        <div className="text-center">
                            <img src={require("../Image/trash-outline-secondary.png")} alt="" />
                            <p className="mb-0 mt-3 h6">
                                {" "}
                                menú Ha sido eliminada correctamente
                            </p>
                        </div>
                    </Modal.Body>
                </Modal>




            </div>
        </div>
    )
}

export default Homeinfomation_payment_edit
