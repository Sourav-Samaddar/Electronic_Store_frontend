import React from 'react'
import { Card, Container, Form, Modal, Button } from 'react-bootstrap'
import { format } from 'date-fns';

const UpdateOrderModalComp = ({handleCloseModal,
    displayModal,
    selectedOrder,
    setSelectedOrder,
    handleOrderUpdate
}) => {
  return (
    <>
        <Modal size="lg" animation={false} show={displayModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Orders</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <Card.Body className='shadow-sm'>
               {/* {JSON.stringify(selectedOrder.deliveredDate)} */}
                <Form onSubmit={handleOrderUpdate}>
                  {/* billing name  */}
                  <Form.Group>
                    <Form.Label>Billing Name</Form.Label>
                    <Form.Control type='text'
                      value={selectedOrder.billingName}
                      onChange={
                        (event) => {
                            setSelectedOrder({
                                ...selectedOrder,
                                billingName: event.target.value
                            })
                        }
                      }
                    />
                  </Form.Group>

                  {/* billing phone  */}
                  <Form.Group className="mt-3">
                    <Form.Label>Billing Phone</Form.Label>
                    <Form.Control type='text'
                      value={selectedOrder.billingPhone}
                      onChange={
                        (event) => {
                            setSelectedOrder({
                                ...selectedOrder,
                                billingPhone: event.target.value
                            })
                        }
                      }
                    />
                  </Form.Group>

                  {/* billing address  */}
                  <Form.Group className="mt-3">
                    <Form.Label>Billing Address</Form.Label>
                    <Form.Control
                        as={'textarea'}
                        type='text'
                        rows={3}
                        value={selectedOrder.billingAddress}
                        onChange={
                          (event) => {
                              setSelectedOrder({
                                  ...selectedOrder,
                                  billingAddress: event.target.value
                              })
                          }
                        }
                    />
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Payment Status</Form.Label>
                    <Form.Select value={selectedOrder.paymentStatus}
                    onChange={event => setSelectedOrder({
                      ...selectedOrder,paymentStatus:event.target.value
                    })}
                    >
                      <option value='NOTPAID'>NOT PAID</option>
                      <option value='PAID'>PAID</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Order Status</Form.Label>
                    <Form.Select value={selectedOrder.orderStatus}
                    onChange={event => setSelectedOrder({
                      ...selectedOrder,orderStatus:event.target.value
                    })}
                    >
                      <option value="ORDER PLACED">ORDER PLACED</option>
                      <option value="ORDER CONFIRMED">ORDER CONFIRMED</option>
                      <option value="DISPATCHED">DISPATCHED</option>
                      <option value="OUT FOR DELIVERY">OUT FOR DELIVERY</option>
                      <option value="DELIVERED">DELIVERED</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mt-3">
                    <Form.Label>Select Delivered Date</Form.Label>
                      <Form.Control type="date"
                        //value={selectedOrder.deliveredDate }
                        onChange={event => {
                          setSelectedOrder({
                              ...selectedOrder,
                              deliveredDate: format(new Date(event.target.value), 'dd/MM/yyyy')
                          })
                        }}
                      />
                    <p className="text-muted">Format : dd/MM/yyyy</p>
                  </Form.Group>
                  
                  <Container className="text-center">
                    <Button type="submit" variant="primary">
                        Save Changes
                    </Button>
                  </Container>
                </Form>
              </Card.Body>
            </Card>
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

export default UpdateOrderModalComp