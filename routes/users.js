const express = require("express");
const router = express.Router();
const User = require("./../models/User");
const config = require("./../config/default.json");
const { check, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//@route  POST api/users
//@desc   Register a user
//@access Public
router.post('/', [
    check('name', 'Please add name')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email')
        .isEmail(),
    check('password', 'Please enter the password with atleast 6 or more charcacter')
        .isLength({ min: 6 })
]
    , async (req, res) => {
        const err = validationResult(req);

        if (!err.isEmpty()) {
            console.log(err);
            return res.status(400).json({ error: err.array() })
        }
        const { name, email, password } = req.body

        try {
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ msg: "User allredy exist" });
            }
            user = new User({
                name,
                email,
                password
            });
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

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
        } catch (error) {
            console.log(error);
            res.status(500).send("Server error");
        }

    });

module.exports = router;