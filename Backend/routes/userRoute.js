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

router.post("/getUserInfoById",getUserInfoById);





router.post("/apply-doctor-account",applyForDoctorAccount);

router.post("/mark-all-notifications-as-seen",markAllAsSeen);
  
router.post("/delete-all-notifications",deleteAllNotifications);

router.get("/getAllApprovedDoctors",getApprovedDoctorsList)

router.post("/book-appointment",BookAppointmentz)

router.post("/onlinebook-appointment",onlineBookAppointmentz)

router.post("/check-booking-avilability",checkAvailiabilty)

router.get("/get-appointments-by-user-id",getUserAppointments); 

router.get("/get-user-profile",getUserProfile);

router.patch("/update-user-profile",updateUserProfile);

router.post("/search-doctors",searchDoctors);

router.get("/getblogs",getBlogs);

router.get("/getdetailedblog/:blogId",getDetailedBlogs);

router.delete('/cancelappointment',cancelAppointment)





module.exports = router;
