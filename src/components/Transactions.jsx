import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  MenuItem,
} from "@mui/material";
import { useUser } from "../components/UserContext";

const Transactions = ({ onUpdate }) => {
  const { userId } = useUser();
  const [accounts, setAccounts] = useState([]);
  const [recipientAccountNumber, setRecipientAccountNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [senderAccountNumber, setSenderAccountNumber] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const BASE_URL = "http://localhost:8080/api";

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/accounts/byUserId/${userId}`
        );
        setAccounts(response.data);
      } catch (error) {
        console.error("Hata:", error);
      }
    };

    if (userId) {
      fetchAccounts();
    }
  }, [userId]);

  const handleTransfer = async () => {
    if (!recipientAccountNumber || !amount || !senderAccountNumber) {
      setError("Lütfen zorunlu alanları doldurun.");
      setTimeout(() => setError(""), 1700);
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_URL}/transactions/CreateTransaction`,
        {
          accountId: accounts.find(
            (account) => account.accountNumber === senderAccountNumber
          ).id,
          toAccountNumber: recipientAccountNumber,
          wallet: parseFloat(amount),
          description,
          account_type: accounts.find(
            (account) => account.accountNumber === senderAccountNumber
          ).accountType,
          timestamp: new Date().toISOString(),
        }
      );

      if (response.status === 200) {
        setSuccess("Para transferi başarılı!");
        setError("");
        setRecipientAccountNumber("");
        setAmount("");
        setSenderAccountNumber("");
        setDescription("");

        // Hesapları güncelle
        if (onUpdate) {
          onUpdate(); // Güncellemeyi tetikler
        }
        setTimeout(() => setSuccess(""), 1700);
      }
    } catch (error) {
      console.error("Transfer hatası:", error);

      // Hata mesajını backend'den al
      const errorMessage = error.response?.data || "Bir hata oluştu.";

      if (errorMessage === "Yetersiz bakiye") {
        setError("Yetersiz Bakiye.");
      } else if (errorMessage.message === "Target account not found") {
        setError("Hedef hesap bulunamadı.");
      } else {
        setError(errorMessage);
      }

      setAmount("");

      setSuccess("");
      setTimeout(() => setError(""), 1700);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Para Transferi
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      {success && <Alert severity="success">{success}</Alert>}
      <Box
        component="form"
        noValidate
        sx={{ mt: 2, maxWidth: 500, mr: "auto" }}
      >
        <TextField
          label="Alıcı Hesap Numarası"
          fullWidth
          value={recipientAccountNumber}
          onChange={(e) => setRecipientAccountNumber(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Miktar"
          type="number"
          fullWidth
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          label="Gönderen Hesap Numarası"
          fullWidth
          value={senderAccountNumber}
          onChange={(e) => setSenderAccountNumber(e.target.value)}
          sx={{ mb: 2 }}
        >
          {accounts.map((account) => (
            <MenuItem key={account.id} value={account.accountNumber}>
              {account.accountNumber}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Açıklama"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          fullWidth
          sx={{
            mt: 2,
            mb: 2,
            fontSize: 16,
            bgcolor: "#007A3D",
            "&:hover": {
              bgcolor: "#007A3D", // Hover durumunda da yeşil kalacak
            },
          }}
          onClick={handleTransfer}
        >
          Gönder
        </Button>
      </Box>
    </Container>
  );
};

export default Transactions;
