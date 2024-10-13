require("dotenv").config()
const express=require('express');
const morgan=require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');


const app=express();
const PORT = process.env.PORT || 2345


app.use(cors());
app.use(bodyParser.json());
const error = require("./API/middlewares/error")
const USERS= require("./API/routes/users")
const menSingles= require("./API/routes/menSingles")
const menDoubles= require("./API/routes/menDoubles.js")
const womenDoubles= require("./API/routes/womenDoubles.js")
const womenSingles= require("./API/routes/womenSingles")



app.use(express.urlencoded({ extended: true}));
app.use(morgan('tiny'));
app.use(express.json({}))

BigInt.prototype.toJSON = function ()  {
    return this.toString()
}


app.get('/',(req, res)=>{
   
    res.send('API working',);
});





app.use(error)
app.use("/users", USERS)
app.use("/menSingles", menSingles)
app.use("/menDoubles", menDoubles)
app.use("/womenSingles", womenSingles)
app.use("/womenDoubles", womenDoubles)

app.listen(PORT, () => {
    console.log(`App is listening to ${PORT}`)
})