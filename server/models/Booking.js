const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const User = require("./User");
const Listing = require("./Listing");

const BookingSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    hostId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    listingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

BookingSchema.post("save", async function (doc) {
  try {
    // the user who booked the listing
    const bookingUser = await User.findById(doc.customerId);
    // console.log("booking", bookingUser);

    // the user who created the listing
    const hostUser = await User.findById(doc.hostId);
    // console.log("host", hostUser);

    // the listing which is booked
    const bookedListing = await Listing.findById(doc.listingId);
    // console.log("bookedListing", bookedListing);

    const totalDays = Math.ceil((new Date(doc.endDate) - new Date(doc.startDate)) / (1000 * 60 * 60 * 24));
    
    // transporter
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // This option bypasses certificate verification
      },
    });

    // send email
    // console.log("doc", doc);
    // console.log("transporter",transporter)

    // Send email to the user who booked the listing
    let userBookingInfo = await transporter.sendMail({
      from: "from Kishan",
      to: bookingUser.email,
      subject: "Your Booking Confirmation on Room Rush",
      html: `<h3>Dear ${bookingUser.firstName} ${bookingUser.lastName}</h3> 
                  <p>Congratulations! Your booking at <strong> ${bookedListing.title} </strong> has been successfully confirmed.</p> 
                  <p>Here are the details of your booking:</p>
                  <p>&nbsp;&nbsp; - Hotel: ${bookedListing.title}</p>
                  <p>&nbsp;&nbsp; - Address: ${bookedListing.streetAddress}, ${bookedListing.aptSuite}, ${bookedListing.city}, ${bookedListing.province}, ${bookedListing.country} </p>
                  <p>&nbsp;&nbsp; - Check-in Date: ${doc.startDate}</p>
                  <p>&nbsp;&nbsp; - Check-out Date: ${doc.endDate}</p>
                  <p>&nbsp;&nbsp; - Price Per Night: ₹${bookedListing.price}</p>
                  <p>&nbsp;&nbsp; - Total Number of Days: ${totalDays}</p>
                  <p>&nbsp;&nbsp; - Total Price: ₹${doc.totalPrice}</p>
                  <p>Your booking is confirmed, and you're all set for a wonderful stay. If you have any questions or need assistance, please don't hesitate to contact us.</p>
                  <p></p>
                  <hr>
                  <p>Best Regards, </p>
                  <h3>Room Rush Team</h3>`,
    });

    // Send email to the owner of the listing
    let ownerBookingInfo = await transporter.sendMail({
      from: "from Kishan",
      to: hostUser.email,
      subject: "New Booking on Room Rush",
      html: `<h3>Dear ${hostUser.firstName} ${hostUser.lastName}</h3> 
                  <p>A new booking has been made at your listing "${bookedListing.title}". Here are the details:</p>
                  <p>&nbsp;&nbsp; - User Name: <strong> ${bookingUser.firstName} ${bookingUser.lastName} </strong></p>
                  <p>&nbsp;&nbsp; - User Email: ${bookingUser.email}</p>
                  <p>&nbsp;&nbsp; - Hotel: ${bookedListing.title}</p>
                  <p>&nbsp;&nbsp; - Address: ${bookedListing.streetAddress}, ${bookedListing.aptSuite}, ${bookedListing.city}, ${bookedListing.province}, ${bookedListing.country} </p>
                  <p>&nbsp;&nbsp; - Check-in Date: ${doc.startDate}</p>
                  <p>&nbsp;&nbsp; - Check-out Date: ${doc.endDate}</p>
                  <p>&nbsp;&nbsp; - Price Per Night: ₹${bookedListing.price}</p>
                  <p>&nbsp;&nbsp; - Total Number of Days: ${totalDays}</p>
                  <p>&nbsp;&nbsp; - Total Price: ₹${doc.totalPrice}</p>
                  <p>Please make the necessary arrangements for the guest's stay.</p>
                  <p>Best Regards, </p>
                  <h3>Room Rush Team</h3>`,
    });

    // console.log("Booking email sent to user:", userBookingInfo);
    // console.log("Booking email sent to owner:", ownerBookingInfo);
  } catch (err) {
    // console.log("error in mailer", err);
  }
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
