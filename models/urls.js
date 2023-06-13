const mongoose= require('mongoose');
        
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true
    },
    isTrashed: {
        type: Boolean,
        default: false,
    },
});


//connecting with collection
module.exports = mongoose.model('URLS', urlSchema); 