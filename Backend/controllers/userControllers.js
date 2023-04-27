const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");
const moment = require("moment");
const  Appointment=require('../models/appointmentModel')
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51MecxESI2ynGCKECnrnTsDQ4vLCqj0iRGNdPGaiEpLGmrIvQu3auw2zCaILdtFPAV4W3kMy8N1jGXOxTa0sRZAov00pp9x8Yrn")
const cloudinary=require('../utils/cloudinary')
const fast2sms = require('fast-two-sms')
const notes=require('../models/noteModel')

// const protect = require("../middleware/authMiddleware");
// const Doctors = require("../models/doctorModel");
// const Appointments = require("../models/appointmentModel");
;

const registration = async (req, res) => {
  try {


    console.log("entered...");
    const userExist = await Users.findOne({ email: req.body.email });

    if (userExist) {
      res.status(200).send({ message: "User Already Exist", success: false });
    } else {

      const { password } = req.body;
      const saltRounds = 10;
      const salt = bcrypt.genSaltSync(saltRounds);
      const hashPassword = await bcrypt.hashSync(password, salt);

      req.body.password = hashPassword;

      const newUser = await new Users(req.body);

      const createdUser = await newUser.save();

      if (createdUser) {
        res
          .status(200)
          .send({ message: "user created successfully...", success: true });
      } else {
        res
          .status(200)
          .send({ message: "user creation failed", success: false });
      }
    }
  } catch (err) {
    res
      .status(500)
      .send({ message: "something went wrong", success: false, err });
      console.log("kkk",err)
  }
};

const loginDetails=async(req,res)=>{

try {

    console.log("s reachedd...",req.body);

    const { email, password } = req.body;

    const User = await Users.findOne({ email: email });

    console.log("mm", User);

    if (!User) {
      res.status(200).send({ message: " incorrect email", success: false });
    } else {
      const isMatch = await bcrypt.compare(password, User.password);

      if (!isMatch) {
        res.status(200).send({ message: "password misMatch", success: false });
      } else if (User.isBlocked === true) {
        res.status(200).send({ message: "user Blocked...", success: false });
      } else {
        console.log("234", process.env.JWT_SECRET_KEY);

        const token = jwt.sign({ userId: User._id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2D",
        });

        res
          .status(200)
          .send({ message: "login successfull", success: true, token, User });
      }
    }
  } catch (err) {

    console.log("2222",err);

    res
      .status(500)
      .send({ message: "login failed", success: false,err});

 

}


}
  
  const getUserInfoById=async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.body.userId });
    user.password = undefined;
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error getting user info", success: false, error });
  }
}




