const express = require('express');
const bodyParser = require('body-parser');
const dbconfig = require('./config/dbConfig');
const mongoose = require('mongoose');
const Users = require('./models/userModel');
const serverConfig = require('./config/serverConfig');

const app = express();

mongoose.connect(dbconfig.MONGODB_URL).then(data => console.log('MONGO DB is connected')).catch(err => console.log(`Error while connecting to MONGO DB: ${err}`));
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/api/login', (req,res)=> {
    const reqBody = req.body;


    const foundUser = Users.findOne(reqBody, (err, data)=>{
        console.log(data);
        if(err){
            const errorMsg = `Error on register user: ${err}`;
           console.log(errorMsg);
           res.send(errorMsg);
           return;
        }

        if(data)
           res.send(data);
        else{
            
        }
        
        
    });
    
});

app.post('/api/register', async(req,res)=>{
    const reqBody = req.body;
    //console.log('reg user data:', reqBody);

    Users.findOne(reqBody, async (err, data)=>{
        console.log(data);
        if(err){
            const errorMsg = `Error on register user: ${err}`;
           console.log(errorMsg);
           res.send(errorMsg);
           return;
        }

        if(data)
           res.send(`user allready exist: ${data.username}`);
        else{
            
            const newUser = new Users(reqBody);
    const saveNewUser = await newUser.save();
    console.log(saveNewUser);

    res.send(saveNewUser || 'User not registered.');
        } 
    });
});

app.listen(serverConfig.port,err =>{
    if(err){
       console.log(err);
    }
    else{
    console.log(serverConfig.serverRunningMsg);
    };
});