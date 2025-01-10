const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const UserSchema=new Schema({
    username:String,
    password:String,
    email:{
        type:String,
        required:true,
        unique:true,
    },
    googleId: String,

    
});
UserSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User',UserSchema);
module.exports = User;
