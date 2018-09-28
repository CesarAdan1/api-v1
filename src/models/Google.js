const mongoose= require('mongoose');

const Schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  imageplace:{
    data: Buffer, 
    contentType: String,
    required: true,
  },
  placelocation: {
    type: String,
    required: true,
   
  },
  nameplace: {
    type: String,
    required: true
  },
  map: {
    data: Buffer, 
    contentType: String,
    required: true,
  }
});

module.exports = mongoose.model('Google', Schema);

