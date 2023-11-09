import { useContext, useState } from "react"
import CartContext from "../context/CartContext";
import SingleCartItemView from "../components/users/SingleCartItemView";
import { Alert, Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useJwtTokenExpiration from "../hooks/useJwtTokenExpiration";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import PriceDetailsComp from "../components/users/PriceDetailsComp";
//import { TextField } from "@mui/material"

function Cart({orderSummary=false}) {

  const flag = useJwtTokenExpiration()

  const navigate = useNavigate();

  const [orderPlacedClicked, setOrderPlacedClicked] = useState(orderSummary);

  const { cart } = useContext(CartContext);
 
  const getTotalCartAmount = () => {
      let amount = 0;
      cart?.cartItems?.forEach((item) => {
        amount += item.totalPrice;
      });
      return amount;
  };
 
  const cartView = () =>{
      return (
          <>
              <Card className="mt-3 shadow-sm mb-3">
                  <Card.Body>
                      <Row className="px-1">
                          <Col>
                              <h5 className="text-color-primary">Cart</h5>
                          </Col>
                          <Col className="text-end">
                              <h5 className="text-color-primary">{cart?.cartItems?.length} Items</h5>
                          </Col>
                      </Row>
                      <Row className="px-1 mt-3">
                          <Col>
                              {
                                  cart?.cartItems?.map(item => {
                                      return(
                                          <SingleCartItemView key={item.cartItemId} 
                                          item={item} orderSummary={orderSummary}/>
                                      )
                                  })
                              }
                          </Col>
                      </Row>
                      <Container className="px-1">
                          <h4 className="text-end px-3 text-color-primary">
                              Total Amount : ₹ {getTotalCartAmount()}
                          </h4>
                      </Container>
                      <Container className="text-center">
                          {!orderPlacedClicked && (
                              <Button
                              size="sm"
                              onClick={(event) => setOrderPlacedClicked(true)}
                              >
                              Place Order
                              </Button>
                          )}
                      </Container>
                  </Card.Body>
              </Card>
          </>
      )
  }
  
  return (
    <>
      <div className="body-section">
          <Container fluid={orderPlacedClicked} className="px-1">
              <Row>
                  <Col md={orderPlacedClicked ? 8 : 12} xs={12}>
                      {
                          cart?.cartItems?.length >0 ? cartView() :
                          <Alert variant="danger" className="mt-3 shadow-sm border border-0 text-center">
                              <h5>No Items in the cart</h5>
                              <Button as={Link} to="/store/category/allproduct" variant="info">
                                  Start Adding Products in Cart
                              </Button>
                          </Alert>
                      }
                      {!cart && (
                      <Alert
                          variant="info"
                          className="mt-3 shadow-sm border border-0 text-center"
                      >
                          <h3>You are not logged </h3>
                          <p>In order to acces your Cart do login first</p>
                          <Button as={Link} to="/Login" variant="success">
                          Login
                          </Button>
                      </Alert>
                      )}
                  </Col>
                  {orderPlacedClicked && (
                  <Col md={4}>
                    <PriceDetailsComp orderSummary={orderSummary} />
                  </Col>
                  )}
              </Row>
          </Container>
      </div>
      {!orderSummary ? <Footer /> : ''}
    </>
  )
}

export default Cart