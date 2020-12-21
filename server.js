const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
const routes = require("./routes/index");  // you can also write require("./routes"); because it is the index file already
const connectDatabase = require("./helpers/database/connectDatabase");


//env variables
dotenv.config({
  path: "./config/config.env"
});
const app = express();
const Port = process.env.PORT;


//mongoose.connect('mongodb://localhost:27017/AppDB', {
//  connectDatabase();
  
// middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// routes routing middleware
app.use("/",routes);  // directs to "./routes/index"

app.route("/").get((req, res) => res.send({"name": "John", "age": 31, "city": "New York"} ));

app.listen(Port, console.log(`Your app start on port number: ${Port} : ${process.env.NODE_ENV} `));
