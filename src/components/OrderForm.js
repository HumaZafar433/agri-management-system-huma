import { useState } from "react";

import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Stack,
  Alert,
  Box,
  Divider
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faClipboardList,
  faUpload,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";


function OrderForm({ onAddOrder }) {

  const [name, setName] = useState("");
  const [crop, setCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [documentFile, setDocumentFile] = useState(null);
  const [success, setSuccess] = useState(false);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !name.trim() ||
      !crop.trim() ||
      !quantity ||
      Number(quantity) <= 0
    ) {
      return;
    }

    const newOrder = {
      id: Date.now(),
      name: name.trim(),
      crop: crop.trim(),
      quantity: Number(quantity),
      status: "Pending",
      documentName: documentFile ? documentFile.name : ""
    };

    onAddOrder(newOrder);

    setName("");
    setCrop("");
    setQuantity("");
    setDocumentFile(null);
    setSuccess(true);

    e.currentTarget.reset();
  };


  return (
    <Box
      sx={{
        backgroundColor: "#f5f8f5",
        minHeight: "80vh",
        py: 5
      }}
    >

      <Container maxWidth="md">

        {/* Page Heading */}

        <Box sx={{ mb: 4 }}>

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ color: "#183b29" }}
          >
            Place a New Order
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Submit your crop delivery request using the form below.
          </Typography>

        </Box>


        {/* Order Form Card */}

        <Card
          sx={{
            borderRadius: 4,
            border: "1px solid #e3ebe4",
            boxShadow: "0 8px 30px rgba(0,0,0,0.05)"
          }}
        >

          <CardContent sx={{ p: { xs: 3, md: 5 } }}>

            {/* Form Title */}

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
                  backgroundColor: "#e8f5e9",
                  color: "#2e7d32",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22
                }}
              >
                <FontAwesomeIcon icon={faClipboardList} />
              </Box>

              <Box>

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Order Information
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Enter the required details
                </Typography>

              </Box>

            </Box>


            <Divider sx={{ mb: 4 }} />


            {/* Success Message */}

            {success && (
              <Alert
                severity="success"
                icon={
                  <FontAwesomeIcon icon={faCheckCircle} />
                }
                sx={{ mb: 3, borderRadius: 2 }}
              >
                Your order has been submitted successfully!
              </Alert>
            )}


            <form onSubmit={handleSubmit}>

              <Stack spacing={3}>

                {/* Customer Name */}

                <TextField
                  label="Customer Name"
                  placeholder="Enter your full name"
                  fullWidth
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    setSuccess(false);
                  }}
                />


                {/* Crop Name */}

                <TextField
                  label="Crop Name"
                  placeholder="Enter crop name"
                  fullWidth
                  required
                  value={crop}
                  onChange={(e) => {
                    setCrop(e.target.value);
                    setSuccess(false);
                  }}
                />


                {/* Quantity */}

                <TextField
                  label="Quantity (kg)"
                  type="number"
                  fullWidth
                  required
                  value={quantity}
                  inputProps={{ min: 1 }}
                  onChange={(e) => {
                    setQuantity(e.target.value);
                    setSuccess(false);
                  }}
                />


                {/* Document Selection */}

                <Box>

                  <Typography
                    fontWeight="600"
                    sx={{ mb: 1 }}
                  >
                    CNIC Document (Optional)
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    Select a CNIC image or PDF.
                  </Typography>


                  <Button
                    component="label"
                    variant="outlined"
                    startIcon={
                      <FontAwesomeIcon icon={faUpload} />
                    }
                    sx={{
                      borderColor: "#2e7d32",
                      color: "#2e7d32",
                      textTransform: "none",
                      borderRadius: 2,
                      px: 3,
                      py: 1.3
                    }}
                  >
                    Select CNIC

                    <input
                      type="file"
                      accept="image/*,.pdf"
                      hidden
                      onChange={(e) => {
                        setDocumentFile(
                          e.target.files[0] || null
                        );
                        setSuccess(false);
                      }}
                    />

                  </Button>


                  {documentFile && (
                    <Typography
                      variant="body2"
                      sx={{
                        mt: 2,
                        color: "#2e7d32"
                      }}
                    >
                     CNIC Selected: {documentFile.name}
                    </Typography>
                  )}


                </Box>


                <Divider />


                {/* Submit Button */}

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: "#1b5e20",
                    py: 1.6,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: 16,
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#12451a"
                    }
                  }}
                >
                  Submit Order
                </Button>

              </Stack>

            </form>

          </CardContent>

        </Card>

      </Container>

    </Box>
  );
}

export default OrderForm;