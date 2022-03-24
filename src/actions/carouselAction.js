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
} from "../constants/carouselConstants";

export const listCarousel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CAROUSEL_LIST_REQUEST });
    const { data } = await axios.get(`/api/carousel`);
    dispatch({
      type: CAROUSEL_LIST_SUCCESS,
      payload: data.images,
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

    await axios.delete(`/api/carousel/${id}`, config);
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

    const { data } = await axios.post(`/api/carousel`, carousel, config);
    dispatch({
      type: CAROUSEL_CREATE_SUCCESS,
      payload: data,
    });
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
