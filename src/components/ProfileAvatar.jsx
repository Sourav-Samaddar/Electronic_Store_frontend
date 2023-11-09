import React from 'react'
import { useState } from 'react';
import { useContext } from 'react';
import Logout from '@mui/icons-material/Logout';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { getUserImageUrl } from '../services/helper.service';
import { Avatar, Divider, ListItemIcon, Menu, MenuItem } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { useNavigate } from 'react-router-dom';
import Settings from '@mui/icons-material/Settings';
import UserContext from '../context/UserContext';
import useJwtTokenExpiration from '../hooks/useJwtTokenExpiration';

const ProfileAvatar = ({isMobile=false}) => {
  const flag = useJwtTokenExpiration();
  const userContext = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const openUserMenu = Boolean(anchorEl);  
  const redirect = useNavigate();

  const doLogout = ()=>{
    setAnchorEl(null);
    userContext.logout();
    redirect("/login")
  }

  const navigateToProfile = () =>{
    setAnchorEl(null);
    redirect(`/users/profile/${userContext?.userData?.user?.userId}`)
  }

  const navigateToOrder = () =>{
    setAnchorEl(null);
    redirect("/users/orders")
  }

  const navigateToAdminDashboard = () =>{
    setAnchorEl(null);
    redirect("/admin/home")
  }

  const handleUserClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseUserMenu = (event) => {
    setAnchorEl(null);
  };
  return (
    <div className={isMobile?'mt-1 me-1':'ms-3 mt-1 me-2'}>
        <Avatar
            className="text-white"
            onClick={handleUserClick}
            aria-controls={openUserMenu ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openUserMenu ? "true" : undefined}
            src={userContext?.userData?.user?.imageName &&
                userContext?.userData?.user?.imageName.startsWith('http') ? 
                userContext?.userData?.user?.imageName:
                getUserImageUrl(userContext?.userData?.user?.userId)}
            // onClick={handleUserClick}
            sx={{
            bgcolor: deepPurple[500],
            color: "white",
            cursor: "pointer",
            width:40,
            height:40
            }}
        >
        {userContext?.userData?.user?.name[0].toUpperCase()}
        </Avatar>
        <Menu
            id="basic-menu"
            className='mt-1'
            anchorEl={anchorEl}
            open={openUserMenu}
            onClose={handleCloseUserMenu}
            onClick={handleCloseUserMenu}
            MenuListProps={{
            "aria-labelledby": "basic-button",
            }}
        >
            <MenuItem onClick={navigateToProfile}>
            <Avatar sx={{height:"20px",width:"20px"}} /> 
            <span className='ms-2'>Profile</span>
            </MenuItem>
            
            <MenuItem onClick={navigateToOrder}>
            My Orders
            </MenuItem>
            <Divider />
            {
              userContext.isLogin && userContext.isAdminUser &&
              (
                <MenuItem onClick={navigateToAdminDashboard}>
                  <ListItemIcon>
                    <AdminPanelSettingsIcon fontSize="small" />
                  </ListItemIcon>
                  Admin
                </MenuItem>
              )
            }
            
            <MenuItem onClick={doLogout}>
            <ListItemIcon>
                <Logout fontSize="small" />
            </ListItemIcon>
            Logout
            </MenuItem>
        </Menu>
    </div>
  )
}

export default ProfileAvatar