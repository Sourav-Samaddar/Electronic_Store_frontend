import React, { Fragment } from 'react'
import { Dialog, Popover, Tab, Transition } from "@headlessui/react";
import { navigation } from "./dummyCategories";
import { Col, Container, Row } from 'react-bootstrap';
import defaultImage from "../assets/default_product.jpg"
import { Link } from 'react-router-dom';

const NavCategoriesMenu = () => {
    
  return (
    <>
        <Popover.Group className="">
            <Container fluid>
                <Row>
                    {navigation.categories.map((category) => (
                        <Col key={category.name} md={1} xs={{span:1,offset:1}} >
                            <Popover key={category.name} >
                                {({ open, close }) => (
                                <>
                                    <Popover.Button
                                    className={open?'tab-button.active':'tab-button'}
                                    >
                                        <img src={defaultImage} style={{height:"30px",width:"30px"}}/>
                                        {category.name}
                                    </Popover.Button>

                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-200"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in duration-150"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Popover.Panel className="popover-panels">
                                            <Container fluid >
                                                <Row className='margin-top-test'>
                                                    {
                                                        category.sections.map(section=>{
                                                            return(
                                                                <Col xs={4} md={{span:1,offset:1}} key={section.name}>
                                                                    <p
                                                                        id={`${section.name}-heading`}
                                                                    >
                                                                        {section.name}
                                                                    </p>
                                                                   
                                                                    {section.items.map((item) => (
                                                                        <Row key={item.name} className='mb-1'>
                                                                            <Link className='not-active' key={item.name}>
                                                                                {item.name}
                                                                            </Link>
                                                                        </Row>
                                                                    ))}
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                    {
                                                        category.featured.map(item => {
                                                            return (
                                                                <Col xs={6} md={3} key={item.name}>
                                                                    <div key={item.name} className='d-lg-block d-sm-none'>
                                                                        <div>
                                                                            <img style={{height:'300px',width:'300px'}}
                                                                            src={item.imageSrc}
                                                                            alt={item.imageAlt}
                                                                            className="object-cover object-center"
                                                                            />
                                                                        </div>
                                                                        <a href={item.href}>
                                                                            <span
                                                                            className="absolute inset-0 z-10"
                                                                            aria-hidden="true"
                                                                            />
                                                                            {item.name}
                                                                        </a>
                                                                        <p aria-hidden="true" className="mt-1">
                                                                            Shop now
                                                                        </p>
                                                                    </div>
                                                                </Col>
                                                            )
                                                        })
                                                    }
                                                </Row>
                                            </Container>
                                        </Popover.Panel>
                                    </Transition>
                                </>
                                )}
                            </Popover>
                        </Col>
                    
                    ))}
                </Row>
            </Container>
        </Popover.Group>
        
    </>
  )
}

export default NavCategoriesMenu