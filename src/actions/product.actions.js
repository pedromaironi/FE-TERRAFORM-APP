// product.actions.js

const API_URL = 'http://34.19.106.52/products';

export const FETCH_PRODUCTS_REQUEST = 'FETCH_PRODUCTS_REQUEST';
export const FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS';
export const FETCH_PRODUCTS_FAILURE = 'FETCH_PRODUCTS_FAILURE';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const EDIT_PRODUCT = 'EDIT_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

const fetchProductsRequest = () => ({ type: FETCH_PRODUCTS_REQUEST });
const fetchProductsSuccess = (data) => ({ type: FETCH_PRODUCTS_SUCCESS, payload: data });
const fetchProductsFailure = (error) => ({ type: FETCH_PRODUCTS_FAILURE, payload: error });

export const fetchProducts = (token) => async (dispatch, getState) => {
  dispatch(fetchProductsRequest());
  try {
    const response = await fetch(API_URL, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await response.json();
    dispatch(fetchProductsSuccess(data));
  } catch (error) {
    dispatch(fetchProductsFailure(error.message));
  }
};

export const addProduct = (product, token) => async (dispatch) => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    dispatch({ type: ADD_PRODUCT, payload: data });
  } catch (error) {
    console.error('Error adding product:', error);
  }
};

export const editProduct = (product, token) => async (dispatch) => {
  try {
    const response = await fetch(`${API_URL}/${product._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(product),
    });
    const data = await response.json();
    dispatch({ type: EDIT_PRODUCT, payload: data });
  } catch (error) {
    console.error('Error editing product:', error);
  }
};

export const deleteProduct = (productId, token) => async (dispatch) => {
  try {
    await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    dispatch({ type: DELETE_PRODUCT, payload: productId });
  } catch (error) {
    console.error('Error deleting product:', error);
  }
};
