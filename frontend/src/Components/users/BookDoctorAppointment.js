import { Button, Col, DatePicker, Form, Input, Row, TimePicker } from "antd";
import React, { useEffect, useState } from "react";
import axiosConfig from "../../axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, showLoading } from "../../Redux/actions/generalActions";
import { toast } from "react-hot-toast";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Navbars from "../Navbars";
import "../../styles/componentStyles/user/bookDoctorAppointmentS.css";
import Container from "react-bootstrap/esm/Container";
import StripeCheckout from "react-stripe-checkout";

function BookDoctorAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const userInfo = useSelector((state) => state.userlogin?.userInfo);
  const [doctor, setDoctor] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();





  const  startHours = doctor?.timings[0].split(":");

  const  endHours = doctor?.timings[1].split(":");


  const  startHour = startHours && parseInt(startHours[0].trim())
  const  endHour = endHours && parseInt(endHours[0].trim())+1


console.log("then",startHour)




  // console.log("okk768",startHour)

  const getDoctorData = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/doctors/get-doctor-info-by-id",
        {
          doctorId: params.doctorId,
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
      }
    } catch (error) {
      console.log(error);
      dispatch(HideLoading());
    }
  };
  const checkAvailability = async () => {
    try {
      console.log("444", date, time);

      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/users/check-booking-avilability",
        {
          doctorId: params.doctorId,
          date: date,
          time: time,
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
        setIsAvailable(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(HideLoading());
    }
  };
  const bookNow = async () => {
    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/users/book-appointment",
        {
          doctorId: params.doctorId,
          userId: userInfo._id,
          doctorInfo: doctor,
          userInfo: userInfo,
          date: date,
          time: time,
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
        navigate("/view-appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(HideLoading());
    }
  };


  function validateTime(currentTime) {
    const availableTimes = ["10:00", "11:00", "12:00", "13:00", "14:00"];
    const currentHour = currentTime.getHours();
    const filteredTimes = availableTimes.filter((time) => {
      const availableHour = parseInt(time.split(":")[0], 10);
      return availableHour >= currentHour;
    });
    return filteredTimes.map((time) => {
      const [hours, minutes] = time.split(":");
      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);
      return date;
    });
  }


  function disabledDate(current) {
    // can't select days before today
    return current && current < new Date(Date.now() - 86400000); // 86400000 is the number of milliseconds in a day
  }






  const onlinebookNow = async (token) => {
    console.log("444shefeeq", token);

    setIsAvailable(false);
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/users/onlinebook-appointment",
        {
          token,
          doctorId: params.doctorId,
          userId: userInfo._id,
          doctorInfo: doctor,
          userInfo: userInfo,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );

      dispatch(HideLoading());
      console.log("ith token", token);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/view-appointments");
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(HideLoading());
    }
  };

  useEffect(() => {
    getDoctorData();
  }, []);
  return (
    <>
      <Navbars />

      <div className="bannerImagezz"></div>
      <div className="bannerzz">
        <div className="bannerContentz">
          <h1
            className="text-center fw-bold fs-1 "
            style={{ marginTop: "100px", marginBottom: "100px",color: "white" }}
          >
            Book Appointment Now
          </h1>

          <Container>
            <div>
              <hr style={{ marginTop: "100px", marginBottom: "100px" }} />
              <Row gutter={50} className="mt-5" align="middle">
                <Col span={8} sm={24} xs={24} lg={8}>
                  <img
                    src={doctor?.URLS}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
                    }}
                  ></img>

                  <h1 className="page-title text-white mt-4 text-center">
                    Dr: {doctor?.firstName} {doctor?.lastName}
                  </h1>
                </Col>

                <Col lg={4}></Col>

                <Col span={8} sm={24} xs={24} lg={10}>
                  <div className="doctor-info">
                    <h1>
                      <b>Timings :</b> {doctor?.timings[0]} -{" "}
                      {doctor?.timings[1]}
                    </h1>
                    <p>
                      <b>Phone Number : </b>
                      {doctor?.phoneNumber}
                    </p>
                    <p>
                      <b>Clinic Name : </b>
                      {doctor?.clinicName} 
                    </p>

                    <p>
                      <b>Clinic Location : </b>
                       {doctor?.clinicLocation}
                    </p>

                    <p>
                      <b>Fee per Visit : </b>
                      {doctor?.feePerCunsultation}
                    </p>
                    <p>
                      <b>Website : </b>
                      {doctor?.website}
                    </p>
                  </div>

                  <div className="d-flex flex-column pt-2 mt-2">
                    {/* <DatePicker
                      format="DD-MM-YYYY"
                      disabledDate={disabledDate}
                      onChange={(value) => {
                        setDate(moment(value).format("DD-MM-YYYY"));
                        setIsAvailable(false);
                      }}
                    /> */}



