import "../Style/home.css";

interface Props {
  name: string;
  price: number;
  imgsrc: string;
  category: string;
}

const Card = ({ name, price, imgsrc, category }: Props) => {
  const imgStyle = {
    width: "260px", // Set your desired width
    height: "260px", // Set your desired height
    objectFit: "cover", // Ensures the image fills the dimensions without distortion
    borderRadius: "23px", // Optional: Add rounded corners if desired
  };

  return (
    <div className="item">
      <img src={imgsrc} alt={name} style={imgStyle} />
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
