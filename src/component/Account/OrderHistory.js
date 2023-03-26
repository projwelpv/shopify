/**
 *  Account Page Order History
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import OrderData from "../../api/userOrder";
import Sitebar from "./Sitebar";
import { getCustomerOrder, getOrderDatails } from "../../actions/Order/index";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import QrCodeScreen from "../Qrcode";
import LocalStorageService from "../../storage/LocalStorageService";

// const ordersData = {
//   data: {
//     customer: {
//       defaultAddress: {
//         id: "gid://shopify/MailingAddress/9092005167416?model_name=CustomerAddress\u0026customer_access_token=NYUvVJF335o2En_7CWJwHbkVGaLyDkf_Znv27I-ND_tymJgE9j3t1B0rsuqvwQZhzEqfXexI12jnk0zNI4iXEQxdaLvuM2MX3RCbkKViimxk0BDYPgFBnbB5q4-Xx9hnmDH4x2_hwoxhZTdR2VwkcTHTPQaoTllTF0DzaysBtB2TXEP_213XAAzTfeUNai2kAoiVWYZ6nJaT87JLu6fbaD3-nS0x32ng1mtAQRMokDvVbjg8eXYBDQ2ZJxh-UJvX",
//         firstName: "Anuj",
//         lastName: "Rajput",
//         company: "cnetric",
//         address1: "5331 Rexford Court,",
//         address2: "Montgomery AL",
//         city: "Montgomery",
//         country: "United States",
//         province: "Alabama",
//         provinceCode: "AL",
//         zip: "36116",
//         phone: "(202) 555-0122",
//         formatted: [
//           "Anuj Rajput",
//           "cnetric",
//           "5331 Rexford Court,",
//           "Montgomery AL",
//           "Montgomery AL 36116",
//           "United States",
//         ],
//       },
//       orders: {
//         totalCount: "1",
//         edges: [
//           {
//             node: {
//               id: "gid://shopify/Order/5283635822904?key=d345ebaf8c41bffcd725dbb79334f6fd",
//               processedAt: "2023-03-26T08:49:42Z",
//               orderNumber: 1013,
//               name: "#1013",
//               financialStatus: "PAID",
//               fulfillmentStatus: "UNFULFILLED",
//               totalPrice: { amount: "69.99", currencyCode: "USD" },
//             },
//           },
//         ],
//       },
//     },
//   },
// };

// const viewOrder ={
//   "data": {
//     "node": {
//       "id": "gid://shopify/Order/5283635822904?key=d345ebaf8c41bffcd725dbb79334f6fd",
//       "name": "#1013",
//       "orderNumber": 1013,
//       "processedAt": "2023-03-26T08:49:42Z",
//       "financialStatus": "PAID",
//       "fulfillmentStatus": "UNFULFILLED",
//       "shippingAddress": {
//         "id": "gid://shopify/MailingAddress/18124652380472?model_name=Address",
//         "firstName": "Anuj",
//         "lastName": "Rajput",
//         "company": "cnetric",
//         "address1": "5331 Rexford Court,",
//         "address2": "Montgomery AL",
//         "city": "Montgomery",
//         "country": "United States",
//         "province": "Alabama",
//         "provinceCode": "AL",
//         "zip": "36116",
//         "phone": "(202) 555-0122",
//         "formatted": [
//           "Anuj Rajput",
//           "cnetric",
//           "5331 Rexford Court,",
//           "Montgomery AL",
//           "Montgomery AL 36116",
//           "United States"
//         ]
//       },
//       "lineItems": {
//         "edges": [
//           {
//             "node": {
//               "title": "Anchor Bracelet Mens",
//               "quantity": 1,
//               "originalTotalPrice": {
//                 "amount": "69.99",
//                 "currencyCode": "USD"
//               },
//               "variant": {
//                 "id": "gid://shopify/ProductVariant/44761260196152",
//                 "sku": null
//               }
//             }
//           }
//         ]
//       },
//       "subtotalPriceV2": { "amount": "69.99", "currencyCode": "USD" },
//       "totalShippingPriceV2": { "amount": "0.0", "currencyCode": "USD" },
//       "totalPriceV2": { "amount": "69.99", "currencyCode": "USD" }
//     }
//   }
// }

class OrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      Order: OrderData,
      ViewOrder: "",
      viewQRCode: "",
      qrCodeValue: "",
      viewDetails: {},
    };
    this.toggle = this.toggle.bind(this);
    this.props.getCustomerOrder();
  }
  toggle() {
    this.setState((prevState) => ({
      modal: !prevState.modal,
    }));
  }
  onViewOrder(data) {
    this.setState({
      ...this.state,
      ViewOrder: data,
    });
    this.toggle();
  }
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  getDate(data, d) {
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let newDate = new Date(data);
    return (
      newDate.getDate() +
      d +
      " " +
      months[newDate.getMonth()] +
      " " +
      newDate.getFullYear()
    );
  }

  render() {
    const OrderHistory = this.state.Order;
    const ViewOrderdata = this.state.ViewOrder;
    const ordersData = this.props.orderHistory;
    console.log("This is srikanth reddy", this.state.viewDetails);
    const viewOrder = this.state.viewDetails;
    return (
      <div>
        <div className="inner-intro">
          <Container>
            <QrCodeScreen
              value={this.state.qrCodeValue}
              isOpen={this.state.viewQRCode}
              onClose={() => {
                this.setState({ viewQRCode: !this.state.viewQRCode });
              }}
            />
            <Row className="intro-title align-items-center">
              <Col md={6} className="text-left">
                <div className="intro-title-inner">
                  <h1>My Account</h1>
                </div>
              </Col>
              <Col md={6} className="text-right">
                <ul className="ciyashop_breadcrumbs page-breadcrumb breadcrumbs">
                  <li className="home">
                    <span>
                      <Link className="bread-link bread-home" to="/">
                        Home
                      </Link>
                    </span>
                  </li>
                  <li>
                    <span>My Account</span>
                  </li>
                </ul>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="section-ptb">
          <Container>
            <Row>
              <Sitebar />
              <Col lg={9} className="mt-4 mt-lg-0">
                <Row>
                  <Col lg={12}>
                    <div className="table-responsive">
                      <table class="table orderhistory-table mb-0">
                        <thead class="thead-light">
                          <tr>
                            <th scope="col">ORDER</th>
                            <th scope="col">DATE</th>
                            <th scope="col">PAYMENT STATUS</th>
                            {/* <th scope="col">Order Type</th> */}
                            {/* <th scope="col">Shipping</th> */}
                            <th scope="col">FULFILLMENT STATUS</th>
                            <th scope="col">TOTAL</th>
                            <th scope="col">ACTION</th>
                          </tr>
                        </thead>
                        {ordersData !== null &&
                        Array.isArray(
                          ordersData?.data?.customer?.orders.edges
                        ) ? (
                          <tbody>
                            {ordersData.data.customer.orders.edges.map(
                              (orderData) => (
                                <tr>
                                  <td>{orderData.node.orderNumber}</td>
                                  <td>
                                    {this.getDate(
                                      orderData.node.processedAt,
                                      0
                                    )}
                                  </td>

                                  {/* <td style={{ textTransform: "capitalize" }}>
                                  {Ordervalue.fulfill_type.replace(/_/g, " ")}
                                </td> */}

                                  <td>{orderData.node.financialStatus}</td>
                                  <td>{orderData.node.fulfillmentStatus}</td>
                                  <td>${orderData.node.totalPrice.amount}</td>
                                  <td>
                                    <Link
                                      className="action-button"
                                      onClick={() =>
                                        this.setState(
                                          // { qrCodeValue: Ordervalue?.order_no },
                                          () => {
                                            this.setState({ modal: true });
                                            getOrderDatails(
                                              orderData.node.id
                                            ).then((res) => {
                                              this.setState({
                                                ...this.state,
                                                viewDetails: res.data,
                                              });
                                            });
                                          }
                                        )
                                      }
                                      href="#"
                                    >
                                      View
                                    </Link>
                                  </td>
                                </tr>
                              )
                            )}
                          </tbody>
                        ) : null}
                      </table>
                    </div>
                  </Col>
                </Row>
                {/* modal-view */}
                <Modal
                  isOpen={this.state.modal}
                  toggle={this.toggle}
                  className="modal-view modal-lg modal-dialog-centered"
                >
                  <ModalHeader toggle={this.toggle}></ModalHeader>
                  {viewOrder !== null ? (
                    <ModalBody>
                      <div className="success-screen">
                        <div className="thank-you text-center">
                          <i className="fa fa-check-circle-o"></i>

                          <h1 className="text-white">
                            Confirmation #{viewOrder?.data?.node?.orderNumber}.
                            Thank you{" "}
                            {viewOrder?.data?.node?.shippingAddress?.firstName}!
                          </h1>
                          <span>
                            Your order has been placed successfully, Your order
                            will be processed soon!
                          </span>
                          {/* <strong className="text-white">
                            Transaction ID:{viewOrder?.data?.node.orderNumber}
                          </strong> */}
                        </div>
                        <div className="delivery p-4 p-md-5 bg-light text-center">
                          <span className="h5">Expected Date Of Delivery</span>
                          <h2 className="mb-0 mt-2">
                            {this.getDate(viewOrder?.data?.node.processedAt, 5)}
                          </h2>
                        </div>
                        <div className="pt-4 px-4 pt-md-5 px-md-5 pb-3">
                          <Row>
                            <Col lg={6}>
                              <h6>Ship To</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  {
                                    viewOrder?.data?.node?.shippingAddress
                                      ?.firstName
                                  }
                                </li>
                                <li>
                                  {
                                    viewOrder?.data?.node?.shippingAddress
                                      ?.address1
                                  }
                                </li>
                                <li>
                                  {
                                    viewOrder?.data?.node?.shippingAddress
                                      ?.address1
                                  }
                                </li>
                                <li>
                                  {viewOrder?.data?.node?.shippingAddress?.city}
                                </li>
                                <li>
                                  {
                                    viewOrder?.data?.node?.shippingAddress
                                      ?.phone
                                  }
                                </li>
                                <li>
                                  {
                                    viewOrder?.data?.node?.shippingAddress
                                      ?.country
                                  }
                                </li>
                              </ul>
                            </Col>
                            <Col lg={6} className="text-lg-right mt-4 mt-lg-0">
                              <h6>Summary</h6>
                              <ul className="list-unstyled mb-0">
                                <li>
                                  <span>Order ID:</span>{" "}
                                  <strong>
                                    #{viewOrder?.data?.node?.orderNumber}
                                  </strong>
                                </li>
                                <li>
                                  <span>Order Date:</span>{" "}
                                  <strong>
                                    {this.getDate(
                                      viewOrder?.data?.node?.processedAt,
                                      0
                                    )}
                                  </strong>
                                </li>
                                <li>
                                  <span>Order Total:</span>{" "}
                                  <strong>
                                    $
                                    {/* {ViewOrderdata.price +
                                      ViewOrderdata.tax +
                                      50} */}
                                    {
                                      viewOrder?.data?.node?.totalPriceV2
                                        ?.amount
                                    }
                                    .00
                                  </strong>
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </div>
                        <div className="ordered-detail">
                          <h5 className="mb-4">Your Ordered Details</h5>
                          <div className="table-responsive">
                            <table class="table mb-0">
                              <tbody>
                                <tr className="ordered-item">
                                  <td className="ordered-image">
                                    {/* <img
                                      alt="img 01"
                                      src={require(`../../assets/images/shop/img-02.jpg`)}
                                      className="img-fluid"
                                    /> */}

                                    <strong>
                                      {viewOrder?.data?.node?.orderNumber}
                                    </strong>
                                  </td>
                                  <td className="ordered-name">
                                    <h6 className="mb-0">Product Name</h6>
                                    <span>
                                      {" "}
                                      {
                                        viewOrder?.data?.node?.lineItems
                                          ?.edges[0]?.node.title
                                      }
                                    </span>
                                  </td>
                                  <td className="ordered-quantity">
                                    <h6 className="mb-0">Quantity</h6>
                                    <span>
                                      {
                                        viewOrder?.data?.node?.lineItems
                                          ?.edges[0]?.node.quantity
                                      }
                                    </span>
                                  </td>
                                  <td className="ordered-price">
                                    <h6 className="mb-0">Price</h6>
                                    <span>
                                      ${" "}
                                      {
                                        viewOrder?.data?.node?.totalPriceV2
                                          ?.amount
                                      }
                                      .00
                                    </span>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="table-responsive">
                            <table class="table total-table table-borderless mt-4 mb-0">
                              <tbody>
                                <tr>
                                  <td>Subtotal</td>
                                  <td className="text-right">
                                    {
                                      viewOrder?.data?.node?.totalPriceV2
                                        ?.amount
                                    }
                                    .00
                                  </td>
                                </tr>
                                <tr>
                                  <td>Shipping</td>
                                  <td className="text-right">$0.00</td>
                                </tr>
                                <tr>
                                  <td>Tax</td>
                                  <td className="text-right">
                                    ${" "}
                                    {/* {
                                      viewOrder?.data?.node?.totalPriceV2
                                        ?.amount
                                    } */}
                                    .00
                                  </td>
                                </tr>
                                <tr className="border-top">
                                  <td>
                                    <strong className="h5">Total</strong>
                                  </td>
                                  <td className="text-right h5">
                                    <strong>
                                      $
                                      {/* {ViewOrderdata.price +
                                        ViewOrderdata.tax +
                                        50} */}
                                      {
                                        viewOrder?.data?.node?.totalPriceV2
                                          ?.amount
                                      }
                                      .00
                                    </strong>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </ModalBody>
                  ) : null}
                </Modal>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderHistory: state.orderHistory.orderHistory || [],
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      getCustomerOrder,
    },
    dispatch
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);
