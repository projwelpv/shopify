import { receiveProducts } from "..";
import { get, post } from "../../api/APIController";
import LocalStorageService from "../../storage/LocalStorageService";
import store from "../../Store";
export const getCustomerOrder = () => {
  let accessToken = LocalStorageService.getUserToken();

  let param = {
    customerAccessToken: accessToken,
    count: 100,
  };

  return (dispatch) => {
    post(`customerOrderList`, param, true)
      .then((response) => {
        if (response.status == 200) {
          dispatch({
            type: "GET_ORDER_HISTORY_SUCCESS",
            products: response.data,
          });
        }
      })
      .catch()
      .finally();
  };
};

export const getOrderDatails = async (id) => {
  let params = {
    orderId: id,
    count: 10,
  };

  // console.log("response", email);
  return post(`customerOrderDetails`, params)
    .then((response) => {
      if (response.status == 200) {
        return response;
        // dispatch({
        //   type: "GET_ORDER_HISTORY_SUCCESS",
        //   products: response.data,
        // });
      }
    })
    .catch()
    .finally();
};

export const getCustomerAddress = async () => {
  let accessToken = LocalStorageService.getUserToken();

  let param = {
    customerAccessToken: accessToken,
    count: 100,
  };

  return post(`customerAddressList`, param)
    .then((response) => {
      if (response.status == 200) {
        return response;
      }
    })
    .catch()
    .finally();
};
