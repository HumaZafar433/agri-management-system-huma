// Sample farm data

const relativeDate = (offset) => {
  const day = new Date();

  day.setDate(day.getDate() + offset);

  return [
    day.getFullYear(),
    String(day.getMonth() + 1).padStart(2, "0"),
    String(day.getDate()).padStart(2, "0")
  ].join("-");
};

export const starterCrops = [
  {
    id: "crop-wheat",
    name: "Wheat",
    field: "Field A-01",
    healthScore: 92,
    cuttingDate: relativeDate(2),
    harvestQty: 2400
  },
  {
    id: "crop-rice",
    name: "Rice",
    field: "Field B-02",
    healthScore: 68,
    cuttingDate: relativeDate(8),
    harvestQty: 1800
  },
  {
    id: "crop-corn",
    name: "Corn",
    field: "Field C-03",
    healthScore: 35,
    cuttingDate: relativeDate(-2),
    harvestQty: 1400
  },
  {
    id: "crop-sugarcane",
    name: "Sugarcane",
    field: "Field D-04",
    healthScore: 86,
    cuttingDate: relativeDate(15),
    harvestQty: 3200
  }
];

export const starterOrders = [
  {
    id: 1,
    name: "Ali Ahmed",
    crop: "Wheat",
    quantity: 50,
    status: "Pending",
    orderDate: relativeDate(-1)
  },
  {
    id: 2,
    name: "Ayesha Khan",
    crop: "Rice",
    quantity: 30,
    status: "Delivered",
    orderDate: relativeDate(-3)
  },
  {
    id: 3,
    name: "Hassan Ali",
    crop: "Corn",
    quantity: 80,
    status: "Pending",
    orderDate: relativeDate(0)
  }
];

export const daysUntil = (dateString) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const target = new Date(`${dateString}T00:00:00`);

  return Math.round((target - now) / 86400000);
};

export const healthInfo = (score) => {
  if (score >= 80) {
    return { label: "Healthy", tone: "good" };
  }

  if (score >= 50) {
    return { label: "Needs Attention", tone: "warn" };
  }

  return { label: "Critical", tone: "bad" };
};

export const stockFor = (crop, buyers) => {
  const soldQuantity = buyers.reduce((total, buyer) => {
    if (String(buyer.cropId) === String(crop.id)) {
      return total + Number(buyer.quantity);
    }

    return total;
  }, 0);

  return Math.max(0, Number(crop.harvestQty) - soldQuantity);
};

export const todayIso = () => {
  const now = new Date();

  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0")
  ].join("-");
};