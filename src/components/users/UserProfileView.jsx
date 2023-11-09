import { useContext } from "react";
import { Button, Card, Container, Table } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import profileImage from "./../../assets/default_profile.jpg"
import { BASE_URL, getUserImageUrl } from "../../services/helper.service";
import ImageViewComp from "../ImageViewComp";

const UserProfileView = ({user=null, handleShowModal})=>{

    const {userData, isLogin} = useContext(UserContext);

    const profileStyle = {
        height: "200px",
        width: "200px",
        borderRadius: "50%",
        objectFit: "cover"
    }
    
    return(
        <>
            {user && 
                <Card className="border-0 shadow body-section">
                    <Card.Body>
                        <Container fluid className="text-center my-2">
                            {/* {
                               user.imageName && user.imageName.startsWith('http') ?
                               <img src={user.imageName}  style={profileStyle}/> :
                               <img src={user.imageName && 
                                user.imageName.toUpperCase() !== 'default.png'.toUpperCase() ? 
                                BASE_URL + '/users/image/' + user.userId : profileImage} 
                                     style={profileStyle} alt="profile"></img>
                            } */}
                            <ImageViewComp 
                                compId={user.userId} 
                                imageName={user.imageName}
                                getImageUrl={getUserImageUrl}
                                defaultStyle={profileStyle}
                                defaultImage={profileImage}
                            />
                            
                        </Container>
                        <h3 className="text-center text-uppercase text-color-primary">{user.name}</h3>
                        <div className="mt-3">
                            <Card className="border-0 shadow-sm"  style={{
                                    borderRadius:"50px" }}>
                                <Card.Body>
                
                                    <Table className="text-center" 
                                        striped bordered variant="info" responsive hover>
                                        <tbody>
                                            <tr>
                                                <td>Name</td>
                                                <td>{user.name}</td>
                                            </tr>
                                            <tr>
                                                <td>Email</td>
                                                <td>{user.email}</td>
                                            </tr>
                                            <tr>
                                                <td>Gender</td>
                                                <td>{user.gender}</td>
                                            </tr>
                                            <tr>
                                                <td>About</td>
                                                <td>{user.about}</td>
                                            </tr>
                                            <tr>
                                                <td>Role</td>
                                                <td>{user.roles.map(role=><div key={role.roleId}>
                                                    {role.roleName}</div>)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Card.Body>
                            </Card>
                        </div>
                        {
                            isLogin && userData.user.userId === user.userId  ? 
                            (
                               <Container className="text-center mt-3">
                                    <Button variant="success" onClick={handleShowModal}>Update</Button>
                                    <Button className="ms-2" variant="danger">Orders</Button>
                               </Container>     
                            ) : ''
                        }                        
                    </Card.Body>
                </Card>
                
            }
        </>
    )
}
export default UserProfileView;