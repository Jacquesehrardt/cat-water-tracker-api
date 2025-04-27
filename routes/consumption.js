import express from "express";

const router = express.Router();

let consumption = [
   { id: 1, catId: 1, volume: 12.2 },
   { id: 2, catId: 2, volume: 4.2 },
   { id: 3, catId: 1, volume: 5 },
   { id: 4, catId: 3, volume: 7.8 },
];

//Get all cats consumption
router.get("/", (req, res) => {
   const limit = parseInt(req.query.limit);

   if (!isNaN(limit)) {
      return res.status(200).json(consumption.slice(0, limit));
   }
   res.status(200).json(consumption);
});

//Get consumption by catId
router.get("/:catId", (req, res) => {
   const catId = parseInt(req.params.catId);
   const consumptionByCatId = consumption.filter((cat) => cat.catId === catId);

   if (!consumptionByCatId) {
      return res
         .status(404)
         .json({ message: `Consumption of cat id = ${catId} was not found.` });
   }

   res.status(200).json(consumptionByCatId);
});

//Post
router.post("/", (req, res) => {
   const newConsumption = {
      id: consumption.length + 1,
      catId: parseInt(req.body.catId),
      volume: parseInt(req.body.volume),
   }

   if (!newConsumption.catId || !newConsumption.volume) {
      return res.status(400).json({ message: "Something is wrong." });
   }

   consumption.push(newConsumption);
   res.status(201).json(newConsumption);
});

export default router;
