import Analytics from
  "../models/Analytics.js";


// TRACK EVENT

export const trackEvent =
  async (req, res) => {

  try {

    const analytics =
      await Analytics.create(
        req.body
      );

    // SOCKET REALTIME

    req.io.emit(
      "new-event",
      analytics
    );

    res.json({
      success: true,
      analytics
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};


// GET ANALYTICS

export const getAnalytics =
  async (req, res) => {

  try {

    const { date } = req.query;

    let filter = {};

    // DATE FILTER

    if (
      date &&
      date !== ""
    ) {

      const start =
        new Date(date);

      start.setHours(
        0, 0, 0, 0
      );

      const end =
        new Date(date);

      end.setHours(
        23, 59, 59, 999
      );

      filter.timestamp = {

        $gte: start,

        $lte: end

      };

    }

    const data =
      await Analytics.find(filter)
      .sort({
        timestamp: -1
      });

    res.json(data);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};


// GET STATS

export const getStats =
  async (req, res) => {

  try {

    const { date } = req.query;

    let filter = {};

    // DATE FILTER

    if (
      date &&
      date !== ""
    ) {

      const start =
        new Date(date);

      start.setHours(
        0, 0, 0, 0
      );

      const end =
        new Date(date);

      end.setHours(
        23, 59, 59, 999
      );

      filter.timestamp = {

        $gte: start,

        $lte: end

      };

    }

    // TOTAL CLICKS

    const totalClicks =
      await Analytics.countDocuments({

        ...filter,

        eventType: "click"

      });

    // UNIQUE VISITORS

    const visitors =
      await Analytics.distinct(
        "visitorId",
        filter
      );

    // UNIQUE PAGES

    const pages =
      await Analytics.distinct(
        "page",
        filter
      );

    res.json({

      totalClicks,

      visitors:
        visitors.length,

      pages:
        pages.length

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};


// ACTIVE USERS

export const getActiveUsers =
  async (req, res) => {

  try {

    const activeUsers =
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

    res.json({

      activeUsers:
        activeUsers.length

    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      error: err.message
    });

  }

};
export const getHeatmap =
  async (req, res) => {

  try {

    const data =
      await Analytics.find({

        eventType: "click"

      });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }

};