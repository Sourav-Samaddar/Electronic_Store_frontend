import React, { useEffect, useState } from 'react'
import { getAllUsers, searchUserByName } from '../../services/user.service'
import { toast } from 'react-toastify'
import { USER_PAGE_SIZE } from '../../services/helper.service'
import { Alert, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import SingleUserView from '../../components/SingleUserView'
import InfiniteScroll from 'react-infinite-scroll-component'
import { BsSearch } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const AdminUsers=()=> {

  const [userData,setUserData] = useState(undefined)

  const [currentPage,setCurrentPage] = useState(0)

  const [searchQuery,setSearchQuery] = useState('')

  useEffect(()=>{
    getUsers(0,USER_PAGE_SIZE,'name','asc')
  },[])

  useEffect(()=>{
    if(currentPage>0){
      getUsers(currentPage,USER_PAGE_SIZE,'name','asc')
    }
  },[currentPage])

  const getUsers = (pageNumber,pageSize,sortBy,sortDirection) =>{
  
    getAllUsers(pageNumber,pageSize,sortBy,sortDirection)
    .then(userResp => {
      //console.log(userResp)
      if(currentPage === 0){
        setUserData(userResp)
      }else{
        setUserData({
          content: [...userData.content, ...userResp.content],
          isLastPage: userResp.isLastPage,
          pageNumber: userResp.pageNumber,
          pageSize: userResp.pageSize,
          totalElements: userResp.totalElements,
          totalPages: userResp.totalPages

        })
      }
      
    }).catch(err=>{
      //console.log(err)
      toast.error('Error loading all users')
    })
  }

  const loadNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const searchUser = () =>{
    if(searchQuery === undefined || searchQuery.trim() === ''){
      getUsers(0,USER_PAGE_SIZE,'name','asc')
    }
    else{
      searchUserByName(searchQuery,0,USER_PAGE_SIZE,'name','asc')
      .then(userResp=>{
        setUserData(userResp)
      }).catch(err=>{
        toast.error("Error loading user by search")
      })
    }
  }

  const userView = () =>{
    return(
      <Container>
        <Row>
          <Col xs={9}>
            <InputGroup className='mb-2'>
              <Form.Control type='text'
              placeholder='Search User'
              onChange={event => setSearchQuery(event.target.value)}
              />
              <Button onClick={searchUser}>
                <BsSearch size={20}/>
              </Button>
            </InputGroup>
          </Col>
          <Col xs={3}>
            <Button as={Link} to={'/admin/users/table'} variant='info'>
              Show In Table Format
            </Button>
          </Col>
        </Row>
        
        <InfiniteScroll
          dataLength={userData.content.length}
          next={loadNextPage}
          hasMore={!userData.isLastPage}
          loader={<h3 className="text-center my-4">Loading...</h3>}
          endMessage={<p className="my-3 text-center">All orders loaded</p>}
          >
            {
              userData.content.map(user => {
                return(
                  <SingleUserView key={user.userId} 
                  user={user}
                  />
                )
              })
            }
        </InfiniteScroll>
      </Container>
    )
  }

  return (
    <>
      {
        userData ? userView() :
        <Alert>
          <h5>No User data available</h5>
        </Alert>
      }
    </>
    
  )
}

export default AdminUsers