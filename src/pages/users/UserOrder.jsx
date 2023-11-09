import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getOrdersOfUser } from '../../services/OrderServices';
import { Alert, Card, Container } from 'react-bootstrap';
import SingleOrderView from '../../components/SingleOrderView';
import InfiniteScroll from 'react-infinite-scroll-component';
import UserContext from '../../context/UserContext';
import useJwtTokenExpiration from '../../hooks/useJwtTokenExpiration';
import ViewOrderModalComp from '../../components/ViewOrderModalComp';
import Footer from '../../components/Footer';

const UserOrder = ()=>{

    const flag = useJwtTokenExpiration();

    const { userData, isLogin } = useContext(UserContext)

    const [ordersData,setOrdersData] = useState(undefined);

    const [currentPage,setCurrentPage] = useState(0);

    const [selectedOrder, setSelectedOrder] = useState(undefined)

    //For view
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        //const urlParams = new URLSearchParams(window.location.search);
        if (isLogin) {
            loadOrderOfUsers()
        }
    }, [isLogin])

    const loadOrderOfUsers = async () => {

        try {
            const result = await getOrdersOfUser(userData.user.userId)
            //console.log(result)
            setOrdersData(result)

        } catch (error) {
            //console.log(error)
            toast.error("Error in loading orders")
        }

    }

    const openViewOrderModal = (event, order) =>{
        //console.log(order)
        setSelectedOrder({...order})
        handleShow()
    }

    const loadNextPage = () => {
        setCurrentPage(currentPage + 1)
    }

    //view order modal
    const viewOrderModal = () => {
        return selectedOrder && (
            <ViewOrderModalComp displayModal={show} 
            handleCloseModal={handleClose} selectedOrder={selectedOrder}/>
        )
    }

    const ordersView = () =>{
        return(
          <Card className='shadow-sm'>
            <h5 className='text-center text-uppercase text-primary mt-2'>User Orders are here</h5>
            <Card.Body>
              <InfiniteScroll
              dataLength={ordersData.content.length}
              next={loadNextPage}
              hasMore={!ordersData.isLastPage}
              loader={<h3 className="text-center my-4">Loading...</h3>}
              endMessage={<p className="my-3 text-center">All orders loaded</p>}
              >
                {
                  ordersData.content.map(order => {
                    return(
                      <SingleOrderView key={order.orderId} 
                      order={order}
                      openViewOrderModal={openViewOrderModal}
                      />
                    )
                  })
                }
              </InfiniteScroll>
            </Card.Body>
          </Card>
        )
    }

    return (
        <>
            <div className='body-section'>
                {/* {JSON.stringify(ordersData)} */}
                <Container>
                    {
                        ordersData ? ordersView() : 
                        <Alert>
                            <h5>No Orders Available</h5>
                        </Alert>
                    }
                    {
                        viewOrderModal()
                    }
                
                </Container>
            </div>
            <Footer />
        </>
    )
}


export default UserOrder;