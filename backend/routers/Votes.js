const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
// const mongoose = require('mongoose')
const QuestionDB = require("../models/Question");

router.put("/like/:id", async (req,res)=>{
    try{
   const Question = await QuestionDB.findById(req.params.id);
   const {user} = req.body;
    // console.log(user.uid);
        //check if the Question already liked by this user
        if( Question.votes.filter((vote)=>vote?.user?.toString()==user.uid).length>0){
          return res.status(201).json({msg:'Already Upvote'});
        }
      Question.votes.unshift({user:user.uid});
        await Question.save();
          res.json('post likes');
    }
    catch(err){
      
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  })
  module.exports=router;