import React, { useEffect, useState } from 'react'
import Navbars from '../../Components/Navbars'
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useAsyncError, useNavigate } from "react-router-dom";
import axiosConfig from '../../axiosConfig';
import {HideLoading,showLoading} from '../../Redux/actions/generalActions'
import { storage_bucket } from '../../firebase';
import { uploadBytesResumable, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from 'react-hot-toast';

function UserProfile() {

  
    const [userDetails,setUserDetails]=useState([])
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pic, setPic] = useState();
    const [mobile, setMobile] = useState();
    const [picMessage, setPicMessage] = useState();
    const [image, setImage] = useState([]);
    const [ProfileImage, setProfileImage] = useState([]);
    const [displayData,setDisplayData]=useState(false)
    




    
    const dispatch = useDispatch();



    useEffect(()=>{
      
      
        getUserDetails()
       
    },[displayData])




    const handleImage = (e) => {
      const file = e.target.files[0];
  
      setFileToBaseone(file);
      console.log(file);
  
  
      let fileRef=ref(storage_bucket,"Pics/" + file.name);
  
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
              console.log("995",URL);
              if (URL) {
                console.log("in!!!!");

                setPic(URL);

                console.log("7777",pic)
               
              }
            });
          }
  
        })
    
    }


    const setFileToBaseone = (file) =>{
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () =>{
          setImage(reader.result);
      }
  
  }
  
  


    const getUserDetails = async () => {


      try {

        dispatch(showLoading());
        const response = await axiosConfig.get('/api/users/get-user-profile',{ 
  
          headers: {
            Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
          },   
          
      });


      

        dispatch(HideLoading());
        if (response.data.success) {
          setUserDetails(response.data.data);
          setName(userDetails[0]?.username)
          setEmail(userDetails[0]?.email)
          setPic(userDetails[0]?.ProfileImage)
          setDisplayData(true)

            console.log("24445",name,email,pic)
            
        }
      } catch (error) {
        dispatch(HideLoading());
      }
    };


    const handleSubmit=async(e)=>{

      e.preventDefault();
    

         setProfileImage(pic)

      console.log("34555",name,email,ProfileImage)

      const {data} = await axiosConfig.patch('/api/users/update-user-profile',  {name,email,pic,ProfileImage},{ 


  
        headers: {
          Authorization: `Bearer ${localStorage.getItem("doctorAppToken")}`,
        },
        
         
          
        
    });




if(data.success===true){

  toast.success('user profile updated successfully')
}
 
    }




  return (
    <div>

      {
        console.log("432",userDetails[0])
       
      }

        <Navbars/>

        <Row>


            <h1 className='text-center mt-5 text-primary'>Edit your Profile</h1>


        </Row>

<Row className="profileContainer" style={{marginTop:'100px'}}>

<Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

          
            <img className="img-fluid" src={image.length>0 ? image:pic} alt="" style={{width:'300px',height:'300px'}}/> 
          </Col>
          <Col md={6}>
            <Form onSubmit={handleSubmit} >
             
              
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                 
                ></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
              </Form.Group>
             
              
             


              <Form.Group controlId="pic">
              <Form.Label>Profile Picture</Form.Label>
           <div className="form-outline mb-4">
                <input onChange={handleImage}  type="file" id="formupload" name="ProfileImage" className="form-control"  />
                
            </div>


              </Form.Group>
              <Button type="submit" varient="primary">
                Update
              </Button>
            </Form>
          </Col>
          
        </Row>
      
    </div>
  )
}

export default UserProfile









