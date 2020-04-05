const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const auth = require('../middleware/auth');
const config = require("./../config/default.json");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json('Server error');
    }
});
//@route  POST api/auth
//@desc   Auth user and get token
//@access Public
router.post('/',
    [check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is reqired').exists()

    ],
    async (req, res) => {
        const err = validationResult(req);
        if (!err.isEmpty()) {
            console.log(err.array()[0].msg);
            return res.status(400).json({ msg: err.array()[0].msg })
        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })

            if (!user) {
                res.status(400).json({ msg: "Invalid Credentials" });
            }
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid Credentials" });
            }
            const payload = {
                user: {
                    id: user.id
                }

            }
            jwt.sign(payload, config.jwtSecret, {
                expiresIn: 360000
            }, (err, token) => {
                if (err) throw err
                res.json({ token })
            })
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ msg: "Server error" });
        }
    });

module.exports = router;