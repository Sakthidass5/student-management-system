import { useQuery } from "@tanstack/react-query";
import { getStudents, exportStudents, importStudents } from "../api/studentApi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function StudentsImportExportPage() {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({ queryKey: ["students"], queryFn: getStudents, });
  const [file, setFile] = useState(null);

  if (isLoading) return <p>Loading...</p>;

  const handleExport = () => {
    exportStudents();
  };
  const handleImport = async () => {
    try {
      if (file) {
        await importStudents(file);
        toast.success("Import completed successfully")
        navigate('/studentsPage')
      }
    }
    catch (err) {
      console.log(err, 'err')
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Students File</h2>
      <div className="mt-4">
        <button onClick={handleExport} className="bg-blue-500 text-white px-3 py-1 rounded">
          Export to Excel
        </button>
        <input type="file" accept=".xlsx" onChange={(e) => setFile(e.target.files[0])} className="ml-4" />
        <button
          onClick={handleImport}
          disabled={!file}
          className={`px-3 py-1 rounded ml-2 ${file ? "bg-green-500 text-white" : "bg-gray-400 text-gray-200 cursor-not-allowed"}`}
        >
          Import from Excel
        </button>

      </div>
    </div>
  );
}
