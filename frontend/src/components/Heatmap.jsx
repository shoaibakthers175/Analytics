import {
  useEffect,
  useState
} from "react";

import API from
  "../services/api";

import { io } from "socket.io-client";

const socket =
  io("http://localhost:5000");

function Heatmap() {

  const [points,
    setPoints] =
    useState([]);

  // INITIAL FETCH

  useEffect(() => {

    fetchHeatmap();

    // REALTIME SOCKET

    socket.on(
      "new-event",
      (data) => {

        // ONLY CLICK EVENTS

        if (
          data.eventType === "click"
        ) {

          setPoints((prev) => [

            ...prev,

            data

          ]);

        }

      }
    );

    return () => {

      socket.off("new-event");

    };

  }, []);

  // FETCH EXISTING DATA

  const fetchHeatmap =
    async () => {

    try {

      const res =
        await API.get(
          "/analytics/heatmap"
        );

      setPoints(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="bg-white rounded-2xl p-6 shadow">

      <h2 className="text-2xl font-bold mb-5">

        Click Heatmap

      </h2>

      <div className="relative w-full h-[600px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden border">

        {/* GRID */}

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#d1d5db_1px,transparent_1px),linear-gradient(to_bottom,#d1d5db_1px,transparent_1px)] bg-[size:40px_40px] opacity-30"></div>

        {/* POINTS */}

        {points.map((point, index) => (

          <div
            key={index}

            className="absolute pointer-events-none"

            style={{

              left: `${point.x}px`,

              top: `${point.y}px`

            }}
          >

            {/* OUTER */}

            <div className="absolute w-16 h-16 bg-red-500 opacity-10 rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse"></div>

            {/* MIDDLE */}

            <div className="absolute w-10 h-10 bg-orange-500 opacity-20 rounded-full -translate-x-1/2 -translate-y-1/2"></div>

            {/* CENTER */}

            <div className="absolute w-4 h-4 bg-red-600 rounded-full -translate-x-1/2 -translate-y-1/2 shadow-lg"></div>

          </div>

        ))}

      </div>

      {/* TOTAL */}

      <div className="mt-5 text-gray-500">

        Total Heat Points:

        <span className="font-bold ml-2 text-red-500">

          {points.length}

        </span>

      </div>

    </div>

  );

}

export default Heatmap;