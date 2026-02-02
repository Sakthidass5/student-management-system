import React, { useEffect, useState } from "react";
import api from "../api/axios";

function StudentList() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const res = await api.get("/students");
      setStudents(res.data.students);
    };
    fetchStudents();
  }, []);

  return (
    <div className="p-4">

      


      <div className="p-6 bg-gray-50 rounded-lg shadow">
  <h2 className="text-2xl font-bold mb-6 text-blue-700">Students</h2>
  <table className="min-w-full border-collapse border border-gray-300 rounded-lg overflow-hidden">
    <thead className="bg-blue-100">
      <tr>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border">Name</th>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border">Class</th>
        <th className="px-4 py-2 text-left font-semibold text-gray-700 border">Gender</th>
      </tr>
    </thead>
    <tbody>
      {students.map((s, idx) => (
        <tr key={s._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
          <td className="border px-4 py-2">{s.name}</td>
          <td className="border px-4 py-2">{s.class}</td>
          <td className="border px-4 py-2">{s.gender}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

     </div> 


    
  );
}

export default StudentList;
