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
export const subscriberLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBER_LOGIN_REQUEST:
      return { loading: true };
    case SUBSCRIBER_LOGIN_SUCCESS:
      return { loading: false, subscriberInfo: action.payload };
    case SUBSCRIBER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case SUBSCRIBER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const subscriberRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBER_REGISTER_REQUEST:
      return { loading: true };
    case SUBSCRIBER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIBER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const subscriberDetailsReducer = (
  state = { subscriber: {} },
  action
) => {
  switch (action.type) {
    case SUBSCRIBER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIBER_DETAILS_SUCCESS:
      return { loading: false, subscriber: action.payload, success: true };
    case SUBSCRIBER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subscriberUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBER_UPDATE_PROFILE_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIBER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, subscriberInfo: action.payload };
    case SUBSCRIBER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subscriberListReducer = (state = { subscribers: [] }, action) => {
  switch (action.type) {
    case SUBSCRIBER_LIST_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIBER_LIST_SUCCESS:
      return { loading: false, subscribers: action.payload, success: true };
    case SUBSCRIBER_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const subscriberDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case SUBSCRIBER_DELETE_REQUEST:
      return { ...state, loading: true };
    case SUBSCRIBER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case SUBSCRIBER_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
