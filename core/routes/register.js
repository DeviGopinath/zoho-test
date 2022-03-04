const router = require("express").Router();
const controller = require("../controller/controller");
const jwt = require("jsonwebtoken");


const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
    try {
        const db = controller.getDbServiceInstance();
        const { email, password, secretcode } = req.body;
        const user = await db.userExist(email);
        if (user.rows.length !== 0) {
            return res.status(401).json("User already exists");
        }
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound);
        const bcryptPassword = await bcrypt.hash(password, salt);
        const bcryptSecretCode = await bcrypt.hash(secretcode, salt);
        const newUser = await db.insertNewUser(email, bcryptPassword,bcryptSecretCode);
        const payload = { user_id: newUser.rows[0].id };
        const access_token = jwt.sign(payload, "qwertyuiop1234567890", {
            expiresIn: "1hr",
        });
        res.json({ access_token });
    } catch (err) {
        console.log(err.message);
        res.status(500).json("Server Error");
    }
});

module.exports = router;
