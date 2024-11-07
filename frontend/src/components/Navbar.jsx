import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";  // Import Link from react-router-dom
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
        <Link to="/">🎓 Campus<span>Junction</span></Link> {/* Replace <a> with <Link> */}
      </span>

      <div className="nav-links-container">
        <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
          <li><Link to="/">Home</Link></li> {/* Replace <a> with <Link> */}
          <li><Link to="/hire-tutors">Hire Tutor</Link></li> {/* Replace <a> with <Link> */}
          <li><Link to="/lost-and-found">Lost & Found</Link></li> {/* Replace <a> with <Link> */}
          <li><Link to="/about">About us</Link></li> {/* Replace <a> with <Link> */}
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
            <Link to="/cart" className="cart"> {/* Replace <a> with <Link> */}
              <img src="/shopping-cart.png" alt="cart" className="cart-icon" />
              {cartItemCount > 0 && <span className="cart-badge">{cartItemCount}</span>}
            </Link>
            <div className="profile" onClick={toggleDropdown}>
              <img className="profile-image" src={user.photo_url || "https://placehold.co/50x50"} alt="profile" />
              {dropdownVisible && (
                <ul className="dropdown-menu show">
                  <li><Link to="/profile">Profile</Link></li> {/* Replace <a> with <Link> */}
                  <li><Link to="#">Settings</Link></li> {/* Replace <a> with <Link> */}
                  <div className="dropdown-divider"></div>
                  <li><Link to="#" onClick={handleLogout}>Logout</Link></li> {/* Replace <a> with <Link> */}
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
