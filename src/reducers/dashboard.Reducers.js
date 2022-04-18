import {
  DASHBOARD_LIST_FAIL,
  DASHBOARD_LIST_REQUEST,
  DASHBOARD_LIST_SUCCESS,
  DASHBOARD_EARNINGBARGRAPH_FAIL,
  DASHBOARD_EARNINGBARGRAPH_SUCCESS,
  DASHBOARD_EARNINGBARGRAPH_REQUEST,
  DASHBOARD_INCOME_FAIL,
  DASHBOARD_INCOME_SUCCESS,
  DASHBOARD_INCOME_REQUEST,
} from "../constants/dashboardConstants";

export const dashboardListReducer = (state = { dashboard: [] }, action) => {
  switch (action.type) {
    case DASHBOARD_LIST_REQUEST:
      return {
        loading: true,
      };
    case DASHBOARD_LIST_SUCCESS:
      return {
        loading: false,
        dashboard: action.payload,
      };
    case DASHBOARD_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const dashboardEarningBarGraphReducer = (
  state = { dashboard: {} },
  action
) => {
  switch (action.type) {
    case DASHBOARD_EARNINGBARGRAPH_REQUEST:
      return {
        loading: true,
      };
    case DASHBOARD_EARNINGBARGRAPH_SUCCESS:
      return {
        loading: false,
        dashboard: action.payload,
      };
    case DASHBOARD_EARNINGBARGRAPH_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const dashboardIncomeReducer = (state = { income: {} }, action) => {
  switch (action.type) {
    case DASHBOARD_INCOME_REQUEST:
      return {
        loading: true,
      };
    case DASHBOARD_INCOME_SUCCESS:
      return {
        loading: false,
        income: action.payload,
      };
    case DASHBOARD_INCOME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
