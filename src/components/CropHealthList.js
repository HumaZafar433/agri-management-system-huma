import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  LinearProgress
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faSeedling } from "@fortawesome/free-solid-svg-icons";

function CropHealthList() {

  const crops = [
    {
      id: 1,
      name: "Wheat",
      field: "Field A-01",
      score: 92,
      details: "Crop condition is stable"
    },
    {
      id: 2,
      name: "Rice",
      field: "Field B-02",
      score: 68,
      details: "Regular monitoring required"
    },
    {
      id: 3,
      name: "Corn",
      field: "Field C-03",
      score: 35,
      details: "Immediate attention required"
    }
  ];

  const getHealthStatus = (score) => {
    if (score >= 80) {
      return {
        label: "Healthy",
        color: "#2e7d32",
        background: "#e8f5e9"
      };
    }

    if (score >= 50) {
      return {
        label: "Needs Attention",
        color: "#b26a00",
        background: "#fff3e0"
      };
    }

    return {
      label: "Critical",
      color: "#c62828",
      background: "#ffebee"
    };
  };

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
            Crop Health Monitoring
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 0.5 }}
          >
            Track crop conditions and identify fields requiring attention.
          </Typography>
        </Box>

        <Chip
          icon={<FontAwesomeIcon icon={faLeaf} />}
          label={`${crops.length} Crops Monitored`}
          sx={{
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            fontWeight: 600,
            px: 1
          }}
        />
      </Box>

  

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
        {crops.map((crop) => {

          const health = getHealthStatus(crop.score);

          return (
            <Card
              key={crop.id}
              sx={{
                borderRadius: 3,
                border: "1px solid #e3ebe4",
                boxShadow: "0 4px 18px rgba(0,0,0,0.05)",
                transition: "0.3s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.09)"
                }
              }}
            >
              <CardContent sx={{ p: 3 }}>

  

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 3
                  }}
                >
                  <Box>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      sx={{ color: "#183b29" }}
                    >
                      {crop.name}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {crop.field}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      width: 46,
                      height: 46,
                      borderRadius: 2,
                      backgroundColor: "#e8f5e9",
                      color: "#2e7d32",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22
                    }}
                  >
                    <FontAwesomeIcon icon={faSeedling} />
                  </Box>
                </Box>


                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 1.5
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                  >
                    Health Score
                  </Typography>

                  <Typography
                    variant="h6"
                    fontWeight="bold"
                    sx={{ color: health.color }}
                  >
                    {crop.score}%
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={crop.score}
                  sx={{
                    height: 9,
                    borderRadius: 5,
                    backgroundColor: "#edf1ed",
                    mb: 3,
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: health.color,
                      borderRadius: 5
                    }
                  }}
                />


                <Chip
                  label={health.label}
                  size="small"
                  sx={{
                    backgroundColor: health.background,
                    color: health.color,
                    fontWeight: 600,
                    mb: 2
                  }}
                />

                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  {crop.details}
                </Typography>

              </CardContent>
            </Card>
          );
        })}
      </Box>

    </Box>
  );
}

export default CropHealthList;