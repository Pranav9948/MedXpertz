import { Button, Col, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { showLoading,HideLoading} from "../../Redux/actions/generalActions";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import axiosConfig from "../../axiosConfig";
import Layout from "../../Components/Layouts/Layout";
import { DatePicker, Checkbox } from "antd";
import dayjs from 'dayjs';
import Container from "react-bootstrap/esm/Container";
import { storage_bucket } from "../../firebase";
import { uploadBytesResumable, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DoctorsLayout from "./DoctorsLayout";
import 'dayjs/locale/es'; 

function Profile() {
  const userInfo = useSelector((state) => state.userlogin?.userInfo);
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const { RangePicker } = DatePicker;
  const [to, setTo] = useState();
  const [from, setFrom] = useState()
  const [totalHours, setTotalHours] = useState(0);
  const [image, setImage] = useState([]);
  const [cimage, setCimage] = useState([]);
  const [URLS, setURL] = useState();
  const [DoctorURLS,setDoctorURL] = useState();






  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.patch(
        "/api/doctors/update-doctor-profile",
        {
          ...values,
          userId: userInfo._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      toast.error("Something went wrong");
    }
  };

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/doctors/get-doctor-info-by-user-id",
        {
          userId: params.userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );

      dispatch(HideLoading());
      if (response.data.success) {
        setDoctor(response.data.data);
        console.log("23111okk",doctor)
      }
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);




  const handleFormSubmit = async(e) => {
    e.preventDefault();
  console.log("pro",e);
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
   
    values.from = from; 
    values.to = to;
   
     values.timings = [from, to];
      
     console.log("oz",values)


      try {
        dispatch(showLoading());

        
          console.log("o5uu5z",URLS)

        const response = await axiosConfig.patch(

          

          "/api/doctors/update-doctor-profile",
          {
            URLS,
            DoctorURLS,
            ...values,
            userId: userInfo?._id,
            
            
            
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
            },
          }
        );
        dispatch(HideLoading());
        if (response.data.success) {
          toast.success(response.data.message);
          navigate("/successapplyfordoctor");
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        dispatch(HideLoading());
        console.log("2111",error)
        toast.error("Something went wrong");
      }

  };
  
  

  function selectTimeSlots(values) {
    console.log(values);
    console.log(values[0].format(" HH:mm"));
    console.log(values[1].format("HH:mm"));
    setFrom(values[0].format(" HH:mm"));
    setTo(values[1].format(" HH:mm"));
    setTotalHours(values[1].diff(values[0], "hours"));
  }
  
  

const handleImage = (e) => {
    const file = e.target.files[0];

    setFileToBaseone(file);
    console.log(file);


    let fileRef=ref(storage_bucket,"ProfilePics/" + file.name);

    const uploadTask=uploadBytesResumable(fileRef,file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {

        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log('uploadProgress',progress);


        if (progress === 100) {
          console.log(file.name);
          //to get back the link....
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            console.log(URL);
            if (URL) {
              console.log("in!!!!");
              setURL(URL);
             
            }
          });
        }

      })
  
  };


  const setFileToBaseone = (file) =>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () =>{
        setImage(reader.result);
    }

}




  const handleCimage = (e) => {
    const filez = e.target.files[0];

    setFileToBasetwo(filez);
    console.log("54443",filez);


    let fileRef=ref(storage_bucket,"doctorCertificate/" + filez.name);

    const uploadTask=uploadBytesResumable(fileRef,filez);

    uploadTask.on(
      "state_changed",
      (snapshot) => {

        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        console.log('uploadProgress2',progress);


        if (progress === 100) {
          console.log(filez.name);
          //to get back the link....
          getDownloadURL(uploadTask.snapshot.ref).then((URL) => {
            console.log("kkkkkkk",URL);
            if (URL) {
              console.log("in!!!!");
              setDoctorURL(URL);
             
            }
          });
        }







      })
  };


 
  const setFileToBasetwo = (filez) =>{
    const readers = new FileReader();
    readers.readAsDataURL(filez);
    readers.onloadend = () =>{
        setCimage(readers.result);
    }

}

const [firstName, setFirstName] = useState('');
const [firstNameError, setFirstNameError] = useState('');



const [lastName, setLastName] = useState('');
const [lastNameError, setLastNameError] = useState('');


