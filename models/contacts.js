const mongoose=require('mongoose');

const ContactSchema= mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
    },
    phone:{
        type:String,
        required:true
    }
}, {strict:true, timestamp:true});

module.exports=mongoose.model('Contact',ContactSchema);
