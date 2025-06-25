import express from "express";
import {
  requestDonation,
  donateFood,
  getMyDonations,
  getAvailableDonations,
  claimedDonations,
  getMyRequests,
  acceptRequest,
  getAllDonations
} from "../controllers/donation.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

// Donors
router.post("/donate", isAuthenticated, donateFood);
router.get("/mydonations", isAuthenticated, getMyDonations);
router.get("/all-donations" , getAllDonations)

// NGO
router.post("/request/:donationId", isAuthenticated, requestDonation);
router.get("/claimed-donations", isAuthenticated, claimedDonations);
// ALL
router.get("/available-donations", getAvailableDonations);
router.get("/myrequests", isAuthenticated, getMyRequests);
router.post("/accept/:id", isAuthenticated, acceptRequest);

export default router;
