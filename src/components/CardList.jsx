import React, { useEffect, useState } from "react";
import { useUser } from "../components/UserContext";
import axios from "axios";
import { Card, CardContent, Typography, Grid, Container } from "@mui/material";
import { styled } from "@mui/material/styles";

// Styled components for Card
const CustomCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  borderRadius: 12,
  position: "relative",
  overflow: "hidden",
  backgroundColor: theme.palette.background.paper,
  height: 180, // Kartın yüksekliği
}));

const CardContentWrapper = styled(CardContent)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
}));

const CardNumber = styled(Typography)(({ theme }) => ({
  fontSize: "1.5rem",
  fontWeight: "bold",
  textAlign: "center",
  margin: theme.spacing(2, 0),
  position: "relative",
}));

const ExpiryDate = styled(Typography)(({ theme }) => ({
  fontSize: "0.75rem",
  color: theme.palette.text.disabled,
  position: "absolute",
  bottom: theme.spacing(1),
  right: theme.spacing(2),
}));

const UserName = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  position: "absolute",
  bottom: theme.spacing(1),
  left: theme.spacing(2),
}));

const CardType = styled(Typography)(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
  position: "absolute",
  top: theme.spacing(1),
  left: theme.spacing(2),
}));

function CardList() {
  const { userId } = useUser();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (userId) {
      axios
        .get(`http://localhost:8080/api/cards/byUserId/${userId}`)
        .then((response) => {
          setCards(response.data);
        })
        .catch((error) => {
          console.error("Kartları getirirken bir hata oluştu:", error);
        });
    }
  }, [userId]);

  return (
    <Container maxWidth="lg">
      <Typography variant="h5" gutterBottom>
        Kartlarım
      </Typography>
      <Grid container spacing={6}>
        {cards.map((card) => (
          <Grid item sm={12} md={5} key={card.id}>
            <CustomCard>
              <CardContentWrapper>
                <CardType> {card.cardType}</CardType>
                <CardNumber> {card.cardNumber}</CardNumber>
                <UserName>{card.cardholderName}</UserName>
                <ExpiryDate>
                  Son Kullanma Tarihi {card.expirationDate}
                </ExpiryDate>
              </CardContentWrapper>
            </CustomCard>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default CardList;
