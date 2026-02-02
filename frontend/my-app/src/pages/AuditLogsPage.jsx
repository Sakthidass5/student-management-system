import { useQuery } from "@tanstack/react-query";
import { getAuditLogs } from "../api/studentApi";

export default function AuditLogsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["auditLogs"],
    queryFn: getAuditLogs
  });

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Audit Logs</h2>
      <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">User</th>
            <th className="px-4 py-2 text-left">Action</th>
            <th className="px-4 py-2 text-left">Timestamp</th>
            <th className="px-4 py-2 text-left">Data Changes</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((log) => (
            <tr key={log._id} className="border-t hover:bg-gray-50">
              <td className="px-4 py-2">{log.user}</td>
              <td className="px-4 py-2">{log.actionType}</td>
              <td className="px-4 py-2">{new Date(log.timestamp).toLocaleString()}</td>
              <td className="px-4 py-2 text-sm text-gray-600">
                {JSON.stringify(log.dataChanges)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
