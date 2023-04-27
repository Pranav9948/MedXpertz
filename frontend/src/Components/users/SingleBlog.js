


import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import axiosConfig from '../../axiosConfig';

function SingleBlog(props) {

    const { blogid } = useParams();

    const [singleBlog,setSingleBlog]=useState([])

    console.log("okkk",blogid)

  const blog = {
    id: 1,
    title: '5 Tips for a Healthier Lifestyle',
    image: 'https://www.rasmussen.edu/images/rasmussenlibraries/blogs/wellness-blogs-article-blog65dc3e79-1277-40fe-a68d-82e9e8b3f5dc.jpg',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation...'
  };



useEffect(()=>{

    readHealthBlogs()

},[])


const readHealthBlogs=async()=>{

    const {data}=await axiosConfig.get(`/api/users/getdetailedblog/${blogid}`)
    setSingleBlog(data.notez)
}


    console.log("4322",singleBlog)




  return (

   
    
      <Container className="my-5">
      <div className="text-center mb-4">
        <h1 className="display-4 mb-2">{singleBlog[0]?.title}</h1>
        <img src={singleBlog[0]?.pic} alt={singleBlog[0]?.title} className="img-fluid rounded shadow-lg" />
      </div>
      <div className="text-justify">
      <p className="lead" dangerouslySetInnerHTML={{ __html: singleBlog[0]?.content }}></p>

      </div>
      <div className="d-flex justify-content-between align-items-center my-4">
        <span className="text-muted">Posted on March 30, 2022</span>
        <Link to="/getallblogs" className="btn btn-outline-primary mt-3">
  <i className="bi bi-arrow-left"></i> Back to All Articles
</Link>
      </div>
    </Container>

  );
}

export default SingleBlog;
