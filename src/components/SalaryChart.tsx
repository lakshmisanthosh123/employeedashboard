import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  Cell
} from "recharts";
import { Employee } from "../types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A"];
const SalaryChart = ({ data }: { data: Employee[] }) => {
  const deptData = Object.values(
    data.reduce((acc: any, curr) => {
      acc[curr.Department] = acc[curr.Department] || {
        name: curr.Department,
        salary: 0,
        count: 0,
      };
      acc[curr.Department].salary += Number(curr.Salary);
      acc[curr.Department].count += 1;
      return acc;
    }, {}),
  );
  console.log(deptData);
  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
           Salary distribution by Department
          </h2>
      <BarChart width={700} height={250} data={deptData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="salary" fill="#8884d8" />
      </BarChart>
 <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Employee count by Department
          </h2>
      <PieChart width={400} height={250}>
        <Pie
          data={deptData}
          dataKey="count"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={80}
          label={({ name }) => name } 
        >
          {deptData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
<h2 className="text-xl font-semibold text-gray-800 mb-4">
       Salary or Leave Count trend by Department
          </h2>
      <LineChart width={700} height={250} data={deptData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="salary" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default SalaryChart;
