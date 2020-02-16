const mongoose = require('mongoose');

const prodcutSchema = mongoose.Schema({
    _id : mongoose.Types.ObjectId,
    name : {type : String, required : true},
    price : {type : Number, required : true},
    productImage : {type : String, required : true}
});

module.exports = mongoose.model('Product', prodcutSchema);