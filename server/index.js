const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const fileupload = require("express-fileupload")
require("dotenv").config();
const cors = require("cors");
const authRoutes = require("./routes/auth.js");
const listingRoutes = require("./routes/listing.js");
const bookingRoutes = require("./routes/booking.js");
const userRoutes = require("./routes/user.js");


app.use(fileupload({
useTempFiles : true,
  tempFileDir : '/tmp/'
}));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }))


/* ROUTES */
app.use("/auth", authRoutes);
app.use("/properties", listingRoutes);
app.use("/bookings", bookingRoutes);
app.use("/users", userRoutes);


/* MONGOOSE SETUP */
const db = require("./config/database");
db.connect();

const cloudinary = require("./config/cloudinary")
cloudinary.cloudinaryConnect();

app.get('/', (req, res) => {
  res.send('Hello, World!');
});
// calling
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server Port: ${PORT}`);
});
