const mongoose  = require("mongoose");

const wishSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    title:{type:String, required:true},
    description:{type:String},
    link:{type:String},
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User', required:true}
})

module.exports = mongoose.model('Wish', wishSchema)