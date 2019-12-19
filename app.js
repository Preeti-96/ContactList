//Importing modules
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

const route = require('./routes/route');

//connect to database
mongoose.connect("mongodb://localhost:27017/admin",{user:"root", pass:"root", useNewUrlParser:true},(err)=>{
    if(err){
        console.log('Error in connection : '+err);
    }
    else{
        console.log('connected to database mongodb at @27017');
    }
});


/*mongoose.connect('mongodb://localhost:27017/contactlist', {useNewUrlParser: true});

//on connection
mongoose.connection.on('connected',()=>{
   console.log('Connected to database mongodb @27017');
});

mongoose.connection.on('error',(err)=>{
    if(err){
        console.log('Error in connection '+ err);
    }
});*/

const port = 3000;

//adding middleware-cors
app.use(cors());

//adding body-parser
app.use(bodyparser.json());

//adding static files
app.use(express.static(path.join(__dirname, 'public')));

//adding routes
app.use('/api', route);

//testing server
app.get('/', (req, res) => {
    res.send('foobar');
});

app.listen(port, () => {
    console.log('server started at port:' + port);
});
