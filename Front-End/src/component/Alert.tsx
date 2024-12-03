interface Props {
  title: string;
  message: string;
  isSuccess: boolean;
}

const Alert = ({ title, message, isSuccess }: Props) => {
  const alertStyle = {
    backgroundColor: isSuccess ? "#2bb84d" : "#ee2033", 
    color: isSuccess ? "#155724" : "#721c24", 
    border: `1px solid ${isSuccess ? "#c3e6cb" : "#f5c6cb"}`, 
    padding: "1rem",
    borderRadius: "15px",
    margin: "1rem 0",
  };

  return (
    <div style={alertStyle} role="alert">
      <h4 style={{ marginBottom: "0.5rem" }}>{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
