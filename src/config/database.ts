import mongoose from 'mongoose';
import db from './config';


// Build the connection string
const dbURI = db["dbURI"];
console.log(db, "DB connection")

// const dbURI = `mongodb://0.0.0.0:27017/test-emp1st`;
const options = {
  autoIndex: true,
  minPoolSize: db["minPoolSize"], // Maintain up to x socket connections
  maxPoolSize: db["maxPoolSize"], // Maintain up to x socket connections
  connectTimeoutMS: 60000, // Give up initial connection after 10 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};
const setRunValidators = function (this: any) {
  this.setOptions({ runValidators: true });
};

mongoose.set('strictQuery', true);

// Create the database connection
mongoose
  .plugin((schema: any) => {
    schema.pre('findOneAndUpdate', setRunValidators);
    schema.pre('updateMany', setRunValidators);
    schema.pre('updateOne', setRunValidators);
    schema.pre('update', setRunValidators);
  })
  .connect(dbURI, options)
  .then(() => {
    console.log("Database connected")

  })
  .catch((e) => {
    console.log("Database connection error", e)
  });




export const connection = mongoose.connection;





