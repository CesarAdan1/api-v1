const ODM = require('mongoose');

const Schema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    food:{
        type: String,
        required: true,
    },
    lastprice:{
        type: Number,
        required: true,
    },
    actualprice:{
        type: Number,
        required: true,
    },
    saving:{
    type: Number,
    required: true,
    }   
   
})

module.exports = ODM.model('Data', Schema);


