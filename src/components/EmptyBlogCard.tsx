import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyBlogCard = () => {
  return (
    <div className="empty_blog_container">
      <Link to="/create_blog" className="link">
        <FaPlus className="add_icon" size={36} />
      </Link>

      <h2 className="empty_title">No blogs yet</h2>

      <p className="empty_subtext">
        Your creative space is empty — start your first blog.
      </p>

      <Link to="/create_blog" className="add_blog_link">
        ADD BLOG
      </Link>
    </div>
  );
};

export default EmptyBlogCard;
