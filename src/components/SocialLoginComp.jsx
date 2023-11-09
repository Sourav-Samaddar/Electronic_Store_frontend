import React from 'react'
import { Container } from "react-bootstrap"
import { loginUserWithGoogle } from "../services/user.service";
import { GoogleLoginButton } from "react-social-login-buttons";
import { LoginSocialGoogle } from "reactjs-social-login";
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import UserContext from "../context/UserContext"
import { useContext } from 'react';
import { useState } from 'react';

const SocialLoginComp = () => {
  const redirect = useNavigate();  
  const userContext = useContext(UserContext);
  const [error,setError] = useState({
    errorData:'',
    isError:false
  })
  return (
    <Container className="text-center">
        <LoginSocialGoogle
            client_id="1074333287126-tdbi9hu87bqmno745a0krikurihq12ni.apps.googleusercontent.com"
            scope="openid profile email"
            discoveryDocs="claims_supported"
            access_type="offline"
            onResolve={({ provider, data }) => {
                //console.log(data);
                loginUserWithGoogle(data)
                .then(userData=>{
                    //console.log(userData);
                    toast.success("Login Successful")
                    setError({
                        errorData: null,
                        isError: false
                    })
                    userContext.login(userData)
                    redirect('/')
                }).catch(err=>{
                    //console.log(err)
                    setError({
                        errorData:err,
                        isError:true
                    })
                    toast.error("Login Failed")
                })
            }}
            onReject={(err) => {
                console.log(err);
            }}
        >
            <GoogleLoginButton 
            style={{display: 'flex',justifyContent: 'center',
            alignItems: 'center', 
            marginTop:"20px"
            }} 
            />
        </LoginSocialGoogle>
    </Container>
  )
}

export default SocialLoginComp