import {

  ResponsiveContainer,

  LineChart,

  Line,

  XAxis,

  YAxis,

  Tooltip,

  CartesianGrid

} from "recharts";

function ClicksChart({
  data
}) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-5">

        Realtime Click Analytics

      </h2>

      <ResponsiveContainer
        width="100%"
        height={400}
      >

        <LineChart data={data}>

          <CartesianGrid
            strokeDasharray="3 3"
          />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="clicks"
            stroke="#2563eb"
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );

}

export default ClicksChart;