import express from "express";

const router = express.Router();

//Dumy data
let consumptions = [
   { id: 1, catId: 1, volume: 12.2 },
   { id: 2, catId: 2, volume: 4.2 },
   { id: 3, catId: 1, volume: 5 },
   { id: 4, catId: 3, volume: 7.8 },
];

//Get all cats consumption
router.get("/", (req, res) => {
   const limit = parseInt(req.query.limit);

   if (!isNaN(limit)) {
      return res.status(200).json(consumptions.slice(0, limit));
   }
   res.status(200).json(consumptions);
});

//Get consumption by catId
router.get("/:catId", (req, res) => {
   const catId = parseInt(req.params.catId);
   const consumptionByCatId = consumptions.filter((cat) => cat.catId === catId);

   if (!consumptionByCatId.length) {
      return res
         .status(404)
         .json({ message: `Consumption of cat id = ${catId} was not found.` });
   }

   res.status(200).json(consumptionByCatId);
});

//Post a new consumption
router.post("/", (req, res) => {
   const newConsumption = {
      id: consumptions.length + 1,
      catId: parseInt(req.body.catId),
      volume: parseInt(req.body.volume),
   };

   if (!newConsumption.catId || !newConsumption.volume) {
      return res.status(400).json({ message: "Something is wrong." });
   }

   consumptions.push(newConsumption);
   res.status(201).json(newConsumption);
});

//Update consumption by id
router.put("/:id", (req, res) => {
   const id = parseInt(req.params.id);
   const consumption = consumptions.find(
      (consumption) => consumption.id === id
   );

   if (!consumption) {
      return res.status(404).json({ message: `Id = ${id} was not found.` });
   }
   // const { catId, volume } = req.body;
   const catId = parseInt(req.body.catId);
   const volume = parseInt(req.body.volume);

   if (!catId && !volume) {
      return res.status(400).json({ message: "Something is wrong." });
   }

   if (catId) {
      consumption.catId = catId;
   }

   if (volume) {
      consumption.volume = volume;
   }

   res.status(200).json(consumptions);
});

//Delete consumption by id
router.delete("/:id", (req, res) => {
   const id = parseInt(req.params.id);
   const consumption = consumptions.find(
      (consumption) => consumption.id === id
   );

   if (!consumption) {
      return res.status(404).json({ message: `Id = ${id} was not found.` });
   }
   
   consumptions = consumptions.filter((cons) => (cons.id !== id));

   res.status(200).json(consumptions);
});

export default router;
