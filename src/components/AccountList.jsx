import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Container,
  Box,
} from "@mui/material";

const AccountList = ({ onUpdate }) => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAccounts = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/accounts/byUserId/${userId}`
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Hata:", error);
      } finally {
        setLoading(false);
      }
    } else {
      console.error("Kullanıcı ID'si mevcut değil.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, [onUpdate]);

  useEffect(() => {
    if (onUpdate) {
      onUpdate(fetchAccounts);
    }
  }, [onUpdate]);

  return (
    <Container maxWidth="xl">
      <Typography variant="h4" gutterBottom>
        Hesaplarım
      </Typography>
      {loading ? (
        <Typography>Yükleniyor...</Typography>
      ) : (
        <Grid container spacing={6}>
          {accounts.map((account) => (
            <Grid item sm={12} md={6} key={account.id}>
              <Card sx={{ position: "relative" }}>
                <CardContent>
                  <Box display="flex" flexDirection="column">
                    <Typography variant="h6">
                      Hesap Numarası: {account.accountNumber}
                    </Typography>
                    <Typography variant="h5" color="primary" mt={2}>
                      Bakiye: {account.balance.toFixed(2)}₺
                    </Typography>
                  </Box>
                  <Typography
                    color="textSecondary"
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      padding: "2px 6px",
                      borderRadius: "4px",
                    }}
                  >
                    {account.accountType}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default AccountList;
