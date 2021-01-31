const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

////databse import from databse folder
const db = require('./database/db');

const user_route = require('./routes/user_route');




const app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.json()); //for postman sending code

app.use(user_route);




app.listen(port, () =>{
    console.log("Server is running ");
})