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
  CAROUSEL_CREATE_RESET,
  CAROUSEL_UPDATE_REQUEST,
  CAROUSEL_UPDATE_SUCCESS,
  CAROUSEL_UPDATE_FAIL,
  CAROUSEL_DETAILS_REQUEST,
  CAROUSEL_DETAILS_SUCCESS,
  CAROUSEL_DETAILS_FAIL,
} from "../constants/carouselConstants";

export const carouselListReducer = (state = { carousel: [] }, action) => {
  switch (action.type) {
    case CAROUSEL_LIST_REQUEST:
      return { loading: true, carousel: [] };
    case CAROUSEL_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const carouselDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CAROUSEL_DELETE_REQUEST:
      return { ...state, loading: true };
    case CAROUSEL_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case CAROUSEL_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createCarouselReducer = (
  state = { loading: true, carousel: {} },
  action
) => {
  switch (action.type) {
    case CAROUSEL_CREATE_REQUEST:
      return { loading: true };
    case CAROUSEL_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        carousel: action.payload,
      };
    case CAROUSEL_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case CAROUSEL_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const carouselUpdateReducer = (state = { carousel: {} }, action) => {
  switch (action.type) {
    case CAROUSEL_UPDATE_REQUEST:
      return { ...state, loading: true, success: false };
    case CAROUSEL_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case CAROUSEL_UPDATE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const carouselDetailsReducer = (state = { carousel: {} }, action) => {
  switch (action.type) {
    case CAROUSEL_DETAILS_REQUEST:
      return { loading: true, ...state };
    case CAROUSEL_DETAILS_SUCCESS:
      return { loading: false, carousel: action.payload };
    case CAROUSEL_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
