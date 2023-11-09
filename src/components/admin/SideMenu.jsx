import { Badge, ListGroup} from "react-bootstrap"
import { NavLink, useNavigate } from "react-router-dom"
import { GrHome } from 'react-icons/gr'
import { BiCategory } from 'react-icons/bi'
import { MdOutlineCategory } from 'react-icons/md'
import { MdAddBox } from 'react-icons/md'
import { MdViewDay } from 'react-icons/md'
import { FaOpencart } from 'react-icons/fa'
import { FaUserSecret } from 'react-icons/fa'
import { BsBodyText } from 'react-icons/bs'
import { MdDashboard } from 'react-icons/md'
import { BiLogOut } from 'react-icons/bi'
import { useContext } from "react"
import UserContext from "../../context/UserContext"
const SideMenu = ({handletoggle})=>{
    const userCtx = useContext(UserContext)
    const redirect = useNavigate();
    const callLogout = () =>{
        userCtx.logout();
        redirect('/login')
    } 

    return(
        <>
            <ListGroup  variant="flush" style={{position:'sticky',top:'60px'}}>
                <ListGroup.Item as={NavLink} to={'/admin/home'} action 
                onClick={handletoggle}>
                    <GrHome size={20} />
                    <span className="ms-2">Home</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/add-category'} action 
                onClick={handletoggle}>
                    <BiCategory size={20} />
                    <span className="ms-2">Add Category</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/categories'} action 
                onClick={handletoggle}>
                    <MdOutlineCategory size={20} />
                    <span className="ms-2">View Categories</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/add-product'} action
                onClick={handletoggle}>
                    <MdAddBox size={20} />
                    <span className="ms-2">Add Product</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/products'} action 
                onClick={handletoggle}>
                    <MdViewDay size={20} />
                    <span className="ms-2">View Products</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/orders'} action 
                onClick={handletoggle}>
                    <FaOpencart size={20} />
                    <span className="ms-2">Orders</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/users'} action 
                onClick={handletoggle}>
                    <FaUserSecret size={20} />
                    <span className="ms-2"> Users</span>
                    <Badge className="ms-2" bg="danger" pill>New</Badge>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/users/home'} action 
                onClick={handletoggle}>
                    <MdDashboard size={20} />
                    <span className="ms-2">Dashboard</span>
                </ListGroup.Item>
                <ListGroup.Item as={NavLink} to={'/admin/logging'} action 
                onClick={handletoggle}>
                    <BsBodyText size={20} />
                    <span className="ms-2">Manage Logging</span>
                </ListGroup.Item>
                <ListGroup.Item onClick={callLogout}  action>
                    <BiLogOut size={20} />
                    <span className="ms-2">Logout</span>
                </ListGroup.Item>
            </ListGroup>
        </>
    )
}
export default SideMenu;