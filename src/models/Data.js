const ODM = require('mongoose');

const Schema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    food:{
        type: String,
        required: true,
    },
    lastprice:{
        type: String,
        required: true,
    },
    actualprice:{
        type: String,
        required: true,
    },
    saving:{
    type: String,
    required: true,
    }   
   
})

module.exports = ODM.model('Data', Schema);


