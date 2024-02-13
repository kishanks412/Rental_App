const router = require("express").Router()
const { addListingToWishlist, getPropertyList, getReservationList, getTriplist } = require("../controller/user")

const Booking = require("../models/Booking")
const User = require("../models/User")
const Listing = require("../models/Listing")

/* GET TRIP LIST */
router.get("/:userId/trips", getTriplist)

/* ADD LISTING TO WISHLIST */
router.patch("/:userId/:listingId", addListingToWishlist)

/* GET PROPERTY LIST */
router.get("/:userId/properties", getPropertyList)

/* GET RESERVATION LIST */
router.get("/:userId/reservations", getReservationList)


module.exports = router
