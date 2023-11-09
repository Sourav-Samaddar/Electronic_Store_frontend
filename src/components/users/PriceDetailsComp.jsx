import React from 'react'
import { useContext, useState } from "react"
import CartContext from "../../context/CartContext";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";
import { ORDER_STATUS, PAYMENT_STATUS } from "../../services/helper.service";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createOrder } from '../../services/OrderServices';
import { submitPayment } from '../../services/PaymentServices';

const PriceDetailsComp = ({orderSummary=false}) => {

    const { cart, setCart } = useContext(CartContext);

    const navigate = useNavigate();

    const { userData} = useContext(UserContext);
  
    const deliveryAddress = useSelector(state => state.selectedDeliveryAddress)
  
    const [orderDetails, setOrderDetails] = useState({
      billingAddress: "",
      billingName: "",
      billingPhone: "",
      cartId: "",
      orderStatus: "",
      paymentStatus: "",
      userId: "",
    });
  
    //create order
    const handleOrderCreation = async () => {
      let orderAddress = deliveryAddress.selectedAddress;
      //console.log(orderAddress)
      
      orderDetails.billingName = orderAddress.firstName + " " + orderAddress.lastName;
      orderDetails.billingPhone = orderAddress.mobile;
      orderDetails.billingAddress = orderAddress.streetAddress+", "+
      orderAddress.city+", "+orderAddress.state+", "+orderAddress.zipCode;

      //set required other details
      orderDetails.cartId = cart.cartId;
      orderDetails.orderStatus = ORDER_STATUS;
      orderDetails.paymentStatus = PAYMENT_STATUS;
      orderDetails.userId = userData.user.userId;
      orderDetails.addressId = orderAddress.id;
      //console.log(orderDetails);
  
      try {
        const result = await createOrder(orderDetails);
        //console.log(result);
        
        setCart({
          ...cart,
          cartItems: [],
        });
        toast.success("Order created !! proceeding for payment");

        const data = await submitPayment(result.orderId);
        //console.log(data);
        if(data.payment_link_url){
            window.location.href=data.payment_link_url;
        }
        
      } catch (error) {
        //console.log(error);
        toast.error("Error in creating order ! Try again");
      }
  
    }
  
    const getPriceWithoutDiscount = () =>{
      let amount = 0;
      cart?.cartItems?.forEach((item) => {
        amount += item.product.price * item.quantity;
      });
      return amount;
    }
  
    const getTotalCartAmount = () => {
        let amount = 0;
        cart?.cartItems?.forEach((item) => {
          amount += item.totalPrice;
        });
        return amount;
    };
  
    const getTotalDiscount = () => {
      return getPriceWithoutDiscount() - getTotalCartAmount();
    }
  
    const priceDetailsView = () => {
      return(
        <div>
          <h5 className="pb-1 text-color-primary">PRICE DETAILS</h5>
          <hr />
  
          <Row>
            <Col><h6>Price ({cart?.cartItems?.length} item)</h6></Col>
            <Col><h6 className="text-color-primary">₹{getPriceWithoutDiscount()}</h6></Col>
          </Row>
          <Row>
            <Col><h6>Discount</h6></Col>
            <Col><h6 style={{color:"red"}}>-₹{getTotalDiscount()}</h6></Col>
          </Row>
          <Row>
            <Col><h6>Delivery Charges</h6></Col>
            <Col><h6 className="text-color-primary">Free</h6></Col>
          </Row>
          <hr />
          <Row>
            <Col><h6>Total Amount</h6></Col>
            <Col><h6 className="text-color-primary">₹{getTotalCartAmount()}</h6></Col>
          </Row>
          <hr />
          {orderSummary ? 
            <Row className="text-center mt-3">
              <Col md={{span:4,offset:4}} sm={12}>
                <Button
                  onClick={() => handleOrderCreation()}
                  variant="info"
                >
                  Pay Now
                </Button>
              </Col>
            </Row> :
  
            <Row className="text-center mt-3">
              <Col md={{span:4,offset:4}} sm={12}>
                <Button
                  onClick={() => navigate("/users/checkout/1")}
                  variant="info"
                >
                  Check Out
                </Button>
              </Col>
            </Row>
          }
          
        </div>
      )
    } 

    return (
        <Card className="mt-3 shoadow-sm navbar-top">
            <Card.Body>
                {priceDetailsView()}
            </Card.Body>
        </Card>
    )
}

export default PriceDetailsComp