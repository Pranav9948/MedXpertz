import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Layout from "../../Components/Layouts/Layout";
import { showLoading,HideLoading } from "../../Redux/actions/generalActions";
import { toast } from "react-hot-toast";
import {  Table } from "antd";
import moment from "moment";
import axiosConfig from "../../axiosConfig";
import Button from 'react-bootstrap/Button';
import DoctorsLayout from "./DoctorsLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";

function ViewDoctorAppointment() {

  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();


  const getAppointmentsData = async () => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.get(
        "/api/doctors/get-appointments-by-doctor-id",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        setAppointments(response.data.data);
      }
    } catch (error) {
      dispatch(HideLoading());
    }
  };

  const changeAppointmentStatus = async (record, status) => {
    try {
      dispatch(showLoading());
      const response = await axiosConfig.post(
        "/api/doctors/change-appointment-status",
        { appointmentId : record._id, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },
        }
      );
      dispatch(HideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        getAppointmentsData();
      }
    } catch (error) {
      toast.error("Error changing doctor account status");
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
      title: "Patient",
      dataIndex: "name",
      render: (text, record) => <span>{record.userInfo.username}</span>,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      render: (text, record) => <span>{record.doctorInfo.phoneNumber}</span>,
    },

    {
      title: "Date & Time",
      dataIndex: "createdAt",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}{" "}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },

    ,
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
      title: "Appointment Status",
      dataIndex: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">

              <Button variant="success" className="me-4"
                    onClick={() => changeAppointmentStatus(record, "approved")}> Approve</Button>

                   

               <Button type="primary" variant="danger"  className=""
                       onClick={() => changeAppointmentStatus(record, "rejected")}> Reject</Button>

            
           
            </div>
          )}
        </div>
      ),
    },
  ];
  useEffect(() => {
    getAppointmentsData();
  }, []);
  return (
    <DoctorsLayout>

{
  console.log("3333",appointments)
}

      <h1 className="page-header text-center mt-4 mb-4 fs-3"> VIEW ALL APPOINTMENTS</h1>
      <hr />
      


  <Table id="mytable" columns={columns} dataSource={appointments}  style={{ backgroundColor: "white" }} />

    </DoctorsLayout>
  );
}

export default ViewDoctorAppointment;