import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col gap-2 text-xl">
      <p>Oops! The page you're looking for doesn't exist.</p>
      <p>Please go back to the <Link to="/">Home</Link> page.</p>      
    </div>
  );
};
export default NotFoundPage;
