import { Employee } from "../types";

interface Props {
  data: Employee[];
  sortKey: keyof Employee;
  sortAsc: boolean;
  setSortKey: (key: keyof Employee) => void;
  setSortAsc: (val: boolean) => void;
}

const EmployeeTable = ({
  data,
  sortKey,
  sortAsc,
  setSortKey,
  setSortAsc,
}: Props) => {
  const handleSort = (key: keyof Employee) => {
    if (sortKey === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const renderArrow = (key: keyof Employee) => {
    if (sortKey !== key) return "⇅";
    return sortAsc ? "↑" : "↓";
  };

  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th
            onClick={() => handleSort("Employee Name")}
            className="cursor-pointer p-2"
          >
            Name {renderArrow("Employee Name")}
          </th>

          <th
            onClick={() => handleSort("Department")}
            className="cursor-pointer p-2"
          >
            Department {renderArrow("Department")}
          </th>

          <th
            onClick={() => handleSort("Salary")}
            className="cursor-pointer p-2"
          >
            Salary {renderArrow("Salary")}
          </th>

          <th
            onClick={() => handleSort("Leave Count")}
            className="cursor-pointer p-2"
          >
            Leave {renderArrow("Leave Count")}
          </th>
        </tr>
      </thead>

      <tbody>
        {data.map((emp, index) => (
          <tr key={index} className="border-t hover:bg-gray-50">
            <td className="p-2">{emp["Employee Name"]}</td>
            <td className="p-2">{emp.Department}</td>
            <td className="p-2">{emp.Salary}</td>
            <td className="p-2">{emp["Leave Count"]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
