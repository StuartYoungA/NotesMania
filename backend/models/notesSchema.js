const mongoose=require("mongoose")

const notesSchema=mongoose.Schema({
  Fuser:{
    type: mongoose.Schema.Types.ObjectId,        //its a foreign key which will take reference from user id ,so that user will only be able to do crud in his own notes only
    ref: 'user',   //tjis user is name of userschema collection
    // required: true
   },
    title:{
        type:String,
        required:true
    },
    description:{
      type: String, 
      required:true
      
    },
    tag:{
      type: String,
      default:"amaanType"
    },
    date:{
        type:Date,
        default:Date.now()
    }
})


module.exports=mongoose.model("note",notesSchema)
