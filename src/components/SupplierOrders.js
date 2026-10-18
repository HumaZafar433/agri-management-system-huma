import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from "@mui/material";

function SupplierOrders({ orders = [], onMarkDelivered }) {

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ color: "#183b29" }}
        >
          Supplier Orders
        </Typography>

        <Typography color="text.secondary">
          Track customer orders and manage deliveries.
        </Typography>
      </Box>
      {orders.length === 0 && (
        <Paper
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid #e3ebe4",
            boxShadow: "none"
          }}
        >
          <Typography color="text.secondary">
            No orders available yet.
          </Typography>
        </Paper>
      )}
      {orders.length > 0 && (
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
          {orders.map((order) => (

            <Paper
              key={order.id}
              sx={{
                p: 2.5,
                borderRadius: 3,
                border: "1px solid #e3ebe4",
                boxShadow: "0 4px 16px rgba(0,0,0,0.05)"
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 1,
                  mb: 2
                }}
              >
                <Typography
                  fontWeight="bold"
                  sx={{
                    color: "#183b29",
                    overflowWrap: "anywhere"
                  }}
                >
                  {order.name}
                </Typography>

                <Chip
                  label={order.status}
                  color={
                    order.status === "Delivered"
                      ? "success"
                      : "warning"
                  }
                  size="small"
                />
              </Box>
              <Box
                sx={{
                  bgcolor: "#f5f8f5",
                  borderRadius: 2,
                  p: 2,
                  mb: 2
                }}
              >

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Crop
                </Typography>

                <Typography
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  {order.crop}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Quantity
                </Typography>

                <Typography
                  fontWeight={600}
                  sx={{ mb: 2 }}
                >
                  {order.quantity} kg
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Order Date
                </Typography>

                <Typography fontWeight={600}>
                  {order.orderDate || "Not recorded"}
                </Typography>

              </Box>

              {order.status === "Pending" ? (

                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => onMarkDelivered(order.id)}
                  sx={{
                    bgcolor: "#1b5e20",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      bgcolor: "#12451a"
                    }
                  }}
                >
                  Mark Delivered
                </Button>

              ) : (

                <Typography
                  color="success.main"
                  fontWeight={600}
                  textAlign="center"
                >
                  Order Completed
                </Typography>

              )}

            </Paper>

          ))}
        </Box>
      )}

      {orders.length > 0 && (
        <TableContainer
          component={Paper}
          sx={{
            display: {
              xs: "none",
              md: "block"
            },
            borderRadius: 3,
            border: "1px solid #e3ebe4",
            boxShadow: "0 4px 18px rgba(0,0,0,0.05)"
          }}
        >

          <Table sx={{ minWidth: 750 }}>

            <TableHead sx={{ bgcolor: "#e8f5e9" }}>
              <TableRow>
                <TableCell><b>Buyer Name</b></TableCell>
                <TableCell><b>Crop</b></TableCell>
                <TableCell><b>Quantity</b></TableCell>
                <TableCell><b>Order Date</b></TableCell>
                <TableCell><b>Status</b></TableCell>
                <TableCell><b>Action</b></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>

              {orders.map((order) => (

                <TableRow key={order.id} hover>

                  <TableCell>
                    {order.name}
                  </TableCell>

                  <TableCell>
                    {order.crop}
                  </TableCell>

                  <TableCell>
                    {order.quantity} kg
                  </TableCell>

                  <TableCell>
                    {order.orderDate || "Not recorded"}
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
                        onClick={() =>
                          onMarkDelivered(order.id)
                        }
                        sx={{ textTransform: "none" }}
                      >
                        Mark Delivered
                      </Button>

                    ) : (

                      <Typography
                        variant="body2"
                        color="success.main"
                        fontWeight={600}
                      >
                        Completed
                      </Typography>

                    )}

                  </TableCell>

                </TableRow>

              ))}

            </TableBody>

          </Table>

        </TableContainer>
      )}

    </Box>
  );
}

export default SupplierOrders;
