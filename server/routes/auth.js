const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2


const User = require("../models/User");

// function to upload file on cloudinary
async function uploadFileToCloudinary(file,folder,quality){
  const options = {folder};
  if(quality){
      options.quality = quality;
  }
  options.resource_type="auto"

  return await cloudinary.uploader.upload(file.tempFilePath,options);
}

/* USER REGISTER */
router.post("/register", async (req, res) => {
  try {
    // data fetch
    const { firstName, lastName, email, password } = req.body;
    const profileImage = req.files.profileImage;
    
    if (!profileImage) {
      return res.status(400).send("No file uploaded");
    }

    // profile image uploaded on cloudinary
    const response = await uploadFileToCloudinary(profileImage, "room_rush/user_pic");
    // console.log("response",response.secure_url)

    /* Check if user exists */
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(409).json({ message: "User already exists!" });
    }

    // Hash the password 
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(password, salt);

    /* Create a new User */
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      profileImagePath: response.secure_url,
    });

    /* Save the new User */
    await newUser.save();

    /* Send a successful message */
    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
});

/* USER LOGIN*/
router.post("/login", async (req, res) => {
  try {
    /* Take the infomation from the form */
    const { email, password } = req.body

    /* Check if user exists */
    const user = await User.findOne({ email });
    if (!user) {
     
      return res.status(409).json({ message: "Please enter the correct email" });
    }

    /* Compare the password with the hashed password */
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: "Please enter the correct password"})
    }

    /* Generate JWT token */
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
    delete user.password

    res.status(200).json({ token, user })

  } catch (err) {
    // console.log(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router