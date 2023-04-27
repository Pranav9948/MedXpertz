import React from "react";
import { FaQuoteRight } from "react-icons/fa";
import people from "./data";

const People = ({ id,URLS, firstName, lastName, clinicLocation, experience, index,specialization, personIndex }) => {
  let position = "nextSlide";
  if (personIndex === index) {
    position = "activeSlide";
  }
  if (
    personIndex === index - 1 ||
    (index === 0 && personIndex === people.length - 1)
  ) {
    position = "lastSlide";
  }
  return (
    <article className={position} key={id}>
      <img src={URLS} alt={"image"} className="person-img" />
      <h4>{firstName} {""} {lastName}</h4>
      <p className="title">{specialization}</p>
      <p>Responsible physican with {experience} yrs of experience maximizing patient  wellness </p>
     
      <FaQuoteRight className="icon" />
    </article>
  );
};

export default People;
