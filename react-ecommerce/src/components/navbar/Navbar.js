import React, { useState, useMemo } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import _isEmpty from "lodash/isEmpty";
import _size from "lodash/size";

import { styled, alpha } from "@mui/material/styles";
import { useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteTwoToneIcon from "@mui/icons-material/FavoriteTwoTone";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';

import Login from "../login";
import SignUp from "../signUp";
import { getInitials } from "../../helpers/common.helpers";
import { logoutUser } from "../../reducers/app.reducer";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navbar({ wishListData, cartData }) {
  const [isOpen, setOpen] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const [openLogoutDialog,setOpenLogoutDialog] = useState(false);
  const navigate  = useNavigate()

  const { user } = useSelector((state) => state?.ecommerceReducer);
  const dispatch  = useDispatch()
 
  const noOfItemsInCart = _size(cartData);
  const noOfItemsInWishlist = _size(wishListData);
  const isLoggedIn = useMemo(() => !_isEmpty(user), [user]);

  const handleOpenModal = useCallback((value) => {
    setOpen(value);
  }, []);

  const handleOpenSignupModal = useCallback(
    (value = true) => {
      handleOpenModal(false);
      setOpenSignupModal(value);
    },
    [handleOpenModal]
  );

  const renderForm = () => {
    if (isOpen) {
      return (
        <Login
          handleOpenModal={handleOpenModal}
          isOpen={isOpen}
          handleOpenSignupModal={handleOpenSignupModal}
        />
      );
    }
    if (openSignupModal) {
      return (
        <SignUp
          isOpen={openSignupModal}
          handleOpenModal={handleOpenSignupModal}
        />
      );
    }
  };

  const menuId = "primary-search-account-menu";

  const hanldeLogoutDialogClose = ()=>{
    setOpenLogoutDialog(false)
  }

  const handleLoginProfileClick = ()=>{
    setOpenLogoutDialog(true)
  }

  const handleLogout = ()=>{
    dispatch(logoutUser())
    hanldeLogoutDialogClose();
    localStorage.removeItem('loggedInUser')
  }

  const renderLogoutDialog = ()=>{
    return <Dialog open={openLogoutDialog} onClose={hanldeLogoutDialogClose}>
      <DialogTitle>Do you want to logout?.</DialogTitle>
      <DialogActions>
        <Button variant="contained" color="error" onClick={handleLogout}>YES</Button>
        <Button onClick={hanldeLogoutDialogClose} variant="contained">Cancel</Button>
      </DialogActions>
    </Dialog>
  }


  const renderProfile = () => {
    return isLoggedIn ? (
      <Avatar sx={{ bgcolor: deepOrange[500], width: 35, height: 35 }} onClick={handleLoginProfileClick}>
        {getInitials(user?.name)}
      </Avatar>
    ) : (
      <AccountCircle onClick={() => handleOpenModal(true)} />
    );
  };

  const renderRightSection = () => (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: "flex" }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit" onClick={()=>navigate("/cart")}>
          <Badge
            badgeContent={noOfItemsInCart}
            color="error"
            disabled={!noOfItemsInCart}
          >
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge
            badgeContent={noOfItemsInWishlist}
            color="error"
            disabled={!noOfItemsInWishlist}
          >
            <FavoriteTwoToneIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
        >
          {renderProfile()}
        </IconButton>
      </Box>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            ECOMMERCE
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for products here..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          {renderRightSection()}
        </Toolbar>
        {!isLoggedIn && renderForm()}
        {renderLogoutDialog()}
      </AppBar>
    </Box>
  );
}
