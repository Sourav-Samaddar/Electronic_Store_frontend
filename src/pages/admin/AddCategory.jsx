import React, { useState } from 'react'
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap'
import { addCategory } from '../../services/CategoryService'
import { toast } from "react-toastify"

const AddCategory=()=> {

  const [category,setCategory] = useState({
    title:'',
    description:''
  })

  const [loading,setLoading] = useState(false);

  const clearFields = () =>{
    setCategory({
      title:'',
      description:''
    })
    setLoading(false)
  }

  const handleFieldChange = (event,property)=>{
    setCategory({...category,[property]:event.target.value})
  }

  const handleSubmitForm = (event)=>{
    event.preventDefault();
    if(category.title === undefined || category.title.trim() === ''){
      toast.error("Category Title is required")
      return
    }
    if(category.description === undefined || category.description.trim() === ''){
      toast.error("Category description is required")
      return
    }

    setLoading(true)
    addCategory(category)
    .then(categoryData=>{
      toast.success("category added successfully")
      clearFields();
    }).catch(err=>{
      toast.error("Failed to add category")
    }).finally(()=>{
      setLoading(false)
    })
  }

  return (
    <div>
      <Container fluid>
       
        <Card className="border border-2 shadow-sm">
          <h5 className='text-center text-uppercase text-primary mt-2'>Add Catgegory</h5>
          <Card.Body>
            {/* {JSON.stringify(category)} */}
            <Form onSubmit={handleSubmitForm}>

              <Form.Group className='my-3'>
                <Form.Label>Category Title</Form.Label>
                <Form.Control type='text' value={category.title}
                onChange={e=>handleFieldChange(e,'title')}
                placeholder='Enter title'/>
              </Form.Group>

              <Form.Group className='my-3'>
                <Form.Label>Category Description</Form.Label>
                <Form.Control as="textarea" value={category.description}
                onChange={e=>handleFieldChange(e,'description')}
                rows={6} 
                placeholder='Enter description'/>
              </Form.Group>

              <Container className='my-3 text-center'>
                <Button variant='success' type='submit' disabled={loading}>
                  <Spinner
                      variant={'border'}
                      size={'sm'}
                      className='me-2'
                      hidden={!loading}
                  />
                  <span hidden={loading}>Add Category</span>
                  <span hidden={!loading}>Wait...</span>
                </Button>
                <Button className='ms-2' variant='danger' onClick={clearFields}>Reset</Button>
              </Container>

            </Form>
          </Card.Body>
        </Card>
       
      </Container>
    </div>
  )
}

export default AddCategory