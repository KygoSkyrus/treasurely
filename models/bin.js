
const mongoose= require('mongoose');
        
const binSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
});


//connecting with collection
module.exports = mongoose.model('BIN', binSchema); 