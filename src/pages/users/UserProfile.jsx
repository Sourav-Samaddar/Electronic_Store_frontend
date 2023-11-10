import { useEffect, useState } from "react";
import UserProfileView from "../../components/users/UserProfileView";
import { getUser, updateUser, updateUserProfilePicture } from "../../services/user.service";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Alert, Button, Card, Col, Container, Form, InputGroup, Modal, Row, Spinner, Table } from "react-bootstrap";
import defaultImage from '../../assets/default_profile.jpg'
import Footer from "../../components/Footer";
const UserProfile = () =>{

    const [user,setUser] = useState(null);

    const [show,setShow] = useState(false);

    const [updateLoading,setUpdateLoading] = useState(false);

    const [image, setImage] = useState({
        placeholder: defaultImage,
        file: null
    })

    const {userId} = useParams();

    useEffect(()=>{
        getUserDataFromServer()
    },[userId])

    const handleClose = () =>{
        setShow(false);
    } 
    const handleShowModal = ()=>{
        //console.log("handleShowModal clicked now")
        setShow(true);
    }

    const getUserDataFromServer = ()=>{
        getUser(userId)
        .then(userData =>{
            //console.log(userData)
            setUser(userData);
        }).catch(err=>{
            setUser(null);
            toast.error("Error in loading user information from server !")
        })
    }

    const handleFieldUpdate = (event,property)=>{
        setUser({...user,[property]:event.target.value});
    }

    const updateUserData = ()=>{
        //console.log(user)
        if(user.name === undefined || user.name.trim() === ''){
            toast.error("Name is a required field")
            return
        }
        if(user.password !== undefined && user.password.trim() !== '' && 
        user.password.length < 4){
            toast.error("password should be minimum 4 characters")
            return
        }
        setUpdateLoading(true)
        
        updateUser(user)
        .then(userData=>{
            toast.success("User details updated !!")
            if (image.file == null) {
                setUpdateLoading(false)
                handleClose()
                return
            }
            user.imageName = null;
            setUser(user)
            updateUserProfilePicture(image.file,user.userId)
            .then(resp=>{
                toast.success(resp.message)
                user.imageName = resp.imageName
                setUser(user)
                handleClose()
            })
            .catch(err=>{
                toast.error("Image not uploaded !!")
            }).finally(()=>{
                setUpdateLoading(false)
            })
        }).catch(err=>{
            toast.error("Update User failed")
        }).finally(()=>{
            setUpdateLoading(false)
        })
    }

    //function for image change
    const handleProfileImageChange = (event) => {
        // const localFile=event.target.files[0]
        //console.log(event.target.files[0])
        if (event?.target?.files[0]?.type === 'image/png' || 
            event?.target?.files[0]?.type === 'image/jpeg') {
            //preview show
            const reader = new FileReader()
            reader.onload = (r) => {
                setImage({
                    placeholder: r.target.result,
                    file: event.target.files[0]
                })

                //console.log(r.target.result)
            }

            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("Invalid File !!")
            image.file = null
        }

    }

    //clear the image
    const clearImage = () => {
        setImage({
            placeholder: defaultImage,
            file: null
        })
    }

    const updateViewModal = ()=>{
        return(
            <div>
                <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update User Informations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Card className="shadow" style={{
                            borderRadius:"50px"
                        }}>
                            <Card.Body>
                                {/* {JSON.stringify(user)} */}
                                <Table responsive hover>
                                    <tbody>
                                        <tr>
                                            <td>Profile Image</td>
                                            <td>
                                                <Container className="mb-3">
                                                    <img style={{
                                                        height:"200px",
                                                        width:"200px",
                                                        objectFit:"contain"
                                                    }} src={image.placeholder} alt="Preview"/>
                                                </Container>
                                                <InputGroup>
                                                    <Form.Control type='file' onChange={handleProfileImageChange} />
                                                    <Button onClick={clearImage} variant="outline-secondary"> Clear </Button>
                                                </InputGroup>
                                                <p className="mt-2 text-muted">Select Square size picture for better ui.</p>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <Form.Control type="text" value={user.name} 
                                                onChange={(e)=>handleFieldUpdate(e,'name')}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>New Password</td>
                                            <td>
                                                <Form.Control type="password" 
                                                placeholder="Enter New Password"
                                                onChange={(e)=>handleFieldUpdate(e,'password')}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>
                                                <Form.Group className="mb-3" controlId="formGender">
                                                    <div>
                                                        <Form.Check
                                                            inline
                                                            name="gender"
                                                            label="Male"
                                                            type={'radio'}
                                                            id={`gender`}
                                                            value={'Male'}
                                                            checked={user.gender === 'Male'}
                                                            onChange={e => handleFieldUpdate(e, 'gender')}
                                                        />

                                                        <Form.Check
                                                            inline
                                                            name="gender"
                                                            label="Female"
                                                            type={'radio'}
                                                            id={`gender`}
                                                            value={'Female'}
                                                            checked={user.gender === 'Female'}
                                                            onChange={e => handleFieldUpdate(e, 'gender')}
                                                        />
                                                    </div>
                                                </Form.Group>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>About</td>
                                            <td>
                                                <Form.Control as="textarea" value={user.about} 
                                                onChange={(e)=>handleFieldUpdate(e,'about')}
                                                />
                                            </td>
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
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={updateUserData} disabled={updateLoading}>
                            <Spinner
                                animation="border"
                                size="sm"
                                hidden={!updateLoading}
                                className="me-2"
                            />
                            <span hidden={updateLoading}>Update User</span>
                            <span hidden={!updateLoading}>Updating...</span>
                        </Button>
                        <Button variant="warning" onClick={handleClose}> close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }

    return(
        <div>
            <Container>
                <Row>
                    <Col md={{span:10,offset:1}} sm={12}>
                    
                        {user ? (
                            <>
                                <UserProfileView user={
                                // {
                                //     name: "Sourav Samaddar",
                                //     email: "sourav.smddr@gmail.com",
                                //     gender: 'MALE',
                                //     about: "I am professional react developer.",
                                //     userId:"a9e173be-ea95-462e-812b-73d8b4320813",
                                //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: 'NORMAL' }]
                                // }
                                user
                                }

                                handleShowModal={handleShowModal}
                                />
                                {updateViewModal()}
                            </>
                        ):(<Alert>
                            <h3 className="text-center text-uppercase m-2">
                                User not loaded from server !
                            </h3>
                            </Alert>)
                        }
                        
                    
                    </Col>
                </Row>
            </Container>
            <Footer />
        </div>
    ) 
}
export default UserProfile;