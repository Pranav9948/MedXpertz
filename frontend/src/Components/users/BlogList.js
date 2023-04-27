
import { useEffect, useState } from "react";
import axios from "axios";
import axiosConfig from "../../axiosConfig";
import { Link } from "react-router-dom";

function BlogList() {
  const [blogs, setBlogs] = useState([]);

  

    

useEffect(()=>{

    getBlogDetails()
  
  },[])
  
  
  const  getBlogDetails=async()=>{
  
  const {data}=await axiosConfig.get('/api/users/getBlogs')
  
  setBlogs(data.notez)
  
  console.log('ok321',blogs)
  
  
  }
  

  return (
    <div className="container">
      <h1 className="text-center my-4">Health Blogs</h1>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-md-6 my-3 text-center" key={blog._id}>
          <div className="blog" style={{ height: '600px', width: '100%', border: '1px solid #ddd', borderRadius: '10px', overflow: 'hidden' }}>
            <img src={blog.pic} alt={blog.title} className="img-fluid" style={{ height: '60%', width: '100%', objectFit: 'cover' }} />
            <div className="p-3">
              <h2 style={{ fontSize: '1.5rem' }}>{blog.title}</h2>

               <Link to={`/detailedblog/${blog._id}`} className="btn btn-primary mt-5">
                Read More
              </Link>

    
            </div>
          </div>
        </div>
        
        ))}
      </div>

      <div className="d-flex justify-content-between align-items-center my-4">
       
        <Link to="/" className="btn btn-outline-primary mt-3">
  <i className="bi bi-arrow-left"></i> Back to Home
</Link>
      </div>
    </div>
  );
}

export default BlogList;
