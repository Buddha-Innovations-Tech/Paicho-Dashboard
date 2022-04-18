import React from "react";
import { BsTruck } from "react-icons/bs";

const HomeOrder = ({ order, number }) => {
  return (
    <>
      <div className="homeorderwrapper">
        <div className="d-flex align-items-center">
          <div className="homeorderwrapper__icon">
            <BsTruck />
          </div>
          <div className="homeorderwrapper__desc">
            <span className="homeorderwrapper__desc--order">{order}</span>
            <p className="homeorderwrapper__desc--number">{number}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeOrder;
