const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require("../middleware/auth");
const User = require("../models/User");
const Contact = require("./../models/Contact");


//@route  GET api/contacts
//@desc   get all a user's contacts
//@access Private
router.get('/', auth, async (req, res) => {
    try {

        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
        res.json(contacts);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server Error");
    }
});

//@route  POST api/contacts
//@desc   add  user's contacts
//@access Private
router.post('/', [auth,
    [
        check('name', 'Name is required').not().isEmpty()
    ]
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            phone,
            email,
            user: req.user.id,
            type
        })
        const contact = await newContact.save();
        res.json(contact);
    } catch (error) {
        console.log(error);
        res.json(error.data);

    }

});



//@route  PUT api/contacts/:id
//@desc  update user's contacts
//@access Private
router.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    // build contact object
    const contactField = {};
    if (name) contactField.name = name;
    if (email) contactField.email = email;
    if (phone) contactField.phone = phone;
    if (type) contactField.type = type;

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });
        //make sure user owns the contact
        if (req.user.id !== contact.user.toString()) {
            return res.status(401).json("not aithorozed");
        }
        contact = await Contact.findByIdAndUpdate(
            req.params.id,
            { $set: contactField },
            { new: true }

        )
        res.json(contact);


    } catch (error) {
        console.log(error);
        res.status(5000).send('server error');
    }
});

//@route  DELETE api/contacts/:id
//@desc  Delete user's contacts
//@access Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ msg: "Contact not found" });
        //make sure user owns the contact
        if (req.user.id !== contact.user.toString()) {
            return res.status(401).json("not authorized");
        }
        await Contact.findOneAndRemove(req.params.id);
        res.json({ msg: "contact removed" });


    } catch (error) {
        console.log(error);
        res.status(5000).send('server error');
    }
});


module.exports = router;