import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const EmptyBlogCard = () => {
  return (
    <div className="empty_blog_container">
      <div className="add_blog_card">
        <FaPlus className="add_icon" />

        <h2 className="empty_title">No blogs yet</h2>

        <p className="empty_subtext">
          Your creative space is empty — start your first blog.
        </p>

        <Link to="/create-blog" className="empty_btn">
          Add Blog
        </Link>
      </div>
    </div>
  );
};

export default EmptyBlogCard;
