import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NavLogo from "../images/NavLogo.png";

const Navbar = () => {
  const auth = localStorage.getItem("user");
  console.log(auth);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.clear();
    navigate("/signup");
  };

  return (
    <div className="navbar">
      <Link to="/">
        <img src={NavLogo} alt="nav-logo" className="nav-logo" />
      </Link>

      {auth ? (
        <ul className="nav-ul">
          <li>
            <Link to="/">Products</Link>
          </li>
          <li>
            <Link to="/add">Add Products</Link>
          </li>
          <li>
            <Link to="/update">Update Products</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link onClick={logOut} to="/signup">
              Logout ({JSON.parse(auth).username})
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav-ul nav-right">
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
