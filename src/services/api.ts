import axios from "axios";
import blogConfig from "./interceptors";

interface IAuthPayload {
  name: string;
  email: string;
  password: string;
}

type LoginCredentials = Pick<IAuthPayload, "email" | "password">;

interface DataPayloadType {
  title: string;
  description: string;
}

export const register = async (data: IAuthPayload) => {
  try {
    const response = await axios.post(
      " https://blog-website-api.vercel.app/api/user/register",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const login = async (data: LoginCredentials) => {
  try {
    const response = await axios.post(
      "https://blog-website-api.vercel.app/api/user/login",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createBlog = async (data: DataPayloadType) => {
  try {
    const response = await blogConfig.post(
      "https://blog-website-api.vercel.app/api/blog",
      data
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllBlogs = async () => {
  try {
    const response = await blogConfig.get(
      "https://blog-website-api.vercel.app/api/blog"
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteBlog = async (id: string) => {
  try {
    const response = await blogConfig.delete(
      `https://blog-website-api.vercel.app/api/blog/${id}`
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const editBlog = async (id: string, payload: DataPayloadType) => {
  try {
    const response = await blogConfig.put(
      `https://blog-website-api.vercel.app/api/blog/${id}`,
      payload
    );
    return response;
  } catch (error) {
    throw error;
  }
};
