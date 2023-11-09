import Cart from '../cart'
import { useSelector } from "react-redux";
import AddressCard from '../../components/users/AddressCard';
import { Card } from 'react-bootstrap';

const OrderSummary = () => {
  const deliveryAddress = useSelector(state => state.selectedDeliveryAddress)
  
  const addressView = () =>{
    return(
      <Card className='mt-2'>
        <Card.Body>
          <AddressCard address={deliveryAddress.selectedAddress}/>
        </Card.Body>
      </Card>
    )
  }
  return (
    <>
      {deliveryAddress ?  addressView(): ''}
      <Cart orderSummary={true} />
    </>
  )
}

export default OrderSummary