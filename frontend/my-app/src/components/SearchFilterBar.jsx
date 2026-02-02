export default function SearchFilterBar({ onSearch, onFilter, search, filter }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
      <input
        type="text"
        placeholder="Search by name..."
        value={search}   
        className="border px-3 py-2 rounded w-full md:w-1/3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => {
          if (onSearch) onSearch(e.target.value);
        }}
      />
      <select
        value={filter}   
        className="border px-3 py-2 rounded w-full md:w-1/4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onChange={(e) => {
          if (onFilter) onFilter(e.target.value);
        }}
      >
        <option value="">All Classes</option>
        <option value="10A">10A</option>
        <option value="9B">9B</option>
      </select>
    </div>
  );
}