<DatePicker
  format="DD-MM-YYYY"
  disabledDate={disabledDate}
  onChange={(value) => {
    const date = new Date(value);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    setDate(`${day}-${month}-${year}`);
    setIsAvailable(false);
  }}
/>
                   

                 {/* <TimePicker
                   format="HH:mm"
                   className="mt-3"
                   onChange={(value) => {
                     console.log("333", value.format("HH:mm"));
                     setIsAvailable(false);
                     setTime(value.format("HH:mm"));
                   }}
                
                 /> */}

                 


{ console.log("okk",startHour) }
                 
<TimePicker
  format="HH:mm"
  className="mt-3"
  onChange={(value) => {
    console.log("333", value.format("HH:mm"));
    setIsAvailable(false);
    setTime(value.format("HH:mm"));
  }}
  disabledHours={() => {
    const hours = [];
    for (let i = 0; i <  startHour; i++) {
      hours.push(i);
    }
    for (let i =  endHour; i < 24; i++) {
      hours.push(i);
    }
    return hours;
  }}
  disabledMinutes={(selectedHour) => {
    const minutes = [];
    if (selectedHour === 9) {
      for (let i = 0; i < 60; i++) {
        if (i < 0 || i > 30) {
          minutes.push(i);
        }
      }
    } else if (selectedHour === 17) {
      for (let i = 0; i < 60; i++) {
        if (i > 0 && i < 30) {
          minutes.push(i);
        }
      }
    } else {
      for (let i = 0; i < 60; i++) {
        minutes.push(i);
      }
    }
    return minutes;
  }}
/>




                    {!isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button"
                        onClick={checkAvailability}
                        style={{height:'50px'}}
                      >
                        Check Availability
                      </Button>
                    )}

                    {isAvailable && (
                      <Button
                        className="primary-button mt-3 full-width-button pb-3"
                        onClick={bookNow}
                        style={{height:'50px'}}
                      >
                        Book Now and Pay on visit
                      </Button>
                    )}

                    {isAvailable && (
                      <Button className="primary-button mt-3 full-width-button"   style={{height:'50px'}}>
                        <StripeCheckout
                          shippingAddress
                          token={onlinebookNow}
                          amount={doctor?.feePerCunsultation * 100}
                          stripeKey="pk_test_51MecxESI2ynGCKECkwE6v1yAnK7Kpg47SvO2KIkNoslBDn09QKUMnMC3i8wASJH8Ob0Rb1di1ejeym0o2QTEcvpM00aLc6BcaX"
                        >
                         Pay Now
                        </StripeCheckout>
                      </Button>
                    )}
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </div>

        <div>


        </div>

        <div>
        <svg
          className="waves"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="#ffff"
            fill-opacity="1"
            d="M0,224L48,218.7C96,213,192,203,288,181.3C384,160,480,128,576,149.3C672,171,768,245,864,272C960,299,1056,277,1152,229.3C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
        </div>


      </div>
    </>
  );
}

export default BookDoctorAppointment;
