import "./NavBar.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <>
      <nav>
        <h1>
          <Link to="/blogs" className="link">
            Blog
          </Link>
        </h1>
        <ul>
          <Link to="/create_blog" className="link">
            Create blog
          </Link>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
