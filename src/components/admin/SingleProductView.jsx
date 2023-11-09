import React from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'
import { MdDelete } from 'react-icons/md'
import { GrFormView } from 'react-icons/gr'
import { BsFillPencilFill } from 'react-icons/bs'
import { Button } from 'react-bootstrap'
import { deleteProduct } from '../../services/product.service'

const SingleProductView = ({index,product,updateProductList,openProductViewModal,openEditProductModel}) => {

    const formatDate = (time) => {
        return new Date(time).toLocaleDateString()
    }

    const getBackgroundForProduct = () => {
        //live +stock===> green: table-success

        //not live: ==>red: table-danger

        //not stock==>yellow: table-warn
        if (product.live && product.stock) {
            return "table-success"
        } else if (!product.live) {
            return "table-danger"
        } else if (!product.stock) {
            return "table-warning"
        } else {

        }
    }  

    const deleteProductLocal = (productId) => {

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

                deleteProduct(product.productId)
                .then(data => {
                    //console.log(data);
                    toast.success("product Deleted")
                    updateProductList(productId)
                })
                .catch(error => {
                        console.log(error)
                        toast.error("Error in deleting product")
                })
            }
        })
    }

    return (
        <tr className={getBackgroundForProduct()}>
            <td className="px-3 small">{index + 1}</td>
            <td className="px-3 small">{product.title}</td>
            <td className="px-3 small">{product.quantity}</td>
            <td className="px-3 small">{product.price}₹</td>
            <td className="px-3 small">{product.discountedPrice}₹</td>
            <td className="px-3 small">{product.live ? 'True' : 'False'}</td>
            <td className="px-3 small">{product.stock ? 'True' : 'False'}</td>
            <td className="px-3 small">{product.category ? product.category.title : ' '}</td>
            <td className="px-3 small">{formatDate(product.addedDate)} </td>
            <td className={`d-flex table-light`}>
                {/* delete button */}
                <Button variant="danger" onClick={(event) => deleteProductLocal(product.productId)} 
                size="sm">
                    <MdDelete />
                </Button>
                {/* view button */}
                <Button className="ms-2" onClick={(event) => openProductViewModal(event, product)} 
                variant="warning" size="sm">
                    <GrFormView />
                </Button>
                {/* update button */}
                <Button onClick={(event) => openEditProductModel(event, product)} 
                className="ms-2" variant="dark" size="sm">
                    <BsFillPencilFill />
                </Button>
            </td>
        </tr>
    )
}

export default SingleProductView