import { useState, useEffect } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWheatAwn } from "@fortawesome/free-solid-svg-icons";

import Dashboard from "./components/Dashboard";
import Crops from "./components/Crops";
import Buyers from "./components/Buyers";
import OrderForm from "./components/OrderForm";
import HarvestSummary from "./components/HarvestSummary";
import CuttingSchedule from "./components/CuttingSchedule";
import SupplierOrders from "./components/SupplierOrders";

import useLocalStorage from "./hooks/useLocalStorage";
import { starterCrops } from "./data/seedData";

function App() {

  const [page, setPage] = useState("dashboard");

  const [crops, setCrops] = useLocalStorage(
    "agri_crops",
    starterCrops
  );

  const [buyers, setBuyers] = useLocalStorage(
    "agri_buyers",
    []
  );

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("agricultureOrders");

      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error loading orders:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(
        "agricultureOrders",
        JSON.stringify(orders)
      );
    } catch (error) {
      console.error("Error saving orders:", error);
    }
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders((previousOrders) => [
      ...previousOrders,
      newOrder
    ]);
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


  const saveBuyer = (newBuyer) => {
    setBuyers((previousBuyers) => {

      const alreadyExists = previousBuyers.some(
        (buyer) => buyer.cnic === newBuyer.cnic
      );

      if (alreadyExists) {
        return previousBuyers;
      }

      return [...previousBuyers, newBuyer];
    });
  };

  const navItems = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Crops", value: "crops" },
    { label: "Buyers", value: "buyers" },
    { label: "Place Order", value: "place-order" },
    { label: "Harvest & Orders", value: "orders" }
  ];

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
        elevation={0}
        sx={{
          backgroundColor: "#1b5e20",
          borderBottom: "1px solid rgba(255,255,255,0.15)"
        }}
      >

        <Toolbar
          sx={{
            flexWrap: "wrap",
            gap: 1,
            py: 1
          }}
        >

          <Typography
            variant="h6"
            sx={{
              flexGrow: 1,
              fontWeight: "bold",
              minWidth: 200
            }}
          >
            <FontAwesomeIcon
              icon={faWheatAwn}
              style={{ marginRight: 12 }}
            />

            AgriVista Ventures
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 0.5
            }}
          >

            {navItems.map((item) => (
              <Button
                key={item.value}
                color="inherit"
                onClick={() => setPage(item.value)}
                sx={{
                  textTransform: "none",
                  fontWeight:
                    page === item.value ? 700 : 500,

                  backgroundColor:
                    page === item.value
                      ? "rgba(255,255,255,0.16)"
                      : "transparent",

                  borderRadius: 2,
                  px: 2,

                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.12)"
                  }
                }}
              >
                {item.label}
              </Button>
            ))}

          </Box>

        </Toolbar>

      </AppBar>


      <Box sx={{ flexGrow: 1 }}>

        {page === "dashboard" && (
          <Dashboard
            crops={crops}
            orders={orders}
          />
        )}


    

        {page === "crops" && (
          <Crops
            crops={crops}
            setCrops={setCrops}
          />
        )}


    

        {page === "buyers" && (
          <Buyers
            buyers={buyers}
            onSaveBuyer={saveBuyer}
            setBuyers={setBuyers}
          />
        )}


    

        {page === "place-order" && (
          <OrderForm
            buyers={buyers}
            crops={crops}
            orders={orders}
            onAddOrder={addOrder}
          />
        )}


        

        {page === "orders" && (
          <Container
            maxWidth="xl"
            sx={{
              py: 4,
              px: { xs: 2, md: 4 }
            }}
          >


            <HarvestSummary
              crops={crops}
              buyers={buyers}
              orders={orders}
            />


      

            <CuttingSchedule crops={crops} />


          

            <Box
              sx={{
                width: "100%",
                mt: 3
              }}
            >
              <SupplierOrders
                orders={orders}
                onMarkDelivered={markDelivered}
              />
            </Box>

          </Container>
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