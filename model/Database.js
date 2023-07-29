// connect your application to mongodb server

const mongoose = require("mongoose"); //npm i mongoose
const url = "mongodb://localhost:27017/products";

mongoose.connect(url); //create default connection

// to access default connection
const connect = mongoose.connection;

// to listen the events of the connection
connect.on("connected", () => {
  console.log("Connected to DataBase");
});

connect.on("disconnected", () => {
  console.log("Disconnected from DataBase");
});

connect.on("error", () => {
  console.log("Could not connected to DataBase", err);
});
