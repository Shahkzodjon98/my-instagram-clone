import React from "react";
import { FakeUsers } from "../Constants/fakeData";

const StoriyCard = ({ image, username }) => {
  return (
    <div>
 
    
    </div>
  );
};

const Stories = () => {
  return (
    <main className=" md:mb-7 max-w-4xl mx-auto">
      <div className="">
        {FakeUsers.map((item, index) => (
          <StoriyCard
            key={index}
            username={item?.username}
            image={item?.photoURL}
          />
        ))}
      </div>
    </main>
  );
};

export default Stories;
