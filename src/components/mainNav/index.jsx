import React, { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { BsMoonFill } from "react-icons/bs";
import { FiSun } from "react-icons/fi";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo192.png";
import { ThemeContext } from "../../context/theme-context";
import { getFromStorage } from "../../utils";
import "./style.scss";

const MainNav = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    const isCurrentDark = theme === "dark";
    setTheme(isCurrentDark ? "light" : "dark");
    localStorage.setItem("theme", isCurrentDark ? "light" : "dark");
  };

  const user = JSON.parse(getFromStorage("user"));
  const logout = () => {
    localStorage.clear();
    window.location.replace("/blog");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top main-wrapper">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="logo"
            style={{ width: "30px", height: "30px" }}
            loading="lazy"
            title="Portfolio Site"
            height={60}
            width={60}
          />
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
          {theme === "dark" ? (
            <span className="navbar-toggler-icon">
              {<AiOutlineMenu size={"28px"} />}
            </span>
          ) : (
            <span className="navbar-toggler-icon"></span>
          )}
        </button>
        <div className="collapse navbar-collapse me-auto" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/blog">Blog</Link>
            </li>
            {user?.id ? (
              <li className="nav-item">
                <Link to="/blog/create-article">Create</Link>
              </li>
            ) : null}
            {/* <li className="nav-item">
              <Link to="/blog/search">Search</Link>
            </li> */}
          </ul>
          <div className="left-wrapper">
            <div>
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

            <div className="logout">
              {user?.id ? (
                <button type="button" onClick={logout}>
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
