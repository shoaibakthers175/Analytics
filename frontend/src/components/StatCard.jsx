function StatCard({
  title,
  value,
  color
}) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-gray-500">

        {title}

      </h2>

      <p className={`text-4xl font-bold mt-3 ${color}`}>

        {value}

      </p>

    </div>

  );

}

export default StatCard;