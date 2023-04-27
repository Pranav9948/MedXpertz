const express = require("express");
const router = express.Router();
const authMiddleware=require('../Middleware/authmiddleware')

const {
  registration,
  loginDetails,
  getUserInfoById,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
  BookAppointmentz,
  searchDoctors,
  onlineBookAppointmentz,
  checkAvailiabilty,
  applyDoctorAccountBasicDetails,
  getUserProfile,
   getUserAppointments,
   updateUserProfile,
   getBlogs,
   getDetailedBlogs,
   cancelAppointment

  //  UploadDetailedDoctorData
} = require("../controllers/userControllers");

const authmiddleware = require("../Middleware/authmiddleware");

router.post("/register",registration)

router.post('/login',loginDetails)

router.post("/getUserInfoById",authmiddleware,getUserInfoById);





router.post("/apply-doctor-account",applyForDoctorAccount);

router.post("/mark-all-notifications-as-seen",authMiddleware,markAllAsSeen);
  
router.post("/delete-all-notifications", authMiddleware,deleteAllNotifications);

router.get("/getAllApprovedDoctors",authMiddleware,getApprovedDoctorsList)

router.post("/book-appointment",authMiddleware,BookAppointmentz)

router.post("/onlinebook-appointment",authMiddleware,onlineBookAppointmentz)

router.post("/check-booking-avilability",authMiddleware,checkAvailiabilty)

router.get("/get-appointments-by-user-id",authMiddleware,getUserAppointments); 

router.get("/get-user-profile",authMiddleware,getUserProfile);

router.patch("/update-user-profile",authMiddleware,updateUserProfile);

router.post("/search-doctors",authMiddleware,searchDoctors);

router.get("/getblogs",getBlogs);

router.get("/getdetailedblog/:blogId",getDetailedBlogs);

router.delete('/cancelappointment',authMiddleware,cancelAppointment)





module.exports = router;
