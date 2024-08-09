const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/loginsignup",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("mongodb connected");
})
.catch(()=>{
    console.log("failed to connected")
})

const loginschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken: String,
    resetTokenExpiration: Date
})


const collection=new mongoose.model("collection1",loginschema)


module.exports=collection