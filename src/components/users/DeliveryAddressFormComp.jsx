import React, { useContext } from 'react'
import { Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { Grid, TextField, Button} from "@mui/material";
import UserContext from '../../context/UserContext';
import { addAddressOfUser } from '../../services/AddressService';
import { useDispatch } from 'react-redux';
import { setSelectedAddress } from '../../store/slice/AddressSlice';
import { useNavigate } from 'react-router-dom';

const DeliveryAddressFormComp = () => {

  const {userData} = useContext(UserContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //create address
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const address = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      streetAddress: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      zipCode: data.get("zip"),
      mobile: data.get("phoneNumber"),
    };

    addAddressOfUser(address,userData?.user?.userId)
    .then(resp=>{
      address.id = resp.id;
      dispatch(setSelectedAddress({value: address}))
      navigate('/users/checkout/2')
    }).catch(err =>{
      toast("Error adding address")
    })
  }

  const addressFormView = () => {
    return (
      <Card className='navbar-top'>
        <Card.Body>
          <form onSubmit={event => handleSubmit(event)}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  fullWidth
                  autoComplete="given-name"
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  fullWidth
                  autoComplete="given-name"
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="address"
                  name="address"
                  label="Address"
                  fullWidth
                  autoComplete="shipping address"
                  multiline
                  rows={4}
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="city"
                  name="city"
                  label="City"
                  fullWidth
                  autoComplete="shipping address-level2"
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="state"
                  name="state"
                  label="State/Province/Region"
                  fullWidth
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="zip"
                  name="zip"
                  label="Zip / Postal code"
                  fullWidth
                  autoComplete="shipping postal-code"
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  fullWidth
                  autoComplete="tel"
                  style={{backgroundColor:'white'}}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  sx={{ padding: ".9rem 1.5rem" }}
                  size="large"
                  type="submit"
                  variant="contained"
                  color="info"
                >
                  Deliver Here
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card.Body>
      </Card>  
      
    );
  };


  return (
    <>
        {addressFormView()}
    </>
  )
}

export default DeliveryAddressFormComp