import { useEffect, useState } from "react"
import UserContext from "./UserContext"
import { isAdminUser as adminUser } from "../auth/HelperAuth";
import {
    doLoginLocalStorage,
    doLogoutFromLocalStorage,
    getDataFromLocalStorage,
    isLoggedIn,
  } from "../auth/HelperAuth";

const UserProvider = ({children})=>{

    const [isLogin,setIsLogin] = useState(false);

    const [userData,setUserData] = useState(null);

    const [isAdminUser,setIsAdminUser] = useState(false);

    useEffect(()=>{
        setIsLogin(isLoggedIn());
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage())
    }, [])

    const doLogin = (data) =>{
        doLoginLocalStorage(data)
        setIsLogin(true)
        setIsAdminUser(adminUser())
        setUserData(getDataFromLocalStorage())
    }

    const doLogout = () =>{
        doLogoutFromLocalStorage()
        setIsLogin(false)
        setIsAdminUser(adminUser())
        setUserData(null)
    }

    return(
        <UserContext.Provider value={{
            userData:userData,
            isLogin:isLogin,
            isAdminUser:isAdminUser, 
            login:doLogin, 
            logout:doLogout,
        }}
        >
            {children}
        </UserContext.Provider>
    )
}
export default UserProvider