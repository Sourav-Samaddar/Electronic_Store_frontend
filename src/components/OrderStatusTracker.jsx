import { Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

const OrderStatusTracker = ({defaultOrderStatus='ORDER PLACED'}) => {

  const steps = [
    'ORDER PLACED',
    'ORDER CONFIRMED',
    'DISPATCHED',
    'OUT FOR DELIVERY',
    'DELIVERED'
  ];

  const orderStatus = (element) => element === defaultOrderStatus;

  const getStepIndex = () =>{
    return steps.findIndex(orderStatus)
  }

  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  useEffect(() => {
    window.addEventListener("resize", () => {
        //console.log(window.innerWidth);
        const ismobile = window.innerWidth < 700;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
  }, [isMobile]);

  return (
    <Card>
        <Stepper className='mt-1' activeStep={getStepIndex()} 
        alternativeLabel={isMobile? false:true} 
        orientation={isMobile ? 'vertical':'horizontal'}>
            {steps.map((label) => {
                
                return (
                    <Step key={label}>
                        <StepLabel sx={{ color: '#9155FD',fontSize: '44px' }}>{label}</StepLabel>
                    </Step>
                );
            })}
        </Stepper>
    </Card>
  )
}

export default OrderStatusTracker