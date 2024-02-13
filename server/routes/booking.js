const router = require("express").Router()
const { propertyBooking } = require("../controller/booking")


/* CREATE BOOKING */
router.post("/create",propertyBooking )

module.exports = router