import Analytics from
  "../models/Analytics.js";

import {
  generateInsights
} from "../utils/gemini.js";

export const getAIInsights =
  async (req, res) => {

  try {

    // TOTAL CLICKS

    const totalClicks =
      await Analytics.countDocuments({

        eventType: "click"

      });

    // UNIQUE VISITORS

    const visitors =
      await Analytics.distinct(
        "visitorId"
      );

    // UNIQUE PAGES

    const pages =
      await Analytics.distinct(
        "page"
      );

    // ACTIVE USERS
    // LAST 10 SECONDS

    const activeUsersData =
      await Analytics.distinct(

        "sessionId",

        {

          eventType:
            "heartbeat",

          timestamp: {

            $gte:
              new Date(
                Date.now() - 10000
              )

          }

        }

      );

    const activeUsers =
      activeUsersData.length;

    // MOST VISITED PAGE

    const topPage =
      await Analytics.aggregate([

        {
          $match: {

            page: {

              $ne: null

            }

          }
        },

        {
          $group: {

            _id: "$page",

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        },

        {
          $limit: 1
        }

      ]);

    // MOST CLICKED ELEMENT

    const topElement =
      await Analytics.aggregate([

        {
          $match: {

            element: {

              $ne: null

            }

          }
        },

        {
          $group: {

            _id:
              "$element",

            count: {
              $sum: 1
            }

          }
        },

        {
          $sort: {
            count: -1
          }
        },

        {
          $limit: 1
        }

      ]);

    // FINAL DATA OBJECT

    const data = {

      totalClicks,

      visitors:
        visitors.length,

      pages:
        pages.length,

      activeUsers,

      topPage:
        topPage[0]?._id
        || "N/A",

      topElement:
        topElement[0]?._id
        || "N/A"

    };

    console.log(
      "AI ANALYTICS DATA:"
    );

    console.log(data);

    // GENERATE AI INSIGHTS

    const insights =
      await generateInsights(
        data
      );

    console.log(
      "AI RESPONSE:"
    );

    console.log(
      insights
    );

    // SEND RESPONSE

    res.json({

      insights

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({

      insights:
        "AI failed"

    });

  }

};