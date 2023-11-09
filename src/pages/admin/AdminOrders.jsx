import React, { useEffect, useState } from 'react'
import { ADMIN_ORDER_PAGE_SIZE } from "../../services/helper.service"
import { toast } from 'react-toastify';
import { getAllOrders, updateOrder } from '../../services/OrderServices';
import { Alert, Card, Container } from 'react-bootstrap';
import SingleOrderView from '../../components/SingleOrderView';
import InfiniteScroll from 'react-infinite-scroll-component';
import useJwtTokenExpiration from '../../hooks/useJwtTokenExpiration';
import ViewOrderModalComp from '../../components/ViewOrderModalComp';
import UpdateOrderModalComp from '../../components/UpdateOrderModalComp';

const AdminOrders=()=> {

  const flag = useJwtTokenExpiration();

  const [ordersData,setOrdersData] = useState(undefined);

  const [currentPage,setCurrentPage] = useState(0);

  const [selectedOrder, setSelectedOrder] = useState(undefined)

  //For view
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //for update
  const [updateShow, setUpdateShow] = useState(false);
  const handleUpdateClose = () => setUpdateShow(false);
  const handleUpdateShow = () => setUpdateShow(true);

  const openViewOrderModal = (event, order) =>{
    //console.log(order)
    setSelectedOrder({...order})
    handleShow()
  }

  const openEditOrderModal = (event, order) => {
    //console.log(order)
    setSelectedOrder({ ...order })
    handleUpdateShow()
  }

  useEffect(()=>{
    getOrdersLocally()
  },[])

  useEffect(()=>{
    if(currentPage>0){
      getOrdersLocally()
    }
  },[currentPage])

  const getOrdersLocally = async () =>{
    try{
      const data = await getAllOrders(currentPage,ADMIN_ORDER_PAGE_SIZE,'orderdDate', 'desc')
      //console.log(data)
      if(currentPage === 0){
        setOrdersData(data)
      }else{
        setOrdersData({
          content: [...ordersData.content,...data.content],
          isLastPage: data.isLastPage,
          pageNumber: data.pageNumber,
          pageSize: data.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages
        })
      }
    }catch(err){
      toast.error("Not able to load orders from server")
    }
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

  //submit update form
  const handleOrderUpdate = async (event) => {
    event.preventDefault()
    if (selectedOrder.billingName.trim() === '') {
      toast.error("Billing name required !!")
      return;
    }
    try{
      const updatedOrder = await updateOrder(selectedOrder, selectedOrder.orderId)
      toast.success("Order datails updated", {
        position: "top-right"
      })

      const newList = ordersData.content.map(item =>{
        if(item.orderId === selectedOrder.orderId){
          return updatedOrder
        }
        return item;
      })

      setOrdersData({...ordersData,content:newList})
    }catch(e){
      toast.error("Order not updated ")
    }
  }

  const updateOrderModal = () => {
    return selectedOrder && (
      <UpdateOrderModalComp displayModal={updateShow} 
        handleCloseModal={handleUpdateClose} selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder} handleOrderUpdate={handleOrderUpdate}/>
    )
  }
  
  const ordersView = () =>{
    return(
      <Card className='shadow-sm'>
        <h5 className='text-center text-uppercase text-primary mt-2'>All Orders are here</h5>
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
                  openEditOrderModal={openEditOrderModal}
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
        {
          updateOrderModal()
        }
      </Container>
    </>
    
  )
}

export default AdminOrders