const applyForDoctorAccount= async (req, res) => {

console.log("qwerty",req.body)
const { firstName,lastName, phoneNumber,website, address,city,state,zipCode,specialization,experience,feePerCunsultation,URLS,DoctorURLS,timings,userId,clinicName,clinicLocation}=req.body

  try {


  const newdoctor=await Doctor.create({

    firstName,
    lastName,
    phoneNumber,
    website,
    address,
    city,
    state,
    zipCode,
    specialization,
    experience,
    feePerCunsultation,
    timings,
    userId,
    clinicName,
    clinicLocation,
    URLS,DoctorURLS,
    status: "pending"

  })


        console.log("qqq0471",req.body)
     console.log("reached...man.");
     console.log("33211",req.body.userId);
 

    
     
console.log("1234",newdoctor)
      
      
console.log("1okk34",newdoctor._id)

    const adminUser = await Users.findOne({ isAdmin: true });

    const unseenNotifications = adminUser?.unseenNotifications;
    unseenNotifications?.push({
      type: "new-doctor-request",
      message: `${newdoctor.firstName} ${newdoctor.lastName} has applied for a doctor account`,
      data: {
        doctorId: newdoctor._id,
        name: newdoctor.firstName + " " + newdoctor.lastName,
      },
      onClickPath: "/admin/doctorslist",
    });
    await Users.findByIdAndUpdate(adminUser._id, { unseenNotifications });
    res.status(200).send({
      success: true,
      message: "Doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
}






const markAllAsSeen=async (req, res) => {
    try {

      console.log("22222reached");

      const user = await Users.findOne({ _id: req.body.userId });
      const unseenNotifications = user.unseenNotifications;
      const seenNotifications = user.seenNotifications;
      seenNotifications?.push(...unseenNotifications);
      user.unseenNotifications = [];
      user.seenNotifications = seenNotifications;
      const updatedUser = await user.save();
      updatedUser.password = undefined;
      res.status(200).send({
        success: true,
        message: "All notifications marked as seen",
        data: updatedUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error applying doctor account",
        success: false,
        error,
      });
    }
  }


const deleteAllNotifications = async (req, res) => {
  try {
    console.log("4444helloreached");
    const user = await Users.findOne({ _id: req.body.userId });
    user.seenNotifications = [];
    user.unseenNotifications = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "All notifications cleared",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error applying doctor account",
      success: false,
      error,
    });
  }
};



 const getApprovedDoctorsList=async (req, res) => {


  try {
          
    console.log('3113',req.body.userId);

    const getApprovedDoctors = await Doctor.find({ status: "Approved" });

    console.log("8777", getApprovedDoctors);

    res.status(200).send({
      message: "fetching doctor details successfull",
      success: true,
      getApprovedDoctors,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "cannot fetch approved doctors", success: false, err });
  }
};





 const BookAppointmentz= async (req, res) => {
  try {
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
    //pushing notification to doctor based on his userid
    const user = await Users.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.name}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};



const   onlineBookAppointmentz=async (req, res) => {
  try {

console.log("okkShefeeq",req.body.token)

    const customer =await stripe.customers.create({
      email:req.body.token.email,
      source:req.body.token.id
    })
    const payment =await stripe.paymentIntents.create({
      amount:req.body.doctorInfo.feePerCunsultation*100,
      currency:'usd',
      customer:customer.id,
      receipt_email:req.body.token.email
    },{
      idempotencyKey:uuidv4(),
    }
    )
    if(payment){

      

    req.body.paymentStatus="done"
    req.body.status = "pending";
    req.body.date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    req.body.time = moment(req.body.time, "HH:mm").toISOString();
    const newAppointment = new Appointment(req.body);
    await newAppointment.save();
  

    const user = await Users.findOne({ _id: req.body.doctorInfo.userId });
    user.unseenNotifications.push({
      type: "new-appointment-request",
      message: `A new appointment request has been made by ${req.body.userInfo.username}`,
      onClickPath: "/doctor/appointments",
    });
    await user.save();
    res.status(200).send({
      message: "Appointment booked successfully",
      success: true,
    }) };

  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};




 const  checkAvailiabilty=async (req, res) => {

  console.log("reached",req.body);
  try {
    const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
    const fromTime = moment(req.body.time, "HH:mm")
      .subtract(1, "hours")
      .toISOString();
    const toTime = moment(req.body.time, "HH:mm").add(1, "hours").toISOString();
    const doctorId = req.body.doctorId;
    const appointments = await Appointment.find({
      doctorId,
      date,
      time: { $gte: fromTime, $lte: toTime },
    });

console.log("777",appointments);

    if (appointments.length > 0) {
      return res.status(200).send({
        message: "Appointments not available",
        success: false,
      });
    } else {
      return res.status(200).send({
        message: "Appointments available",
        success: true,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error booking appointment",
      success: false,
      error,
    });
  }
};



 const getUserAppointments=async (req, res) => {

  console.log("122111", req.body.userId );

  

  try {
    const appointments = await Appointment.find({ userId:req.body.userId});
    res.status(200).send({
      message: "Appointments fetched successfully",
      success: true,
      data: appointments, 
    });

console.log("9999",appointments);


  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}



const getUserProfile=async (req, res) => {

  console.log("122111", req.body.userId );
  console.log("443",req.body)

  

  try {
    const userDetails = await Users.find({_id:req.body.userId});

    res.status(200).send({
      message: "user Details fetched successfully",
      success: true,
      data: userDetails, 
    });

console.log("9999",userDetails);


  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error fetching appointments",
      success: false,
      error,
    });
  }
}




 
const updateUserProfile=async (req, res) => {

  
  console.log("122111", req.body.userId );
  console.log("443",req.body)


  const id=req.body.userId
  const updateData=req.body


  try {

    Users.findByIdAndUpdate(id, updateData, { new: true })
  .then(updatedDoc => {
    console.log(updatedDoc);
  })
  .catch(error => {
    console.error(error);
  });

    res.status(200).send({
      message: "user updated successfully",
      success: true,
      
    });




  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating profile",
      success: false,
      error,
    });
  }
}



