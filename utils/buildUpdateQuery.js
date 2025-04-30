export function buildUpdateQuery(tableName, fields, id) {
   const updates = [];
   const values = [];

   //For each entri in fields object push the query and value
   Object.entries(fields).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
         updates.push(`${key} = $${values.length + 1}`);
         values.push(value);
      }
   });

   if(updates.length === 0){
      throw new Error("No fields provided to update");
   }

   values.push(id); // add id at the end

   // Build the quary
   const updateQuery = `
      UPDATE ${tableName}
      SET ${updates.join(", ")}
      WHERE id = $${updates.length + 1}
      RETURNING *;
   `;

   return [updateQuery, values];
}
