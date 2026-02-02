import axios from "axios";

export const getClasses = async () => { 
    const res = await axios.get("http://localhost:5000/students/classes", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}`, }, }); return res.data; };