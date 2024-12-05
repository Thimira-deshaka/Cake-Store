import React from "react";

interface Props {
  name: string;
  price: number;
  imgsrc: string;
  category: string;
}

const Card = ({ name, price, imgsrc, category }: Props) => {
  const imgStyle: React.CSSProperties = {
    width: "260px", // Set desired width
    height: "260px", // Set desired height
    objectFit: "cover" as React.CSSProperties["objectFit"], // Correct type assignment
    borderRadius: "10px", // Optional rounded corners
  };

  return (
    <div className="item">
      <img src={imgsrc} alt="" style={imgStyle} />
      <h4>{name}</h4>
      <p>{category}</p>
      <ul>
        <li>
          <i>Rs.{price}</i>
        </li>
      </ul>
    </div>
  );
};

export default Card;
