const mongoose = require('mongoose');

const UserModelSchema = new mongoose.Schema ({
  name        	: String,
  googleid     	: String,
  last_post   	: String,
});

module.exports = mongoose.model('UserModel', UserModelSchema);
