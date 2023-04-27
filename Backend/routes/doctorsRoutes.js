const express = require("express");
const router = express.Router();


const {
 getDoctorInfoById,
 getDoctorDetails,
 updateDoctorProfile,
 getAppointmentOfDoctor,
 changeAppointmentStatus,
 createBlogs,
 getBlogs,
 applyDoctorAccountBasicDetails,
 getDoctorBlogs,
 editDoctorBlogs,
 DeleteNote

} = require("../controllers/doctorControllers");

const authmiddleware = require("../Middleware/authmiddleware");
const doctorAuthMiddleware = require("../Middleware/doctorAuthMiddleware");







router.post("/get-doctor-info-by-user-id",doctorAuthMiddleware,getDoctorInfoById);

router.post("/get-doctor-info-by-id",authmiddleware,getDoctorDetails);

router.patch("/update-doctor-profile",doctorAuthMiddleware,updateDoctorProfile);


router.get("/get-appointments-by-doctor-id",doctorAuthMiddleware,getAppointmentOfDoctor );

router.get("/getdoctorblog",doctorAuthMiddleware,getDoctorBlogs );
  
router.post("/change-appointment-status",doctorAuthMiddleware,changeAppointmentStatus);

 
router.post("/create",doctorAuthMiddleware,createBlogs); 
  
router.put("/editBlog/:blogId",doctorAuthMiddleware,editDoctorBlogs);

  
router.delete("/deleteBlog/:blogId",doctorAuthMiddleware,DeleteNote);





module.exports = router;