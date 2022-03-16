import { Row, Col, Form } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";

import CarouselCard from "../../components/CarouselCard";
import InputField from "../../components/InputField";
import Previews from "../../components/DragAndDrop";

const Carousel = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  console.log(userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="carouselwrapper">
        <p className="carouselwrapper__title">Carousel</p>

        <div className="carouselwrapper__background">
          <div className="d-flex justify-content-between align-items-end">
            <div className="carouselwrapper__background__content">
              <h1 className="carouselwrapper__background__content--heading">
                All carousel
              </h1>
              <span className="carouselwrapper__background__content--para">
                Upload Carousel to show in homepage carousel. Item will be
                displayed baed on the following order. Max File Size is 5MB per
                photo.
              </span>
            </div>
            <div className="carouselwrapper__background__btn">
              <button
                className="carouselwrapper__background__btn--add"
                onClick={handleShow}
              >
                Add Carousel
              </button>
            </div>
          </div>

          {/* add-modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div className="title">Add carousel</div>
              <Form>
                <div className="mt-4">
                  <InputField name="Title" placeholder="Carousel Title" />
                </div>
                <div className="mt-3">
                  {/* <InputField
                        name="Description"
                        placeholder="Carousel description"
                      /> */}
                  <label htmlFor="">Description</label>
                  <textarea
                    class="form-control"
                    id="description"
                    rows="5"
                    placeholder="Carousel description"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <InputField name="Link" placeholder="product link" />
                </div>
                <div className="mt-3">
                  <label htmlFor="">Images</label>
                  <p className="addproductwrapper__background--dragdroptitle">
                    <FiAlertTriangle />
                    <span>Please choose image below 5 mb</span>
                  </p>
                  <Previews />
                </div>

                <div className="mt-3 d-flex justify-content-end">
                  <button
                    className="carouselwrapper__background__btn--discard"
                    onClick={handleClose}
                  >
                    Discard
                  </button>
                  <button
                    className="carouselwrapper__background__btn--add"
                    onClick={handleClose}
                  >
                    Add Carousel
                  </button>
                </div>
              </Form>
            </Modal.Body>
            {/* <Modal.Footer>
                  <button variant="secondary" onClick={handleClose}>
                    Close
                  </button>
                  <button variant="primary" onClick={handleClose}>
                    Save Changes
                  </button>
                </Modal.Footer> */}
          </Modal>

          <p className="addproductwrapper__background--dragdroptitle">
            <FiAlertTriangle />
            <span>Please choose image below 5 mb</span>
          </p>

          <Row className="carouselwrapper__background--cards mb-3">
            <Col md={4}>
              <CarouselCard />
            </Col>
            <Col md={4}>
              <CarouselCard />
            </Col>
            <Col md={4}>
              <CarouselCard />
            </Col>
          </Row>

          <Row className="carouselwrapper__background--cards">
            <Col md={4}>
              <CarouselCard />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};
export default Carousel;
