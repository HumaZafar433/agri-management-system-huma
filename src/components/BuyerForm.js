import { useState } from "react";

import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  Avatar
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUpload
} from "@fortawesome/free-solid-svg-icons";

function BuyerForm({ buyers = [], onSaveBuyer }) {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [cnic, setCnic] = useState("");
  const [photo, setPhoto] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const formatCnic = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 13);

    if (digits.length > 12) {
      return `${digits.slice(0, 5)}-${digits.slice(5, 12)}-${digits.slice(12)}`;
    }

    if (digits.length > 5) {
      return `${digits.slice(0, 5)}-${digits.slice(5)}`;
    }

    return digits;
  };

  const handlePhoto = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setError("Only JPG and PNG images are allowed.");
      event.target.value = "";
      return;
    }

    if (file.size > 1024 * 1024) {
      setError("Photo must be less than 1 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setPhoto(String(reader.result));
      setError("");
      setSuccess("");
    };

    reader.onerror = () => {
      setError("Unable to load the selected photo.");
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
  name.trim().length < 3 ||
  !/^[A-Za-z ]+$/.test(name.trim())
) {
  setError("Name must contain at least 3 letters and spaces only.");
  return;
}
  

    if (!/^03\d{9}$/.test(phone)) {
      setError("Enter a valid 11-digit Pakistani mobile number.");
      return;
    }

    if (!/^\d{5}-\d{7}-\d$/.test(cnic)) {
      setError("Enter a valid 13-digit CNIC format.");
      return;
    }

    if (buyers.some((buyer) => buyer.cnic === cnic)) {
      setError("This CNIC is already registered.");
      return;
    }

    if (!photo) {
      setError("Please select a buyer photo.");
      return;
    }

    const newBuyer = {
      id: Date.now().toString(),
      name: name.trim(),
      phone: phone,
      businessName: businessName.trim(),
      cnic: cnic,
      imageBase64: photo
    };

    onSaveBuyer(newBuyer);

    setName("");
    setPhone("");
    setBusinessName("");
    setCnic("");
    setPhoto("");

    event.currentTarget.reset();

    setError("");
    setSuccess("Buyer registered successfully.");
  };

  return (
    <Card
      sx={{
        borderRadius: 3,
        border: "1px solid #e3ebe4",
        boxShadow: "0 5px 24px rgba(20,60,30,0.06)"
      }}
    >
      <CardContent sx={{ p: { xs: 3, md: 4 } }}>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#183b29", mb: 1 }}
        >
          <FontAwesomeIcon
            icon={faUserPlus}
            style={{
              marginRight: 12,
              color: "#2e7d32"
            }}
          />
          Register New Buyer
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Add buyer information before creating crop orders.
        </Typography>

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

        <Box component="form" onSubmit={handleSubmit}>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))"
              },
              gap: 3,
              mb: 3
            }}
          >

            <TextField
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              fullWidth
            />

            <TextField
              label="Contact Number"
              placeholder="03001234567"
              value={phone}
              onChange={(e) => {
                const numbers = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 11);

                setPhone(numbers);
              }}
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  maxLength: 11
                }
              }}
              required
              fullWidth
            />

            <TextField
              label="Business / Mill Name (Optional)"
              placeholder="e.g. Green Valley Rice Mills"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              fullWidth
            />

            <TextField
              label="CNIC Number"
              placeholder="12345-1234567-1"
              value={cnic}
              onChange={(e) =>
                setCnic(formatCnic(e.target.value))
              }
              slotProps={{
                htmlInput: {
                  inputMode: "numeric",
                  maxLength: 15
                }
              }}
              required
              fullWidth
            />

          </Box>


          <Box
            sx={{
              border: "1px dashed #b5d2bc",
              borderRadius: 2,
              p: 3,
              mb: 3
            }}
          >

            <Typography
              fontWeight="600"
              sx={{ mb: 2 }}
            >
              Buyer Photo
            </Typography>

            <Button
              component="label"
              variant="outlined"
              startIcon={
                <FontAwesomeIcon icon={faUpload} />
              }
              sx={{
                color: "#1b5e20",
                borderColor: "#2e7d32",
                textTransform: "none"
              }}
            >
              Select Photo

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                hidden
                onChange={handlePhoto}
              />
            </Button>

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 1.5
              }}
            >
              JPG or PNG, maximum 1 MB
            </Typography>

            {photo && (
              <Box sx={{ mt: 2 }}>
                <Avatar
                  src={photo}
                  variant="rounded"
                  sx={{
                    width: 90,
                    height: 90
                  }}
                />
              </Box>
            )}

          </Box>

          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#1b5e20",
              textTransform: "none",
              px: 4,
              py: 1.5,
              "&:hover": {
                bgcolor: "#12451a"
              }
            }}
          >
            Register Buyer
          </Button>

        </Box>

      </CardContent>
    </Card>
  );
}

export default BuyerForm;