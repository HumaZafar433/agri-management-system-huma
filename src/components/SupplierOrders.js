import React from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Box,
  Button
} from "@mui/material";

function SupplierOrders({ orders, onMarkDelivered }) {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>

      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#1b5e20"
        >
          Supplier Orders
        </Typography>

        <Typography color="text.secondary">
          Manage crop orders and delivery requests
        </Typography>
      </Box>

      <TableContainer
        component={Paper}
        sx={{ borderRadius: 3, boxShadow: 2 }}
      >
        <Table>

          <TableHead sx={{ backgroundColor: "#e8f5e9" }}>
            <TableRow>
              <TableCell><b>Customer Name</b></TableCell>
              <TableCell><b>Crop</b></TableCell>
              <TableCell><b>Quantity</b></TableCell>
              <TableCell><b>Status</b></TableCell>
              <TableCell><b>Action</b></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No orders available
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} hover>

                  <TableCell>{order.name}</TableCell>

                  <TableCell>{order.crop}</TableCell>

                  <TableCell>
                    {order.quantity} kg
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={order.status}
                      color={
                        order.status === "Delivered"
                          ? "success"
                          : "warning"
                      }
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {order.status === "Pending" ? (
                      <Button
                        variant="contained"
                        color="success"
                        size="small"
                        onClick={() => onMarkDelivered(order.id)}
                      >
                        Mark Delivered
                      </Button>
                    ) : (
                      <Typography
                        variant="body2"
                        color="success.main"
                      >
                        Completed
                      </Typography>
                    )}
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>

        </Table>
      </TableContainer>

    </Container>
  );
}

export default SupplierOrders;