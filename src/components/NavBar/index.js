import React, { useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import profile from "../../assets/images/profile.png";
import { VscCircleFilled } from "react-icons/vsc";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="navbarwrapper">
        <div className="d-flex justify-content-end">
          <div>
            <IoMdNotificationsOutline className="navbarwrapper__notification" />
            <div className="navbarwrapper__notification--circle"></div>
          </div>
          <div className="d-flex navbarwrapper__profile">
            <figure>
              <img src={profile} alt="" />
            </figure>
            <span className="navbarwrapper__profile--name">Anderson</span>
          </div>
          <div>
            <Link to="/login">
              <button className="navbarwrapper__logoutbtn">Log out</button>
            </Link>
          </div>

          <div className="notifications__modal">
            <Modal show={show} onHide={handleClose}>
              <Modal.Body>
                <div className="d-flex justify-content-between notifications__modal--title">
                  <div className="notifications__modal--title-left">
                    Notifications
                  </div>
                  <div className="notifications__modal--title-right">
                    Mark all as read
                  </div>
                </div>
                <hr />
                <div className="notifications__modal--body d-flex justify-content-between">
                  <div className="notifications__modal--body-left d-flex justify-content-between">
                    <div className="icon">icon</div>
                    <div className="text">
                      Solam jung rana has ordered paicho achar
                    </div>
                  </div>
                  <div className="notifications__modal--body-right">
                    <VscCircleFilled />
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="navbarwrapper__notification--circle"></div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
