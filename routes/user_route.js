const express = require('express');
const User = require('../models/user_model');
const router = express.Router();

const{check, validationResult} = require('express-validator');

//for password encryption
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
router.post('/User/insert',[
    check('Username', 'Please fulfill the username!!').not().isEmpty(),
    check('Password', 'Password need to fulfilled!!').not().isEmpty(),
    check('Confirmpassword','Confirmpassword must be fulfilled!!').not().isEmpty()
 ], function(req, res){

    const validationErr = validationResult(req);

    if(validationErr.isEmpty()){

        const FirstName = req.body.FirstName;
        const LastName = req.body.LastName;
        const Username = req.body.Username;
        const Password = req.body.Password;
        const Confirmpassword = req.body.Confirmpassword;
    
        bcryptjs.hash(Password,  10,  function(My_err, hash_pw){
            res.send(hash_pw);

            const userdata = new User({FirstName: FirstName, LastName: LastName, Username: Username ,  Password : hash_pw, Confirmpassword: hash_pw, })
            userdata.save()
            .then(function(result){
                res.send(201).json({message : "User succesfully registered"})

            })
            .catch(function(err1){
                res.status(500).json({message : err1})
            })
        });

    }

    else{
        res.status(400).json(validationErr.array());

    }
   
})

//now for login

router.post('/User/login', function(req,res){
    const Username = req.body.Username;
    const Password = req.body.Password;


    User.findOne({username : Username})
    .then(function(userdata){
        if(userdata ===null){
            return res.status(403).json({messsge: "Invalid login Details!!"})

        }

        //valid user found

        bcryptjs.compare(Password, userdata. Password, function(err, result1){
            if(result1===false){
                return res.status(403).json({message : "Invalid login details!!"})

            }
            //username and password valid(milyo)
            

      
        })
    })
    .catch()

   
})

module.exports = router;

