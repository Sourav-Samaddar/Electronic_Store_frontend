import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import CategorySideMenu from './CategorySideMenu'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useState } from 'react'
import StoreDrawer from './StoreDrawer'

const Store = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1200);
  
  useEffect(() => {
    window.addEventListener("resize", () => {
        const ismobile = window.innerWidth < 1000;
        if (ismobile !== isMobile) setIsMobile(ismobile);
    }, false);
  }, [isMobile]);
  return (
    <div className="body-section">
      {
        isMobile ? 
        <Card>
          <StoreDrawer />
        </Card> :
        <Container fluid className='px-3 py-3'>
          <Row>
              <Col className={isMobile?'d-none':''} lg={2}>
                  <CategorySideMenu />
              </Col>
              <Col md={12} sm={12} lg={10}>
                  <Outlet />
              </Col>
          </Row>
        </Container>
      }
      
    </div>
  )
}

export default Store