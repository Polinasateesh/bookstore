import React from "react";
import ".././App.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Badge, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
 
  return (
    <div className="nav-main-container">
      <h1>
        <MenuBookIcon
          fontSize="large"
          style={{ marginLeft: "10px", marginBottom: "-4px" }}
        />
        <span className="logo-text">BooK Store</span>
      </h1>
    </div>
  );
};

export default NavBar;
