import axios from "axios";

import {
  CAROUSEL_CREATE_FAIL,
  CAROUSEL_CREATE_REQUEST,
  CAROUSEL_CREATE_SUCCESS,
  CAROUSEL_DELETE_FAIL,
  CAROUSEL_DELETE_REQUEST,
  CAROUSEL_DELETE_SUCCESS,
  CAROUSEL_LIST_FAIL,
  CAROUSEL_LIST_REQUEST,
  CAROUSEL_LIST_SUCCESS,
  CAROUSEL_UPDATE_REQUEST,
  CAROUSEL_UPDATE_SUCCESS,
  CAROUSEL_UPDATE_FAIL,
  CAROUSEL_DETAILS_REQUEST,
  CAROUSEL_DETAILS_SUCCESS,
  CAROUSEL_DETAILS_FAIL,
} from "../constants/carouselConstants";

export const listCarousel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CAROUSEL_LIST_REQUEST });
    const { data } = await axios.get(`/api/carousels`);
    dispatch({
      type: CAROUSEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const deleteCarousel = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/carousels/${id}`, config);
    dispatch({
      type: CAROUSEL_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const createCarousel = (carousel) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/carousels/add`, carousel, config);
    dispatch({
      type: CAROUSEL_CREATE_SUCCESS,
      payload: data,
    });
    console.log(data);
  } catch (error) {
    dispatch({
      type: CAROUSEL_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCarousel = (carousel, id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CAROUSEL_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/carousels/${id}`, carousel, config);
    console.log(data);
    dispatch({
      type: CAROUSEL_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listCarouselDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: CAROUSEL_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/carousels/${id}`, config);

    dispatch({
      type: CAROUSEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CAROUSEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
