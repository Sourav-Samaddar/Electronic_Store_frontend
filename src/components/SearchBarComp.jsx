import React from 'react'
import { useState } from 'react';
import { Button, Form, ListGroup } from 'react-bootstrap';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setValueToSearch } from '../store/slice/SearchQuerySlice';
import { toast } from 'react-toastify';
import { searchLiveProduct } from '../services/product.service';

const SearchBarComp = ({isMobile=false,barlength='300px'}) => {
  const [searchVal,setSearchVal] = useState('');
  const [showSearch,setShowSearch] = useState('');
  const dispatch = useDispatch();
  const redirect = useNavigate();  
  const [products,setProducts] = useState(undefined)

  const submitSearch = (event) =>{
    event.preventDefault();
    setShowSearch(false);
    if(searchVal && searchVal.trim() !== ''){
        dispatch(setValueToSearch({ value: searchVal }));
        redirect(`/store/search`);
    }else{
        redirect('/store/category/allproduct')
    }
  }

  const onSearChange = (event) =>{
    setSearchVal(event.target.value);
    if(event.target.value.length > 2){
      setShowSearch(true);
      searchLiveProduct(event.target.value,0)
        .then(productResp=>{
          //console.log(productResp)
          setProducts({...productResp});       
        })
        .catch(err=>{
          toast.error('Error loading All live products')
      })
    }
    else{
      setShowSearch(false);
    }
  }

  const navigateToProduct = (productId) =>{
    setShowSearch(false);
    redirect(`/store/products/${productId}`)
  }

  const displaySearchBlock = () =>{
    return(
      <div className='search-list-dropdown' 
        style={isMobile?{width:'180px'}:{width:barlength}}>
        
          {products && 
            <ListGroup>
              {
                products.content.map(product => {
                 return(
                  <ListGroup.Item key={product.productId} action
                    onClick={()=>navigateToProduct(product.productId)}>
                    {product.shortName}
                  </ListGroup.Item>  
                 )         
                })
              }
            </ListGroup>  
          }     
        
        
      </div>
    )
  }

  return (
    <>
        <div>
        <Form onSubmit={submitSearch} className="d-flex">
            <Form.Control
            type="search"
            placeholder="Search"
            className='me-1'
            aria-label="Search"
            value={searchVal}
            style={isMobile?{width:'180px'}:{width:barlength}}
            onChange={event => onSearChange(event)}
            />
            <Button className={isMobile?'d-none':'me-2'} type='submit' variant="outline-success" 
              onClick={submitSearch}>
                <BsSearch size={20}/>
            </Button>
        </Form>

        {searchVal && searchVal.length > 2 && showSearch ? displaySearchBlock() : ''}
        
        </div>
    </>
  )
}

export default SearchBarComp