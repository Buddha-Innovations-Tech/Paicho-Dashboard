import React from "react";
import { Form, InputGroup, FormControl } from "react-bootstrap";
import Logo from "../../assets/images/logo.png";
import InputField from "../../components/InputField";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import {Link} from "react-router-dom"

const Login = () => {
  return (
    <>
      <div className="loginbackground">
        <div className="loginbackground__loginform">
          <Form>
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
              <InputField name="Email" placeholder="email address " />
            </div>
            <label htmlFor="" className="passwordlabel">Password</label> <br />
            <div className="passwordinput">
              <div className="passwordinputdiv">
                <InputGroup>
                  <FormControl placeholder="password" required />
                </InputGroup>
              </div>
              <AiOutlineEyeInvisible className="eye-icon" />
            </div>
            <Link to="/home" className="login-btn">Login</Link>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
