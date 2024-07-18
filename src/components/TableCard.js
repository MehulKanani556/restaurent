import React, { useState, useEffect, useRef } from 'react';

const TableCard = ({ name, no, code, status, onShowAvailableModal, onShowOcupadoModal, isModalOpen }) => {
  const [isSelected, setSelected] = useState(false);
  const tableRef = useRef(null);

  // Handle click outside of the card to deselect only if modal is not open
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tableRef.current && !tableRef.current.contains(event.target)) {
        if (!event.target.closest('.j-offcanvas')) {
          setSelected(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);


  const cardCss = {
    backgroundColor: isSelected ? "#147BDE" : (status === "Disponible" ? "#ebf5ff" : "#374151"),
    color: isSelected ? "#fff" : (status === "Disponible" ? "#111928" : "#fff"),
    cursor: "pointer",
  };

  const cardBodyStyle = {
    marginTop: status === "Disponible" ? "40px" : "20px",
  };

  const handleClick = () => {
    if (!isSelected) {
      setSelected(true);
      if (status === 'Disponible') {
        onShowAvailableModal(no);
      } else {
        onShowOcupadoModal(no);
      }
    }
  };

  return (
    <div ref={tableRef} className="card j_bgblack position-relative" onClick={handleClick} style={cardCss}>
      <div className={`card-body jcard-color`} style={cardBodyStyle}>
        <p className='j-tbl-no-text-7 mb-0'>{no}</p>
        <h5 className="card-text j-tbl-text-8 mb-1">{code}</h5>
        <p className="card-title j-tbl-text-9 mb-0">{name}</p>
      </div>
    </div>
  );
};

export default TableCard;
