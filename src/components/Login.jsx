import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Button,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const theme = createTheme();
const BASE_URL="http://localhost:8080/api"

function Login() {

  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Kullanıcı adı veya şifre hatalı mesajı için state

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Backend'e POST isteği gönder
      const response = await axios.post(`${BASE_URL}/users/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        // Giriş başarılıysa hesaplar sayfasına yönlendir
        console.log(response.data);
        
        navigate("/accounts");
      }
    } catch (error) {

      console.error("Hata:", error); // Hata detaylarını kontrol edin

      if (error.response && error.response.status === 401) {
        // Kullanıcı adı veya şifre hatalı
        setError("Kullanıcı Adı veya Şifre Hatalı");
        setTimeout(() => setError(""), 1700); // 1.7 saniye sonra hata mesajını temizle
      } else {
        // Diğer hata durumları
        setError("Bir hata oluştu. Lütfen tekrar deneyin.");
        setTimeout(() => setError(""), 1700); // 1.7 saniye sonra hata mesajını temizle
      }
    }
        setUsername(""); // Formu temizle
        setPassword(""); // Formu temizle
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h4">
            Giriş Yap
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Kullanıcı Adı"
              name="username"
              autoComplete="username"
              autoFocus
              InputLabelProps={{ style: { fontSize: 18 } }}
              InputProps={{ style: { fontSize: 18 } }}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Şifre"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{ style: { fontSize: 18 } }}
              InputProps={{ style: { fontSize: 18 } }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                fontSize: 18,
                bgcolor: "#007A3D",
                "&:hover": {
                  bgcolor: "#007A3D", // Hover durumunda da yeşil kalacak
                },
              }}
            >
              Giriş Yap
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default Login;
