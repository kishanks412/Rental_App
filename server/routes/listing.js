const router = require("express").Router();
const cloudinary = require("cloudinary").v2;
const Listing = require("../models/Listing");
const User = require("../models/User");

// function to upload file on cloudinary
async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };

  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";

  return await cloudinary.uploader.upload(file.tempFilePath, options);
}


/* CREATE LISTING */
router.post("/create", async (req, res) => {
  try {
    /* Take the information from the form */
    const {
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    } = req.body;

    const listingPhotos = req.files.listingPhotos;

    

    const uploadPromises = listingPhotos.map(async (image) => {
      try {
        const response = await uploadFileToCloudinary(image, "room_rush/properties_pic");
        return {
          imageUrl: response.secure_url,
        };
      } catch (error) {
        // Handle upload error
        // console.error('Upload error:', error);
        return { imageUrl: null }; // Return a placeholder value or handle the error accordingly
      }
    });

    // console.log("pro", uploadPromises);

    const uploadedFiles = await Promise.all(uploadPromises);

    const listingPhotoPaths = uploadedFiles.map((file) => file.imageUrl);

    // console.log("listing", listingPhotoPaths);

    const newListing = new Listing({
      creator,
      category,
      type,
      streetAddress,
      aptSuite,
      city,
      province,
      country,
      guestCount,
      bedroomCount,
      bedCount,
      bathroomCount,
      amenities,
      listingPhotoPaths,
      title,
      description,
      highlight,
      highlightDesc,
      price,
    });

    await newListing.save();

    // Update the user's property list
    await User.findByIdAndUpdate(
      creator,
      { $push: { propertyList: newListing._id } }, // Push the new listing ID to the user's propertyList array
      { new: true }
    );

    res.status(200).json(newListing);
  } catch (err) {
    // console.log("err",err)
    res
      .status(409)
      .json({ message: "Fail to create Listing", error: err.message });
    // console.log(err)
  }
});

/* GET lISTINGS BY CATEGORY */
router.get("/", async (req, res) => {
  const qCategory = req.query.category;

  try {
    let listings;
    if (qCategory) {
      listings = await Listing.find({ category: qCategory }).populate(
        "creator"
      );
    } else {
      listings = await Listing.find().populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    // console.log(err)
  }
});

/* GET LISTINGS BY SEARCH */
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;

  try {
    let listings = [];

    if (search === "all") {
      listings = await Listing.find().populate("creator");
    } else {
      listings = await Listing.find({
        $or: [
          { category: { $regex: search, $options: "i" } },
          { title: { $regex: search, $options: "i" } },
        ],
      }).populate("creator");
    }

    res.status(200).json(listings);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Fail to fetch listings", error: err.message });
    // console.log(err)
  }
});

/* LISTING DETAILS */
router.get("/:listingId", async (req, res) => {
  try {
    const { listingId } = req.params;
    const listing = await Listing.findById(listingId).populate("creator");
    res.status(202).json(listing);
  } catch (err) {
    res
      .status(404)
      .json({ message: "Listing can not found!", error: err.message });
  }
});

module.exports = router;
