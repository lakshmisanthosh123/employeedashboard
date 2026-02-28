import { useState, useMemo } from "react";
import * as XLSX from "xlsx";
import { Employee } from "../types";
import SummaryCards from "../components/SummaryCards";
import Filters from "../components/Filters";
import SalaryChart from "../components/SalaryChart";
import EmployeeTable from "../components/EmployeeTable";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<Employee[]>([]);
  const [filteredData, setFilteredData] = useState<Employee[]>([]);
  const [sortKey, setSortKey] = useState<keyof Employee>("Employee Name");
  const [sortAsc, setSortAsc] = useState(true);

  const navigate = useNavigate();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (evt) => {
      const wb = XLSX.read(evt.target?.result, { type: "binary" });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json<Employee>(ws);

      setData(json);
      setFilteredData(json);
    };

    reader.readAsBinaryString(file);
  };

  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      const aValue = a[sortKey];
      const bValue = b[sortKey];

      if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
        return sortAsc
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }

      return sortAsc
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }, [filteredData, sortKey, sortAsc]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  console.log("Sorted Data:", sortedData);
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div >
          <h1 className="text-3xl font-bold text-gray-800">
            Employee Analytics Dashboard
          </h1>

          <div className="flex gap-4">
            <input
              type="file"
              accept=".xlsx,.csv"
              onChange={handleFileUpload}
              className="text-sm"
            />

            <button
              onClick={handleLogout}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
              Logout
            </button>
          </div>
        </div>
        {sortedData.length > 0 && (
          <>
            <SummaryCards data={sortedData} />

            <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
              <h2 className="text-xl font-semibold text-gray-800">
                Data Visualisation
              </h2>

              <Filters data={data} setFilteredData={setFilteredData} />

              <EmployeeTable
                data={sortedData}
                sortKey={sortKey}
                sortAsc={sortAsc}
                setSortKey={setSortKey}
                setSortAsc={setSortAsc}
              />

              <SalaryChart data={sortedData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
