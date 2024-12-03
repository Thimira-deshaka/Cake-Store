import React from 'react';
import "../Style/home.css";
import Profile from "../assets/user.png";

interface User {
  firstName: string;
  lastName: string;
  // email: string;
  // age: number;
  // phone: string;
  // gender: string;
}

const UserCard = ({firstName, lastName }: User) => {
  return (
    <div className="item">
      <img src={Profile} alt="" />
      <h4>{firstName} {lastName}</h4>
      {/* <p>Email: {email}</p>
      <p>Age: {age}</p> */}
      {/* <p>Phone: {phone}</p> */}
      {/* <p>Gender: {gender}</p> */}
    </div>
  );
};

export default UserCard;


