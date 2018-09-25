const ODM = require('mongoose');

const Schema = ODM.Schema({
    _id: ODM.Schema.Types.ObjectId,
    name: String
});

module.exports = ODM.model('Companies', Schema);

