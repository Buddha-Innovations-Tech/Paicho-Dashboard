import {
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
  DASHBOARD_EARNINGBARGRAPH_FAIL,
  DASHBOARD_EARNINGBARGRAPH_REQUEST,
  DASHBOARD_EARNINGBARGRAPH_SUCCESS,
  DASHBOARD_INCOME_FAIL,
  DASHBOARD_INCOME_REQUEST,
  DASHBOARD_INCOME_SUCCESS,
} from "../constants/dashboardConstants";
import axios from "axios";

export const listDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DASHBOARD_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/dashboard/result`, config);

    dispatch({
      type: DASHBOARD_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const earningDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DASHBOARD_EARNINGBARGRAPH_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/dashboard/earning`, config);
    console.log(data);
    dispatch({
      type: DASHBOARD_EARNINGBARGRAPH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_EARNINGBARGRAPH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const incomeDashboard = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: DASHBOARD_INCOME_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/income/difference`, config);
    console.log(data);
    dispatch({
      type: DASHBOARD_INCOME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DASHBOARD_INCOME_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
