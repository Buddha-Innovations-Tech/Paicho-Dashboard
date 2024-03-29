import React, { useEffect, useState } from "react";
import { Form, InputGroup, FormControl, Toast } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import InputField from "../../components/InputField";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../../actions/userActions";
import Loader from "../../components/Loader";
import { Helmet } from "react-helmet";

const Login = () => {
  const [showA, setShowA] = useState(false);
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword,setShowPassword]=useState(false)
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [userInfo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
    setShowA(true);
  };
  const togglePassword=()=>{
    setShowPassword(!showPassword);
  }
  return (
    <>
    <Helmet>
      <title>Paicho-Login</title>
    </Helmet>
      {/* {error && <p style={{ backgroundColor: "red" }}>{error}</p>} */}
      <div className="loginbackground">
        <div className="overlay">
          <div className="loginbackground__loginform">
            <Form onSubmit={handleSubmit}>
              <figure>
                <img src={Logo} alt="" />
              </figure>
              <p className="loginbackground__loginform--title">
                Paicho dashboard
              </p>
              <p className="loginbackground__loginform--login">Login</p>
              <span className="loginbackground__loginform--subtitle">
                Enter your email and password below
              </span>
              <div className="loginbackground__loginform--email">
                <FormControl
                  name="Email"
                  placeholder="email address "
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="" className="passwordlabel">
                Password
              </label>{" "}
              <br />
              <div className="passwordinput">
                <div className="passwordinputdiv">
                  <InputGroup>
                    <FormControl
                      type={showPassword?"text":"password"}
                      placeholder="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </InputGroup>
                </div>
                <AiOutlineEyeInvisible className="eye-icon" onClick={togglePassword}/>
              </div>
              {!loading ? (
                <Link to="/" className="login-btn" onClick={handleSubmit}>
                  Login
                </Link>
              ) : (
                <Loader />
                // <p className="mt-4 Loading">loading...</p>
              )}
              <br />
              {error && (
                <Toast
                  onClose={() => setShowA(false)}
                  show={showA}
                  delay={10000}
                  autohide
                >
                  <Toast.Body>
                    <p>{error}</p>
                  </Toast.Body>
                </Toast>
              )}
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
