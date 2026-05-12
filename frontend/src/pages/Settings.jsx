import {
  useEffect,
  useState
} from "react";

import Sidebar from
  "../components/Sidebar";

function Settings() {

  // TRACKING

  const [tracking,
    setTracking] =
    useState(true);

  // DARK MODE

  const [darkMode,
    setDarkMode] =
    useState(false);

  // LOAD SETTINGS

  useEffect(() => {

    // TRACKING

    const savedTracking =
      localStorage.getItem(
        "trackingEnabled"
      );

    if (savedTracking === null) {

      localStorage.setItem(
        "trackingEnabled",
        "true"
      );

      setTracking(true);

    } else {

      setTracking(
        savedTracking === "true"
      );

    }

    // DARK MODE

    const savedDark =
      localStorage.getItem(
        "darkMode"
      );

    if (savedDark === "true") {

      setDarkMode(true);

      document.documentElement.classList.add(
        "dark"
      );

    }

  }, []);

  // TOGGLE TRACKING

  const toggleTracking =
    () => {

    const updated =
      !tracking;

    setTracking(updated);

    localStorage.setItem(

      "trackingEnabled",

      updated.toString()

    );

  };

  // TOGGLE DARK MODE

  const toggleDarkMode =
    () => {

    const updated =
      !darkMode;

    setDarkMode(updated);

    localStorage.setItem(

      "darkMode",

      updated.toString()

    );

    // APPLY DARK CLASS

    if (updated) {

      document.documentElement.classList.add(
        "dark"
      );

    } else {

      document.documentElement.classList.remove(
        "dark"
      );

    }

  };

  return (

    <div className={`flex min-h-screen

      ${darkMode

        ? "bg-gray-900 text-white"

        : "bg-gray-100 text-black"

      }`}>

      {/* SIDEBAR */}

      <Sidebar />

      {/* CONTENT */}

      <div className="flex-1 p-10">

        {/* TITLE */}

        <h1 className="text-5xl font-bold mb-10">

          Settings

        </h1>

        {/* SETTINGS GRID */}

        <div className="grid grid-cols-2 gap-8">

          {/* TRACKING */}

          <div className={`rounded-3xl p-8 shadow-lg

            ${darkMode

              ? "bg-gray-800"

              : "bg-white"

            }`}>

            <h2 className="text-3xl font-bold mb-4">

              Analytics Tracking

            </h2>

            <p className="mb-8 opacity-70">

              Enable or disable
              realtime tracking.

            </p>

            <button

              onClick={toggleTracking}

              className={`px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all

              ${tracking

                ? "bg-green-500 hover:bg-green-600"

                : "bg-red-500 hover:bg-red-600"

              }`}
            >

              {tracking

                ? "Tracking ON"

                : "Tracking OFF"

              }

            </button>

          </div>

          {/* DARK MODE */}

          <div className={`rounded-3xl p-8 shadow-lg

            ${darkMode

              ? "bg-gray-800"

              : "bg-white"

            }`}>

            <h2 className="text-3xl font-bold mb-4">

              Dark Mode

            </h2>

            <p className="mb-8 opacity-70">

              Toggle dashboard theme.

            </p>

            <button

              onClick={toggleDarkMode}

              className={`px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all

              ${darkMode

                ? "bg-purple-500 hover:bg-purple-600"

                : "bg-gray-700 hover:bg-black"

              }`}
            >

              {darkMode

                ? "Dark Mode ON"

                : "Dark Mode OFF"

              }

            </button>

          </div>

          {/* DATABASE */}

          <div className={`rounded-3xl p-8 shadow-lg

            ${darkMode

              ? "bg-gray-800"

              : "bg-white"

            }`}>

            <h2 className="text-3xl font-bold mb-4">

              Database Status

            </h2>

            <p className="text-green-500 text-xl font-bold">

              MongoDB Connected

            </p>

          </div>

          {/* SYSTEM */}

          <div className={`rounded-3xl p-8 shadow-lg

            ${darkMode

              ? "bg-gray-800"

              : "bg-white"

            }`}>

            <h2 className="text-3xl font-bold mb-4">

              System Info

            </h2>

            <p className="opacity-70">

              Analytics Engine v1.0

            </p>

            <p className="opacity-70 mt-2">

              Socket.IO Active

            </p>

            <p className="opacity-70 mt-2">

              Realtime Tracking Enabled

            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Settings;