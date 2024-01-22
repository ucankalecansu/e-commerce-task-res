import React from "react";
import "../style/header.css";
import { CiUser, CiWallet } from "react-icons/ci";

const Header = ({ totalPrice, searchInput, handleSearchInputChange }) => {
  return (
    <div className="headerContianer">
      <div class="header">
        <div class="eteration-logo">Eteration</div>
        <div class="search-bar">
          <input
            className="headerInput"
            type="text"
            placeholder="Ara..."
            value={searchInput}
            onChange={handleSearchInputChange}
          />
        </div>
        <div class="user-info">
          <CiWallet className="user-icon" />
          <div>₺{totalPrice}</div>
        </div>
        <div class="user-info">
          <CiUser className="user-icon" />
          <div>Cansu Uçankale</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
