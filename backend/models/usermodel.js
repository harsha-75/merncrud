const mongoose= require('mongoose')
const Schema= mongoose.Schema

const userSchema=new Schema({
      name :{type: String},
      email:{type: String},
      password:{type:String},
      date:{type:Date,default: new Date().getTime()},
})

module.exports= mongoose.model("user",userSchema);