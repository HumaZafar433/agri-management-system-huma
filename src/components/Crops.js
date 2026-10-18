import { useState } from "react";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Grid,
  Chip,
  LinearProgress,
  IconButton
} from "@mui/material";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faSeedling,
  faPlus,
  faPen,
  faTrash,
  faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

import { healthInfo } from "../data/seedData";

function Crops({ crops, setCrops }) {

  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    field: "",
    healthScore: "",
    cuttingDate: "",
    harvestQty: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      field: "",
      healthScore: "",
      cuttingDate: "",
      harvestQty: ""
    });

    setEditingId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name.trim() ||
      !form.field.trim() ||
      !form.cuttingDate ||
      form.healthScore === "" ||
      form.harvestQty === ""
    ) {
      return;
    }

    const score = Number(form.healthScore);
    const quantity = Number(form.harvestQty);

    if (
      score < 0 ||
      score > 100 ||
      quantity < 0
    ) {
      alert("Please enter valid crop details.");
      return;
    }

    if (editingId) {
      setCrops(
        crops.map((crop) =>
          crop.id === editingId
            ? {
                ...crop,
                ...form,
                healthScore: score,
                harvestQty: quantity
              }
            : crop
        )
      );
    } else {
      const newCrop = {
        ...form,
        id: Date.now().toString(),
        healthScore: score,
        harvestQty: quantity
      };

      setCrops([...crops, newCrop]);
    }

    resetForm();
  };

  const handleEdit = (crop) => {
    setEditingId(crop.id);

    setForm({
      name: crop.name,
      field: crop.field,
      healthScore: crop.healthScore,
      cuttingDate: crop.cuttingDate,
      harvestQty: crop.harvestQty
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this crop?"
    );

    if (confirmed) {
      setCrops(crops.filter((crop) => crop.id !== id));
    }
  };

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase()) ||
    crop.field.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusColor = (score) => {
    if (score >= 80) return "success";
    if (score >= 50) return "warning";
    return "error";
  };

  return (
    <Box sx={{ bgcolor: "#f5f8f5", minHeight: "85vh", py: 4 }}>

      <Container maxWidth="xl">


        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#183b29"
          >
            Crop Management
          </Typography>

          <Typography color="text.secondary" sx={{ mt: 1 }}>
            Manage farm crops, monitor crop health and plan harvest dates.
          </Typography>
        </Box>


        <Card
          sx={{
            borderRadius: 3,
            mb: 4,
            boxShadow: 2
          }}
        >
          <CardContent sx={{ p: 3 }}>

            <Typography
              variant="h6"
              fontWeight="bold"
              sx={{ mb: 3 }}
            >
              <FontAwesomeIcon
                icon={editingId ? faPen : faPlus}
                style={{ marginRight: 12, color: "#2e7d32" }}
              />

              {editingId ? "Edit Crop" : "Add New Crop"}
            </Typography>

            <form onSubmit={handleSubmit}>

              <Grid container spacing={2}>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Crop Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    label="Field Name"
                    name="field"
                    value={form.field}
                    onChange={handleChange}
                    required
                    fullWidth
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Health Score (0-100)"
                    name="healthScore"
                    type="number"
                    value={form.healthScore}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ min: 0, max: 100 }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
  label="Cutting Date"
  name="cuttingDate"
  type="date"
  value={form.cuttingDate}
  onChange={handleChange}
  slotProps={{
    inputLabel: { shrink: true }
  }}
  required
  fullWidth
/>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    label="Harvest Quantity (kg)"
                    name="harvestQty"
                    type="number"
                    value={form.harvestQty}
                    onChange={handleChange}
                    required
                    fullWidth
                    inputProps={{ min: 0 }}
                  />
                </Grid>

              </Grid>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ bgcolor: "#1b5e20" }}
                >
                  {editingId ? "Update Crop" : "Add Crop"}
                </Button>

                {editingId && (
                  <Button variant="outlined" onClick={resetForm}>
                    Cancel
                  </Button>
                )}
              </Box>

            </form>

          </CardContent>
        </Card>



        <TextField
          placeholder="Search crops by name or field..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
          sx={{ mb: 3, maxWidth: 500 }}
          InputProps={{
            startAdornment: (
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{ marginRight: 12, color: "#2e7d32" }}
              />
            )
          }}
        />


        <Grid container spacing={3}>

          {filteredCrops.map((crop) => {

            const health = healthInfo(crop.healthScore);

            return (
              <Grid size={{ xs: 12, md: 6, lg: 4 }} key={crop.id}>

                <Card
                  sx={{
                    height: "100%",
                    borderRadius: 3,
                    border: "1px solid #e3ebe4",
                    boxShadow: "0 4px 18px rgba(0,0,0,0.05)"
                  }}
                >

                  <CardContent sx={{ p: 3 }}>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 2
                      }}
                    >
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {crop.name}
                        </Typography>

                        <Typography
                          variant="body2"
                          color="text.secondary"
                        >
                          {crop.field}
                        </Typography>
                      </Box>

                      <FontAwesomeIcon
                        icon={faSeedling}
                        style={{
                          fontSize: 25,
                          color: "#2e7d32"
                        }}
                      />
                    </Box>

                    <Typography variant="body2">
                      Health Score: {crop.healthScore}%
                    </Typography>

                    <LinearProgress
                      variant="determinate"
                      value={crop.healthScore}
                      color={getStatusColor(crop.healthScore)}
                      sx={{ height: 8, borderRadius: 5, my: 2 }}
                    />

                    <Chip
                      label={health.label}
                      color={getStatusColor(crop.healthScore)}
                      size="small"
                      sx={{ mb: 2 }}
                    />

                    <Typography variant="body2" sx={{ mb: 1 }}>
                      Harvest Date: {crop.cuttingDate}
                    </Typography>

                    <Typography variant="body2" sx={{ mb: 2 }}>
                      Harvest Quantity: {crop.harvestQty} kg
                    </Typography>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        color="primary"
                        onClick={() => handleEdit(crop)}
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </IconButton>

                      <IconButton
                        color="error"
                        onClick={() => handleDelete(crop.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </IconButton>
                    </Box>

                  </CardContent>

                </Card>

              </Grid>
            );
          })}

        </Grid>

        {filteredCrops.length === 0 && (
          <Typography color="text.secondary" sx={{ mt: 3 }}>
            No crops found.
          </Typography>
        )}

      </Container>

    </Box>
  );
}

export default Crops;