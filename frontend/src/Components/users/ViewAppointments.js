import React from 'react'
import Container from 'react-bootstrap/esm/Container'
import Navbars from '../Navbars'
import '../../styles/componentStyles/user/viewAppointmentzz.css'
import  { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {HideLoading,showLoading  } from "../../Redux/actions/generalActions";
import { toast } from "react-hot-toast";
import { Table } from "antd";
import moment from "moment";
import axiosConfig from '../../axiosConfig';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { faTimes } from '@fortawesome/free-solid-svg-icons'


function ViewAppointments() {

    let  id  = useParams();
    console.log("okk456",id.userId)

    const {userInfo} =useSelector((state)=>state.userlogin)

    const handleCancelAppointment=async(recordid)=>{

         console.log("okkkadarsh",recordid)

         try {
       
          const response = await axiosConfig.delete('/api/users/cancelappointment', {
            data: { recordid },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
            },
          });
          


        if(response.data.message==="Appointment cancelled successfully"){

            toast.success('appointment cancelled successfully')
          getAppointmentsData()
        }



          dispatch(HideLoading());
          if (response.data.success) {
            setAppointments(response.data.data);
          }
        } catch (error) {
          dispatch(HideLoading());
        }
      };
  

    
    

    
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.get('/api/users/get-appointments-by-user-id',{ 

        headers: {
          Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
        },
    
        
          
        
    });
      dispatch(HideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(HideLoading());
    }
  };
  const columns = [
    
      {
        title: "SL",
        dataIndex: "_id",
        render: (text, record, index) => index + 1,
      },
    
    {
      title: "Doctor",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => (
        <span>
          {record.doctorInfo.phoneNumber} 
        </span>
      ),
    },


    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")} {moment(record.time).format("HH:mm")}
        </span>
      ),
    },



    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: (text, record) => (

     

         <span>
        {record.paymentStatus === 'done' ? (
          <span style={{ display: 'inline-block' }}>
            <FontAwesomeIcon icon={faCheck} style={{color:'green',marginLeft:'28px'}} className='fs-2' />
          </span>
        ):  <span style={{ display: 'inline-block' }}>
        <FontAwesomeIcon icon={ faTimes } style={{color:'red',marginLeft:'28px'}} className='fs-2' />
      </span>}
        </span>
 


      ),
    },





    {
      title: "cancel Appointment",
      dataIndex: "cancelAppointment",
      render: (text, record) => (
        
     
        <span style={{ display: "inline-block" }}>
        <button
          onClick={() => handleCancelAppointment(record._id)}
          
          disabled={record.paymentStatus === "done"}
          style={{
            background: record.paymentStatus === "done" ? "grey" : "yellow",
            border: "2px solid white",
            color: record.paymentStatus === "done" ? "white" : "black",
            borderRadius: "5px",
            padding: "5px 10px",
            cursor: record.paymentStatus === "done" ? "not-allowed" : "pointer",
            transition: "background-color 0.3s ease",
          }}
        >
          Cancel Appointment
        </button>
        
      </span>
 


      ),
    },


    {
        title: "Status",
        dataIndex: "status",
    }
  ];

  useEffect(() => {
    getAppointmentsData();
  }, []);



  return (


    <div>
     
      <Navbars/>

      
    <div className="bannerImagek"></div>
      <div className="bannerk">
        <div className="bannerContentk">
          <h1 className="text-center fw-bold fs-1 mt-5">View All Your Appointments</h1>





          <Container>


  <hr className='mt-5' />
  <div style={{ overflowX: 'auto' }}>
  <Table
    id="myTable"
    columns={columns}
    dataSource={appointments}
    style={{ background: 'white', fontSize: '14px', padding: '10px' }}
  />
</div>
               

          </Container>

          </div>

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
  )

  }


export default ViewAppointments

