import { Step, StepLabel, Stepper } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';

const CheckoutStatusTracker = ({stepIndex=1}) => {

  const steps = [
    'LOGIN',
    'DELIVERY ADDRESS',
    'ORDER SUMMARY',
    'PAYMENT'
  ];

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
        <Card.Body>
            <Stepper className='mt-1' activeStep={stepIndex} 
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
        </Card.Body>
    </Card>
  )
}

export default CheckoutStatusTracker