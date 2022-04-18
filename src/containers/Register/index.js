import {
  Row,
  Col,
  Modal,
  FormControl,
  Form,
  InputGroup,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { AiOutlineEdit } from "react-icons/ai";
import { ImCross } from "react-icons/im";
import Paginate from "../../components/PaginationComp";
// import DragAndDrop from "../../components/DragAndDrop";
import {
  listUsers,
  register,
  deleteUser,
  updateUser,
} from "../../actions/userActions";
import { type } from "@testing-library/user-event/dist/type";
import Loader from "../../components/Loader";

const Register = () => {
  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  const [deleteId, setDeleteId] = useState(0);

  const [firstname, setFname] = useState("");
  const [lastname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState(
  //   "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
  // );
  const {
    users,
    pages,
    page,
    loading: paginationLoading,
  } = useSelector((state) => state.userList);
  const { userInfo } = useSelector((state) => state.userLogin);
  const { success, loading, error } = useSelector(
    (state) => state.userRegister
  );
  const [isValid, setIsValid] = useState(false);
  const [message, setMessage] = useState("");
  const [isValid1, setIsValid1] = useState(false);
  const [message1, setMessage1] = useState("");
  const [isValid2, setIsValid2] = useState(false);
  const [message2, setMessage2] = useState("");
  const [isValid3, setIsValid3] = useState(false);
  const [message3, setMessage3] = useState("");
  const { success: userDeleteSuccess } = useSelector(
    (state) => state.userDelete
  );
  const { pageNumber } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteUser(id));
    handleClose1();
  };

  const validation = (arr) => {
    return arr.some((i) => i === "") ? false : true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const Reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // const passReg = /"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"/;
    const valid =
      validation([firstname, lastname, email, password]) && Reg.test(email);
    // passReg.test(password);
    if (firstname === "") {
      setIsValid2(false);
      setMessage2("Please fill the firstname");
    } else {
      setIsValid(true);
      setMessage2("");
    }
    if (lastname === "") {
      setIsValid3(false);
      setMessage3("Please fill the lastname");
    } else {
      setIsValid(true);
      setMessage3("");
    }
    if (!Reg.test(email)) {
      setIsValid(false);
      setMessage("Please enter a valid Email.");
    } else {
      setIsValid(true);
      setMessage("");
    }
    if (password.length < 5) {
      setIsValid1(false);
      setMessage1("Password must contain atleast five characters");
    } else {
      setIsValid(true);
      setMessage1("");
    }
    console.log(valid);
    if (valid) {
      dispatch(register(firstname, lastname, email, password));
      setFname("");
      setLname("");
      setEmail("");
      setPassword("");
    }
  };

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
  }, [userInfo]);
  useEffect(() => {
    dispatch(listUsers(pageNumber));
  }, [pageNumber]);

  useEffect(() => {
    dispatch(listUsers());
  }, [success]);

  useEffect(() => {
    if (!userInfo) {
      history("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listUsers());
  }, [userDeleteSuccess]);
  return (
    <>
      <div className="registerwrapper">
        <Row>
          <Col md={5}>
            <div className="registerwrapper__background">
              <p className="registerwrapper__title">Create an Account</p>
              <p className="registerwrapper__subtitle">Register new user</p>

              <Form onSubmit={handleSubmit} autoComplete="Off">
                <div className="mt-3">
                  <label htmlFor="">Firstname</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="firstname"
                      placeholder="Firstname"
                      value={firstname}
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <div className={`message ${isValid ? "success" : "error"}`}>
                    {message2}
                  </div>
                </div>
                <div className="mt-3">
                  {/* <InputField name="Username" placeholder="Username" /> */}
                  <label htmlFor="">Lastname</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="lastname"
                      placeholder="Last Name"
                      value={lastname}
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </InputGroup>
                  <div className={`message ${isValid ? "success" : "error"}`}>
                    {message3}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="">Email</label> <br />
                  <FormControl
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <div className={`message ${isValid ? "success" : "error"}`}>
                    {message}
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="">Password</label> <br />
                  <FormControl
                    type="password"
                    name="passwords"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <div className={`message1 ${isValid ? "success" : "error"}`}>
                    {message1}
                  </div>
                </div>
                {/* <div className="mt-4 register-drag-drop">
                  <p className="registerwrapper__image">Image</p>
                  <DragAndDrop />
                </div> */}
                {!loading ? (
                  <>
                    <div className="categorywrapper__addcategorywrapper--buttons register-btn">
                      <button className="btn-discard">Discard</button>
                      <button
                        className="btn-addcategory"
                        onClick={handleSubmit}
                      >
                        Create Account
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
            <div className="registerwrapper__background mb-4">
              <p className="registerwrapper__righttitle">Admin List</p>
              <Row className="catetgorylist-heading adminlistheading">
                <Col md={1}>SN</Col>
                <Col md={4}>Username</Col>
                <Col md={5}>Email</Col>
                {/* <Col md={3}>Password</Col> */}
                <Col md={2}>Action</Col>
              </Row>
              <div>
                {/* {adminList.map((curElm, index) => { */}
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
                            {/* <Link
                              to="/updateregisteracc"
                              style={{ marginTop: "-5px" }}
                            > */}
                            <AiOutlineEdit
                              className="editicon"
                              onClick={() => {
                                // handleUpdate(curElm._id);
                                history(`/updateregisteracc/${curElm._id}`);
                              }}
                            />
                            {/* </Link> */}

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
            {!paginationLoading ? (
              <>
                <Paginate
                  pages={pages}
                  page={page}
                  list="register"
                  history={history}
                />
              </>
            ) : (
              <Loader />
            )}
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Register;
