const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    storeName: {
        type: String,
        required: true
    }
});

// mongoose automatically looks for the plural lowercase of the model in the mongo db collection
module.exports = mongoose.model('Admin', adminSchema);