import express from "express";
import consumption from "./routes/consumption.js";
import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const port = process.env.PORT || 8000;

const app = express();

//Body parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/consumption", consumption);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
