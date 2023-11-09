import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getAllLiveProducts, getLiveProductsByCategory, searchLiveProduct } from '../../services/product.service';
import { toast } from 'react-toastify';
import { Alert, Col, Container, Row } from 'react-bootstrap';
import InfiniteScroll from 'react-infinite-scroll-component';
import SingleProductCard from '../../components/users/SingleProductCard';
import CartContext from '../../context/CartContext';
import { useDispatch, useSelector } from "react-redux";

const CategoryProductView = () => {

  const {categoryId} = useParams();

  const location = useLocation();

  const [products,setProducts] = useState(undefined)

  const [currentPage,setCurrentPage] = useState(0);

  const { addItem } = useContext(CartContext)

  const searchQuery = useSelector(state => state.searchQueryString) 

  useEffect(()=>{
    //console.log(location.pathname)
    setCurrentPage(0)
    loadProducts(0)
    window.scrollTo(0, 0);
  },[categoryId,searchQuery])

  useEffect(()=>{
    if(currentPage >0 ){
      loadProducts(currentPage);
    }
  },[currentPage])

  const handleAddItem = (productId, quantity) => {
    //if the product is in stock 
    addItem(quantity, productId, () => {
        toast.success("Product is added to cart")
    })
  }

  const setProductValues = (pageNumber,productResp) =>{
    if(pageNumber === 0){
      setProducts({...productResp});
    }else{
      setProducts({
        content: [...products.content, ...productResp.content],
        isLastPage: productResp.isLastPage,
        pageNumber: productResp.pageNumber,
        pageSize: productResp.pageSize,
        totalElements: productResp.totalElements,
        totalPages: productResp.totalPages
      })
    }
  }

  const loadProducts = (pageNumber) =>{
    if(searchQuery.searchValue && searchQuery.searchValue.trim() !== '' &&
     location.pathname === `/store/search`){
      searchLiveProduct(searchQuery.searchValue,pageNumber)
        .then(productResp=>{
          //console.log(productResp)
          setProductValues(pageNumber,productResp)        
        })
        .catch(err=>{
          toast.error('Error loading All live products')
      })
    }
    else{
      if(categoryId && categoryId === 'allproduct'){
        getAllLiveProducts(pageNumber)
        .then(productResp=>{
          //console.log(productResp)
          setProductValues(pageNumber,productResp)        
        })
        .catch(err=>{
          toast.error('Error loading All live products')
        })
      }else{
        getLiveProductsByCategory(categoryId,pageNumber)
        .then(productResp=>{
          //console.log(productResp)
          setProductValues(pageNumber,productResp)    
        })
        .catch(err=>{
          //console.log(err)
          toast.error('Error loading live products by category')
        })
      }
    }
    
    
  }

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const productView = () => {
    return(
      <InfiniteScroll
      dataLength={products.content.length}
      next={loadNextPage}
      hasMore={!products.isLastPage}
      loader={<h3 className='my-5 text-center'>Loading more products...</h3>}
      endMessage={<p className='my-4 text-center'>All Products loaded</p>}
      >
        <Container>
          <Row>
          {
            products.content.map(product => {
              return(
                <Col key={product.productId} sm={12} md={6} lg={4}>
                  <SingleProductCard 
                  product={product}
                  handleAddItem={handleAddItem}
                  />
                </Col>
                
              )
            })
          }
          </Row>
        </Container>
      </InfiniteScroll>
    )
    
  }

  return (
   <>
     {
      products?.content?.length>0 ? productView() : 
      <Alert>
        <h5>No Products available</h5>
      </Alert>
    }
   </>
  )
}

export default CategoryProductView