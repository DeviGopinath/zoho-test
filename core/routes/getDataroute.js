const router = require("express").Router();
const controller = require("../controller/controller");
const authorization = require("../middleware/authorization");
const connection = require("../model/dbService");

router.get("/", async (req, res) => {
    try {
        // var data = req.query.month;
        const db = controller.getDbServiceInstance();
        let users = false;

        users = await db.getData();
        if (users) {
            res.status(200).json({
                message: "Retrieval successful",
                status: "SUCCESS",
                data: users,
            });
        } else {
            return res.status(404).json({
                status: "FAILURE",
                message: "data not found or not connected to database",
            });
        }
    } catch (error) {
        res.status(500).json({
            error: error,
            message: "database object not found",
        });
    }
});
module.exports = router;
