import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  role:{
    type:String,
    enum:[
        'donor','ngo'
    ]
  },
  Phone:Number,
  address:String,
  location:{
    type:{type:String , default:'Point'},
    coordinates:[Number]
  },
  createdAt : {
    type:Date,
    default:Date.now
  }
});

userSchema.index({location : '2dsphere'})

const User = mongoose.model("User", userSchema);

export default User;



