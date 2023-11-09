import { useContext, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation } from 'react-router-dom';
import UserContext from '../context/UserContext';
import CartContext from '../context/CartContext';
import { CgShoppingCart } from 'react-icons/cg'
import NavCategoriesMenu from './NavCategoriesMenu';
import logoImg from '../assets/logo.png'
import ProfileAvatar from './ProfileAvatar';
import SearchBarComp from './SearchBarComp';
import { useEffect } from 'react'

const CustomNavbar = () =>{
    const userContext = useContext(UserContext);
    const {cart} = useContext(CartContext)
    const location = useLocation();
    
    const [navExpanded,setNavExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
    const [searchBarLength,setSearchBarLength] = useState('300px')
  
    useEffect(() => {
      window.addEventListener("resize", () => {
          //console.log(window.innerWidth);
          const ismobile = window.innerWidth < 550;
          let calculateLength = window.innerWidth/3;
          setSearchBarLength(calculateLength+"px");
          if (ismobile !== isMobile) setIsMobile(ismobile);
      }, false);
    }, [isMobile]);
        
    return (
      <>
        <Navbar onToggle={()=>setNavExpanded(!navExpanded)} expanded={navExpanded}
          collapseOnSelect expand="lg" className='sticky-top navbar-top py-0'>
          <Container fluid="md" className='navbar-justify-content'>
            <Navbar.Brand as={NavLink} to={'/'}>
                <img src={logoImg} alt='logo' width={35} height={35} 
                className={!isMobile?'mx-2':''}/>
                <span className={isMobile?'d-none':''}>ElectroStore</span>
            </Navbar.Brand>

            <SearchBarComp isMobile={isMobile} barlength={searchBarLength}/>
            {
              userContext.isLogin && (window.innerWidth < 990) ? <ProfileAvatar isMobile={isMobile}/> : ''
            }
            
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />

            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="m-auto navbar-justify-content">
                <Nav.Link as={NavLink} to={'/services'}
                  onClick={()=>setNavExpanded(false)}
                  className={location.pathname === '/services' ? 'active' : 'not-active'}>
                  Features
                </Nav.Link>

                {/* <NavDropdown title="Category" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown> */}

                <Nav.Link as={NavLink} to={'/about'}
                  onClick={()=>setNavExpanded(false)}
                  className={location.pathname === '/about' ? 'active' : 'not-active'}>
                  About
                </Nav.Link>
                <Nav.Link onClick={()=>setNavExpanded(false)} 
                  className={location.pathname === '/contact' ? 'active' : 'not-active'}
                  as={NavLink} to={'/contact'}>
                    Contact
                </Nav.Link>
                <Nav.Link as={NavLink} to={'/store/category/allproduct'}
                  onClick={()=>setNavExpanded(false)}
                  className={location.pathname.startsWith('/store/')  ? 'active' : 'not-active'}>
                  Store
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link as={NavLink} to={'/cart'}
                  onClick={()=>setNavExpanded(false)}
                  className={location.pathname === '/cart' ? 'active' : 'not-active'}>
                  <CgShoppingCart size={35} />
                  <b><span style={{marginLeft:"-20px"}}>
                    {userContext.isLogin && cart ? cart.cartItems.length : 0}
                    </span></b>
                </Nav.Link>
                {
                  userContext.isLogin ? 
                  (
                    <>
                      {/* {userContext.isAdminUser && (
                        <>
                            <Nav.Link as={NavLink} to={'/admin/home'}
                              onClick={()=>setNavExpanded(false)}
                              className={location.pathname === '/admin/**' ? 'active' : 'not-active'}>
                              AdminDashboard
                            </Nav.Link>
                        </>
                      )} */}
                      {/* <Nav.Link as={NavLink} to={`/users/profile/${userContext?.userData?.user?.userId}`}
                        className={location.pathname === '/users/profile/' ? 'active' : 'not-active'}>
                        {userContext?.userData?.user?.email}
                      </Nav.Link>
                      <Nav.Link as={NavLink} to={'/users/orders'}
                        className={location.pathname === '/users/orders' ? 'active' : 'not-active'}>
                        Orders
                      </Nav.Link> */}

                      

                      {/* <Nav.Link onClick={doLogout}>Logout</Nav.Link> */}
                    </>
                  ) : (
                    <>
                      <Nav.Link onClick={()=>setNavExpanded(false)} as={NavLink} to={'/login'}>
                        Login
                      </Nav.Link>
                      <Nav.Link onClick={()=>setNavExpanded(false)} as={NavLink} to={'/register'}>
                        SignUp
                      </Nav.Link>
                    </>
                  )
                }
                
              </Nav>
            </Navbar.Collapse>
            {
              userContext.isLogin && !(window.innerWidth < 990) ? <ProfileAvatar isMobile={isMobile}/> : ''
            }
            
          </Container>
        </Navbar>
        {/* <NavCategoriesMenu /> */}
      </>
    );
}

export default CustomNavbar;