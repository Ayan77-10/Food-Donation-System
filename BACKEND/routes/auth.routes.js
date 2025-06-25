import express from "express";
import { register ,login , logout_user} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/auth.middleware.js";
const router = express.Router();

// .POST requests
router.post("/register", register);
router.post("/login", login);

// GET REQUEST 
router.get("/logout_user" , logout_user)

router.get("/me", isAuthenticated, (req, res) => {
  res.json({user :req.user});
});
export default router;
