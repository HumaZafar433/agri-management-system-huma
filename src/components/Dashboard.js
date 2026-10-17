import React from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Chip
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faDroplet,
  faSeedling,
  faTemperatureHigh,
  faSun,
  faCloud,
  faCloudRain,
  faChartLine,
  faClipboardList,
  faClock,
  faTruckFast
} from "@fortawesome/free-solid-svg-icons";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";


function Dashboard({ orders = [] }) {

  const cropData = [
    {
      title: "Soil Humidity",
      value: "65%",
      description: "Moisture level",
      icon: faDroplet,
      color: "#0288d1",
      background: "#e3f2fd"
    },
    {
      title: "Today's Crop Growth",
      value: "4.2 cm",
      description: "Daily growth recorded",
      icon: faSeedling,
      color: "#2e7d32",
      background: "#e8f5e9"
    },
    {
      title: "Temperature",
      value: "28°C",
      description: "Sunny conditions",
      icon: faTemperatureHigh,
      color: "#ed6c02",
      background: "#fff3e0"
    }
  ];

  const growthData = [
    { day: "Mon", growth: 2.1 },
    { day: "Tue", growth: 2.5 },
    { day: "Wed", growth: 2.3 },
    { day: "Thu", growth: 3.1 },
    { day: "Fri", growth: 3.4 },
    { day: "Sat", growth: 3.8 },
    { day: "Sun", growth: 4.2 }
  ];

  const weatherData = [
    {
      day: "Tomorrow",
      weather: "Sunny",
      temperature: "29°C",
      icon: faSun,
      color: "#f59e0b"
    },
    {
      day: "Day 2",
      weather: "Cloudy",
      temperature: "26°C",
      icon: faCloud,
      color: "#64748b"
    },
    {
      day: "Day 3",
      weather: "Rainy",
      temperature: "24°C",
      icon: faCloudRain,
      color: "#0288d1"
    }
  ];

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <Box sx={{ backgroundColor: "#f5f8f5", minHeight: "100vh" }}>

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, md: 5 } }}>

        {/* Dashboard Header */}

        <Box
          sx={{
            background: "linear-gradient(120deg, #123524, #287344)",
            color: "white",
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            mb: 4,
            boxShadow: "0 10px 25px rgba(18,53,36,0.15)"
          }}
        >
          <Chip
            label="CROP INTELLIGENCE"
            size="small"
            sx={{
              backgroundColor: "rgba(255,255,255,0.15)",
              color: "white",
              mb: 2,
              fontWeight: 600
            }}
          />

          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ mb: 1 }}
          >
            Farm Overview
          </Typography>

         <Typography sx={{ color: "#d7eadd", mb: 2 }}>
           Monitor your crops, track growth and manage farm operations.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "#c7dfce" }}
          >
            Crop monitoring values shown below are demo data.
          </Typography>
        </Box>


        {/* Crop Monitoring Cards */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)"
            },
            gap: 3,
            mb: 4
          }}
        >
          {cropData.map((item) => (
            <Card
              key={item.title}
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
                border: "1px solid #e8eee8"
              }}
            >
              <CardContent sx={{ p: 3 }}>

                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: 3,
                    backgroundColor: item.background,
                    color: item.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    mb: 3
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1 }}
                >
                  {item.title}
                </Typography>

                <Typography
                  variant="h4"
                  fontWeight="bold"
                  sx={{ color: "#183b29", mb: 1 }}
                >
                  {item.value}
                </Typography>

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {item.description}
                </Typography>

              </CardContent>
            </Card>
          ))}
        </Box>


        {/* Growth Chart and Weather Forecast */}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              lg: "1.7fr 1fr"
            },
            gap: 3,
            mb: 4
          }}
        >

          {/* Growth Chart */}

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
              border: "1px solid #e8eee8"
            }}
          >
            <CardContent sx={{ p: 3 }}>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  mb: 1
                }}
              >
                <FontAwesomeIcon
                  icon={faChartLine}
                  style={{ color: "#2e7d32" }}
                />

                <Typography
                  variant="h6"
                  fontWeight="bold"
                >
                  Crop Growth Analytics
                </Typography>
              </Box>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 4 }}
              >
                Weekly crop growth trend (cm)
              </Typography>

              <Box sx={{ width: "100%", height: 280 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={growthData}
                    margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="growthGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#43a047"
                          stopOpacity={0.35}
                        />
                        <stop
                          offset="95%"
                          stopColor="#43a047"
                          stopOpacity={0.02}
                        />
                      </linearGradient>
                    </defs>

                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                    />

                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                    />

                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      domain={[0, 5]}
                      tickFormatter={(value) => `${value}`}
                    />

                    <Tooltip
                      formatter={(value) => [`${value} cm`, "Growth"]}
                    />

                    <Area
                      type="monotone"
                      dataKey="growth"
                      stroke="#2e7d32"
                      strokeWidth={3}
                      fill="url(#growthGradient)"
                      dot={{ r: 4, fill: "#2e7d32" }}
                      activeDot={{ r: 6 }}
                    />

                  </AreaChart>
                </ResponsiveContainer>
              </Box>

            </CardContent>
          </Card>


          {/* Weather Forecast */}

          <Card
            sx={{
              borderRadius: 3,
              boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
              border: "1px solid #e8eee8"
            }}
          >
            <CardContent sx={{ p: 3 }}>

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 1 }}
              >
                Weather Forecast
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 3 }}
              >
                Upcoming 3 days
              </Typography>

              {weatherData.map((item) => (
                <Box
                  key={item.day}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: "#f8faf8",
                    border: "1px solid #edf0ed",
                    borderRadius: 2,
                    p: 2,
                    mb: 2
                  }}
                >

                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>

                    <Box
                      sx={{
                        fontSize: 25,
                        color: item.color,
                        width: 32,
                        textAlign: "center"
                      }}
                    >
                      <FontAwesomeIcon icon={item.icon} />
                    </Box>

                    <Box>
                      <Typography fontWeight="600">
                        {item.day}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >
                        {item.weather}
                      </Typography>
                    </Box>

                  </Box>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: "#183b29" }}
                  >
                    {item.temperature}
                  </Typography>

                </Box>
              ))}

            </CardContent>
          </Card>

        </Box>


        {/* Orders Overview */}

        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ color: "#183b29", mb: 2 }}
        >
          Farm Activity Overview
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "repeat(3, 1fr)"
            },
            gap: 3
          }}
        >

          {[
            {
              title: "Total Orders",
              value: totalOrders,
              icon: faClipboardList,
              color: "#2e7d32"
            },
            {
              title: "Pending Orders",
              value: pendingOrders,
              icon: faClock,
              color: "#ed6c02"
            },
            {
              title: "Delivered Orders",
              value: deliveredOrders,
              icon: faTruckFast,
              color: "#0288d1"
            }
          ].map((item) => (
            <Card
              key={item.title}
              sx={{
                borderRadius: 3,
                boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
                border: "1px solid #e8eee8"
              }}
            >
              <CardContent
                sx={{
                  p: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between"
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
                    variant="h4"
                    fontWeight="bold"
                    sx={{ mt: 1 }}
                  >
                    {item.value}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    fontSize: 26,
                    color: item.color
                  }}
                >
                  <FontAwesomeIcon icon={item.icon} />
                </Box>

              </CardContent>
            </Card>
          ))}

        </Box>

      </Container>
    </Box>
  );
}

export default Dashboard;