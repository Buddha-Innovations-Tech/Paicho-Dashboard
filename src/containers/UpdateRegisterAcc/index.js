import {
  InputGroup,
  FormControl,
  Row,
  Col,
  Modal,
  Form,
} from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ImCross } from "react-icons/im";
import {
  listUsers,
  deleteUser,
  updateUser,
  getUserDetails,
} from "../../actions/userActions";
import Loader from "../../components/Loader";

// import DragAndDrop from "../../components/DragAndDrop";
// import InputField from "../../components/InputField";

const UpdateRegisterAcc = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [deleteId, setDeleteId] = useState(0);

  const [state, setState] = useState({
    firstname: "",
    lastname: "",
    email: "",
  });

  const { firstname, lastname, email } = state;

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  let { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, success: userDetailsSuccess } = useSelector(
    (state) => state.userDetails
  );
  const { loading: updateloading } = useSelector((state) => state.userUpdate);
  const { users } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success } = useSelector((state) => state.userRegister);

  useEffect(() => {
    dispatch(getUserDetails(id));
  }, [id]);

  useEffect(() => {
    if (user) {
      setState({ ...user });
    }
  }, [user]);

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    handleClose1();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUser(state));
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listUsers());
  }, [success]);

  useEffect(() => {
    dispatch(listUsers());
  }, [updateloading]);

  return (
    <>
      <div className="registerwrapper">
        <Row>
          <Col md={5}>
            <div className="registerwrapper__background">
              <p className="registerwrapper__title">Update an Account</p>
              <p className="registerwrapper__subtitle">Register new user</p>
              <Form onSubmit={handleSubmit}>
                <div className="mt-3">
                  <label htmlFor="">Firstname</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="firstname"
                      placeholder="Firstname"
                      value={firstname || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Lastname</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={lastname || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-4">
                  <label htmlFor="">Email</label> <br />
                  <InputGroup>
                    <FormControl
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email || ""}
                      onChange={handleInputChange}
                      required
                    />
                  </InputGroup>
                </div>
                {/* <div className="mt-4">
                <InputField name="Password" placeholder="Password" />
                <label htmlFor="">Password</label> <br />
                <InputGroup>
                  <FormControl placeholder="" required />
                </InputGroup>
              </div> */}
                {/* <div className="mt-4 register-drag-drop">
                <p className="registerwrapper__image">Image</p>
                <DragAndDrop />
              </div> */}
                {!updateloading ? (
                  <>
                    <div className="categorywrapper__addcategorywrapper--buttons register-btn">
                      <Link to="/register">
                        <button className="btn-discard">Discard</button>
                      </Link>
                      <button className="btn-addcategory">
                        Update Account
                      </button>
                    </div>
                  </>
                ) : (
                  <Loader />
                )}
              </Form>
            </div>
          </Col>
          <Col md={7}>
            <div className="registerwrapper__background">
              <p className="registerwrapper__righttitle">Admin List</p>
              <Row className="catetgorylist-heading adminlistheading">
                <Col md={1}>SN</Col>
                <Col md={4}>Username</Col>
                <Col md={5}>Email</Col>
                <Col md={2}>Action</Col>
              </Row>
              <div>
                {users.users &&
                  users.users.map((curElm, index) => {
                    return (
                      <Row
                        className="productlistwrapper__productlistwrapper--listitem adminlist"
                        key={index}
                      >
                        <Col md={1}>
                          <p>{index + 1}</p>
                        </Col>
                        <Col md={4}>
                          <p>{`${curElm.firstname}  ${curElm.lastname}`}</p>
                        </Col>
                        <Col md={5}>
                          <p>{curElm.email}</p>
                        </Col>
                        {/* <Col md={3}>
                          <p>{curElm.password}</p>
                        </Col> */}
                        <Col md={2}>
                          <div className="d-flex justify-content-center">
                            <AiOutlineEdit
                              className="editicon"
                              onClick={() => {
                                // handleUpdate(curElm._id);
                                navigate(`/updateregisteracc/${curElm._id}`);
                              }}
                            />

                            <RiDeleteBin7Line
                              className="deleteicon"
                              onClick={() => {
                                setDeleteId(curElm._id);
                                handleShow1();
                              }}
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
                                  // onClick={handleClose1}
                                  onClick={() => {
                                    handleDelete(deleteId);
                                  }}
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

export default UpdateRegisterAcc;
