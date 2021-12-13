const express = require("express");
const port = 2021;
const mongoose = require("mongoose");
const router = require("./Route/cuisineRoute")


//instantiating express
const app = express();

const url = "mongodb://localhost:27017/MyCuisine";
//middleware
app.use(express.json());

// connnecting to database
mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then( ()=> {
    console.log("Server connected to database successfully")
});

// endpoints

app.get("/", (req, res)=> {
    res.send(" My Cuisine API")
});

//router 
app.use("/api", router);
// server port

app.listen(process.env.PORT || port, ()=> {
    console.log(`Server listening on port ${port}`)
});