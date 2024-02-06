const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGO_URL,{
        dbName: "Rental_App",
        
    })
    .then(()=> console.log("DB connected successfull"))
    .catch((err)=>{
        console.log("DB connection issues")
        console.error(err)
        process.exit(1)
    })
}