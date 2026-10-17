import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons";

import Dashboard from "./components/Dashboard";
import SupplierOrders from "./components/SupplierOrders";
import OrderForm from "./components/OrderForm";

function App() {

  const [page, setPage] = useState("dashboard");

  const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("agricultureOrders");

    if (savedOrders) {
      return JSON.parse(savedOrders);
    }

    return [
      {
        id: 1,
        name: "Ali Ahmed",
        crop: "Wheat",
        quantity: 50,
        status: "Pending"
      },
      {
        id: 2,
        name: "Ayesha Khan",
        crop: "Rice",
        quantity: 30,
        status: "Delivered"
      },
      {
        id: 3,
        name: "Hassan Ali",
        crop: "Corn",
        quantity: 80,
        status: "Pending"
      }
    ];
  });

  // Save orders in localStorage
  useEffect(() => {
    localStorage.setItem("agricultureOrders", JSON.stringify(orders));
  }, [orders]);

  // Add new order
  const addOrder = (newOrder) => {
    setOrders((previousOrders) => [...previousOrders, newOrder]);
  };

  const markDelivered = (id) => {
    setOrders((previousOrders) =>
      previousOrders.map((order) =>
        order.id === id
          ? { ...order, status: "Delivered" }
          : order
      )
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: "#f4f8f4",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column"
      }}
    >

      <AppBar
        position="static"
        sx={{ backgroundColor: "#1b5e20" }}
      >
        <Toolbar>

          <Typography
            variant="h6"
            sx={{ flexGrow: 1, fontWeight: "bold" }}
          >
            <FontAwesomeIcon
              icon={faWheatAwn}
              style={{ marginRight: "10px" }}
            />

            AgriVista Ventures
          </Typography>

          <Button
            color="inherit"
            onClick={() => setPage("dashboard")}
          >
            Dashboard
          </Button>

          <Button
            color="inherit"
            onClick={() => setPage("orders")}
          >
            Supplier Orders
          </Button>

          <Button
            color="inherit"
            onClick={() => setPage("place-order")}
          >
            Place Order
          </Button>

        </Toolbar>
      </AppBar>

      <Box sx={{ flexGrow: 1 }}>

        {page === "dashboard" && (
         <Dashboard orders={orders} />
        )}

        {page === "orders" && (
          <SupplierOrders
            orders={orders}
            onMarkDelivered={markDelivered}
          />
        )}

        {page === "place-order" && (
          <OrderForm onAddOrder={addOrder} />
        )}

      </Box>

      <Box
        component="footer"
        sx={{
          backgroundColor: "#1b5e20",
          color: "white",
          textAlign: "center",
          py: 3,
          mt: 4
        }}
      >
        <Typography variant="body2">
          © 2026 AgriVista Ventures
        </Typography>

        <Typography variant="caption">
          Smart Farming & Crop Management
        </Typography>
      </Box>

    </Box>
  );
}

export default App;