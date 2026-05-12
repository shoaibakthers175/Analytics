function Filters({
  selectedDate,
  setSelectedDate
}) {

  return (

    <div className="bg-white rounded-2xl p-5 shadow flex gap-5">

      <input
        type="date"

        value={selectedDate}

        onChange={(e) =>
          setSelectedDate(
            e.target.value
          )
        }

        className="border rounded-lg p-3"
      />

    </div>

  );

}

export default Filters;