import {
  useEffect,
  useState
} from "react";

import API from
  "../services/api";

function AIInsights() {

  const [loading,
    setLoading] =
    useState(true);

  const [insights,
    setInsights] =
    useState("");

  useEffect(() => {

    fetchInsights();

  }, []);

  // FETCH AI INSIGHTS

  const fetchInsights =
    async () => {

    try {

      const res =
        await API.get(
          "/api/ai/insights"
        );

      console.log(
        "FULL RESPONSE:",
        res.data
      );

      const aiText =
        String(
          res.data.insights
        );

      setInsights(
        aiText
      );

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 rounded-[32px] p-10 shadow-2xl text-white overflow-hidden relative">

      {/* GLOW EFFECT */}

      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-3xl rounded-full">

      </div>

      {/* HEADER */}

      <div className="flex items-center gap-5 mb-10 relative z-10">

        <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-5xl shadow-lg">

          🤖

        </div>

        <div>

          <h1 className="text-5xl font-extrabold tracking-tight">

            AI Insights

          </h1>

          <p className="text-purple-100 text-xl mt-2">

            Smart analytics powered by AI

          </p>

        </div>

      </div>

      {/* CONTENT */}

      {loading ? (

        <div className="bg-white/10 rounded-3xl p-8 backdrop-blur-md animate-pulse relative z-10">

          <p className="text-2xl">

            Analyzing website analytics...

          </p>

        </div>

      ) : (

        <div className="space-y-6 relative z-10 max-h-[500px] overflow-y-auto pr-3 custom-scroll">

          {insights
            ?.split("\n")
            .filter(
              (line) =>
                line.trim() !== ""
            )
            .map(
              (
                line,
                index
              ) => {

                // SECTION HEADINGS

                if (

                  line.includes(
                    "User Behavior"
                  ) ||

                  line.includes(
                    "Problems"
                  ) ||

                  line.includes(
                    "Improvement"
                  )

                ) {

                  return (

                    <div
                      key={index}
                      className="pt-6"
                    >

                      <h2 className="text-3xl font-bold border-b border-white/20 pb-4">

                        {

                          line
                            .replace(/\*/g, "")
                            .replace(/[0-9]./g, "")

                        }

                      </h2>

                    </div>

                  );

                }

                // BULLET POINTS

                return (

                  <div

                    key={index}

                    className="bg-white/10 hover:bg-white/15 transition-all duration-300 border border-white/10 rounded-3xl p-6 backdrop-blur-md shadow-lg"

                  >

                    <div className="flex items-start gap-4">

                      <div className="w-4 h-4 rounded-full bg-pink-300 mt-3">

                      </div>

                      <p className="text-xl leading-9 text-white font-medium">

                        {

                          line
                            .replace(/\*/g, "")
                            .replace("-", "")

                        }

                      </p>

                    </div>

                  </div>

                );

              }
            )}

        </div>

      )}

    </div>

  );

}

export default AIInsights;