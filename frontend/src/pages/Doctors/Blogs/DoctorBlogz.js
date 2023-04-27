import React, { useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { storage_bucket } from '../../../firebase';
import { uploadBytesResumable, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import DoctorsLayout from '../DoctorsLayout';
import {createNoteAction} from '../../../Redux/actions/DoctorActions'
import { useDispatch } from 'react-redux';


function DoctorBlogz() {


    const [pic, setPic] = useState();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');

 const dispatch=useDispatch()

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

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


const handleSubmit = (e) => {
  e.preventDefault();
  console.log(`Blog Title: ${title}\nBlog Content: ${content}\nImage File: ${pic}`);
  
  // if (!title || !content || !pic) return;

dispatch(createNoteAction(title,content,pic));

  resetHandler();
  // Navigate("/mynotes");
};


const resetHandler = () => {
  setTitle("");
  setPic("");
  setContent("");
  setImage('')
};





  return (


    <DoctorsLayout>

<div className="container">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <h1 className="text-center mb-4">Create a New Blog Post</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="blogTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter blog title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>


            <Form.Group controlId="blogContent">
              <Form.Label>Content</Form.Label>
              <ReactQuill
                value={content}
                onChange={setContent}
                placeholder="Enter blog content"
              />
            </Form.Group>

            <Form.Group controlId="blogImage">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={handleImage}
              />
            </Form.Group>

            <Button type="submit" variant="primary">
              Create Note
            </Button>
            <Button className="mx-2" onClick={resetHandler} variant="danger">
              Reset Feilds
            </Button>
          </Form>
        </div>


        <div className='col-md-4'style={{marginTop:'100px'}} >
         <Col
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >

          
            <img className="img-fluid" src={image.length>0 ? image:pic} alt="" style={{width:'300px',height:'300px'}}/> 
          </Col>
        </div>
      </div>
    </div>

    </DoctorsLayout>

   
  )
}

export default DoctorBlogz
