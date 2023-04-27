
import LayoutAdmin from './LayoutAdmin'
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { useDispatch } from "react-redux";
import { ViewAllApprovedDoctors} from "../../Redux/actions/UserAction";
import { useSelector } from "react-redux";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import { Card,Row, Button } from 'react-bootstrap';
import { fadeInUp } from 'react-animations';
import styled, { keyframes } from 'styled-components';

function AdminViewDoctors() {

  const [viewAllDoctors, setViewAllDoctors] = useState([]);

  const [showDetails, setShowDetails] = useState(false);

  const handleViewMore = () => {
    setShowDetails(!showDetails);
  };

  const Doctors = useSelector(
    (state) => state.viewAllDoctors?.Doctors
  );
  

  const getApprovedDoctors = Doctors?.getApprovedDoctors;

  console.log("45555",getApprovedDoctors)

  const dispatch = useDispatch();

  useEffect(() => {
    getAllApprovedDoctor();
  }, []);

  const getAllApprovedDoctor = () => {
    dispatch(ViewAllApprovedDoctors());
  };

  console.log("22444", getApprovedDoctors);
  




  return (


    <div>
  
        <LayoutAdmin>

        <Container>
      <Row>
        {

getApprovedDoctors?.map((doctor)=>{
    return (
      <Card className="m-3 shadow rounded" style={{ maxWidth: "300px", border:'4px solid black' }}>
      <div className="card-img-top">
        <Card.Img variant="top" src={doctor.URLS} alt={doctor.firstName} className='p-4' />
      </div>
      <Card.Body>
        <Card.Title className="text-center">
          {showDetails ?  ` DR ${doctor.firstName} ${doctor.lastName}` :  ` DR ${doctor.firstName} ${doctor.lastName}` }
        </Card.Title>
        <Card.Text className="text-center">
              <h6>{doctor.specialization}</h6>
            </Card.Text>
        {showDetails && (
          <>
           
            <hr />
            <Card.Text className="text-center">
              Fee: Rs. {doctor.feePerCunsultation}
            </Card.Text>
            <hr />
            <Card.Text className="text-center">
              Experience: {doctor.experience} years
            </Card.Text>
            <hr />
            <Card.Text className="text-center">
              Timings: {doctor.timings[0]} - {doctor.timings[1]}
            </Card.Text>

            <Card.Text className="text-center">
            <Link to={`/bookDoctorAppointment/${doctor._id}`}>
                <Button variant="primary" className="mt-4">Book Now</Button>
              </Link>
              </Card.Text>
          </>
        )}
        <div className="text-center">
          <Button variant="primary" className="mt-4" onClick={handleViewMore} style={{background:'green'}}>
            {showDetails ? "View Less" : "View More"}
          </Button>

        </div>

      


       
      </Card.Body>
    </Card>

  );

})



   
     
      
   

        
     
}
      </Row>
    </Container>



        </LayoutAdmin>
    




    </div>
  )
}
export default AdminViewDoctors