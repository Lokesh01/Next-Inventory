import { Router } from "express";
import { getDashboardMetrics } from "../controllers/dashBoardController";


const router = Router();

router.get("/", getDashboardMetrics);

export default router;