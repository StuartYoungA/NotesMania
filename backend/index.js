const express = require("express");        
const bodyParser = require("body-parser");
// const ejs = require("ejs");   
const app = express();  
// app.set('view engine', 'ejs');   
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static("public"));

var cors = require('cors')

 
app.use(cors())

const connectToMongo=require("./db")  //database is imported
connectToMongo()

const user=require("./models/userSchema")    //schemas are imported
const note=require("./models/notesSchema")

app.use(express.json())  //agar req,body ko use krna hia,, and data from postman or thunderclient


app.use('/api/auth',require('./routes/auth'))  //its a middleware, which is a pre define path and inside router we call the methods
app.use('/api/notes',require('./routes/notes'))





app.listen(4000,()=>{
    console.log("Server running on port 3000")
})