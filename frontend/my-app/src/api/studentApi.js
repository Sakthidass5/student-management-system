import api from "./axios";

export const getStudents = async ({ name, className, page = 1, limit = 10 }) => {
  const res = await api.get("/students", {
    params: { name, className, page, limit },
  });
  return res.data;
};



export const addStudent = async (formData) => {
  const res = await api.post("/students", formData);
  return res.data;
};



// Update student

export const updateStudent = async (id, student) => { const res = await api.put(`/students/${id}`, student); return res.data; };


// Delete student
export const deleteStudent = async (id) => { const res = await api.delete(`/students/${id}`); return res.data; };


export async function getStudentById(id) {
  const res = await api.get(`/students/${id}`);
  return res.data;
}


// api/studentApi.js

export const exportStudents = async () => {
  const response = await api.get("/students/export", { responseType: "blob" });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "students.xlsx");
  document.body.appendChild(link);
  link.click();
};

export const importStudents = async (file) => {
  const formData = new FormData();
  console.log(file, 'file')
  formData.append("file", file);
  await api.post("/students/import", formData);
};

export const getAuditLogs = async () => { const res = await api.get("/analytics/audit-logs"); return res.data; };


export const getDashboard = async () => {
  const res = await api.get("/analytics/dashboard"); return res.data;
};