const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');

  const [specialization, setSpecialization] = useState('');
  const [specializationError, setSpecializationError] = useState('');

  const [experience, setExperience] = useState("");
  const [experienceError, setExperienceError] = useState("");


  const [website, setWebsite] = useState('');
  const [websiteError, setWebsiteError] = useState('');

  const [mobile, setMobile] = useState('');
  const [mobileError, setMobileError] = useState('');


  const [clinicLocation, setclinicLocation] = useState('');
  const [clinicLocationError, setClinicLocationError] = useState('');


  const [clinicName, setclinicName] = useState('');
  const [clinicNameError, setClinicNameError] = useState('');


  const [fee, setFee] = useState("");
  const [feeError, setFeeError] = useState("");



  function handleInputChangeW(event) {
    const value = event.target.value;
    setWebsite(value);
    setWebsiteError(validateWebsite(value));
  }



  function validateWebsite(website) {
    if (!website) {
      return "Website is required";
    }
    if (!/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(website)) {
      return "Please enter a valid website address starting with 'http://' or 'https://'";
    }
    return "";
  }




 



  const 
  handleInputChangeEE = (event) => {
    const value = event.target.value;
    if (value < 0) {
      setExperienceError("experience must be a positive number.");
      setExperience(0);
    } else {
      setExperienceError("");
      setExperience(value);
    }
  };





  const handleInputChangeF = (event) => {
    const value = event.target.value;
    if (value < 0) {
      setFeeError("Fee per consultation must be a positive number.");
      setFee(0);
    } else {
      setFeeError("");
      setFee(value);
    }
  };


function  validateFirstName(firstName) {
  if (!firstName) {
    return "First name is required";
  }
  if (!/^[A-Za-z]+$/.test(firstName)) {
    return "Please enter a valid first name";
  }
  return "";
}


function validateLastName(lastName) {
  if (!lastName) {
    return "last name is required";
  }
  if (!/^[A-Za-z]+$/.test(lastName)) {
    return "Please enter a valid last name";
  }
  return "";
}



function handleInputChange(event) {
  const value = event.target.value;
  setFirstName(value);
  setFirstNameError(validateFirstName(value));
}





function  handleInputChangePh(event) {
  const value = event.target.value;
  setMobile(value);
  setMobileError(validatePhoneNumber(value));
}


function handleInputChanges(event) {
  const value = event.target.value;
  setLastName(value);
  setLastNameError(validateLastName(value));
}



function handleInputChangess(event) {
  const value = event.target.value;
  setSpecialization(value);
  setSpecializationError(validateSpecialization(value));
}




const defaultImage = doctor?.URLS;
  const handleImageError = (event) => {
    event.target.src = defaultImage;
  };


  const defaultCertificate = doctor?.DoctorURLS
  ;
  const handleCertificateError = (event) => {
    event.target.src = defaultCertificate;
  };



function handleInputChangeCL(event) {
  const value = event.target.value;
  setclinicLocation(value);
  setClinicLocationError(validateClinicLocation(value));
}



