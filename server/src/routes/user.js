const express = require('express');
const connectDataBase = require('../middlewares/connectionDB');
const router = express.Router();
const bcrypt = require('bcrypt');
const UserSchema = require('../models/userModel');
const jwt = require('jsonwebtoken');
//const auth = require('../middlewares/userAuth');

// create user
router.post('/create', connectDataBase, async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await UserSchema.create({ name, email, password: hashedPassword });
        res.status(200).json({
            status: "Success!",
            statusMessage: "User created successfully",
            response: user
        })
    } catch (error) {
        throw new Error(error.message);
    }
})

// login user
router.post('/login', connectDataBase, async (req, res) => {
    try {
        const { email, password } = req.body;
        const responseDB = await UserSchema.findOne({ email }).select('+password');

        if (responseDB) {
            let correctPassword = await bcrypt.compare(password, responseDB.password);
            if (correctPassword) {
                let token = jwt.sign({ id: responseDB._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

                res.header('x-auth-token', token);
                res.status(200).json({
                    status: "Success!",
                    statusMessage: "User authenticated successfully.",
                    response: { "x-auth-token": token }
                })
            } else {
                throw new Error("Login failed. Please try again")
            }
        } else {
            throw new Error("Login failed. Please try again");
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
});

// get users
router.get('/', connectDataBase, async (req, res) => {
    try {
        const users = await UserSchema.find();
        res.status(200).json({ data: users });
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

// delete a user
router.delete('/:id', connectDataBase, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await UserSchema.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' })
        }
        res.json({ msg: "User deleted successfully." })
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
})

module.exports = router;