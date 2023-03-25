import axios from "axios";
import LocalStorageService from "../../storage/LocalStorageService";
// import router from "./router/router";
import qs from "qs";
// LocalstorageService
const localStorageService = LocalStorageService.getService();

// Set config defaults when creating the instance
const instance = axios.create({
  baseURL: "https://shopify6.interplay.iterate.ai",
});

// Add a request interceptor

instance.interceptors.request.use(
  (config) => {
    const token = localStorageService.getAccessToken();
    const userToken = localStorageService.getUserToken();
    const sass = LocalStorageService.getSaasToken();
    const custId = LocalStorageService.getCustId();
    if (
      token &&
      config.url !== "getCustomerDetails" &&
      token &&
      config.url !== "createCart" &&
      token &&
      config.url[0] !=='a' &&  token &&
      config.url !== `getCustomerCart/${custId}` &&
      token &&
      config.url[0] !=='d'
    ) {
      config.headers["accessToken"] = token;
    } else if (token && config.url === "createCart") {
      config.headers["customer_accesstoken"] = token;
      config.headers["saas_token"] = sass;
    } else if (token && config.url[0] ==='a') {
      config.headers["customer_accesstoken"] = token;
      config.headers["saas_token"] = sass;
    } else if (token && config.url[0] ==='d') {
      config.headers["customer_accesstoken"] = token;
      config.headers["saas_token"] = sass;
    } 
    
    else {
      // config.headers["customer_accesstoken"] = userToken;
    }
    config.headers["Content-Type"] = "application/json";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;

    try {
      if (
        error.response.status === 401 &&
        originalRequest.url === "http://13.126.66.2:1877/createAnonymousToken"
      ) {
        //  router.push('/login');
        return Promise.reject(error);
      }
    } catch {
      return Promise.reject(error);
    }

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const headers = {
        "Content-Type": "application/json",
      };
      return axios
        .get("http://13.126.66.2:1877/createAnonymousToken")
        .then((res) => {
          if (res.status === 200) {
            console.log("this res dddd", res);
            localStorageService.setToken(res?.data.access_token);
            originalRequest.headers.accessToken =
              localStorageService.getAccessToken();
            return axios(originalRequest);
          }
        });
    }
    return Promise.reject(error);
  }
);
export default instance;
