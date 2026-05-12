import {
  useEffect,
  useState
} from "react";

import Sidebar from
  "../components/Sidebar";

import API from
  "../services/api";

function Visitors() {

  const [analytics,
    setAnalytics] =
    useState([]);

  const [uniqueVisitors,
    setUniqueVisitors] =
    useState(0);

  const [activeUsers,
    setActiveUsers] =
    useState(0);

  // FETCH DATA

  useEffect(() => {

    fetchVisitors();

  }, []);

  const fetchVisitors =
    async () => {

    try {

      // ANALYTICS

      const res =
        await API.get(
          "/analytics"
        );

      setAnalytics(
        res.data
      );

      // UNIQUE VISITORS

      const visitors =
        new Set(

          res.data.map(
            (item) =>
              item.visitorId
          )

        );

      setUniqueVisitors(
        visitors.size
      );

      // ACTIVE USERS

      const activeRes =
        await API.get(
          "/analytics/active-users"
        );

      setActiveUsers(

        activeRes.data.activeUsers

      );

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <div className="flex-1 p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          Visitors Analytics

        </h1>

        {/* TOP CARDS */}

        <div className="grid grid-cols-3 gap-6 mb-10">

          {/* TOTAL VISITORS */}

          <div className="bg-white rounded-3xl p-8 shadow">

            <h2 className="text-xl text-gray-500">

              Total Visitors

            </h2>

            <p className="text-5xl font-bold text-blue-500 mt-4">

              {uniqueVisitors}

            </p>

          </div>

          {/* ACTIVE USERS */}

          <div className="bg-white rounded-3xl p-8 shadow">

            <h2 className="text-xl text-gray-500">

              Active Users

            </h2>

            <p className="text-5xl font-bold text-green-500 mt-4">

              {activeUsers}

            </p>

          </div>

          {/* TOTAL EVENTS */}

          <div className="bg-white rounded-3xl p-8 shadow">

            <h2 className="text-xl text-gray-500">

              Total Events

            </h2>

            <p className="text-5xl font-bold text-pink-500 mt-4">

              {analytics.length}

            </p>

          </div>

        </div>

        {/* VISITOR TABLE */}

        <div className="bg-white rounded-3xl shadow p-6 overflow-auto">

          <h2 className="text-3xl font-bold mb-6">

            Visitor Activity

          </h2>

          <div className="max-h-[600px] overflow-auto">

            <table className="w-full">

              <thead className="sticky top-0 bg-white border-b">

                <tr>

                  <th className="p-4 text-left">

                    Visitor ID

                  </th>

                  <th className="p-4 text-left">

                    Device

                  </th>

                  <th className="p-4 text-left">

                    Browser

                  </th>

                  <th className="p-4 text-left">

                    Event

                  </th>

                  <th className="p-4 text-left">

                    Page

                  </th>

                  <th className="p-4 text-left">

                    Time

                  </th>

                </tr>

              </thead>

              <tbody>

                {analytics.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b hover:bg-gray-50"
                  >

                    {/* VISITOR */}

                    <td className="p-4">

                      {item.visitorId}

                    </td>

                    {/* DEVICE */}

                    <td className="p-4">

                      {item.device ||
                        "Desktop"}

                    </td>

                    {/* BROWSER */}

                    <td className="p-4">

                      {item.browser ||
                        "Chrome"}

                    </td>

                    {/* EVENT */}

                    <td className="p-4 capitalize">

                      {item.eventType}

                    </td>

                    {/* PAGE */}

                    <td className="p-4">

                      {item.page}

                    </td>

                    {/* TIME */}

                    <td className="p-4">

                      {
                        new Date(
                          item.timestamp
                        ).toLocaleString()
                      }

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Visitors;