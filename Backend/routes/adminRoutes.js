const express = require("express");
const router = express.Router();
const adminAuthMiddleware = require("../Middleware/adminAuthMiddleware");

const {
  showalluserz,
  getUserDetails,
  updateUserz,
  deleteUserz,
  blockUser,
  unblockUser,
  detailedDoctorVerify,
  adminViewAllDoctors,
  approveDoctorRequest,
  RejectDoctorAccount,
} = require("../controllers/adminControllers");

router.get("/showUserList",showalluserz)

router.get("/users/:userId", getUserDetails);

router.patch("/updateUser/:userId", updateUserz);

router.delete("/deleteUsers/:userId", deleteUserz);

router.patch("/block/:id",blockUser);

router.patch("/unblock/:id",unblockUser);

router.get("/viewAllDoctors",adminViewAllDoctors);

router.get("/detailedDoctorsVerifyPage/:doctorId",detailedDoctorVerify);

router.patch("/approveDoctorAccount/:doctorId",approveDoctorRequest);

router.delete("/RejectDoctorAccount/:doctorId",RejectDoctorAccount) 


















module.exports = router;
