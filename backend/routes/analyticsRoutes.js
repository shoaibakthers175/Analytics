import express from "express";

import {
  trackEvent,
  getAnalytics,
  getStats,
  getActiveUsers,
  getHeatmap
} from "../controllers/analyticsController.js";

const router = express.Router();

router.post(
  "/track",
  trackEvent
);

router.get(
  "/analytics",
  getAnalytics
);

router.get(
  "/analytics/stats",
  getStats
);

router.get(
  "/analytics/active-users",
  getActiveUsers
);
router.get(
  "/analytics/heatmap",
  getHeatmap
);

export default router;