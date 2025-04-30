import getDbConnection from "../config/database.js";
import consumptions from "../data/consumptions.js";
import { buildUpdateQuery } from "../utils/buildUpdateQuery.js";

//Get all consumptions
export async function getAllConsumptions(req, res, next) {
   const sql = await getDbConnection();
   const response =
      await sql`SELECT cat_id, volume, created_at FROM consumptions`;

   res.status(200).json(response);
}

//Get consumption by catId
export async function getConsumptionByCatId(req, res, next) {
   const catId = req.params.catId;

   const sql = await getDbConnection();
   const response =
      await sql`SELECT cat_id, volume, created_at FROM consumptions WHERE cat_id=${catId} `;

   res.status(200).json(response);
}

//Create a new consumption
export async function createNewConsumption(req, res, next) {
   const catId = req.body.catId;
   const volume = parseFloat(req.body.volume);

   if (!catId || !volume) {
      const error = new Error("Body missing required fields");
      error.status = 400;
      return next(error);
   }

   const sql = await getDbConnection();
   const response =
      await sql`INSERT INTO consumptions(cat_id, volume) VALUES (${catId}, ${volume}) RETURNING id`;

   res.status(201).json(response[0]);
}

//Update consumption by id
export async function updateConsumptionById(req, res, next) {
   try {
      const id = req.params.id;
      const cat_id = req.body.catId;
      const volume = parseFloat(req.body.volume);

      if (!cat_id && !volume) {
         const error = new Error("Body missing required fields");
         error.status = 400;
         return next(error);
      }

      const sql = await getDbConnection();

      const fields = {
         cat_id,
         volume,
      };

      const [updateQuery, values] = buildUpdateQuery(
         "consumptions",
         fields,
         id
      );

      // Executa a query
      const response = await sql.query(updateQuery, values);

      res.status(200).json({
         status: "Success",
         message: "Consumption updated successfully",
         response: response[0],
      });
   } catch (error) {
      next(error);
   }
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
