const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
export const apiEndPoints = {
  SIGNUP_API: BASE_URL + "/api/v1/signup",
  SIGNIN_API: BASE_URL + "/api/v1/signin",
  ADD_PRODUCT: BASE_URL + "/api/v1/addProduct",
  UPDATE_PRODUCT: BASE_URL + "/api/v1/updateProduct",
  DELETE_PRODUCT: BASE_URL + "/api/v1/deleteProduct",
  OUT_OF_STOCK: BASE_URL + "/api/v1/products",
  GET_ALLpRODUCT: BASE_URL + "/api/v1/getAllProduct",
  Get_OneProduct: BASE_URL + "/api/v1/getProductById",
};
