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







router.post("/get-doctor-info-by-user-id",getDoctorInfoById);

router.post("/get-doctor-info-by-id",getDoctorDetails);

router.patch("/update-doctor-profile",updateDoctorProfile);


router.get("/get-appointments-by-doctor-id",getAppointmentOfDoctor );

router.get("/getdoctorblog",getDoctorBlogs );
  
router.post("/change-appointment-status",changeAppointmentStatus);

 
router.post("/create",createBlogs); 
  
router.put("/editBlog/:blogId",editDoctorBlogs);

  
router.delete("/deleteBlog/:blogId",DeleteNote);





module.exports = router;