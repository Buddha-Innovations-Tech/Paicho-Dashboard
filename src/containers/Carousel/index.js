import { Row, Col, Form, InputGroup, FormControl } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import CarouselCard from "../../components/CarouselCard";
import InputField from "../../components/InputField";
import Previews from "../../components/DragAndDrop";
import { listCarousel, createCarousel } from "../../actions/carouselAction";
import Loader from "../../components/Loader";

const Carousel = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [image, setImage] = useState("");
  const [imgarray, setImgArray] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading: carouselListLoading, carousel } = useSelector(
    (state) => state.carouselList
  );
  const { success: carouselUpdateSuccess } = useSelector(
    (state) => state.carouselUpdate
  );
  const { success: carouselDeleteSuccess } = useSelector(
    (state) => state.carouselDelete
  );

  const { success } = useSelector((state) => state.carouselCreate);

  const addCategoryComp = async (e) => {
    e.preventDefault();
    dispatch(
      createCarousel({
        title,
        link,
        description,
        image: imgarray.map((i) => i),
      })
    );
    handleClose();
    setTitle("");
    setDescription("");
    setLink("");
  };

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    if (carouselListLoading) {
      dispatch(listCarousel());
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCarousel());
  }, [success]);

  useEffect(() => {
    if (carouselUpdateSuccess) {
      dispatch(listCarousel());
    }
  }, [carouselUpdateSuccess]);
  useEffect(() => {
    if (carouselDeleteSuccess) {
      dispatch(listCarousel());
    }
  }, [carouselDeleteSuccess]);

  // useEffect(() => {
  //   dispatch(listCarousel());
  // }, [dispatch]);

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
                onClick={() => {
                  handleShow();
                }}
              >
                Add Carousel
              </button>
            </div>
          </div>
          {/* add-modal */}
          <Modal show={show} onHide={handleClose}>
            <Modal.Body>
              <div className="title">Add carousel</div>
              <Form onSubmit={addCategoryComp}>
                <div className="mt-4">
                  <label htmlFor="">Title</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="title"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Description</label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="5"
                    name="des"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Carousel description"
                  ></textarea>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Link</label> <br />
                  <InputGroup>
                    <FormControl
                      type="text"
                      name="link"
                      placeholder="Link"
                      value={link}
                      onChange={(e) => setLink(e.target.value)}
                      required
                    />
                  </InputGroup>
                </div>
                <div className="mt-3">
                  <label htmlFor="">Images</label>
                  <p className="addproductwrapper__background--dragdroptitle">
                    <FiAlertTriangle />
                    <span>Please choose image below 5 mb</span>
                  </p>
                  <Previews imgarray={imgarray} setImgArray={setImgArray} />
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
                    onClick={() => {
                      addCategoryComp();
                      handleClose();
                    }}
                  >
                    Add Carousel
                  </button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          {!carouselListLoading ? (
            <>
              <p className="addproductwrapper__background--dragdroptitle">
                <FiAlertTriangle />
                <span>Please choose image below 5 mb</span>
              </p>

              {carousel.carousels && carousel.carousels.length > 0 && (
                <Row className="carouselwrapper__background--cards mb-3 gy-4">
                  {!carouselListLoading &&
                    carousel.carousels.map((i) => (
                      <Col md={4}>
                        <CarouselCard key={i._id} carousel={i} />
                      </Col>
                    ))}
                </Row>
              )}
            </>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </>
  );
};
export default Carousel;
