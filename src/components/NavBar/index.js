import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronLeft } from "react-icons/fa";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/images/profile.png";
import { VscCircleFilled } from "react-icons/vsc";
import { BsClock } from "react-icons/bs";
import { MdOutlinePermContactCalendar } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const NavBar = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // const userLogin = useSelector((state) => state.userLogin);
  // const { userInfo } = userLogin;

  const { userInfo } = useSelector((state) => state.userLogin);
  // console.log(userInfo.firstname);
  const navigate=useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login")
  };

  return (
    <>
      <div className="navbarwrapper">
        <div className="d-flex justify-content-end">
          {/* <div>
            <IoMdNotificationsOutline
              className="navbarwrapper__notification"
              onClick={handleShow}
            />

            <div className="navbarwrapper__notification__modal">
              <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                  <div className="d-flex justify-content-between navbarwrapper__notification__modal--title">
                    <div className="navbarwrapper__notification__modal--title-left">
                      <FaChevronLeft className="mr-5" />
                      Notifications
                    </div>
                    <div className="navbarwrapper__notification__modal--title-right">
                      Mark all as read
                    </div>
                  </div>
                  <hr />

                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon">
                        <MdOutlinePermContactCalendar className="contact" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Sagar Chhetri{" "}
                          <span className="time2">has just registered</span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>

                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon icon2">
                        <IoMdNotificationsOutline className="contact register" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Jeewan Kunwar
                          <span className="time2">
                            {" "}
                            has ordered paicho achar
                          </span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>
                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon">
                        <MdOutlinePermContactCalendar className="contact" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Sagar Chhetri{" "}
                          <span className="time2">has just registered</span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>
                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon">
                        <MdOutlinePermContactCalendar className="contact" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Sagar Chhetri{" "}
                          <span className="time2">has just registered</span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>

                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon icon2">
                        <IoMdNotificationsOutline className="contact register" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Jeewan Kunwar
                          <span className="time2">
                            {" "}
                            has ordered paicho achar
                          </span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>
                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon">
                        <MdOutlinePermContactCalendar className="contact" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Sagar Chhetri{" "}
                          <span className="time2">has just registered</span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>

                  <div className="navbarwrapper__notification__modal--body d-flex justify-content-between align-items-center">
                    <div className="navbarwrapper__notification__modal--body-left d-flex justify-content-between">
                      <div className="icon icon2">
                        <IoMdNotificationsOutline className="contact register" />
                      </div>
                      <div className="text">
                        <p className="para">
                          Jeewan Kunwar
                          <span className="time2">
                            {" "}
                            has ordered paicho achar
                          </span>
                        </p>
                        <div>
                          <BsClock />
                          <span className="time">15 m</span>
                        </div>
                      </div>
                    </div>
                    <div className="navbarwrapper__notification__modal--body-right">
                      <VscCircleFilled className="green" />
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div className="navbarwrapper__notification--circle"></div>
          </div> */}
          <div className="d-flex navbarwrapper__profile">
            {/* <figure>
              <img src={profile} alt="" />
            </figure> */}
            <span className="navbarwrapper__profile--name">
              {userInfo ? `${userInfo.firstname} ${userInfo.lastname}` : " "}
            </span>
          </div>
          <div>
            {/* <Link to="/login"> */}
            <button
              className="navbarwrapper__logoutbtn"
              onClick={logoutHandler}
            >
              Log out
            </button>
            {/* </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
