const ODM= require('mongoose');


const Schema = new ODM.Schema({
  _id: ODM.Schema.Types.ObjectId,
  
  placelocation: {
    type: String,
    required: true,
   
  },
  nameplace: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: true
  }
  
});

module.exports = ODM.model('Google', Schema);

