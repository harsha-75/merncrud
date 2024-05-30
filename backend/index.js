require('dotenv').config()
const config=require('./config.json')
const mongoose=require('mongoose')
mongoose.connect(config.connectionString, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  ssl: true,
  tlsAllowInvalidCertificates: true,
  tlsAllowInvalidHostnames: true     
})
const express=require('express')
const cors=require('cors')
const app=express()
const jwt= require('jsonwebtoken')
const {authenticationToken}=require("./utillities")
const User= require('./models/usermodel')
const Todo= require('./models/todomodel')
app.use(express.json())
app.use(cors({
     origin:"*",
}))
app.get("/",(req,res)=>{
     res.json({
         data:"hello"
     })
})

// create a new account

app.post("/create-account",async (req,res)=>{
      const {name,email,password}=req.body
      if(!name)
        {
             return res
             .status(400)
             .json({
                  error: true,
                  message:"name is required"
             })
        }
        if(!email)
          {
               return res
               .status(400)
               .json({
                    error:true,
                    message:"email is required"
               })
          }
          if(!password)
            {
                 return res
                 .status(400)
                 .json({
                      error:true,
                      message:"password is required"
                 })
            }
     const isuser= await User.findOne({email:email})
     if(isuser)
      {
           return res.json({
                error: true,
                message:"user already exsists"
           })
      }
      const user= new User({
             name,
             email,
             password
      })
      await user.save()
      const accessToken= jwt.sign({user},process.env.ACCESS_TOKEN_SECRET,{
         expiresIn:"36000m",
      })

      return res.json({
          error: false,
          user,
          accessToken,
          message: "Signed up successfully"
      })
})

app.post("/login",async (req,res)=>{
         const {email,password}=req.body;
         if(!email)
          {
               return res.status(400).json({
                   message : "email is required"
               })
          }
          if(!password){
                 return res.status(400).json({
                     message:"password is required"
                 })
          }

          const userInfo = await User.findOne({email: email})

          if(!userInfo){
                return res.status.json({
                      message :"user not found"
                })
          }
          if(userInfo.email===email && userInfo.password===password)
            {
                const user={user : userInfo}
                const accessToken=jwt.sign(user,process.env.ACCESS_TOKEN_SECRET,{
                      expiresIn:"36000m"
                })
                return res.json({
                     error: false,
                     message:"login successful",
                     email,
                     accessToken
                })
            }
            else{
                    return res.status(400).json({
                          error: true,
                          message:"invalid credentials"
                    })
            }

})
// addtodo
app.post("/todo",authenticationToken,async (req,res)=>{
        const {content}=req.body
        const {user}= req.user

        if(!content)
          {
              return res.status(400).json({
                  error: true,
                  message: "please add todo"
              })
          }
        try{
              const todo=new Todo({
                     content,
                     userId: user._id
              }) 
             await todo.save()
             return res.json({
                  error: false,
                  todo,
                  message:"todo added successfully"
             })
        } catch(err){
               return res.status(500).json({
                    error: true,
                    message:"internal server error"
               })
        }
})

//edit todo
app.put("/edit-todo/:todoId",authenticationToken,async (req,res)=>{
            const todoId= req.params.todoId
            const {content}=req.body
            const {user}= req.user
            if(!content)
              {
                  return res.status(400).json({
                       error : true,
                       message :"no changes provided"
                  })
              }
              try{
                     const todo= await Todo.findOne({_id: todoId,userId:user._id})
                     if(!todo){
                           return res.status(401).json({
                             error : true,
                             message:"todo not found"
                           })
                     }
                     if(content)
                      {
                          todo.content=content
                      }
                      await todo.save();
                      return res.json({
                           error: false,
                           todo,
                           message:"todo updated successfully"
                      })
              }
              catch(err){
                      return res.status(500).json({
                           error: true,
                           message:"internal server error"
                      })
              }
})
app.get("/getall",authenticationToken,async (req,res)=>{
      const {user}=req.user
      try {
             const todos=await Todo.find({userId: user._id})
             return res.json({
                 error: false,
                 todos,
                 message:"all notes recieved successfully"
             })
      } catch (error) {
            return res.status(500).json({
              error:"true",
              message:"internal server error"
            })
      }
})
app.delete("/delete/:todoId",authenticationToken,async (req,res)=>{
       const todoId= req.params.todoId
       const {user}=req.user
       try {
              const todo = Todo.findOne({_id: todoId,userId: user._id})
              if(!todo)
                {
                    return res.status(404).json({
                         error:true,
                         message:"Note not found"
                    })
                }
            await todo.deleteOne({_id: todoId,userId: user._id})
            return res.json({
                 error: true,
                 message:"Note deleted successfully"
            })
       } catch (error) {
        return res.status(500).json({
          error:"true",
          message:"internal server error"
        })
       }
})
app.get("/getuser",authenticationToken,async (req,res)=>{
     const {user}=req.user
     const isuser= await User.findOne({_id:user._id});
     if(!isuser)
      {
          res.sendStatus(401);
      }
      return res.json({
          user:isuser,
          message:""
      })
})
app.listen(8000,()=>{
    console.log("server is running...")
})

module.exports=app
