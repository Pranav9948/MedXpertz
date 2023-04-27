import React, { useState } from "react";
import  "../../styles/componentStyles/Doctor/doctorLayout.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Badge } from "antd";
import { faUserMd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {logout} from '../../Redux/actions/UserAction'
import logoz from "../../Images/Medxpertd.png";



function  DoctorsLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const {userInfo} = useSelector((state) => state.userlogin);
  const dispatch = useDispatch();

  console.log("xxx",userInfo)

 


  

  const navigate = useNavigate();
  const location = useLocation();
  

  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Appointments",
      path: "/viewDoctorAppointments",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${userInfo?._id}`,
      icon: "ri-user-line",
    },

    {
      name: "Blogs",
      path: "/yourblogs",
      icon: "ri-book-mark-line",
    },

   
  ];

  

  const menuToBeRendered = doctorMenu
    
  const role = "Doctor"
   
  return (
    <div className="mainD">
      <div className="d-flex layout">
        <div className="sidebarD">
          <div className="sidebar-headerD text-center">
    

            
            <img src={logoz} alt="MedXperts Logo" />
            
        

           
          </div>

          <div className="menu" style={{marginTop:'-70px'}}>
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item `}
              onClick={() => dispatch(logout())}

              
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>

        <div className="contentD">
          <div className="headerD">

         
            {collapsed ? (
              <i
                className="ri-menu-2-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}

<h1 className="role me-auto ms-5" style={{marginTop:"-15px"}}> <FontAwesomeIcon icon={faUserMd} size="2x" className=" text-white text-center" /> {role}</h1>

            <div className="d-flex align-items-center px-4">
              <Badge
                count={userInfo?.unseenNotifications?.length}
                onClick={() => navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2 ms-4" to="/profile" style={{ textDecoration: 'none' }}>
                {userInfo?.username}
              </Link>
            </div>
          </div>

          <div className="bodyD">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default  DoctorsLayout;

