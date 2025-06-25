import Donation from "../models/donation.model.js";

export const createDonateFood = async (
  title,
  quantity,
  expiryDate,
  photoUrl,
  location,
  status,
  user
) => {
  const donate_food = new Donation({
    title,
    quantity,
    expiryDate,
    photoUrl,
    location,
    status,
    donor: user._id,
  });
  await donate_food.save();
  return donate_food;
};

export const findDonationById = async (donationId) => {
  return await Donation.findById(donationId);
};

export const updateDonationAsPending = async (donation, userId) => {
  // donation.claimedBy = userId
  donation.status = "Pending";
  donation.requestedBy = userId; // This is the NGO who is requesting the donation
  return await donation.save();
};

export const findDonationByDonor = async (id) => {
  return await Donation.find({ donor: id }).sort({ createdAt: -1 });
};

export const findAvailableDonations = async () => {
  return await Donation.find({ status: "Available" }).sort({ createdAt: -1 });
};

export const findClaimedDonations = async (userId) => {
  return await Donation.find({ claimedBy: userId }).sort({ createdAt: -1 });
};
export const findRequestByNgo = async (userId) => {
  return await Donation.find({ donor: userId, status: "Pending" }).sort({
    createdAt: -1,
  });
};

export const updateDonationAsClaimed = async (requestId) => {  // here we are sending the user id to the backend so that we can update the donation status to claimed.
  const donation = await Donation.findById(requestId);
  const requestedBy = donation.requestedBy;
  console.log("the requested by is: ", requestedBy);
  return await Donation.findByIdAndUpdate(requestId, { status: "Claimed", claimedBy :requestedBy});
};

export const findAllDonations = async () => {
  return await Donation.countDocuments()
};
