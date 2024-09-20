import React, { useState } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const is_authenticated = true;
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const hideDropdown = () => {
    setDropdownVisible(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <span id="logo">
        <a href="#">CampusJunction</a>
      </span>

      <div
        className={`menu-toggle ${menuOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className={`menu-content ${menuOpen ? "open" : ""}`}>
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Hire a Tutor</a></li>
          <li><a href="#">Lost and Found</a></li>
        </ul>

        {is_authenticated ? (
          <ul className={`auth-links ${menuOpen ? "open" : ""}`}>
            <li className="cart">
              <a href="/cart">
                <img src="/shopping-cart.png" alt="cart" className="cart-icon" />
              </a>
            </li>
            <li className="dropdown">
              <img
                className="image"
                src="https://placehold.co/50x50"
                alt="profile"
                onClick={toggleDropdown}
              />
              {dropdownVisible && (
                <ul className="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <li className="dropdown-divider"></li>
                  <li><a href="#">Logout</a></li>
                </ul>
              )}
            </li>
          </ul>
        ) : (
          <button
            className="login-button"
            onClick={() => (window.location.href = "/login")}
          >
            JOIN Now
          </button>
        )}
        {dropdownVisible && <div className="overlay" onClick={hideDropdown}></div>}
      </div>
    </nav>
  );
}

export default Navbar;
