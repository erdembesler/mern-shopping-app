import * as actionTypes from "../constants/productConstants";
import Product from "../../models/product";

export const getProductsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCTS_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCTS_SUCCESS:
      return {
        products: action.payload,
        loading: false,
      };
    case actionTypes.GET_PRODUCTS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };
    default:
      return state;
  }
};

const PRODUCT_INITIAL_STATE = {
  products: [],
};

export const productDetail = (state = PRODUCT_INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT:
      const newProduct = new Product(
        action.payload.id,
        action.payload.name,
        action.payload.description,
        action.payload.countInStock,
        action.payload.imageUrl,
        action.payload.price
      );
      return {
        ...state,
        products: state.products.concat(newProduct),
      };
    case actionTypes.UPDATE_PRODUCT:
      const productIndex = state.products.findIndex(
        (prod) => prod.id === action.payload.id
      );
      const updatedProduct = new Product(
        action.payload.id,
        action.payload.name,
        action.payload.description,
        action.payload.countInStock,
        action.payload.imageUrl,
        action.payload.price
      );
      const updatedProducts = [...state.products];
      updatedProducts[productIndex] = updatedProduct;
      return {
        ...state,
        products: updatedProducts,
      };
    case actionTypes.DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter((product) => product.id !== action.id),
      };

    default:
      return state;
  }
};
