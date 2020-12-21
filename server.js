const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");
// const userRoute = require("./routes/user");
const routes = require("./routes/index");  // you can also write require("./routes"); because it is the index file already




//env variables
dotenv.config({
  path: "./config/config.env"
});
const app = express();
const Port = process.env.PORT;

//mongoose.connect('mongodb://localhost:27017/AppDB', {
mongoose.connect('mongodb+srv://hayati:tehlike@hayatitehlike.osyob.mongodb.net/AppDB?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to database.'))
  .catch(() => {
    console.log('Cannot connect to database. Exiting.');
    process.exit()
  }
)
// middleware
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// routes routing middleware
app.use("/",routes);  // directs to "./routes/index"

app.route("/").get((req, res) => res.send({"name": "John", "age": 31, "city": "New York"} ));

app.listen(5000, console.log(`Your app start on port number: ${Port} : ${process.env.NODE_ENV} `));
