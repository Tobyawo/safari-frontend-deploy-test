import React, { useEffect, useState } from "react";
import productApis from "../apis/ProductApi";
import { monetize } from "../utilities/helperFunction";

import {
  Grid,
  Container,
  Segment,
  Button,
  Checkbox,
  Form,
} from "semantic-ui-react";
import "../styles/Components/_checkout_layout.scss";

const state = [
  { key: "Edo", text: "Edo", value: "Edo" },
  { key: "Lagos", text: "Lagos", value: "Lagos" },
  { key: "Abuja", text: "Abuja", value: "Abuja" },
];

const city = [
  { key: "Edo", text: "Edo", value: "Edo" },
  { key: "Lagos", text: "Lagos", value: "Lagos" },
  { key: "Abuja", text: "Abuja", value: "Abuja" },
];

function CheckOutLayout() {
  const [cart, setCart] = useState([]);
  const [totalCartPrice, setTotalCartPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [payOnDelivery, setPayOnDelivery] = useState(false);

  useEffect(async () => {
    const cartItem = await productApis.getCartItem();

    setCart(cartItem);

    const totalPrice = cartItem.length
      ? cartItem[cartItem.length - 1].total
      : 0;
    setTotalCartPrice(totalPrice);
  }, []);

  const incrementQuality = (product) => {
    const exist = cart.find(
      (eachProduct) => eachProduct.productId === product.productId
    );

    if (exist) {
      let total = 0;

      const updatedCart = cart.map((item) => {
        total += item.price * Number(item.quantity);
        return item.productId === exist.productId
          ? { ...exist, quantity: Number(exist.quantity) + 1, total }
          : item;
      });

      setTotalCartPrice(total);

      setCart(updatedCart);
    }
  };

  const decrementQuality = (product) => {
    const exist = cart.find(
      (eachProduct) => eachProduct.productId === product.productId
    );

    if (exist && exist.quantity !== 1) {
      let total = 0;

      const updatedCart = cart.map((item) => {
        total += item.price * Number(item.quantity);
        return item.productId === exist.productId
          ? { ...exist, quantity: Number(exist.quantity) - 1, total }
          : item;
      });

      setTotalCartPrice(total);

      setCart(updatedCart);
    }
  };

  const handlePaymentDelivery = (e) => {
    if (e.target.value === "delivery") {
      setPayOnDelivery(true);
      setDeliveryFee(2000);
    } else {
      setPayOnDelivery(false);
      setDeliveryFee(0);
    }
  };

  let cardPercentage = totalCartPrice * 0.05;
  let total = totalCartPrice - cardPercentage + deliveryFee;
  console.log(cart);

  //fetching orders

  return (
    <Container fluid className="checkout-container">
      <Grid padded className="checkout">
        <Grid.Column
          mobile={16}
          tablet={8}
          widescreen={8}
          computer={8}
          largeScreen={6}
        >
          <Segment>
            <Grid className="delivery-method">
              <Grid.Column width={3}>
                <img
                  src="./images/shipping-address-icon.png"
                  alt="shipping-address-icon"
                  className="delivery-check-icon checkicon"
                />
              </Grid.Column>
              <Grid.Column width={13}>
                <h4 className="">Shipping Address</h4>
              </Grid.Column>
            </Grid>
            <Form>
              <Form.Field>
                <label>Email</label>
                <input />
              </Form.Field>
              <Form.Field>
                <label>Full Name</label>
                <input />
              </Form.Field>
              <Form.TextArea label="Address" />
              <Form.Select fluid label="State/Province" options={state} />
              <Form.Select fluid label="State" options={city} />
              <Form.Field>
                <label>Phone Number</label>
                <input />
              </Form.Field>
              <Form.Field>
                <Checkbox
                  className="checkout-checkbox"
                  label="Set Default Shipping Address"
                />
              </Form.Field>
            </Form>
          </Segment>
        </Grid.Column>
        {/* Midle Column starts */}
        <Grid.Column
          mobile={16}
          tablet={8}
          widescreen={8}
          computer={8}
          largeScreen={5}
        >
          <Segment>
            <Grid className="delivery-method">
              <Grid.Column width={3}>
                <img
                  src="./images/check.png"
                  alt=""
                  className="delivery-check-icon"
                ></img>
              </Grid.Column>
              <Grid.Column width={13}>
                <h4 className="">Delivery Method</h4>
              </Grid.Column>
            </Grid>
            <Grid>
              <Grid.Column width={5}>
                <Form.Group inline>
                  <Form.Radio
                    className="checkout-amount"
                    label="₦2, 000"
                    value="2000"
                    checked={payOnDelivery}
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={11}>
                <span className="door door-fee">Delivery fee</span>{" "}
                <span className="door door-delivery">Door Delivery</span>
              </Grid.Column>
            </Grid>
          </Segment>
          <Segment onChange={handlePaymentDelivery}>
            <h4 className="order-summary">Payment Methods</h4>
            <Form.Group inline>
              <label>
                <input
                  className="checkout-amount-checkbox"
                  type="radio"
                  value="card"
                  name="payment"
                />
                <span className="payment-method-text">Pay with card</span>
              </label>
            </Form.Group>
            <p className="checkout-discount">
              (Get 5% off total price and money back guarantee)
            </p>
            <p className="checkout-redirect-notice">
              You will be redirected to Paystack payment gateway
            </p>
            <Form.Group inline>
              <label>
                <input
                  className="checkout-amount-checkbox"
                  type="radio"
                  value="delivery"
                  name="payment"
                />
                <span className="payment-method-text">Pay on delivery</span>
              </label>
            </Form.Group>
            <li className="checkout-pod-notice">
              Kindly note that we will only accept POS payment option on
              delivery
            </li>
            <li className="checkout-pod-notice pod">
              You have to make payment before opening package
            </li>
            <li className="checkout-pod-notice pod pod-p">
              Once the seal is broken, item can only be returned if damaged or
              defective{" "}
            </li>
          </Segment>
        </Grid.Column>
        <Grid.Column
          mobile={16}
          tablet={16}
          widescreen={8}
          computer={8}
          largeScreen={5}
        >
          <Segment>
            <h4 className="order-summary">ORDER SUMMARY</h4>
            {cart.map((product) => (
              <Grid key={product.productId}>
                <Grid.Column width={5}>
                  <img
                    src={product.productImage}
                    alt={product.productName}
                    className="order-section-img"
                  />
                </Grid.Column>
                <Grid.Column width={11}>
                  <h4>{product.productName}</h4>
                  <span>Size: {product.size}</span>
                  <p>
                    {product.quantity} x ₦{monetize(product.price.toFixed(2))}
                  </p>
                  <span>
                    Qty
                    <button
                      onClick={() => incrementQuality(product)}
                      className=" qty qtyplus"
                    >
                      +
                    </button>
                    <input className="inputqty" value={product.quantity} />
                    <button
                      onClick={() => decrementQuality(product)}
                      className="qty qtyminus"
                    >
                      -
                    </button>
                  </span>
                </Grid.Column>
              </Grid>
            ))}

            <div className="order-summary-divider" />
            <Grid>
              <Grid.Column width={8}>
                <Container textAlign="left">
                  <p>Cart sub-total</p>
                  <p>Card discount</p>
                  <p>Delivery fee</p>
                </Container>
              </Grid.Column>
              <Grid.Column width={8}>
                <Container textAlign="right">
                  <p>₦ {monetize(totalCartPrice)}</p>
                  <p>- ₦ {monetize(cardPercentage)}</p>
                  <p>{deliveryFee}</p>
                </Container>
              </Grid.Column>
            </Grid>
            <div className="order-summary-divider-totals" />
            <Grid className="cart-checkout-totals">
              <Grid.Column width={8}>
                <Container textAlign="left">
                  <p>TOTAL</p>
                </Container>
              </Grid.Column>
              <Grid.Column width={8}>
                <Container textAlign="right">
                  <p className="checkout-total-cost">₦ {monetize(total)}</p>
                </Container>
              </Grid.Column>
            </Grid>
          </Segment>
          <Grid className="gift-section">
            <Grid.Column width={8}>
              <p className="gift-notice">Is this a gift?</p>
            </Grid.Column>
            <Grid.Column width={8}>
              <span>
                <button className="gift-yes">Yes</button>
              </span>{" "}
              <span>
                <button className="gift-no">No</button>
              </span>
            </Grid.Column>
            <p className="gift-package">
              A complimentary gift receipt will be included in the package, and
              prices will be hidden on the receipt.
            </p>
            <button className="place-order">PLACE ORDER </button>
          </Grid>
        </Grid.Column>
      </Grid>
    </Container>
  );
}

export default CheckOutLayout;
