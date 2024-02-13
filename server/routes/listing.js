const router = require("express").Router();
const { createListing, listingByCategory, listingBySearch, listingDetails } = require("../controller/listing");

/* CREATE LISTING */
router.post("/create", createListing);

/* GET lISTINGS BY CATEGORY */
router.get("/", listingByCategory);

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", listingBySearch);

/* LISTING DETAILS */
router.get("/:listingId", listingDetails);

module.exports = router;
