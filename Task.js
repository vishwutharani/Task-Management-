const mongoose = require("mongoose");


const taskSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },


    description:{
        type:String,
        required:true
    },


    priority:{
        type:String,
        enum:["High","Medium","Low"],
        default:"Medium"
    },


    status:{
        type:String,
        enum:[
            "Not Started",
            "Pending",
            "Completed"
        ],
        default:"Not Started"
    },


    assignedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },


    assignedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }

},
{
    timestamps:true
});


module.exports = mongoose.model("Task",taskSchema);