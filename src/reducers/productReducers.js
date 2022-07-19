import {
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_CREATE_RESET,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCTALL_LIST_REQUEST,
  PRODUCTALL_LIST_SUCCESS,
  PRODUCTALL_LIST_FAIL,
  PRODUCT_ARCHIVELIST_REQUEST,
  PRODUCT_ARCHIVELIST_SUCCESS,
  PRODUCT_ARCHIVELIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_RESET,
  CREATE_SIMILAR_PRODUCT_REQUEST,
  CREATE_SIMILAR_PRODUCT_SUCCESS,
  CREATE_SIMILAR_PRODUCT_FAIL,
} from "../constants/productConstants";

export const productCreateReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        pages: action.payload.pages,
        page: parseInt(action.payload.page),
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const productALLListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCTALL_LIST_REQUEST:
      return { loading: true, products: [] };
    case PRODUCTALL_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        //   pages: action.payload.pages,
        //   page: parseInt(action.payload.page),
      };
    case PRODUCTALL_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const archiveProductListReducer = (
  state = { archiveproducts: [] },
  action
) => {
  switch (action.type) {
    case PRODUCT_ARCHIVELIST_REQUEST:
      return { loading: true, archiveproducts: [] };
    case PRODUCT_ARCHIVELIST_SUCCESS:
      return {
        loading: false,
        archiveproducts: action.payload,
        // pages: action.payload.pages,
        // page: parseInt(action.payload.page),
      };
    case PRODUCT_ARCHIVELIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: { reviews: [] } };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return { product: {} };
    default:
      return state;
  }
};

export const createSimilarProductReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_SIMILAR_PRODUCT_REQUEST:
      return { loading: true };
    case CREATE_SIMILAR_PRODUCT_SUCCESS:
      return { loading: false, relatedProduct: action.payload.related };
    case CREATE_SIMILAR_PRODUCT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
