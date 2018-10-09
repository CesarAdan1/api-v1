const ODM = require('mongoose');

const Schema = new ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    
    kind:{
        type: String,
        required: true,
    },
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
    },
    availability: {
        type: String,
        required: true
    }
})

module.exports = ODM.model('Data', Schema);


