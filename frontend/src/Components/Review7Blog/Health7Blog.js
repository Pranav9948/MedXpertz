import React, { useState, useEffect } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import People from "./People";
// import data from "./data"
import "../../styles/componentStyles/userHome/healthBlog.css";
import { useDispatch,useSelector } from "react-redux";
import { ViewAllApprovedDoctors } from "../../Redux/actions/UserAction";









function Health7Blog() {
 
  const [index, setIndex] = useState(0);


  const Doctors = useSelector(
    (state) => state.viewAllDoctors?.Doctors
  );
  
  
  const getApprovedDoctors = Doctors?.getApprovedDoctors;
  const dispatch=useDispatch()
  
  console.log("45555",getApprovedDoctors)
  
  
  
  useEffect(() => {
    getAllApprovedDoctor();
  }, []);
  
  const getAllApprovedDoctor = () => {
    dispatch(ViewAllApprovedDoctors());
  };
  
  console.log("22444", getApprovedDoctors);

  useEffect(() => {
    const lastIndex = getApprovedDoctors?.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);

  return (
    <section className="section">
      <div className="title">
        <h2>Our Doctors</h2>
        <div className="underline"></div>
      </div>
      <div className="section-center">
        {getApprovedDoctors?.map((person, personIndex) => {
          return (
            <People
              key={person.id}
              {...person}
              personIndex={personIndex}
              index={index}
            />
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
          <FiChevronLeft />
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <FiChevronRight />
        </button>
      </div>
    </section>
  );
}

export default Health7Blog