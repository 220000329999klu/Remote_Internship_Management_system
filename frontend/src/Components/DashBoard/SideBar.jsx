import React from "react";
import { Link } from "react-router-dom";
import img1 from "../images/user.png";

function SideBar(props) {
  const { current } = props;

  return (
    <div id="sidebar">
      <Link to={"/dashboard"} className="brand a">
        <img src={img1} alt="User" />
        <span className="text" id="admin">LMS Admin</span>
      </Link>

      <ul className="side-menu">
        <li className={current === "dashboard" ? "active" : ""}>
          <Link to={"/dashboard"} className="a">
            <i className="bx bxs-dashboard"></i>
            <span className="text">Dashboard</span>
          </Link>
        </li>

        <li className={current === "user" ? "active" : ""}>
          <Link to={"/Dusers"} className="a">
            <i className="bx bxs-group"></i>
            <span className="text">Users</span>
          </Link>
        </li>

        <li className={current === "courses" ? "active" : ""}>
          <Link to={"/DCourses"} className="a">
            <i className="bx bxs-book"></i>
            <span className="text">Courses</span>
          </Link>
        </li>

        {/* Admin Section */}
        <li className={current === "admin" ? "active" : ""}>
          <Link to={"/admin"} className="a">
            <i className="bx bxs-lock"></i>
            <span className="text">Admin</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;