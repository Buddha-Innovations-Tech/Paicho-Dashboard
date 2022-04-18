import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
} from "./reducers/userReducers";

import {
  subscriberLoginReducer,
  subscriberRegisterReducer,
  subscriberDetailsReducer,
  subscriberUpdateProfileReducer,
  subscriberListReducer,
  subscriberDeleteReducer,
} from "./reducers/subscriberReducers";

import {
  categoryCreateReducer,
  subCategoryCreateReducer,
  categoryDetailsReducer,
  categoryListReducer,
  categoryUpdateReducer,
  categoryDeleteReducer,
} from "./reducers/categoryReducers";

import {
  productCreateReducer,
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  productUpdateReducer,
  createSimilarProductReducer,
} from "./reducers/productReducers";

import {
  orderCreateReducers,
  orderDetailsReducers,
  orderListReducer,
  orderUpdateReducer,
  reportListReducer,
} from "./reducers/orderReducers";
import {
  carouselListReducer,
  createCarouselReducer,
  carouselDeleteReducer,
  carouselUpdateReducer,
  carouselDetailsReducer,
} from "./reducers/carouselReducers";
import {
  dashboardListReducer,
  dashboardEarningBarGraphReducer,
  dashboardIncomeReducer,
} from "./reducers/dashboard.Reducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,

  subscriberLogin: subscriberLoginReducer,
  subscriberRegister: subscriberRegisterReducer,
  subscriberDetails: subscriberDetailsReducer,
  subscriberUpdateProfile: subscriberUpdateProfileReducer,
  subscriberList: subscriberListReducer,
  subscriberDelete: subscriberDeleteReducer,

  createCategory: categoryCreateReducer,
  createSubCategory: subCategoryCreateReducer,
  categoryDetails: categoryDetailsReducer,
  categoryList: categoryListReducer,
  categoryUpdate: categoryUpdateReducer,
  categoryDelete: categoryDeleteReducer,

  createProduct: productCreateReducer,
  productList: productListReducer,
  productDetails: productDetailsReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  createSimilarProduct: createSimilarProductReducer,

  createOrder: orderCreateReducers,
  orderDetails: orderDetailsReducers,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
  reportList: reportListReducer,

  carouselList: carouselListReducer,
  carouselCreate: createCarouselReducer,
  carouselDelete: carouselDeleteReducer,
  carouselUpdate: carouselUpdateReducer,
  carouselDetails: carouselDetailsReducer,

  dashboardList: dashboardListReducer,
  dashboardEarningBarGraph: dashboardEarningBarGraphReducer,
  dashboardIncome: dashboardIncomeReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const middleware = [thunk];

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
