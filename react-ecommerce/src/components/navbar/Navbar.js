import React, { useState } from "react";
import {  useSelector } from "react-redux";
import _isEmpty from "lodash/isEmpty";

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
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';

import Login from "../login";
import SignUp from "../signUp";
import { getInitials } from "../../helpers/common.helpers";

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

export default function Navbar({}) {
  const [isOpen, setOpen] = useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);
  const { user } = useSelector((state) => state?.ecommerceReducer);
console.log(user)
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

  const renderRightSection = () => (
    <>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: "flex" }}>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <AddShoppingCartIcon />
          </Badge>
        </IconButton>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
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
          {_isEmpty(user) ? 
            <AccountCircle onClick={() => handleOpenModal(true)} />:<Avatar sx={{ bgcolor: deepOrange[500], width: 35, height: 35  }}>{getInitials(user?.name)}</Avatar>
          }
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
        {_isEmpty(user) && renderForm()}
      </AppBar>
    </Box>
  );
}
