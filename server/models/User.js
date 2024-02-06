const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profileImagePath: {
      type: String,
      default: "",
    },
    tripList: {
      type: Array,
      default: [],
    },
    wishList: {
      type: Array,
      default: [],
    },
    propertyList: {
      type: Array,
      default: [],
    },
    reservationList: {
      type: Array,
      default: [],
    }
  },
  { timestamps: true }
)

UserSchema.post('save', async function(doc){
  try{
      
      // transporter
      let transporter = nodemailer.createTransport({
          host: process.env.MAIL_HOST,
          secure: true,
          auth: {
              user : process.env.MAIL_USER,
              pass : process.env.MAIL_PASS,
          },
          tls: {
              rejectUnauthorized: false, // This option bypasses certificate verification
          }
      }) 
      
      // send email
      // console.log("doc",doc)
      // console.log("transporter",transporter)

      let info = await transporter.sendMail({
          from: "from Kishan",
          to: doc.email,
          subject: "Welcome to Room Rush!",
          html: `<h2>Dear ${doc.firstName + " " + doc.lastName}</h2> <p>Welcome to Room Rush – your one-stop destination for unique stays in breathtaking locations worldwide! </p> 
                      <p>Discover cozy rooms near temples, serene villas by the mountains, beachside escapes, and more. With Room Rush, your next adventure is just a click away.</p>
                      <p>Explore, book, and embark on unforgettable journeys with ease. </p>
                      <p>Get started now and unlock the world of extraordinary stays with Room Rush! <a href="      link       "> Click Here </a> </p>
                      <p>Happy travels! </p>
                      <p>Warm regards, </p>
                      <h3>Room Rush Team</h3>`,
      })
      console.log("info",info)

  }catch(err){
      // console.log("error in mailer",err);
  }
})

const User = mongoose.model("User", UserSchema)
module.exports = User