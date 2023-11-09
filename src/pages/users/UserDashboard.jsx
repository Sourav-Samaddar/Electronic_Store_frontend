import { NavLink, Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../../auth/HelperAuth";
import { Button, Card, Col, Container, Row } from "react-bootstrap";

const UserDashboard = () =>{

    const dashBoardView = ()=>{
        return(
            <div>
                <Outlet />
            </div>
        )
    }

    const notLoggedInView = ()=>{
        return(
            <Container>
                <Col xs={{
                    span:8,offset:2
                }}>
                    <Row>
                        <Card className="text-center border-0 shadow">
                            <Card.Body>
                                <h3>You are not logged In !!</h3>
                                <p>Please do login to view the page </p>
                                <Button as={NavLink} to={'/login'} 
                                className="text-uppercase" variant="success">Login Now</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Col>
            </Container>
        )
    }

    return (
      (isLoggedIn())  ? dashBoardView() : <Navigate to={'/login'} />
    )
    // return (
    //     (isLoggedIn())  ? dashBoardView() : notLoggedInView()
    // )
    
}

export default UserDashboard;