import { useQuery } from "@tanstack/react-query";
import { getDashboard } from "../api/studentApi";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function Dashboard() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["dashboard"],
    queryFn: getDashboard,
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading dashboard</p>;

  const genderData = {
    labels: data?.genderRatio ? Object.keys(data.genderRatio) : [],
    datasets: [
      {
        label: "Gender Ratio",
        data: data?.genderRatio ? Object.values(data.genderRatio) : [],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Dashboard</h2>
      {data && (
        <>
          <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded mb-6 shadow-sm w-fit">
            <p className="text-lg font-semibold">🎓 Total Students: <span className="font-bold text-blue-900">{data.total}</span></p>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">📚 Class Distribution</h3>
            <table className="min-w-[300px] border border-gray-300 rounded shadow-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left border-b">Class</th>
                  <th className="px-4 py-2 text-left border-b">Student Count</th>
                </tr>
              </thead>
              <tbody>
                {data.perClass.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50 border-t">
                    <td className="px-4 py-2">Class {c._id}</td>
                    <td className="px-4 py-2">{c.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Gender Ratio</h3>
            {data?.genderRatio ? (
              <div className="w-64">
                <Pie data={genderData} />
              </div>
            ) : (
              <p>No gender data available</p>
            )}
          </div>

        </>
      )}
    </div>
  );
}
