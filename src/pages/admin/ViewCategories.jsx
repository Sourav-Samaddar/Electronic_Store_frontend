import { useEffect, useState } from "react"
import { Container, Spinner, Modal, Button, Form, FormGroup, Alert, InputGroup } from "react-bootstrap"
import InfiniteScroll from "react-infinite-scroll-component"
import { toast } from "react-toastify"
import Swal from "sweetalert2"
import CategoryView from "../../components/admin/CategoryView"
import { deleteCategory, getCategories, updateCategory, uploadCategoryPicture } from "../../services/CategoryService"
import { BASE_URL } from "../../services/helper.service"
import defaultCategoryImage from "../../assets/category1.png"
const ViewCategories = () => {

    const [categories, setCategories] = useState({
        content: []
    })
    const [currentPage, setCurrentPage] = useState(0)

    const [image, setImage] = useState({
      placeholder: defaultCategoryImage,
      file: null
    })

    const [selectedCategory, setSelectedCategory] = useState(undefined)
    const [loading, setLoading] = useState(false)


    //view modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //update
    const [showUpdate, setShowUpdate] = useState(false);
    const handleCloseUpdate = () => setShowUpdate(false);
    const handleShowUpdate = () => setShowUpdate(true);

    //intial page load
    useEffect(() => {
        setLoading(true)
        getCategories(0, 4)
            .then(data => {
                //console.log(data);
                setCategories(data)

            })
            .catch(error => {
                toast.error("Error in loading categories from server !!")
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    //current page load
    useEffect(() => {

        if (currentPage > 0) {

            getCategories(currentPage, 4)
                .then(data => {
                    //console.log(data);
                    setCategories(
                        {
                            content: [...categories.content, ...data.content],
                            isLastPage: data.isLastPage,
                            pageNumber: data.pageNumber,
                            pageSize: data.pageSize,
                            totalElements: data.totalElements,
                            totalPages: data.totalPages
                        }
                    )

                })
                .catch(error => {
                    toast.error("Error in loading categories from server !!")
                })


        }

    }, [currentPage])


    //delete categoryMain function
    const deleteCategoryMain = (categoryId) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                //call api 

                deleteCategory(categoryId)
                    .then(data => {
                        Swal.fire(
                            'Deleted!',
                            'Your file has been deleted.',
                            'success'
                        )

                        const newArray = categories.content.filter((c) => {
                            return c.categoryId != categoryId
                        })

                        setCategories({
                            ...categories,
                            content: newArray
                        })
                    })

                    .catch(error => {
                        toast.error("Error in deleeting category")
                    })

            }
        })

    }


    // handle View button of category:

    const handleView = (category) => {
        //alert("view button clicked")
        setSelectedCategory(category)
        handleShow()
    }


    // handle update of category:
    const handleUpdate = (category) => {
        clearImage()
        setSelectedCategory(category)
        handleShowUpdate()
    }

    const handleCategoryImageChange = (event) => {
      if (event?.target?.files[0]?.type === 'image/png' || 
        event?.target?.files[0]?.type === 'image/jpeg' || 
        event?.target?.files[0]?.type === 'image/jpg') {
            //preview show
            const reader = new FileReader()
            reader.onload = (r) => {
                setImage({
                    placeholder: r.target.result,
                    file: event.target.files[0]
                })
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
          placeholder: defaultCategoryImage,
          file: null
      })
    }

    //update the category to server
    const updateCategoryClicked = (event) => {
      event.preventDefault();
      if(selectedCategory.title === undefined || selectedCategory.title.trim() === ''){
        toast.error("Category title is required")
        return
      }
      if(selectedCategory.description === undefined || selectedCategory.description.trim() === ''){
        toast.error("Category description is required")
        return
      }
  
      updateCategory(selectedCategory)
      .then(resp=>{
        toast.success("Category updated successfully !!")

        //The images value should be set null first to show the change in update
        const newCategories = categories.content.map(cat => {
          if (cat.categoryId === selectedCategory.categoryId) {
              cat.title = resp.title
              cat.description = resp.description
          }
          return cat;
        })
        setCategories({
            ...categories,
            content: newCategories
        })
          
        if(image.file !== null){

          const newCategories = categories.content.map(cat => {
            if (cat.categoryId === selectedCategory.categoryId) {
                cat.title = resp.title
                cat.description = resp.description
                cat.coverImage = null
            }
            return cat;
          })
          setCategories({
              ...categories,
              content: newCategories
          })

          uploadCategoryPicture(image.file,selectedCategory.categoryId)
          .then(imgresp=>{
            toast.success(imgresp.message)
    
            const newCategories = categories.content.map(cat => {
              if (cat.categoryId === selectedCategory.categoryId) {
                  cat.title = resp.title
                  cat.description = resp.description
                  cat.coverImage = imgresp.imageName
              }
              return cat;
            })
            setCategories({
                ...categories,
                content: newCategories
            })
          })
          .catch(err=>{
            toast.error("Error in uploading Category Image !!")
          })
        }
        
        
        handleCloseUpdate()
      }).catch(err=>{
        toast.error("Error is updating category")
      })
    }


    //load next page function

    const loadNextPage = () => {
        //console.log("loading next page")
        setCurrentPage(currentPage + 1)
    }


    // modal view: view and update:
    const modalView = () => {
        return (
          <>
          <Modal animation={false} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{selectedCategory.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container>
                <img src={selectedCategory.coverImage ? 
                  BASE_URL +"/categories/image/"+selectedCategory.categoryId  :defaultCategoryImage} 
                  style={{
                    width:'100%',
                    height:"250px",
                    objectFit : 'contain'
                  }}
                  />
                  <div className='mt-4' style={{
                    height:'100px',
                    overflowY:'auto'
                  }}>
                    {selectedCategory.description}
                  </div>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleClose} variant='secondary'>Close</Button>
            </Modal.Footer>
          </Modal>
        </>
        )
    }


    //update mdal
    const modalUpdate = () => {
        return (
          <>
            <Modal animation={false} show={showUpdate} onHide={handleCloseUpdate}>
              <Modal.Header closeButton>
                <Modal.Title>{selectedCategory.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Category Title</Form.Label>
                    <Form.Control type='text' value={selectedCategory.title} 
                    placeholder='Enter title'
                    onChange={(event)=>{
                      setSelectedCategory({...selectedCategory,title:event.target.value})
                    }}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Category Description</Form.Label>
                    <Form.Control as={'textarea'} value={selectedCategory.description} 
                    placeholder='Enter description'
                    onChange={(event)=>{
                      setSelectedCategory({...selectedCategory,description:event.target.value})
                    }}
                    />
                  </Form.Group>
                  <Container className="mb-3">
                      <img style={{
                          height:"100px",
                          width:"100px",
                          objectFit:"contain"
                      }} src={image.placeholder} alt="Preview"/>
                  </Container>
                  <InputGroup>
                      <Form.Control type='file' onChange={handleCategoryImageChange} />
                      <Button onClick={clearImage} variant="outline-secondary"> Clear </Button>
                  </InputGroup>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={updateCategoryClicked} variant='success'>Update Category</Button>
                <Button onClick={handleCloseUpdate} variant='secondary'>Close</Button>
              </Modal.Footer>
            </Modal>
          </>
        )
    }
    return (<div>

        {/* loader  */}
        <Container className="text-center p-3" hidden={!loading}>
            <Spinner />
            <div>
                <h3> Loding....</h3>
            </div>
        </Container>

        {
          ( categories.content.length > 0 ? (
                <>

                    <InfiniteScroll
                        dataLength={categories.content.length}
                        next={loadNextPage}
                        hasMore={!categories.isLastPage}
                        loader={<h2 className="p-2 text-center">Loading.....</h2>}
                        endMessage={
                            <p style={{ textAlign: 'center' }}>
                                <b>Yay! You have seen it all</b>
                            </p>
                        }
                    >
                        {
                            categories.content.map((category) => {
                                return (
                                    <CategoryView
                                        viewCat={handleView}
                                        updateCat={handleUpdate}
                                        deleteCat={deleteCategoryMain}
                                        category={category}
                                        key={category.categoryId}

                                    />)
                            })
                        }

                    </InfiniteScroll>
                </>
            ) : (
                  <>
                    <Alert>
                      <h5>No Categories Available</h5>
                    </Alert>
                  </>
                )
          )
        }

        {
            selectedCategory ? modalView() : ''
        }

        {
            selectedCategory ? modalUpdate() : ''
        }
    </div>)
}

export default ViewCategories