// const searchDoctors=async (req, res) => {

//   console.log("reach12ok");

//   const capitalizedDoctorName = req.body.query.charAt(0).toUpperCase() + req.body.query.slice(1);

//   console.log("234",capitalizedDoctorName )


//   Doctor.findOne({firstName:capitalizedDoctorName})
//  .then((docs)=>{
//      console.log("Result :",docs);
//      res.status(200).send({docs,success:true})
//  })
//  .catch((err)=>{
//      console.log(err);
//      res.status(500).send({err,success:false})
//  });


// }

const searchDoctors = async (req, res) => {
  console.log("reach12ok");

  const capitalizedDoctorName = req.body.query.charAt(0).toUpperCase() + req.body.query.slice(1);

  console.log("234", capitalizedDoctorName)

  try {
    const docs = await Doctor.findOne({ firstName: capitalizedDoctorName });
    console.log("Result :", docs);
    if (!docs) {
      res.status(200).send({ success: false, message: "Doctor not found" });
      return;
    }
    res.status(200).send({ docs, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err, success: false });
  }
};


    

const  getBlogs =  async(req, res) => {


 console.log("4322")

  try {

   const notez=await notes.find({})

   

    res.status(200).send({
      message: "user updated successfully",
      success: true,
      notez
      
    });




  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating profile",
      success: false,
      error,
    });
  }
}


const getDetailedBlogs=async(req, res) => {


  console.log("4322",req.params.blogId)
 
 
   try {
 
    const notez=await notes.find({_id:req.params.blogId})
 
   
 
     res.status(200).send({
       message: "blog fetched successfully",
       success: true,
       notez
       
     });
 
 
 
 
   } catch (error) {
     console.log(error);
     res.status(500).send({
       message: "Error updating profile",
       success: false,
       error,
     });
   }
 }


 const cancelAppointment = async (req, res) => {

  console.log("678")
  try {
    console.log("backendreached")
    const appointment = await Appointment.findById(req.body.recordid);
    if (!appointment) {
      return res.status(404).send({
        message: "Appointment not found",
        success: false,
      });
    }
    if (appointment.paymentStatus === "done") {
      return res.status(400).send({
        message: "Cannot cancel appointment. Payment already done.",
        success: false,
      });
    }
    await Appointment.deleteOne({ _id: appointment._id });
    res.status(200).send({
      message: "Appointment cancelled successfully",
      success: true, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error cancelling appointment",
      success: false,
      error,
    });
  }
};








module.exports = {
  registration,
  loginDetails,
  getUserInfoById,
  applyForDoctorAccount,
  markAllAsSeen,
  deleteAllNotifications,
  getApprovedDoctorsList,
  BookAppointmentz,
  onlineBookAppointmentz,
  checkAvailiabilty,
  getUserAppointments,
  getUserProfile,
  updateUserProfile,
  searchDoctors,
  getBlogs,
  getDetailedBlogs,
  cancelAppointment
   
};










