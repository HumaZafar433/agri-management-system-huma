import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert
} from "@mui/material";

import BuyerForm from "./BuyerForm";

function Buyers({ buyers = [], onSaveBuyer, setBuyers }) {

  const [editingIndex, setEditingIndex] = useState(null);

  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    businessName: ""
  });

  const [error, setError] = useState("");
  const maskCnic = (cnic) => {
    if (!cnic) return "Not available";

    return `*****-*******-${String(cnic).slice(-1)}`;
  };
  const handleEdit = (buyer, index) => {
    setEditingIndex(index);

    setEditForm({
      name: buyer.name || "",
      phone: buyer.phone || "",
      businessName: buyer.businessName || ""
    });

    setError("");
  };

  const closeEdit = () => {
    setEditingIndex(null);
    setError("");
  };

  const handleUpdate = () => {

    const name = editForm.name.trim();
    const phone = editForm.phone.trim();

    if (
      name.length < 3 ||
      !/^[A-Za-z ]+$/.test(name)
    ) {
      setError("Enter a valid name with at least 3 letters.");
      return;
    }

    if (!/^03\d{9}$/.test(phone)) {
      setError("Enter a valid 11-digit contact number.");
      return;
    }

    setBuyers((previousBuyers) =>
      previousBuyers.map((buyer, index) =>
        index === editingIndex
          ? {
              ...buyer,
              name,
              phone,
              businessName: editForm.businessName.trim()
            }
          : buyer
      )
    );

    closeEdit();
  };

  const handleDelete = (index) => {

    const buyer = buyers[index];

    if (!buyer) return;

    const confirmed = window.confirm(
      `Are you sure you want to delete ${buyer.name}? Existing orders may still reference this buyer.`
    );

    if (!confirmed) return;

    setBuyers((previousBuyers) =>
      previousBuyers.filter(
        (_, buyerIndex) => buyerIndex !== index
      )
    );
  };

  return (
    <Box
      sx={{
        bgcolor: "#f5f8f5",
        minHeight: "85vh",
        py: { xs: 3, md: 4 }
      }}
    >
      <Container maxWidth="xl">

        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{
              color: "#183b29",
              fontSize: { xs: 28, md: 36 }
            }}
          >
            Buyer Management
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Register buyers and manage business information.
          </Typography>
        </Box>

        <Box sx={{ mb: 4 }}>
          <BuyerForm
            buyers={buyers}
            onSaveBuyer={onSaveBuyer}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: {
              xs: "flex-start",
              sm: "center"
            },
            flexDirection: {
              xs: "column",
              sm: "row"
            },
            gap: 2,
            mb: 3
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: "#183b29" }}
          >
            Registered Buyers
          </Typography>

          <Chip
            label={`${buyers.length} Buyers Registered`}
            sx={{
              bgcolor: "#e8f5e9",
              color: "#1b5e20",
              fontWeight: 600
            }}
          />
        </Box>

        {buyers.length === 0 && (
          <Card
            sx={{
              borderRadius: 3,
              p: 4,
              textAlign: "center",
              border: "1px solid #e3ebe4",
              boxShadow: "none"
            }}
          >
            <Typography color="text.secondary">
              No buyers registered yet.
            </Typography>
          </Card>
        )}
        {buyers.length > 0 && (
          <Box
            sx={{
              display: {
                xs: "grid",
                md: "none"
              },
              gridTemplateColumns: "1fr",
              gap: 2
            }}
          >
            {buyers.map((buyer, index) => (
              <Card
                key={`${buyer.id}-${index}`}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e3ebe4",
                  boxShadow:
                    "0 4px 18px rgba(0,0,0,0.04)"
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                      mb: 2
                    }}
                  >
                    <Avatar
                      src={buyer.imageBase64}
                      variant="rounded"
                      sx={{
                        width: 60,
                        height: 60,
                        flexShrink: 0
                      }}
                    />

                    <Box sx={{ minWidth: 0 }}>
                      <Typography
                        fontWeight={700}
                        sx={{
                          color: "#183b29",
                          overflowWrap: "anywhere"
                        }}
                      >
                        {buyer.name}
                      </Typography>

                      <Chip
                        label="Registered"
                        size="small"
                        color="success"
                        sx={{ mt: 1 }}
                      />
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      bgcolor: "#f7faf7",
                      borderRadius: 2,
                      p: 2,
                      mb: 2
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Contact Number
                    </Typography>

                    <Typography
                      fontWeight={600}
                      sx={{ mb: 2 }}
                    >
                      {buyer.phone || "Not added"}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      Business / Mill
                    </Typography>

                    <Typography
                      fontWeight={600}
                      sx={{
                        mb: 2,
                        overflowWrap: "anywhere"
                      }}
                    >
                      {buyer.businessName || "Individual"}
                    </Typography>

                    <Typography
                      variant="caption"
                      color="text.secondary"
                    >
                      CNIC
                    </Typography>

                    <Typography fontWeight={600}>
                      {maskCnic(buyer.cnic)}
                    </Typography>
                  </Box>

                  {/* Mobile Action Buttons */}

                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5
                    }}
                  >
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleEdit(buyer, index)}
                      sx={{
                        textTransform: "none",
                        color: "#1b5e20",
                        borderColor: "#1b5e20",
                        fontWeight: 600
                      }}
                    >
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      fullWidth
                      onClick={() => handleDelete(index)}
                      sx={{
                        textTransform: "none",
                        fontWeight: 600
                      }}
                    >
                      Delete
                    </Button>
                  </Box>

                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        {buyers.length > 0 && (
          <Card
            sx={{
              display: {
                xs: "none",
                md: "block"
              },
              borderRadius: 3,
              border: "1px solid #e3ebe4",
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.05)"
            }}
          >
            <TableContainer>
              <Table sx={{ minWidth: 950 }}>

                <TableHead sx={{ bgcolor: "#e8f5e9" }}>
                  <TableRow>
                    <TableCell><b>Photo</b></TableCell>
                    <TableCell><b>Full Name</b></TableCell>
                    <TableCell><b>Contact Number</b></TableCell>
                    <TableCell><b>Business / Mill</b></TableCell>
                    <TableCell><b>CNIC</b></TableCell>
                    <TableCell><b>Status</b></TableCell>
                    <TableCell><b>Actions</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {buyers.map((buyer, index) => (
                    <TableRow
                      key={`${buyer.id}-${index}`}
                      hover
                    >
                      <TableCell>
                        <Avatar
                          src={buyer.imageBase64}
                          variant="rounded"
                          sx={{
                            width: 48,
                            height: 48
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Typography fontWeight={600}>
                          {buyer.name}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {buyer.phone || "Not added"}
                      </TableCell>

                      <TableCell>
                        {buyer.businessName || "Individual"}
                      </TableCell>

                      <TableCell>
                        {maskCnic(buyer.cnic)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label="Registered"
                          size="small"
                          color="success"
                        />
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1
                          }}
                        >
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() =>
                              handleEdit(buyer, index)
                            }
                            sx={{
                              textTransform: "none",
                              color: "#1b5e20",
                              borderColor: "#1b5e20"
                            }}
                          >
                            Edit
                          </Button>

                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() =>
                              handleDelete(index)
                            }
                            sx={{
                              textTransform: "none"
                            }}
                          >
                            Delete
                          </Button>
                        </Box>
                      </TableCell>

                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </TableContainer>
          </Card>
        )}

        <Dialog
          open={editingIndex !== null}
          onClose={closeEdit}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            Edit Buyer Information
          </DialogTitle>

          <DialogContent>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label="Full Name"
              fullWidth
              margin="normal"
              value={editForm.name}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  name: e.target.value
                })
              }
            />

            <TextField
              label="Contact Number"
              fullWidth
              margin="normal"
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  phone: e.target.value
                })
              }
            />

            <TextField
              label="Business / Mill Name"
              fullWidth
              margin="normal"
              value={editForm.businessName}
              onChange={(e) =>
                setEditForm({
                  ...editForm,
                  businessName: e.target.value
                })
              }
            />

            <Typography
              variant="caption"
              color="text.secondary"
              sx={{
                display: "block",
                mt: 2
              }}
            >
              CNIC and photo remain unchanged.
            </Typography>

          </DialogContent>

          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={closeEdit}
              sx={{ textTransform: "none" }}
            >
              Cancel
            </Button>

            <Button
              variant="contained"
              onClick={handleUpdate}
              sx={{
                bgcolor: "#1b5e20",
                textTransform: "none",
                "&:hover": {
                  bgcolor: "#12451a"
                }
              }}
            >
              Save Changes
            </Button>
          </DialogActions>

        </Dialog>

      </Container>
    </Box>
  );
}

export default Buyers;
