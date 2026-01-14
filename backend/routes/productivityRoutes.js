const express=require("express");
const router=express.Router();
const authMiddleware=require("../middleware/authMiddleware");
const {saveTodayLog,getAllLogs}=require("../controllers/productivityController");

router.post("/today",authMiddleware,saveTodayLog);
router.get("/",authMiddleware,getAllLogs);

module.exports=router;