import {
  findDonationById,
  updateDonationAsPending,
  findDonationByDonor,
  findClaimedDonations,
  findRequestByNgo,
  findAvailableDonations,
  updateDonationAsClaimed,
  findAllDonations,
} from "../DAO/donation.dao.js";

export const requestDonationService = async (donationId, user) => {
  console.log("getting donation id ", donationId);
  console.log("getting user ", user);
  if (user.role != "ngo") {
    throw new Error("only NGOs can request");
  }

  const donation = await findDonationById(donationId);
  console.log("getting donation ", donation);
  if (!donation) {
    throw new Error("Donation not found");
  }

  if (donation.status !== "Available") {
    throw new Error("Donation already claimed or unavailable");
  }

  return await updateDonationAsPending(donation, user._id);
};

export const getDonationByUser = async (userId) => {
  return await findDonationByDonor(userId);
};

export const getAvailableDonationsService = async () => {
  return await findAvailableDonations();
};

export const claimeDonationService = async (userId) => {
  return await findClaimedDonations(userId);
};

export const getRequestService = async (userId) => {
  return await findRequestByNgo(userId);
};


export const acceptRequestService = async (requestId, userId) =>{ // here we are sending the user id to the backend so that we can update the donation status to claimed.
  console.log("accepting request ", userId);
  return await updateDonationAsClaimed(requestId)
}

export const getAllDonationService = async () =>{
  return await findAllDonations()
}