import axios from "axios";
import {
  SUBSCRIBER_LOGIN_REQUEST,
  SUBSCRIBER_LOGIN_SUCCESS,
  SUBSCRIBER_LOGIN_FAIL,
  SUBSCRIBER_LOGOUT,
  SUBSCRIBER_REGISTER_REQUEST,
  SUBSCRIBER_REGISTER_SUCCESS,
  SUBSCRIBER_REGISTER_FAIL,
  SUBSCRIBER_DETAILS_REQUEST,
  SUBSCRIBER_DETAILS_SUCCESS,
  SUBSCRIBER_DETAILS_FAIL,
  SUBSCRIBER_UPDATE_PROFILE_REQUEST,
  SUBSCRIBER_UPDATE_PROFILE_SUCCESS,
  SUBSCRIBER_UPDATE_PROFILE_FAIL,
  SUBSCRIBER_LIST_REQUEST,
  SUBSCRIBER_LIST_SUCCESS,
  SUBSCRIBER_LIST_FAIL,
  SUBSCRIBER_DELETE_REQUEST,
  SUBSCRIBER_DELETE_SUCCESS,
  SUBSCRIBER_DELETE_FAIL,
} from "../constants/subscriberConstants";

export const login = (email, password, mobilenumber) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIBER_LOGIN_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/subscribers/login",
      { email, password, mobilenumber },
      config
    );

    dispatch({
      type: SUBSCRIBER_LOGIN_SUCCESS,
      payload: data,
    });

    localStorage.setItem("subscriberInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: SUBSCRIBER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("subscriberInfo");
  dispatch({ type: SUBSCRIBER_LOGOUT });
};

export const register =
  (
    firstname,
    lastname,
    email,
    password,
    address,
    mobilenumber,
    provider,
    orders
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: SUBSCRIBER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/api/subscribers/Register",
        {
          firstname,
          lastname,
          email,
          password,
          address,
          mobilenumber,
          provider,
          orders,
        },
        config
      );

      dispatch({
        type: SUBSCRIBER_REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBSCRIBER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getSubscriberDetails = () => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIBER_DETAILS_REQUEST,
    });

    // const {
    //   subscriberLogin: { subscriberInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${subscriberInfo.token}`,
      },
    };

    const { data } = await axios.get(` /api/subscribers/profile/me`, config);

    dispatch({
      type: SUBSCRIBER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIBER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const udpateSubscriberProfile =
  (subscriber) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SUBSCRIBER_UPDATE_PROFILE_REQUEST,
      });

      const {
        subscriberLogin: { subscriberInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${subscriberInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/subscribers/profile/me`,
        subscriber,
        config
      );

      dispatch({
        type: SUBSCRIBER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBSCRIBER_UPDATE_PROFILE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listSubscribers = (pageNumber) => async (dispatch) => {
  try {
    dispatch({
      type: SUBSCRIBER_LIST_REQUEST,
    });

    // const {
    //   subscriberLogin: { subscriberInfo },
    // } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${subscriberInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/subscribers?pagenumber=${pageNumber}`,
      config
    );
    dispatch({
      type: SUBSCRIBER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIBER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SUBSCRIBER_DELETE_REQUEST,
    });

    const {
      subscriberLogin: { subscriberInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${subscriberInfo.token}`,
      },
    };

    await axios.delete(`/api/subscribers/${id}`, config);

    dispatch({
      type: SUBSCRIBER_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: SUBSCRIBER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
