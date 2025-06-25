import mongoose, { mongo } from "mongoose";

const donationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  foodType: {
    type: String,
    enum: ["cooked", "uncooked", "packaged"],
  },
  quantity: {
    type: Number,
    required: true,
  },
  expiryDate: Date,
  photoUrl: String,
  location: {
    type: { type: String, default: "Point" },
    coordinates: [Number ], // [longitude, latitude]
  },
  status: {
    type: String,
    enum: ["Available", "Claimed", "Pending" , "Picked", "Expired"],
    default: "Available",
  },
  donor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  requestedBy : {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: { type: Date, default: Date.now },
});



  


const Donation = mongoose.model("Donation",donationSchema); 

export default Donation;