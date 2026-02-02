import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/studentApi";
import StudentTable from "../components/StudentTable";
import SearchFilterBar from "../components/SearchFilterBar";
import PaginationControls from "../components/PaginationControls";
import { useSelector } from "react-redux";

export default function StudentsPage() {
  const { role } = useSelector((state) => state.auth);
  const { data, isLoading, isError } = useQuery({ queryKey: ["students"], queryFn: getStudents, });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <SearchFilterBar />
      <StudentTable students={data} role={role} />
      <PaginationControls page={1} totalPages={4} onPageChange={() => { }} />
    </div>
  );
}
