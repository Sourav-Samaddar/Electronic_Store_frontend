import React from 'react'
import { Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { formatDate } from "../services/helper.service"
import { Link } from "react-router-dom"
import { submitPayment } from '../services/PaymentServices'
import OrderStatusTracker from './OrderStatusTracker'

const SingleOrderView = ({order, openViewOrderModal, openEditOrderModal}) => {

  const completePayment = async (event, orderId) =>{
    const data = await submitPayment(orderId);
    //console.log(data);
    if(data.payment_link_url){
        window.location.href=data.payment_link_url;
    }
  }  

  return (
    <Card className='shadow-sm mb-3'>
        <Card.Body>
            <Row>
                <Col>
                    <b>OrderId :</b> <span className='text-color-primary'>{order.orderId}</span>
                </Col>
                <Col>
                    <b>Ordered By:</b>
                    <Link className="text-color-primary ms-2" to={`/users/profile/${order.user.userId}`}>
                      {order.user.name}
                    </Link>
                </Col>
            </Row>
            <Row className='mt-2'>
                <OrderStatusTracker defaultOrderStatus={order.orderStatus} />
            </Row>
            <Row className='mt-2'>
                <Col>
                    <Table bordered striped 
                    >
                        <tbody>
                            <tr>
                                <td>Billing Name</td>
                                <td className="fw-bold">{order.billingName}</td>
                            </tr>
                            <tr>
                                <td>Billing Phone</td>
                                <td className="fw-bold">{order.billingPhone}</td>
                            </tr>
                            <tr>
                                <td>Items</td>
                                <td className="fw-bold">{order.orderItems.length}</td>
                            </tr>

                            <tr className={order.paymentStatus === 'NOTPAID' ? 
                            'table-danger' : 'table-success'}>
                                <td>Payment Status</td>
                                <td className="fw-bold">{order.paymentStatus}</td>
                            </tr>

                            <tr>
                                <td>Order Status</td>
                                <td className="fw-bold">{order.orderStatus}</td>
                            </tr>

                            <tr>
                                <td>Ordered Date</td>
                                <td className="fw-bold">{formatDate(order.orderdDate)}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className='text-center'>
                {openEditOrderModal && 
                    <Col md={{span:2,offset:3}} sm={12} className='mt-2'>
                        <Button
                            onClick={(event) => openEditOrderModal(event, order)}
                            variant="danger" size='sm' >Update
                        </Button>
                    </Col>
                }

                {(!openEditOrderModal && order.paymentStatus === 'NOTPAID') && 
                    <Col md={{span:2,offset:4}} sm={12} className='mt-2'>
                        <Button
                            onClick={(event) => {completePayment(event,order.orderId)}}
                            variant="success" size='sm'>Pay to Complete Order
                        </Button>
                    </Col>
                } 

                <Col md={!openEditOrderModal && order.paymentStatus === 'PAID'?{span:2,offset:5}:{span:2}} 
                    sm={12} className='mt-2'>
                    <Button size='sm' onClick={event => openViewOrderModal(event,order)} variant='info'>
                        View Order Details
                    </Button>
                </Col>
                
            </Row>
        </Card.Body>
    </Card>
  )
}

export default SingleOrderView