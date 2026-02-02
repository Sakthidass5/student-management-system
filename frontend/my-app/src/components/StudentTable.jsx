import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteStudent } from "../api/studentApi";
import { FaUserCircle } from "react-icons/fa";
import { useQueryClient } from "@tanstack/react-query";

export default function StudentTable({ students = [], role, refetch }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const handleDelete = async (id) => {
    try {
      await deleteStudent(id);
      toast.success("Student deleted successfully");
      queryClient.invalidateQueries(["students"]);
    } catch (err) {
      toast.error("Error deleting student");
    }
  };

  return (
    <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-2 text-left">Name</th>
          <th className="px-4 py-2 text-left">Class</th>
          <th className="px-4 py-2 text-left">Email</th>
          <th className="px-4 py-2 text-left">Gender</th>
          {role === "Admin" && <th className="px-4 py-2 text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s._id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-2">{s.name}</td>
            <td className="px-4 py-2">{s.className}</td>
            <td className="px-4 py-2">{s.email}</td>
            <td className="px-4 py-2">{s.gender}</td>
            {role === "Admin" &&
              (
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => navigate(`/students/edit/${s._id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              )
            }

          </tr>
        ))}
      </tbody>
    </table>
  );
}
