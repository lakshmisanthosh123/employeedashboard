import { Employee } from "../types";

interface SummaryProps {
  data: Employee[];
}

interface StatCardProps {
  title: string;
  value: string | number;
  bg: string;
  textColor?: string;
}

const StatCard = ({ title, value, bg, textColor }: StatCardProps) => {
  return (
    <div
      className="stat-card"
      style={{
        backgroundColor: bg,
        color: textColor || "white",
        width: "250px",
        padding: "20px",
        borderRadius: "8px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginRight: "20px",
        marginLeft: "20px",
        marginBottom: "20px",
      }}
    >
      <div className="text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
    </div>
  );
};

const SummaryDashboard = ({ data }: SummaryProps) => {
  const totalEmployees = data.length;

  const totalSalary = data.reduce((sum, e) => sum + Number(e.Salary || 0), 0);

  const avgSalary = totalEmployees > 0 ? totalSalary / totalEmployees : 0;

  return (
    <div>
      <StatCard title="Total Employees" value={totalEmployees} bg="#0e3956" />

      <StatCard
        title="Total Salary"
        value={`$${totalSalary.toLocaleString()}`}
        bg="#C94152"
      />

      <StatCard
        title="Average Salary"
        value={`$${avgSalary.toFixed(2)}`}
        bg="#E5A53D"
        textColor="#4a4a4a"
      />
    </div>
  );
};

export default SummaryDashboard;
