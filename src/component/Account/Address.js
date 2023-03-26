/**
 *  Address Dislay
 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container } from "reactstrap";
import Sitebar from "./Sitebar";
import Common from "../../api/common";
import { getCustomerAddress } from "../../actions/Order";

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addressList: {},
    };
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    getCustomerAddress().then((res) => {
      this.setState({ addressList: res.data.data });
    });
  }
  render() {
    const BillingAddress = Common["0"]["billingaddress"];
    const ShippingAddress = Common["0"]["shippingaddress"];
    const addressList = this.state.addressList;

    console.log("This is address data", this.state.addressList);
    return (
      <div>
        <div className="inner-intro">
          <Container>
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
                  <Col md={12}>
                    <div className="woocommerce-Address">
                      <div className="woocommerce-Address-title">
                        <h5 class="mb-0">Default address</h5>
                        {/* <Link className="edit" to="/Account/Addressedit">
                          Edit
                        </Link> */}
                      </div>
                      <div className="woocommerce-Address-info mt-4">
                        <ul class="list-unstyled mb-0">
                          {/* <li>
                            <strong>{BillingAddress.billingname}</strong>
                          </li> */}
                          <li>
                            <strong>
                              {addressList?.customer?.defaultAddress?.firstName}
                            </strong>
                          </li>
                          <li>
                            <strong>
                              {addressList?.customer?.defaultAddress?.address1}
                            </strong>
                          </li>
                          <li>
                            <strong>
                              {addressList?.customer?.defaultAddress?.address2}
                            </strong>
                          </li>
                          <li>
                            <strong>
                              {addressList?.customer?.defaultAddress?.country}{" "}
                              {addressList?.customer?.defaultAddress?.zip}
                            </strong>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </Col>
                  <h5 className="mb-0">Addresses</h5>
                  {addressList?.customer?.addresses?.edges.map((each) => {
                    return (
                      <Col md={12} className="mt-4 mt-md-0">
                        <div className="woocommerce-Address">
                          <div className="woocommerce-Address-title">
                            {/* <Link className="edit" to="/Account/Addressedit">Edit</Link> */}
                          </div>
                          <div className="woocommerce-Address-info mt-4">
                            <ul class="list-unstyled mb-0">
                              {/* <li>
           <strong>{ShippingAddress.shippingname}</strong>
         </li> */}
                              <li>
                                <strong>
                                  {" "}
                                  {each?.node?.firstName} {each?.node.lastName}
                                </strong>
                              </li>
                              <li>
                                <strong> {each?.node?.company}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.address1}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.address2}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.city}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.province}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.zip}</strong>
                              </li>
                              <li>
                                <strong> {each?.node?.country}</strong>{" "}
                              </li>
                              <li>
                                <strong> {each?.node?.phone}</strong>{" "}
                              </li>
                            </ul>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}
export default Address;
