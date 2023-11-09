import Container from "react-bootstrap/esm/Container";
import Base from "../components/Base"
import {Row, Col, Card, Form, Button, Spinner} from 'react-bootstrap';
import logo from '../assets/logo.png'
import { useState } from "react";
import { toast } from "react-toastify"
import { registerUser } from "../services/user.service";
import { NavLink } from "react-router-dom";
const Register = () => {

    const [data,setData] = useState({
        name:'',
        email:'',
        password:'',
        confirmPassword:'',
        about:'',
        gender:'',
        imageName:'default.png'
    })

    const [errorData, setErrorData] = useState({
        isError: false,
        errorData: null
    })

    const [loading, setLoading] = useState(false)

    const clearData = () =>{
        setData({
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            about:'',
            gender:'',
            imageName:'default.png'
        })

        setErrorData({
            isError: false,
            errorData: null
        })
    }

    const handleChange = (event,property) =>{
        setData({...data,[property]:event.target.value})
    }

    const submitForm = (event)=>{
        event.preventDefault();
        
        if(data.name === undefined || data.name.trim() === ''){
            toast.error('name is required !!')
            return
        }
        if(data.email === undefined || data.email.trim() === ''){
            toast.error('email is required !!')
            return
        }
        if(data.gender === undefined || data.gender.trim() === ''){
            toast.error('Please select gender !!')
            return
        }
        if(data.password === undefined || data.password.trim() === ''){
            toast.error('password is required !!')
            return
        }
        if(data.confirmPassword === undefined || data.confirmPassword.trim() === ''){
            toast.error('confirmPassword is required !!')
            return
        }
        if(data.confirmPassword !== data.password){
            toast.error('password and confirmPassword does not match !!')
            return
        }

        setLoading(true)
        registerUser(data)
            .then(userData => {
                //success handler
                //console.log(userData)
                toast.success("User created successfully !!");
                clearData()

            })
            .catch(error => {
                //error handler
                //console.log(error)
                setErrorData({
                    isError: true,
                    errorData: error
                })
                toast.error("Error in creating user ! Try again")
            })
            .finally(()=>{
                setLoading(false)
            })
    }

    const registerForm = () =>{
        return (
            <Container >
                <Row>
                    <Col sm={12} md={{span:8, offset:2}}>
                        <Card className="my-2 border-0 shadow p-4"  style={
                            {
                                position:"relative",
                                top:-60
                            }
                        }>
                            {/* {JSON.stringify(data)} */}
                            <Card.Body>
                                <Container className="text-center mb-3">
                                    <img width={50} height={50} src={logo} alt="Store Logo"></img>
                                </Container>

                                <h3 className="mb-4 text-center text-uppercase">Store SignUp Here</h3>
                                <Form noValidate onSubmit={submitForm}>

                                    <Form.Group className="mb-3" controlId="formName">
                                        <Form.Label>Enter your name</Form.Label>
                                        <Form.Control value={data.name} type="text" 
                                        onChange={e=>handleChange(e,'name')}
                                        placeholder="Enter name" 
                                        isInvalid={errorData.errorData?.response?.data?.name}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorData.errorData?.response?.data?.name}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formEmail">
                                        <Form.Label>Enter your email</Form.Label>
                                        <Form.Control value={data.email} type="email" 
                                        onChange={e=>handleChange(e,'email')}
                                        placeholder="Enter email" 
                                        isInvalid={errorData.errorData?.response?.data?.email}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorData.errorData?.response?.data?.email}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formPassword">
                                        <Form.Label>Enter your password</Form.Label>
                                        <Form.Control value={data.password} type="password" 
                                        onChange={e=>handleChange(e,'password')}
                                        placeholder="Enter password" 
                                        isInvalid={errorData.errorData?.response?.data?.password}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorData.errorData?.response?.data?.password}
                                        </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formConfirmPassword">
                                        <Form.Label>Confirm your password</Form.Label>
                                        <Form.Control value={data.confirmPassword} type="password" 
                                        onChange={e=>handleChange(e,'confirmPassword')}
                                        placeholder="Re Enter password" />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formGender">
                                        <Form.Label>Select Gender</Form.Label>
                                        <div>
                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Male"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'Male'}
                                                checked={data.gender === 'Male'}
                                                onChange={e => handleChange(e, 'gender')}
                                            />

                                            <Form.Check
                                                inline
                                                name="gender"
                                                label="Female"
                                                type={'radio'}
                                                id={`gender`}
                                                value={'Female'}
                                                checked={data.gender === 'Female'}
                                                onChange={e => handleChange(e, 'gender')}
                                            />
                                          
                                        </div>
                                                                           
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formAbout">
                                        <Form.Label>Write something about yourself</Form.Label>
                                        <Form.Control value={data.about} as="textarea" rows={6} 
                                        onChange={e=>handleChange(e,'about')}
                                        placeholder="write here" 
                                        isInvalid={errorData.errorData?.response?.data?.about}
                                        />
                                        <Form.Control.Feedback type="invalid">
                                            {errorData.errorData?.response?.data?.about}
                                        </Form.Control.Feedback>
                                        
                                    </Form.Group>

                                    <Container className="mb-3" >
                                        <p className="text-center">
                                            Allready registered ! <NavLink to="/login">Login</NavLink>
                                        </p>
                                    </Container>

                                    <Container className="text-center">
                                        <Button className="text-uppercase" 
                                        type="submit" variant="success" disabled={loading}>
                                            <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                                hidden={!loading}
                                            />
                                            <span hidden={!loading}>Wait...</span>
                                            <span hidden={loading}>Register</span>
                                        </Button>
                                        <Button className="ms-2 text-uppercase" variant="danger"
                                        onClick={clearData}>
                                            Reset
                                        </Button>
                                    </Container>

                                </Form>

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }

    return (
        <Base title="Electro Store / Register" description="Please enter correct values for registration">
            {registerForm()}
        </Base>
    )
}

export default Register;