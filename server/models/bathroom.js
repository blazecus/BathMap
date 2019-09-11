const mongoose = require('mongoose');

const BathroomModelSchema = new mongoose.Schema ({
  name      : String,
  stars			: Number,
  building  : String,
});

module.exports = mongoose.model('BathroomModel', BathroomModelSchema);