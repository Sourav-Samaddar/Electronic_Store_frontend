import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, InputGroup, Row, Spinner } from "react-bootstrap";
import { addProduct, addProductImage, addProductWithCategory } from "../../services/product.service";
import { toast } from "react-toastify";
import { getCategories } from "../../services/CategoryService";
import { Editor } from '@tinymce/tinymce-react'

const AddProduct = ()=>{

    const [categories,setCategories] = useState(undefined)

    const [loading,setLoading] = useState(false);

    const [selectedCategoryId,setSelectedCategoryId] = useState("none");

    const editorRef = useRef()

    const [product,setProduct] = useState({
        title:'',
        shortName:'',
        description:'',
        price:0,
        discountedPrice:0,
        quantity:1,
        live:false,
        stock:true,
        image: undefined,
        imagePreview: undefined
    })

    useEffect(()=>{
        getCategories(0,1000)
        .then(categoryData=>{
            //console.log(categoryData)
            setCategories(categoryData)
        }).catch(err=>{
            toast.error("Error fetching all categories from server !!")
        })
    },[])

    const clearForm = () =>{

        setProduct({
            title:'',
            shortName:'',
            description:'',
            price:0,
            discountedPrice:0,
            quantity:1,
            live:false,
            stock:true,
            image: undefined,
            imagePreview: undefined
        })

        setLoading(false);
    }

    const handleFileChange = (event) => {
        if (event?.target?.files[0]?.type === 'image/png' || 
        event?.target?.files[0]?.type === 'image/jpeg') {
            //preview show
            const reader = new FileReader()
            reader.onload = (r) => {
                setProduct({
                    ...product,
                    imagePreview: r.target.result,
                    image: event.target.files[0]
                })
            }

            reader.readAsDataURL(event.target.files[0])
        }
        else {
            toast.error("Invalid File !!")
            setProduct({
                ...product,
                image: undefined,
                imagePreview: undefined
            })
        }
    }

    const submitForm = (event) =>{
        event.preventDefault();
        if (product.title === undefined || product.title.trim() === '') {
            toast.error("Title is required !!")
            return
        }

        if (product.shortName === undefined || product.shortName.trim() === '') {
            toast.error("Product short name is required !!")
            return
        }

        if (product.description === undefined || product.description.trim() === '') {
            toast.error("Description is required !!")
            return
        }

        if (Number(product.price) <= 0) {
            toast.error("Invalid Price !!")
            return
        }

        if (Number(product.discountedPrice) <= 0 || 
            Number(product.discountedPrice) >= Number(product.price)) {
            toast.error("Invalid discounted priced !!")
            return
        }

        if (product.quantity <= 0) {
            toast.error("Invalid Quantity !!")
            return
        }

        setLoading(true)
        if(selectedCategoryId === 'none'){
            addProduct(product)
            .then(productData=>{
                //console.log(productData)
                toast.success("Product Added successfully")
                if(product.image){
                    addProductImage(product.image, productData.productId)
                    .then(resp=>{
                        toast.success("Product image uploaded successfully")
                    }).catch(err=>{
                        toast.error("Unable to upload product image")
                    })
                }
                
            })
            .catch(err=>{
                toast.error("Error in creating product !! check product details")
            })
            .finally(()=>{
                setLoading(false)
                clearForm();
            })
        }else{
            addProductWithCategory(product,selectedCategoryId)
            .then(productData=>{
                //console.log(productData)
                toast.success("Product Added successfully")
                if(product.image){
                    addProductImage(product.image, productData.productId)
                    .then(resp=>{
                        toast.success("Product image uploaded successfully")
                    }).catch(err=>{
                        toast.error("Unable to upload product image")
                    })
                }
            })
            .catch(err=>{
                toast.error("Error in creating product !! check product details")
            })
            .finally(()=>{
                setLoading(false)
                clearForm();
            })
        }

        
    }

    const viewAddProductForm = () =>{
        return(
            <Container fluid>
                <Card className="border border-2 shadow-sm">
                    <h5 className="text-center text-uppercase text-primary mt-2">Add Product</h5>
                    <Card.Body>
                        {/* {JSON.stringify(product)} */}
                        {/* {JSON.stringify(selectedCategoryId)} */}
                        <Form onSubmit={submitForm}>
                            <Form.Group className="mt-3">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" 
                                placeholder="Enter title"
                                value={product.title}
                                onChange={event=>setProduct({
                                    ...product,title:event.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>ShortName</Form.Label>
                                <Form.Control type="text" 
                                placeholder="Enter short name"
                                value={product.shortName}
                                onChange={event=>setProduct({
                                    ...product,shortName:event.target.value})}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Description</Form.Label>
                                {/* <Form.Control as={'textarea'} 
                                placeholder="Enter description"
                                value={product.description}
                                onChange={event=>setProduct({
                                    ...product,description:event.target.value})}
                                /> */}
                                <Editor

                                    apiKey=""
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    init={{
                                        height: 380,
                                        menubar: true,
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}

                                    onEditorChange={() => setProduct({
                                        ...product,
                                        description: editorRef.current.getContent()
                                    })}

                                />
                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group className="mt-3">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control type="number"
                                        value={product.price}
                                        onChange={event=>setProduct({
                                            ...product,price:event.target.value})}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col>
                                    <Form.Group className="mt-3">
                                        <Form.Label>DiscountedPrice</Form.Label>
                                        <Form.Control type="number"
                                        value={product.discountedPrice}
                                        onChange={event=>setProduct({
                                            ...product,discountedPrice:event.target.value})}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group className="mt-3">
                                <Form.Label>Quantity</Form.Label>
                                <Form.Control type="number"
                                value={product.quantity}
                                onChange={event=>setProduct({
                                    ...product,quantity:event.target.value})}
                                />
                            </Form.Group>
                            <Row className="mt-3 px-1">
                                <Col>
                                    <Form.Check 
                                    type="switch"
                                    label="Live"
                                    checked={product.live}
                                    onChange={event => setProduct({
                                        ...product,live:!product.live
                                    })}
                                    />
                                </Col>
                                <Col>
                                    <Form.Check 
                                    type="switch"
                                    label="Stock"
                                    checked={product.stock}
                                    onChange={event => setProduct({
                                        ...product,stock:!product.stock
                                    })}
                                    />
                                </Col>
                            </Row>
                            <Form.Group className="mt-3">
                                <Container hidden={!product.imagePreview} 
                                    className="text-center  py-4 border border-2">
                                    <p className="text-muted">Image Preview</p>
                                    <img
                                        className="img-fluid"
                                        style={{
                                            maxHeight: "250px"
                                        }}
                                        src={product.imagePreview}
                                        alt="" />
                                </Container>
                                <Form.Label>Select product image</Form.Label>
                                <InputGroup>
                                    <Form.Control type={'file'}
                                        onChange={(event) => handleFileChange(event)}
                                    />

                                    <Button onClick={(event) => {
                                        setProduct({
                                            ...product,
                                            imagePreview: undefined,
                                            image: undefined
                                        })
                                    }} variant="outline-secondary">Clear</Button>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Form.Label>Select Category</Form.Label>
                                <Form.Select 
                                onChange={event=> setSelectedCategoryId(event.target.value)}>
                                    <option value="none">none</option>
                                    {
                                        (categories) ? <>
                                            {
                                                categories.content.map(category=>{
                                                    return(
                                                        <option key={category.categoryId} 
                                                        value={category.categoryId}>
                                                            {category.title}
                                                        </option>
                                                    )
                                                })
                                            }
                                        </> : ''
                                        
                                    }
                                </Form.Select>
                            </Form.Group>
                            <Container className="text-center my-3">
                                <Button variant="success" type="submit" disabled={loading}>
                                    <Spinner
                                        variant={'border'}
                                        size={'sm'}
                                        className='me-2'
                                        hidden={!loading}
                                    />
                                    <span hidden={loading}>Add Product</span>
                                    <span hidden={!loading}>Wait...</span>
                                </Button>
                                <Button className="ms-2" onClick={clearForm} variant="danger">
                                    Reset
                                </Button>
                            </Container>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        )
    }

    return(
        <div>
            {viewAddProductForm()}
        </div>
        
    )
}
export default AddProduct;