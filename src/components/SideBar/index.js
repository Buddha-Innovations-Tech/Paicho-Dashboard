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
import { Accordion } from "react-bootstrap";

const SideBar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);

  const [subnav, setSubNav] = useState(false);
  return (
    <>
      <div className="sidebarwrapper">
        <Link to="/">
          <figure>
            <img src={logo} alt="" className="sidebarwrapper__logo" />
          </figure>
        </Link>
        <div className="sidebarwrapper__unorderlist">
          <ul style={{ paddingLeft: "0" }}>
            <li>
              <NavLink to="/" className={(navData) =>
                    navData.isActive ? 'activeSidebar' : ''}>
                <MdSpaceDashboard className="icon" />
                <span>Dashboard</span>
              </NavLink>
            </li>

            <li className="product-li">
              {/* <Accordion >
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <MdOutlineProductionQuantityLimits className="icon" />
                    <span className="me-5">Product</span>
                  </Accordion.Header>
                  <Accordion.Body>
                    <ul>
                      <li>
                        <NavLink to="/category"   className={(navData) =>
                    navData.isActive ? 'activeSidebar' : ''
                  }>
                          Categories
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/addproduct"
                          className={(navData) =>
                            navData.isActive ? 'activeSidebar' : ''
                          }
                        >
                          Add product
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/productlist"
                          className={(navData) =>
                            navData.isActive ? 'activeSidebar' : ''
                          }
                        >
                          Product List
                        </NavLink>
                      </li>
                    </ul>
                  </Accordion.Body>
                </Accordion.Item>
              
              </Accordion> */}
              <Link
                to="/category"
                // className={(navData) =>
                //   navData.isActive ? 'activeSidebar' : ''}
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
              </Link>
              {subnav && (
                <ul
                  style={{
                    paddingLeft: "80px",
                    paddingTop: "15px",
                  }}
                  className="subnavitem"
                >
                  <li>
                    <NavLink to="/category" className={(navData) =>
                    navData.isActive ? 'activesubSidebar' : 'subnav'} onClick={()=>setSubNav(true)}>
                      Categories
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/addproduct" className={(navData) =>
                    navData.isActive ? 'activesubSidebar' : 'subnav'} onClick={()=>setSubNav(true)}>
                      Add product
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/productlist" className={(navData) =>
                    navData.isActive ? 'activesubSidebar' : 'subnav'} onClick={()=>setSubNav(true)}>
                      Product List
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/order" className={(navData) =>
                    navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
                <BsBorderStyle className="icon" />
                <span>Order</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/transaction"   className={(navData) =>
                  navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
                <AiOutlineTransaction className="icon" />
                <span>Transaction</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/carousel"   className={(navData) =>
                  navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
                <BiCarousel className="icon" />
                <span>Carousel</span>
              </NavLink>
            </li>
            {userInfo && userInfo.isSuperAdmin && (
              <li>
                <NavLink to="/customer"   className={(navData) =>
                  navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
                  <AiOutlineUser className="icon" />
                  <span>Customer</span>
                </NavLink>
              </li>
            )}
            <li>
              <NavLink to="/report"   className={(navData) =>
                  navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
                <HiOutlineDocumentReport className="icon" />
                <span>Report</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/register"   className={(navData) =>
                  navData.isActive ? 'activeSidebar' : ''} onClick={()=>setSubNav(false)}>
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
