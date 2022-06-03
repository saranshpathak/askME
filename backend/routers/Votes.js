const express = require("express");
const mongoose = require("mongoose");
const { remove } = require("../models/Question");
const router = express.Router();
// const mongoose = require('mongoose')
const QuestionDB = require("../models/Question");

router.put("/like/:id", async (req, res) => {
  try {
    const Question = await QuestionDB.findById(req.params.id);
    console.log(req.body);
    //check if the Question already liked by this user
    if (
      Question.votes.filter((vote) => vote?.user?.toString() == req.body.uid)
        .length > 0
    ) {
      return res.status(201).json({ msg: "Already Upvote" });
    }
    if (
      Question.downVotes?.filter((vote) => vote?.user?.toString() == req.body.uid)
        .length > 0
    ) {
      const removeIndex = Question.downVotes
        .map((vote) => vote.user.toString())
        .indexOf(req.body.uid);
      Question.downVotes.splice(removeIndex, 1);
      await Question.save();
      return res.status(201).json({ msg: "DownVote Removed" });
    }
    Question.votes.unshift({ user: req.body.uid });
    await Question.save();
    res.json("post likes");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

router.put("/dislike/:id", async (req, res) => {
  try {
    const Question = await QuestionDB.findById(req.params.id);
    //check if the Question already liked by this user
    const{uid}=req.body;
    if (
      Question.downVotes.filter((vote) => vote?.user?.toString() == uid)
        .length > 0
    ) {
      return res.status(201).json({ msg: "Already DownVote" });
    }
    if (
      Question.votes.filter((vote) => vote?.user?.toString() == uid)
        .length > 0
    ) {
      const removeIndex = Question.votes
        .map((vote) => vote.user.toString())
        .indexOf(uid);
      Question.votes.splice(removeIndex, 1);
      await Question.save();
      return res.status(201).json({ msg: "up-vote Removed" });
    }
    Question.downVotes.unshift({ user: uid });
    await Question.save();
    res.json("post dislikes");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});


router.put("/views/:id", async (req, res) => {
  try {

    const { count } = req.body;
    console.log(count+"   count");
     const updateCount= await QuestionDB.findById(req.params.id);
      updateCount.views = Number(count)+1;
      updateCount.save();
      return res.status(201).json({ msg: "View Incremented Successfully" });

  } catch(err){
    console.log(err);
  }
   
});

module.exports = router;
