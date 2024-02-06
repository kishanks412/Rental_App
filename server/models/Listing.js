const mongoose = require("mongoose")
const nodemailer = require("nodemailer");
const User = require("./User");


const ListingSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    category: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    aptSuite: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    province: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    guestCount: {
      type: Number,
      required: true,
    },
    bedroomCount: {
      type: Number,
      required: true,
    },
    bedCount: {
      type: Number,
      required: true,
    },
    bathroomCount: {
      type: Number,
      required: true,
    },
    amenities: {
      type: Array,
      default:[]
    },
    listingPhotoPaths: [{ type: String }], // Store photo URLs
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    highlight: {
      type: String,
      required: true
    },
    highlightDesc: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true}
)



ListingSchema.post('save', async function(doc){
  try{
    // the user who created the listing
    const user = await User.findById(doc.creator);
    // console.log("user",user)
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
          to: user.email,
          subject: "Your Listing on Room Rush",
          html: `<h2>Dear ${user.firstName + " " + user.lastName}</h2> 
                      <p>Congratulations! Your listing for ${doc.title} in ${doc.province} has been successfully created on Room Rush. </p> 
                      <p>Here are the details of your listing:</p>
                      <p>&nbsp;&nbsp; - Hotel Name: ${doc.title}</p>
                      <p>&nbsp;&nbsp; - Province: ${doc.province} </p>
                      <p>&nbsp;&nbsp; - Price Per Night: ₹ ${doc.price} </p>
                      <p>Your listing is now live and visible to potential guests on our platform. We wish you great success in attracting bookings! </p>
                      <p>If you have any questions or need further assistance, please don't hesitate to contact us. </p>
                      <p>Best Regards, </p>
                      <h3>Room Rush Team</h3>`,
      })
      // console.log("info",info)

  }catch(err){
      // console.log("error in mailer",err);
  }
})


const Listing = mongoose.model("Listing", ListingSchema )
module.exports = Listing