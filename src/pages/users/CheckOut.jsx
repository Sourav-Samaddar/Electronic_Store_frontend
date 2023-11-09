import React, { useEffect } from 'react'
import DeliveryAddress from './DeliveryAddress'
import CheckoutStatusTracker from '../../components/CheckoutStatusTracker'
import { Container } from 'react-bootstrap'
import Footer from '../../components/Footer'
import { useParams } from 'react-router-dom'
import OrderSummary from './OrderSummary'

const CheckOut = () => {

  const {step} = useParams();  

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[step])
  
  return (
    <>
        <Container fluid className='body-section py-2'>
            <CheckoutStatusTracker stepIndex={Number(step)}/>
            {Number(step)===1 ? <DeliveryAddress /> : <OrderSummary />}
        </Container>
        <Footer />
    </>
  )
}

export default CheckOut