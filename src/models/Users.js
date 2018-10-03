const ODM = require('mongoose');

const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = ODM.model('Users', Schema);



