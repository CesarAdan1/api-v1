const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    date: {
        type: String
    },
})