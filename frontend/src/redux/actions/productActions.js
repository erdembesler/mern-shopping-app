import * as actionTypes from "../constants/productConstants";
import axios from "axios";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    const { data } = await axios.get("/api/products");

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//addProduct
export const createProduct = (newProduct) => async (dispatch) => {
  try {
    const response = await axios.create("/api/products/", newProduct);
    const resData = await response.json();
    dispatch({
      type: actionTypes.ADD_PRODUCT,
      payload: {
        id: resData._id,
        name: resData.name,
        description: resData.description,
        countInStock: resData.countInStock,
        imageUrl: resData.imageUrl,
        price: resData.price,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

//editProduct
export const updateProduct = (updatedProduct) => async (dispatch) => {
  try {
    const response = await axios.post(
      `/api/products/${updatedProduct.id}`,
      updatedProduct
    );
    const resData = await response.json();
    dispatch({
      type: actionTypes.UPDATE_PRODUCT,
      payload: {
        id: resData._id,
        name: updatedProduct.name,
        description: updatedProduct.description,
        countInStock: updatedProduct.countInStock,
        imageUrl: updatedProduct.imageUrl,
        price: updatedProduct.price,
      },
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

//removeProduct
export const deleteProduct = (id) => async (dispatch) => {
  try {
    await axios.delete(`/api/products/${id}`);

    dispatch({
      type: actionTypes.DELETE_PRODUCT,
      id: id,
    });
  } catch (error) {
    throw new Error("Something went wrong!");
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};
