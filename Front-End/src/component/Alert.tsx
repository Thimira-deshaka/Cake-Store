interface Props {
  title: string;
  message: string;
  isSuccess: boolean;
}

const Alert = ({ title, message, isSuccess }: Props) => {
  const alertClass = isSuccess ? "alert-success" : "alert-danger";

  return (
    <div className={`alert ${alertClass}`} role="alert">
      <h4 className="alert-heading">{title}</h4>
      <p>{message}</p>
    </div>
  );
};

export default Alert;
