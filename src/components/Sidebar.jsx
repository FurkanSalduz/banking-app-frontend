import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { styled } from '@mui/system';

// Styled components
const StyledDrawer = styled(Drawer)({
  width: 240,
  flexShrink: 0,
  '& .MuiDrawer-paper': {
    width: 240,
    boxSizing: 'border-box',
    backgroundColor: '#007A3D', // Yeşil renk
    color: '#fff', // Yazı rengi beyaz
  },
});

const Title = styled(Typography)({
  padding: '16px',

  fontWeight: 'bold',
  textAlign: 'center',
  backgroundColor: '#007A3D', // Daha koyu yeşil arka plan rengi
  
});

const StyledListItem = styled(ListItem)({
  borderTop: '1px solid #2c6b2f', // Liste öğelerininüstüne ince bir sınır ekledik


  '&:hover': {
    backgroundColor: '#388e3c', // Hover rengi
  },
  '&.Mui-selected': {
    backgroundColor: 'transparent', // Aktif durumda arka plan rengini şeffaf yap
  },
 
});

const StyledListItemText = styled(ListItemText)({
  '& .MuiTypography-root': {
    color: '#fff', // Yazı rengi beyaz
  },
});

const Sidebar = () => {
  return (
    <StyledDrawer  variant="permanent">
      <Title  variant="h5">ŞEKERBANK</Title>
      <List>
        <StyledListItem component={Link} to="/accounts">
          <ListItemIcon>
            <AccountBalanceIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <StyledListItemText primary="Hesaplarım"  />
        </StyledListItem>
        <StyledListItem component={Link} to="/cards">
          <ListItemIcon>
            <CreditCardIcon style={{ color: '#fff' }} />
          </ListItemIcon>
          <StyledListItemText primary="Kartlarım" />
        </StyledListItem>
        
      </List>
    </StyledDrawer>
  );
};

export default Sidebar;
