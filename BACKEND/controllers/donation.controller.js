import { createDonateFood, findAllDonations } from "../DAO/donation.dao.js";
import {
  requestDonationService,
  getDonationByUser,
  getAvailableDonationsService,
  claimeDonationService,
  getRequestService,
  acceptRequestService,
  getAllDonationService,
} from "../services/donation.services.js";

export const donateFood = async (req, res) => {
  let { title, quantity, expiryDate, photoUrl, location, status } = req.body;
  console.log(typeof location);
  let geoLocation = undefined;
  let lat = 0;
  let lng = 0;
  if (location && typeof location === "string") {
    const parts = location.split(",");
    if (parts.length === 2) {
      lat = parseFloat(parts[0].trim());
      lng = parseFloat(parts[1].trim());
    }

    if (!isNaN(lat) && !isNaN(lng)) {
      geoLocation = {
        type: "Point",
        coordinates: [lng, lat],
      };
    }
  }
  location = geoLocation;
  console.log(location);
  try {
    const donate_food = await createDonateFood(
      title,
      quantity,
      expiryDate,
      photoUrl,
      location,
      status,
      req.user
    );
    console.log("this is in dao ", donate_food);
    res.status(200).json({ message: "Food donated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const requestDonation = async (req, res) => {
  try {
    console.log("donation id", req.params.donationId);
    const donation = await requestDonationService(
      req.params.donationId,
      req.user
    );
    res
      .status(200)
      .json({ message: "Donation requested Successfuly ", donation });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getMyDonations = async (req, res) => {
  try {
    const donations = await getDonationByUser(req.user._id); // req.user._id is user id which is stored in cookie in browser. so we can use it to get all donations of that user.
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAvailableDonations = async (req, res) => {
  try {
    const donations = await getAvailableDonationsService();
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const  claimedDonations = async (req, res) => {
  try {
    console.log("this is user id", req.user._id);
    const donations = await claimeDonationService(req.user._id);
    res.status(200).json({ donations });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyRequests = async (req, res) => {
  try {
    const requests = await getRequestService(req.user._id);
    return res.status(200).json({ requests , user : req.user._id});
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const acceptRequest = async (req, res) => {
  try {
    const request = await acceptRequestService(req.params.id); // here we are sending the user id to the backend so that we can update the donation status to claimed.
    return res.status(200).json({ message: "Request accepted", request });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllDonations = async (req, res) => {
  try {
    const donations = await getAllDonationService();
    console.log("the donations is:" ,donations)
    return res.status(200).json( donations );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

// 500 says internal server error
