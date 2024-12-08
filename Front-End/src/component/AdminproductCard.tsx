import "../Style/home.css";

interface Props {
  name: string;
  price: number;
  imgsrc: string;
  category: string;
}

const AdminproductCard = ({ name, price, imgsrc, category }: Props) => {
  return (
    <div className="item">
      <img src={imgsrc} alt="" />
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

export default AdminproductCard;
