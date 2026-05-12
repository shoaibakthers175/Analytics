function HistoryTable({
  analytics
}) {

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      {/* TITLE */}

      <h2 className="text-2xl font-bold mb-5">

        Click History

      </h2>

      {/* SCROLLABLE TABLE */}

      <div className="overflow-auto max-h-[500px] rounded-xl border">

        <table className="w-full">

          {/* STICKY HEADER */}

          <thead className="sticky top-0 bg-white z-10">

            <tr className="border-b">

              <th className="p-4 text-left">

                Time

              </th>

              <th className="p-4 text-left">

                Element

              </th>

              <th className="p-4 text-left">

                Type

              </th>

              <th className="p-4 text-left">

                Page

              </th>

              <th className="p-4 text-left">

                Position

              </th>

            </tr>

          </thead>

          <tbody>

            {analytics.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-gray-50 transition"
              >

                {/* TIME */}

                <td className="p-4">

                  {
                    new Date(
                      item.timestamp
                    ).toLocaleString()
                  }

                </td>

                {/* ELEMENT */}

                <td className="p-4">

                  {item.element || "-"}

                </td>

                {/* TYPE */}

                <td className="p-4 capitalize">

                  {item.eventType}

                </td>

                {/* PAGE */}

                <td className="p-4">

                  {item.page || "-"}

                </td>

                {/* POSITION */}

                <td className="p-4">

                  ({item.x || 0},
                  {item.y || 0})

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default HistoryTable;