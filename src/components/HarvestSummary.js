import {
  Box,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Chip
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faWheatAwn,
  faBasketShopping,
  faWarehouse,
  faClipboardList
} from "@fortawesome/free-solid-svg-icons";

function HarvestSummary({ crops = [], orders = [] }) {


  const totalHarvested = crops.reduce(
    (total, crop) =>
      total + Number(crop.harvestQty || 0),
    0
  );

  const linkedOrders = orders.filter((order) =>
    crops.some(
      (crop) =>
        String(crop.id) === String(order.cropId)
    )
  );

 
  const reservedStock = linkedOrders
    .filter((order) => order.status === "Pending")
    .reduce(
      (total, order) =>
        total + Number(order.quantity || 0),
      0
    );

  const totalSold = linkedOrders
    .filter((order) => order.status === "Delivered")
    .reduce(
      (total, order) =>
        total + Number(order.quantity || 0),
      0
    );

  const remainingStock = Math.max(
    0,
    totalHarvested - reservedStock - totalSold
  );

  const totalOrders = orders.length;

  const allocatedStock = reservedStock + totalSold;

  const allocatedPercentage =
    totalHarvested > 0
      ? Math.min(
          (allocatedStock / totalHarvested) * 100,
          100
        )
      : 0;

  const summaryCards = [
    {
      title: "Total Harvested",
      value: `${totalHarvested.toLocaleString()} kg`,
      description: "Total recorded crop quantity",
      icon: faWheatAwn,
      color: "#2e7d32",
      background: "#e8f5e9"
    },
    {
      title: "Reserved Stock",
      value: `${reservedStock.toLocaleString()} kg`,
      description: "Quantity booked in pending orders",
      icon: faClipboardList,
      color: "#b26a00",
      background: "#fff3e0"
    },
    {
      title: "Quantity Sold",
      value: `${totalSold.toLocaleString()} kg`,
      description: "Completed deliveries",
      icon: faBasketShopping,
      color: "#1565c0",
      background: "#e3f2fd"
    },
    {
      title: "Remaining Stock",
      value: `${remainingStock.toLocaleString()} kg`,
      description: "Available for new orders",
      icon: faWarehouse,
      color: "#2e7d32",
      background: "#e8f5e9"
    }
  ];

  return (
    <Box sx={{ mb: 4 }}>


      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
          mb: 3
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            sx={{ color: "#183b29" }}
          >
            Harvest & Stock Overview
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mt: 1 }}
          >
            Monitor production, reserved stock,
            completed sales and available inventory.
          </Typography>
        </Box>

        <Chip
          label={`${totalOrders} Total Orders`}
          sx={{
            bgcolor: "#e8f5e9",
            color: "#1b5e20",
            fontWeight: "bold"
          }}
        />
      </Box>


      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, minmax(0, 1fr))",
            lg: "repeat(4, minmax(0, 1fr))"
          },
          gap: 3,
          mb: 3
        }}
      >

        {summaryCards.map((item) => (
          <Card
            key={item.title}
            sx={{
              borderRadius: 3,
              border: "1px solid #e3ebe4",
              boxShadow:
                "0 4px 18px rgba(0,0,0,0.05)"
            }}
          >
            <CardContent sx={{ p: 3 }}>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  gap: 2
                }}
              >

                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    variant="h5"
                    fontWeight="bold"
                    sx={{
                      color: "#183b29",
                      mt: 1
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    bgcolor: item.background,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </Box>

              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mt: 2 }}
              >
                {item.description}
              </Typography>

            </CardContent>
          </Card>
        ))}

      </Box>


      <Card
        sx={{
          borderRadius: 3,
          border: "1px solid #e3ebe4",
          boxShadow:
            "0 4px 18px rgba(0,0,0,0.05)"
        }}
      >
        <CardContent sx={{ p: 3 }}>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 2
            }}
          >
            <Typography
              variant="h6"
              fontWeight="bold"
            >
              Stock Allocation
            </Typography>

            <Typography
              fontWeight="bold"
              sx={{ color: "#2e7d32" }}
            >
              {allocatedPercentage.toFixed(1)}%
            </Typography>
          </Box>

          <LinearProgress
            variant="determinate"
            value={allocatedPercentage}
            sx={{
              height: 12,
              borderRadius: 6,
              bgcolor: "#e8f0e8",
              "& .MuiLinearProgress-bar": {
                bgcolor: "#2e7d32",
                borderRadius: 6
              }
            }}
          />

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 2 }}
          >
            {reservedStock.toLocaleString()} kg reserved
            {" | "}
            {totalSold.toLocaleString()} kg sold
            {" | "}
            {remainingStock.toLocaleString()} kg available
          </Typography>

        </CardContent>
      </Card>

    </Box>
  );
}

export default HarvestSummary;