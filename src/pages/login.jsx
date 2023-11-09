import { Alert, Button, Card, Col, Container, Form, Row, Spinner } from "react-bootstrap"
import Base from "../components/Base"
import logo from "../assets/logo.png"
import { useContext, useState } from "react"
import { toast } from "react-toastify"
import { loginUser } from "../services/user.service"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"
import SocialLoginComp from "../components/SocialLoginComp"
const Login = () => {

    const userContext = useContext(UserContext);

    const redirect = useNavigate();

    const [data,setData] = useState({
        email:'',
        password:''
    })

    const [loading,setLoading] = useState(false);

    const [error,setError] = useState({
        errorData:'',
        isError:false
    })

    const cleardata = () =>{
        setData({
            email:'',
            password:''
        })
        setError({
            errorData:'',
            isError:false
        })
    }

    const handleChange = (event,property) =>{
        setData({...data,[property]:event.target.value})
    }

    const submitForm = (event) =>{
        event.preventDefault();
        if(data.email === undefined || data.email.trim() === ''){
            toast.error("Please enter email Id !!")
            return
        }
        if(data.password === undefined || data.password.trim() === ''){
            toast.error("Please enter password !!")
            return
        }
        setLoading(true)
        loginUser(data)
        .then(userData=>{
            //console.log(userData);
            toast.success("Login Successful")
            setError({
                errorData: null,
                isError: false
            })
            userContext.login(userData)
            redirect('/')
        }).catch(err=>{
            //console.log(err)
            setError({
                errorData:err,
                isError:true
            })
            toast.error("Login Failed")
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    const loginForm = () =>{
        return(
            <div>
                <Container>
                    <Row>
                        <Col sm={12} md={{span:8,offset:2}}>
                            <Card className="my-3 border-0 shadow p-4" style={{
                                position:"relative",
                                top:-60
                            }}>
                                <Card.Body>
                                    {/* {JSON.stringify(data)} */}
                                    <Container className="mb-3 text-center">
                                        <img height={50} width={50} src={logo} alt='logo'></img>
                                    </Container>
                                    <h3 className="mb-4 text-center text-uppercase">Store Login</h3>

                                    <Alert dismissible onClose={()=>{
                                        setError({
                                            errorData:'',
                                            isError:false
                                        })
                                    }} variant="danger" show={error.isError}>
                                        <Alert.Heading>Hey there,</Alert.Heading>
                                        <p>{error.errorData?.response?.data?.message}</p>
                                    </Alert>

                                    <Form noValidate onSubmit={submitForm}>

                                        <Form.Group className="mb-3" controlId="formEmail">
                                            <Form.Label>User Name</Form.Label>
                                            <Form.Control type="text" value={data.email} 
                                            onChange={e => handleChange(e,'email')}
                                            placeholder="Enter Email"/>
                                        </Form.Group>

                                        <Form.Group className="mb-3" controlId="formPassword">
                                            <Form.Label>User Password</Form.Label>
                                            <Form.Control type="password" value={data.password} 
                                            onChange={e => handleChange(e,'password')}
                                            placeholder="Enter Password" />
                                        </Form.Group>

                                        <Container className="text-center">
                                            <Button type="submit" className="text-uppercase" 
                                            variant="primary" disabled={loading}>
                                                <Spinner
                                                animation="border"
                                                size="sm"
                                                className="me-2"
                                                hidden={!loading}
                                            />
                                                <span hidden={loading}>Login</span>
                                                <span hidden={!loading}>Wait...</span>
                                            </Button>
                                            <Button className="ms-2 text-uppercase"
                                            variant="danger" onClick={cleardata}>
                                                Reset
                                            </Button>
                                        </Container>
                                        <SocialLoginComp />
                                    </Form>
                                    
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
        
    }

    return (
        <Base title="Electro Store / Login" description={null}>
            {loginForm()}
        </Base>
    )
}

export default Login;