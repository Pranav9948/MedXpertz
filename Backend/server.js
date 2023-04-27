const express = require("express");
const app = express();
const cors = require("cors");



require("dotenv").config();

const dbConfig = require("./config/dbConfig");
app.use(express.json());

const {
  notFound,
  errorHandler,
} = require("./Middleware/errorHandlingMiddleware");

app.use(
  cors({
    origin: "*",
  })
);




// app.use(cors({
//   origin: 'http://localhost:3000'
// }));



const userRoute = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoutes");
const doctorRoutes = require("./routes/doctorsRoutes");
// const path = require("path");

app.use("/api/users", userRoute);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);



app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Node Express Server Started at ${port}!`));
