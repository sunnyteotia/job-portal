// const mongoose = require("mongoose")


// const connectToDB=async()=>{
//     const connectionURL="mongodb+srv://sunnyteotia2005:KkOhB1x2YfN6ofrR@cluster0.h9cf6sl.mongodb.net/"

//     mongoose.connect(connectionURL).then(()=>console.log('job board database connection is successful'))
//     .catch(err=>console.log(err));
// }

// export default connectToDB;
import mongoose from "mongoose";

const connectToDB = async () => {
  try {
    const connectionURL =
      "mongodb+srv://sunnyteotia2005:yrOL0wpxFHS6oKuv@cluster0.ygdjo.mongodb.net/";

    await mongoose.connect(connectionURL); // Database name appended
    console.log("Database connection successful.");
  } catch (error) {
    console.error("Error connecting to database:", error);
    throw error;
  }
};

export default connectToDB;
