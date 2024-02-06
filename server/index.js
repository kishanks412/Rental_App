const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);


/* MONGOOSE SETUP */
const db = require("./config/database");
db.connect();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// calling
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Port: ${PORT}`);
});
