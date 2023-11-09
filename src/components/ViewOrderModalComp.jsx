import React from 'react'
import { formatDate, getProductImageUrl } from "../services/helper.service"
import { Badge, Button, Card, Col, ListGroup, Modal, Row, Table } from 'react-bootstrap';

const ViewOrderModalComp = ({handleCloseModal,displayModal,selectedOrder}) => {
  return (
    <>
        <Modal size="lg" animation={false} show={displayModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
            <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <b>OrderId :</b> 
                    <span className='text-color-primary'>{selectedOrder.orderId}</span>
                </Col>
                <Col>
                    <b>Ordered By:</b> 
                    <span className='text-color-primary'>{selectedOrder.user.name}</span>
                </Col>
            </Row>
            <Row className='mt-2'>
                <Col>
                    <Table bordered striped 
                    >
                    <tbody>
                        <tr>
                        <td>Billing Name</td>
                        <td className="fw-bold">{selectedOrder.billingName}</td>
                        </tr>
                        <tr>
                        <td>Billing Phone</td>
                        <td className="fw-bold">{selectedOrder.billingPhone}</td>
                        </tr>
                        <tr>
                        <td>Items</td>
                        <td className="fw-bold">{selectedOrder.orderItems.length}</td>
                        </tr>

                        <tr className={selectedOrder.paymentStatus === 'NOTPAID' ? 
                        'table-danger' : 'table-success'}>
                        <td>Payment Status</td>
                        <td className="fw-bold">{selectedOrder.paymentStatus}</td>
                        </tr>

                        <tr>
                        <td>Order Status</td>
                        <td className="fw-bold">{selectedOrder.orderStatus}</td>
                        </tr>

                        <tr>
                        <td>Ordered Date</td>
                        <td className="fw-bold">{formatDate(selectedOrder.orderdDate)}</td>
                        </tr>

                        <tr>
                        <td>Billing Address</td>
                        <td className="fw-bold">
                            {selectedOrder.billingAddress}
                        </td>
                        </tr>

                        <tr>
                        <td>DeliveredDate</td>
                        <td className="fw-bold">
                            {selectedOrder.deliveredDate ? formatDate(selectedOrder.deliveredDate) : ''}
                        </td>
                        </tr>
                        <tr>
                        <td>Order Amount</td>
                        <td className="fw-bold">
                            ₹ {selectedOrder.billingAmount}
                        </td>
                        </tr>
                    </tbody>
                    </Table>
                    <Card>
                    <Card.Body>
                        <h3>Ordered Items</h3>
                        <ListGroup>
                        {
                            selectedOrder.orderItems.map((item) => (
                            <ListGroup.Item action className="mt-3" key={item.orderItemId}>
                                <Row>
                                    <Col md={1} className=" d-flex align-items-center">
                                        <img
                                        style={{
                                            width: '40px'
                                        }}
                                        src={getProductImageUrl(item.product.productId)}
                                        alt="" />
                                    </Col>
                                    <Col md={11}>
                                        <h5>{item.product.title}</h5>
                                        <Badge pill size={'lg'}>Quantity: {item.quantity}</Badge>
                                        <Badge bg="success" pill className="ms-2" size={'lg'}>
                                        Amount for This Item :  ₹  {item.totalPrice}
                                        </Badge>
                                        <p className="text-muted mt-3">Product Id : {item.product.productId}</p>
                                    </Col>

                                    {/* <Container className="text-center my-3">
                                        <Button variant="info" size="sm">View Product</Button>
                                    </Container> */}
                                </Row>

                            </ListGroup.Item>
                            ))
                        }
                        </ListGroup>
                    </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
            Close
            </Button>
        </Modal.Footer>
        </Modal>
    </>
  )
}

export default ViewOrderModalComp