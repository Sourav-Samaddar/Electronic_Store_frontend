import React, { useContext, useEffect, useState } from 'react'
import { Alert, Button, Card, Col, Container, Row } from 'react-bootstrap'
import UserContext from "../../context/UserContext";
import { getAllAddressOfUser } from '../../services/AddressService';
import { toast } from 'react-toastify';
import AddressCard from '../../components/users/AddressCard';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedAddress } from '../../store/slice/AddressSlice';
import DeliveryAddressFormComp from '../../components/users/DeliveryAddressFormComp';

const DeliveryAddress = () => {

  const {userData} = useContext(UserContext);
  const [address,setAddress] = useState(null);
  const [selectedAddress, setSelectedAdress] = useState(null);
  const navigate = useNavigate();

  useEffect(()=>{
    if(userData){
       loadAddress();
    }
    
  },[userData])

  const loadAddress = () =>{
    getAllAddressOfUser(userData?.user?.userId)
    .then(resp => {
        //console.log(resp);
        setAddress(resp)
    }).catch(err => {
        toast("Unable to fetch address")
    })
  }
  const dispatch = useDispatch();

  const saveAvailableAddress = (address) =>{
    dispatch(setSelectedAddress({value: address}))
    navigate('/users/checkout/2')
  }

  const addressListView = () =>{
    return(
        <>
            {address?.map(item=>{
                return(
                    <div className='mt-1' key={item.id} onClick={()=>setSelectedAdress(item)}>
                        <Card className='shadow-sm mt-1'>
                            <Card.Body>
                            <AddressCard  address={item} />
                            {selectedAddress?.id === item.id && (
                                <Button variant='info' onClick={()=>saveAvailableAddress(item)}>
                                    Deliver Here
                                </Button>
                            )}
                            </Card.Body>
                        </Card>
                    </div>
                )
            })}
        </>
        
    )
  }

  const addressView = () =>{
    return(
        <Container fluid >
            <Row>
                <Col md={6} sm={12} className='mt-1 mb-2'>
                    {address && address.length>0 ? 
                        addressListView() :
                        <Alert  variant="info"
                        className="mt-3 shadow-sm border border-0 text-center">
                            <h3>No previous address available for this user</h3>
                        </Alert>
                    }
                </Col>
                <Col md={6} sm={12} className='mt-2 mb-2'>
                    <DeliveryAddressFormComp />
                </Col>
            </Row>
        </Container>
    )
  } 
    
  return (
    <>
        {addressView()}
    </>
  )
}

export default DeliveryAddress