import { post, get, deleteCall, putCall } from "../../api/APIController";
import LocalStorageService from "../../storage/LocalStorageService";
import store from "../../Store";

export const addToCartItem = async (id, productID, allPrices) => {
  // let data = {
  //   reference: localStorage.getItem("MYID"),
  //   data: {
  //     id: id,
  //     type: "cart_item",
  //     quantity: 1,
  //     sku: sku,
  //   },
  // };
  const custId = LocalStorageService.getCustId();
  let data = {
    customerId: custId,
    siteCode: "main",
    type: "shopping",
    channel: {
      name: "storefront",
      source: "https://your-storefront.com/",
    },
    currency: "USD",
  };
  console.log("this is srikanth all prices", allPrices);

  let createCartData = {
    itemYrn: `urn:yaas:saasag:caasproduct:product:cnetric;${productID}`,
    price: {
      priceId: allPrices[0]?.id,
      effectiveAmount: 2,
      originalAmount: 2.75,
      currency: "USD",
    },
    quantity: 1,
  };

  // post("createCart", data, true)
  //   .then((response) => {
  //     if (response.status == 201) {

  //     }
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   })
  //   .finally();

  post(`addItemToCart/${id}`, createCartData, true)
    .then((response) => {
      console.log("this is add item to cart");
    })
    .catch()
    .finally();
};

export const deleteCart = async () => {
  let url = `carts/${localStorage.getItem("MYID")}`;

  deleteCall(url)
    .then((response) => {
      if (response.status == 200) {
        store.dispatch({
          type: "DELETE_CART_ITEMS",
          cartItems: [],
        });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};

export const deleteCartItems = async (id) => {
  let url = `carts/${localStorage.getItem("MYID")}/items/${id}`;

  deleteCall(url)
    .then((response) => {
      if (response.status == 200) {
        console.log(" CART DELETED", response);
        // toast.success("Item has been removed");
        // store.dispatch({
        //   type: "DELETE_CART_ITEMS",
        //   cartItems: [],
        // });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};

export const placeOrder = async (params) => {
  let url = `carts/${localStorage.getItem("MYID")}/checkout`;
  console.log("Checkout", url, params);

  return new Promise((resolve, reject) => {
    post(url, params)
      .then((response) => {
        if (response.status == 200) {
          console.log("ORDER PLACED", response);
          deleteCart();
          resolve(true);
        }
      })
      .catch((error) => {
        reject(false);
        console.log(error);
      })
      .finally();
  });
};

export const getCartItems = () => {
  let url = `carts/${localStorage.getItem("MYID")}/items`;

  return (dispatch) => {
    return get(url)
      .then((response) => {
        if (response.status == 200) {
          let products = [];
          response.data.data.map((info) => {
            let product = {
              ProductID: info.product_id,
              ProductImage: info.image.href ? info.image.href : "",
              ProductName: info.name,
              Qty: info.quantity,
              Rate: info.meta.display_price.with_tax.unit.amount / 100,
              Sku: info.sku,
              StockStatus: "In Stock",
              cart_id: info.id,

              // id: info.id,
              // name: info.name,
              // pictures: [info.image.href ? info.image.href : ""],
              // stock: info.status == "draft" ? 0 : 1,
              // price: info.meta.display_price.with_tax.unit.amount / 100,
              // discount: 0,
              // salePrice: info.meta.display_price.with_tax.unit.amount / 100,
              // description: info.description,
              // rating: 4,
              // tags: [],
              // size: ["100 CM", "90 CM", "95 CM"],
              // sku: info.sku,
              // category: "",
              // colors: ["black", "gray", "red"],
            };
            products.push(product);
          });

          dispatch({
            type: "GET_CART_SUCCESS",
            cartItems: { items: products, meta: response.data.meta },
          });
          return products;
        }
      })
      .catch()
      .finally();
  };
};

export const updateCartQty = (id, qty) => {
  let url = `/carts/${localStorage.getItem("MYID")}/items/${id}`;
  let params = {
    data: {
      id: id,
      type: "cart_item",
      quantity: qty,
    },
  };

  return (dispatch) => {
    return putCall(url, params)
      .then((response) => {
        if (response.status == 200) {
          return true;
        } else {
          return false;
        }
      })
      .catch((error) => {
        return false;
        console.log(error);
      })
      .finally();
  };
};

export const deleteCartItemsNew = async (id, allPrices, cartID) => {
  let pricelist = [];
  allPrices.map((each, index) => {
    if (each.itemId.id === id) {
      pricelist.push(each);
    }
  });
  const custId = LocalStorageService.getCustId();
  let url = `deleteCartItem/${cartID}/${id}`;
  let data = {
    itemYrn: `urn:yaas:saasag:caasproduct:product:cnetric;${id}`,
    price: {
      priceId: allPrices[0]?.id,
      effectiveAmount: 2,
      originalAmount: 2.75,
      currency: "USD",
    },
    quantity: 1,
  };

  deleteCall(url, data)
    .then((response) => {
      if (response.status == 200) {
        console.log(" CART DELETED", response);
        // toast.success("Item has been removed");
        // store.dispatch({
        //   type: "DELETE_CART_ITEMS",
        //   cartItems: [],
        // });
      }
    })
    .catch((error) => {
      console.log(error);
    })
    .finally();
};
