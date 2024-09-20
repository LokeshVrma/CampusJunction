import React, { useState, useEffect } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const is_authenticated = false
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

  const handleResize = () => {
    if (window.innerWidth > 768) {
      setMenuOpen(false); // Close menu when switching to full screen
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className={`navbar ${is_authenticated ? "auth-logged-in" : "auth-logged-out"}`}>
      <span id="logo" className="navbar-logo">
        <a href="#">🎓 Campus<span>Junction</span></a>
      </span>

      <div className="nav-links-container">
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="#">Home</a></li>
          <li><a href="#">Hire Tutor</a></li>
          <li><a href="#">Lost & Found</a></li>
          <li><a href="#">About us</a></li>
          {!is_authenticated && (
            <li className="mobile-join-now">
              <button className="join-now-button" onClick={() => (window.location.href = "/login")}>
                JOIN NOW
              </button>
            </li>
          )}
        </ul>
      </div>

      <div className={`menu-toggle ${menuOpen ? "open" : ""}`} onClick={toggleMenu} aria-label="Toggle navigation">
        <span></span><span></span><span></span>
      </div>

      <div className="auth-section">
        {is_authenticated ? (
          <div className="cart-profile-wrapper">
            <a href="/cart" className="cart">
              <img src="/shopping-cart.png" alt="cart" className="cart-icon" />
            </a>
            <div className="profile" onClick={toggleDropdown}>
              <img className="profile-image" src="https://placehold.co/50x50" alt="profile" />
              {dropdownVisible && (
                <ul className="dropdown-menu show">
                  <li><a href="#">Name</a></li>
                  <li><a href="#">Settings</a></li>
                  <div className="dropdown-divider"></div>
                  <li><a href="#">Logout</a></li>
                </ul>
              )}
            </div>
          </div>
        ) : (
          <button className="join-now-button desktop-join-now" onClick={() => (window.location.href = "/login")}>
            JOIN NOW
          </button>
        )}
      </div>

      {dropdownVisible && <div className="overlay" onClick={hideDropdown}></div>}
    </nav>
  );
}

export default Navbar;
