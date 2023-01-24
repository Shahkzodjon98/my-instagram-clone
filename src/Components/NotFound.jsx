import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full h-full flex justify-center flex-col items-center">
      <div className="text-center">
        <b className="text-xl mb-5"style={{"color":"white"}}>Sorry, this page isn't available.</b>
        <p style={{"color":"white"}}>
          The link you followed may be broken, or the page may have been
          removed.
          <Link to="/" className="text-blue-700">  Go back to Instagram.          </Link>
          </p>
      </div>
    </div>    
  );
};
    


export default NotFound;
