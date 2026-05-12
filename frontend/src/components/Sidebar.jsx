import {
  FaChartLine,
  FaUsers,
  FaFire,
  FaCog
} from "react-icons/fa";

import {
  NavLink
} from "react-router-dom";

function Sidebar() {

  const menu = [

    {
      name: "Dashboard",
      icon: <FaChartLine />,
      path: "/"
    },

    {
      name: "Visitors",
      icon: <FaUsers />,
      path: "/visitors"
    },

    {
      name: "Heatmap",
      icon: <FaFire />,
      path: "/heatmap"
    },

    {
      name: "Settings",
      icon: <FaCog />,
      path: "/settings"
    }

  ];

  return (

    <div className="w-72 bg-[#020b24] text-white min-h-screen p-8">

      {/* LOGO */}

      <h1 className="text-3xl font-bold mb-16">

        FVC Analytics

      </h1>

      {/* MENU */}

      <div className="space-y-4">

        {menu.map((item) => (

          <NavLink
            key={item.name}

            to={item.path}

            className={({ isActive }) =>

              `flex items-center gap-4 p-4 rounded-xl transition-all duration-300

              ${isActive

                ? "bg-blue-600 shadow-lg"

                : "hover:bg-[#0f172a]"
              }`
            }
          >

            <span className="text-2xl">

              {item.icon}

            </span>

            <span className="text-xl font-semibold">

              {item.name}

            </span>

          </NavLink>

        ))}

      </div>

    </div>

  );

}

export default Sidebar;