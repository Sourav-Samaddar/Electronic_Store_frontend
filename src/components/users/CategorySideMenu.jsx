import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import { getCategories } from '../../services/CategoryService'
import defaultCategoryImage from '../../assets/category1.png'
import { NavLink } from 'react-router-dom'
import { getCategoryImageUrl } from '../../services/helper.service'

const CategorySideMenu = ({handleToggle}) => {
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        loadCategores(0, 100000)
    }, [])

    const loadCategores = (pageNumber, pageSize) => {
        getCategories(pageNumber, pageSize)
        .then(data => {
            //console.log(data)
            setCategories({ ...data })
        })
        .catch(error => {
            console.log(error);
        })
    }

    const categoryView = () => {
        return categories && (
            <>
                <ListGroup variant="flush" style={{position:'sticky',top:'50px'}}>

                    <ListGroup.Item className="navbar-top" action as={NavLink} 
                    to={'/store/category/allproduct'} onClick={handleToggle}>
                        <img
                            className=' rounded-circle'
                            src={defaultCategoryImage} alt={'default category image'} style={{
                                width: "40px",
                                height: '40px',
                                objectFit: 'cover'
                            }}
                            onError={event => {
                                event.currentTarget.setAttribute('src', defaultCategoryImage)
                            }}

                        />
                        <span className="ms-2 "> All Products</span>
                    </ListGroup.Item>

                    {categories.content.map(cat => (

                        <ListGroup.Item className="navbar-top" as={NavLink} 
                            to={`/store/category/${cat.categoryId}`} action 
                            key={cat.categoryId} onClick={handleToggle}>
                            <img
                                className=' rounded-circle'
                                src={getCategoryImageUrl(cat.categoryId)} alt={cat.title} style={{
                                    width: "40px",
                                    height: '40px',
                                    objectFit: 'contain'
                                }}
                                onError={event => {
                                    event.currentTarget.setAttribute('src', defaultCategoryImage)
                                }}

                            />
                            <span className="ms-2">{cat.title}</span>
                        </ListGroup.Item>

                    ))}

                </ListGroup>
            </>
        )
    }

    return categories && categoryView()
}

export default CategorySideMenu