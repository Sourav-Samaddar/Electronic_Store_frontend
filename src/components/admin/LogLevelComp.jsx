import { TextField } from '@mui/material'
import React from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'

const LogLevelComp = ({logger,index,deleteLog,fieldValChange}) => {
  return (
    <Card>
        <Card.Body>
            <Row>
                <Col sm={12} md={8} className='mt-1'>
                    <Form.Control type='text' 
                        required
                        value={logger['-name']} 
                        onChange={(e)=>fieldValChange(e,index,'-name')}
                    />
                </Col>
                <Col md={2} className='mt-1'>
                    <Form.Select value={logger['-level']}
                    onChange={(e)=>fieldValChange(e,index,'-level')}
                    >
                        <option value="error">ERROR</option>
                        <option value="warn">WARN</option>
                        <option value="info">INFO</option>
                        <option value="debug">DEBUG</option>
                        <option value="trace">TRACE</option>
                    </Form.Select>
                </Col>
                <Col md={2} className='mt-1'>
                    <Button variant='info' className='ms-2' onClick={()=>deleteLog(index)}>
                        Delete
                    </Button>   
                </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

export default LogLevelComp