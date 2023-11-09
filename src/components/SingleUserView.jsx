import React from 'react'
import { Badge, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { getUserImageUrl } from '../services/helper.service'
import defaultImage from '../assets/default_profile.jpg'
import ImageViewComp from './ImageViewComp'

const SingleUserView = ({user}) => {

  const profileStyle = {
    height:"80px",
    width:"80px",
    borderRadius: "50%",
    objectFit:'cover'
  }  

  return (
    <Card className='shadow-sm mb-2'>
        <Card.Body>
            <Row>
                <Col sm={{span:2}} md={1}>
                    {/* {
                        user.imageName && user.imageName.startsWith('http') ?
                        <img src={user.imageName} className='rounded-circle' style={profileStyle}/> :
                        <img className='rounded-circle' style={profileStyle} 
                        src={user.imageName && user.imageName !== 'default.png' && 
                            !user.imageName.startsWith('http') ? 
                        getUserImageUrl(user.userId) : defaultImage} />
                    } */}
                    <ImageViewComp 
                        compId={user.userId} 
                        imageName={user.imageName}
                        getImageUrl={getUserImageUrl}
                        defaultStyle={profileStyle}
                        defaultImage={defaultImage}
                    />
                    
                </Col>
                <Col sm={{span:10}} md={11} className='ps-5'>
                    <Link to={`/users/profile/${user.userId}`}>{user.name}</Link>
                    <p className='text-muted'>{user.about}</p>
                    <p className='text-muted'>{user.email}</p>
                    {
                        user.roles.map(role=>{
                            return(
                                <Badge key={role.roleId} bg={role.roleName === 'ROLE_ADMIN' ? 'success' : 'info'} 
                                className='mx-2' pill>
                                    {role.roleName}
                                </Badge>
                            )
                        })
                    }
                </Col>
            </Row>
        </Card.Body>
    </Card>
  )
}

export default SingleUserView