import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Index from './pages';
import About from './pages/about';
import Services from './pages/services';
import UserDashboard from './pages/users/UserDashboard';
import Cart from './pages/cart';
import UserProfile from './pages/users/UserProfile';
import CustomNavbar from './components/Navbar';
import Contact from './pages/contact';
import { Flip, ToastContainer} from 'react-toastify';
import Login from './pages/login';
import Register from './pages/register';
import UserHome from './pages/users/UserHome';
import UserProvider from './context/UserProvider';
import UserOrder from './pages/users/UserOrder';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminHome from './pages/admin/AdminHome';
import AddProduct from './pages/admin/AddProduct';
import AddCategory from './pages/admin/AddCategory';
import ViewCategories from './pages/admin/ViewCategories';
import ViewProducts from './pages/admin/ViewProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import StorePage from './pages/users/StorePage';
import ProductView from './pages/users/ProductView';
import CategoryProductView from './pages/users/CategoryProductView';
import CartProvider from './context/CartProvider';
import useLoader from './hooks/useLoader';
import Loading from './components/Loading';
import AdminUserTabular from './pages/admin/AdminUserTabular';
import PaymentSuccess from './pages/users/PaymentSuccess';
import CheckOut from './pages/users/CheckOut';
import ManageLogging from './pages/admin/ManageLogging';
function App() {
  const loading = useLoader();
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <ToastContainer position='bottom-center' theme='dark' 
          closeOnClick transition={Flip} autoClose={1000}/>
          <CustomNavbar />
          <Loading show={loading} />
          <Routes>
              <Route path='/' element={<Index />} />
              <Route path='/about' element={<About />} />
              <Route path='/services' element={<Services />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/store' element={<StorePage />} >
                <Route path='products/:productId' element={<ProductView />} />
                <Route path='category/:categoryId' element={<CategoryProductView />} />
                <Route path='search' element={<CategoryProductView />} />
              </Route>
              <Route path='/users' element={<UserDashboard />}>
                <Route path='profile/:userId' element={<UserProfile />} />    
                <Route path='home' element={<UserHome />} />    
                <Route path='orders' element={<UserOrder />} />
                <Route path='checkout/:step' element={<CheckOut />} />
                <Route path='orders/:orderId/paymentsuccess' element={<PaymentSuccess />} />         
              </Route>
              <Route path='/admin' element={<AdminDashboard />}>
                <Route path='home' element={<AdminHome />} />    
                <Route path='add-category' element={<AddCategory />} />    
                <Route path='categories' element={<ViewCategories />} />    
                <Route path='add-product' element={<AddProduct />} />
                <Route path='products' element={<ViewProducts />} />     
                <Route path='orders' element={<AdminOrders />} />      
                <Route path='users' element={<AdminUsers/>} />
                <Route path='logging' element={<ManageLogging/>} />    
                <Route path='users/table' element={<AdminUserTabular/>} />  
              </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

export default App;
