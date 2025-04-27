import consumptions from "../data/consumptions.js";

//Get all consumptions
export function getAllConsumptions(req, res, next) {
   const limit = parseInt(req.query.limit);

   if (!isNaN(limit)) {
      return res.status(200).json(consumptions.slice(0, limit));
   }
   res.status(200).json(consumptions);
}

//Get consumption by catId
export function getConsumptionByCatId(req, res, next) {
   const catId = parseInt(req.params.catId);
   const consumptionByCatId = consumptions.filter((cat) => cat.catId === catId);

   if (!consumptionByCatId.length) {
      const error = new Error(
         `Consumption of cat id = ${catId} was not found.`
      );
      error.status = 404;
      return next(error);
   }

   res.status(200).json(consumptionByCatId);
}

//Post a new consumption
export function postNewConsumption(req, res, next) {
   const newConsumption = {
      id: consumptions.length + 1,
      catId: parseInt(req.body.catId),
      volume: parseInt(req.body.volume),
   };

   if (!newConsumption.catId || !newConsumption.volume) {
      const error = new Error("Body missing required fields");
      error.status = 400;
      return next(error);
   }

   consumptions.push(newConsumption);
   res.status(201).json(newConsumption);
}

//Update consumption by id
export function updateConsumptionById(req, res, next) {
   const id = parseInt(req.params.id);
   const consumption = consumptions.find(
      (consumption) => consumption.id === id
   );

   if (!consumption) {
      const error = new Error(`Consumption id of ${id} was not found.`);
      error.status = 404;
      return next(error);
   }

   const catId = parseInt(req.body.catId);
   const volume = parseInt(req.body.volume);

   if (!catId && !volume) {
      const error = new Error("Body missing required fields");
      error.status = 400;
      return next(error);
   }

   if (catId) {
      consumption.catId = catId;
   }

   if (volume) {
      consumption.volume = volume;
   }

   res.status(200).json(consumptions);
}

//Delete consumption by id
export function deleteConsumptionById(req, res, next) {
   const id = parseInt(req.params.id);
   const consumption = consumptions.find(
      (consumption) => consumption.id === id
   );

   if (!consumption) {
      const error = new Error(`Consumption id of ${id} was not found.`);
      error.status = 404;
      return next(error);
   }

   consumptions = consumptions.filter((cons) => cons.id !== id);

   res.status(200).json(consumptions);
}
