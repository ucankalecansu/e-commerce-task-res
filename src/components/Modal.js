import React from "react";
import "../style/Modal.css";
import { CiClock1 } from "react-icons/ci";
import { IoCloseCircleOutline } from "react-icons/io5";

const Modal = ({ onClose, isOpen, data }) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal">
        <span className="close" onClick={onClose}>
          <IoCloseCircleOutline />
        </span>
        <div className="modal-content">
          <div key={data.id} className="modalSingleCard">
            <div className="modalImgDiv">
              <img src={data.image} alt={data.title} />
            </div>
            <div className="flex row">
              <CiClock1 className="clock-icon cardTitle" />
              <div className="cardTitle">{new Date(data.createdAt).toLocaleString()}</div>
            </div>
            <div className="textContainer">
              <div className="cardTitle">
                <h3>{data.name}</h3>
              </div>
              <div className="price">{data.price}</div>
            </div>
            <div className="desc">{data.description}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