function handleInputChangeCN(event) {
  const value = event.target.value;
  setclinicName(value);
  setClinicNameError(validateClinicName(value));
}




  function  validateSpecialization(specialization) {
    if (!specialization) {
      return "specialization is required";
    }
    if (!/^[A-Za-z]+$/.test(specialization)) {
      return "Please enter specialized field only";
    }
    return "";
  }



  function  validateClinicLocation(clinicLocation) {
    if (!clinicLocation) {
      return "clinicLocation is required";
    }
    if (!/^[A-Za-z]+$/.test(clinicLocation)) {
      return "Please enter clinicLocation field correctly";
    }
    return "";
  }


  function  validateClinicName(clinicName) {
    if (!clinicName) {
      return "clinicName is required";
    }
    if (!/^[A-Za-z]+$/.test(clinicName)) {
      return "Please enter clinic Name field correctly";
    }
    return "";
  }





  function  validatePhoneNumber(phoneNumber) {
    const isValidPhoneNumber = /^\d{10}$/.test(phoneNumber);
  
    if (!phoneNumber) {
      return "Phone number is required";
    } else if (!isValidPhoneNumber) {
      return "Please enter a valid 10-digit phone number";
    }
  
    return "";
  }



 


  function validateFirstName(firstName) {
    if (!firstName) {
      return "First name is required";
    }
    if (!/^[A-Za-z]+$/.test(firstName)) {
      return "Please enter a valid first name";
    }
    return "";
  }
























  return (
    

    <DoctorsLayout>

    <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
    <div className="grid-container">
    <div>

    <h1 className="card-title mt-3 mb-5">Personal Information</h1>
    
   


    <div>
    <label htmlFor="firstName" >First Name</label>
    <input 
      type="text" 
      id="firstName" 
      name="firstName" 
      required 
      placeholder="First Name" 
      pattern="[A-Za-z]+" 
      
      defaultValue={doctor?.firstName}  
      onChange={handleInputChange} 
    />
    <span className={firstNameError ? "error-message" : "hidden"} style={{color:'red'}}>{firstNameError}</span>
  </div>



  
    <div>
      <label>Last Name</label>


      <input 
      type="text" 
      id="lastName" 
      name="lastName" required placeholder="Last Name" 
      pattern="[A-Za-z]+" 
  
      defaultValue={doctor?.lastName} 
      onChange={handleInputChanges} 
    />
    <span className={lastNameError ? "error-message" : "hidden"} style={{color:'red'}}>{lastNameError}</span>
  </div>



  <div>
<label htmlFor="phoneNumber">Phone Number</label>
<input 
  type="tel"
  id="phoneNumber"
  name="phoneNumber"
  required
  placeholder="Phone Number"
  pattern="[0-9]{10}"

  defaultValue={doctor?.phoneNumber} 
  onChange={handleInputChangePh}
  style={{marginTop:'20px',marginBottom:'20px'}}
/>
<span className={phoneNumberError ? "error-message" : "hidden"} style={{color:'red'}} >{phoneNumberError}</span>
</div>


<div>
        <label>Address</label>
        <input type="text" name="address" required placeholder="Address" defaultValue={doctor?.address}  />
      </div>





    <div>
    <label htmlFor="website">Website</label>
    <input 
      type="url" 
      id="website" 
      name="website" 
      required 
      placeholder="https://example.com" 
  
      defaultValue={doctor?.website} 
      onChange={handleInputChangeW} 
    />
    <span className={websiteError ? "error-message" : "hidden"} style={{color:'red'}}>{websiteError}</span>
  </div>


    <hr />
    </div> 
    <div>
    <h1 className="card-title mt-3 mb-5">Professional Information</h1>
    <div>
      <label>Specialization</label>
      <input 
      type="text" name="specialization" required placeholder="Specialization"
      id="specialization"
      pattern="[A-Za-z]+" 
      defaultValue={doctor?.specialization}
      onChange={handleInputChangess} 
    />
    <span className={specializationError ? "error-message" : "hidden"} style={{color:'red'}}>{specializationError}</span>
    </div>
    <div>
      <label>Experience</label>
      <input
        type="number"
        name="experience"
        required
        placeholder="Experience"
        onChange={handleInputChangeEE}
        defaultValue={doctor?.experience} 
       
      />
{experienceError && <span style={{ color: "red" }}>{experienceError}</span>}
      
    </div>
    <div>
      <label>Fee Per Consultation</label>
      <input
        type="number"
        name="feePerCunsultation"
        defaultValue={doctor?.feePerCunsultation} 
        onChange={handleInputChangeF}
        required
        placeholder="Fee Per Consultation"
      />
      {feeError && <span style={{ color: "red" }}>{feeError}</span>}
    </div>


    
    <div>
      <label>clinic Name</label>
      <input 
      type="text" name="clinicName" required placeholder="clinic Name"
      id="clinicName"
      pattern="[A-Za-z]+" 
  
      defaultValue={doctor?.clinicName} 
      onChange={handleInputChangeCN} 
 
    />
    <span className={clinicNameError ? "error-message" : "hidden"} style={{color:'red'}}>{clinicNameError}</span>
    </div>



    <div>
      <label>clinic Location</label>
      <input 
      type="text" name="clinicLocation" required placeholder="clinicLocation"
      id="clinicLocation"
      pattern="[A-Za-z]+" 
      defaultValue={doctor?.clinicLocation} 
      onChange={handleInputChangeCL} 
 
    />
    <span className={clinicLocationError ? "error-message" : "hidden"} style={{color:'red'}}>{clinicLocationError}</span>
    </div>


  

<RangePicker
className="mx-4 mb-4 p-5 fw-bold"
picker="time"
format="HH:mm"
onChange={selectTimeSlots}



/>

<div className="form-outline mb-4">
              <input onChange={handleImage}  type="file" id="formupload" name="image" className="form-control"  />
              <label className="form-label" htmlFor="form4Example2">Image</label>
          </div>

          <img className="img-fluid" src={image} alt=""  onError={handleImageError} />


          <div className="form-outline mb-4">
              <input onChange={handleCimage}  type="file" id="cformupload" name="Cimage" className="form-control"  />
              <label className="form-label" htmlFor="form4Example2">DoctorCertificate</label>
          </div>

          <img className="img-fluid" src={cimage} alt="" onError={handleCertificateError} />

          </div>

    
    <div className="d-flex justify-content-center">
      <button type="submit" className="primary-button applyDocBtn fs-2 fw-bold text-white bg-success" style={{height:'75px',width:"300px"}}>
        SUBMIT
      </button>

    </div>
    </div>
  </form>



  </DoctorsLayout>

  );
}

export default Profile;