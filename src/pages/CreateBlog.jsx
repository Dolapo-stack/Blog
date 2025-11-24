import React from "react";
import Layout from "../components/Layout";
import create_blog_image from "../assets/images/login_image.png"

const CreateBlog = () => {
  return (
    <Layout>
      <div className="container">
        <form action="" className="create_blog_form">
          <h2 style={{marginBottom:"40px"}}>Create New Blog Post</h2>
          <label htmlFor="title">Title</label>
          <input type="text" name="title" id="title" placeholder="Enter blog title"/>
         <label htmlFor="blog_content">Content</label>
          <textarea name="content" id="content"></textarea>
      <label htmlFor="post_date">Select Date</label>
      <input type="date" name="post_date" id="post_date" />
       <input type="file" name="cover_image" id="cover_image" />
       <label htmlFor="status">Status</label>
       <div className="status">
        <label>Draft</label>
        <input type="radio" name="status" id="draft" value="draft" />
             <label>Published</label>
             <input type="radio" name="status" id="published" value="published" />
       </div>
       

       <button type="submit">Submit</button>
        </form>
      </div>
  
    </Layout>
  );
};

export default CreateBlog;
