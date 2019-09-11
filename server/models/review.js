const mongoose = require('mongoose');

const ReviewModelSchema = new mongoose.Schema ({
  creator_name  : String,
  content       : String,
  parent		    : String,
  stars         : Number,
});

// compile model from schema
module.exports = mongoose.model('ReviewModel', ReviewModelSchema);
