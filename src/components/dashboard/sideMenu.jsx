import React, { useEffect, useState } from "react";
import logo from "../../assets/logo/webscript.png";
import user from "../../assets/user.jpg";
import { Link, NavLink } from "react-router-dom";
import "../../css/dashboard.css";
import MenuItem from "./menuItem";

/**
 * @author
 * @function SideMenu
 **/

const SideMenu = (props) => {
  const [inactive, setInactive] = useState(false);

  useEffect(() => {
    if (inactive) {
      removeActiveClassFromSubMenu();
    }

    props.onCollapse(inactive);
  }, [inactive]);

  //just an improvment and it is not recorded in video :(
  const removeActiveClassFromSubMenu = () => {
    document.querySelectorAll(".sub-menu").forEach((el) => {
      el.classList.remove("active");
    });
  };

  return (
    <div className={`side-menu ${inactive ? "inactive" : ""}`}>
      <div className="top-section">
        <div className="logo">
          <img src={logo} alt="webscript" />
        </div>
        <div onClick={() => setInactive(!inactive)} className="toggle-menu-btn">
          {inactive ? (
            <i className="bi bi-arrow-left-square-fill"></i>
          ) : (
            <i className="bi bi-arrow-right-square-fill"></i>
          )}
        </div>
      </div>

      <div className="search-controller">
        <button className="search-btn">
          <i className="bi bi-search"></i>
        </button>

        <input type="text" placeholder="search" />
      </div>

      <div className="divider"></div>

      <div className="main-menu">
        <ul>
          {/* <li>
            <NavLink className="menu-item" to="/dashboard" end={true}>
              <div className="menu-icon">
                <i className="bi bi-speedometer2"></i>
              </div>
              <span>داشبورد</span>
            </NavLink>
          </li> */}
          {/* <MenuItem
            name={"Content"}
            subMenus={[{ name: "Courses" }, { name: "Videos" }]}
          /> */}
          <li>
            <NavLink className="menu-item" to={"category"}>
              <div className="menu-icon">
                <i className="bi bi-vector-pen"></i>
              </div>
              <span>دسته بندی</span>
            </NavLink>
          </li>
          <li>
            <NavLink className="menu-item" to="item">
              <div className="menu-icon">
                <i className="bi bi-diagram-3"></i>
              </div>
              <span>آیتم</span>
            </NavLink>
          </li>
        </ul>
      </div>
      {/* dashboeard footer */}
      {/* <div className="side-menu-footer">
        <div className="avatar">
          <img src={user} alt="user" />
        </div>
        <div className="user-info">
          <h5>Rizwan Khan</h5>
          <p>rizwankhan@gmail.com</p>
        </div>
      </div> */}
    </div>
  );
};

export default SideMenu;
