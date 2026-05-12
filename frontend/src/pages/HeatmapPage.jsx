import Sidebar from
  "../components/Sidebar";

import Heatmap from
  "../components/Heatmap";

function HeatmapPage() {

  return (

    <div className="flex bg-gray-100 min-h-screen">

      <Sidebar />

      <div className="flex-1 p-10">

        <h1 className="text-4xl font-bold mb-10">

          Heatmap Page

        </h1>

        <Heatmap />

      </div>

    </div>

  );

}

export default HeatmapPage;