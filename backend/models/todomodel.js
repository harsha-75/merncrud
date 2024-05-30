const mongoose= require('mongoose')
const Schema= mongoose.Schema;

const todoSchema=  new Schema({
         content:{type: String,required: true},
         userId:{type:String,required:true},
         date:{type:Date,default:new Date().getTime()}
})

module.exports=mongoose.model("todo",todoSchema)