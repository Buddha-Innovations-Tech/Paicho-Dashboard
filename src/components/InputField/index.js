import React from "react";
import { InputGroup, FormControl } from "react-bootstrap";

const Inputfield = ({ name, placeholder }) => {
  return (
    <>
      <label htmlFor="">{name}</label> <br />
      <InputGroup>
        <FormControl placeholder={placeholder} required />
      </InputGroup>
    </>
  );
};

export default Inputfield;
