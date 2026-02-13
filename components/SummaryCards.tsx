export default function SummaryCards({ expenses }: any) {

  const today = new Date().toISOString().slice(0, 10);
  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentYear = new Date().getFullYear().toString();

  let todayTotal = 0;
  let monthTotal = 0;
  let yearTotal = 0;

  expenses.forEach((e: any) => {
    if (e.date === today) todayTotal += e.amount;
    if (e.month === currentMonth) monthTotal += e.amount;
    if (e.year === currentYear) yearTotal += e.amount;
  });

  const Card = ({ title, value }: any) => (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-xl font-bold">₹ {value}</h2>
    </div>
  );

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <Card title="Today" value={todayTotal} />
      <Card title="This Month" value={monthTotal} />
      <Card title="This Year" value={yearTotal} />
    </div>
  );
}
