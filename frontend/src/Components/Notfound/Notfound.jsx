import React from 'react'
import './notfound.css'
import { Link } from "react-router-dom";

const Notfound = () => {
  return (
    <div>
      <p className="zoom-area">
        <b>Oops</b> The page you are looking for is not found{" "}
      </p>
      <section className="error-container">
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
        <span className="zero">
          <span className="screen-reader-text">0</span>
        </span>
        <span className="four">
          <span className="screen-reader-text">4</span>
        </span>
      </section>
      <div className="link-container">
        <Link to="/" className="more-link">
          Visit the original article
        </Link>
      </div>
    </div>
  )
}

export default Notfound



// import React from "react";
// import '../../styles/UserStyles/notfound.css'

// const NotFound = () => {
//   return (
//     <div>
//       <p className="zoom-area">
//         <b>Oops</b> The page you are looking for is not found{" "}
//       </p>
//       <section className="error-container">
//         <span className="four">
//           <span className="screen-reader-text">4</span>
//         </span>
//         <span className="zero">
//           <span className="screen-reader-text">0</span>
//         </span>
//         <span className="four">
//           <span className="screen-reader-text">4</span>
//         </span>
//       </section>
//       <div className="link-container">
//         <Link to="/" className="more-link">
//           Visit the original article
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default NotFound;
