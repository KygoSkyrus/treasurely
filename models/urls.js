const mongoose= require('mongoose');
        
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
});


//connecting with collection
module.exports = mongoose.model('URLS', urlSchema); 