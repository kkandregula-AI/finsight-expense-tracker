"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Charts({ expenses }: any) {

  const categoryMap: any = {};
  expenses.forEach((e: any) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + e.amount;
  });

  const pieData = Object.keys(categoryMap).map((key) => ({
    name: key,
    value: categoryMap[key],
  }));

  const monthMap: any = {};
  expenses.forEach((e: any) => {
    monthMap[e.month] = (monthMap[e.month] || 0) + e.amount;
  });

  const lineData = Object.keys(monthMap).map((key) => ({
    month: key,
    total: monthMap[key],
  }));

  return (
    <div className="grid md:grid-cols-2 gap-6">

      <div className="bg-white p-4 rounded-xl shadow h-80">
        <h3 className="font-semibold mb-2">Category Breakdown</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={pieData} dataKey="value" outerRadius={100}>
              {pieData.map((_, index) => (
                <Cell key={index} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded-xl shadow h-80">
        <h3 className="font-semibold mb-2">Monthly Trend</h3>
        <ResponsiveContainer width="100%" height="90%">
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="total" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
