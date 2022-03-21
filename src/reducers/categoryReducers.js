import {
  CATEGORY_ADD_REQUEST,
  CATEGORY_ADD_SUCCESS,
  CATEGORY_ADD_FAIL,
  CATEGORY_ADD_RESET,
  SUB_CATEGORY_CREATE_REQUEST,
  SUB_CATEGORY_CREATE_SUCCESS,
  SUB_CATEGORY_CREATE_FAIL,
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_UPDATE_REQUEST,
  CATEGORY_UPDATE_SUCCESS,
  CATEGORY_UPDATE_FAIL,
  CATEGORY_UPDATE_RESET,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
} from "../constants/categoryConstants";

export const categoryCreateReducer = (
  state = { loading: true, category: {} },
  action
) => {
  switch (action.type) {
    case CATEGORY_ADD_REQUEST:
      return { loading: true };
    case CATEGORY_ADD_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_ADD_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_ADD_RESET:
      return {};
    default:
      return state;
  }
};

export const subCategoryCreateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_CREATE_REQUEST:
      return { loading: true };
    case SUB_CATEGORY_CREATE_SUCCESS:
      return { loading: false, category: action.payload };
    case SUB_CATEGORY_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryDetailsReducer = (
  state = { category: {}, subCategory: [] },
  action
) => {
  switch (action.type) {
    case CATEGORY_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DETAILS_SUCCESS:
      return {
        loading: false,
        category: action.payload,
        subCategory: action.payload.subCategories,
        success: true,
      };
    case CATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return { category: [], subCategory: [] };
    default:
      return state;
  }
};

export const categoryListReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case CATEGORY_LIST_REQUEST:
      return { loading: true, categories: [] };
    case CATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        categories: action.payload.categories,
        success: true,
        pages: action.payload.pages,
      };
    case CATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const categoryUpdateReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_UPDATE_REQUEST:
      return { loading: true };
    case CATEGORY_UPDATE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CATEGORY_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = { category: {} }, action) => {
  switch (action.type) {
    case CATEGORY_DELETE_REQUEST:
      return { ...state, loading: true };
    case CATEGORY_DELETE_SUCCESS:
      return { loading: false, success: true, category: action.payload };
    case CATEGORY_DELETE_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
