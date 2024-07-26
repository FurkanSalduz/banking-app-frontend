import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";




const Navbar = () => {
  const StyledAppBar = styled(AppBar)({
    backgroundColor: "#007A3D",
    height: "80px", // AppBar yüksekliğini ayarlamak için
  });
  
  const StyledToolbar = styled(Toolbar)({
    minHeight: "80px", // Toolbar yüksekliğini ayarlamak için 
    
  });
  
  const StyledTypography = styled(Typography)({
    marginRight: "auto",
    lineHeight: "80px", // başlığı ortalamak için 
    
  });
  return (
    
    <StyledAppBar position="fixed">
      <StyledToolbar>
      <StyledTypography variant="h5" >
          ŞEKERBANK
        </StyledTypography>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export default Navbar;

