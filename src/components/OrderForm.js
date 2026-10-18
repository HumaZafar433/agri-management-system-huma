import { useState } from "react";

import {
  Box,
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  MenuItem,
  Button,
  Alert,
  Divider
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";

import { todayIso } from "../data/seedData";

function OrderForm({
  buyers = [],
  crops = [],
  orders = [],
  onAddOrder
}) {

  const [buyerId, setBuyerId] = useState("");
  const [cropId, setCropId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [orderDate, setOrderDate] = useState(todayIso());

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const selectedBuyer = buyers.find(
    (buyer) => String(buyer.id) === String(buyerId)
  );

  const selectedCrop = crops.find(
    (crop) => String(crop.id) === String(cropId)
  );

  const bookedQuantity = selectedCrop
    ? orders
        .filter(
          (order) =>
            String(order.cropId) === String(selectedCrop.id)
        )
        .reduce(
          (total, order) =>
            total + Number(order.quantity || 0),
          0
        )
    : 0;

  const availableStock = selectedCrop
    ? Math.max(0, Number(selectedCrop.harvestQty) - bookedQuantity)
    : 0;

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!selectedBuyer) {
      setError("Please select a registered buyer.");
      return;
    }

    if (!selectedCrop) {
      setError("Please select a crop.");
      return;
    }

    const orderQuantity = Number(quantity);

    if (
      !Number.isInteger(orderQuantity) ||
      orderQuantity <= 0
    ) {
      setError("Please enter a valid quantity.");
      return;
    }

    if (orderQuantity > availableStock) {
      setError(
        `Only ${availableStock} kg of ${selectedCrop.name} is available.`
      );
      return;
    }

    if (!orderDate) {
      setError("Please select an order date.");
      return;
    }

    const newOrder = {
      id: Date.now(),
      buyerId: selectedBuyer.id,
      name: selectedBuyer.name,
      cropId: selectedCrop.id,
      crop: selectedCrop.name,
      field: selectedCrop.field,
      quantity: orderQuantity,
      orderDate: orderDate,
      status: "Pending"
    };

    onAddOrder(newOrder);

    setBuyerId("");
    setCropId("");
    setQuantity("");
    setOrderDate(todayIso());

    setSuccess("Order placed successfully!");
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f8f5",
        minHeight: "80vh",
        py: 5
      }}
    >
      <Container maxWidth="md">


        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#183b29" }}
          >
            Place a New Order
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Create crop orders for registered buyers.
          </Typography>
        </Box>


        <Card
          sx={{
            borderRadius: 3,
            border: "1px solid #e3ebe4",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                mb: 3
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: "#e8f5e9",
                  color: "#2e7d32",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <FontAwesomeIcon icon={faClipboardList} />
              </Box>

              <Box>
                <Typography variant="h6" fontWeight="bold">
                  Order Information
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Select a buyer and enter order details.
                </Typography>
              </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3
              }}
            >


              <TextField
                select
                label="Select Registered Buyer"
                value={buyerId}
                onChange={(e) => {
                  setBuyerId(e.target.value);
                  setSuccess("");
                }}
                fullWidth
                required
              >
                {buyers.map((buyer) => (
                  <MenuItem
                    key={buyer.id}
                    value={buyer.id}
                  >
                    {buyer.name}
                  </MenuItem>
                ))}
              </TextField>

              {buyers.length === 0 && (
                <Alert severity="info">
                  No registered buyers found.
                  Please register a buyer first.
                </Alert>
              )}

            

              <TextField
                select
                label="Select Crop"
                value={cropId}
                onChange={(e) => {
                  setCropId(e.target.value);
                  setSuccess("");
                }}
                fullWidth
                required
              >
                {crops.map((crop) => (
                  <MenuItem
                    key={crop.id}
                    value={crop.id}
                  >
                    {crop.name} - {crop.field}
                  </MenuItem>
                ))}
              </TextField>

    

              {selectedCrop && (
                <Box
                  sx={{
                    bgcolor: "#e8f5e9",
                    p: 2,
                    borderRadius: 2
                  }}
                >
                  <Typography
                    fontWeight="600"
                    sx={{ color: "#1b5e20" }}
                  >
                    Available Stock: {availableStock} kg
                  </Typography>
                </Box>
              )}

        

              <TextField
                label="Order Quantity (kg)"
                type="number"
                value={quantity}
                onChange={(e) => {
                  setQuantity(e.target.value);
                  setSuccess("");
                }}
                slotProps={{
                  htmlInput: { min: 1, step: 1 }
                }}
                fullWidth
                required
              />

        

              <TextField
                label="Order Date"
                type="date"
                value={orderDate}
                onChange={(e) => setOrderDate(e.target.value)}
                slotProps={{
                  inputLabel: { shrink: true }
                }}
                fullWidth
                required
              />

              <Divider />

    

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={buyers.length === 0}
                sx={{
                  bgcolor: "#1b5e20",
                  py: 1.6,
                  textTransform: "none",
                  fontWeight: "bold",
                  "&:hover": {
                    bgcolor: "#12451a"
                  }
                }}
              >
                Submit Order
              </Button>

            </Box>

          </CardContent>
        </Card>

      </Container>
    </Box>
  );
}

export default OrderForm;