const express = require("express");
const mongoose = require("mongoose");
const { remove } = require("../models/Question");
const router = express.Router();
// const mongoose = require('mongoose')
const QuestionDB = require("../models/Question");

router.put("/like/:id", async (req, res) => {
  try {
    const Question = await QuestionDB.findById(req.params.id);
    const { user } = req.body;
     console.log(user.uid);
    //check if the Question already liked by this user
    if (
      Question.votes.filter((vote) => vote?.user?.toString() == user.uid)
        .length > 0
    ) {
      return res.status(201).json({ msg: "Already Upvote" });
    }
    if (
      Question.downVotes?.filter((vote) => vote?.user?.toString() == user.uid)
        .length > 0
    ) {
      const removeIndex = Question.downVotes
        .map((vote) => vote.user.toString())
        .indexOf(user.uid);
      Question.downVotes.splice(removeIndex, 1);
      await Question.save();
      return res.status(201).json({ msg: "DownVote Removed" });
    }
    Question.votes.unshift({ user: user.uid });
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
    const { user } = req.body;
    // console.log(user.uid);
    //check if the Question already liked by this user
    if (
      Question.downVotes.filter((vote) => vote?.user?.toString() == user.uid)
        .length > 0
    ) {
      return res.status(201).json({ msg: "Already DownVote" });
    }
    if (
      Question.votes.filter((vote) => vote?.user?.toString() == user.uid)
        .length > 0
    ) {
      const removeIndex = Question.votes
        .map((vote) => vote.user.toString())
        .indexOf(user.uid);
      Question.votes.splice(removeIndex, 1);
      await Question.save();
      return res.status(201).json({ msg: "up-vote Removed" });
    }
    Question.downVotes.unshift({ user: user.uid });
    await Question.save();
    res.json("post dislikes");
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
