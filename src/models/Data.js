const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectedId,
    imagedish:{
        data: Buffer, 
        contentType: String,
        required: true,
    },
    typefood:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
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
    },   
    initdate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    enddate:{
        type: Date,
        default: Date.now,
        required: true,
    },
    inithour:{
        type: Date,
        default: Date.now,
        required: true,
    },
    endhour:{
        type: Date,
        default: Date.now,
        required: true,
    }
})

module.exports = mongoose.model('Data', Schema);