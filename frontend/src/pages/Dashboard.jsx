import {
  useEffect,
  useState
} from "react";

import API from "../services/api";

import { io } from "socket.io-client";

import Sidebar from "../components/Sidebar";

import StatCard from "../components/StatCard";

import ClicksChart from "../components/Charts/ClicksChart";

import Filters from "../components/Filters";

import Heatmap from "../components/Heatmap";

import HistoryTable from "../components/HistoryTable";
import AIInsights from "../components/AIInsights";

const socket =
  io("https://analytics-gu8l.onrender.com");

function Dashboard() {

  // ANALYTICS DATA

  const [analytics,
    setAnalytics] =
    useState([]);

  // STATS

  const [stats,
    setStats] =
    useState({});

  // ACTIVE USERS

  const [activeUsers,
    setActiveUsers] =
    useState(0);

  // DATE FILTER

  const [selectedDate,
    setSelectedDate] =
    useState("");

  // FETCH DATA

  useEffect(() => {

    fetchData();

    // SOCKET LISTENER

    socket.on(
      "new-event",
      () => {

        fetchData();

      }
    );

    return () => {

      socket.off("new-event");

    };

  }, [selectedDate]);

  // FETCH API DATA

  const fetchData =
    async () => {

    try {

      // ANALYTICS

      const analyticsRes =
        await API.get(

          `/analytics?date=${selectedDate}`

        );

      // STATS

      const statsRes =
        await API.get(

          `/analytics/stats?date=${selectedDate}`

        );

      // ACTIVE USERS

      const activeRes =
        await API.get(
          "/analytics/active-users"
        );

      // SET DATA

      setAnalytics(
        analyticsRes.data
      );

      setStats(
        statsRes.data
      );

      setActiveUsers(
        activeRes.data.activeUsers
      );

    } catch (err) {

      console.log(err);

    }

  };

  // CHART DATA

  // REALTIME CHART DATA

const groupedData = {};

// GROUP BY TIME

analytics.forEach((item) => {

  // ONLY CLICK EVENTS

  if (
    item.eventType === "click"
  ) {

    // FORMAT TIME

    const time =
      new Date(
        item.timestamp
      ).toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

      });

    // INITIALIZE

    if (!groupedData[time]) {

      groupedData[time] = 0;

    }

    // COUNT CLICKS

    groupedData[time]++;

  }

});

// CONVERT TO CHART ARRAY

const chartData =
  Object.keys(groupedData).map(
    (time) => ({

      name: time,

      clicks:
        groupedData[time]

    })
  );

  return (

    <div className="flex bg-gray-100 min-h-screen">

      {/* SIDEBAR */}

      <Sidebar />

      {/* MAIN CONTENT */}

      <div className="flex-1 p-10">

        {/* TITLE */}

        <h1 className="text-4xl font-bold mb-10">

         FVC Analytics Dashboard

        </h1>

        {/* TOP CARDS */}

        <div className="grid grid-cols-4 gap-5 mb-10">

          <StatCard
            title="Total Clicks"
            value={stats.totalClicks || 0}
            color="text-blue-500"
          />

          <StatCard
            title="Visitors"
            value={stats.visitors || 0}
            color="text-green-500"
          />

          <StatCard
            title="Pages"
            value={stats.pages || 0}
            color="text-pink-500"
          />

          <StatCard
            title="Active Users"
            value={activeUsers}
            color="text-orange-500"
          />

        </div>

        {/* FILTERS */}

        <div className="mb-10">

          <Filters
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

        </div>

        {/* CHART */}

        <div className="mb-10">

          <ClicksChart
            data={chartData}
          />

        </div>

        {/* HEATMAP */}

        <div className="mb-10">

          <Heatmap />

        </div>
        {/* AI INSIGHTS */}
        <div className="mb-10">

           <AIInsights />

        </div>

        {/* HISTORY TABLE */}

        <HistoryTable
          analytics={analytics}
        />

      </div>

    </div>

  );

}

export default Dashboard;
