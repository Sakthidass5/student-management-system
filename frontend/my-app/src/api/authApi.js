import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
console.log(API_URL,'API_URL')
export const registerUser = async (data) => {
  const res = await axios.post(`${API_URL}/auth/register`, data);
  return res.data;
};

export const loginUser = async (data) => {
  console.log(API_URL,'API_URLm')
  const res = await axios.post(`${API_URL}
/auth/login`, data);
  return res.data;
};

