import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Dashboard from
  "./pages/Dashboard";

import Visitors from
  "./pages/Visitors";

import HeatmapPage from
  "./pages/HeatmapPage";

import Settings from
  "./pages/Settings";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}

        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* VISITORS */}

        <Route
          path="/visitors"
          element={<Visitors />}
        />

        {/* HEATMAP */}

        <Route
          path="/heatmap"
          element={<HeatmapPage />}
        />

        {/* SETTINGS */}

        <Route
          path="/settings"
          element={<Settings />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;