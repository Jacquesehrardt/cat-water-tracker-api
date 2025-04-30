import express from "express";
import {
   getAllConsumptions,
   getConsumptionByCatId,
   createNewConsumption,
   updateConsumptionById,
   deleteConsumptionById,
} from "../controllers/consumptionController.js";

const router = express.Router();

//Get all cats consumption
router.get("/", getAllConsumptions);

//Get consumption by catId
router.get("/:catId", getConsumptionByCatId);

//Post a new consumption
router.post("/", createNewConsumption);

//Update consumption by id
router.put("/:id", updateConsumptionById);

//Delete consumption by id
router.delete("/:id", deleteConsumptionById);

export default router;
