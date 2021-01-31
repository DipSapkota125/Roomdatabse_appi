const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User',{
     FirstName :{
         type : String
     },
     LastName : {
         type : String
     },
     Username : {
         type : String,
         required : true,
         unique : true
     },

     Password : {
         type : String,
         required : true
     },

     Confirmpassword: {
         type: String,
         required : true
     }


})

//we have to exports

module.exports = User