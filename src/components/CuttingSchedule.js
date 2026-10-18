import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

import { daysUntil } from "../data/seedData";

function CuttingSchedule({ crops = [] }) {


  const getStatus = (days) => {
    if (days < 0) {
      return {
        label: "Overdue",
        color: "error"
      };
    }

    if (days <= 3) {
      return {
        label: "Due Soon",
        color: "warning"
      };
    }

    return {
      label: "Scheduled",
      color: "success"
    };
  };

  const formatDate = (date) => {
    if (!date) return "Not scheduled";

    return new Date(
      date + "T00:00:00"
    ).toLocaleDateString("en-GB");
  };

  
  const getDaysText = (days) => {
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    }

    if (days === 0) {
      return "Today";
    }

    return `${days} days remaining`;
  };

  
  const sortedCrops = [...crops].sort(
    (a, b) =>
      new Date(a.cuttingDate) - new Date(b.cuttingDate)
  );

  return (
    <Box sx={{ mb: 4 }}>

  

      <Box sx={{ mb: 3 }}>

        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{
            color: "#183b29",
            fontSize: { xs: 22, md: 26 }
          }}
        >
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{
              marginRight: 12,
              color: "#2e7d32"
            }}
          />

          Harvest Schedule
        </Typography>

        <Typography
          color="text.secondary"
          sx={{ mt: 1 }}
        >
          Track planned cutting dates and upcoming harvests.
        </Typography>

      </Box>

    

      {sortedCrops.length === 0 && (
        <Card
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 3,
            border: "1px solid #e3ebe4",
            boxShadow: "none"
          }}
        >
          <Typography color="text.secondary">
            No harvest records available.
          </Typography>
        </Card>
      )}

    

      {sortedCrops.length > 0 && (
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

          {sortedCrops.map((crop) => {

            const days = daysUntil(crop.cuttingDate);
            const status = getStatus(days);

            return (
              <Card
                key={crop.id}
                sx={{
                  borderRadius: 3,
                  border: "1px solid #e3ebe4",
                  boxShadow:
                    "0 4px 16px rgba(0,0,0,0.05)"
                }}
              >

                <CardContent sx={{ p: 2.5 }}>

                

                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      flexWrap: "wrap",
                      gap: 1,
                      mb: 2
                    }}
                  >

                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{
                        color: "#183b29",
                        overflowWrap: "anywhere"
                      }}
                    >
                      {crop.name}
                    </Typography>

                    <Chip
                      label={status.label}
                      color={status.color}
                      size="small"
                    />

                  </Box>

                  

                  <Box
                    sx={{
                      bgcolor: "#f5f8f5",
                      borderRadius: 2,
                      p: 2
                    }}
                  >

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Field Name
                    </Typography>

                    <Typography
                      fontWeight={600}
                      sx={{ mb: 2 }}
                    >
                      {crop.field}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Cutting Date
                    </Typography>

                    <Typography
                      fontWeight={600}
                      sx={{ mb: 2 }}
                    >
                      {formatDate(crop.cuttingDate)}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      Days Remaining
                    </Typography>

                    <Typography
                      fontWeight={600}
                      sx={{
                        color:
                          days < 0
                            ? "#c62828"
                            : days <= 3
                              ? "#e65100"
                              : "#2e7d32"
                      }}
                    >
                      {getDaysText(days)}
                    </Typography>

                  </Box>

                </CardContent>

              </Card>
            );
          })}

        </Box>
      )}


      {sortedCrops.length > 0 && (
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

            <Table sx={{ minWidth: 650 }}>

              <TableHead sx={{ bgcolor: "#e8f5e9" }}>
                <TableRow>
                  <TableCell><b>Crop</b></TableCell>
                  <TableCell><b>Field</b></TableCell>
                  <TableCell><b>Cutting Date</b></TableCell>
                  <TableCell><b>Days Remaining</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

                {sortedCrops.map((crop) => {

                  const days = daysUntil(crop.cuttingDate);
                  const status = getStatus(days);

                  return (
                    <TableRow key={crop.id} hover>

                      <TableCell>
                        {crop.name}
                      </TableCell>

                      <TableCell>
                        {crop.field}
                      </TableCell>

                      <TableCell>
                        {formatDate(crop.cuttingDate)}
                      </TableCell>

                      <TableCell>
                        {getDaysText(days)}
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={status.label}
                          color={status.color}
                          size="small"
                        />
                      </TableCell>

                    </TableRow>
                  );
                })}

              </TableBody>

            </Table>

          </TableContainer>

        </Card>
      )}

    </Box>
  );
}

export default CuttingSchedule;