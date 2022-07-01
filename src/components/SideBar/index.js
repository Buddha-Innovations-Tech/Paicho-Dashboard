import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import {
  MdSpaceDashboard,
  MdOutlineProductionQuantityLimits,
} from "react-icons/md";
import { BsBorderStyle } from "react-icons/bs";
import { AiOutlineTransaction, AiOutlineUser } from "react-icons/ai";
import { BiCarousel } from "react-icons/bi";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { GiArchiveRegister } from "react-icons/gi";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideBar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [subnav, setSubNav] = useState(false);
  return (
    <>
      <div className="sidebarwrapper">
        <Link to="/home">
          <figure>
            <img src={logo} alt="" className="sidebarwrapper__logo" />
          </figure>
        </Link>
        <div className="sidebarwrapper__unorderlist">
          <ul style={{ paddingLeft: "0" }}>
            <li>
              <NavLink to="/home" className="active-link">
                <MdSpaceDashboard className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="product-li">
              <NavLink
                to="/category"
                className="active-link product-li-link"
                onClick={() => setSubNav(!subnav)}
              >
                <MdOutlineProductionQuantityLimits className="icon" />
                <span className="me-5">Product</span>
                {subnav ? (
                  <BiChevronUp
                    onClick={() => setSubNav(!subnav)}
                    style={{ fontSize: "24px" }}
                  />
                ) : (
                  <BiChevronDown
                    onClick={() => setSubNav(!subnav)}
                    style={{ fontSize: "24px" }}
                  />
                )}
              </NavLink>
              {/* <BiChevronDown onClick={()=>setSubNav(!subnav)} style={{fontSize:"24px"}}/> */}
              {subnav && (
                <ul
                  style={{
                    paddingLeft: "130px",
                    listStyle: "disc",
                    paddingTop: "15px",
                  }}
                >
                  <li>
                    <Link to="/category" className="subnav">
                      Categories
                    </Link>
                  </li>
                  <li>
                    <Link to="/addproduct" className="subnav">
                      Add product
                    </Link>
                  </li>
                  <li>
                    <Link to="/productlist" className="subnav">
                      Product List
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/order" className="active-link">
                <BsBorderStyle className="icon" />
                <span>Order</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/transaction" className="active-link">
                <AiOutlineTransaction className="icon" />
                <span>Transaction</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carousel" className="active-link">
                <BiCarousel className="icon" />
                <span>Carousel</span>
              </NavLink>
            </li>
            {userInfo && userInfo.isSuperAdmin && (
              <li>
                <NavLink to="/customer" className="active-link">
                  <AiOutlineUser className="icon" />
                  <span>Customer</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/report" className="active-link">
                <HiOutlineDocumentReport className="icon" />
                <span>Report</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register" className="active-link">
                <GiArchiveRegister className="icon" />
                <span>Register</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default SideBar;
