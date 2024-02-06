const router = require("express").Router()

const Booking = require("../models/Booking")
const User = require("../models/User")

/* CREATE BOOKING */
router.post("/create", async (req, res) => {
  try {
    const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body
    const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
    await newBooking.save()

    // Update the user's trip list
    await User.findByIdAndUpdate(
      customerId,
      { $push: { tripList: newBooking._id } }, // Push the new listing ID to the user's trip list array
      { new: true }
    );

    // Update the owner's reservation list
    await User.findByIdAndUpdate(
      hostId,
      { $push: {reservationList: newBooking._id } }, // Push the new listing ID to the user's trip list array
      { new: true }
    );
    res.status(200).json(newBooking)
  } catch (err) {
    // console.log(err)
    res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
  }
})

module.exports = router