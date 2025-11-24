import React from "react";

const EditBlog = ({ onClose, editData }) => {
  return (

      
        <form>
          <h2> Edit Blog Post</h2>
          <div>
            <label htmlFor="title" className="title_label">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter blog title"
            />
          </div>

          <div>
            <label htmlFor="blog_content" className="blog_content_label">Content</label>
            <textarea name="content" id="content"></textarea>
          </div>
          <div className="action-btns-modal">
            <button type="submit" onClick={() => openModal(selectedItem)}>
              Save Changes
            </button>
            <button className="cancel-btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>  );
};

export default EditBlog;
