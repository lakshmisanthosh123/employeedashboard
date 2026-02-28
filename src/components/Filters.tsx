import { Employee } from "../types";

const Filters = ({
  data,
  setFilteredData,
}: {
  data: Employee[];
  setFilteredData: (data: Employee[]) => void;
}) => {
  const handleDepartmentFilter = (dept: string) => {
    if (!dept) return setFilteredData(data);
    setFilteredData(data.filter((d) => d.Department === dept));
  };

  const departments = [...new Set(data.map((d) => d.Department))];

  return (
    <div className="mb-4">
      <select
        onChange={(e) => handleDepartmentFilter(e.target.value)}
        className="p-2 border rounded"
      >
        <option value="">All Departments</option>
        {departments.map((d) => (
          <option key={d}>{d}</option>
        ))}
      </select>
    </div>
  );
};

export default Filters;
