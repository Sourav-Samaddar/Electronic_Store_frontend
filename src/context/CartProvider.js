import React, { useContext, useEffect, useState } from 'react'
import CartContext from './CartContext'
import UserContext from './UserContext'
import { addItemToCart, clearCart, getCart, removeItemFromCart } from '../services/CartService'
import Swal from "sweetalert2";
import { Alert } from "react-bootstrap";
import { toast } from 'react-toastify';

const CartProvider = ({children}) => {
  
  const {isLogin , userData}  = useContext(UserContext)

  const [cart, setCart] = useState(null)

  useEffect(()=>{
    //console.log(userData)
    if(isLogin){
        loadUserCart(userData.user.userId)
    }else {
      setCart(null);
    }
    
  },[isLogin])

  const loadUserCart = async (userId) => {
    try {
      const cart = await getCart(userId);
      setCart({ ...cart });
      //console.log(cart);
    } catch (error) {
      console.log(error);
      setCart({ cartItems: [] });
    }
  };

  const addItem = async (quantity, productId, next) => {
    try {
      if (!isLogin) {
        Swal.fire({
          title: "Not Logged In !!",
          html: "Please do login to add items to cart",
          icon: "error",
        }).then(() => {});
        return;
      }

      const result = await addItemToCart(
        userData.user.userId,
        productId,
        quantity
      );
      setCart({ ...result });
      next();
      // if (quantity > 1) {
      //   toast.success("Quantity updated");
      // } else {
      //   toast.success("Item added to cart", {
      //     position: "top-right",
      //   });
      // }
    } catch (error) {
      //console.log(error);
      toast.error("error in adding product in cart");
    }
  };

  //remove item from cart
  const removeItem = async (itemId) => {
    try {
      const result = await removeItemFromCart(userData.user.userId, itemId);
      const newCartItems = cart.cartItems.filter(
        (item) => item.cartItemId !== itemId
      );
      //console.log(newCartItems);
      setCart({
        ...cart,
        cartItems: newCartItems,
      });
    } catch (error) {
      //console.log(error);
      toast.error("Error in removing items from cart");
    }
  };

  //clear cart
  const clear = async () => {
    try {
      const result = await clearCart(userData.user.userId);
      //console.log(result);
      setCart({
        ...cart,
        cartItems: [],
      });
    } catch (error) {
      //console.log(error);
      toast.error("Error in clearing cart");
    }
  };
    
  return (
    <CartContext.Provider value={{cart, setCart, addItem, removeItem, clearCart:clear}}>
        {children}
    </CartContext.Provider>
  )
}

export default CartProvider