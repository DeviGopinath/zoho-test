const router = require('express').Router();
const controller = require('../controller/controller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/login', async (req, res) => {
	try {
		const db = controller.getDbServiceInstance();
		const { username, password } = req.body;
		console.log(username, password);
		const user = await db.getAuth(username);
		console.log('pass:', user.rows[0]);
		if (user.rows.length === 0) {
			return res.status(401).json('Username or password incorrect');
		}
		const validPassword = await bcrypt.compare(password, user.rows[0].password);

		if (!validPassword) {
			return res.status(401).json('Username or password incorrect');
		}
		const payload = { user_id: user.rows[0].id };
		const access_token = jwt.sign(payload, 'qwertyuiop1234567890', {
			expiresIn: '1hr',
		});

		res.json({ access_token });
	} catch (error) {
		console.log(error.message);

		res.status(500).json('Server Error');
	}
});

module.exports = router;
