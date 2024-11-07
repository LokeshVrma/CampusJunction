import React, { useState, useEffect, useContext } from "react";
import "../styles/Navbar.css";
import { CartContext } from "../contexts/CartContext";
import { UserContext } from "../contexts/UserContext";

function Navbar() {
  const { user, loading, logout } = useContext(UserContext); // Destructure logout function from context
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);

  // Safely calculate cart item count, ensuring cartItems is an array
  const cartItemCount = Array.isArray(cartItems)
    ? cartItems.reduce((count, item) => count + (item.quantity || 0), 0) // Default to 0 if quantity is undefined
    : 0;

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

  const handleLogout = async () => {
    await logout(); // Call the logout function from the context
    window.location.href = "/login"; // Redirect to the login page after logout
  };

  return (
    <nav className={`navbar ${user ? "auth-logged-in" : "auth-logged-out"}`}>
      <span id="logo" className="navbar-logo">
        <a href="/">🎓 Campus<span>Junction</span></a>
      </span>

      <div className="nav-links-container">
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><a href="/">Home</a></li>
          <li><a href="/hire-tutors">Hire Tutor</a></li>
          <li><a href="/lost-and-found">Lost & Found</a></li>
          <li><a href="/about">About us</a></li>
          {!user && (
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
        {!loading && user ? (
          <div className="cart-profile-wrapper">
            <a href="/cart" className="cart">
              <img src="/shopping-cart.png" alt="cart" className="cart-icon" />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </a>
            <div className="profile" onClick={toggleDropdown}>
              <img className="profile-image" src={user.photo_url || "https://placehold.co/50x50"} alt="profile" />
              {dropdownVisible && (
                <ul className="dropdown-menu show">
                  <li><a href={`/profile`}>Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <div className="dropdown-divider"></div>
                  <li><a href="#" onClick={handleLogout}>Logout</a></li>
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
