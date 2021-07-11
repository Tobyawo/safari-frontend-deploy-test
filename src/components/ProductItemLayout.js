import React, { useState, useEffect } from "react";
import {
  Grid,
  Segment,
  Image,
  Dropdown,
  Container,
  GridColumn,
  Menu,
} from "semantic-ui-react";
import "../styles/Layout/_product_item_layout.scss";
import "../styles/Components/_button.scss";
import productApis from "../apis/ProductApi";
import { useCartUpdate } from "../utilities/CartContext";

function ProductItemLayout(props) {
  const productId = props.productId;
  const [optionscolor, setColors] = useState([]);
  const [optionssize, setSizes] = useState([]);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("Select Color");
  const [size, setSize] = useState("Select Size");
  const [message, setMessage] = useState("");
  //use context for cart item on navigation bar
  const incrementCartItem = useCartUpdate();

  useEffect(async () => {
    const productData = await productApis.getProductById(productId);

    setProduct(productData);

    const arrColor = productData.colors;
    arrColor.unshift("Select Color");

    const newOptionColor = arrColor.map((color, index) => {
      return { key: index + 1, text: color, value: index + 1 };
    });

    setColors(newOptionColor);

    const arrSize = productData.sizes;
    arrSize.unshift("Select Size");

    const newOptionSize = arrSize.map((size, index) => {
      return { key: index + 1, text: size, value: index + 1 };
    });

    setSizes(newOptionSize);
  }, []);

  //increment quantity
  const incrementQuantity = () => {
    setQuantity((quantity) => quantity + 1);
  };

  //decrement quantity
  const decrementQuantity = () => {
    if (quantity != 1) setQuantity((quantity) => quantity - 1);
  };

  //add products to cart
  const addToCart = async () => {
    //informations to be added to cart
    const orderItems = {
      productId,
      quantity,
      price: product.price,
      name: product.name,
      description: product.description,
      size: size == "Select Size" ? null : size,
      color: color == "Select Color" ? null : color,
      productImage: product.length ? props.productImage[0] : "",
    };

    const response = await productApis.addProductToCart(orderItems);

    if (response.status === 201) {
      setMessage(response.message);
      incrementCartItem();
    } else setMessage("Error adding product to cart, please check back later");
  };

  //track the size picked from the lists of sizes
  const trackSizeInput = (e, result) => {
    const { value } = result;

    let textField = optionssize[value - 1].text;

    setSize(textField);
  };

  //track the color picked from the lists of colors
  const trackColorInput = (e, result) => {
    const { value } = result;

    let textField = optionscolor[value - 1].text;

    setColor(textField);
  };

  return (
    <Container fluid padded className="product-item-container container">
      <Grid>
        <GridColumn mobile={16} tablet={16} widescreen={8} computer={8}>
          <Segment>
            <Image
              src="http://localhost:3000/images/products/gustavo-spindula-l7wrlsKDmCE-unsplash%201.png"
              alt="product-item-placeholder"
              centered
            ></Image>
          </Segment>
          <Segment>
            <h5 className="product-item-description">Description</h5>
            <p className="product-item-description-p">{product.description}</p>
          </Segment>
        </GridColumn>
        <GridColumn mobile={16} tablet={16} widescreen={8} computer={8}>
          <Segment>
            <h3 className="product-item-title">{product.name}</h3>
            <p className="product-item-price">₦{product.price}</p>
            <p className="product-item-qty">
              <span>
                Qty
                <button onClick={decrementQuantity} className="qty qtypminu">
                  -
                </button>
                <input className="inputqty" value={quantity} />
                <button onClick={incrementQuantity} className="qty qtyplus">
                  +
                </button>
              </span>
            </p>
            <p className="product-item-size">Size</p>
            <Dropdown
              selection
              options={optionssize}
              onChange={trackSizeInput}
              placeholder={size}
              className="product-item-size-dropdown"
              value={size}
            />
            <p className="product-item-color">Color</p>
            <div className="product-item-categorycolor">
              <Dropdown
                selection
                options={optionscolor}
                onChange={trackColorInput}
                placeholder={color}
                className="product-item-size-dropdown"
                value={color}
              />
            </div>
          </Segment>
          <Grid>
            <GridColumn width="2">
              <i class="far fa-heart favourite"></i>
            </GridColumn>
            <GridColumn width="14">
              <button className="product-item-addtocart " onClick={addToCart}>
                ADD TO CART
              </button>
              <p className="addtocart__notice">{message}</p>
            </GridColumn>
          </Grid>
        </GridColumn>
      </Grid>
    </Container>
  );
}

export default ProductItemLayout;
