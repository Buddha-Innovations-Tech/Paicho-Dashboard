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

const Carousel = () => {
  const [uploading, setUploading] = useState(false);

  const { userInfo } = useSelector((state) => state.userLogin);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { loading: carouselListLoading, carousel } = useSelector(
    (state) => state.carouselList
  );

  const { success } = useSelector((state) => state.carouselCreate);

  const addCategoryComp = async (e) => {
    e.preventDefault();
    dispatch(createCarousel({ title, link, description, image }));
    handleClose();
    setTitle("");
    setDescription("");
    setLink("");
  };
  const uploadHeroImageHandler = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);

    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/uploads", formData, config);
      console.log(data);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo]);

  useEffect(() => {
    dispatch(listCarousel());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listCarousel());
  }, [success]);

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
                  <Previews image={image} setImage={setImage} />
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

          <p className="addproductwrapper__background--dragdroptitle">
            <FiAlertTriangle />
            <span>Please choose image below 5 mb</span>
          </p>

          <Row className="carouselwrapper__background--cards mb-3 gy-4">
            {!carouselListLoading &&
              carousel.map((i, index) => (
                <Col md={4}>
                  <CarouselCard key={i._id} carousel={i} />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
};
export default Carousel;
