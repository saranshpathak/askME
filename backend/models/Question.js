const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: String,
  body: String,
  votes:[{
    user:Object,
  }],
  downVotes:[{user:Object}],
  views:{type:Number,default:0},
  
  tags: [],
  created_at: {
    type: Date,
    default: Date.now(),
  },
  user: Object,
  comment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comments",
  },
});

module.exports = mongoose.model("Questions", questionSchema);
