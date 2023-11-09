import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import defaultCategoryImage from "../../assets/category1.png"
import { BASE_URL } from '../../services/helper.service'
const CategoryView=({category, viewCat, updateCat, deleteCat})=> {
  const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "contain"
  }
  return (
    <div>
        <Container className='mb-2'>
            <Card className='shadow-sm'>
                <Card.Body>
                    <Row className='align-items-center'>
                        <Col sm={4} md={2}>
                            <img src={category.coverImage ? 
                                BASE_URL +"/categories/image/"+category.categoryId : defaultCategoryImage} 
                            style={imageStyle} alt="category" />
                        </Col>
                        <Col sm={8} md={8}>
                            <h5>{category.title}</h5>
                            <p>{category.description}</p>
                        </Col>
                        <Col sm={12} md={2} className='d-grid mt-2'>
                            <Button onClick={e=>viewCat(category)} className='mb-2' variant='info'>View</Button>
                            <Button onClick={e=>updateCat(category)} className='mb-2' variant='warning'>Update</Button>
                            <Button onClick={e=>deleteCat(category.categoryId)} className='mb-2' variant='danger'>Delete</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    </div>
  )
}

export default CategoryView