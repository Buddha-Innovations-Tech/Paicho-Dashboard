import { Row, Col, Modal, FormControl } from "react-bootstrap";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import React, { useState } from "react";
import { Link } from "react-router-dom";

import DragAndDrop from "../../components/DragAndDrop";
import InputField from "../../components/InputField";

const adminList = [
  {
    id: 1,
    username: "Sagar Gc",
    email: "sagar.12@gmail.com",
    password: "hello123@3",
  },
  {
    id: 2,
    username: "Sagar Gc",
    email: "sagar.12@gmail.com",
    password: "hello123@3",
  },
  {
    id: 3,
    username: "Sagar Gc",
    email: "sagar.12@gmail.com",
    password: "hello123@3",
  },
  {
    id: 4,
    username: "Sagar Gc",
    email: "sagar.12@gmail.com",
    password: "hello123@3",
  },
];
const Register = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);
  return (
    <>
      <div className="registerwrapper">
        <Row>
          <Col md={5}>
            <div className="registerwrapper__background">
              <p className="registerwrapper__title">Create an Account</p>
              <p className="registerwrapper__subtitle">Register new user</p>
              <div className="mt-3">
                <label htmlFor="">First Name</label> <br />
                <FormControl
                  type="text"
                  name="firstname"
                  placeholder="First Name"
                />
              </div>
              <div className="mt-3">
                <label htmlFor="">Last Name</label> <br />
                <FormControl
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                />
              </div>
              <div className="mt-4">
                <label htmlFor="">Email</label> <br />
                <FormControl type="email" name="email" placeholder="Email" />
              </div>
              <div className="mt-4">
                <label htmlFor="">Password</label> <br />
                <FormControl
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="mt-4 register-drag-drop">
                <p className="registerwrapper__image">Image</p>
                <DragAndDrop />
              </div>
              <div className="categorywrapper__addcategorywrapper--buttons register-btn">
                <button className="btn-discard">Discard</button>
                <button className="btn-addcategory">Create Account</button>
              </div>
            </div>
          </Col>
          <Col md={7}>
            <div className="registerwrapper__background">
              <p className="registerwrapper__righttitle">Admin List</p>
              <Row className="catetgorylist-heading adminlistheading">
                <Col md={1}>SN</Col>
                <Col md={2}>Username</Col>
                <Col md={4}>Email</Col>
                <Col md={3}>Password</Col>
                <Col md={2}>Action</Col>
              </Row>
              <div>
                {adminList.map((curElm, index) => {
                  return (
                    <Row
                      className="productlistwrapper__productlistwrapper--listitem adminlist"
                      key={index}
                    >
                      <Col md={1}>
                        <p>{curElm.id}</p>
                      </Col>
                      <Col md={2}>
                        <p>{curElm.username}</p>
                      </Col>
                      <Col md={4}>
                        <p>{curElm.email}</p>
                      </Col>
                      <Col md={3}>
                        <p>{curElm.password}</p>
                      </Col>
                      <Col md={2}>
                        <div className="d-flex justify-content-center">
                          <Link
                            to="/updateregisteracc"
                            style={{ marginTop: "-5px" }}
                          >
                            <AiOutlineEdit className="editicon" />
                          </Link>

                          <RiDeleteBin7Line
                            className="deleteicon"
                            onClick={handleShow1}
                          />
                        </div>
                        {/* delete modal */}
                        <Modal show={show1} onHide={handleClose1}>
                          <Modal.Body className="delete__body">
                            <div className="d-flex justify-content-between">
                              <h2 className="modal__delete">Delete</h2>
                              <ImCross
                                className="carouselCard__category--icons--crossicon"
                                onClick={handleClose1}
                              />
                            </div>
                            {/* <h2 className="modal__delete">Delete</h2> */}
                            <p className="modal__para">
                              Are you sure you want to delete this item ?{" "}
                            </p>
                            <div className="mt-3 d-flex justify-content-between">
                              <button
                                className="carouselwrapper__background__btn--cancel"
                                onClick={handleClose1}
                              >
                                Cancel
                              </button>
                              <button
                                className="carouselwrapper__background__btn--delete"
                                onClick={handleClose1}
                              >
                                Delete
                              </button>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </Col>
                    </Row>
                  );
                })}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
