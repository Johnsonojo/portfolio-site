import React, { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/theme-context";
import "./style.scss";

const MainNav = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
  };

  return (
    <nav className="navbar navbar-expand-lg main-wrapper">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaHome />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            <AiOutlineMenu />
          </span>
        </button>
        <div className="collapse navbar-collapse me-auto" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="nav-item">
              <Link to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact">Contacts</Link>
            </li>
          </ul>
          <div className="d-flex icon-wrapper">
            <button type="button" onClick={handleThemeChange}>
              {theme === "light" ? (
                <BsMoonFill
                  style={{
                    color: "black",
                    background: "none",
                  }}
                />
              ) : (
                <FiSun
                  style={{
                    color: "white",
                    background: "none",
                  }}
                />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
