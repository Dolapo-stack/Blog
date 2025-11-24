import axios from "axios";

export const register = async (data) => {
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

export const login = async(data) =>{
  try{
    const response = await axios.post("https://blog-website-api.vercel.app/api/user/login", data)
    return response;
  }
  catch (error){
    throw error;
  }
}
