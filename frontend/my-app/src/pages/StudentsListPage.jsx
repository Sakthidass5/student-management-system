import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../api/studentApi";
import StudentTable from "../components/StudentTable";
import SearchFilterBar from "../components/SearchFilterBar";
import PaginationControls from "../components/PaginationControls";
import useDebounce from "../hooks/useDebounce";

export default function StudentsListPage() {

  const role = localStorage.getItem("role");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);

  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useQuery({ queryKey: ["students", debouncedSearch, filter, page], queryFn: () => getStudents({ name: debouncedSearch, className: filter, page }), });
  const totalPages = data?.total ? Math.ceil(data.total / 10) : 1;


  const handlePageChange = (newPage) => setPage(newPage);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Students</h2>
      <SearchFilterBar
        search={search} filter={filter} onSearch={setSearch} onFilter={setFilter} students={data || []}
      />
      <StudentTable students={data || []} role={role} />
      <PaginationControls page={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
