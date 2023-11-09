import React from 'react'
import { Badge, Button, Card, Container } from 'react-bootstrap'
import { getProductImageUrl } from '../../services/helper.service'
import "../users/SingleProductCard.css"
import defaultProductImage from '../../assets/default_product_image.jpg'
import { Link } from 'react-router-dom'
const SingleProductCard = ({ product, handleAddItem }) => {
    return (

        <Card className='mt-3 featured-products'>

            <Card.Body>
                <Container className='text-center'>
                    <img
                        src={getProductImageUrl(product.productId)}
                        className="product-image"
                        onError={event => {
                            event.currentTarget.setAttribute('src', defaultProductImage)
                        }}
                        alt="" />
                </Container>
                <h6>{product.title}</h6>
                <p className='text-muted'> 
                    <span>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto, velit?
                    </span> 
                </p>
                <Badge pill bg='info'>{product.category?.title}</Badge>
                <Badge className='ms-2' pill bg={product.stock ? 'success' : 'danger'}>{product.stock ? 'In Stock' : " Out of Stock"}</Badge>
                <Container className='text-end'>
                    <b><span className='h5 text-color-primary1'><s>₹{product.price}</s></span></b>
                    <b><span className='h5  ms-2 text-color-primary'>₹{product.discountedPrice}</span></b>
                </Container>
                <Container className='mt-4 text-center'>
                    <Button disabled={!product.stock} 
                    onClick={event => handleAddItem(product.productId,1)}
                    variant='warning' size={'sm'}>
                        Add To Cart
                    </Button>
                    <Button as={Link} to={`/store/products/${product.productId}`} 
                    variant='success' size={'sm'} className='ms-2'>
                        View Product
                    </Button>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default SingleProductCard