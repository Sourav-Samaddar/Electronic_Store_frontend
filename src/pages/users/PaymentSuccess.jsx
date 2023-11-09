import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import { Alert, Card, Container } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/OrderServices';
import { toast } from 'react-toastify';
import UserContext from '../../context/UserContext';
import ViewOrderModalComp from '../../components/ViewOrderModalComp';
import SingleOrderView from '../../components/SingleOrderView';
import { paymentStatusAndUpdateOrder } from '../../services/PaymentServices';

const PaymentSuccess = () => {

  const {orderId}=useParams();
  const [orderData,setOrderData] = useState(null);
  const [paymentId,setPaymentId] = useState(undefined);
  const [paymentStatus,setPaymentStatus] = useState('')  

  //For view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const openViewOrderModal = (event, order) =>{
    handleShow()
  }

  const viewOrderModal = () => {
    return orderData && (
        <ViewOrderModalComp displayModal={show} 
        handleCloseModal={handleClose} selectedOrder={orderData}/>
    )
  }

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    setPaymentId(urlParams.get("razorpay_payment_id"))
    setPaymentStatus(urlParams.get("razorpay_payment_link_status"))
  },[])

  useEffect(()=>{
    if(paymentId){
        loadOrderDetails()
    }
  },[orderId,paymentId])

  const loadOrderDetails = async () =>{
    try {

        const paymentStatus = await paymentStatusAndUpdateOrder(paymentId,orderId)

        const result = await getOrderById(orderId)
        setOrderData(result)

    } catch (error) {
        //console.log(error)
        toast.error("Error in loading orders")
    }
  }

  const displaySingleOrder = () =>{
    return(
        <>
            <SingleOrderView order={orderData} 
                    openViewOrderModal={openViewOrderModal}/>
        </>
    )
  }

  const sucessPaymentView = () =>{
    return(
        <>
            <Alert variant='success'>
                <Alert.Heading>Payment Success</Alert.Heading>
                <p>
                    Congratulation Your Order Got Placed
                </p>
            </Alert>
            {
                orderData ?  displaySingleOrder() : ''
            }
            {
                viewOrderModal()
            }
        </>
    )
  }

  const paymentFailed = () =>{
    return (
        <>
            <Alert variant='warning'>
                <Alert.Heading>Payment Failed</Alert.Heading>
                <p>
                    Their is issue with payment !!
                </p>
            </Alert>
        </>
    )
  }

  return (
    <>
        <Card className='text-center'>
            {paymentStatus === 'paid' ? sucessPaymentView() : paymentFailed()}            
        </Card>
        <Footer />
    </>
    
  )
}

export default PaymentSuccess